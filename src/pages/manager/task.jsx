import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ManagerLayout from '../../components/ManagerLayout'; // Import the ManagerLayout component

const TaskManagementDashboard = () => {
  // State to manage tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project documentation', description: 'Write the project documentation for the current project.', status: 'In Progress' },
    { id: 2, title: 'Attend team meeting', description: 'Attend the weekly team meeting and provide updates.', status: 'Completed' },
    { id: 3, title: 'Code review', description: 'Review code submitted by team members for quality and feedback.', status: 'Not Started' },
  ]);

  // State for Dialog visibility and editing task data
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: null, title: '', description: '', status: '' });

  // Handle task addition/edit
  const handleOpenDialog = (task) => {
    setCurrentTask(task || { id: null, title: '', description: '', status: '' }); // Default empty task when adding
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveTask = () => {
    if (currentTask.id) {
      // Update existing task
      setTasks(tasks.map(task => task.id === currentTask.id ? currentTask : task));
    } else {
      // Add new task
      setTasks([...tasks, { ...currentTask, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  // Handle task deletion
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <ManagerLayout>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h3" gutterBottom>
          Task Management 
        </Typography>

        <Button variant="contained" color="primary" sx={{
                    borderRadius: '20px',
                    backgroundColor: 'rgb(19, 66, 54)',
                    padding: '10px 20px',
                    '&:hover': {
                      backgroundColor: '#388e3c',
                    },
                  }} onClick={() => handleOpenDialog(null)}>
          Add New Task
        </Button>

        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          {tasks.map((task) => (
            <Grid item xs={12} md={6} lg={4} key={task.id}>
              <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {task.description}
                </Typography>
                <Chip
                  label={task.status}
                  color={task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'warning' : 'default'}
                  sx={{ marginBottom: 1 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={() => handleOpenDialog(task)} sx={{ marginRight: 1 }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Dialog for adding/editing tasks */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{currentTask.id ? 'Edit Task' : 'Add Task'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Task Title"
              fullWidth
              variant="outlined"
              value={currentTask.title}
              onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Task Description"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={currentTask.description}
              onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
              margin="normal"
            />
            <TextField
              label="Task Status"
              fullWidth
              variant="outlined"
              select
              value={currentTask.status}
              onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value })}
              SelectProps={{
                native: true,
              }}
              margin="normal"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveTask} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ManagerLayout>
  );
};

export default TaskManagementDashboard;
