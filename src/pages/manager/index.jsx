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
  Menu,
  MenuItem,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import ManagerLayout from '../../components/ManagerLayout'; // Import ManagerLayout

// Sample Data for Visualizations
const performanceData = [
  { month: 'Jan', score: 80 },
  { month: 'Feb', score: 85 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 88 },
  { month: 'May', score: 92 },
  { month: 'Jun', score: 95 },
];

const taskData = [
  { name: 'Completed', value: 50 },
  { name: 'In Progress', value: 30 },
  { name: 'Pending', value: 20 },
];

const COLORS = ['#4caf50', '#2196f3', '#f44336'];

const recentActivities = [
  'Task assigned to Jane Doe: Improve website UI',
  'Project deadline extended for team A',
  'New task added: Develop mobile app feature',
  'Meeting scheduled with client XYZ for next week',
];

const ManagerDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setAnchorEl(null);
  };

  return (
    <ManagerLayout>
      <Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        {/* Heading */}
        <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          📊 Manager Dashboard
        </Typography>

        {/* Notification Icon */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 50,
            right: 50,
            color: '#153B60',
          }}
          onClick={handleNotificationClick}
        >
          <NotificationsIcon />
        </IconButton>

        {/* Notification Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseNotificationMenu}
        >
          <MenuItem onClick={handleCloseNotificationMenu}>
            New task assigned to Jane Doe
          </MenuItem>
          <MenuItem onClick={handleCloseNotificationMenu}>
            Project deadline extended for team A
          </MenuItem>
          <MenuItem onClick={handleCloseNotificationMenu}>
            Meeting scheduled with client XYZ
          </MenuItem>
        </Menu>

        {/* Quick Stats Cards */}
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  📝 Ongoing Projects
                </Typography>
                <Typography variant="h4">7</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  👥 Team Members
                </Typography>
                <Typography variant="h4">25</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  ⚠️ Pending Tasks
                </Typography>
                <Typography variant="h4">15</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  🎯 Task Completion Rate
                </Typography>
                <Typography variant="h4">68%</Typography>
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
              <Legend />
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
      </Box>
    </ManagerLayout>
  );
};

export default ManagerDashboard;
