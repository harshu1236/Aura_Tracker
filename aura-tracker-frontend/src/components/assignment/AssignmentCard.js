import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AssignmentCard({ assignment }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {assignment.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Due: {new Date(assignment.dueDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2">
          {assignment.description}
        </Typography>
        <Typography sx={{ mt: 1 }} color="text.secondary">
          Points: {assignment.points}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => navigate(`/assignments/${assignment.id}`)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

export default AssignmentCard;