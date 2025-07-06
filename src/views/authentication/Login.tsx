// src/views/authentication/Login.tsx
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
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { 
  IconEye, 
  IconEyeOff, 
  IconBrandGoogle, 
  IconBrandFacebook,
  IconArrowRight 
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router';
import Logo from 'src/layouts/full/shared/logo/Logo';
import PageContainer from 'src/components/container/PageContainer';

const Login = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // هنا هيكون API call للتسجيل
      console.log('Login data:', formData);
      
      // محاكاة API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // في حالة النجاح
      navigate('/dashboard');
    } catch (err) {
      setError(t('auth.login.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title={t('auth.login.title')} description={t('auth.login.description')}>
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
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      mb: 1
                    }}
                  >
                    {t('auth.login.welcome')}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary
                    }}
                  >
                    {t('auth.login.subtitle')}
                  </Typography>
                </Box>

                {/* Error Alert */}
                {error && (
                  <Alert severity="error" sx={{ width: '100%' }}>
                    {error}
                  </Alert>
                )}

                {/* Login Form */}
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      label={t('auth.login.email')}
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
                      label={t('auth.login.password')}
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

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleInputChange}
                            color="primary"
                          />
                        }
                        label={t('auth.login.rememberMe')}
                      />
                      
                      <Link to="/auth/forgot-password">
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.primary.main,
                            textDecoration: 'none',
                            '&:hover': {
                              textDecoration: 'underline'
                            }
                          }}
                        >
                          {t('auth.login.forgotPassword')}
                        </Typography>
                      </Link>
                    </Stack>

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
                      {loading ? t('auth.login.loggingIn') : t('auth.login.loginButton')}
                    </Button>
                  </Stack>
                </Box>

                {/* Divider */}
                <Divider sx={{ width: '100%', my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {t('auth.login.orContinueWith')}
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

                {/* Register Link */}
                <Typography variant="body2" textAlign="center">
                  {t('auth.login.noAccount')}{' '}
                  <Link to="/auth/register">
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
                      {t('auth.login.signUp')}
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

export default Login;
