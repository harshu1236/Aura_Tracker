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
    <Container maxWidth="sm" className="mt-20">
      <Paper className="p-8 shadow-xl rounded-xl bg-white">
        <Typography variant="h4" className="text-center mb-6 font-semibold text-blue-600">
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Registration Number"
            margin="normal"
            value={student.regNo}
            onChange={(e) => setStudent({ ...student, regNo: e.target.value })}
            className="mb-4"
          />
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={student.studentName}
            onChange={(e) => setStudent({ ...student, studentName: e.target.value })}
            className="mb-4"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={student.password}
            onChange={(e) => setStudent({ ...student, password: e.target.value })}
            className="mb-6"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
          >
            Signup
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Signup;
