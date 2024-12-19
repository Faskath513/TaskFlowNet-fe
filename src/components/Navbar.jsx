import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/router';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#153B60' }}> {/* Change AppBar color */}
      <Toolbar>
        {/* App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
          My Performance App
        </Typography>

        {/* Search Icon */}
        <IconButton color="inherit" sx={{ marginRight: 2 }}>
          <SearchIcon />
        </IconButton>

        {/* Notification Button with Badge */}
        <IconButton color="inherit" sx={{ marginRight: 2 }}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Sign In Link */}
        <Link href="/auth/signin" passHref>
          <Button color="inherit" sx={{ color: 'white' }}> {/* Button color change */}
            Sign In
          </Button>
        </Link>

        {/* Sign Out Link - If User is Logged In */}
        {/* You can conditionally render this based on user authentication state */}
        <Link href="/api/auth/signout" passHref>
          <Button color="inherit" sx={{ color: 'white' }}> {/* Button color change */}
            Sign Out
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
