import React from 'react';
import { Card, CardContent } from '@mui/material';

export function GlassCard({ children, sx, contentSx, disableLastChildPadding = false, ...props }) {
  return (
    <Card
      {...props}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 5,
        backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,0.88), rgba(255,255,255,0.58))',
        boxShadow: '0 12px 35px rgba(16,24,40,0.10)',
        transition: 'transform 220ms ease, box-shadow 220ms ease',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 40px rgba(16,24,40,0.16)' },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at top right, rgba(16,185,129,0.16), transparent 32%), radial-gradient(circle at bottom left, rgba(6,182,212,0.14), transparent 28%)',
          pointerEvents: 'none',
        },
        ...sx,
      }}
    >
      <CardContent
        sx={{
          position: 'relative',
          zIndex: 1,
          ...(disableLastChildPadding ? {} : { '&:last-child': { paddingBottom: 0 } }),
          ...contentSx,
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}