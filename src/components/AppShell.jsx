import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, collapsedWidth, drawerWidth } from './Sidebar';
import { Topbar } from './Topbar';

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        collapsed={collapsed}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Topbar onMenuClick={() => setMobileOpen(true)} collapsed={collapsed} onToggleCollapse={() => setCollapsed((value) => !value)} />
        <Box
          component="main"
          sx={{
            flex: 1,
            minHeight: 'calc(100vh - 80px)',
            p: { xs: 2, md: 3 },
            ml: { md: 0 },
          }}
        >
          <Container maxWidth={false} disableGutters>
            <Outlet key={location.pathname} />
          </Container>
        </Box>
      </Box>
    </Box>
  );
}