import { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import RewardCard from './RewardCard';
import rewardService from '../../services/rewardService';

function RewardList() {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const studentId = localStorage.getItem('studentId'); // Get from auth
        const data = await rewardService.getRewards(studentId);
        setRewards(data);
      } catch (error) {
        console.error('Error fetching rewards:', error);
      }
    };
    fetchRewards();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Rewards
      </Typography>
      <Grid container spacing={3}>
        {rewards.map((reward) => (
          <Grid item xs={12} sm={6} md={4} key={reward.id}>
            <RewardCard reward={reward} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RewardList;