import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/categoryImages/logo.png';

type ButtonAppBarProps = {
    onCreateActivity: () => void;
};

export default function ButtonAppBar({ onCreateActivity }:ButtonAppBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            startIcon={<img alt="logo" width={32} height={32} src={logo} />}
          >
            <Typography variant="h6" component="div" color="white">
              Reactivities
            </Typography>
          </Button>
          <Button color="inherit" onClick={onCreateActivity}>Create Activity</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
