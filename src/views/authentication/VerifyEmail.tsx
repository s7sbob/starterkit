// src/views/authentication/VerifyEmail.tsx
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Alert,
  CircularProgress,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { 
  IconMail, 
  IconCheck, 
  IconRefresh,
  IconArrowRight
} from '@tabler/icons-react';
import { Link, useSearchParams, useNavigate } from 'react-router';
import Logo from 'src/layouts/full/shared/logo/Logo';
import PageContainer from 'src/components/container/PageContainer';

const VerifyEmail = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error' | 'loading'>('pending');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    setVerificationStatus('loading');
    
    try {
      console.log('Verifying email with token:', verificationToken);
      
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setVerificationStatus('success');
      
      // إعادة توجيه تلقائي بعد 3 ثوان
      setTimeout(() => {
        navigate('/auth/login', { 
          state: { message: t('auth.verifyEmail.verificationSuccess') }
        });
      }, 3000);
      
    } catch (err) {
      setVerificationStatus('error');
    }
  };

  const handleResendEmail = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    
    try {
      console.log('Resending verification email');
      
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setResendSuccess(true);
    } catch (err) {
      console.error('Failed to resend email');
    } finally {
      setResendLoading(false);
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <>
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
              <CircularProgress size={40} color="primary" />
            </Box>
            
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 1
              }}
            >
              {t('auth.verifyEmail.verifying')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary
              }}
            >
              {t('auth.verifyEmail.verifyingMessage')}
            </Typography>
          </>
        );

      case 'success':
        return (
          <>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: theme.palette.success.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <IconCheck size={40} color={theme.palette.success.main} />
            </Box>
            
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 1
              }}
            >
              {t('auth.verifyEmail.successTitle')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 3
              }}
            >
              {t('auth.verifyEmail.successMessage')}
            </Typography>

            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              {t('auth.verifyEmail.redirectMessage')}
            </Alert>

            <Link to="/auth/login">
              <Button
                variant="contained"
                endIcon={<IconArrowRight />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2
                }}
              >
                {t('auth.verifyEmail.continueToLogin')}
              </Button>
            </Link>
          </>
        );

      case 'error':
        return (
          <>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: theme.palette.error.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <IconMail size={40} color={theme.palette.error.main} />
            </Box>
            
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 1
              }}
            >
              {t('auth.verifyEmail.errorTitle')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 3
              }}
            >
              {t('auth.verifyEmail.errorMessage')}
            </Typography>

            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {t('auth.verifyEmail.tokenExpired')}
            </Alert>

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<IconRefresh />}
                onClick={handleResendEmail}
                disabled={resendLoading}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2
                }}
              >
                {resendLoading ? t('auth.verifyEmail.resending') : t('auth.verifyEmail.resendEmail')}
              </Button>
              
              <Link to="/auth/login">
                <Button
                  variant="text"
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2
                  }}
                >
                  {t('auth.verifyEmail.backToLogin')}
                </Button>
              </Link>
            </Stack>
          </>
        );

      default: // pending
        return (
          <>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: theme.palette.info.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <IconMail size={40} color={theme.palette.info.main} />
            </Box>
            
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 1
              }}
            >
              {t('auth.verifyEmail.checkEmail')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 3
              }}
            >
              {t('auth.verifyEmail.checkEmailMessage')}
            </Typography>

            {resendSuccess && (
              <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                {t('auth.verifyEmail.resendSuccess')}
              </Alert>
            )}

            <Stack spacing={2} sx={{ width: '100%' }}>
              <Button
                variant="outlined"
                startIcon={<IconRefresh />}
                onClick={handleResendEmail}
                disabled={resendLoading}
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2
                }}
              >
                {resendLoading ? t('auth.verifyEmail.resending') : t('auth.verifyEmail.resendEmail')}
              </Button>
              
              <Link to="/auth/login">
                <Button
                  variant="text"
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 2
                  }}
                >
                  {t('auth.verifyEmail.backToLogin')}
                </Button>
              </Link>
            </Stack>
          </>
        );
    }
  };

  return (
    <PageContainer title={t('auth.verifyEmail.title')} description={t('auth.verifyEmail.description')}>
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
              <Stack spacing={3} alignItems="center" textAlign="center">
                <Logo />
                {renderContent()}
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default VerifyEmail;
