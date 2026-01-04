# API Documentation

## Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "token": "jwt-token"
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### OAuth2 Login
```http
GET /api/auth/google
```
Redirects to Google OAuth consent screen.

## Dataset Endpoints

### Get All Datasets
```http
GET /api/datasets
Authorization: Bearer {token}
```

### Create Dataset
```http
POST /api/datasets
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Sales Data Q1",
  "description": "Quarterly sales time series",
  "data": {
    "values": [100, 120, 115, 130, 125, 140]
  }
}
```

### Get Dataset by ID
```http
GET /api/datasets/{id}
Authorization: Bearer {token}
```

### Rollback Dataset
```http
POST /api/datasets/{id}/rollback
Authorization: Bearer {token}
```

## Model Endpoints

### Get All Models
```http
GET /api/models
Authorization: Bearer {token}
```

### Train New Model
```http
POST /api/models
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Sales Forecaster",
  "type": "time-series",
  "datasetId": "uuid",
  "parameters": {
    "window_size": 5
  }
}
```

**Model Types:**
- `time-series`: Time series forecasting
- `nlp`: Natural language processing
- `classification`: Classification tasks
- `regression`: Regression analysis

### Get Model by ID
```http
GET /api/models/{id}
Authorization: Bearer {token}
```

## Prediction Endpoints

### Get All Predictions
```http
GET /api/predictions
Authorization: Bearer {token}
```

### Create Prediction
```http
POST /api/predictions
Authorization: Bearer {token}
Content-Type: application/json

{
  "modelId": "uuid",
  "input": {
    "steps": 5
  }
}
```

**Input Formats:**

For time-series models:
```json
{
  "input": {
    "steps": 5
  }
}
```

For NLP models:
```json
{
  "input": {
    "text": "This product is amazing!"
  }
}
```

### Get Prediction by ID
```http
GET /api/predictions/{id}
Authorization: Bearer {token}
```

## AI Service Endpoints

### Health Check
```http
GET /health
```

### Train Model
```http
POST /train
Content-Type: application/json

{
  "modelId": "uuid",
  "type": "time-series",
  "data": {
    "values": [1, 2, 3, 4, 5]
  },
  "parameters": {
    "window_size": 3
  }
}
```

### Make Prediction
```http
POST /predict
Content-Type: application/json

{
  "modelId": "uuid",
  "modelPath": "./models/uuid",
  "type": "time-series",
  "input": {
    "steps": 5
  }
}
```

### List Models
```http
GET /models
```

## Error Responses

All endpoints may return the following error responses:

```json
{
  "error": "Error message"
}
```

Common status codes:
- `400`: Bad Request - Invalid input
- `401`: Unauthorized - Missing or invalid token
- `404`: Not Found - Resource not found
- `409`: Conflict - Resource already exists
- `500`: Internal Server Error

## Rate Limiting

Currently, there are no rate limits. In production, consider implementing rate limiting using packages like `express-rate-limit`.

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer {your-jwt-token}
```

Tokens are obtained through `/api/auth/register` or `/api/auth/login` and are valid for 7 days.
