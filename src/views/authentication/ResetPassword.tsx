// src/views/authentication/ResetPassword.tsx
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
  IconButton,
  InputAdornment,
  LinearProgress,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { 
  IconArrowRight, 
  IconEye, 
  IconEyeOff, 
  IconShieldCheck,
  IconCheck,
  IconX
} from '@tabler/icons-react';
import { useNavigate, useSearchParams } from 'react-router';
import Logo from 'src/layouts/full/shared/logo/Logo';
import PageContainer from 'src/components/container/PageContainer';

const ResetPassword = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Password strength validation
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.resetPassword.passwordMismatch'));
      setLoading(false);
      return;
    }

    if (passwordStrength < 75) {
      setError(t('auth.resetPassword.passwordTooWeak'));
      setLoading(false);
      return;
    }

    try {
      console.log('Reset password with token:', token, formData);
      
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // في حالة النجاح
      navigate('/auth/login', { 
        state: { message: t('auth.resetPassword.successMessage') }
      });
    } catch (err) {
      setError(t('auth.resetPassword.error'));
    } finally {
      setLoading(false);
    }
  };

  // التحقق من وجود token
  if (!token) {
    return (
      <PageContainer title={t('auth.resetPassword.title')}>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.background.default
          }}
        >
          <Container maxWidth="sm">
            <Card sx={{ boxShadow: theme.shadows[10], borderRadius: 3 }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Alert severity="error">
                  {t('auth.resetPassword.invalidToken')}
                </Alert>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={t('auth.resetPassword.title')} description={t('auth.resetPassword.description')}>
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
                      backgroundColor: theme.palette.success.light,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <IconShieldCheck size={40} color={theme.palette.success.main} />
                  </Box>
                  
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      mb: 1
                    }}
                  >
                    {t('auth.resetPassword.title')}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary
                    }}
                  >
                    {t('auth.resetPassword.subtitle')}
                  </Typography>
                </Box>

                {/* Error Alert */}
                {error && (
                  <Alert severity="error" sx={{ width: '100%' }}>
                    {error}
                  </Alert>
                )}

                {/* Reset Form */}
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      label={t('auth.resetPassword.newPassword')}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <IconEyeOff /> : <IconEye />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <Box>
                        <LinearProgress
                          variant="determinate"
                          value={passwordStrength}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: theme.palette.grey[200],
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: 
                                passwordStrength < 50 ? theme.palette.error.main :
                                passwordStrength < 75 ? theme.palette.warning.main :
                                theme.palette.success.main
                            }
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: 
                              passwordStrength < 50 ? theme.palette.error.main :
                              passwordStrength < 75 ? theme.palette.warning.main :
                              theme.palette.success.main,
                            mt: 0.5
                          }}
                        >
                          {passwordStrength < 50 ? t('auth.resetPassword.passwordWeak') :
                           passwordStrength < 75 ? t('auth.resetPassword.passwordMedium') :
                           t('auth.resetPassword.passwordStrong')}
                        </Typography>
                      </Box>
                    )}

                    <TextField
                      fullWidth
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      label={t('auth.resetPassword.confirmPassword')}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      error={formData.confirmPassword !== '' && !passwordsMatch}
                      helperText={formData.confirmPassword !== '' && !passwordsMatch ? t('auth.resetPassword.passwordMismatch') : ''}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                            </IconButton>
                            {formData.confirmPassword !== '' && (
                              passwordsMatch ? 
                                <IconCheck color={theme.palette.success.main} size={20} /> :
                                <IconX color={theme.palette.error.main} size={20} />
                            )}
                          </InputAdornment>
                        )
                      }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={loading || !passwordsMatch || passwordStrength < 75}
                      endIcon={<IconArrowRight />}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: '1rem',
                        fontWeight: 600
                      }}
                    >
                      {loading ? t('auth.resetPassword.updating') : t('auth.resetPassword.updateButton')}
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default ResetPassword;
