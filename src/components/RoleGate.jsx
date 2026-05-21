import React from 'react';
import { useAuth } from '../context/AuthContext';

export function RoleGate({ allowedRoles = [], children, fallback = null }) {
  const { user } = useAuth();

  if (!allowedRoles.length) {
    return children;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return fallback;
  }

  return children;
}