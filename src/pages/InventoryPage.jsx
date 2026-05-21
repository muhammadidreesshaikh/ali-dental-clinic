import React, { useMemo } from 'react';
import { inventoryConfig } from '../data/appData';
import { CrudEntityPage } from '../components/CrudEntityPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export function InventoryPage() {
  const dashboardTheme = useMemo(() => createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: { borderRadius: 10 },
          notchedOutline: { borderRadius: 10 },
        },
      },
      MuiInputBase: {
        styleOverrides: { root: { borderRadius: 10 } },
      },
    },
  }), []);

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CrudEntityPage config={inventoryConfig} />
    </ThemeProvider>
  );
}