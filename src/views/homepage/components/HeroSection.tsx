// src/views/homepage/components/HeroSection.tsx
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid2 as Grid,
  Stack,
  useTheme,
  Fade,
  Slide
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IconDeviceMobile, IconArrowRight } from '@tabler/icons-react';

const HeroSection = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.background.paper} 100%)`,
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 12 }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Fade in timeout={1000}>
              <Stack spacing={3}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    lineHeight: 1.2
                  }}
                >
                  {t('homepage.hero.title')}
                  <Box component="span" sx={{ color: theme.palette.primary.main }}>
                    {t('homepage.hero.titleHighlight')}
                  </Box>
                </Typography>
                
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    lineHeight: 1.6,
                    maxWidth: '500px'
                  }}
                >
                  {t('homepage.hero.subtitle')}
                </Typography>
                
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<IconArrowRight />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      borderRadius: 2,
                      textTransform: 'none'
                    }}
                  >
                    {t('homepage.hero.primaryButton')}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<IconDeviceMobile />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      borderRadius: 2,
                      textTransform: 'none'
                    }}
                  >
                    {t('homepage.hero.secondaryButton')}
                  </Button>
                </Stack>
              </Stack>
            </Fade>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Slide direction="left" in timeout={1200}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <Box
                  component="img"
                  src="/images/hero-mockup.png"
                  alt={t('homepage.hero.imageAlt')}
                  sx={{
                    width: '100%',
                    maxWidth: '500px',
                    height: 'auto',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))'
                  }}
                />
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
