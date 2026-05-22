import React, { useState } from 'react';
import { Avatar, Box, Button, Chip, Grid, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material';
import { PageHeader } from '../components/PageHeader';
import { GlassCard } from '../components/GlassCard';
import { profileTimeline } from '../data/appData';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';

export function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { notify } = useSnackbar();
  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || '');

  return (
    <Box>
      <PageHeader
        title="Profile"
        subtitle="Update personal details, security preferences and activity history."
        breadcrumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Profile' }]}
      />

      <Grid container spacing={3}>
        <Grid item xs={6} xl={4}>
          <GlassCard disableLastChildPadding>
            <Stack spacing={2} alignItems="center">
              <Avatar sx={{ width: 92, height: 92, fontSize: 32, bgcolor: 'secondary.main' }}>{user?.avatar}</Avatar>
              <Chip label={user?.role || 'Admin'} color="success" />
              <Typography variant="h6">{user?.name}</Typography>
              <Typography color="text.secondary">{user?.email}</Typography>
              <Button variant="outlined" component="label">
                Upload Photo
                <input hidden type="file" accept="image/*" />
              </Button>
            </Stack>
          </GlassCard>
        </Grid>
        <Grid item xs={12} xl={8}>
          <GlassCard disableLastChildPadding>
            <Stack>
              <Typography variant="h6">Personal Info</Typography>
              <Grid container spacing={2} alignItems="center" mt={2}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Full Name" value={name} onChange={(event) => setName(event.target.value)} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
                </Grid>
                <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                  <Button
                    variant="contained"
                    sx={{ width: { xs: '100%', md: 'auto' } }}
                    onClick={() => {
                      updateProfile({ name, title });
                      notify('Profile updated successfully.', 'success');
                    }}
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </GlassCard>
        </Grid>
        <Grid item xs={12}>
          <GlassCard disableLastChildPadding>
            <Typography variant="h6" sx={{ mb: 2 }}>Activity Timeline</Typography>
            <List>
              {profileTimeline.map((event) => (
                <ListItem key={event.id} divider>
                  <ListItemText primary={event.title} secondary={event.time} />
                </ListItem>
              ))}
            </List>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
}