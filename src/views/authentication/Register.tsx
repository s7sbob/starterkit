// src/views/authentication/Register.tsx
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
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Alert,
  useTheme,
  LinearProgress
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { 
  IconEye, 
  IconEyeOff, 
  IconBrandGoogle, 
  IconBrandFacebook,
  IconArrowRight,
  IconCheck,
  IconX
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router';
import Logo from 'src/layouts/full/shared/logo/Logo';
import PageContainer from 'src/components/container/PageContainer';

const Register = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'acceptTerms' ? checked : value
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
      setError(t('auth.register.passwordMismatch'));
      setLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setError(t('auth.register.acceptTermsRequired'));
      setLoading(false);
      return;
    }

    try {
      console.log('Register data:', formData);
      
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // في حالة النجاح
      navigate('/auth/verify-email');
    } catch (err) {
      setError(t('auth.register.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title={t('auth.register.title')} description={t('auth.register.description')}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: theme.palette.background.default,
          py: 4
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
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      mb: 1
                    }}
                  >
                    {t('auth.register.createAccount')}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary
                    }}
                  >
                    {t('auth.register.subtitle')}
                  </Typography>
                </Box>

                {/* Error Alert */}
                {error && (
                  <Alert severity="error" sx={{ width: '100%' }}>
                    {error}
                  </Alert>
                )}

                {/* Register Form */}
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={2}>
                      <TextField
                        fullWidth
                        name="firstName"
                        label={t('auth.register.firstName')}
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                      
                      <TextField
                        fullWidth
                        name="lastName"
                        label={t('auth.register.lastName')}
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Stack>

                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      label={t('auth.register.email')}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />

                    <TextField
                      fullWidth
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      label={t('auth.register.password')}
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
                          {passwordStrength < 50 ? t('auth.register.passwordWeak') :
                           passwordStrength < 75 ? t('auth.register.passwordMedium') :
                           t('auth.register.passwordStrong')}
                        </Typography>
                      </Box>
                    )}

                    <TextField
                      fullWidth
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      label={t('auth.register.confirmPassword')}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      error={formData.confirmPassword !== '' && !passwordsMatch}
                      helperText={formData.confirmPassword !== '' && !passwordsMatch ? t('auth.register.passwordMismatch') : ''}
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

                    <FormControlLabel
                      control={
                        <Checkbox
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleInputChange}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2">
                          {t('auth.register.acceptTerms')}{' '}
                          <Link to="/terms">
                            <Typography
                              component="span"
                              sx={{
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                                '&:hover': {
                                  textDecoration: 'underline'
                                }
                              }}
                            >
                              {t('auth.register.termsOfService')}
                            </Typography>
                          </Link>
                          {' '}{t('auth.register.and')}{' '}
                          <Link to="/privacy">
                            <Typography
                              component="span"
                              sx={{
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                                '&:hover': {
                                  textDecoration: 'underline'
                                }
                              }}
                            >
                              {t('auth.register.privacyPolicy')}
                            </Typography>
                          </Link>
                        </Typography>
                      }
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={loading || !formData.acceptTerms}
                      endIcon={<IconArrowRight />}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: '1rem',
                        fontWeight: 600
                      }}
                    >
                      {loading ? t('auth.register.creating') : t('auth.register.createButton')}
                    </Button>
                  </Stack>
                </Box>

                {/* Divider */}
                <Divider sx={{ width: '100%', my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {t('auth.register.orContinueWith')}
                  </Typography>
                </Divider>

                {/* Social Login */}
                <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<IconBrandGoogle />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: theme.palette.divider
                    }}
                  >
                    Google
                  </Button>
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<IconBrandFacebook />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: theme.palette.divider
                    }}
                  >
                    Facebook
                  </Button>
                </Stack>

                {/* Login Link */}
                <Typography variant="body2" textAlign="center">
                  {t('auth.register.haveAccount')}{' '}
                  <Link to="/auth/login">
                    <Typography
                      component="span"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {t('auth.register.signIn')}
                    </Typography>
                  </Link>
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </PageContainer>
  );
};

export default Register;
