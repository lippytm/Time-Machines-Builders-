# MongoDB Setup Guide

## Collections

The application uses the following MongoDB collections:

### 1. ai_outputs
Stores AI-generated outputs and responses.

**Schema:**
```javascript
{
  prompt: String,
  response: String,
  model: String,
  metadata: Object,
  timestamp: Date
}
```

### 2. training_data
Stores training data for machine learning models.

**Schema:**
```javascript
{
  data: Mixed,
  label: String,
  source: String,
  timestamp: Date
}
```

### 3. user_sessions
Stores user session information.

**Schema:**
```javascript
{
  sessionId: String,
  userId: String,
  data: Object,
  createdAt: Date,
  expiresAt: Date
}
```

## Setup Instructions

### Using MongoDB Shell

```bash
# Connect to MongoDB
mongosh

# Use the database
use timemachines

# Create collections (optional, will be created automatically)
db.createCollection("ai_outputs")
db.createCollection("training_data")
db.createCollection("user_sessions")

# Create indexes for better performance
db.ai_outputs.createIndex({ timestamp: -1 })
db.ai_outputs.createIndex({ model: 1 })
db.training_data.createIndex({ timestamp: -1 })
db.user_sessions.createIndex({ sessionId: 1 }, { unique: true })
db.user_sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
```

### Using MongoDB Compass

1. Connect to your MongoDB instance
2. Create a new database named `timemachines`
3. The collections will be created automatically when the application starts

## Environment Configuration

Make sure your MongoDB connection string is configured in the backend `.env` file:

```
MONGODB_URI=mongodb://localhost:27017/timemachines
```

For MongoDB Atlas (cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/timemachines
```
