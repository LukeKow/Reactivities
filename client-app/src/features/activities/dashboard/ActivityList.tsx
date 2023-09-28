import { Activity } from '../../../app/models/activity';
import ActivityCard from './ActivityCard';

type ActivityListProps = {
    activities: Activity[];
    onItemClick: (index: number) => void;
};

function ActivityList({ activities, onItemClick }: ActivityListProps) {
  return (
    <>
      {activities.map((activity, index) => (
        <ActivityCard key={activity.id} activity={activity} onClick={() => onItemClick(index)} />
      ))}
    </>
  );
}

export default ActivityList;
