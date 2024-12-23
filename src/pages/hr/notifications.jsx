import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Container, TextField, Button, Typography, Snackbar, Alert, Paper, Card, CardContent, InputAdornment, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import HRLayout from '../../components/HRLayout';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New Employee Added', date: '2024-12-23' },
    { id: 2, message: 'Performance Review Scheduled', date: '2024-12-24' },
    { id: 3, message: 'Team Meeting Scheduled', date: '2024-12-25' },
    { id: 4, message: 'HR System Maintenance', date: '2024-12-26' },
  ]);
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [id, setId] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);  // Add openNotification state

  const handleCreateOrUpdate = useCallback((notification) => {
    if (!message || !date) {
      setNotificationMessage('Message and Date are required');
      setSeverity('error');
      setOpenNotification(true);
      return;
    }

    if (notification.id) {
      // Update existing notification
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === notification.id ? { ...notif, message: notification.message, date: notification.date } : notif
        )
      );
      setNotificationMessage(`Notification with ID: ${notification.id} updated successfully.`);
      setSeverity('info');
    } else {
      // Add new notification
      const newNotification = { ...notification, id: notifications.length + 1 };
      setNotifications([...notifications, newNotification]);
      setNotificationMessage(`Notification added successfully with ID: ${newNotification.id}.`);
      setSeverity('success');
    }
    setOpenNotification(true);
    setId(null);
    setMessage('');
    setDate('');
  }, [notifications, message, date]);

  const handleEdit = useCallback((id) => {
    const notification = notifications.find((notif) => notif.id === id);
    setMessage(notification.message);
    setDate(notification.date);
    setId(notification.id);
  }, [notifications]);

  const handleDelete = useCallback((id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
    setNotificationMessage('Notification deleted successfully');
    setSeverity('error');
    setOpenNotification(true);
  }, [notifications]);

  const handleSearch = useCallback((e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = notifications.filter((notif) =>
      notif.message.toLowerCase().includes(query)
    );
    setFilteredNotifications(filtered);
  }, [notifications]);

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  const NotificationList = ({ notifications, onEdit, onDelete }) => (
    <Box>
      <List>
        {notifications.map((notification) => (
          <React.Fragment key={notification.id}>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText primary={notification.message} secondary={notification.date} />
              <Box>
                <IconButton onClick={() => onEdit(notification.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(notification.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  const NotificationForm = ({ onSubmit }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ id, message, date });
    };

    return (
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          {id ? 'Edit Notification' : 'Add Notification'}
        </Typography>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              {id ? 'Update Notification' : 'Add Notification'}
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              sx={{ marginTop: 2 }}
              onClick={() => { setMessage(''); setDate(''); setId(null); }}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  };

  return (
    <HRLayout>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <NotificationForm onSubmit={handleCreateOrUpdate} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Notifications List
                </Typography>
                {/* Search Input */}
                <TextField
                  label="Search Notifications"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearch}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <NotificationList notifications={filteredNotifications} onEdit={handleEdit} onDelete={handleDelete} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar for Notifications */}
      <Snackbar open={openNotification} autoHideDuration={3000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={severity} sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </HRLayout>
  );
};

export default NotificationManagement;
