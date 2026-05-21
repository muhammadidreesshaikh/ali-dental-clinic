import React, { createContext, useContext, useMemo, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const SnackbarContext = createContext(null);

export function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const api = useMemo(
    () => ({
      notify: (message, severity = 'success') => setSnackbar({ open: true, message, severity }),
      close: () => setSnackbar((current) => ({ ...current, open: false })),
    }),
    [],
  );

  return (
    <SnackbarContext.Provider value={api}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3200}
        onClose={api.close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={api.close} severity={snackbar.severity} variant="filled" sx={{ borderRadius: 3 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used inside SnackbarProvider');
  }
  return context;
}