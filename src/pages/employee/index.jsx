import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import EmployeeLayout from '../../components/EmployeeLayout'; // Import EmployeeLayout

// Sample Data for Visualizations
const performanceData = [
  { month: 'Jan', score: 70 },
  { month: 'Feb', score: 75 },
  { month: 'Mar', score: 80 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 90 },
  { month: 'Jun', score: 92 },
];

const taskData = [
  { name: 'Completed', value: 60 },
  { name: 'In Progress', value: 25 },
  { name: 'Pending', value: 15 },
];

const COLORS = ['#4caf50', '#2196f3', '#f44336'];

const recentActivities = [
  'Goal assigned: Improve coding skills',
  'Self-assessment submitted for Q2',
  'Feedback received from Manager: Great progress!',
  'Upcoming meeting with HR for career planning',
];

const EmployeeDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  return (
    <EmployeeLayout>
      <Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
            📊 Employee Dashboard
          </Typography>

          {/* Notification Icon in Top Right Corner */}
          <IconButton onClick={handleNotificationsClick} sx={{ position: 'absolute', top: 50, right: 50 ,color: '#153B60'}}>
            <NotificationsIcon />
          </IconButton>
        </Box>

        {/* Quick Stats Cards */}
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  📝 My Goals
                </Typography>
                <Typography variant="h4">3</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  👥 My Feedback
                </Typography>
                <Typography variant="h4">2</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  ⚠️ Pending Tasks
                </Typography>
                <Typography variant="h4">4</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  🎯 Progress Rate
                </Typography>
                <Typography variant="h4">78%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Performance Trends Graph */}
        <Paper sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            📈 Performance Trends
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        {/* Task Status Summary */}
        <Paper sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            🎯 Task Status Summary
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={taskData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {taskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        {/* Recent Activity Feed */}
        <Paper sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            🔔 Recent Activity
          </Typography>
          <List>
            {recentActivities.map((activity, index) => (
              <ListItem key={index} divider>
                <ListItemText primary={activity} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Notifications Panel */}
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            ⚠️ Notifications
          </Typography>
          <List>
            <ListItem>
              <IconButton color="error">
                <TrendingUpIcon />
              </IconButton>
              <ListItemText primary="Overdue task: Submit self-assessment" />
            </ListItem>
            <Divider />
            <ListItem>
              <IconButton color="info">
                <NotificationsIcon />
              </IconButton>
              <ListItemText primary="Upcoming deadline: Complete project task" />
            </ListItem>
          </List>
        </Paper>
      </Box>

      {/* Notifications Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseNotifications}
        PaperProps={{
          style: {
            width: '200px',
          },
        }}
      >
        <MenuItem onClick={handleCloseNotifications}>Overdue task: Submit self-assessment</MenuItem>
        <MenuItem onClick={handleCloseNotifications}>Upcoming deadline: Complete project task</MenuItem>
      </Menu>
    </EmployeeLayout>
  );
};

export default EmployeeDashboard;
