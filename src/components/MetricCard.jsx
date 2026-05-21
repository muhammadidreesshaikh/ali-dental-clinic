import React from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { GlassCard } from './GlassCard';

export function MetricCard({ label, value, change, icon: Icon, gradient }) {
  return (
    <GlassCard
      sx={{
        color: '#fff',
        backgroundImage: `${gradient}, linear-gradient(145deg, rgba(255,255,255,0.8), rgba(255,255,255,0.45))`,
        minHeight: 160,
      }}
      contentSx={{ color: 'inherit' }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Box>
          <Typography variant="body2" sx={{ opacity: 0.88, fontWeight: 700 }}>
            {label}
          </Typography>
          <Typography variant="h4" sx={{ mt: 1, fontWeight: 800 }}>
            {value}
          </Typography>
          <Chip
            label={change}
            size="small"
            sx={{ mt: 1.5, bgcolor: 'rgba(255,255,255,0.18)', color: '#fff', fontWeight: 800 }}
          />
        </Box>
        <Box
          sx={{
            width: 60,
            height: 60,
            display: 'grid',
            placeItems: 'center',
            borderRadius: 3,
            backgroundColor: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(10px)',
            transition: 'transform 220ms ease',
            '&:hover': { transform: 'rotate(8deg) scale(1.05)' },
          }}
        >
          {Icon ? <Icon fontSize="large" /> : null}
        </Box>
      </Stack>
    </GlassCard>
  );
}