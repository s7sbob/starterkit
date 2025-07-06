// src/views/homepage/components/HomepageHeader.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  styled
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { 
  IconMenu2, 
  IconMoon, 
  IconSun,
  IconUserPlus,
  IconLogin
} from '@tabler/icons-react';
import { useSelector, useDispatch } from 'src/store/Store';
import { setDarkMode } from 'src/store/customizer/CustomizerSlice';
import { AppState } from 'src/store/Store';
import Logo from 'src/layouts/full/shared/logo/Logo';
import Language from 'src/layouts/full/vertical/header/Language'; // استيراد مكون اللغة الأصلي

const HomepageHeader = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { labelKey: 'header.home', href: '#home' },
    { labelKey: 'header.features', href: '#features' },
    { labelKey: 'header.howItWorks', href: '#how-it-works' },
    { labelKey: 'header.pricing', href: '#pricing' },
    { labelKey: 'header.support', href: '#support' }
  ];

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    borderBottom: `1px solid ${theme.palette.divider}`,
    minHeight: customizer.TopbarHeight,
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
    padding: '0 !important'
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <Container maxWidth="lg">
        <ToolbarStyled>
          {/* Logo */}
          <Logo />
          
          {/* Navigation Items - Desktop */}
          {lgUp && (
            <Box sx={{ ml: 4, display: 'flex', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  color="inherit"
                  href={item.href}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.main
                    }
                  }}
                >
                  {t(item.labelKey)}
                </Button>
              ))}
            </Box>
          )}

          <Box flexGrow={1} />

          {/* Right Side Actions */}
          <Stack spacing={1} direction="row" alignItems="center">
            {/* Language Selector - استخدام المكون الأصلي */}
            <Language />

            {/* Dark Mode Toggle */}
            <IconButton 
              size="large" 
              color="inherit"
              onClick={() => dispatch(setDarkMode(customizer.activeMode === 'light' ? 'dark' : 'light'))}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.primary.light
                }
              }}
            >
              {customizer.activeMode === 'light' ? (
                <IconMoon size="20" />
              ) : (
                <IconSun size="20" />
              )}
            </IconButton>

            {/* Desktop Auth Buttons */}
            {lgUp && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<IconLogin size="18" />}
                  href="/auth/login"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    borderColor: theme.palette.divider,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: theme.palette.primary.light
                    }
                  }}
                >
                  {t('header.login')}
                </Button>
                
                <Button
                  variant="contained"
                  startIcon={<IconUserPlus size="18" />}
                  href="/auth/register"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark
                    }
                  }}
                >
                  {t('header.signup')}
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            {lgDown && (
              <IconButton
                onClick={handleMenu}
                color="inherit"
                size="large"
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light
                  }
                }}
              >
                <IconMenu2 size="20" />
              </IconButton>
            )}
          </Stack>

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: '250px',
                mt: 1
              }
            }}
          >
            {navItems.map((item) => (
              <MenuItem 
                key={item.href} 
                onClick={handleClose}
                component="a"
                href={item.href}
              >
                {t(item.labelKey)}
              </MenuItem>
            ))}
            <Box sx={{ borderTop: 1, borderColor: 'divider', mt: 1, pt: 1 }}>
              <MenuItem 
                onClick={handleClose}
                component="a"
                href="/auth/login"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1 
                }}
              >
                <IconLogin size="18" />
                {t('header.login')}
              </MenuItem>
              <MenuItem 
                onClick={handleClose}
                component="a"
                href="/auth/register"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: theme.palette.primary.main
                }}
              >
                <IconUserPlus size="18" />
                {t('header.signup')}
              </MenuItem>
            </Box>
          </Menu>
        </ToolbarStyled>
      </Container>
    </AppBarStyled>
  );
};

export default HomepageHeader;
