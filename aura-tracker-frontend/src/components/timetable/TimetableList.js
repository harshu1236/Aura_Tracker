// src/components/timetable/TimetableList.js
import { useState, useEffect } from 'react';
import {
  Container, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import timetableService from '../../services/timetableService';

function TimetableList() {
  const [timetables, setTimetables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const data = await timetableService.getTimetableByDay('MONDAY');
        setTimetables(data);
      } catch (error) {
        console.error('Error fetching timetables:', error);
      }
    };
    fetchTimetables();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Button variant="contained" color="primary" onClick={() => navigate('/timetable/add')} sx={{ mb: 2 }}>
        Add New Entry
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timetables.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.dayOfWeek}</TableCell>
                <TableCell>{t.subject}</TableCell>
                <TableCell>{t.startTime}</TableCell>
                <TableCell>{t.endTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default TimetableList;
