import { Box, Container } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityDto, agent } from '../../../app/api/agent';
import { Activity } from '../../../app/models/activity';
import { ActivityCategory } from '../../../app/models/activityCategory';
import culture from '../../../assets/categoryImages/culture.jpg';
import drinks from '../../../assets/categoryImages/drinks.jpg';
import film from '../../../assets/categoryImages/film.jpg';
import music from '../../../assets/categoryImages/music.jpg';
import { ActivityForm } from '../form/ActivityForm';
import ActivityDetails from './ActivityDetails';
import ActivityList from './ActivityList';

const getCategoryImage = (category: ActivityCategory) => {
    switch (category) {
        case 'culture': return culture;
        case 'travel': return drinks;
        case 'music': return music;
        case 'film': return film;
        case 'drinks': return drinks;
        default: return null;
    }
};

type ActivityDashboardProps = {
    activities: Activity[];
    showCreateActivityForm: boolean;
    onActivityCreateCancel: () => void;
};

export function ActivityDashboard(
    { activities, showCreateActivityForm, onActivityCreateCancel }: ActivityDashboardProps,
) {
    const [selectedActivity, setSelectedActivity] = useState<Activity>();
    const [showEditForm, setShowEditForm] = useState(false);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (activityDto: ActivityDto) => (selectedActivity
            ? agent.Activities.update(selectedActivity.id, activityDto)
            : agent.Activities.create(activityDto)),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        },
    });

    const handleActivityListItemClick = (index: number) => {
        onActivityCreateCancel();
        if (activities[index].id === selectedActivity?.id) return;
        setSelectedActivity(activities[index]);
        setShowEditForm(false);
    };

    const handleCancelEdit = () => {
        setSelectedActivity(undefined);
        setShowEditForm(false);
    };

    const handleShowEditForm = () => {
        setShowEditForm(true);
    };

    return (
      <Container sx={{ display: 'flex', flexDirection: 'row' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', maxWidth: '50%' }}>
          <ActivityList activities={activities} onItemClick={handleActivityListItemClick} />
        </Container>

        <Box minWidth="50%">
          {selectedActivity !== undefined
                && (

                <ActivityDetails
                  activity={{
                    ...selectedActivity,
                    imageSrc: getCategoryImage(selectedActivity.category),
                }}
                  onEdit={handleShowEditForm}
                  onCancel={handleCancelEdit}
                />
                    )}
          {selectedActivity !== undefined && showEditForm && !showCreateActivityForm
                    && (
                    <ActivityForm
                      title="Edit Activity"
                      activity={selectedActivity}
                      onCancel={handleCancelEdit}
                      // eslint-disable-next-line react/jsx-boolean-value
                      updateActivity={true}
                      mutateActivity={mutation.mutate}
                    />
                    )}
          {showCreateActivityForm && <ActivityForm mutateActivity={mutation.mutate} title="Create Activity" onCancel={onActivityCreateCancel} updateActivity={false} />}
        </Box>
      </Container>
    );
}
