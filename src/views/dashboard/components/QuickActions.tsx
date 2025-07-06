// src/views/dashboard/components/QuickActions.tsx
import {
  CardContent,
  Typography,
  Stack,
  Button,
  Grid2 as Grid,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconPlus,
  IconQrcode,
  IconShare,
  IconAnalyze,
  IconSettings,
  IconBell
} from '@tabler/icons-react';
import DashboardCard from './DashboardCard';

interface QuickActionsProps {
  isMobile: boolean;
}

const QuickActions = ({ isMobile }: QuickActionsProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const actions = [
    {
      title: t('dashboard.quickActions.createCard'),
      icon: IconPlus,
      color: theme.palette.primary.main,
      variant: 'contained' as const
    },
    {
      title: t('dashboard.quickActions.generateQR'),
      icon: IconQrcode,
      color: theme.palette.secondary.main,
      variant: 'outlined' as const
    },
    {
      title: t('dashboard.quickActions.shareCard'),
      icon: IconShare,
      color: theme.palette.success.main,
      variant: 'outlined' as const
    },
    {
      title: t('dashboard.quickActions.viewAnalytics'),
      icon: IconAnalyze,
      color: theme.palette.info.main,
      variant: 'outlined' as const
    },
    {
      title: t('dashboard.quickActions.settings'),
      icon: IconSettings,
      color: theme.palette.warning.main,
      variant: 'outlined' as const
    },
    {
      title: t('dashboard.quickActions.notifications'),
      icon: IconBell,
      color: theme.palette.error.main,
      variant: 'outlined' as const
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
            {t('dashboard.quickActions.title')}
          </Typography>

          <Grid container spacing={2}>
            {actions.map((action, index) => (
              <Grid size={{ xs: 6, sm: 6, md: 12 }} key={index}>
                <Button
                  variant={action.variant}
                  fullWidth
                  startIcon={<action.icon size={18} />}
                  sx={{
                    borderRadius: 2,
                    py: { xs: 1.5, md: 2 },
                    px: { xs: 1, md: 2 },
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    fontSize: { xs: '0.8rem', md: '0.875rem' },
                    fontWeight: 500,
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: theme.shadows[3]
                    }
                  }}
                >
                  {action.title}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </CardContent>
    </DashboardCard>
  );
};

export default QuickActions;
