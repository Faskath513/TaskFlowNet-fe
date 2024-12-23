import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, TextField, Button, Divider, Switch, FormControlLabel } from '@mui/material';
import ManagerLayout from '../../components/ManagerLayout';

const ManagerConfiguration = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoAssignTasks, setAutoAssignTasks] = useState(true);
  const [performanceReviewPeriod, setPerformanceReviewPeriod] = useState(30);
  const [maxTaskAssignment, setMaxTaskAssignment] = useState(5);
  const [themeColor, setThemeColor] = useState('light');
  const [userRoles, setUserRoles] = useState({
    admin: true,
    manager: false,
    employee: true,
  });

  const handleEmailNotificationChange = (event) => {
    setEmailNotifications(event.target.checked);
  };

  const handleSmsNotificationChange = (event) => {
    setSmsNotifications(event.target.checked);
  };

  const handleAutoAssignTasksChange = (event) => {
    setAutoAssignTasks(event.target.checked);
  };

  const handleRoleChange = (role) => {
    setUserRoles((prevRoles) => ({ ...prevRoles, [role]: !prevRoles[role] }));
  };

  const handleSaveConfiguration = () => {
    // Handle saving configuration settings (e.g., send to API)
    console.log('Configurations Saved!');
  };

  const handleThemeChange = (event) => {
    setThemeColor(event.target.value);
  };

  return (
    <ManagerLayout>
      <Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
          Manager Configuration
        </Typography>

        <Grid container spacing={4}>
          {/* Notification Settings */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Notification Settings
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />

                <FormControlLabel
                  control={<Switch checked={emailNotifications} onChange={handleEmailNotificationChange} />}
                  label="Email Notifications"
                  sx={{ marginBottom: 2 }}
                />
                <FormControlLabel
                  control={<Switch checked={smsNotifications} onChange={handleSmsNotificationChange} />}
                  label="SMS Notifications"
                  sx={{ marginBottom: 2 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: 'rgb(19, 66, 54)',
                    padding: '10px 20px',
                    '&:hover': {
                      backgroundColor: '#388e3c',
                    },
                  }}
                  onClick={handleSaveConfiguration}
                >
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Task Settings */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Task Assignment Settings
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />

                <FormControlLabel
                  control={<Switch checked={autoAssignTasks} onChange={handleAutoAssignTasksChange} />}
                  label="Auto Assign Tasks"
                  sx={{ marginBottom: 2 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: 'rgb(19, 66, 54)',
                    padding: '10px 20px',
                    '&:hover': {
                      backgroundColor: '#388e3c',
                    },
                  }}
                  onClick={handleSaveConfiguration}
                >
                  Save Task Settings
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Policy Settings */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Policy Configuration
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />

                <TextField
                  fullWidth
                  label="Performance Review Period (in days)"
                  variant="outlined"
                  type="number"
                  value={performanceReviewPeriod}
                  onChange={(e) => setPerformanceReviewPeriod(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Max Task Assignment per User"
                  variant="outlined"
                  type="number"
                  value={maxTaskAssignment}
                  onChange={(e) => setMaxTaskAssignment(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: 'rgb(19, 66, 54)',
                    padding: '10px 20px',
                    '&:hover': {
                      backgroundColor: '#388e3c',
                    },
                  }}
                  onClick={handleSaveConfiguration}
                >
                  Save Policy Settings
                </Button>
              </CardContent>
            </Card>
          </Grid>

         

          {/* Theme Settings */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Theme Customization
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />

                <TextField
                  fullWidth
                  label="Select Theme Color"
                  select
                  value={themeColor}
                  onChange={handleThemeChange}
                  SelectProps={{
                    native: true,
                  }}
                  sx={{ marginBottom: 2 }}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </TextField>

                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: 'rgb(19, 66, 54)',
                    padding: '10px 20px',
                    '&:hover': {
                      backgroundColor: '#388e3c',
                    },
                  }}
                  onClick={handleSaveConfiguration}
                >
                  Save Theme Settings
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ManagerLayout>
  );
};

export default ManagerConfiguration;
