# Claude AI Quick Reference

Quick reference for using Claude AI in Time Machines Builders.

## API Endpoints

### Generate Text
```bash
POST /api/claude/generate
{
  "prompt": "Your prompt here",
  "model": "claude-3-5-sonnet-20241022",
  "temperature": 0.7,
  "maxTokens": 1024
}
```

### Summarize
```bash
POST /api/claude/summarize
{
  "text": "Text to summarize..."
}
```

### Custom Prompt
```bash
POST /api/claude/custom-prompt
{
  "prompt": "Your prompt",
  "systemMessage": "You are a helpful assistant",
  "model": "claude-3-5-sonnet-20241022",
  "temperature": 0.7,
  "maxTokens": 1024,
  "topP": 1.0
}
```

### Conversation
```bash
POST /api/claude/conversation
{
  "messages": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi there!" },
    { "role": "user", "content": "How are you?" }
  ],
  "systemMessage": "You are helpful",
  "temperature": 0.7
}
```

### Analyze Code
```bash
POST /api/claude/analyze-code
{
  "code": "function example() { return true; }",
  "language": "javascript"
}
```

### Generate Code
```bash
POST /api/claude/generate-code
{
  "description": "Create a function to validate email",
  "language": "javascript"
}
```

### Get History
```bash
GET /api/claude/history?limit=10
```

## Frontend Usage

### Import API Service
```typescript
import { apiService } from '../services/api.service';
```

### Generate Text
```typescript
const result = await apiService.claudeGenerateText(
  "Explain quantum computing",
  {
    model: "claude-3-5-sonnet-20241022",
    temperature: 0.7,
    maxTokens: 1024
  }
);
console.log(result.response);
```

### Analyze Code
```typescript
const analysis = await apiService.claudeAnalyzeCode(
  "const x = 1;",
  "javascript"
);
console.log(analysis.analysis);
```

### Generate Code
```typescript
const code = await apiService.claudeGenerateCode(
  "Create a debounce function",
  "typescript"
);
console.log(code.code);
```

## Available Models

| Model | Best For | Speed | Context |
|-------|----------|-------|---------|
| claude-3-5-sonnet-20241022 | General use, code | Fast | 200K |
| claude-3-opus-20240229 | Complex reasoning | Slow | 200K |
| claude-3-sonnet-20240229 | Balanced tasks | Medium | 200K |
| claude-3-haiku-20240307 | Simple, fast tasks | Fastest | 200K |

## Temperature Guide

- **0.0-0.3**: Deterministic, factual
- **0.4-0.7**: Balanced (default: 0.7)
- **0.8-1.0**: Creative
- **1.0-2.0**: Very creative

## Programming Languages

Supported for code features:
- JavaScript/TypeScript
- Python
- Java
- C++/C#
- Go
- Rust
- Ruby
- PHP
- Swift
- Kotlin

## Common Patterns

### Error Handling
```typescript
try {
  const result = await apiService.claudeGenerateText(prompt);
  console.log(result.response);
} catch (error) {
  console.error('Error:', error.response?.data?.error);
}
```

### With Loading State
```typescript
const [loading, setLoading] = useState(false);

const handleGenerate = async () => {
  setLoading(true);
  try {
    const result = await apiService.claudeGenerateText(prompt);
    setResponse(result.response);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### Multi-turn Conversation
```typescript
const [messages, setMessages] = useState([
  { role: 'user', content: 'Hello' }
]);

const addMessage = async (content: string) => {
  const newMessages = [...messages, { role: 'user', content }];
  const result = await apiService.claudeConversation(newMessages);
  setMessages([
    ...newMessages,
    { role: 'assistant', content: result.response }
  ]);
};
```

## Environment Variables

Backend (.env):
```bash
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

## Response Format

All endpoints return:
```typescript
{
  "response": "Generated text...",
  // or
  "summary": "Summary text...",
  // or
  "code": "Generated code...",
  // or
  "analysis": "Code analysis..."
}
```

## Rate Limits

- Free tier: 5 requests/minute
- Paid tier: Varies by plan
- Implement retry logic for production

## Best Practices

1. **Use appropriate models**: Haiku for speed, Opus for quality
2. **Set reasonable maxTokens**: 1024-2048 for most use cases
3. **Cache responses**: Store in database for repeated queries
4. **Handle errors gracefully**: Always use try-catch
5. **Validate inputs**: Check prompt length and content
6. **Monitor usage**: Track API costs and usage patterns

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 401 Error | Check ANTHROPIC_API_KEY |
| Rate limit | Add delay between requests |
| Empty response | Check maxTokens setting |
| Timeout | Reduce prompt complexity |

## Links

- [Full Integration Guide](CLAUDE_INTEGRATION.md)
- [API Documentation](docs/api/API.md)
- [Anthropic Docs](https://docs.anthropic.com/)
