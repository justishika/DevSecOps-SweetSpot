# 🐳 Docker Setup for SweetSpot Marketplace

This document explains how to run the SweetSpot Marketplace application using Docker.

## 📋 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- At least 4GB RAM available for Docker

## 🚀 Quick Start

### Development Environment

1. **Clone and navigate to the repository:**
   ```bash
   git clone https://github.com/justishika/DevSecOps-SweetSpot.git
   cd DevSecOps-SweetSpot
   ```

2. **Start the development environment:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:3001
   - **Database Admin**: http://localhost:8081 (Mongo Express)
   - **Database**: mongodb://admin:password@localhost:27017

### Production Environment

1. **Set up environment variables:**
   ```bash
   cp docker.env.example .env
   # Edit .env with your production values
   ```

2. **Build and start production services:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Access the application:**
   - **Application**: http://localhost (via Nginx)
   - **Prometheus**: http://localhost:9090
   - **Grafana**: http://localhost:3000 (admin/admin123)

## 🏗️ Docker Architecture

### Development Setup (`docker-compose.yml`)
- **sweetspot-app**: Node.js development server with hot reload
- **mongodb**: MongoDB database with authentication
- **mongo-express**: Web-based MongoDB admin interface

### Production Setup (`docker-compose.prod.yml`)
- **sweetspot-app**: Optimized production Node.js application
- **nginx**: Reverse proxy with SSL termination and rate limiting
- **prometheus**: Metrics collection and monitoring
- **grafana**: Monitoring dashboards and visualization

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development` |
| `PORT` | Application port | `3001` |
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `GRAFANA_PASSWORD` | Grafana admin password | `admin123` |

### MongoDB Configuration

The development setup includes a MongoDB instance with:
- **Username**: `admin`
- **Password**: `password`
- **Database**: `sweetspot`

### Nginx Configuration

Production setup includes Nginx with:
- Rate limiting for API endpoints
- Gzip compression
- Security headers
- Static file serving

## 📊 Monitoring

### Prometheus Metrics
- Application health metrics
- API endpoint performance
- Database connection status
- Custom business metrics

### Grafana Dashboards
- Application overview
- API performance
- Database metrics
- System resources

## 🛠️ Development Commands

```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f sweetspot-app

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Run tests in container
docker-compose exec sweetspot-app npm test

# Access container shell
docker-compose exec sweetspot-app sh
```

## 🚀 Production Commands

```bash
# Start production environment
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down

# Update application
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

## 🔍 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3001, 5173, 8081, 9090, 3000 are available
2. **Memory issues**: Increase Docker memory limit to at least 4GB
3. **Database connection**: Check MongoDB container is running and accessible
4. **Build failures**: Ensure all dependencies are properly installed

### Health Checks

```bash
# Check application health
curl http://localhost:3001/api/health

# Check Prometheus
curl http://localhost:9090/-/healthy

# Check Grafana
curl http://localhost:3000/api/health
```

### Logs

```bash
# Application logs
docker-compose logs sweetspot-app

# Database logs
docker-compose logs mongodb

# All services
docker-compose logs
```

## 📁 File Structure

```
├── Dockerfile              # Production image
├── Dockerfile.dev          # Development image
├── docker-compose.yml      # Development setup
├── docker-compose.prod.yml # Production setup
├── nginx.conf              # Nginx configuration
├── .dockerignore           # Docker ignore file
├── docker.env.example      # Environment variables template
├── monitoring/
│   ├── prometheus.yml      # Prometheus configuration
│   └── grafana/
│       └── provisioning/   # Grafana configuration
└── DOCKER.md               # This file
```

## 🔒 Security Considerations

- Change default passwords in production
- Use environment variables for sensitive data
- Enable SSL/TLS in production
- Regular security updates for base images
- Network isolation between services

## 📈 Performance Optimization

- Multi-stage Docker builds for smaller images
- Node.js Alpine images for reduced size
- Nginx caching and compression
- Prometheus metrics for performance monitoring
- Health checks for container orchestration
