import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Pagination,
  InputAdornment,
} from '@mui/material';
import { Search, Visibility } from '@mui/icons-material';
import ManagerLayout from '../../components/ManagerLayout'; // Your custom layout component

const ViewReportsDashboard = () => {
  const [reports, setReports] = useState([
    { id: 1, title: 'Sales Report Q1', description: 'Detailed sales report for the first quarter.' },
    { id: 2, title: 'Marketing Performance', description: 'Analysis of marketing performance in 2024.' },
    { id: 3, title: 'Team Performance Summary', description: 'Summary of the overall team performance.' },
    { id: 4, title: 'Financial Overview', description: 'Financial performance report for the year.' },
    { id: 5, title: 'Product Launch Report', description: 'Evaluation of the recent product launch.' },
    { id: 6, title: 'Customer Feedback Analysis', description: 'Report based on the customer feedback survey.' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Filter and Paginate the reports
  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Dialog Open for Viewing Report Details
  const handleOpenDialog = (report) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  // Close Dialog
  const handleCloseDialog = () => {
    setSelectedReport(null);
    setOpenDialog(false);
  };

  // Handle Pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <ManagerLayout>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold', textAlign: 'center' }}>
          Performance Reports Dashboard
        </Typography>

        {/* Header Content */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap' }}>
          <TextField
            variant="outlined"
            placeholder="Search reports..."
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: { xs: 2, md: 0 }, width: { xs: '100%', md: '300px' } }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log('Create Report')}
            sx={{
              backgroundColor: '#4caf50',
              '&:hover': { backgroundColor: '#388e3c' },
            }}
          >
            Create New Report
          </Button>
        </Box>

        {/* Report Categories Section */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Report Categories
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button variant="outlined" color="primary">Sales</Button>
            <Button variant="outlined" color="primary">Marketing</Button>
            <Button variant="outlined" color="primary">Team Performance</Button>
            <Button variant="outlined" color="primary">Financial</Button>
            <Button variant="outlined" color="primary">Customer Feedback</Button>
          </Box>
        </Box>

        {/* Report List Section */}
        <Grid container spacing={3}>
          {paginatedReports.map((report) => (
            <Grid item xs={12} sm={6} md={4} key={report.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {report.title}
                  </Typography>
                  <Divider sx={{ marginY: 2 }} />
                  <Typography variant="body2" color="textSecondary">
                    {report.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(report)}
                    sx={{
                      backgroundColor: '#e3f2fd',
                      '&:hover': { backgroundColor: '#bbdefb' },
                    }}
                  >
                    <Visibility />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {filteredReports.length > itemsPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Pagination
              count={Math.ceil(filteredReports.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}

        {/* Report View Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white' }}>
            {selectedReport ? selectedReport.title : 'Report Details'}
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Description
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {selectedReport?.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ManagerLayout>
  );
};

export default ViewReportsDashboard;
