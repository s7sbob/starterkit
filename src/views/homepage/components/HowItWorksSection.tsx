// src/views/homepage/components/HowItWorksSection.tsx
import { 
  Box, 
  Container, 
  Typography, 
  Grid2 as Grid,
  Card,
  CardContent,
  Stack,
  useTheme,
  Fade,
  Avatar
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { 
  IconUserPlus, 
  IconShare, 
  IconEye 
} from '@tabler/icons-react';

const HowItWorksSection = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const steps = [
    {
      icon: IconUserPlus,
      titleKey: 'homepage.howItWorks.step1.title',
      descriptionKey: 'homepage.howItWorks.step1.description',
      number: '01'
    },
    {
      icon: IconShare,
      titleKey: 'homepage.howItWorks.step2.title',
      descriptionKey: 'homepage.howItWorks.step2.description',
      number: '02'
    },
    {
      icon: IconEye,
      titleKey: 'homepage.howItWorks.step3.title',
      descriptionKey: 'homepage.howItWorks.step3.description',
      number: '03'
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
              {t('homepage.howItWorks.title')}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              {t('homepage.howItWorks.subtitle')}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Fade in timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      position: 'relative',
                      overflow: 'visible',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        boxShadow: theme.shadows[4]
                      }}
                    >
                      {step.number}
                    </Box>
                    
                    <CardContent sx={{ pt: 6, pb: 4 }}>
                      <Stack spacing={3} alignItems="center">
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            backgroundColor: theme.palette.primary.light,
                            color: theme.palette.primary.main
                          }}
                        >
                          <step.icon size={40} />
                        </Avatar>
                        
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary
                          }}
                        >
                          {t(step.titleKey)}
                        </Typography>
                        
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.palette.text.secondary,
                            lineHeight: 1.6
                          }}
                        >
                          {t(step.descriptionKey)}
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

export default HowItWorksSection;
