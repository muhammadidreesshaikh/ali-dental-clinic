import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

export function EmptyState({ title = 'No data yet', description = 'Add your first item to get started.', actionLabel, onAction }) {
  return (
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Stack spacing={2} alignItems="center">
        <Box
          sx={{
            width: 84,
            height: 84,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'action.hover',
          }}
        >
          <Typography variant="h4">+</Typography>
        </Box>
        <Typography variant="h6">{title}</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 460 }}>
          {description}
        </Typography>
        {actionLabel ? <Button variant="contained" onClick={onAction}>{actionLabel}</Button> : null}
      </Stack>
    </Box>
  );
}