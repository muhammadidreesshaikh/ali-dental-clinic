import React, { useMemo } from 'react';
import { purchasesConfig } from '../data/appData';
import { CrudEntityPage } from '../components/CrudEntityPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export function PurchasesPage() {
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
      <CrudEntityPage config={purchasesConfig} />
    </ThemeProvider>
  );
}