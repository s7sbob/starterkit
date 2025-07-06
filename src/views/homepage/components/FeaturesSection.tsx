// src/views/homepage/components/FeaturesSection.tsx
import { 
  Box, 
  Container, 
  Typography, 
  Grid2 as Grid,
  Card,
  CardContent,
  Stack,
  useTheme,
  Fade
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { 
  IconQrcode, 
  IconDeviceMobile, 
  IconShield, 
  IconAnalyze, 
  IconBell, 
  IconUsers 
} from '@tabler/icons-react';

const FeaturesSection = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const features = [
    {
      icon: IconQrcode,
      titleKey: 'homepage.features.digitalCards.title',
      descriptionKey: 'homepage.features.digitalCards.description'
    },
    {
      icon: IconDeviceMobile,
      titleKey: 'homepage.features.qrCustom.title',
      descriptionKey: 'homepage.features.qrCustom.description'
    },
    {
      icon: IconShield,
      titleKey: 'homepage.features.landingPages.title',
      descriptionKey: 'homepage.features.landingPages.description'
    },
    {
      icon: IconAnalyze,
      titleKey: 'homepage.features.privacy.title',
      descriptionKey: 'homepage.features.privacy.description'
    },
    {
      icon: IconBell,
      titleKey: 'homepage.features.notifications.title',
      descriptionKey: 'homepage.features.notifications.description'
    },
    {
      icon: IconUsers,
      titleKey: 'homepage.features.analytics.title',
      descriptionKey: 'homepage.features.analytics.description'
    }
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <Box textAlign="center">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 2
              }}
            >
              {t('homepage.features.title')}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              {t('homepage.features.subtitle')}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Fade in timeout={800 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8]
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Stack spacing={3} alignItems="center" textAlign="center">
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.light,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <feature.icon size={40} color={theme.palette.primary.main} />
                        </Box>
                        
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}
                        >
                          {t(feature.titleKey)}
                        </Typography>
                        
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.palette.text.secondary,
                            lineHeight: 1.6
                          }}
                        >
                          {t(feature.descriptionKey)}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
