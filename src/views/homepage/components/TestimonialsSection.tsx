// src/views/homepage/components/TestimonialsSection.tsx
import { 
  Box, 
  Container, 
  Typography, 
  Grid2 as Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  Rating,
  useTheme,
  Fade
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IconQuote } from '@tabler/icons-react';

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const testimonials = [
    {
      nameKey: 'homepage.testimonials.testimonial1.name',
      titleKey: 'homepage.testimonials.testimonial1.title',
      reviewKey: 'homepage.testimonials.testimonial1.review',
      avatar: '/images/testimonials/user1.jpg',
      rating: 5
    },
    {
      nameKey: 'homepage.testimonials.testimonial2.name',
      titleKey: 'homepage.testimonials.testimonial2.title',
      reviewKey: 'homepage.testimonials.testimonial2.review',
      avatar: '/images/testimonials/user2.jpg',
      rating: 5
    },
    {
      nameKey: 'homepage.testimonials.testimonial3.name',
      titleKey: 'homepage.testimonials.testimonial3.title',
      reviewKey: 'homepage.testimonials.testimonial3.review',
      avatar: '/images/testimonials/user3.jpg',
      rating: 5
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
              {t('homepage.testimonials.title')}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              {t('homepage.testimonials.subtitle')}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Fade in timeout={1200 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      position: 'relative',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8]
                      }
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        color: theme.palette.primary.main,
                        opacity: 0.3
                      }}
                    >
                      <IconQuote size={40} />
                    </Box>
                    
                    <CardContent sx={{ p: 4 }}>
                      <Stack spacing={3}>
                        <Rating
                          value={testimonial.rating}
                          readOnly
                          sx={{
                            color: theme.palette.warning.main
                          }}
                        />
                        
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.palette.text.secondary,
                            lineHeight: 1.6,
                            fontStyle: 'italic'
                          }}
                        >
                          "{t(testimonial.reviewKey)}"
                        </Typography>
                        
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            src={testimonial.avatar}
                            sx={{ width: 50, height: 50 }}
                          />
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary
                              }}
                            >
                              {t(testimonial.nameKey)}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.palette.text.secondary
                              }}
                            >
                              {t(testimonial.titleKey)}
                            </Typography>
                          </Box>
                        </Stack>
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

export default TestimonialsSection;
