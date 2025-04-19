import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import rewardService from '../../services/rewardService';

function RewardCard({ reward }) {
  const handleUnlock = async () => {
    try {
      await rewardService.unlockReward(reward.id);
      // Refresh rewards list or update UI
    } catch (error) {
      console.error('Error unlocking reward:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {reward.name}
        </Typography>
        <Typography color="text.secondary">
          {reward.description}
        </Typography>
        <Typography variant="body2">
          Points required: {reward.pointsRequired}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={handleUnlock}
          disabled={reward.unlocked}
        >
          {reward.unlocked ? 'Unlocked' : 'Unlock'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default RewardCard;