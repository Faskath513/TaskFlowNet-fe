import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, List, ListItem, ListItemText, IconButton, LinearProgress } from '@mui/material';
import { useAuth } from '../../hooks/useAuth'; // Assuming useAuth hook to fetch user details
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmployeeLayout from '../../components/EmployeeLayout'; // Import EmployeeLayout

// Static data for HR reports
const reportData = [
  { id: 1, title: 'Quarterly Performance Review', description: 'Overview of employee performance in Q1.', status: 'Completed', feedback: 'Great performance, keep up the good work!' },
  { id: 2, title: 'Annual Goal Setting', description: 'Setting goals for the upcoming year.', status: 'In Progress', feedback: 'In progress, needs more details for clarity.' },
  { id: 3, title: 'Employee Satisfaction Survey', description: 'Survey to gauge employee satisfaction with work culture.', status: 'Completed', feedback: 'Well received, no major concerns raised.' },
];

const EmployeeReportsDashboard = () => {
  const { user } = useAuth(); // Fetch user details from useAuth hook
  const [reports, setReports] = useState(reportData); // Using static report data

  // Function to mark a report as "viewed"
  const handleViewReport = (reportId) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId ? { ...report, status: 'Viewed' } : report
      )
    );
  };

  return (
    <EmployeeLayout>
    <Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      {/* Heading */}
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Employee HR Reports Dashboard
      </Typography>

      {/* Report List */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              🗂️ HR Reports
            </Typography>
            <List>
              {reports.map((report) => (
                <ListItem key={report.id} sx={{ marginBottom: 2 }}>
                  <Card sx={{ width: '100%', padding: 2, boxShadow: 2 }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                        {report.title}
                      </Typography>
                      <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        {report.description}
                      </Typography>

                      {/* Report Status */}
                      <Typography variant="body2" sx={{ marginBottom: 2 }}>
                        Status: {report.status}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={report.status === 'Completed' ? 100 : report.status === 'In Progress' ? 60 : 0} 
                        sx={{ marginBottom: 2 }} 
                      />

                      {/* Feedback */}
                      <Typography variant="body2" sx={{ fontStyle: 'italic', marginBottom: 2 }}>
                        Feedback: {report.feedback}
                      </Typography>

                      {/* Action buttons */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton color="primary" onClick={() => handleViewReport(report.id)}>
                          <VisibilityIcon />
                        </IconButton>
                        {report.status === 'Completed' && (
                          <IconButton color="success" sx={{ marginLeft: 1 }}>
                            <CheckCircleIcon />
                          </IconButton>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Report Details (Optional) */}
      {/* You can show a detailed view of a specific report when it's clicked */}
    </Box>
    </EmployeeLayout>
  );
};

export default EmployeeReportsDashboard;
