import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Divider } from '@mui/material';
import { CheckCircle, Pending, AccessTime, Assessment } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import HRLayout from '../../components/HRLayout';

// Sample data for the charts
const taskPerformanceData = [
  { name: 'Jan', Completed: 30, Pending: 10, InProgress: 20 },
  { name: 'Feb', Completed: 40, Pending: 15, InProgress: 25 },
  { name: 'Mar', Completed: 60, Pending: 20, InProgress: 30 },
  { name: 'Apr', Completed: 70, Pending: 10, InProgress: 20 },
  { name: 'May', Completed: 90, Pending: 5, InProgress: 10 },
];

const taskStatusData = [
  { name: 'Completed', value: 300 },
  { name: 'Pending', value: 150 },
  { name: 'In Progress', value: 120 },
];

const TaskDashboard = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <HRLayout>
      <Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
          Task Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* Task Overview Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Task Overview
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />
                <Typography variant="body2">
                  Overview of tasks and their completion status.
                </Typography>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'green' }}>
                      <CheckCircle sx={{ fontSize: 30 }} />
                      <Typography variant="h6" sx={{ marginLeft: 1 }}>
                        Completed
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'orange' }}>
                      <Pending sx={{ fontSize: 30 }} />
                      <Typography variant="h6" sx={{ marginLeft: 1 }}>
                        Pending
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'blue' }}>
                      <AccessTime sx={{ fontSize: 30 }} />
                      <Typography variant="h6" sx={{ marginLeft: 1 }}>
                        In Progress
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Button fullWidth variant="contained" color="primary" sx={{
                  borderRadius: '20px',
                  backgroundColor: 'rgb(19, 66, 54)',
                  padding: '10px 20px',
                  '&:hover': {
                    backgroundColor: '#388e3c',
                  },
                }} onClick={() => handleNavigation('/tasks')}>
                  View All Tasks
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Task List Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Task List
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />
                <Typography variant="body2">
                  Track individual tasks, deadlines, and their statuses.
                </Typography>
                <Button fullWidth variant="contained" color="primary" sx={{
                  borderRadius: '20px',
                  backgroundColor: 'rgb(19, 66, 54)',
                  padding: '10px 20px',
                  '&:hover': {
                    backgroundColor: '#388e3c',
                  },
                }} onClick={() => handleNavigation('/tasks')}>
                  Manage Tasks
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Task Performance Analytics Card (Line Chart) */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Task Performance Analytics
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />
                <Typography variant="body2">
                  Analyze task completion trends over time.
                </Typography>
                <Box sx={{ height: 200, backgroundColor: '#f0f0f0', borderRadius: 2, marginTop: 2 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={taskPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Completed" stroke="#4caf50" />
                      <Line type="monotone" dataKey="Pending" stroke="#ff9800" />
                      <Line type="monotone" dataKey="InProgress" stroke="#2196f3" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
                <Button fullWidth variant="contained" color="primary" sx={{
                  borderRadius: '20px',
                  backgroundColor: 'rgb(19, 66, 54)',
                  padding: '10px 20px',
                  '&:hover': {
                    backgroundColor: '#388e3c',
                  },
                }} onClick={() => handleNavigation('/tasks/analytics')}>
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Task Status Distribution Card (Pie Chart) */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Task Status Distribution
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />
                <Typography variant="body2">
                  Visualize the distribution of task statuses.
                </Typography>
                <Box sx={{ height: 200, backgroundColor: '#f0f0f0', borderRadius: 2, marginTop: 2 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {taskStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#4caf50' : index === 1 ? '#ff9800' : '#2196f3'} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Button fullWidth variant="contained" color="primary" sx={{
                  borderRadius: '20px',
                  backgroundColor: 'rgb(19, 66, 54)',
                  padding: '10px 20px',
                  '&:hover': {
                    backgroundColor: '#388e3c',
                  },
                }} onClick={() => handleNavigation('/tasks/status')}>
                  View Status
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </HRLayout>
  );
};

export default TaskDashboard;
