// src/views/authentication/ForgotPassword.tsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IconArrowRight, IconArrowLeft, IconMail } from '@tabler/icons-react';
import { Link } from 'react-router';
import Logo from 'src/layouts/full/shared/logo/Logo';
import PageContainer from 'src/components/container/PageContainer';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Reset password for:', email);
      
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
    } catch (err) {
      setError(t('auth.forgotPassword.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title={t('auth.forgotPassword.title')} description={t('auth.forgotPassword.description')}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.background.default
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              boxShadow: theme.shadows[10],
              borderRadius: 3
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3} alignItems="center">
                {/* Logo */}
                <Logo />
                
                {/* Header */}
                <Box textAlign="center">
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.light,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <IconMail size={40} color={theme.palette.primary.main} />
                  </Box>
                  
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      mb: 1
                    }}
                  >
                    {t('auth.forgotPassword.title')}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary
                    }}
                  >
                    {success ? t('auth.forgotPassword.successMessage') : t('auth.forgotPassword.subtitle')}
                  </Typography>
                </Box>

                {/* Success Alert */}
                {success && (
                  <Alert severity="success" sx={{ width: '100%' }}>
                    {t('auth.forgotPassword.emailSent')}
                  </Alert>
                )}

                {/* Error Alert */}
                {error && (
                  <Alert severity="error" sx={{ width: '100%' }}>
                    {error}
                  </Alert>
                )}

                {!success && (
                  <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        name="email"
                        type="email"
                        label={t('auth.forgotPassword.email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={loading}
                        endIcon={<IconArrowRight />}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          fontSize: '1rem',
                          fontWeight: 600
                        }}
                      >
                        {loading ? t('auth.forgotPassword.sending') : t('auth.forgotPassword.sendButton')}
                      </Button>
                    </Stack>
                  </Box>
                )}

                {/* Back to Login */}
                <Link to="/auth/login">
                  <Button
                    variant="text"
                    startIcon={<IconArrowLeft />}
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover
                      }
                    }}
                  >
                    {t('auth.forgotPassword.backToLogin')}
                  </Button>
                </Link>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default ForgotPassword;
