import { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  Container
} from '@mui/material';
import { PlayCircleOutline as StartIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import chapterService from '../../services/chapterService';

function ChapterList({ courseId }) {
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const data = await chapterService.getChapters(courseId);
        setChapters(data);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };
    fetchChapters();
  }, [courseId]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Course Chapters
        </Typography>
        <List>
          {chapters.map((chapter) => (
            <ListItem key={chapter.id} divider>
              <ListItemText
                primary={chapter.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      Duration: {chapter.duration} minutes
                    </Typography>
                    <br />
                    {chapter.description}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => navigate(`/chapters/${chapter.id}`)}
                >
                  <StartIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default ChapterList;