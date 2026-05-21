import React from 'react';
import { Breadcrumbs, Button, Stack, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function PageHeader({ title, subtitle, actionLabel, onAction, breadcrumbs = [] }) {
  return (
    <Stack spacing={1.5} sx={{ mb: 3 }}>
      {breadcrumbs.length ? (
        <Breadcrumbs sx={{ color: 'text.secondary' }}>
          {breadcrumbs.map((crumb, index) =>
            crumb.to ? (
              <MuiLink key={crumb.label} component={RouterLink} underline="hover" color="inherit" to={crumb.to}>
                {crumb.label}
              </MuiLink>
            ) : (
              <Typography key={crumb.label} color={index === breadcrumbs.length - 1 ? 'text.primary' : 'text.secondary'}>
                {crumb.label}
              </Typography>
            ),
          )}
        </Breadcrumbs>
      ) : null}
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant="h4">{title}</Typography>
          <Typography color="text.secondary">{subtitle}</Typography>
        </Stack>
        {actionLabel ? (
          <Button
            variant="contained"
            size="large"
            onClick={onAction}
            sx={{
              bgcolor: '#10b981',
              '&:hover': {
                bgcolor: '#059669',
              },
            }}
          >
            {actionLabel}
          </Button>
        ) : null}
      </Stack>
    </Stack>
  );
}