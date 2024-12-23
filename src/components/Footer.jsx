// src/components/Footer.jsx

import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'rgb(15, 51, 49)',
        color: 'white',
        padding: 2,
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} Faskath. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
