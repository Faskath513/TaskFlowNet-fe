import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  InputBase,
  AppBar,
  Toolbar,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import SearchIcon from '@mui/icons-material/Search';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import Layout from '../../components/Layout'; // Importing Layout

// Sample Data for Visualizations
const performanceData = [
  { month: 'Jan', score: 80 },
  { month: 'Feb', score: 85 },
  { month: 'Mar', score: 78 },
  { month: 'Apr', score: 88 },
  { month: 'May', score: 92 },
  { month: 'Jun', score: 95 },
];

const goalData = [
  { name: 'Completed', value: 40 },
  { name: 'In Progress', value: 35 },
  { name: 'Overdue', value: 25 },
];

const COLORS = ['#4caf50', '#2196f3', '#f44336'];

const recentActivities = [
  'Added new employee: John Doe',
  'Feedback submitted for Q2 reviews',
  'Reminder sent for pending reviews',
  'New review cycle started: Q3 2024',
];

const HRDashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  return (
    <Layout>
      {/* Top Navigation Bar */}
      <AppBar position="sticky" sx={{ backgroundColor: '#3f51b5' }}>
        <Toolbar>
          {/* Notification Icon on the left side */}
          <IconButton onClick={handleNotificationsClick} color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          {/* Search Bar */}
          <InputBase
            placeholder="Search..."
            startAdornment={<SearchIcon sx={{ color: 'white' }} />}
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              paddingLeft: 2,
              paddingRight: 2,
              width: 200,
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        {/* Heading */}
        <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          📊 HR Dashboard
        </Typography>

        {/* Quick Stats Cards */}
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  📈 Active Review Cycles
                </Typography>
                <Typography variant="h4">3</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  👥 Employees Reviewed
                </Typography>
                <Typography variant="h4">45</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  ⚠️ Pending Reviews
                </Typography>
                <Typography variant="h4">12</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  🎯 Goal Completion Rate
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
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        {/* Goal Status Summary */}
        <Paper sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            🎯 Goal Status Summary
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={goalData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {goalData.map((entry, index) => (
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
                <WarningIcon />
              </IconButton>
              <ListItemText primary="Overdue reviews: 5 employees" />
            </ListItem>
            <Divider />
            <ListItem>
              <IconButton color="info">
                <NotificationsIcon />
              </IconButton>
              <ListItemText primary="Upcoming deadline: Q2 review cycle ends in 3 days" />
            </ListItem>
            <Divider />
            <ListItem>
              <IconButton color="primary">
                <TrendingUpIcon />
              </IconButton>
              <ListItemText primary="System update: New review templates available" />
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
        <MenuItem onClick={handleCloseNotifications}>Overdue reviews: 5 employees</MenuItem>
        <MenuItem onClick={handleCloseNotifications}>Upcoming deadline: Q2 review cycle ends in 3 days</MenuItem>
        <MenuItem onClick={handleCloseNotifications}>System update: New review templates available</MenuItem>
      </Menu>
    </Layout>
  );
};

export default HRDashboard;
