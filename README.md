# SweetSpot – Artisan Dessert Marketplace 🍰

**A comprehensive MERN-stack web application with complete DevSecOps integration, featuring containerized microservices, automated CI/CD pipelines, secure secrets management, comprehensive testing, and real-time monitoring.**

---

## Overview
SweetSpot is a full-featured marketplace platform for artisan desserts, built with **modern DevSecOps practices** and **enterprise-grade architecture**.  
This project demonstrates:
- **Full-stack development** with React frontend and Node.js backend
- **Complete CI/CD automation** with GitHub Actions and CircleCI
- **Docker containerization** for development and production environments
- **Comprehensive testing** with Jest, ESLint, and automated quality checks
- **Real-time monitoring** with Prometheus and Grafana
- **Secure secrets management** with Doppler integration
- **MongoDB Atlas** cloud database integration

This project showcases **end-to-end software delivery automation** using industry-standard tools and practices, demonstrating expertise in full-stack development, DevOps, and modern software engineering.

---

## Tech Stack

### **Frontend**
- React.js + Tailwind CSS
- Axios for API communication
- React Router for navigation

### **Backend**
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT authentication + bcrypt password hashing

### **DevSecOps Toolchain**
| Category             | Tools Used |
|----------------------|------------|
| Version Control      | Git + GitHub |
| CI/CD                | GitHub Actions, CircleCI |
| Code Quality         | ESLint, Jest, Automated Testing, Codacy  |
| Containerization     | Docker, Docker Compose, Multi-stage builds |
| Secrets Management   | Doppler |
| API Testing          | Postman + Newman |
| Monitoring           | Prometheus, Grafana |
| Database             | MongoDB Atlas |

---

## CI/CD Pipeline Highlights
- **Automated Testing:** Jest unit tests, integration tests, and API testing
- **Code Quality:** ESLint for code linting and formatting standards
- **Containerization:** Multi-stage Docker builds for development and production
- **Secrets Management:** Doppler for secure environment variable management
- **Monitoring & Observability:** Prometheus metrics collection and Grafana dashboards
- **Multi-Platform CI/CD:** Both GitHub Actions and CircleCI pipelines

**Pipeline Flow:**
1. **Code Push** → Triggers both GitHub Actions and CircleCI
2. **Testing Phase** → Jest tests, ESLint checks, integration tests
3. **Build Phase** → Application build and Docker image creation
4. **Security Phase** → Automated security scanning and vulnerability checks
5. **Deployment Phase** → Containerized deployment with health checks
6. **Monitoring Phase** → Real-time metrics collection and alerting

---

## Security Practices
- JWT-based authentication with role-based access control
- Encrypted password storage (bcrypt)
- Centralized, access-controlled secrets with Doppler
- Continuous security scanning during CI
- Minimal Docker base images to reduce attack surface

---

## Monitoring & Observability
- **Prometheus** scrapes backend metrics (`/metrics` endpoint)
- **Grafana** dashboards display:
  - API response times
  - Memory & CPU usage
  - Container uptime
- **Node Exporter** collects system-level metrics

---

## Technical Achievements

### **Docker Implementation**
- **Multi-stage builds** for optimized production images
- **Development environment** with hot reload and debugging
- **Production environment** with Nginx reverse proxy
- **Container orchestration** with Docker Compose
- **Health checks** and monitoring integration
- **Volume management** for data persistence

### **Testing & Quality Assurance**
- **Jest testing framework** with 18 passing tests
- **ESLint configuration** for code quality and consistency
- **Integration tests** for API endpoints
- **Health check tests** for service monitoring
- **Automated test execution** in CI/CD pipelines
- **Code coverage** and quality metrics

### **Backend Development**
- **RESTful API** with Express.js framework
- **MongoDB integration** with Mongoose ODM
- **JWT authentication** with role-based access control
- **Password hashing** with bcrypt security
- **File upload handling** with multer middleware
- **CORS configuration** for cross-origin requests
- **Error handling** and validation middleware

