import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import { apiService } from '../../services/api.service';
import { AIOutput } from '../../types';

const Dashboard: React.FC = () => {
  const [history, setHistory] = useState<AIOutput[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const result = await apiService.getHistory(10);
      setHistory(result.outputs || []);
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalRequests: history.length,
    models: Array.from(new Set(history.map(h => h.model))),
  };

  return (
    <Box sx={{ maxWidth: 1400, margin: '0 auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        AI Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Requests
              </Typography>
              <Typography variant="h3" color="primary">
                {stats.totalRequests}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Models Used
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {stats.models.map((model, idx) => (
                  <Chip key={idx} label={model} color="primary" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activity
        </Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : history.length === 0 ? (
          <Typography color="textSecondary">No activity yet</Typography>
        ) : (
          <List>
            {history.map((output, idx) => (
              <ListItem
                key={output._id || idx}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  mb: 1,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Box sx={{ width: '100%', mb: 1 }}>
                  <Chip label={output.model} size="small" sx={{ mr: 1 }} />
                  <Typography variant="caption" color="textSecondary">
                    {new Date(output.timestamp).toLocaleString()}
                  </Typography>
                </Box>
                <ListItemText
                  primary={
                    <Typography variant="body2" noWrap>
                      <strong>Prompt:</strong> {output.prompt}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="textSecondary" noWrap>
                      <strong>Response:</strong> {output.response}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
