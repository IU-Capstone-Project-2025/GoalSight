import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

function HomePage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:8000/');
        setText(response.data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Error loading data from server');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            GoalSight
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Message from backend:
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mt: 2,
              backgroundColor: '#f5f5f5',
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <Typography variant="body1">{text}</Typography>
            )}
          </Paper>
        </Paper>
      </Box>
    </Container>
  );
}

export default HomePage; 