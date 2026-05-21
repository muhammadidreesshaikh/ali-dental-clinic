import React from 'react';
import { Box, Grid, Skeleton, Stack } from '@mui/material';

export function LoadingState({ rows = 4 }) {
  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid item xs={12} sm={6} xl={3} key={index}>
            <Skeleton variant="rounded" height={150} />
          </Grid>
        ))}
      </Grid>
      <Skeleton variant="rounded" height={440} />
      <Box sx={{ display: 'grid', gap: 2 }}>
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={72} />
        ))}
      </Box>
    </Stack>
  );
}