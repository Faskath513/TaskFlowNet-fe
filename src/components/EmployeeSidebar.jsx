import React from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Typography, 
  Avatar, 
  Button 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/router';

const EmployeeSidebar = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Box
      sx={{
        width: 260,
        height: '100vh',
        backgroundColor: 'rgb(4, 44, 34)',
        color: 'white',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        position: 'fixed',
      }}
    >
     {/* Logo Section at the Top-Left */}
           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginBottom: 3 }}>
                   {/* Replace 'logo.png' with your actual logo file path */}
                   <img src="/images/logo.png" alt="Logo" style={{ width: 100, marginBottom: 5 }} />
                 </Box>

      {/* Profile Section */}
      <Box
        onClick={() => handleNavigation('/profile/profile')}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 3 }}
      >
        <Avatar alt="Employee" src="" sx={{ marginBottom: 1, width: 100, height: 100 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
            Employee
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Profile
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', marginBottom: 2 }} />

      {/* Sidebar Navigation List */}
      <List sx={{ flexGrow: 1 }}>
        {/* Dashboard */}
        <ListItem button onClick={() => handleNavigation('/employee')}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            secondary="Overview of your tasks and goals"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* My Task */}
        <ListItem button onClick={() => handleNavigation('/employee/tasks')}>
          <ListItemIcon>
            <AssignmentIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="My Task"
            secondary="View and manage your personal tasks"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Performance Feedback */}
        <ListItem button onClick={() => handleNavigation('/employee/feedback')}>
          <ListItemIcon>
            <EventNoteIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Performance Feedback"
            secondary="View feedback"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Reports */}
        <ListItem button onClick={() => handleNavigation('/employee/reports')}>
          <ListItemIcon>
            <BarChartIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Reports"
            secondary="View your performance reports"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>
      </List>

      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', marginY: 2 }} />

      {/* Sign Out */}
      <ListItem color="inherit" sx={{ color: 'white' }} onClick={() => router.push('/auth/signout')}>
        <ListItemIcon>
          <ExitToAppIcon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText
          primary="Sign Out"
          primaryTypographyProps={{ color: 'white' }}
          secondaryTypographyProps={{
            sx: { color: 'rgba(255, 255, 255, 0.6)' },
          }}
        />
      </ListItem>
    </Box>
  );
};

export default EmployeeSidebar;
