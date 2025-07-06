// src/views/homepage/components/PricingSection.tsx
import { 
  Box, 
  Container, 
  Typography, 
  Grid2 as Grid,
  Card,
  CardContent,
  Stack,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  Fade
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IconCheck, IconStar } from '@tabler/icons-react';

const PricingSection = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const plans = [
    {
      nameKey: 'homepage.pricing.free.name',
      priceKey: 'homepage.pricing.free.price',
      descriptionKey: 'homepage.pricing.free.description',
      featuresKey: 'homepage.pricing.free.features',
      buttonKey: 'homepage.pricing.free.button',
      popular: false,
      color: theme.palette.grey[100]
    },
    {
      nameKey: 'homepage.pricing.pro.name',
      priceKey: 'homepage.pricing.pro.price',
      descriptionKey: 'homepage.pricing.pro.description',
      featuresKey: 'homepage.pricing.pro.features',
      buttonKey: 'homepage.pricing.pro.button',
      popular: true,
      color: theme.palette.primary.light
    },
    {
      nameKey: 'homepage.pricing.business.name',
      priceKey: 'homepage.pricing.business.price',
      descriptionKey: 'homepage.pricing.business.description',
      featuresKey: 'homepage.pricing.business.features',
      buttonKey: 'homepage.pricing.business.button',
      popular: false,
      color: theme.palette.secondary.light
    }
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: theme.palette.background.paper }}>
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
              {t('homepage.pricing.title')}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              {t('homepage.pricing.subtitle')}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {plans.map((plan, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Fade in timeout={1400 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      position: 'relative',
                      border: plan.popular ? `2px solid ${theme.palette.primary.main}` : 'none',
                      transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: plan.popular ? 'scale(1.08)' : 'scale(1.03)',
                        boxShadow: theme.shadows[12]
                      }
                    }}
                  >
                    {plan.popular && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -12,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          zIndex: 1
                        }}
                      >
                        <Chip
                          icon={<IconStar size={16} />}
                          label={t('homepage.pricing.popular')}
                          color="primary"
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.875rem'
                          }}
                        />
                      </Box>
                    )}
                    
                    <CardContent sx={{ p: 4, height: '100%' }}>
                      <Stack spacing={3} height="100%">
                        <Box textAlign="center">
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.text.primary,
                              mb: 1
                            }}
                          >
                            {t(plan.nameKey)}
                          </Typography>
                          
                          <Typography
                            variant="h3"
                            sx={{
                              fontWeight: 800,
                              color: theme.palette.primary.main,
                              mb: 1
                            }}
                          >
                            {t(plan.priceKey)}
                          </Typography>
                          
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary
                            }}
                          >
                            {t(plan.descriptionKey)}
                          </Typography>
                        </Box>

                        <List sx={{ flexGrow: 1 }}>
                          {Array.from({ length: 5 }, (_, i) => (
                            <ListItem key={i} sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <IconCheck 
                                  size={20} 
                                  color={theme.palette.success.main}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={t(`${plan.featuresKey}.${i}`)}
                                sx={{
                                  '& .MuiListItemText-primary': {
                                    fontSize: '0.875rem',
                                    color: theme.palette.text.secondary
                                  }
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>

                        <Button
                          variant={plan.popular ? 'contained' : 'outlined'}
                          size="large"
                          fullWidth
                          sx={{
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            borderRadius: 2
                          }}
                        >
                          {t(plan.buttonKey)}
                        </Button>
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

export default PricingSection;
