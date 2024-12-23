import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Paper, List, ListItem, ListItemText, LinearProgress, Divider, IconButton } from '@mui/material';
import EmployeeLayout from '../../components/EmployeeLayout'; // Import EmployeeLayout
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // For drag and drop functionality

// Static data for tasks
const initialTasks = [
  { id: '1', title: 'Complete project report', description: 'Write the final report for the Q1 project', status: 'To Do' },
  { id: '2', title: 'Submit feedback for team members', description: 'Give feedback for the Q2 review', status: 'To Do' },
  { id: '3', title: 'Prepare presentation for quarterly review', description: 'Prepare slides for the upcoming Q3 review', status: 'To Do' },
];

const TaskManagementDashboard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  // Handle task status change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Handle drag-and-drop
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return; // If the task is dropped outside a droppable area, do nothing

    const reorderedTasks = [...tasks];
    const [removed] = reorderedTasks.splice(source.index, 1); // Remove the task from the source position
    removed.status = destination.droppableId; // Update the task status to the new status (droppable area)
    reorderedTasks.splice(destination.index, 0, removed); // Insert the task in the new position

    setTasks(reorderedTasks);
  };

  return (
    <EmployeeLayout>
      <Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Task Management
        </Typography>

        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={3}>
            {/* To Do Tasks */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  📝 To Do
                </Typography>
                <Droppable droppableId="To Do">
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ minHeight: 200, maxHeight: '60vh', overflowY: 'auto' }}
                    >
                      {tasks
                        .filter((task) => task.status === 'To Do')
                        .map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{ marginBottom: 2 }}
                              >
                                <CardContent>
                                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                    {task.title}
                                  </Typography>
                                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                    {task.description}
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                      borderRadius: '20px',
                                      backgroundColor: 'rgb(19, 66, 54)',
                                      padding: '10px 20px',
                                      '&:hover': {
                                        backgroundColor: '#388e3c',
                                      },
                                    }}
                                    onClick={() => handleStatusChange(task.id, 'In Progress')}
                                  >
                                    Move to In Progress
                                  </Button>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            </Grid>

            {/* In Progress Tasks */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  🔄 In Progress
                </Typography>
                <Droppable droppableId="In Progress">
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ minHeight: 200, maxHeight: '60vh', overflowY: 'auto' }}
                    >
                      {tasks
                        .filter((task) => task.status === 'In Progress')
                        .map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{ marginBottom: 2 }}
                              >
                                <CardContent>
                                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                    {task.title}
                                  </Typography>
                                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                    {task.description}
                                  </Typography>
                                  <LinearProgress variant="determinate" value={60} sx={{ marginBottom: 2 }} />
                                  <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                      borderRadius: '20px',
                                      backgroundColor: 'rgb(19, 66, 54)',
                                      padding: '10px 20px',
                                      '&:hover': {
                                        backgroundColor: '#388e3c',
                                      },
                                    }}
                                    onClick={() => handleStatusChange(task.id, 'Completed')}
                                  >
                                    Mark as Completed
                                  </Button>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            </Grid>

            {/* Completed Tasks */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                  ✅ Completed
                </Typography>
                <Droppable droppableId="Completed">
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ minHeight: 200, maxHeight: '60vh', overflowY: 'auto' }}
                    >
                      {tasks
                        .filter((task) => task.status === 'Completed')
                        .map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{ marginBottom: 2 }}
                              >
                                <CardContent>
                                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                    {task.title}
                                  </Typography>
                                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                    {task.description}
                                  </Typography>
                                  <IconButton color="success" sx={{ marginTop: 1 }}>
                                    <CheckCircleIcon />
                                  </IconButton>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          </Grid>
        </DragDropContext>
      </Box>
    </EmployeeLayout>
  );
};

export default TaskManagementDashboard;
