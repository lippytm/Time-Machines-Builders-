# Quick Reference Guide

## 🚀 Getting Started

### Minimum Setup (No Databases)

```bash
# Backend
cd backend
npm install
cp .env.example .env
# Add OPENAI_API_KEY to .env
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

Visit: http://localhost:3000

### Full Setup (With Databases)

See [FULLSTACK_SETUP.md](FULLSTACK_SETUP.md) for complete instructions.

---

## 📋 Environment Variables

### Backend Required
```bash
OPENAI_API_KEY=sk-...your-key-here
```

### Backend Optional
```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=timemachines
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
MONGODB_URI=mongodb://localhost:27017/timemachines
```

### Frontend
```bash
REACT_APP_API_URL=http://localhost:3001/api
```

---

## 🔧 Common Commands

### Backend

```bash
npm run dev      # Development mode with auto-reload
npm run build    # Build TypeScript to JavaScript
npm start        # Run production build
```

### Frontend

```bash
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
```

### Docker

```bash
docker-compose up -d              # Start all services
docker-compose down               # Stop all services
docker-compose logs -f backend    # View backend logs
docker-compose logs -f frontend   # View frontend logs
```

---

## 🌐 API Endpoints

Base URL: `http://localhost:3001/api`

### Health Check
```
GET /health
```

### OpenAI

```
POST /openai/generate          - Generate text
POST /openai/summarize         - Summarize text
POST /openai/embedding         - Create embedding
POST /openai/custom-prompt     - Custom prompt
POST /openai/batch-embeddings  - Batch embeddings
GET  /openai/history           - Get history
```

See [docs/api/API.md](docs/api/API.md) for details.

---

## 🏗️ Project Structure

```
Time-Machines-Builders-/
├── backend/                 # Node.js API
│   ├── src/
│   │   ├── config/         # Configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── middleware/     # Express middleware
│   └── dist/               # Compiled output
├── frontend/               # React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript types
│   └── build/              # Production build
├── database/               # Database scripts
└── docs/                   # Documentation
```

---

## 🧪 Testing the Application

### Test Backend API

```bash
# Health check
curl http://localhost:3001/health

# Generate text (requires OpenAI key)
curl -X POST http://localhost:3001/api/openai/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Say hello"}'
```

### Test Frontend

1. Visit http://localhost:3000
2. Navigate to "AI Prompt Interface" tab
3. Enter a prompt and click "Generate"

---

## 🔍 Troubleshooting

### Backend won't start

✓ Check Node.js version (v18+)
✓ Verify OPENAI_API_KEY is set
✓ Run `npm install` again

### Frontend won't connect to backend

✓ Ensure backend is running on port 3001
✓ Check REACT_APP_API_URL in frontend/.env
✓ Verify CORS settings in backend

### Database errors

✓ Databases are optional
✓ App will run without them
✓ Check connection strings if configured

### OpenAI API errors

✓ Verify API key is correct
✓ Check OpenAI account has credits
✓ Review rate limits

---

## 📊 Features Overview

### Dashboard
- View AI request statistics
- See models used
- Browse recent activity

### Prompt Interface
- Custom prompts with system messages
- Model selection (GPT-3.5, GPT-4)
- Temperature control
- Token limit adjustment

### Data & Embeddings
- Create text embeddings
- View embedding dimensions
- Batch processing support

---

## 🔒 Security Notes

⚠️ **Important:**

- Never commit `.env` files
- Use environment variables for secrets
- Enable authentication before production
- Use HTTPS in production
- Rotate API keys regularly

---

## 📚 Additional Resources

- [Full Setup Guide](FULLSTACK_SETUP.md)
- [API Documentation](docs/api/API.md)
- [Architecture Documentation](ARCHITECTURE.md)
- [Integration Guide](INTEGRATION.md)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Material-UI Docs](https://mui.com/)

---

## 💡 Tips

- Start without databases for quick testing
- Use Docker Compose for full environment
- Check logs for debugging
- Monitor OpenAI API usage
- Keep dependencies updated

---

**Need Help?**

- GitHub Issues: https://github.com/lippytm/Time-Machines-Builders-/issues
- Documentation: See README.md and FULLSTACK_SETUP.md
