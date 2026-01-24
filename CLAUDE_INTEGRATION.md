# Claude AI Integration Guide

This guide explains how to use the Claude AI integration in Time Machines Builders.

## Overview

Time Machines Builders now includes full integration with Anthropic's Claude AI models, providing advanced capabilities for:
- **Text Generation** - Natural language processing and content creation
- **Code Generation** - Automated code creation from descriptions
- **Code Analysis** - Detailed code review and optimization suggestions
- **Conversation** - Multi-turn dialogues with context preservation
- **Custom Prompts** - Flexible prompting with system messages and tuning

## Available Claude Models

- **claude-3-5-sonnet-20241022** (Default) - Best balance of intelligence and speed
- **claude-3-opus-20240229** - Highest intelligence for complex tasks
- **claude-3-sonnet-20240229** - Good balance for most applications
- **claude-3-haiku-20240307** - Fastest response times

## Setup

### 1. Get Your Anthropic API Key

1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (it starts with `sk-ant-`)

### 2. Configure Backend

Add your Anthropic API key to the backend `.env` file:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add:
```
ANTHROPIC_API_KEY=sk-ant-your_api_key_here
```

### 3. Start the Application

```bash
# Start backend
cd backend
npm run dev

# Start frontend (in another terminal)
cd frontend
npm start
```

## API Endpoints

### Generate Text
```bash
POST /api/claude/generate
Content-Type: application/json

{
  "prompt": "Explain quantum computing in simple terms",
  "model": "claude-3-5-sonnet-20241022",
  "temperature": 0.7,
  "maxTokens": 1024
}
```

### Summarize Text
```bash
POST /api/claude/summarize
Content-Type: application/json

{
  "text": "Long text to summarize..."
}
```

### Custom Prompt
```bash
POST /api/claude/custom-prompt
Content-Type: application/json

{
  "prompt": "Write a poem about AI",
  "systemMessage": "You are a creative poet",
  "model": "claude-3-5-sonnet-20241022",
  "temperature": 0.9,
  "maxTokens": 500
}
```

### Conversation
```bash
POST /api/claude/conversation
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "What is machine learning?" },
    { "role": "assistant", "content": "Machine learning is..." },
    { "role": "user", "content": "Can you give an example?" }
  ],
  "systemMessage": "You are a helpful AI tutor",
  "temperature": 0.7
}
```

### Analyze Code
```bash
POST /api/claude/analyze-code
Content-Type: application/json

{
  "code": "function example() { return true; }",
  "language": "javascript"
}
```

### Generate Code
```bash
POST /api/claude/generate-code
Content-Type: application/json

{
  "description": "Create a function that validates email addresses",
  "language": "javascript"
}
```

### Get History
```bash
GET /api/claude/history?limit=10
```

## Frontend Usage

### AI Prompt Interface

1. Open the application in your browser
2. Navigate to "AI Prompt Interface" tab
3. Select "Anthropic (Claude)" from the AI Provider dropdown
4. Choose your preferred Claude model
5. Enter your prompt and adjust parameters
6. Click "Generate" to get a response

### Claude Toolkit

The Claude Toolkit provides specialized tools:

#### Code Generation
1. Navigate to "Claude Toolkit" tab
2. Select "Code Generation"
3. Choose programming language
4. Describe what you want the code to do
5. Click "Generate Code"

#### Code Analysis
1. Navigate to "Claude Toolkit" tab
2. Select "Code Analysis"
3. Choose programming language
4. Paste your code
5. Click "Analyze Code"

## Tuning Parameters

### Temperature (0-2)
- **0.0-0.3**: Focused, deterministic responses
- **0.4-0.7**: Balanced creativity and consistency
- **0.8-1.0**: More creative and varied responses
- **1.0+**: Highly creative, less predictable

### Max Tokens
- Controls the maximum length of the response
- Claude models support up to 4096 tokens (varies by model)
- Recommended: 1024-2048 for most use cases

### Top P (0-1)
- Controls diversity via nucleus sampling
- Lower values = more focused
- Higher values = more diverse
- Recommended: 0.9-1.0

### System Messages
- Define Claude's behavior and personality
- Set context and constraints
- Example: "You are an expert Python developer"

## Best Practices

### 1. Prompt Engineering
- Be specific and clear in your prompts
- Provide context when necessary
- Use system messages to set behavior
- Break complex tasks into smaller prompts

### 2. Model Selection
- Use Haiku for simple, fast tasks
- Use Sonnet for balanced performance
- Use Opus for complex reasoning tasks
- Use Claude 3.5 Sonnet for latest capabilities

### 3. Error Handling
- Always check for API errors
- Handle rate limits gracefully
- Validate input before sending to API
- Store important responses in database

### 4. Cost Optimization
- Cache frequently used responses
- Use appropriate max_tokens limits
- Choose the right model for the task
- Batch similar requests when possible

## Supported Languages for Code Features

- JavaScript / TypeScript
- Python
- Java
- C++
- C#
- Go
- Rust
- Ruby
- PHP
- Swift
- Kotlin

## Comparison: Claude vs OpenAI

| Feature | Claude | OpenAI GPT |
|---------|--------|------------|
| Latest Model | Claude 3.5 Sonnet | GPT-4 Turbo |
| Context Window | Up to 200K tokens | Up to 128K tokens |
| Code Analysis | Excellent | Good |
| Reasoning | Excellent | Excellent |
| Embeddings | Not available | Available |
| Image Analysis | Available (Opus/Sonnet) | Available (GPT-4V) |
| Best For | Code, analysis, reasoning | General purpose, embeddings |

## Examples

### Example 1: Code Review
```javascript
const code = `
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}
`;

// API call
fetch('/api/claude/analyze-code', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    code: code,
    language: 'javascript'
  })
});
```

### Example 2: Generate Utility Function
```javascript
// API call
fetch('/api/claude/generate-code', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    description: 'Create a function that debounces another function',
    language: 'javascript'
  })
});
```

### Example 3: Multi-turn Conversation
```javascript
const messages = [
  { role: 'user', content: 'What is dependency injection?' },
  { role: 'assistant', content: 'Dependency injection is a design pattern...' },
  { role: 'user', content: 'Show me an example in TypeScript' }
];

fetch('/api/claude/conversation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: messages,
    systemMessage: 'You are an expert software architect'
  })
});
```

## Troubleshooting

### Issue: API Key Error
**Solution**: Verify your `ANTHROPIC_API_KEY` is set correctly in `backend/.env`

### Issue: Rate Limit Errors
**Solution**: Implement request throttling or upgrade your Anthropic plan

### Issue: Empty Responses
**Solution**: Check your maxTokens parameter and model availability

### Issue: Timeout Errors
**Solution**: Increase request timeout or reduce prompt complexity

## Resources

- [Anthropic Documentation](https://docs.anthropic.com/)
- [Claude API Reference](https://docs.anthropic.com/claude/reference)
- [Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/introduction-to-prompt-design)
- [Model Comparison](https://docs.anthropic.com/claude/docs/models-overview)

## Support

For issues or questions:
- Check [GitHub Issues](https://github.com/lippytm/Time-Machines-Builders-/issues)
- Review [Anthropic Documentation](https://docs.anthropic.com/)
- Contact the development team

---

**Note**: Claude integration complements the existing OpenAI integration. You can use both providers based on your specific needs.
