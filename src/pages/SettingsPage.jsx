import React, { useState } from 'react';
import { Box, Divider, FormControlLabel, Grid, List, ListItem, ListItemText, Stack, Switch, Typography } from '@mui/material';
import { PageHeader } from '../components/PageHeader';
import { GlassCard } from '../components/GlassCard';
import { settingsSections } from '../data/appData';
import { useThemeMode } from '../context/ThemeModeContext';
import { RoleGate } from '../components/RoleGate';

export function SettingsPage() {
  const { mode, toggleMode } = useThemeMode();
  const [notifications, setNotifications] = useState(true);

  return (
    <Box>
      <PageHeader
        title="Settings"
        subtitle="Manage system behavior, pharmacy details, security and notifications."
        breadcrumbs={[{ label: 'Home', to: '/dashboard' }, { label: 'Settings' }]}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} xl={4}>
          <GlassCard>
            <Stack spacing={2}>
              <Typography variant="h6">System Preferences</Typography>
              <FormControlLabel control={<Switch checked={mode === 'dark'} onChange={toggleMode} />} label="Dark Mode" />
              <FormControlLabel control={<Switch checked={notifications} onChange={(_, checked) => setNotifications(checked)} />} label="Notifications" />
              <FormControlLabel control={<Switch defaultChecked />} label="Security Alerts" />
            </Stack>
          </GlassCard>
        </Grid>
        <Grid item xs={12} xl={4}>
          <RoleGate
            allowedRoles={['Super Admin']}
            fallback={
              <GlassCard sx={{ minHeight: '100%' }}>
                <Stack spacing={1.5}>
                  <Typography variant="h6">Security Settings</Typography>
                  <Typography color="text.secondary">
                    Advanced security controls are available to Super Admin only.
                  </Typography>
                </Stack>
              </GlassCard>
            }
          >
            <GlassCard sx={{ minHeight: '100%' }}>
              <Stack spacing={2}>
                <Typography variant="h6">Security Settings</Typography>
                <FormControlLabel control={<Switch defaultChecked />} label="Require OTP for sensitive actions" />
                <FormControlLabel control={<Switch defaultChecked />} label="Force strong password policy" />
                <FormControlLabel control={<Switch />} label="Restrict settings by role" />
              </Stack>
            </GlassCard>
          </RoleGate>
        </Grid>
        <Grid item xs={12} xl={8}>
          <GlassCard>
            <Stack spacing={1.5}>
              <Typography variant="h6">Settings Modules</Typography>
              <Divider />
              <List>
                {settingsSections.map((section) => (
                  <ListItem key={section} divider>
                    <ListItemText primary={section} secondary="Configured for role-based administration and scalable growth." />
                  </ListItem>
                ))}
              </List>
            </Stack>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
}