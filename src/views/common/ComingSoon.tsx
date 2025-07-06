// src/views/common/ComingSoon.tsx
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  Card,
  CardContent
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IconArrowLeft, IconTools } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import PageContainer from 'src/components/container/PageContainer';

const ComingSoon = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <PageContainer title={t('comingSoon.title')} description={t('comingSoon.description')}>
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: theme.shadows[8],
              width: '100%',
              maxWidth: 600
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
              <Stack spacing={4} alignItems="center">
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.light,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconTools size={60} color={theme.palette.primary.main} />
                </Box>
                
                <Stack spacing={2} alignItems="center">
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary
                    }}
                  >
                    {t('comingSoon.title')}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      maxWidth: 400,
                      lineHeight: 1.6
                    }}
                  >
                    {t('comingSoon.message')}
                  </Typography>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<IconArrowLeft />}
                    onClick={() => navigate(-1)}
                    sx={{ borderRadius: 2 }}
                  >
                    {t('common.back')}
                  </Button>
                  
                  <Button
                    variant="contained"
                    onClick={() => navigate('/dashboard/home')}
                    sx={{ borderRadius: 2 }}
                  >
                    {t('comingSoon.goToDashboard')}
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default ComingSoon;
