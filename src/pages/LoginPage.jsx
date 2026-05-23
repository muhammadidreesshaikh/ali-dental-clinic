import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Chip, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { LoginRounded, MedicationRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const { notify } = useSnackbar();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@pharmacy.com');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login({ email, password });
      notify('Welcome back to Daniyal Pharmacy.', 'success');
      navigate('/dashboard');
    } catch (error) {
      notify(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      rowSpacing={0}
      columnSpacing={0.5}
      sx={{ minHeight: '100vh', p: { xs: 2, sm: 3, md: 0 } }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'grid',
          placeItems: 'center',
          p: { xs: 0, md: '48px 24px 48px 48px' },
        }}
      >
        <Card sx={{ width: '100%', maxWidth: 560, p: { xs: 1.5, sm: 2 } }}>
          <CardContent sx={{ '&:last-child': { pb: 0 } }}>
            <Stack spacing={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'center', sm: 'center' }} spacing={1.5}>
                <Box sx={{ width: 54, height: 54, borderRadius: 3, bgcolor: 'primary.main', color: '#fff', display: 'grid', placeItems: 'center' }}>
                  <MedicationRounded />
                </Box>
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                  <Typography variant="h5" sx={{ fontWeight: 900 }}>Daniyal Pharmacy</Typography>
                  <Typography variant="body2" color="text.secondary">Premium pharmacy management dashboard</Typography>
                </Box>
              </Stack>
              <Stack direction="row" justifyContent={{ xs: 'center', md: 'flex-start' }} spacing={1} flexWrap="wrap">
                <Chip label="Super Admin" color="secondary" sx={{ mr: 1 }} />
                <Chip label="Admin" variant="outlined" />
              </Stack>
              <Typography variant="h4" sx={{ fontWeight: 900, fontSize: { xs: '2rem', sm: '2.25rem' } }}>Sign in</Typography>
              <TextField label="Email" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'hide password' : 'show password'}
                        onClick={() => setShowPassword((current) => !current)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" size="large" startIcon={<LoginRounded />} onClick={handleLogin} disabled={loading}>
                {loading ? 'Signing in...' : 'Login'}
              </Button>
              <Button variant="text" onClick={() => navigate('/forgot-password')} sx={{ alignSelf: { xs: 'center', md: 'flex-end' }, fontWeight: 500 }}>
                Forgot Password?
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, p: { md: '48px 48px 48px 24px' } }}>
        <Box
          sx={{
            height: '100%',
            borderRadius: 6,
            background: 'linear-gradient(135deg, rgba(16,185,129,0.92), rgba(6,182,212,0.9), rgba(139,92,246,0.82))',
            color: '#fff',
            p: 4,
            display: 'grid',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="overline" sx={{ letterSpacing: '0.3em' }}>Pharmacy Operations</Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, maxWidth: 500, mt: 2, fontSize: { md: '3.25rem', lg: '4rem' } }}>
              A modern control center for billing, inventory and reporting.
            </Typography>
            <Typography sx={{ mt: 2, maxWidth: 520, opacity: 0.92, fontWeight: 400, fontSize: { md: '1rem', lg: '1.1rem' } }}>
              Secure, responsive and beautifully branded for everyday pharmacy management.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}