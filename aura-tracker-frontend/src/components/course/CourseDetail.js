import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider
} from '@mui/material';
import courseService from '../../services/courseService';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseById(id);
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {course.name}
        </Typography>
        <Typography color="text.secondary" paragraph>
          {course.description}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Chapters
        </Typography>
        <List>
          {course.chapters?.map((chapter) => (
            <ListItem key={chapter.id}>
              <ListItemText
                primary={chapter.title}
                secondary={chapter.description}
              />
              <Button
                variant="outlined"
                href={`/chapters/${chapter.id}`}
              >
                Start
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default CourseDetail;