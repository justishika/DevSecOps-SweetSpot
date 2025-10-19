# Root Dockerfile - Points to production Dockerfile
# This file is maintained for CI/CD compatibility
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Build stage
FROM base AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 sweetspot

# Copy built application
COPY --from=builder --chown=sweetspot:nodejs /app/dist ./dist
COPY --from=builder --chown=sweetspot:nodejs /app/server ./server
COPY --from=deps --chown=sweetspot:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=sweetspot:nodejs /app/package.json ./package.json

# Create uploads directory
RUN mkdir -p uploads server/uploads && chown -R sweetspot:nodejs uploads server/uploads

# Switch to non-root user
USER sweetspot

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "server/index.js"]
