import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { ArrowBackRounded } from '@mui/icons-material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';

export function ForgotPasswordPage() {
  const { requestPasswordReset, isAuthenticated } = useAuth();
  const { notify } = useSnackbar();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@pharmacy.com');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async () => {
    try {
      await requestPasswordReset(email);
      notify('Reset instructions are ready for the connected auth service.', 'success');
      navigate('/login');
    } catch (error) {
      notify(error.message, 'error');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
      <Card sx={{ width: '100%', maxWidth: 520 }}>
        <CardContent>
          <Stack spacing={3}>
            <Button startIcon={<ArrowBackRounded />} onClick={() => navigate('/login')} sx={{ alignSelf: 'flex-start' }}>
              Back to Login
            </Button>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>Forgot Password</Typography>
            <Typography color="text.secondary">Enter your email to prepare a reset flow. The auth context is ready for JWT integration.</Typography>
            <TextField label="Email" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
            <Button variant="contained" size="large" onClick={handleSubmit}>Send Reset Link</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}