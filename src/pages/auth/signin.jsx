
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

const SignIn = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Forget Password States
  const [openForgetPassword, setOpenForgetPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState("");
  const [resetEmail, setResetEmail] = useState(""); // Added Email
  const [resetPassword, setResetPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");

  const handleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (res?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        if (status === "authenticated") {
          const userRole = session?.user?.role;
          if (userRole === "hr") {
            router.push("/hr");
          } else if (userRole === "manager") {
            router.push("/manager");
          } else {
            router.push("/employee");
          }
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Sign-In Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Forget Password Reset
  const handleForgetPassword = async () => {
    setResetError("");
    setResetLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: resetUsername,
          email: resetEmail,
          newPassword: resetPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password.");
      }

      setOpenForgetPassword(false);
      setResetUsername("");
      setResetEmail(""); // Clear Email
      setResetPassword("");
      alert("Password reset successfully!");
    } catch (err) {
      setResetError(err.message || "An error occurred while resetting the password.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 10, borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
            <Avatar
              sx={{
                bgcolor: "#153B60",
                width: 70,
                height: 70,
              }}
            >
              <Typography variant="h4" sx={{ color: "white" }}>
                R
              </Typography>
            </Avatar>
          </Box>
          <Typography variant="h5" align="center" sx={{ marginBottom: 3, fontWeight: "bold" }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" align="center" sx={{ marginBottom: 3, color: "#6c757d" }}>
            Please sign in to continue
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            fullWidth
            onClick={handleSignIn}
            disabled={loading}
            sx={{
              height: 45,
              backgroundColor: '#153B60',
              '&:hover': {
                backgroundColor: '#0d2a43',
              },
              borderRadius: 5,
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Sign In'
            )}
          </Button>

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button
              color="primary"
              sx={{ textTransform: "none", fontWeight: "bold" }}
              onClick={() => setOpenForgetPassword(true)}
            >
              Forget Password?
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Forget Password Dialog */}
      <Dialog open={openForgetPassword} onClose={() => setOpenForgetPassword(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={resetUsername}
            onChange={(e) => setResetUsername(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ marginBottom: 2 }}
            value={resetPassword}
            onChange={(e) => setResetPassword(e.target.value)}
            required
          />
          {resetError && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {resetError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForgetPassword(false)}>Cancel</Button>
          <Button
            onClick={handleForgetPassword}
            disabled={resetLoading}
            variant="contained"
          >
            {resetLoading ? <CircularProgress size={24} /> : "Reset Password"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SignIn;
