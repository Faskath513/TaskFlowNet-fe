import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper, List, ListItem, ListItemText, LinearProgress, Avatar, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAuth } from '../../hooks/useAuth'; // Assuming useAuth hook to fetch user details
import EmployeeLayout from '../../components/EmployeeLayout'; // Import EmployeeLayout
// Sample static data for performance and goals
const performanceData = [
  { month: 'Jan', score: 75 },
  { month: 'Feb', score: 80 },
  { month: 'Mar', score: 85 },
  { month: 'Apr', score: 90 },
  { month: 'May', score: 92 },
];

const goalData = [
  { name: 'Completed', value: 50 },
  { name: 'In Progress', value: 30 },
  { name: 'Not Started', value: 20 },
];

const taskData = [
  { id: 1, title: 'Complete project report', description: 'Write the final report for the Q1 project', status: 'In Progress', feedback: 'Good progress, need more details' },
  { id: 2, title: 'Submit feedback for team members', description: 'Give feedback for the Q2 review', status: 'Completed', feedback: 'Task successfully completed' },
  { id: 3, title: 'Prepare presentation for quarterly review', description: 'Prepare slides for the upcoming Q3 review', status: 'Not Started', feedback: 'Need to start soon' },
];

const PerformanceReviewDashboard = () => {
  const { user } = useAuth(); // Fetch user details from useAuth hook
  const [assignedTasks, setAssignedTasks] = useState(taskData); // Using static task data

  return (
    <EmployeeLayout>
    <Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      {/* Heading */}
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Performance Review Dashboard
      </Typography>

      {/* Overall Performance Trend */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3 }}>
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
        </Grid>

        {/* Goal Status Summary */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              🎯 Goal Status Summary
            </Typography>
            <Grid container spacing={2}>
              {goalData.map((goal) => (
                <Grid item xs={4} key={goal.name}>
                  <Card sx={{ padding: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {goal.name}
                    </Typography>
                    <LinearProgress variant="determinate" value={goal.value} sx={{ marginTop: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                      {goal.value}%
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Task Feedback */}
      <Paper sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          📋 Task Feedback Overview
        </Typography>
        {assignedTasks.map((task) => (
          <Card key={task.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                {task.title}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                {task.description}
              </Typography>

              {/* Task Status and Progress */}
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Status: {task.status}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={task.status === 'Completed' ? 100 : task.status === 'In Progress' ? 60 : 0} 
                sx={{ marginBottom: 2 }} 
              />
              {task.status === 'Completed' && (
                <IconButton color="success" sx={{ marginTop: 1 }}>
                  <CheckCircleIcon />
                </IconButton>
              )}

              {/* Task Feedback */}
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                Feedback: {task.feedback}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Paper>

      {/* Recent Feedback */}
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          🔔 Recent Feedback
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Feedback: Great work on the Q1 report, keep it up!" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Feedback: Please provide more details in the upcoming presentation." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Feedback: Need to improve on time management for Q3 tasks." />
          </ListItem>
        </List>
      </Paper>
    </Box>
    </EmployeeLayout>
  );
};

export default PerformanceReviewDashboard;
