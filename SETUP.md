# Setup Guide

This guide will help you set up and run the Time Machines AI full-stack application.

## Prerequisites

Make sure you have the following installed:

- **Node.js** 18 or higher
- **Python** 3.9 or higher
- **PostgreSQL** 14 or higher
- **Docker** and **Docker Compose** (optional, for containerized setup)

## Quick Start with Docker (Recommended)

The easiest way to run the entire application is with Docker Compose:

```bash
# Clone the repository
git clone https://github.com/lippytm/Time-Machines-Builders-.git
cd Time-Machines-Builders-

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **AI Service**: http://localhost:8000
- **API Documentation**: http://localhost:4000/api-docs

## Local Development Setup

If you prefer to run services individually for development:

### 1. Database Setup

```bash
# Install PostgreSQL (if not already installed)
# On macOS:
brew install postgresql@14

# On Ubuntu/Debian:
sudo apt-get install postgresql-14

# Start PostgreSQL and create database
psql postgres
CREATE DATABASE timemachines;
CREATE USER tmuser WITH PASSWORD 'tmpassword';
GRANT ALL PRIVILEGES ON DATABASE timemachines TO tmuser;
\q
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Make sure DATABASE_URL matches your PostgreSQL setup

# Run database migrations (automatic on start)
# Start the server
npm run dev

# The backend will be available at http://localhost:4000
```

### 3. AI Service Setup

```bash
cd ai-service

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Start the service
uvicorn main:app --reload

# The AI service will be available at http://localhost:8000
# API docs at http://localhost:8000/docs
```

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev

# The frontend will be available at http://localhost:3000
```

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://tmuser:tmpassword@localhost:5432/timemachines
JWT_SECRET=your-super-secret-jwt-key-change-in-production
OAUTH_GOOGLE_CLIENT_ID=your-google-client-id
OAUTH_GOOGLE_CLIENT_SECRET=your-google-client-secret
AI_SERVICE_URL=http://localhost:8000
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000
```

### AI Service (.env)
```env
MODEL_PATH=./models
HUGGINGFACE_TOKEN=your-huggingface-token-optional
PYTHONUNBUFFERED=1
```

## OAuth2 Setup (Optional)

To enable Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:4000/api/auth/google/callback`
6. Copy Client ID and Client Secret to backend `.env` file

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### AI Service Tests
```bash
cd ai-service
pytest
```

## Building for Production

### Backend
```bash
cd backend
npm run build  # If you have a build script
npm start
```

### Frontend
```bash
cd frontend
npm run build
# The build output will be in the 'dist' folder
# Serve with any static file server
```

### Docker Production Build
```bash
# Build all images
docker-compose build

# Run in production mode
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running: `pg_isready`
- Check DATABASE_URL is correct in .env
- Verify user permissions in PostgreSQL

### Port Already in Use
If ports 3000, 4000, or 8000 are already in use:
- Change the PORT in respective .env files
- Update docker-compose.yml port mappings

### AI Service Dependencies
Some Python packages (TensorFlow, PyTorch) are large:
- Installation may take time
- Ensure you have sufficient disk space
- Consider using CPU-only versions for development

### Frontend Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Workflow

1. **Create a dataset** via the Datasets page
2. **Train a model** using your dataset on the Models page
3. **Make predictions** once the model training is complete
4. **View results** on the Dashboard with visualizations

## Production Deployment

For production deployment, consider:

1. Use environment-specific .env files
2. Set strong JWT_SECRET
3. Enable HTTPS
4. Use managed PostgreSQL (AWS RDS, Google Cloud SQL)
5. Deploy with container orchestration (Kubernetes, ECS)
6. Set up proper logging and monitoring
7. Configure rate limiting and security headers
8. Use a CDN for frontend assets

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [TensorFlow Documentation](https://www.tensorflow.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Support

For issues and questions, please open an issue on the GitHub repository.
