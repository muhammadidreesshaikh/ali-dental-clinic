import React, { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { createAppTheme } from './theme';
import { useThemeMode } from './context/ThemeModeContext';
import { useAuth } from './context/AuthContext';
import { AppShell } from './components/AppShell';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { MedicinesPage } from './pages/MedicinesPage';
import { InventoryPage } from './pages/InventoryPage';
import { SalesPosPage } from './pages/SalesPosPage';
import { PurchasesPage } from './pages/PurchasesPage';
import { SuppliersPage } from './pages/SuppliersPage';
import { CustomersPage } from './pages/CustomersPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={(muiTheme) => ({
          html: { height: '100%' },
          body: {
            height: '100%',
            background:
              muiTheme.palette.mode === 'dark'
                ? 'radial-gradient(circle at top, rgba(16,185,129,0.18), transparent 28%), linear-gradient(180deg, #06111a 0%, #081826 100%)'
                : 'radial-gradient(circle at top, rgba(16,185,129,0.18), transparent 28%), linear-gradient(180deg, #eefbf7 0%, #f7fbfd 48%, #eef7ff 100%)',
            backgroundAttachment: 'fixed',
          },
          '#root': { minHeight: '100%' },
          '*': { boxSizing: 'border-box' },
          a: { color: 'inherit', textDecoration: 'none' },
        })}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="medicines" element={<MedicinesPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="sales-pos" element={<SalesPosPage />} />
            <Route path="purchases" element={<PurchasesPage />} />
            <Route path="suppliers" element={<SuppliersPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage authenticated={isAuthenticated} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}