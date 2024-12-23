import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Divider } from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import HRLayout from '../../components/HRLayout';

// Sample data
const performanceTrendData = [
  { month: 'Jan', Efficiency: 80, Accuracy: 85 },
  { month: 'Feb', Efficiency: 82, Accuracy: 87 },
  { month: 'Mar', Efficiency: 78, Accuracy: 90 },
  { month: 'Apr', Efficiency: 85, Accuracy: 92 },
  { month: 'May', Efficiency: 88, Accuracy: 95 },
];

const teamPerformanceData = [
  { name: 'Team A', Performance: 95 },
  { name: 'Team B', Performance: 90 },
  { name: 'Team C', Performance: 85 },
  { name: 'Team D', Performance: 88 },
];

const taskDistributionData = [
  { name: 'Completed', value: 60 },
  { name: 'Pending', value: 30 },
  { name: 'In Progress', value: 10 },
];

const COLORS = ['#4caf50', '#ff9800', '#2196f3'];

const PerformanceAnalyticsDashboard = () => {
  return (
    <HRLayout>
      <Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
          Performance Analytics Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* Key Metrics */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Efficiency
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  88%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Accuracy
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  92%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Task Completion Rate
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  95%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Line Chart */}
          <Grid item xs={12} md={8}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Performance Trends
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Efficiency" stroke="#4caf50" />
                      <Line type="monotone" dataKey="Accuracy" stroke="#2196f3" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Bar Chart */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Team Performance
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={teamPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="Performance" fill="#4caf50" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 3, backgroundColor: 'white' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Task Distribution
                </Typography>
                <Divider sx={{ margin: '10px 0' }} />
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {taskDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </HRLayout>
  );
};

export default PerformanceAnalyticsDashboard;