### **Frontend Development**
- **React.js** with modern hooks and context
- **Tailwind CSS** for responsive styling
- **Component architecture** with reusable UI elements
- **State management** with React Context API
- **API integration** with Axios HTTP client
- **User authentication** and session management
- **Responsive design** for mobile and desktop

### **Monitoring & Observability**
- **Prometheus metrics** collection and storage
- **Grafana dashboards** for visualization
- **Health check endpoints** for service monitoring
- **Performance metrics** tracking
- **Real-time monitoring** capabilities
- **Alert configuration** for system health

---

## Showcase

Below are key visuals from the project:

- **CI/CD Pipeline in GitHub Actions** – automated linting, testing, and deployments  
- **Doppler Secrets Management** – secure, centralized environment variables  
- **Prometheus & Grafana Dashboards** – real-time performance metrics  
- **Frontend UI** – vendor dashboard, product listings, cart & checkout flow  
📷 [See full project screenshots](docs/full-gallery.md)

---

## Key Features Delivered

### **Full-Stack Development (Ishika Mohol)**
- **Backend Development:** Complete REST API with Express.js, MongoDB integration, JWT authentication
- **Frontend Development:** React components, user interfaces, API integration
- **Docker Containerization:** Multi-stage builds, development and production environments
- **Testing Implementation:** Jest unit tests, integration tests, automated testing workflows
- **Code Quality:** ESLint configuration, code formatting, quality standards
- **Monitoring Setup:** Prometheus metrics collection, Grafana dashboard configuration
- **CI/CD Pipeline:** GitHub Actions and CircleCI pipeline configuration and optimization
- **Database Management:** MongoDB Atlas integration, data modeling, connection optimization
- **Security Implementation:** JWT authentication, password hashing, secure API endpoints

---

## Project Structure
```
SweetSpot-Marketplace/
├── client/                 # React frontend application
├── server/                 # Node.js backend API
├── docker/                 # Docker configuration files
│   ├── development/        # Development Docker setup
│   ├── production/         # Production Docker setup
│   └── nginx/              # Nginx configuration
├── monitoring/             # Prometheus & Grafana setup
├── .github/workflows/      # GitHub Actions CI/CD
├── .circleci/              # CircleCI configuration
├── scripts/                # Automation scripts
└── docs/                   # Project documentation
```

## Getting Started

### **Prerequisites**
- Node.js 18.x or higher
- Docker and Docker Compose
- MongoDB Atlas account
- Git

### **Quick Start**
```bash
# Clone the repository
git clone https://github.com/justishika/DevSecOps-SweetSpot.git
cd DevSecOps-SweetSpot

# Install dependencies
npm install

# Set up environment variables
cp docker.env.example .env
# Edit .env with your MongoDB Atlas connection string

# Run tests
npm test

# Start development environment
npm run docker:dev

# Or start production environment
npm run docker:prod
```

### **Available Scripts**
- `npm test` - Run Jest test suite
- `npm run build` - Build the application
- `npm run docker:dev` - Start development environment
- `npm run docker:prod` - Start production environment
- `npm run pipeline:verify` - Verify CI/CD pipeline configuration

## Future Enhancements
- Kubernetes orchestration for scaling
- ELK stack for centralized logging
- Cloud deployment via AWS/GCP
- Advanced security testing with OWASP ZAP
- Microservices architecture migration

---

## References
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [CircleCI Docs](https://circleci.com/docs)
- [Docker Docs](https://docs.docker.com)
- [Doppler Docs](https://docs.doppler.com)
- [Prometheus Docs](https://prometheus.io/docs)
- [Grafana Docs](https://grafana.com/docs)
- [Jest Testing Docs](https://jestjs.io/docs)
- [ESLint Docs](https://eslint.org/docs)

---

**Developed By:**  
**Ishika Mohol** in collaboration with Hoor Parvaiz.
