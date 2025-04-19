import { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import timetableService from '../../services/timetableService';

function TimetableForm() {
  const [entry, setEntry] = useState({
    dayOfWeek: '',
    subject: '',
    startTime: '',
    endTime: ''
  });
  const navigate = useNavigate();

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await timetableService.addTimetableEntry(entry);
      navigate('/timetable');
    } catch (error) {
      console.error('Failed to add timetable entry:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Add Timetable Entry
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            fullWidth
            label="Day of Week"
            margin="normal"
            value={entry.dayOfWeek}
            onChange={(e) => setEntry({...entry, dayOfWeek: e.target.value})}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Subject"
            margin="normal"
            value={entry.subject}
            onChange={(e) => setEntry({...entry, subject: e.target.value})}
          />
          <TextField
            fullWidth
            type="time"
            label="Start Time"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={entry.startTime}
            onChange={(e) => setEntry({...entry, startTime: e.target.value})}
          />
          <TextField
            fullWidth
            type="time"
            label="End Time"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={entry.endTime}
            onChange={(e) => setEntry({...entry, endTime: e.target.value})}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Add Entry
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default TimetableForm;