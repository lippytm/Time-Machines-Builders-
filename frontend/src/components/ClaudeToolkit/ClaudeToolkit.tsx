import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { apiService } from '../../services/api.service';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`claude-tabpanel-${index}`}
      aria-labelledby={`claude-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const ClaudeToolkit: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Code Generation
  const [codeDescription, setCodeDescription] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const [generatedCode, setGeneratedCode] = useState('');

  // Code Analysis
  const [codeToAnalyze, setCodeToAnalyze] = useState('');
  const [analysisLanguage, setAnalysisLanguage] = useState('javascript');
  const [codeAnalysis, setCodeAnalysis] = useState('');

  const handleGenerateCode = async () => {
    if (!codeDescription.trim()) {
      setError('Please enter a code description');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedCode('');

    try {
      const result = await apiService.claudeGenerateCode(codeDescription, codeLanguage);
      setGeneratedCode(result.code);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to generate code');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeCode = async () => {
    if (!codeToAnalyze.trim()) {
      setError('Please enter code to analyze');
      return;
    }

    setLoading(true);
    setError('');
    setCodeAnalysis('');

    try {
      const result = await apiService.claudeAnalyzeCode(codeToAnalyze, analysisLanguage);
      setCodeAnalysis(result.analysis);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to analyze code');
    } finally {
      setLoading(false);
    }
  };

  const programmingLanguages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'cpp',
    'csharp',
    'go',
    'rust',
    'ruby',
    'php',
    'swift',
    'kotlin',
  ];

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Claude AI Toolkit
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Advanced code generation and analysis powered by Claude AI
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
          <Tab label="Code Generation" icon={<CodeIcon />} iconPosition="start" />
          <Tab label="Code Analysis" icon={<AnalyticsIcon />} iconPosition="start" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <TabPanel value={tabValue} index={0}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Programming Language</InputLabel>
            <Select
              value={codeLanguage}
              label="Programming Language"
              onChange={(e) => setCodeLanguage(e.target.value)}
            >
              {programmingLanguages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Code Description"
            multiline
            rows={4}
            value={codeDescription}
            onChange={(e) => setCodeDescription(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="Describe what you want the code to do..."
          />

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleGenerateCode}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <CodeIcon />}
          >
            {loading ? 'Generating...' : 'Generate Code'}
          </Button>

          {generatedCode && (
            <Paper sx={{ p: 2, mt: 3, backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6" gutterBottom>
                Generated Code:
              </Typography>
              <Typography
                component="pre"
                sx={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  overflow: 'auto',
                  maxHeight: '500px',
                }}
              >
                {generatedCode}
              </Typography>
            </Paper>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Programming Language</InputLabel>
            <Select
              value={analysisLanguage}
              label="Programming Language"
              onChange={(e) => setAnalysisLanguage(e.target.value)}
            >
              {programmingLanguages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Code to Analyze"
            multiline
            rows={8}
            value={codeToAnalyze}
            onChange={(e) => setCodeToAnalyze(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="Paste your code here for analysis..."
          />

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleAnalyzeCode}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <AnalyticsIcon />}
          >
            {loading ? 'Analyzing...' : 'Analyze Code'}
          </Button>

          {codeAnalysis && (
            <Paper sx={{ p: 2, mt: 3, backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6" gutterBottom>
                Analysis Results:
              </Typography>
              <Typography
                component="pre"
                sx={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'sans-serif',
                  fontSize: '0.9rem',
                  overflow: 'auto',
                  maxHeight: '500px',
                }}
              >
                {codeAnalysis}
              </Typography>
            </Paper>
          )}
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default ClaudeToolkit;
