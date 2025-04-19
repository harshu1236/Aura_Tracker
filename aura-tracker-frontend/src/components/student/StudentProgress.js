import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  LinearProgress,
  Box
} from '@mui/material';
import studentService from '../../services/studentService';

function StudentProgress() {
  const [progress, setProgress] = useState({
    courseProgress: 0,
    assignmentsCompleted: 0,
    challengesCompleted: 0,
    totalPoints: 0
  });

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const studentId = localStorage.getItem('studentId');
        const data = await studentService.getProgress(studentId);
        setProgress(data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };
    fetchProgress();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Learning Progress
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Course Completion
            </Typography>
            <Box sx={{ mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={progress.courseProgress}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {progress.courseProgress}% Complete
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Assignments
            </Typography>
            <Typography variant="h4">
              {progress.assignmentsCompleted}
            </Typography>
            <Typography color="textSecondary">
              Completed
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Total Points
            </Typography>
            <Typography variant="h4">
              {progress.totalPoints}
            </Typography>
            <Typography color="textSecondary">
              Points Earned
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default StudentProgress;