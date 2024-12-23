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
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/router';

const HRSidebar = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleSignOut = () => {
    router.push('/login'); // Redirect to the login page after sign out
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
        position: 'fixed',
        overflow: 'hidden',
      }}
    >
      {/* Scrollable Content */}
      <Box sx={{ overflowY: 'auto', flex: 1, padding: 2 }}>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'left', marginBottom: 3 }}>
          <img src="/images/logo.png" alt="Logo" style={{ width: 100 }} />
        </Box>

        {/* Profile Section */}
        <Box
          onClick={() => handleNavigation('/profile/profile')}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 3,
            cursor: 'pointer',
          }}
        >
          <Avatar alt="HR" src="" sx={{ marginBottom: 1, width: 100, height: 100 }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
              Admin
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Profile
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', marginBottom: 2 }} />

        {/* Sidebar Navigation */}
        <List>
          <ListItem button onClick={() => handleNavigation('/hr')} sx={{ marginBottom: 2 }}>
            <ListItemIcon>
              <DashboardIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              secondary="Overview of performance"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ sx: { color: 'rgba(255, 255, 255, 0.6)' } }}
            />
          </ListItem>

          <ListItem button onClick={() => handleNavigation('/hr/user-management')} sx={{ marginBottom: 2 }}>
            <ListItemIcon>
              <PeopleIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary="User Overview"
              secondary="Manage users"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ sx: { color: 'rgba(255, 255, 255, 0.6)' } }}
            />
          </ListItem>

          <ListItem button onClick={() => handleNavigation('/hr/task')} sx={{ marginBottom: 2 }}>
            <ListItemIcon>
              <EventNoteIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary="Task Overview"
              secondary="Monitor all tasks"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ sx: { color: 'rgba(255, 255, 255, 0.6)' } }}
            />
          </ListItem>

          <ListItem button onClick={() => handleNavigation('/hr/notifications')} sx={{ marginBottom: 2 }}>
            <ListItemIcon>
              <NotificationsIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary="Notifications"
              secondary="Manage notifications"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ sx: { color: 'rgba(255, 255, 255, 0.6)' } }}
            />
          </ListItem>

          <ListItem button onClick={() => handleNavigation('/hr/performance_analytics')} sx={{ marginBottom: 2 }}>
            <ListItemIcon>
              <BarChartIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary="Performance Analytics"
              secondary="Generate performance reports"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ sx: { color: 'rgba(255, 255, 255, 0.6)' } }}
            />
          </ListItem>

          <ListItem button onClick={() => handleNavigation('/hr/settings')} sx={{ marginBottom: 2 }}>
            <ListItemIcon>
              <SettingsIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              secondary="Policies & templates"
              primaryTypographyProps={{ color: 'white' }}
              secondaryTypographyProps={{ sx: { color: 'rgba(255, 255, 255, 0.6)' } }}
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
            secondaryTypographyProps={{ sx: { color: 'rgba(255, 255, 255, 0.6)' } }}
          />
        </ListItem>
      </Box>
    </Box>
  );
};

export default HRSidebar;
