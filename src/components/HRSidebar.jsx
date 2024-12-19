import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/router';

const HRSidebar = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    // Implement sign out logic here
    console.log("User signed out");

    // Example: Remove authentication token from localStorage
    localStorage.removeItem('authToken');

    // Close profile menu
    handleCloseProfileMenu();

    // Redirect to the homepage (index.js)
    router.push('/');
  };

  return (
    <Box
      sx={{
        width: 260,
        height: '100vh',
        backgroundColor: '#153B60',
        color: 'white',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        position: 'fixed', // Fix sidebar in place
      }}
    >
      {/* Logo Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <img src="/images/logo.png" alt="Logo" style={{ height: 60, width: 150 }} />
      </Box>

      {/* Sidebar Title */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2, textAlign: 'center' }}>
        HR Panel
      </Typography>

      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', marginBottom: 2 }} />

      {/* Sidebar Navigation List */}
      <List sx={{ flexGrow: 1 }}>
        {/* Dashboard */}
        <ListItem button onClick={() => handleNavigation('/hr')}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            secondary="Overview of performance"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* User Management */}
        <ListItem button onClick={() => handleNavigation('/hr/user-management')}>
          <ListItemIcon>
            <PeopleIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="User Management"
            secondary="Add/Edit/Delete Users"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Review Cycles */}
        <ListItem button onClick={() => handleNavigation('/hr/reviews')}>
          <ListItemIcon>
            <EventNoteIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Review Cycles"
            secondary="Manage review cycles"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Notifications */}
        <ListItem button onClick={() => handleNavigation('/hr/notifications')}>
          <ListItemIcon>
            <NotificationsIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Notifications"
            secondary="Manage notifications"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Reports */}
        <ListItem button onClick={() => handleNavigation('/hr/reports')}>
          <ListItemIcon>
            <BarChartIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Reports"
            secondary="Generate & view reports"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Settings */}
        <ListItem button onClick={() => handleNavigation('/hr/settings')}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            secondary="Policies & templates"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>
      </List>

      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', marginY: 2 }} />

      {/* HR Profile Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }} onClick={handleProfileClick}>
        <Avatar alt="HR" src="/images/logo.png" sx={{ marginRight: 2, width: 40, height: 40 }} />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
            CodeNex
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            HR Admin
          </Typography>
        </Box>
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseProfileMenu}
        PaperProps={{
          style: {
            width: '200px',
          },
        }}
      >
        <MenuItem onClick={() => handleNavigation('/hr/profile')}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </Box>
  );
};

export default HRSidebar;
