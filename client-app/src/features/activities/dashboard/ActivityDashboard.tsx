import { Box, Container } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
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
    const [selectedActivityIndex, setSelectedActivityIndex] = useState<number | undefined>();
    const [showEditForm, setShowEditForm] = useState(false);
    const deleteActivity = () => axios.delete(`http://localhost:5000/api/activities/${selectedActivityIndex !== undefined ? activities[selectedActivityIndex].id : ''}`);

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteActivity,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        },
    });

    const handleActivityListItemClick = (index: number) => {
        onActivityCreateCancel();
        if (index === selectedActivityIndex) return;
        setSelectedActivityIndex(index);
        setShowEditForm(false);
    };

    const handleCancelEdit = () => {
        setSelectedActivityIndex(undefined);
        setShowEditForm(false);
    };

    const handleShowEditForm = () => {
        setShowEditForm(true);
    };

    const handleDelete = () => {
        mutation.mutate();
    };

    return (
      <Container sx={{ display: 'flex', flexDirection: 'row' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', maxWidth: '50%' }}>
          <ActivityList activities={activities} onItemClick={handleActivityListItemClick} />
        </Container>

        <Box minWidth="50%">
          {selectedActivityIndex !== undefined
                && (

                <ActivityDetails
                  activity={{
                    ...activities[selectedActivityIndex],
                    imageSrc: getCategoryImage(activities[selectedActivityIndex].category),
                }}
                  onEdit={handleShowEditForm}
                  onCancel={handleCancelEdit}
                  onDelete={handleDelete}
                />
                    )}
          {selectedActivityIndex !== undefined && showEditForm && !showCreateActivityForm
                    && (
                    <ActivityForm
                      title="Edit Activity"
                      activity={activities[selectedActivityIndex]}
                      onCancel={handleCancelEdit}
                      // eslint-disable-next-line react/jsx-boolean-value
                      updateActivity={true}
                    />
                    )}
          {showCreateActivityForm && <ActivityForm title="Create Activity" onCancel={onActivityCreateCancel} updateActivity={false} />}
        </Box>
      </Container>
    );
}
