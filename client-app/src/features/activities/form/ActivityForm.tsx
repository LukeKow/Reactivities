/* eslint-disable react/jsx-props-no-spreading */
import {
    Box, Button, TextField, Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { Activity } from '../../../app/models/activity';

type Inputs = Omit<Activity, 'id'>;

type GetErrorArg = keyof Activity;
type Error = {
    error: boolean;
    helperText: string;
};

const NoError: Error = {
    error: false,
    helperText: '',
};
const RequiredFieldError: Error = {
    error: true,
    helperText: 'This field is required',
};
const getError = (propertyName: GetErrorArg, errors: FieldErrors<Activity>): Error => {
    if (errors[propertyName]) {
        return RequiredFieldError;
    }
        return NoError;
};

type CreateActivityFormProps = {
    updateActivity: false;
    onCancel: () => void;
    title: string;
};
type UpdateActivityFormProps = {
    updateActivity: true;
    activity: Activity;
    onCancel: () => void;
    title: string;
};

type ActivityFormProps = CreateActivityFormProps | UpdateActivityFormProps;

export function ActivityForm({
 onCancel, title,
...rest
}: ActivityFormProps) {
    const {
        register, handleSubmit, formState: { errors }, reset,
    } = useForm<Inputs>();

    const putActivity = (updatedActivity: Inputs) => axios.put<Inputs>(`http://localhost:5000/api/activities/${rest.updateActivity ? rest.activity.id : ''}`, updatedActivity);
    const postActivity = (activityToCreate: Inputs) => axios.post<Inputs>('http://localhost:5000/api/activities/', activityToCreate);

    const queryClient = useQueryClient();
    const updateActivity = useMutation({
        mutationFn: putActivity,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        },
    });
    const createActivity = useMutation({
        mutationFn: postActivity,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['activities'] });
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (rest.updateActivity) {
            updateActivity.mutate(data);
        } else {
            createActivity.mutate(data);
        }
    };

    return (
      <Box component="form" onReset={() => reset((values) => ({ ...values }))} onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column">
        {/* register your input into the hook by invoking the "register" function */}
        <Typography variant="h3">{title}</Typography>

        <TextField
          defaultValue={rest.updateActivity ? rest.activity.title : null}
          id="title"
          label="Title"
          variant="filled"
          {...register('title', { required: true })}
          {...getError('title', errors)}
        />

        <TextField
          defaultValue={rest.updateActivity ? rest.activity.description : null}
          id="description"
          label="Description"
          variant="filled"
          {...register('description', { required: true })}
          {...getError('description', errors)}

        />

        <TextField
          defaultValue={rest.updateActivity ? rest.activity.category : null}
          id="category"
          label="Category"
          variant="filled"
          {...register('category', { required: true })}
          {...getError('category', errors)}

        />

        <TextField
          defaultValue={rest.updateActivity ? rest.activity.date : null}
          id="date"
          label="Date"
          variant="filled"
          {...register('date', { required: true })}
          {...getError('date', errors)}

        />

        <TextField
          defaultValue={rest.updateActivity ? rest.activity.city : null}
          id="city"
          label="City"
          variant="filled"
          {...register('city', { required: true })}
          {...getError('city', errors)}

        />

        <TextField
          defaultValue={rest.updateActivity ? rest.activity.venue : null}
          id="venue"
          label="Venue"
          variant="filled"
          {...register('venue', { required: true })}
          {...getError('venue', errors)}

        />
        {
                rest.updateActivity
        ? <Button type="submit" variant="contained">Update Activity</Button>
        : <Button type="submit" variant="contained">Create Activity</Button>
}
        <Button type="reset" variant="contained">Reset form</Button>
        <Button type="button" variant="contained" onClick={onCancel}>Cancel</Button>
      </Box>
    );
}
