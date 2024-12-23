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
import { Edit, Delete, Search } from '@mui/icons-material';
import ManagerLayout from '../../components/ManagerLayout'; // Replace with your layout

const FeedbackDashboard = () => {
  const [feedbackList, setFeedbackList] = useState([
    { id: 1, user: 'Faskath', message: 'Great service!' },
    { id: 2, user: 'Shajith', message: 'Needs improvement in delivery.' },
    { id: 3, user: 'Hanan', message: 'Amazing quality!' },
    { id: 4, user: 'Hassan', message: 'Quick response time, loved it!' },
    { id: 5, user: 'Mohamed', message: 'The website UI can improve.' },
    { id: 6, user: 'Fskath Hassan', message: 'Fast and reliable!' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ id: null, user: '', message: '' });

  // Paginated Feedback
  const filteredFeedback = feedbackList.filter(
    (feedback) =>
      feedback.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedFeedback = filteredFeedback.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Open Dialog for Creating/Editing
  const handleOpenDialog = (feedback = { id: null, user: '', message: '' }) => {
    setFeedbackData(feedback);
    setOpenDialog(true);
  };

  // Close Dialog
  const handleCloseDialog = () => {
    setFeedbackData({ id: null, user: '', message: '' });
    setOpenDialog(false);
  };

  // Save Feedback
  const handleSaveFeedback = () => {
    if (feedbackData.id) {
      // Update existing feedback
      setFeedbackList((prev) =>
        prev.map((f) => (f.id === feedbackData.id ? feedbackData : f))
      );
    } else {
      // Create new feedback
      const newFeedback = { ...feedbackData, id: Date.now() };
      setFeedbackList((prev) => [...prev, newFeedback]);
    }
    handleCloseDialog();
  };

  // Delete Feedback
  const handleDeleteFeedback = (id) => {
    setFeedbackList((prev) => prev.filter((feedback) => feedback.id !== id));
  };

  // Pagination Handler
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <ManagerLayout>
      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h4"
          sx={{ marginBottom: 4, fontWeight: 'bold', textAlign: 'center' }}
        >
          Feedback Management
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 4,
            flexWrap: 'wrap',
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search feedback..."
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
            onClick={() => handleOpenDialog()}
            sx={{
                borderRadius: '20px',
                backgroundColor: 'rgb(19, 66, 54)',
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: '#388e3c',
                },
              }}
          >
            Add New Feedback
          </Button>
        </Box>

        <Grid container spacing={3}>
          {paginatedFeedback.map((feedback) => (
            <Grid item xs={12} sm={6} md={4} key={feedback.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: '#1976d2' }}
                  >
                    {feedback.user}
                  </Typography>
                  <Divider sx={{ marginY: 2 }} />
                  <Typography variant="body2" color="textSecondary">
                    {feedback.message}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(feedback)}
                    sx={{
                      backgroundColor: '#e3f2fd',
                      '&:hover': { backgroundColor: '#bbdefb' },
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteFeedback(feedback.id)}
                    sx={{
                      backgroundColor: '#ffebee',
                      '&:hover': { backgroundColor: '#ffcdd2' },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {filteredFeedback.length > itemsPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Pagination
              count={Math.ceil(filteredFeedback.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}

        {/* Feedback Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white' }}>
            {feedbackData.id ? 'Edit Feedback' : 'Add New Feedback'}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="User"
              fullWidth
              variant="outlined"
              value={feedbackData.user}
              onChange={(e) =>
                setFeedbackData({ ...feedbackData, user: e.target.value })
              }
              sx={{ marginBottom: 3 }}
            />
            <TextField
              label="Task"
              fullWidth
              variant="outlined"
              value={feedbackData.user}
              onChange={(e) =>
                setFeedbackData({ ...feedbackData, task: e.target.value })
              }
              sx={{ marginBottom: 3 }}
            />
            <TextField
              label="Message"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={feedbackData.message}
              onChange={(e) =>
                setFeedbackData({ ...feedbackData, message: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleSaveFeedback}
              color="primary"
              variant="contained"
              sx={{
                backgroundColor: '#4caf50',
                '&:hover': { backgroundColor: '#388e3c' },
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ManagerLayout>
  );
};

export default FeedbackDashboard;
