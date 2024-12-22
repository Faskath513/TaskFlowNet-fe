import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HRLayout from "../../components/HRLayout"; // Import the new Layout component

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    employeeDetails: {},
    managerDetails: {},
    hrDetails: {},
  });
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete confirmation
  const [userToDelete, setUserToDelete] = useState(null); // State to store the user to delete
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "hr") {
      router.push("/"); // Redirect non-HR users to the homepage
    } else {
      fetchUsers();
    }
  }, [user, router]);

  // Fetch users function
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/user/all", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  // Handle creating or updating a user
  const handleSaveUser = async () => {
    const url = isUpdate
      ? `http://localhost:5001/api/user/update/${selectedUser._id}`
      : "http://localhost:5001/api/user/create";
    const method = isUpdate ? "put" : "post";

    try {
      const response = await axios({
        method,
        url,
        data: newUser,
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // After save, re-fetch the users list
      fetchUsers();

      // Reset the form and dialog
      setNewUser({
        username: "",
        email: "",
        password: "",
        role: "",
        employeeDetails: {},
        managerDetails: {},
        hrDetails: {},
      });
      setOpen(false); // Close the dialog after successful user creation or update
      setIsUpdate(false); // Reset the update flag
      setSelectedUser(null); // Clear selected user

    } catch (err) {
      setError("Failed to save user");
      console.error("Error saving user:", err);
    }
  };

  // Handle opening the update dialog
  const handleUpdateUser = (user) => {
    setNewUser({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      employeeDetails: user.employeeDetails || {},
      managerDetails: user.managerDetails || {},
      hrDetails: user.hrDetails || {},
    });
    setIsUpdate(true);
    setSelectedUser(user);
    setOpen(true);
  };

  // Handle opening the delete confirmation dialog
  const handleOpenDeleteDialog = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  // Handle deleting a user
  const handleDeleteUser = async () => {
    try {
      if (!userToDelete) return;

      await axios.delete(`http://localhost:5001/api/user/delete/${userToDelete._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // Remove the deleted user from the state
      const updatedUsers = users.filter((usr) => usr._id !== userToDelete._id);
      setUsers(updatedUsers);
      setOpenDeleteDialog(false); // Close the delete confirmation dialog
    } catch (err) {
      setError("Failed to delete user");
      setOpenDeleteDialog(false); // Close the dialog even if deletion fails
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle dynamic role-specific details
  const handleRoleChange = (e) => {
    const { value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      role: value,
      employeeDetails: value === "employee" ? {} : prevState.employeeDetails,
      managerDetails: value === "manager" ? {} : prevState.managerDetails,
      hrDetails: value === "hr" ? {} : prevState.hrDetails,
    }));
  };

  if (loading) return <Typography variant="h6">Loading users...</Typography>;
  if (error) return <Typography variant="h6">{error}</Typography>;

  return (
    <HRLayout>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          textAlign: 'center', // Centers the text
          color: '#15B2C0', // Apply the custom color
        }}
      >
        Users List
      </Typography>

      {/* Create or Update User Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ marginBottom: "20px" }}
      >
        {isUpdate ? "Update User" : "Create User"}
      </Button>

      {/* User Table */}
      {/* User Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>User ID</strong></TableCell>
              <TableCell><strong>Username</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Details</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.role === "employee" && (
                    <>
                      <Typography variant="body2">
                        <strong>Department:</strong> {user.employeeDetails.department || "N/A"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Designation:</strong> {user.employeeDetails.designation || "N/A"}
                      </Typography>
                    </>
                  )}
                  {user.role === "manager" && (
                    <>
                      <Typography variant="body2">
                        <strong>Department:</strong> {user.managerDetails.department || "N/A"}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Team:</strong> {user.managerDetails.team ? user.managerDetails.team.join(", ") : "N/A"}
                      </Typography>
                    </>
                  )}
                  {user.role === "hr" && (
                    <>
                      <Typography variant="body2">
                        <strong>Assigned Departments:</strong> {user.hrDetails.assignedDepartments ? user.hrDetails.assignedDepartments.join(", ") : "N/A"}
                      </Typography>
                    </>
                  )}
                </TableCell>
                <TableCell >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdateUser(user)}
                  >
                   <EditIcon/>
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleOpenDeleteDialog(user)} // Open delete confirmation
                  >
                    <DeleteIcon />

                  </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create or Update User Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isUpdate ? "Update User" : "Create New User"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={newUser.role}
                  onChange={handleRoleChange}
                  label="Role"
                >
                  <MenuItem value="employee">Employee</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="hr">HR</MenuItem>
                </Select>
                <FormHelperText>Select user role</FormHelperText>
              </FormControl>
            </Grid>
            {/* Role-Specific Details */}
            {newUser.role === "employee" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Department"
                    variant="outlined"
                    fullWidth
                    name="employeeDetails.department"
                    value={newUser.employeeDetails.department || ""}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        employeeDetails: {
                          ...newUser.employeeDetails,
                          department: e.target.value,
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Designation"
                    variant="outlined"
                    fullWidth
                    name="employeeDetails.designation"
                    value={newUser.employeeDetails.designation || ""}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        employeeDetails: {
                          ...newUser.employeeDetails,
                          designation: e.target.value,
                        },
                      })
                    }
                  />
                </Grid>
              </>
            )}
            {newUser.role === "manager" && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Department"
                    variant="outlined"
                    fullWidth
                    name="managerDetails.department"
                    value={newUser.managerDetails.department || ""}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        managerDetails: {
                          ...newUser.managerDetails,
                          department: e.target.value,
                        },
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Team Members (Usernames)"
                    variant="outlined"
                    fullWidth
                    name="managerDetails.team"
                    value={newUser.managerDetails.team ? newUser.managerDetails.team.join(", ") : ""}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        managerDetails: {
                          ...newUser.managerDetails,
                          team: e.target.value.split(",").map((username) => username.trim()),
                        },
                      })
                    }
                  />
                </Grid>
              </>
            )}

            {newUser.role === "hr" && (
              <Grid item xs={12}>
                <TextField
                  label="Assigned Departments"
                  variant="outlined"
                  fullWidth
                  name="hrDetails.assignedDepartments"
                  value={newUser.hrDetails.assignedDepartments || ""}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      hrDetails: {
                        ...newUser.hrDetails,
                        assignedDepartments: e.target.value.split(","),
                      },
                    })
                  }
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveUser} color="primary">
            {isUpdate ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </HRLayout>
  );
};

export default UserManagement;
