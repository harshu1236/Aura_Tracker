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
      <Container maxWidth="lg" className="mt-10">
        <Typography variant="h5" className="text-center text-gray-600">Loading student details...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="mt-10 px-4 md:px-0 bg-gradient-to-r from-purple-300 via-indigo-200 to-teal-300">
      <Typography variant="h4" className="mb-6 font-semibold text-center text-teal-700">
        Welcome, {studentDetails.studentName}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className="p-6 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 shadow-2xl rounded-xl flex flex-col items-center">
            <Avatar
              className="w-32 h-32 mb-4 object-cover border-4 border-white"
              src={studentDetails.avatar || ''}
            />
            <Typography variant="h5" className="font-semibold text-white">{studentDetails.studentName}</Typography>
            <Typography className="text-white opacity-80">{studentDetails.regNo}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-2xl rounded-xl border-t-4 border-teal-500">
            <Typography variant="h6" className="mb-4 font-semibold text-white">
              Student Details
            </Typography>
            <List>
              <ListItem className="border-b border-white hover:bg-blue-100">
                <ListItemText primary="Registration Number" secondary={studentDetails.regNo} />
              </ListItem>
              <ListItem className="border-b border-white hover:bg-blue-100">
                <ListItemText primary="Points" secondary={studentDetails.points} />
              </ListItem>
              <ListItem className="border-b border-white hover:bg-blue-100">
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
