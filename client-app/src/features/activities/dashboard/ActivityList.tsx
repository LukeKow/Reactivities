import { styled, Paper, Grid } from '@mui/material';
import { Activity } from '../../../app/models/activity';

type ActivityListProps = {
  activities: Activity[];
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ActivityList({ activities }: ActivityListProps) {
  return (
    <>
      {activities.map((activity) => (
        <Grid key={activity.id} item xs={8}>
          <Item key={activity.id}>{activity.title}</Item>
        </Grid>
      ))}
    </>
  );
}

export default ActivityList;
