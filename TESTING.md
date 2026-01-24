# Testing Checklist

## ✅ Pre-Deployment Testing

### Backend Tests

- [ ] **Health Check Endpoint**
  ```bash
  curl http://localhost:3001/health
  ```
  Expected: `{"status":"ok","timestamp":"..."}`

- [ ] **OpenAI Text Generation**
  ```bash
  curl -X POST http://localhost:3001/api/openai/generate \
    -H "Content-Type: application/json" \
    -d '{"prompt":"Hello world"}'
  ```
  Expected: JSON response with generated text

- [ ] **Claude Text Generation**
  ```bash
  curl -X POST http://localhost:3001/api/claude/generate \
    -H "Content-Type: application/json" \
    -d '{"prompt":"Hello world"}'
  ```
  Expected: JSON response with generated text

- [ ] **Summarization**
  ```bash
  curl -X POST http://localhost:3001/api/openai/summarize \
    -H "Content-Type: application/json" \
    -d '{"text":"Long text here..."}'
  ```

- [ ] **Claude Summarization**
  ```bash
  curl -X POST http://localhost:3001/api/claude/summarize \
    -H "Content-Type: application/json" \
    -d '{"text":"Long text here..."}'
  ```

- [ ] **Embedding Creation**
  ```bash
  curl -X POST http://localhost:3001/api/openai/embedding \
    -H "Content-Type: application/json" \
    -d '{"text":"Sample text"}'
  ```

- [ ] **Error Handling**
  - Missing prompt: Returns 400 error
  - Invalid API key: Returns appropriate error
  - Rate limit exceeded: Returns 429 error

### Frontend Tests

- [ ] **Dashboard Page**
  - Loads without errors
  - Displays statistics correctly
  - Shows recent activity (if available)

- [ ] **Prompt Interface**
  - Text input works
  - AI Provider selection works (OpenAI/Claude)
  - Model selection works for both providers
  - Temperature slider works
  - Token input accepts values
  - Generate button triggers request
  - Response displays correctly
  - Error messages appear when needed

- [ ] **Claude Toolkit**
  - Code generation tab loads
  - Language selection works
  - Code description input works
  - Generate code button works
  - Code analysis tab loads
  - Code input accepts code
  - Analyze button works
  - Results display correctly

- [ ] **Data Visualization**
  - Embedding input works
  - Create button triggers request
  - Embedding vector displays
  - Table shows first 10 values

### Integration Tests

- [ ] **Frontend → Backend Communication**
  - API calls succeed
  - Errors are handled gracefully
  - Loading states work

- [ ] **Database Integration (if configured)**
  - PostgreSQL connection works
  - MongoDB connection works
  - Data is saved correctly
  - History retrieval works

### Build Tests

- [ ] **Backend Build**
  ```bash
  cd backend && npm run build
  ```
  Should complete without errors

- [ ] **Frontend Build**
  ```bash
  cd frontend && npm run build
  ```
  Should create optimized production build

### Docker Tests

- [ ] **Docker Compose**
  ```bash
  docker-compose up -d
  ```
  All services start successfully

- [ ] **Service Health**
  - PostgreSQL accessible on port 5432
  - MongoDB accessible on port 27017
  - Backend accessible on port 3001
  - Frontend accessible on port 3000

## 🔒 Security Tests

- [x] **CodeQL Scan** - ✅ 0 vulnerabilities found
- [ ] **Dependency Audit**
  ```bash
  cd backend && npm audit
  cd frontend && npm audit
  ```

- [ ] **Environment Variables**
  - No secrets in code
  - `.env` files in `.gitignore`
  - Example files only contain placeholders

## 📋 Manual Testing Scenarios

### Scenario 1: New User Setup
1. Clone repository
2. Follow QUICK_REFERENCE.md
3. Start backend and frontend
4. Access application
5. Generate first prompt

### Scenario 2: OpenAI Integration
1. Configure OpenAI API key
2. Test text generation
3. Test summarization
4. Test embeddings
5. Verify results

### Scenario 3: Claude Integration
1. Configure Anthropic API key
2. Select Claude provider in UI
3. Test text generation
4. Test code generation
5. Test code analysis
6. Verify results

### Scenario 4: Multi-Provider Usage
1. Configure both API keys
2. Switch between OpenAI and Claude
3. Compare responses
4. Test different models from each provider

### Scenario 5: Database Integration
1. Start PostgreSQL
2. Run schema script
3. Start MongoDB
4. Configure connection strings
5. Test data persistence

### Scenario 6: Production Build
1. Build backend
2. Build frontend
3. Test production builds
4. Verify optimizations

## 🎯 Performance Tests

- [ ] **Backend Response Time**
  - Health check: < 100ms
  - OpenAI calls: Based on model (typically 1-5s)
  - Claude calls: Based on model (typically 1-3s)

- [ ] **Frontend Load Time**
  - Initial load: < 3s
  - Tab switching: < 500ms

- [ ] **Rate Limiting**
  - 100 requests/15min per IP works
  - Exceeding limit returns 429

## 📊 Functionality Checklist

### Core Features
- [x] OpenAI text generation
- [x] Claude text generation
- [x] Text summarization (OpenAI & Claude)
- [x] Embedding creation (OpenAI)
- [x] Custom prompts with tuning (both providers)
- [x] Batch embeddings (OpenAI)
- [x] Code generation (Claude)
- [x] Code analysis (Claude)
- [x] Multi-turn conversations (Claude)
- [x] History retrieval (both providers)

### UI Components
- [x] Dashboard with statistics
- [x] Prompt interface with controls
- [x] AI provider selection (OpenAI/Claude)
- [x] Claude Toolkit (code generation/analysis)
- [x] Data visualization
- [x] Tab navigation
- [x] Responsive design

### Backend Services
- [x] Express server
- [x] OpenAI integration
- [x] Claude/Anthropic integration
- [x] PostgreSQL service
- [x] MongoDB service
- [x] Error handling
- [x] Rate limiting
- [x] CORS support

## 🐛 Known Issues

### Frontend
- Material-UI v7 Grid syntax updated
- React warnings about dependencies (expected)

### Backend
- Databases are optional (will log warnings if not configured)

### General
- Create-react-app shows known vulnerabilities (not critical for development)

## ✨ Test Results

**Last Updated:** 2024-01-04

- Backend Build: ✅ Pass
- Frontend Build: ✅ Pass
- CodeQL Security Scan: ✅ Pass (0 vulnerabilities)
- Code Review: ✅ Addressed all feedback
- Type Checking: ✅ Pass
- Error Handling: ✅ Improved

## 📝 Notes

- All tests assume OpenAI and/or Anthropic API keys are configured
- You can use either or both AI providers
- Database tests require PostgreSQL and MongoDB running
- Docker tests require Docker and Docker Compose installed
- Performance metrics may vary based on API response times

## 🔗 Claude-Specific Tests

### Code Generation Test
```bash
curl -X POST http://localhost:3001/api/claude/generate-code \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Create a function to validate email addresses",
    "language": "javascript"
  }'
```

### Code Analysis Test
```bash
curl -X POST http://localhost:3001/api/claude/analyze-code \
  -H "Content-Type: application/json" \
  -d '{
    "code": "function add(a, b) { return a + b; }",
    "language": "javascript"
  }'
```

### Conversation Test
```bash
curl -X POST http://localhost:3001/api/claude/conversation \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What is recursion?"},
      {"role": "assistant", "content": "Recursion is..."},
      {"role": "user", "content": "Show me an example"}
    ],
    "systemMessage": "You are a programming tutor"
  }'
```
