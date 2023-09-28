import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { agent } from '../../../app/api/agent';
import { Activity } from '../../../app/models/activity';

type ActivityDetailsProps = {
    activity: Activity & { imageSrc: string | null };
    onEdit: () => void;
    onCancel: () => void;
};

function ActivityDetails({
 activity, onEdit, onCancel,
}: ActivityDetailsProps) {
    const deleteActivity = () => agent.Activities
        .delete(activity.id);

    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: deleteActivity,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate();
    };

    return (
      <Card sx={{ minWidth: 275, height: 'fit-content' }}>
        {activity.imageSrc && <CardMedia image={activity.imageSrc} />}
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

        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" size="small" onClick={onEdit}>Edit</Button>
          <Button variant="contained" size="small" onClick={onCancel}>Cancel</Button>
          <Button variant="contained" color="error" size="small" onClick={handleDelete}>Delete</Button>
        </CardActions>
      </Card>
    );
}

export default ActivityDetails;
