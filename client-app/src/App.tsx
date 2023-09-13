import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';

type Activity = {
  category: string;
  city: string;
  date: string;
  description: string;
  id: string;
  title: string;
  venue: string;
}

function App() {

  const { isLoading, error, data, isFetching } = useQuery<Activity[], Error>({
    queryKey: ['activities'],
    queryFn: () => axios.get('http://localhost:5000/api/activities')
      .then(activitiesData => activitiesData.data)
  });

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      <h1>Reactivities</h1>
      {isFetching && <p>Fetching...</p>}
      {isLoading && <p>Loading...</p>}
      {!isFetching && !isLoading && data &&
        <List>
          <ListItem>
            <ListItemIcon>
              <GroupsIcon sx={{color: "white"}}/>
            </ListItemIcon>
            <ListItemText primary="Reactivities"/>
          </ListItem>
          {data?.map(d => 
            <ListItem key={d.id} disablePadding>
              <ListItemButton>
                <ListItemText primary={d.title} />
              </ListItemButton>
            </ListItem>
)         }
        </List>
      }
      
      
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default App
