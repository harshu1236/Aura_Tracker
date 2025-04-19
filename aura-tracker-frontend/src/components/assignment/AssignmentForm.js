import { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import assignmentService from '../../services/assignmentService';

function AssignmentForm() {
  const [assignment, setAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
    points: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await assignmentService.createAssignment(assignment);
      navigate('/assignments');
    } catch (error) {
      console.error('Failed to create assignment:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Create Assignment
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={assignment.title}
            onChange={(e) => setAssignment({...assignment, title: e.target.value})}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            margin="normal"
            value={assignment.description}
            onChange={(e) => setAssignment({...assignment, description: e.target.value})}
          />
          <TextField
            fullWidth
            type="datetime-local"
            label="Due Date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={assignment.dueDate}
            onChange={(e) => setAssignment({...assignment, dueDate: e.target.value})}
          />
          <TextField
            fullWidth
            type="number"
            label="Points"
            margin="normal"
            value={assignment.points}
            onChange={(e) => setAssignment({...assignment, points: e.target.value})}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Create Assignment
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AssignmentForm;