import React from 'react';
import { Chip } from '@mui/material';

const palette = {
  paid: 'success',
  approved: 'success',
  received: 'success',
  healthy: 'success',
  instock: 'success',
  pending: 'warning',
  low: 'warning',
  outofstock: 'error',
  expired: 'error',
  refunded: 'info',
};

export function StatusChip({ value }) {
  const normalized = String(value || '')
    .replace(/[^a-z]/gi, '')
    .toLowerCase();
  const color = palette[normalized] || 'default';

  return <Chip size="small" label={value} color={color} variant={color === 'default' ? 'outlined' : 'filled'} />;
}