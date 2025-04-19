import { Card, CardContent, CardActions, Button, Typography, LinearProgress } from '@mui/material';
import challengeService from '../../services/challengeService';

function ChallengeCard({ challenge }) {
  const handleAccept = async () => {
    try {
      await challengeService.acceptChallenge(challenge.id);
      // Refresh challenges or update UI
    } catch (error) {
      console.error('Error accepting challenge:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {challenge.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Points: {challenge.points}
        </Typography>
        <Typography variant="body2">
          {challenge.description}
        </Typography>
        {challenge.accepted && (
          <>
            <Typography sx={{ mt: 2 }} variant="body2">
              Progress: {challenge.progress}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={challenge.progress}
              sx={{ mt: 1 }}
            />
          </>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={handleAccept}
          disabled={challenge.accepted}
        >
          {challenge.accepted ? 'In Progress' : 'Accept Challenge'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ChallengeCard;