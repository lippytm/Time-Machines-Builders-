import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';
import PromptInterface from './components/PromptInterface/PromptInterface';
import DataVisualization from './components/DataVisualization/DataVisualization';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Time Machines Builders - Full Stack AI Platform
            </Typography>
          </Toolbar>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ bgcolor: 'primary.dark' }}
          >
            <Tab label="Dashboard" />
            <Tab label="AI Prompt Interface" />
            <Tab label="Data & Embeddings" />
          </Tabs>
        </AppBar>

        <Container maxWidth={false}>
          <TabPanel value={currentTab} index={0}>
            <Dashboard />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <PromptInterface />
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <DataVisualization />
          </TabPanel>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
