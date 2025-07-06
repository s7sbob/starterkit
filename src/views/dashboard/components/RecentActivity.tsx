// src/views/dashboard/components/RecentActivity.tsx
import {
  CardContent,
  Typography,
  Stack,
  Avatar,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconEye,
  IconShare,
  IconQrcode,
  IconUserPlus
} from '@tabler/icons-react';
import DashboardCard from './DashboardCard';

interface RecentActivityProps {
  isMobile: boolean;
}

const RecentActivity = ({ isMobile }: RecentActivityProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const activities = [
    {
      type: 'view',
      title: t('dashboard.activity.cardViewed'),
      description: 'بطاقة العمل الرئيسية',
      time: '5 دقائق',
      icon: IconEye,
      color: theme.palette.primary.main
    },
    {
      type: 'share',
      title: t('dashboard.activity.cardShared'),
      description: 'بطاقة المشاريع',
      time: '15 دقيقة',
      icon: IconShare,
      color: theme.palette.success.main
    },
    {
      type: 'qr',
      title: t('dashboard.activity.qrScanned'),
      description: 'بطاقة شخصية',
      time: '30 دقيقة',
      icon: IconQrcode,
      color: theme.palette.warning.main
    },
    {
      type: 'contact',
      title: t('dashboard.activity.newContact'),
      description: 'أحمد محمد',
      time: '1 ساعة',
      icon: IconUserPlus,
      color: theme.palette.info.main
    }
  ];

  return (
    <DashboardCard>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={{ xs: 2, md: 3 }}>
          <Typography
            variant={isMobile ? 'h6' : 'h6'}
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary
            }}
          >
            {t('dashboard.activity.title')}
          </Typography>

          <Stack spacing={2}>
            {activities.map((activity, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                sx={{
                  p: { xs: 1.5, md: 2 },
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    transform: 'translateX(4px)'
                  }
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 32, md: 40 },
                    height: { xs: 32, md: 40 },
                    backgroundColor: `${activity.color}20`,
                    color: activity.color
                  }}
                >
                  <activity.icon size={isMobile ? 16 : 20} />
                </Avatar>
                
                <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      fontSize: { xs: '0.8rem', md: '0.875rem' }
                    }}
                  >
                    {activity.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: { xs: '0.7rem', md: '0.75rem' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {activity.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.disabled,
                      fontSize: { xs: '0.65rem', md: '0.7rem' }
                    }}
                  >
                    منذ {activity.time}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </DashboardCard>
  );
};

export default RecentActivity;
