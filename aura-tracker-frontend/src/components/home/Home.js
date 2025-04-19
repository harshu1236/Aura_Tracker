// `aura-tracker-frontend/src/components/home/Home.js`
import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Grid, Avatar, List, ListItem, ListItemText } from '@mui/material';
import studentService from '../../services/studentService';

function Home() {
  const [studentDetails, setStudentDetails] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const studentId = JSON.parse(localStorage.getItem('user'))?.studentId;

        if (!studentId) {
          console.error('Student ID not found in localStorage');
          return;
        }

        const data = await studentService.getStudentById(studentId);
        setStudentDetails(data);
      } catch (error) {
        console.error('Error fetching student details:', error.response || error.message);
      }
    };

    fetchStudentDetails();
  }, []);

  if (!studentDetails) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5">Loading student details...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {studentDetails.studentName}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Avatar
              sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
              src={studentDetails.avatar || ''}
            />
            <Typography variant="h5">{studentDetails.studentName}</Typography>
            <Typography color="textSecondary">{studentDetails.regNo}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Student Details
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Registration Number" secondary={studentDetails.regNo} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Points" secondary={studentDetails.points} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Courses" secondary={studentDetails.course?.length || 0} />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;