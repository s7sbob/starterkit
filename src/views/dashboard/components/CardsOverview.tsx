// src/views/dashboard/components/CardsOverview.tsx
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  Grid2 as Grid
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconPlus,
  IconEye,
  IconShare,
  IconQrcode,
  IconDots,
  IconEdit,
  IconCopy,
  IconArrowRight
} from '@tabler/icons-react';
import DashboardCard from './DashboardCard';

interface CardsOverviewProps {
  isMobile: boolean;
}

const CardsOverview = ({ isMobile }: CardsOverviewProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // بيانات وهمية للبطاقات
  const cards = [
    {
      id: 1,
      name: 'بطاقة العمل الرئيسية',
      avatar: '/images/avatars/user1.jpg',
      views: 1234,
      shares: 89,
      qrScans: 456,
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'بطاقة المشاريع',
      avatar: '/images/avatars/user2.jpg',
      views: 567,
      shares: 34,
      qrScans: 123,
      status: 'active',
      lastUpdated: '2024-01-10'
    },
    {
      id: 3,
      name: 'بطاقة شخصية',
      avatar: '/images/avatars/user3.jpg',
      views: 234,
      shares: 12,
      qrScans: 67,
      status: 'draft',
      lastUpdated: '2024-01-08'
    }
  ];

  return (
    <DashboardCard>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={{ xs: 2, md: 3 }}>
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary
              }}
            >
              {t('dashboard.cards.title')}
            </Typography>
            
            <Button
              variant="contained"
              startIcon={<IconPlus />}
              size={isMobile ? 'small' : 'medium'}
              sx={{
                borderRadius: 2,
                px: { xs: 2, md: 3 }
              }}
            >
              {isMobile ? t('dashboard.cards.add') : t('dashboard.cards.addNew')}
            </Button>
          </Stack>

          {/* Cards List */}
          <Stack spacing={2}>
            {cards.map((card) => (
              <Card
                key={card.id}
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: theme.shadows[3],
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                  <Grid container spacing={2} alignItems="center">
                    {/* Avatar and Info */}
                    <Grid size={{ xs: 12, sm: 6, md: 7 }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={card.avatar}
                          sx={{
                            width: { xs: 40, md: 48 },
                            height: { xs: 40, md: 48 }
                          }}
                        />
                        <Stack spacing={0.5} sx={{ minWidth: 0, flex: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 600,
                              color: theme.palette.text.primary,
                              fontSize: { xs: '0.9rem', md: '1rem' },
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {card.name}
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                              label={card.status === 'active' ? t('dashboard.cards.active') : t('dashboard.cards.draft')}
                              size="small"
                              color={card.status === 'active' ? 'success' : 'default'}
                              sx={{
                                height: 20,
                                fontSize: '0.7rem'
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                color: theme.palette.text.secondary,
                                fontSize: { xs: '0.7rem', md: '0.75rem' }
                              }}
                            >
                              {t('dashboard.cards.updated')} {card.lastUpdated}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Grid>

                    {/* Stats - Hidden on mobile */}
                    {!isMobile && (
                      <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <Stack direction="row" spacing={2}>
                          <Stack alignItems="center" spacing={0.5}>
                            <IconEye size={16} color={theme.palette.text.secondary} />
                            <Typography variant="caption" color="text.secondary">
                              {card.views}
                            </Typography>
                          </Stack>
                          <Stack alignItems="center" spacing={0.5}>
                            <IconShare size={16} color={theme.palette.text.secondary} />
                            <Typography variant="caption" color="text.secondary">
                              {card.shares}
                            </Typography>
                          </Stack>
                          <Stack alignItems="center" spacing={0.5}>
                            <IconQrcode size={16} color={theme.palette.text.secondary} />
                            <Typography variant="caption" color="text.secondary">
                              {card.qrScans}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    )}

                    {/* Actions */}
                    <Grid size={{ xs: 12, sm: 2, md: 2 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        {isMobile ? (
                          <IconButton size="small">
                            <IconDots size={16} />
                          </IconButton>
                        ) : (
                          <>
                            <IconButton size="small" color="primary">
                              <IconEdit size={16} />
                            </IconButton>
                            <IconButton size="small" color="secondary">
                              <IconCopy size={16} />
                            </IconButton>
                            <IconButton size="small">
                              <IconDots size={16} />
                            </IconButton>
                          </>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>

                  {/* Mobile Stats */}
                  {isMobile && (
                    <Stack
                      direction="row"
                      spacing={3}
                      sx={{
                        mt: 2,
                        pt: 2,
                        borderTop: `1px solid ${theme.palette.divider}`
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconEye size={14} color={theme.palette.text.secondary} />
                        <Typography variant="caption" color="text.secondary">
                          {card.views} {t('dashboard.cards.views')}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconShare size={14} color={theme.palette.text.secondary} />
                        <Typography variant="caption" color="text.secondary">
                          {card.shares} {t('dashboard.cards.shares')}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <IconQrcode size={14} color={theme.palette.text.secondary} />
                        <Typography variant="caption" color="text.secondary">
                          {card.qrScans} {t('dashboard.cards.scans')}
                        </Typography>
                      </Stack>
                    </Stack>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* View All Button */}
          <Button
            variant="outlined"
            fullWidth
            endIcon={<IconArrowRight />}
            sx={{
              borderRadius: 2,
              py: 1.5,
              mt: 2
            }}
          >
            {t('dashboard.cards.viewAll')}
          </Button>
        </Stack>
      </CardContent>
    </DashboardCard>
  );
};

export default CardsOverview;
