import { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import AssignmentCard from './AssignmentCard';
import assignmentService from '../../services/assignmentService';

function AssignmentList() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await assignmentService.getAssignments();
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };
    fetchAssignments();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Assignments
      </Typography>
      <Grid container spacing={3}>
        {assignments.map((assignment) => (
          <Grid item xs={12} sm={6} md={4} key={assignment.id}>
            <AssignmentCard assignment={assignment} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AssignmentList;