import {
    Button,
    Card,
    CardActions,
    CardContent, Chip, Typography,
} from '@mui/material';
import { Activity } from '../../../app/models/activity';

type ActivityCardProps = { activity: Activity, onClick: () => void };

function ActivityCard({
    activity,
    onClick,
}: ActivityCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {activity.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {activity.date}
        </Typography>

        <Typography variant="body2">
          {activity.description}
        </Typography>
        <Typography variant="body2">
          {activity.city}
          ,
          {' '}
          {activity.venue}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Chip label={activity.category} variant="outlined" />
        <Button variant="contained" size="small" onClick={onClick}>View</Button>
      </CardActions>
    </Card>

  );
}

export default ActivityCard;
