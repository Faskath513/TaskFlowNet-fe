import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RateReviewIcon from '@mui/icons-material/RateReview';
import FeedbackIcon from '@mui/icons-material/Feedback';
import HistoryIcon from '@mui/icons-material/History';
import HelpIcon from '@mui/icons-material/Help';
import { useRouter } from 'next/router';

const EmployeeSidebar = () => {
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
        Employee Panel
      </Typography>

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
            secondary="Personal Overview and Notifications"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* My Goals */}
        <ListItem button onClick={() => handleNavigation('/employee/goals')}>
          <ListItemIcon>
            <AssignmentIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="My Goals"
            secondary="View Assigned Goals & Update Progress"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Self-Assessment */}
        <ListItem button onClick={() => handleNavigation('/employee/self-assessment')}>
          <ListItemIcon>
            <RateReviewIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Self-Assessment"
            secondary="Complete Assessment & Submission History"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Feedback */}
        <ListItem button onClick={() => handleNavigation('/employee/feedback')}>
          <ListItemIcon>
            <FeedbackIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Feedback"
            secondary="View Manager Feedback & Add Comments"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Performance History */}
        <ListItem button onClick={() => handleNavigation('/employee/performance-history')}>
          <ListItemIcon>
            <HistoryIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Performance History"
            secondary="View Past Reviews & Track Career Growth"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>

        {/* Support */}
        <ListItem button onClick={() => handleNavigation('/employee/support')}>
          <ListItemIcon>
            <HelpIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText
            primary="Support"
            secondary="FAQs & Contact HR"
            primaryTypographyProps={{ color: 'white' }}
            secondaryTypographyProps={{
              sx: { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
        </ListItem>
      </List>

      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', marginY: 2 }} />

      {/* Employee Profile Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }} onClick={handleProfileClick}>
        <Avatar alt="Employee" src="/images/logo.png" sx={{ marginRight: 2, width: 40, height: 40 }} />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
            CodeNex Employee
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Software Engineer
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
        <MenuItem onClick={() => handleNavigation('/employee/profile')}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </Box>
  );
};

export default EmployeeSidebar;
