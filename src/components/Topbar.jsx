import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Brightness4Rounded,
  Brightness7Rounded,
  MenuRounded,
  NotificationsRounded,
  LogoutRounded,
  PersonRounded,
  SettingsRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useThemeMode } from '../context/ThemeModeContext';
import { useNavigate } from 'react-router-dom';

export function Topbar({ onMenuClick, collapsed, onToggleCollapse }) {
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useThemeMode();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: 'blur(18px)',
        background: (theme) => `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.paper} 100%)`,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ minHeight: 80, gap: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flex: 1 }}>
          <IconButton onClick={onMenuClick} sx={{ display: { md: 'none' } }}>
            <MenuRounded />
          </IconButton>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 3,
              bgcolor: 'primary.main',
              color: 'common.white',
              display: 'grid',
              placeItems: 'center',
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              D
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" color="text.primary" sx={{ fontWeight: 900, lineHeight: 1, marginBottom: "3px"}}>
              Daniyal Pharmacy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Modern pharmacy management suite
            </Typography>
          </Box>
        </Stack>

        <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton onClick={toggleMode}>
            {mode === 'dark' ? <Brightness7Rounded /> : <Brightness4Rounded />}
          </IconButton>
        </Tooltip>
        <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          <IconButton sx={{ display: { xs: 'none', md: 'inline-flex' } }} onClick={onToggleCollapse}>
            {collapsed ? <ChevronRightRounded /> : <ChevronLeftRounded />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton>
            <Badge color="secondary" variant="dot">
              <NotificationsRounded />
            </Badge>
          </IconButton>
        </Tooltip>
        <Button
          onClick={(event) => setAnchorEl(event.currentTarget)}
          sx={{ textTransform: 'none', borderRadius: 999, px: 1.5 }}
          startIcon={
            <Badge overlap="circular" variant="dot" color="success" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main' }}>{user?.avatar || 'DP'}</Avatar>
            </Badge>
          }
        >
          <Stack spacing={0} alignItems="flex-start">
            <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
              {user?.name || 'Daniyal User'}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.1 }}>
              {user?.role || 'Admin'} • Online
            </Typography>
          </Stack>
        </Button>

        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => { setAnchorEl(null); navigate('/profile'); }}>
            <PersonRounded fontSize="small" sx={{ mr: 1 }} /> Profile
          </MenuItem>
          <MenuItem onClick={() => { setAnchorEl(null); navigate('/settings'); }}>
            <SettingsRounded fontSize="small" sx={{ mr: 1 }} /> Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutRounded fontSize="small" sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}