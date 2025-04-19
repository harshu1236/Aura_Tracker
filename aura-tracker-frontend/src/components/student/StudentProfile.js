import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import studentService from '../../services/studentService';

function StudentProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const studentId = localStorage.getItem('studentId');
        const data = await studentService.getProfile(studentId);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Avatar
              sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
              src={profile.avatar}
            />
            <Typography variant="h5">{profile.name}</Typography>
            <Typography color="textSecondary">{profile.studentId}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Progress Overview
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Completed Courses"
                  secondary={profile.completedCourses}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Total Points"
                  secondary={profile.points}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Achievements"
                  secondary={profile.achievements}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default StudentProfile;