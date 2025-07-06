// src/views/dashboard/Dashboard.tsx
import React from 'react';
import {
  Box,
  Grid2 as Grid,
  Typography,
  Stack,
  Button,
  useTheme,
  useMediaQuery} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconPlus,
  IconEye,
  IconShare,
  IconQrcode,
  IconAnalyze,
  IconUsers} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from './components/DashboardCard';
import StatsCard from './components/StatsCard';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import CardsOverview from './components/CardsOverview';

const Dashboard = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // بيانات وهمية للعرض
  const stats: {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: React.ElementType;
    color: string;
  }[] = [
    {
      title: t('dashboard.stats.totalViews'),
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: IconEye,
      color: theme.palette.primary.main
    },
    {
      title: t('dashboard.stats.totalShares'),
      value: '456',
      change: '+8.2%',
      trend: 'up',
      icon: IconShare,
      color: theme.palette.success.main
    },
    {
      title: t('dashboard.stats.qrScans'),
      value: '1,234',
      change: '+15.3%',
      trend: 'up',
      icon: IconQrcode,
      color: theme.palette.warning.main
    },
    {
      title: t('dashboard.stats.newContacts'),
      value: '89',
      change: '+5.7%',
      trend: 'up',
      icon: IconUsers,
      color: theme.palette.info.main
    }
  ];

  return (
    <PageContainer title={t('dashboard.title')} description={t('dashboard.description')}>
      <Box sx={{ pb: { xs: 2, md: 4 } }}>
        {/* Welcome Section */}
        <DashboardCard sx={{ mb: { xs: 2, md: 3 } }}>
          <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2}>
                <Box>
                  <Typography
                    variant={isMobile ? 'h5' : 'h4'}
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      mb: 1
                    }}
                  >
                    {t('dashboard.welcome.title')}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: { xs: '0.9rem', md: '1rem' }
                    }}
                  >
                    {t('dashboard.welcome.subtitle')}
                  </Typography>
                </Box>
                
                {/* Quick Actions - Mobile */}
                {isMobile && (
                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<IconPlus />}
                      size="small"
                      sx={{ borderRadius: 2 }}
                    >
                      {t('dashboard.actions.createCard')}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<IconAnalyze />}
                      size="small"
                      sx={{ borderRadius: 2 }}
                    >
                      {t('dashboard.actions.viewAnalytics')}
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Grid>
            
            {/* Desktop Actions */}
            {!isMobile && (
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    variant="contained"
                    startIcon={<IconPlus />}
                    sx={{ borderRadius: 2, px: 3 }}
                  >
                    {t('dashboard.actions.createCard')}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IconAnalyze />}
                    sx={{ borderRadius: 2, px: 3 }}
                  >
                    {t('dashboard.actions.viewAnalytics')}
                  </Button>
                </Stack>
              </Grid>
            )}
          </Grid>
        </DashboardCard>

        {/* Stats Cards */}
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 2, md: 3 } }}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={index}>
              <StatsCard
                title={stat.title}
                value={stat.value}
                change={stat.change}
                trend={stat.trend}
                icon={stat.icon}
                color={stat.color}
                isMobile={isMobile}
              />
            </Grid>
          ))}
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Cards Overview */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <CardsOverview isMobile={isMobile} />
          </Grid>
          
          {/* Quick Actions & Recent Activity */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <QuickActions isMobile={isMobile} />
              <RecentActivity isMobile={isMobile} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
