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

const TeamPerformance = () => {
  const [teamData, setTeamData] = useState([
    { id: 1, team: 'Team Alpha', performance: 'Excellent', score: 95 },
    { id: 2, team: 'Team Beta', performance: 'Good', score: 80 },
    { id: 3, team: 'Team Gamma', performance: 'Average', score: 65 },
    { id: 4, team: 'Team Delta', performance: 'Excellent', score: 90 },
    { id: 5, team: 'Team Epsilon', performance: 'Good', score: 78 },
    { id: 6, team: 'Team Zeta', performance: 'Average', score: 70 },
    
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create'); // 'create', 'edit'
  const [teamDataDetail, setTeamDataDetail] = useState({ id: null, team: '', performance: '', score: 0 });

  // Filtered and Paginated Team Performance Data
  const filteredData = teamData.filter(
    (data) =>
      data.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.performance.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Open Dialog for Create or Edit Team Details
  const handleOpenDialog = (team = { id: null, team: '', performance: '', score: 0 }, mode = 'create') => {
    setDialogMode(mode);
    setTeamDataDetail(team);
    setOpenDialog(true);
  };

  // Close Dialog
  const handleCloseDialog = () => {
    setTeamDataDetail({ id: null, team: '', performance: '', score: 0 });
    setOpenDialog(false);
  };

  // Save or Update Team Performance
  const handleSaveTeamPerformance = () => {
    if (dialogMode === 'edit') {
      // Update existing team data
      setTeamData((prev) =>
        prev.map((item) => (item.id === teamDataDetail.id ? teamDataDetail : item))
      );
    } else {
      // Create new team data
      const newTeam = { ...teamDataDetail, id: Date.now() };
      setTeamData((prev) => [...prev, newTeam]);
    }
    handleCloseDialog();
  };

  // Delete Team Performance
  const handleDeleteTeamPerformance = (id) => {
    setTeamData((prev) => prev.filter((data) => data.id !== id));
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
          Team Performance Management
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
            placeholder="Search by team name or performance..."
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
            Add New Team Performance
          </Button>
        </Box>

        <Grid container spacing={3}>
          {paginatedData.map((data) => (
            <Grid item xs={12} sm={6} md={4} key={data.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: '' }}
                  >
                    {data.team}
                  </Typography>
                  <Divider sx={{ marginY: 2 }} />
                  <Typography variant="body2" color="textSecondary">
                    Performance: {data.performance}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Score: {data.score}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
                  <IconButton
                    color="primary" 
                    
                    onClick={() => handleOpenDialog(data, 'edit')}
                    sx={{
                      backgroundColor: '#e3f2fd',
                      '&:hover': { backgroundColor: '#bbdefb' },
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteTeamPerformance(data.id)}
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
        {filteredData.length > itemsPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}

        {/* Team Performance Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle sx={{
                
                    backgroundColor: 'rgb(11, 178, 136)',
                    padding: '10px 20px',
                    '&:hover': {
                      backgroundColor: '#388e3c',
                    },
                  }}>
            {dialogMode === 'edit' ? 'Edit Team Performance' : 'Add New Team Performance'}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Team Name"
              fullWidth
              variant="outlined"
              value={teamDataDetail.team}
              
              onChange={(e) =>
                setTeamDataDetail({ ...teamDataDetail, team: e.target.value })
              }
              sx={{ marginBottom: 3 }}
            />
            <TextField
              label="Performance"
              fullWidth
              variant="outlined"
              value={teamDataDetail.performance}
              onChange={(e) =>
                setTeamDataDetail({ ...teamDataDetail, performance: e.target.value })
              }
              sx={{ marginBottom: 3 }}
            />
            <TextField
              label="Score"
              fullWidth
              variant="outlined"
              type="number"
              value={teamDataDetail.score}
              onChange={(e) =>
                setTeamDataDetail({ ...teamDataDetail, score: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleSaveTeamPerformance}
              color="primary"
              variant="contained"
              sx={{
                borderRadius: '20px',
                backgroundColor: 'rgb(19, 132, 104)',
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: '#388e3c',
                },
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

export default TeamPerformance;
