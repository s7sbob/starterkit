// src/layouts/full/vertical/header/Profile.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  Stack,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import {
  IconMail,
  IconUser,
  IconSettings,
  IconBell,
  IconCrown,
  IconHelp,
  IconLogout,
  IconChevronDown
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    // إضافة منطق تسجيل الخروج هنا
    localStorage.removeItem('token');
    navigate('/auth/login');
    handleClose2();
  };

  const profileMenuItems = [
    {
      title: t('header.profile.myProfile'),
      subtitle: t('header.profile.accountSettings'),
      icon: IconUser,
      href: '/dashboard/profile',
      color: 'primary'
    },
    {
      title: t('header.profile.settings'),
      subtitle: t('header.profile.preferences'),
      icon: IconSettings,
      href: '/dashboard/settings',
      color: 'secondary'
    },
    {
      title: t('header.profile.notifications'),
      subtitle: t('header.profile.alerts'),
      icon: IconBell,
      href: '/dashboard/notifications',
      color: 'warning',
      chip: '3'
    },
    {
      title: t('header.profile.subscription'),
      subtitle: t('header.profile.billing'),
      icon: IconCrown,
      href: '/dashboard/subscription',
      color: 'info',
      chip: t('header.profile.upgrade')
    },
    {
      title: t('header.profile.help'),
      subtitle: t('header.profile.support'),
      icon: IconHelp,
      href: '/dashboard/help',
      color: 'success'
    }
  ];

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show profile menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
          '&:hover': {
            backgroundColor: 'primary.light',
          }
        }}
        onClick={handleClick2}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            src={ProfileImg}
            alt="Profile"
            sx={{
              width: 35,
              height: 35,
            }}
          />
          <IconChevronDown size={16} />
        </Stack>
      </IconButton>
      
      {/* ------------------------------------------- */}
      {/* Profile Dropdown Menu */}
      {/* ------------------------------------------- */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '320px',
            borderRadius: 3,
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        {/* Profile Header */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
            {t('header.profile.userProfile')}
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar 
              src={ProfileImg} 
              alt="Profile" 
              sx={{ width: 60, height: 60 }} 
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                أحمد محمد
              </Typography>
              <Typography variant="body2" color="text.secondary">
                مطور تطبيقات
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                <IconMail size={14} />
                <Typography variant="caption" color="text.secondary">
                  ahmed@example.com
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
        
        <Divider />
        
        {/* Profile Menu Items */}
        <Box sx={{ py: 1 }}>
          {profileMenuItems.map((item, index) => (
            <MenuItem
              key={index}
              component={Link}
              to={item.href}
              onClick={handleClose2}
              sx={{
                py: 1.5,
                px: 3,
                '&:hover': {
                  backgroundColor: 'primary.light',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    backgroundColor: `${item.color}.light`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <item.icon size={18} color={`${item.color}.main`} />
                </Box>
              </ListItemIcon>
              
              <ListItemText
                primary={
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2" fontWeight={600}>
                      {item.title}
                    </Typography>
                    {item.chip && (
                      <Chip
                        label={item.chip}
                        size="small"
                        color={item.color as any}
                        sx={{ height: 20, fontSize: '0.7rem' }}
                      />
                    )}
                  </Stack>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {item.subtitle}
                  </Typography>
                }
              />
            </MenuItem>
          ))}
        </Box>
        
        <Divider />
        
        {/* Logout */}
        <Box sx={{ p: 2 }}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<IconLogout size={18} />}
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              py: 1,
            }}
          >
            {t('header.profile.logout')}
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
