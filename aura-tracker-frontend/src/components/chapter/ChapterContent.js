import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import chapterService from '../../services/chapterService';

function ChapterContent() {
  const [chapter, setChapter] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const data = await chapterService.getChapterById(id);
        setChapter(data);
      } catch (error) {
        console.error('Error fetching chapter:', error);
      }
    };
    fetchChapter();
  }, [id]);

  if (!chapter) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {chapter.title}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" paragraph>
          {chapter.content}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Learning Objectives
        </Typography>
        <List>
          {chapter.objectives.map((objective, index) => (
            <ListItem key={index}>
              <ListItemText primary={objective} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default ChapterContent;