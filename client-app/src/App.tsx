import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NavBar from './app/layout/NavBar';
import ActivityDashboard from './features/activities/dashboard/ActivityDashboard';

type Activity = {
  category: string;
  city: string;
  date: string;
  description: string;
  id: string;
  title: string;
  venue: string;
};

function App() {
  const {
    isLoading, error, data, isFetching,
  } = useQuery<Activity[], Error>({
    queryKey: ['activities'],
    queryFn: () => axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then((activitiesData) => activitiesData.data).catch(() => []),
  });

  return (
    <div>
      <NavBar />
      {isFetching && <p>Fetching...</p>}
      {isLoading && <p>Loading...</p>}
      {!isFetching && !isLoading && data
      && (
      <Box marginTop="7em">
        <ActivityDashboard activities={data} />

      </Box>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default App;
