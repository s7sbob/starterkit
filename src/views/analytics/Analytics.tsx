// src/views/analytics/Analytics.tsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid2 as Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconTrendingUp,
  IconEye,
  IconShare,
  IconQrcode,
  IconUsers,
  IconCalendar,
  IconMapPin,
  IconDeviceMobile,
  IconDeviceDesktop,
  IconDownload,
  IconFilter
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../dashboard/components/DashboardCard';
import StatsCard from '../dashboard/components/StatsCard';

const Analytics = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedCard, setSelectedCard] = useState('all');
  const [timeRange, setTimeRange] = useState('30d');

  // بيانات وهمية للإحصائيات
  const stats: {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: React.ElementType;
    color: string;
  }[] = [
    {
      title: t('analytics.totalViews'),
      value: '12,847',
      change: '+23.5%',
      trend: 'up',
      icon: IconEye,
      color: theme.palette.primary.main
    },
    {
      title: t('analytics.totalShares'),
      value: '3,456',
      change: '+18.2%',
      trend: 'up',
      icon: IconShare,
      color: theme.palette.success.main
    },
    {
      title: t('analytics.qrScans'),
      value: '8,234',
      change: '+31.7%',
      trend: 'up',
      icon: IconQrcode,
      color: theme.palette.warning.main
    },
    {
      title: t('analytics.newContacts'),
      value: '1,892',
      change: '+12.4%',
      trend: 'up',
      icon: IconUsers,
      color: theme.palette.info.main
    }
  ];

  const topCards = [
    {
      id: 1,
      name: 'بطاقة العمل الرئيسية',
      avatar: '/images/avatars/user1.jpg',
      views: 4567,
      shares: 234,
      engagement: 85
    },
    {
      id: 2,
      name: 'بطاقة المشاريع',
      avatar: '/images/avatars/user2.jpg',
      views: 3421,
      shares: 189,
      engagement: 78
    },
    {
      id: 3,
      name: 'بطاقة شخصية',
      avatar: '/images/avatars/user3.jpg',
      views: 2156,
      shares: 98,
      engagement: 65
    }
  ];

  const deviceStats = [
    { device: t('analytics.mobile'), percentage: 68, color: theme.palette.primary.main },
    { device: t('analytics.desktop'), percentage: 24, color: theme.palette.secondary.main },
    { device: t('analytics.tablet'), percentage: 8, color: theme.palette.warning.main }
  ];

  const locationStats = [
    { country: 'السعودية', views: 5234, flag: '🇸🇦' },
    { country: 'الإمارات', views: 2156, flag: '🇦🇪' },
    { country: 'مصر', views: 1789, flag: '🇪🇬' },
    { country: 'الكويت', views: 987, flag: '🇰🇼' },
    { country: 'قطر', views: 654, flag: '🇶🇦' }
  ];

  const recentActivity = [
    {
      type: 'view',
      message: t('analytics.activity.cardViewed'),
      card: 'بطاقة العمل الرئيسية',
      time: '5 دقائق',
      location: 'الرياض، السعودية'
    },
    {
      type: 'share',
      message: t('analytics.activity.cardShared'),
      card: 'بطاقة المشاريع',
      time: '12 دقيقة',
      location: 'دبي، الإمارات'
    },
    {
      type: 'qr',
      message: t('analytics.activity.qrScanned'),
      card: 'بطاقة شخصية',
      time: '25 دقيقة',
      location: 'القاهرة، مصر'
    },
    {
      type: 'contact',
      message: t('analytics.activity.contactAdded'),
      card: 'بطاقة العمل الرئيسية',
      time: '1 ساعة',
      location: 'الكويت، الكويت'
    }
  ];

  return (
    <PageContainer title={t('analytics.title')} description={t('analytics.description')}>
      <Container maxWidth="xl">
        {/* Header */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', md: 'center' }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary
            }}
          >
            {t('analytics.title')}
          </Typography>

          <Stack direction="row" spacing={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>{t('analytics.card')}</InputLabel>
              <Select
                value={selectedCard}
                label={t('analytics.card')}
                onChange={(e) => setSelectedCard(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">{t('analytics.allCards')}</MenuItem>
                <MenuItem value="1">بطاقة العمل الرئيسية</MenuItem>
                <MenuItem value="2">بطاقة المشاريع</MenuItem>
                <MenuItem value="3">بطاقة شخصية</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>{t('analytics.period')}</InputLabel>
              <Select
                value={timeRange}
                label={t('analytics.period')}
                onChange={(e) => setTimeRange(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="7d">{t('analytics.last7Days')}</MenuItem>
                <MenuItem value="30d">{t('analytics.last30Days')}</MenuItem>
                <MenuItem value="90d">{t('analytics.last90Days')}</MenuItem>
                <MenuItem value="1y">{t('analytics.lastYear')}</MenuItem>
              </Select>
            </FormControl>

            {!isMobile && (
              <Button
                variant="outlined"
                startIcon={<IconDownload />}
                sx={{ borderRadius: 2 }}
              >
                {t('analytics.exportReport')}
              </Button>
            )}
          </Stack>
        </Stack>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
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

        <Grid container spacing={3}>
          {/* Performance Chart */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <DashboardCard>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={3}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight={600}>
                      {t('analytics.performanceOverview')}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label={t('analytics.views')} size="small" color="primary" />
                      <Chip label={t('analytics.shares')} size="small" color="secondary" />
                      <Chip label={t('analytics.scans')} size="small" color="warning" />
                    </Stack>
                  </Stack>

                  {/* Chart Placeholder */}
                  <Box
                    sx={{
                      height: 300,
                      backgroundColor: theme.palette.grey[50],
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px dashed ${theme.palette.divider}`
                    }}
                  >
                    <Stack alignItems="center" spacing={2}>
                      <IconTrendingUp size={48} color={theme.palette.text.secondary} />
                      <Typography variant="body2" color="text.secondary">
                        {t('analytics.chartPlaceholder')}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </DashboardCard>
          </Grid>

          {/* Top Performing Cards */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <DashboardCard>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={3}>
                  <Typography variant="h6" fontWeight={600}>
                    {t('analytics.topCards')}
                  </Typography>

                  <Stack spacing={2}>
                    {topCards.map((card, _index) => (
                      <Card
                        key={card.id}
                        sx={{
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: 2
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Stack spacing={2}>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Avatar src={card.avatar} sx={{ width: 40, height: 40 }} />
                              <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={600}
                                  sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  {card.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {card.views} {t('analytics.views')} • {card.shares} {t('analytics.shares')}
                                </Typography>
                              </Stack>
                              <Chip
                                label={`${card.engagement}%`}
                                size="small"
                                color={card.engagement > 80 ? 'success' : card.engagement > 60 ? 'warning' : 'default'}
                              />
                            </Stack>

                            <LinearProgress
                              variant="determinate"
                              value={card.engagement}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: theme.palette.grey[200],
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: card.engagement > 80 
                                    ? theme.palette.success.main 
                                    : card.engagement > 60 
                                    ? theme.palette.warning.main 
                                    : theme.palette.grey[400]
                                }
                              }}
                            />
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </DashboardCard>
          </Grid>

          {/* Device Analytics */}
          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={3}>
                  <Typography variant="h6" fontWeight={600}>
                    {t('analytics.deviceBreakdown')}
                  </Typography>

                  <Stack spacing={2}>
                    {deviceStats.map((device, index) => (
                      <Stack key={index} spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Stack direction="row" spacing={1} alignItems="center">
                            {device.device === t('analytics.mobile') ? (
                              <IconDeviceMobile size={20} color={device.color} />
                            ) : (
                              <IconDeviceDesktop size={20} color={device.color} />
                            )}
                            <Typography variant="body2" fontWeight={500}>
                              {device.device}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" fontWeight={600}>
                            {device.percentage}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={device.percentage}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: theme.palette.grey[200],
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: device.color
                            }
                          }}
                        />
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </DashboardCard>
          </Grid>

          {/* Geographic Analytics */}
          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={3}>
                  <Typography variant="h6" fontWeight={600}>
                    {t('analytics.topLocations')}
                  </Typography>

                  <List sx={{ p: 0 }}>
                    {locationStats.map((location, index) => (
                      <React.Fragment key={index}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'transparent', fontSize: '1.5rem' }}>
                              {location.flag}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={location.country}
                            secondary={`${location.views} ${t('analytics.views')}`}
                          />
                          <Typography variant="body2" fontWeight={600}>
                            {Math.round((location.views / 10000) * 100)}%
                          </Typography>
                        </ListItem>
                        {index < locationStats.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </Stack>
              </CardContent>
            </DashboardCard>
          </Grid>

          {/* Recent Activity */}
          <Grid size={{ xs: 12 }}>
            <DashboardCard>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={3}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight={600}>
                      {t('analytics.recentActivity')}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<IconFilter />}
                      sx={{ borderRadius: 2 }}
                    >
                      {t('analytics.filter')}
                    </Button>
                  </Stack>

                  <Stack spacing={2}>
                    {recentActivity.map((activity, index) => (
                      <Card
                        key={index}
                        sx={{
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: 2,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            boxShadow: theme.shadows[2]
                          }
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid size={{ xs: 1 }}>
                              <Avatar
                                sx={{
                                  width: 40,
                                  height: 40,
                                  backgroundColor: `${
                                    activity.type === 'view' ? theme.palette.primary.main :
                                    activity.type === 'share' ? theme.palette.success.main :
                                    activity.type === 'qr' ? theme.palette.warning.main :
                                    theme.palette.info.main
                                  }20`,
                                  color: 
                                    activity.type === 'view' ? theme.palette.primary.main :
                                    activity.type === 'share' ? theme.palette.success.main :
                                    activity.type === 'qr' ? theme.palette.warning.main :
                                    theme.palette.info.main
                                }}
                              >
                                {activity.type === 'view' && <IconEye size={20} />}
                                {activity.type === 'share' && <IconShare size={20} />}
                                {activity.type === 'qr' && <IconQrcode size={20} />}
                                {activity.type === 'contact' && <IconUsers size={20} />}
                              </Avatar>
                            </Grid>

                            <Grid size={{ xs: 11, sm: 6 }}>
                              <Stack spacing={0.5}>
                                <Typography variant="body2" fontWeight={600}>
                                  {activity.message}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {activity.card}
                                </Typography>
                              </Stack>
                            </Grid>

                            {!isMobile && (
                              <>
                                <Grid size={{ sm: 3 }}>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <IconMapPin size={16} color={theme.palette.text.secondary} />
                                    <Typography variant="caption" color="text.secondary">
                                      {activity.location}
                                    </Typography>
                                  </Stack>
                                </Grid>

                                <Grid size={{ sm: 2 }}>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <IconCalendar size={16} color={theme.palette.text.secondary} />
                                    <Typography variant="caption" color="text.secondary">
                                      منذ {activity.time}
                                    </Typography>
                                  </Stack>
                                </Grid>
                              </>
                            )}
                          </Grid>

                          {isMobile && (
                            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                              <Stack direction="row" spacing={0.5} alignItems="center">
                                <IconMapPin size={14} color={theme.palette.text.secondary} />
                                <Typography variant="caption" color="text.secondary">
                                  {activity.location}
                                </Typography>
                              </Stack>
                              <Stack direction="row" spacing={0.5} alignItems="center">
                                <IconCalendar size={14} color={theme.palette.text.secondary} />
                                <Typography variant="caption" color="text.secondary">
                                  منذ {activity.time}
                                </Typography>
                              </Stack>
                            </Stack>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </DashboardCard>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default Analytics;
