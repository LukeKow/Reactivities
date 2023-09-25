import { Grid } from '@mui/material';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';

type ActivityDashboardProps = {
  activities: Activity[];
};

function ActivityDashboard({ activities }: ActivityDashboardProps) {
  return (
    <Grid container spacing={2}>
      <ActivityList activities={activities} />
    </Grid>

  );
}

export default ActivityDashboard;
