import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { apiService } from '../../services/api.service';

const DataVisualization: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [embedding, setEmbedding] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateEmbedding = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text');
      return;
    }

    setLoading(true);
    setError('');
    setEmbedding([]);

    try {
      const result = await apiService.createEmbedding(inputText);
      setEmbedding(result.embedding);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create embedding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Data Visualization - Embeddings
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          label="Text to Embed"
          multiline
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          sx={{ mb: 2 }}
          placeholder="Enter text to create embeddings..."
        />

        <Button
          variant="contained"
          onClick={handleCreateEmbedding}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? 'Creating Embedding...' : 'Create Embedding'}
        </Button>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {embedding.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Embedding Vector (Dimensions: {embedding.length})
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary">
              First 10 values:
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {embedding.slice(0, 10).map((value, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{idx}</TableCell>
                      <TableCell>{value.toFixed(6)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Alert severity="info">
            This is a {embedding.length}-dimensional vector representation of your text.
            These embeddings can be used for semantic search, clustering, and similarity comparisons.
          </Alert>
        </Paper>
      )}
    </Box>
  );
};

export default DataVisualization;
