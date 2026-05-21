import { alpha, createTheme } from '@mui/material/styles';

export const pharmacyPalette = {
  emerald: '#10b981',
  emeraldDeep: '#059669',
  cyan: '#06b6d4',
  cyanDeep: '#0891b2',
  purple: '#8b5cf6',
  purpleDeep: '#6d28d9',
  gold: '#f59e0b',
  red: '#ef4444',
  slate: '#0f172a',
};

export const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: pharmacyPalette.emerald,
        dark: pharmacyPalette.emeraldDeep,
        light: '#34d399',
        contrastText: '#ffffff',
      },
      secondary: {
        main: pharmacyPalette.cyan,
        dark: pharmacyPalette.cyanDeep,
        light: '#67e8f9',
        contrastText: '#ffffff',
      },
      error: { main: pharmacyPalette.red },
      warning: { main: pharmacyPalette.gold },
      info: { main: pharmacyPalette.cyan },
      success: { main: pharmacyPalette.emerald },
      background: {
        default: mode === 'dark' ? '#06111a' : '#f4fbf8',
        paper: mode === 'dark' ? 'rgba(7, 18, 29, 0.78)' : 'rgba(255,255,255,0.82)',
      },
      text: {
        primary: mode === 'dark' ? '#e5f3ef' : '#102033',
        secondary: mode === 'dark' ? '#9db1c1' : '#527087',
      },
    },
    shape: {
      borderRadius: 3,
    },
    typography: {
      fontFamily: 'Roboto, Segoe UI, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.04em' },
      h2: { fontWeight: 800, letterSpacing: '-0.04em' },
      h3: { fontWeight: 700, letterSpacing: '-0.03em' },
      h4: { fontWeight: 700, letterSpacing: '-0.02em' },
      h5: { fontWeight: 700, letterSpacing: '-0.02em' },
      h6: { fontWeight: 700 },
      button: { fontWeight: 700, textTransform: 'none' },
    },
    shadows: [
      'none',
      '0 2px 8px rgba(8,15,25,0.06)',
      '0 6px 16px rgba(8,15,25,0.08)',
      '0 10px 30px rgba(8,15,25,0.12)',
      '0 14px 40px rgba(8,15,25,0.16)',
      ...Array(20).fill('0 20px 50px rgba(8,15,25,0.18)'),
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            colorScheme: mode,
          },
          body: {
            transition: 'background 300ms ease, color 300ms ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: 'none',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.08 : 0.55)}`,
            boxShadow: theme.shadows[3],
          }),
        },
      },
      MuiButton: {
        defaultProps: {
          color: 'primary',
        },
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 18,
            transition: 'transform 180ms ease, box-shadow 180ms ease, background 180ms ease',
          },
          containedPrimary: ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }),
          outlinedPrimary: ({ theme }) => ({
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              borderColor: theme.palette.primary.dark,
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 24,
            backgroundImage:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg, rgba(15,23,42,0.92), rgba(8,18,29,0.88))'
                : 'linear-gradient(180deg, rgba(255,255,255,0.88), rgba(244,251,255,0.84))',
          }),
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: 'none',
            background: 'transparent',
            '& .MuiDataGrid-columnHeaders': {
              borderRadius: 16,
              background: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.12 : 0.08),
            },
            '& .MuiDataGrid-cell': {
              borderColor: alpha(theme.palette.divider, 0.35),
            },
            '& .MuiDataGrid-row:hover': {
              background: alpha(theme.palette.primary.main, 0.06),
            },
          }),
        },
      },
    },
  });