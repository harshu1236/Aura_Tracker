// src/components/auth/Signup.js
import { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [student, setStudent] = useState({
    regNo: '',
    studentName: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending signup request:', student); // Debugging
      const response = await axios.post('http://localhost:1211/api/auth/signup', student);
      console.log('Signup response:', response.data); // Debugging
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Registration Number"
            margin="normal"
            value={student.regNo}
            onChange={(e) => setStudent({ ...student, regNo: e.target.value })}
          />
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={student.studentName}
            onChange={(e) => setStudent({ ...student, studentName: e.target.value })}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={student.password}
            onChange={(e) => setStudent({ ...student, password: e.target.value })}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Signup
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Signup;