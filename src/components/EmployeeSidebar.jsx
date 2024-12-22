import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Avatar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BarChartIcon from '@mui/icons-material/BarChart';
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
              <Avatar alt="Employee" src="" sx={{ marginBottom: 1, width: 100, height: 100 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  CodeNex
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Employee
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

        {/* Goal Management */}
        <ListItem button onClick={() => handleNavigation('/employee/goals')}>
          <ListItemIcon>
            <AssignmentIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="My Goals"
            secondary="View and manage your personal goals"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Performance Reviews */}
        <ListItem button onClick={() => handleNavigation('/employee/reviews')}>
          <ListItemIcon>
            <EventNoteIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Performance Reviews"
            secondary="Review feedback and evaluations"
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

     
    </Box>
  );
};

export default EmployeeSidebar;
