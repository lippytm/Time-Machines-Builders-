# Time-Machines-Builders-

AI automation in Earn while you Learn to Become a Better Programmer and Blockchain Developer.

## Full Stack AI Application

A comprehensive full-stack application for time-series forecasting, AI/ML model training, and predictions with modern web technologies.

### Features

- **Frontend**: React with TailwindCSS for responsive UI
- **Backend**: Express.js with RESTful APIs
- **AI/ML**: Python FastAPI microservice with statistical time-series forecasting and basic NLP
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT-based auth with OAuth2 support
- **Deployment**: Docker containerization with CI/CD via GitHub Actions

> **Note**: The AI/ML implementation uses lightweight statistical methods and rule-based approaches for demonstration purposes. For production use, integrate with TensorFlow, PyTorch, or Hugging Face transformers as needed.

### Project Structure

```
Time-Machines-Builders-/
├── frontend/          # React + TailwindCSS application
├── backend/           # Express.js API server
├── ai-service/        # Python FastAPI ML microservice
├── docker-compose.yml # Docker orchestration
└── .github/           # CI/CD workflows
```

### Quick Start

#### Prerequisites

- Node.js 18+
- Python 3.9+
- Docker & Docker Compose
- PostgreSQL 14+

#### Running with Docker

```bash
# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:4000
# AI Service: http://localhost:8000
```

#### Running Locally

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**AI Service:**
```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload
```

### API Documentation

- Backend API: http://localhost:4000/api-docs
- AI Service API: http://localhost:8000/docs

### Testing

**Backend:**
```bash
cd backend
npm test
```

**Frontend:**
```bash
cd frontend
npm test
```

**AI Service:**
```bash
cd ai-service
pytest
```

### Environment Variables

Create `.env` files in each service directory:

**Backend (.env):**
```
DATABASE_URL=postgresql://user:password@localhost:5432/timemachines
JWT_SECRET=your-secret-key
OAUTH_GOOGLE_CLIENT_ID=your-google-client-id
OAUTH_GOOGLE_CLIENT_SECRET=your-google-client-secret
AI_SERVICE_URL=http://localhost:8000
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:4000
```

**AI Service (.env):**
```
MODEL_PATH=./models
HUGGINGFACE_TOKEN=your-hf-token
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

### License

MIT
