// src/components/dashboard/Dashboard.js
import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Student Dashboard
        </Typography>
        {/* Add your dashboard content here */}
      </Paper>
    </Container>
  );
}

export default Dashboard;