import React from 'react';
import { Button, Typography, Box, Container, Grid, AppBar, Toolbar, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: 'rgb(16, 51, 49)', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)' }}>
        <Toolbar>
          {/* App Title */}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '1.6rem' }}>
            TaskFlowNet
          </Typography>

          {/* Search Icon */}
          <IconButton color="inherit" sx={{ marginRight: 2, transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.2)' } }}>
            <SearchIcon />
          </IconButton>

          {/* Notification Button with Badge */}
          <IconButton color="inherit" sx={{ marginRight: 2, transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.2)' } }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Sign In Link */}
          <Link href="/auth/signin" passHref>
            <Button color="inherit" sx={{ fontWeight: 'bold', letterSpacing: '1px' }}>Sign In</Button>
          </Link>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          background: 'linear-gradient(135deg,rgb(4, 44, 34),rgb(233, 208, 185) 90%)',
          color: 'white',
          padding: { xs: 2, sm: 4 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" justifyContent="center" direction={{ xs: 'column-reverse', md: 'row' }}>
            {/* Text Content - 50% */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  marginBottom: 3,
                  textShadow: '3px 3px 12px rgb(9, 49, 47)',
                  letterSpacing: 1.5,
                }}
              >
                Welcome to TaskFlowNet
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.2rem',
                  lineHeight: 1.6,
                  marginBottom: 4,
                  textShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
                  opacity: 0.9,
                  maxWidth: '600px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Empower teams, managers, and individuals to effectively organize, prioritize, and track tasks, set clear goals, and provide actionable feedback to ensure seamless collaboration, increase productivity, and drive continuous progress.
              </Typography>

              {/* Get Started Button */}
              <Link href="/auth/signin" passHref>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: 'rgb(30, 63, 61)',
                    '&:hover': {
                      backgroundColor: 'rgb(15, 51, 49)',
                      transform: 'scale(1.05)',
                    },
                    borderRadius: '50px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    padding: '12px 24px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </Grid>

            {/* Image - 50% */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/u75437pib1m.jpg" // Replace with your image path
                alt="Performance App Hero"
                sx={{
                  width: '100%',
                  height: 'auto', // Maintain aspect ratio
                  objectFit: 'cover', // Ensure image covers the space
                  borderRadius: 2,
                  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.4s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Home;
