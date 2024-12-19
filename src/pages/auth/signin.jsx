import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react"; // Import useSession

const SignIn = () => {
  const router = useRouter();
  const { data: session, status } = useSession(); // Access session data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      // Call NextAuth's `signIn` function with credentials
      const res = await signIn("credentials", {
        redirect: false, // Prevent automatic redirection
        username,
        password,
      });

      if (res?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        // After sign-in, wait for the session data
        if (status === "authenticated") {
          const userRole = session?.user?.role;
          if (userRole === "hr") {
            router.push("/hr"); // Redirect HR users
          } else if (userRole === "manager") {
            router.push("/manager"); // Redirect Manager users
          } else {
            router.push("/employee"); // Redirect Employee users
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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#ffff",
        padding: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
            Sign In
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
            <Typography
              color="error"
              align="center"
              sx={{ marginBottom: 2 }}
            >
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
              backgroundColor: '#153B60', // Set the color to #153B60
              '&:hover': {
                backgroundColor: '#0d2a43', // Darker shade for hover effect
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Sign In'
            )}
          </Button>

        </CardContent>
      </Card>
    </Box>
  );
};

export default SignIn;
