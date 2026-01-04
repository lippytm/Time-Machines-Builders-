import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Models from './pages/Models';
import Datasets from './pages/Datasets';
import Predictions from './pages/Predictions';
import Layout from './components/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />
        
        <Route path="/" element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/models" element={
          <PrivateRoute>
            <Layout>
              <Models />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/datasets" element={
          <PrivateRoute>
            <Layout>
              <Datasets />
            </Layout>
          </PrivateRoute>
        } />
        
        <Route path="/predictions" element={
          <PrivateRoute>
            <Layout>
              <Predictions />
            </Layout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
