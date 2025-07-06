// src/layouts/full/vertical/sidebar/Sidebar.tsx
import { useMediaQuery, Box, Drawer, useTheme } from '@mui/material';
import SidebarItems from './SidebarItems';
import Logo from '../../shared/logo/Logo';
import { useSelector, useDispatch } from 'src/store/Store';
import { hoverSidebar, toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { Profile } from './SidebarProfile/Profile';
import { AppState } from 'src/store/Store';

const Sidebar = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();
  const theme = useTheme();
  const toggleWidth =
    customizer.isCollapse && !customizer.isSidebarHover
      ? customizer.MiniSidebarWidth
      : customizer.SidebarWidth;

  const onHoverEnter = () => {
    if (customizer.isCollapse) {
      dispatch(hoverSidebar(true));
    }
  };

  const onHoverLeave = () => {
    dispatch(hoverSidebar(false));
  };

  if (lgUp) {
    return (
      <Box
        sx={{
          width: toggleWidth,
          flexShrink: 0,
          ...(customizer.isCollapse && {
            position: 'absolute',
          }),
        }}
      >
        <Drawer
          anchor="left"
          open
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          variant="permanent"
          PaperProps={{
            sx: {
              transition: theme.transitions.create('width', {
                duration: theme.transitions.duration.shortest,
              }),
              width: toggleWidth,
              boxSizing: 'border-box',
              borderRight: `1px solid ${theme.palette.divider}`,
              height: '100vh', // طول الصفحة بالكامل
              overflow: 'hidden', // منع الـ scroll للـ sidebar نفسه
            },
          }}
        >
          <Box
            sx={{
              height: '100vh', // طول الصفحة بالكامل
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden', // منع الـ scroll
            }}
          >
            {/* Logo Section - ثابت في الأعلى */}
            <Box 
              sx={{ 
                px: 3, 
                py: 2,
                flexShrink: 0, // لا يتقلص
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Logo />
            </Box>
            
            {/* Menu Items Section - قابل للتمرير */}
            <Box
              sx={{
                flex: 1, // يأخذ المساحة المتبقية
                overflow: 'hidden', // منع الـ overflow
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Scrollbar 
                sx={{ 
                  flex: 1,
                  '& .simplebar-content': {
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }
                }}
              >
                <SidebarItems />
              </Scrollbar>
            </Box>
            
            {/* Profile Section - ثابت في الأسفل */}
            <Box
              sx={{
                flexShrink: 0, // لا يتقلص
                borderTop: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Profile />
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  // Mobile Sidebar
  return (
    <Drawer
      anchor="left"
      open={customizer.isMobileSidebar}
      onClose={() => dispatch(toggleMobileSidebar())}
      variant="temporary"
      PaperProps={{
        sx: {
          width: customizer.SidebarWidth,
          border: '0 !important',
          boxShadow: (theme) => theme.shadows[8],
          height: '100vh', // طول الصفحة بالكامل للموبايل
          overflow: 'hidden', // منع الـ scroll للـ sidebar نفسه
        },
      }}
    >
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Logo Section - Mobile */}
        <Box 
          sx={{ 
            px: 2, 
            py: 2,
            flexShrink: 0,
            borderBottom: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Logo />
        </Box>
        
        {/* Menu Items Section - Mobile */}
        <Box
          sx={{
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Scrollbar 
            sx={{ 
              flex: 1,
              '& .simplebar-content': {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }
            }}
          >
            <SidebarItems />
          </Scrollbar>
        </Box>
        
        {/* Profile Section - Mobile */}
        <Box
          sx={{
            flexShrink: 0,
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Profile />
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
