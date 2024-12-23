import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, InputBase, Box, Button, Avatar, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router'; // For redirecting after sign-out
import { signOut } from 'next-auth/react'; // Import NextAuth's signOut function

const Navbar = () => {
  const router = useRouter(); // Initialize router to handle redirection after sign-out

  // State to manage the dropdown menu for notifications
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Sample notifications data
  const notifications = [
    { id: 1, text: 'New goal assigned: Q3 Performance Review', date: '2024-12-22' },
    { id: 2, text: 'Reminder: Pending task for feedback submission', date: '2024-12-21' },
    { id: 3, text: 'System update: New review templates available', date: '2024-12-20' },
  ];

  // Handle opening and closing of the notification menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'rgb(4, 44, 34)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        {/* Logo Section aligned to the left */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src="/images/logo.png" alt="Logo" style={{ height: 60, width: 60 }} />
        </Box>

        {/* Right-Aligned Elements (Search Bar, Notifications, Sign Out) */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Search Bar */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '5px 15px',
            width: '300px',
            marginRight: 2,
          }}>
            <SearchIcon sx={{ color: '#153B60' }} />
            <InputBase
              sx={{ ml: 1, flex: 1, color: '#153B60' }}
              placeholder="Search..."
            />
          </Box>

          {/* Notification Icon with Badge */}
          <IconButton color="inherit" sx={{ marginRight: 2 }} onClick={handleClick}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Notifications Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ top: '50px', right: '20px' }} // Positioning the menu dropdown
          >
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <MenuItem key={notification.id} onClick={handleClose}>
                  <ListItemText primary={notification.text} secondary={notification.date} />
                </MenuItem>
              ))
            ) : (
              <MenuItem>
                <ListItemText primary="No new notifications" />
              </MenuItem>
            )}
          </Menu>

          {/* Sign Out Button */}
          <Button color="inherit" sx={{ color: 'white' }} onClick={() => router.push('/auth/signout')}>
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
