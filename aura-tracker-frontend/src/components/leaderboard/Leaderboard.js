import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import leaderboardService from '../../services/leaderboardService';

function Leaderboard() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const data = await leaderboardService.getRankings();
        setRankings(data);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };
    fetchRankings();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Achievements</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankings.map((ranking, index) => (
              <TableRow key={ranking.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{ranking.studentName}</TableCell>
                <TableCell>{ranking.points}</TableCell>
                <TableCell>{ranking.achievements}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Leaderboard;