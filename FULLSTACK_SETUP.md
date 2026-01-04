# Full Stack AI Integration - Setup Guide

This guide will help you set up and run the Time Machines Builders Full Stack AI application with OpenAI integration.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Full Stack AI Platform                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend (React + TypeScript + Material-UI)                │
│  ├── Dashboard - View AI activity and statistics            │
│  ├── Prompt Interface - Interact with OpenAI models         │
│  └── Data Visualization - View embeddings and analytics     │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Backend (Node.js + Express + TypeScript)                   │
│  ├── OpenAI Service - GPT models integration                │
│  ├── PostgreSQL Service - Structured data storage           │
│  └── MongoDB Service - Unstructured data storage            │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Databases                                                   │
│  ├── PostgreSQL - Prompts, embeddings, workflows            │
│  └── MongoDB - AI outputs, training data, sessions          │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  External Services                                           │
│  └── OpenAI API - GPT models and embeddings                 │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher) - Optional but recommended
- **MongoDB** (v4.4 or higher) - Optional but recommended
- **OpenAI API Key** - Required for AI features

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/lippytm/Time-Machines-Builders-.git
cd Time-Machines-Builders-
```

### 2. Set Up Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=your_api_key_here
nano .env

# Build TypeScript
npm run build

# Start development server
npm run dev
```

The backend will start on `http://localhost:3001`

### 3. Set Up Frontend

```bash
# Open a new terminal
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm start
```

The frontend will start on `http://localhost:3000`

### 4. Set Up Databases (Optional)

#### PostgreSQL

```bash
# Create database
psql -U postgres -c "CREATE DATABASE timemachines;"

# Run schema
psql -U postgres -d timemachines -f database/postgres-schema.sql
```

#### MongoDB

```bash
# Start MongoDB (if not running)
mongod

# The collections will be created automatically when the app starts
```

## Environment Variables

### Backend (.env)

```bash
# Server
PORT=3001
NODE_ENV=development

# OpenAI (Required)
OPENAI_API_KEY=sk-...your-key-here
OPENAI_ORG_ID=org-...optional

# PostgreSQL (Optional)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=timemachines
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

# MongoDB (Optional)
MONGODB_URI=mongodb://localhost:27017/timemachines

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)

```bash
REACT_APP_API_URL=http://localhost:3001/api
```

## Features

### 1. Dashboard
- View total AI requests
- See models used
- Browse recent activity
- Real-time statistics

### 2. AI Prompt Interface
- Custom prompts with system messages
- Model selection (GPT-3.5, GPT-4)
- Temperature and token controls
- Response history

### 3. Data & Embeddings
- Create text embeddings
- View embedding dimensions
- Analyze vector representations
- Batch embedding support

## API Endpoints

See [API Documentation](docs/api/API.md) for detailed endpoint information.

**Base URL:** `http://localhost:3001/api`

**Key Endpoints:**
- `POST /openai/generate` - Generate text
- `POST /openai/summarize` - Summarize text
- `POST /openai/embedding` - Create embeddings
- `POST /openai/custom-prompt` - Custom prompts
- `GET /openai/history` - Get history

## Development

### Backend Development

```bash
cd backend

# Run in development mode with auto-reload
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

### Frontend Development

```bash
cd frontend

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

```
Time-Machines-Builders-/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   └── index.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   └── package.json
├── database/
│   ├── postgres-schema.sql  # PostgreSQL schema
│   └── mongodb-setup.md     # MongoDB setup guide
└── docs/
    └── api/
        └── API.md           # API documentation
```

## Troubleshooting

### Backend Issues

**OpenAI API errors:**
- Verify your API key is correct
- Check your OpenAI account has credits
- Ensure API key has proper permissions

**Database connection errors:**
- Check PostgreSQL/MongoDB is running
- Verify connection strings in .env
- The app will run without databases but with limited functionality

### Frontend Issues

**Cannot connect to backend:**
- Verify backend is running on port 3001
- Check REACT_APP_API_URL in .env
- Ensure CORS is configured correctly

**Build errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`

## Security Considerations

⚠️ **Important Security Notes:**

1. **Never commit `.env` files** - They contain sensitive API keys
2. **Use environment variables** - For all secrets and configuration
3. **Enable authentication** - Before deploying to production
4. **Rate limiting** - Already implemented, adjust as needed
5. **HTTPS** - Use HTTPS in production
6. **API key rotation** - Regularly rotate your OpenAI API keys

## Production Deployment

### Backend

1. Set `NODE_ENV=production`
2. Use a process manager (PM2, systemd)
3. Set up reverse proxy (nginx, Apache)
4. Enable HTTPS
5. Configure production database
6. Set up logging and monitoring

### Frontend

1. Build: `npm run build`
2. Serve static files with nginx/Apache
3. Configure environment variables
4. Enable HTTPS
5. Set up CDN (optional)

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## License

See [LICENSE](../LICENSE) for license information.

## Support

- **Documentation:** [README.md](../README.md)
- **API Docs:** [API.md](docs/api/API.md)
- **Issues:** [GitHub Issues](https://github.com/lippytm/Time-Machines-Builders-/issues)

---

**Happy Building!** 🚀
