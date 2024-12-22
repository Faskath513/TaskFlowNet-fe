import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Avatar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/router';

const ManagerSidebar = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
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
        position: 'fixed',
      }}
    >
      
      
            {/* Profile Section centered */}
            <Box onClick={() => handleNavigation('/profile/profile')} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 3 }}>
              <Avatar alt="Manager" src="" sx={{ marginBottom: 1, width: 100, height: 100 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  CodeNex
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Team Manager
                </Typography>
              </Box>
            </Box>

      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', marginBottom: 2 }} />

      {/* Sidebar Navigation List */}
      <List sx={{ flexGrow: 1 }}>
        {/* Dashboard */}
        <ListItem button onClick={() => handleNavigation('/manager')}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            secondary="Team Overview and Activity Summary"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Goal Management */}
        <ListItem button onClick={() => handleNavigation('/manager/goals')}>
          <ListItemIcon>
            <AssignmentIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Goal Management"
            secondary="Set/View/Edit Employee Goals"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Performance Reviews */}
        <ListItem button onClick={() => handleNavigation('/manager/reviews')}>
          <ListItemIcon>
            <EventNoteIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Performance Reviews"
            secondary="Review Self-Assessments and Provide Feedback"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Team Performance */}
        <ListItem button onClick={() => handleNavigation('/manager/performance')}>
          <ListItemIcon>
            <TrendingUpIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Team Performance"
            secondary="Monitor Progress and Analyze Trends"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Reports */}
        <ListItem button onClick={() => handleNavigation('/manager/reports')}>
          <ListItemIcon>
            <BarChartIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Reports"
            secondary="View Performance Reports"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Settings */}
        <ListItem button onClick={() => handleNavigation('/manager/settings')}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            secondary="Configure Policies & Templates"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>
      </List>

      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', marginY: 2 }} />

     
    </Box>
  );
};

export default ManagerSidebar;
