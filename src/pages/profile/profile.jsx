import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { Box, Typography, CircularProgress, Grid, Button, Divider, Paper, Avatar, Container } from '@mui/material';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'; // Import Navbar
import Footer from '../../components/Footer'; // Import Footer

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setError('User is not authenticated.');
      setLoading(false);
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/fetch/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
      
        setUserDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('Failed to fetch user details.');
        setLoading(false);
      }
      
    };

    fetchUserDetails();
  }, [user, isAuthenticated]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #153B60, #15B2C0 90%)' }}>
      <Navbar /> {/* Include Navbar here */}

      <Container maxWidth="lg" sx={{ flex: 1, marginTop: 4, paddingBottom: 6 }}>
        <Paper sx={{ padding: 3, maxWidth: 800, margin: 'auto', borderRadius: 3, boxShadow: 5, backgroundColor: '#fff' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 3 }}>
            <Avatar
              alt="User Avatar"
              src={userDetails?.avatar || ''}
              sx={{
                width: 120,
                height: 120,
                marginBottom: 2,
                border: '5px solid #153B60',
                boxShadow: 3,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#153B60' }}>
              {userDetails?.username}
            </Typography>
            <Typography variant="body2" sx={{ color: '#153B60', fontStyle: 'italic' }}>
              {userDetails?.email}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                <strong>User ID:</strong> {userDetails?._id}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                <strong>Username:</strong> {userDetails?.username}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                <strong>Email:</strong> {userDetails?.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                <strong>Role:</strong> {userDetails?.role}
              </Typography>
            </Grid>

            {userDetails?.role === 'employee' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                    <strong>Department:</strong> {userDetails?.employeeDetails?.department || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                    <strong>Designation:</strong> {userDetails?.employeeDetails?.designation || 'N/A'}
                  </Typography>
                </Grid>
              </>
            )}

            {userDetails?.role === 'manager' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                    <strong>Department:</strong> {userDetails?.managerDetails?.department || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                    <strong>Team:</strong> {userDetails?.managerDetails?.team?.join(', ') || 'N/A'}
                  </Typography>
                </Grid>
              </>
            )}

            {userDetails?.role === 'hr' && (
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                  <strong>Assigned Departments:</strong> {userDetails?.hrDetails?.assignedDepartments?.join(', ') || 'N/A'}
                </Typography>
              </Grid>
            )}
          </Grid>

          <Divider sx={{ marginY: 3 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: '12px 24px',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 'bold',
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: '#153B60',
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => router.push('/auth/signout')}
            >
              Close
            </Button>
          </Box>
        </Paper>
      </Container>

      <Footer sx={{ marginTop: 'auto' }} /> {/* Add Footer here */}
    </Box>
  );
};

export default Profile;
