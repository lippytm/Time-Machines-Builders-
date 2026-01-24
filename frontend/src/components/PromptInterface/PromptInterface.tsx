import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { apiService } from '../../services/api.service';

const PromptInterface: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [systemMessage, setSystemMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // AI Provider selection
  const [provider, setProvider] = useState<'openai' | 'claude'>('openai');
  
  // Tuning parameters
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      let result;
      if (provider === 'claude') {
        result = await apiService.claudeCustomPrompt(
          prompt,
          systemMessage || undefined,
          {
            model,
            temperature,
            maxTokens,
          }
        );
      } else {
        result = await apiService.customPrompt(
          prompt,
          systemMessage || undefined,
          {
            model,
            temperature,
            maxTokens,
          }
        );
      }
      setResponse(result.response);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to generate response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        AI Prompt Interface
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>AI Provider</InputLabel>
          <Select
            value={provider}
            label="AI Provider"
            onChange={(e) => {
              const newProvider = e.target.value as 'openai' | 'claude';
              setProvider(newProvider);
              // Set default model based on provider
              if (newProvider === 'claude') {
                setModel('claude-3-5-sonnet-20241022');
              } else {
                setModel('gpt-3.5-turbo');
              }
            }}
          >
            <MenuItem value="openai">OpenAI (GPT)</MenuItem>
            <MenuItem value="claude">Anthropic (Claude)</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="System Message (Optional)"
          multiline
          rows={2}
          value={systemMessage}
          onChange={(e) => setSystemMessage(e.target.value)}
          sx={{ mb: 2 }}
          placeholder="Define the AI's behavior and context..."
        />

        <TextField
          fullWidth
          label="Your Prompt"
          multiline
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          sx={{ mb: 2 }}
          placeholder="Enter your prompt here..."
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Model</InputLabel>
            <Select
              value={model}
              label="Model"
              onChange={(e) => setModel(e.target.value)}
            >
              {provider === 'openai' ? (
                <>
                  <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                  <MenuItem value="gpt-4">GPT-4</MenuItem>
                  <MenuItem value="gpt-4-turbo-preview">GPT-4 Turbo</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem value="claude-3-5-sonnet-20241022">Claude 3.5 Sonnet</MenuItem>
                  <MenuItem value="claude-3-opus-20240229">Claude 3 Opus</MenuItem>
                  <MenuItem value="claude-3-sonnet-20240229">Claude 3 Sonnet</MenuItem>
                  <MenuItem value="claude-3-haiku-20240307">Claude 3 Haiku</MenuItem>
                </>
              )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Max Tokens"
            type="number"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
            inputProps={{ min: 100, max: 4000, step: 100 }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>
            Temperature: {temperature}
          </Typography>
          <Slider
            value={temperature}
            onChange={(_, value) => setTemperature(value as number)}
            min={0}
            max={2}
            step={0.1}
            marks
            valueLabelDisplay="auto"
          />
        </Box>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
        >
          {loading ? 'Generating...' : 'Generate'}
        </Button>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {response && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Response:
          </Typography>
          <Typography
            component="pre"
            sx={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
            }}
          >
            {response}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default PromptInterface;
