import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage({ authenticated }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
      <Stack spacing={2.5} alignItems="center" sx={{ textAlign: 'center', maxWidth: 520 }}>
        <Typography variant="h2" sx={{ fontWeight: 900 }}>404</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>Page not found</Typography>
        <Typography color="text.secondary">The route you requested does not exist in the Daniyal Pharmacy dashboard.</Typography>
        <Button variant="contained" onClick={() => navigate(authenticated ? '/dashboard' : '/login')}>
          {authenticated ? 'Go to Dashboard' : 'Go to Login'}
        </Button>
      </Stack>
    </Box>
  );
}