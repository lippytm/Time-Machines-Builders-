# API Documentation

## Base URL
```
http://localhost:3001/api
```

## Endpoints

### Health Check

#### GET /health
Check if the server is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-04T12:00:00.000Z"
}
```

---

## OpenAI Endpoints

### Generate Text

#### POST /api/openai/generate
Generate text using OpenAI GPT models.

**Request Body:**
```json
{
  "prompt": "Write a short story about AI",
  "model": "gpt-3.5-turbo",
  "temperature": 0.7,
  "maxTokens": 1000
}
```

**Response:**
```json
{
  "response": "Generated text from OpenAI..."
}
```

---

### Summarize Text

#### POST /api/openai/summarize
Summarize the provided text.

**Request Body:**
```json
{
  "text": "Long text to be summarized..."
}
```

**Response:**
```json
{
  "summary": "Summary of the text..."
}
```

---

### Create Embedding

#### POST /api/openai/embedding
Create a vector embedding for the given text.

**Request Body:**
```json
{
  "text": "Text to embed"
}
```

**Response:**
```json
{
  "embedding": [0.123, -0.456, ...],
  "dimensions": 1536
}
```

---

### Custom Prompt

#### POST /api/openai/custom-prompt
Send a custom prompt with full parameter tuning.

**Request Body:**
```json
{
  "prompt": "Your question or instruction",
  "systemMessage": "You are a helpful assistant",
  "model": "gpt-3.5-turbo",
  "temperature": 0.7,
  "maxTokens": 1000,
  "topP": 1.0,
  "frequencyPenalty": 0.0,
  "presencePenalty": 0.0
}
```

**Response:**
```json
{
  "response": "AI-generated response..."
}
```

---

### Batch Embeddings

#### POST /api/openai/batch-embeddings
Create embeddings for multiple texts at once.

**Request Body:**
```json
{
  "texts": [
    "First text to embed",
    "Second text to embed",
    "Third text to embed"
  ]
}
```

**Response:**
```json
{
  "embeddings": [
    [0.123, -0.456, ...],
    [0.789, -0.012, ...],
    [0.345, -0.678, ...]
  ],
  "count": 3
}
```

---

### Get History

#### GET /api/openai/history?limit=10
Retrieve recent AI interactions.

**Query Parameters:**
- `limit` (optional): Number of records to retrieve (default: 10)

**Response:**
```json
{
  "outputs": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "prompt": "Sample prompt",
      "response": "Sample response",
      "model": "gpt-3.5-turbo",
      "metadata": {},
      "timestamp": "2024-01-04T12:00:00.000Z"
    }
  ]
}
```

---

## Error Responses

All endpoints may return the following error format:

```json
{
  "error": {
    "message": "Error description",
    "stack": "Stack trace (only in development)"
  }
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (missing or invalid parameters)
- `500` - Internal Server Error

---

## Rate Limiting

The API implements rate limiting:
- **Window:** 15 minutes
- **Max Requests:** 100 per IP address

When rate limit is exceeded, you'll receive a `429 Too Many Requests` response.

---

## CORS

The API accepts requests from:
- `http://localhost:3000` (default frontend)
- Configure additional origins in the backend `.env` file

---

## Authentication

Currently, the API does not require authentication. For production use, implement:
- API keys
- JWT tokens
- OAuth 2.0

---

## OpenAI API Key

All OpenAI endpoints require a valid OpenAI API key configured in the backend environment:

```bash
OPENAI_API_KEY=your_api_key_here
```

Without a valid API key, OpenAI endpoints will return authentication errors.
