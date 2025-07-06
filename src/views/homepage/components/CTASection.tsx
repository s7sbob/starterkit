// src/views/homepage/components/CTASection.tsx
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  Stack,
  useTheme,
  Fade
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IconArrowRight, IconStar } from '@tabler/icons-react';

const CTASection = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        textAlign: 'center'
      }}
    >
      <Container maxWidth="md">
        <Fade in timeout={1600}>
          <Stack spacing={4} alignItems="center">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                lineHeight: 1.2
              }}
            >
              {t('homepage.cta.title')}
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                opacity: 0.9,
                maxWidth: '600px',
                lineHeight: 1.6
              }}
            >
              {t('homepage.cta.subtitle')}
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<IconArrowRight />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: theme.palette.grey[100],
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                {t('homepage.cta.primaryButton')}
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                startIcon={<IconStar />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderColor: 'white',
                  color: 'white',
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {t('homepage.cta.secondaryButton')}
              </Button>
            </Stack>
          </Stack>
        </Fade>
      </Container>
    </Box>
  );
};

export default CTASection;
