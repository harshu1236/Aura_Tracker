import { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ChallengeCard from './ChallengeCard';
import challengeService from '../../services/challengeService';

function ChallengeList() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await challengeService.getChallenges();
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };
    fetchChallenges();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Challenges
      </Typography>
      <Grid container spacing={3}>
        {challenges.map((challenge) => (
          <Grid item xs={12} sm={6} md={4} key={challenge.id}>
            <ChallengeCard challenge={challenge} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ChallengeList;