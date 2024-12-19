// src/components/Layout.jsx

import React from 'react';
import HRSidebar from './HRSidebar'; // Import HRSidebar
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <HRSidebar />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        {/* <Navbar /> */}

        <Box
          component="main"
          sx={{
            flex: 1,
            padding: 3,
            backgroundColor: 'background.default',
            marginLeft: '260px', // Account for the width of the sidebar
          }}
        >
          {children}
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
