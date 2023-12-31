import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { agent } from './app/api/agent';
import NavBar from './app/layout/NavBar';
import { Activity } from './app/models/activity';
import { ActivityDashboard } from './features/activities/dashboard/ActivityDashboard';

function App() {
    const [showCreateActivityForm, setShowCreateActivityForm] = useState(false);

  const {
    isLoading, error, data, isFetching,
  } = useQuery<Activity[], Error>({
    queryKey: ['activities'],
    queryFn: () => agent.Activities.list().then((response) => response).catch(() => []),
  });

  return (
    <div>
      <NavBar onCreateActivity={() => setShowCreateActivityForm(true)} />
      {isFetching && <p>Fetching...</p>}
      {isLoading && <p>Loading...</p>}
      {!isFetching && !isLoading && data
      && (
      <Box marginTop="7em">
        <ActivityDashboard
          activities={data}
          showCreateActivityForm={showCreateActivityForm}
          onActivityCreateCancel={() => setShowCreateActivityForm(false)}
        />
      </Box>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default App;
