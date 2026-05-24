import React from 'react';
import { Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigationItems } from '../data/appData';

const drawerWidth = 284;
const collapsedWidth = 96;

export function Sidebar({ mobileOpen, onMobileClose, collapsed, onCollapseToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  const content = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', py: 2 }}>
      {/* <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end', px: 1, pb: 1 }}>
        <IconButton onClick={onMobileClose} aria-label="Close sidebar">
          <CloseRounded />
        </IconButton>
      </Box> */}
      <Stack spacing={1.5} sx={{ px: collapsed ? 1.5 : 2.5, pb: 2 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(6,182,212,0.18))',
            textAlign: collapsed ? 'center' : 'left',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: collapsed ? 0 : '0.12em' }}>
            {collapsed ? 'D' : 'DANIYAL'}
          </Typography>
          {!collapsed ? <Typography color="text.secondary" sx={{fontSize: "14px"}}>Pharmacy Management</Typography> : null}
        </Box>
        {/* <Typography variant="caption" color="text.secondary" sx={{ px: 0.5 }}>
          {collapsed ? 'Menu' : 'Navigation11'}
        </Typography> */}
      </Stack>
      <Divider />
      <List sx={{ px: 1.5, py: 1, flex: 1 }}>
        {navigationItems.map((item) => {
          const active = location.pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <ListItemButton
              key={item.path}
              onClick={() => {
                navigate(item.path);
                onMobileClose?.();
              }}
              selected={active}
              sx={{
                my: 0.5,
                mx: 0.75,
                width: 'calc(100% - 12px)',
                borderRadius: 3,
                minHeight: 52,
                justifyContent: collapsed ? 'center' : 'flex-start',
                boxSizing: 'border-box',
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.16), rgba(6,182,212,0.14))',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40, color: active ? 'primary.main' : 'text.secondary' }}>
                <Icon />
              </ListItemIcon>
              {!collapsed ? <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 500 }} /> : null}
            </ListItemButton>
          );
        })}
      </List>
      {/* {!collapsed ? (
        <Box sx={{ px: 2.5, pb: 1 }}>
          <Box sx={{ p: 2, borderRadius: 4, background: 'linear-gradient(135deg, rgba(139,92,246,0.16), rgba(16,185,129,0.14))' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
              Premium pharmacy operations
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Inventory, billing and reporting in one place.
            </Typography>
          </Box>
        </Box>
      ) : null} */}
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: collapsed ? collapsedWidth : drawerWidth }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: { xs: 64, sm: 72 },
            height: { xs: 'calc(100% - 64px)', sm: 'calc(100% - 72px)' },
          },
        }}
      >
        {content}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: collapsed ? collapsedWidth : drawerWidth,
            boxSizing: 'border-box',
            borderRight: 0,
            transition: 'width 240ms ease',
          },
        }}
      >
        {content}
      </Drawer>
    </Box>
  );
}

export { drawerWidth, collapsedWidth };