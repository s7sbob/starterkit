// src/views/settings/Settings.tsx
import { useState } from 'react';
import {
  Container,
  Grid2 as Grid,
  CardContent,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  Alert,
  Slider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'src/store/Store';
import {
  setDarkMode,
  setLanguage,
  setBorderRadius,
  setCardShadow,
  toggleLayout
} from 'src/store/customizer/CustomizerSlice';
import {
  IconPalette,
  IconBell,
  IconShield,
  IconMoon,
  IconSun,
  IconDevices,
  IconMail,
  IconPhone,
  IconBrandWhatsapp,
  IconCheck} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../dashboard/components/DashboardCard';
import { AppState } from 'src/store/Store';

const Settings = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    whatsapp: true,
    marketing: false,
    security: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowDownload: true,
    twoFactorAuth: false
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };


  return (
    <PageContainer title={t('settings.title')} description={t('settings.description')}>
      <Container maxWidth="xl">
        {/* Header */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', md: 'center' }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary
            }}
          >
            {t('settings.title')}
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {/* Appearance Settings */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <DashboardCard>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <IconPalette size={24} color={theme.palette.primary.main} />
                    <Typography variant="h6" fontWeight={600}>
                      {t('settings.appearance.title')}
                    </Typography>
                  </Stack>

                  {/* Dark Mode */}
                  <Stack spacing={2}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {t('settings.appearance.theme')}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant={customizer.activeMode === 'light' ? 'contained' : 'outlined'}
                        startIcon={<IconSun />}
                        onClick={() => dispatch(setDarkMode('light'))}
                        sx={{ borderRadius: 2, flex: 1 }}
                      >
                        {t('settings.appearance.light')}
                      </Button>
                      <Button
                        variant={customizer.activeMode === 'dark' ? 'contained' : 'outlined'}
                        startIcon={<IconMoon />}
                        onClick={() => dispatch(setDarkMode('dark'))}
                        sx={{ borderRadius: 2, flex: 1 }}
                      >
                        {t('settings.appearance.dark')}
                      </Button>
                    </Stack>
                  </Stack>

                  {/* Language */}
                  <Stack spacing={2}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {t('settings.appearance.language')}
                    </Typography>
                    <FormControl fullWidth>
                      <Select
                        value={customizer.isLanguage}
                        onChange={(e) => dispatch(setLanguage(e.target.value))}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="ar">العربية</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>

                  {/* Layout */}
                  <Stack spacing={2}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {t('settings.appearance.layout')}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant={customizer.isLayout === 'boxed' ? 'contained' : 'outlined'}
                        onClick={() => dispatch(toggleLayout('boxed'))}
                        sx={{ borderRadius: 2, flex: 1 }}
                      >
                        {t('settings.appearance.boxed')}
                      </Button>
                      <Button
                        variant={customizer.isLayout === 'full' ? 'contained' : 'outlined'}
                        onClick={() => dispatch(toggleLayout('full'))}
                        sx={{ borderRadius: 2, flex: 1 }}
                      >
                        {t('settings.appearance.full')}
                      </Button>
                    </Stack>
                  </Stack>

                  {/* Border Radius */}
                  <Stack spacing={2}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {t('settings.appearance.borderRadius')} ({customizer.borderRadius}px)
                    </Typography>
                    <Slider
                      value={customizer.borderRadius}
                      onChange={(_, value) => dispatch(setBorderRadius(value))}
                      min={4}
                      max={24}
                      step={1}
                      marks={[
                        { value: 4, label: '4px' },
                        { value: 12, label: '12px' },
                        { value: 24, label: '24px' }
                      ]}
                    />
                  </Stack>

                  {/* Card Shadow */}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={customizer.isCardShadow}
                        onChange={(e) => dispatch(setCardShadow(e.target.checked))}
                      />
                    }
                    label={t('settings.appearance.cardShadow')}
                  />
                </Stack>
              </CardContent>
            </DashboardCard>
          </Grid>

          {/* Notification Settings */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <DashboardCard>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <IconBell size={24} color={theme.palette.warning.main} />
                    <Typography variant="h6" fontWeight={600}>
                      {t('settings.notifications.title')}
                    </Typography>
                  </Stack>

                  <List sx={{ p: 0 }}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <IconMail size={20} />
                      </ListItemIcon>
                      <ListItemText
                        primary={t('settings.notifications.email')}
                        secondary={t('settings.notifications.emailDesc')}
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications.email}
                          onChange={(e) => handleNotificationChange('email', e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <IconDevices size={20} />
                      </ListItemIcon>
                      <ListItemText
                        primary={t('settings.notifications.push')}
                        secondary={t('settings.notifications.pushDesc')}
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications.push}
                          onChange={(e) => handleNotificationChange('push', e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <IconPhone size={20} />
                      </ListItemIcon>
                      <ListItemText
                        primary={t('settings.notifications.sms')}
                        secondary={t('settings.notifications.smsDesc')}
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications.sms}
                          onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>

                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <IconBrandWhatsapp size={20} />
                      </ListItemIcon>
                      <ListItemText
                        primary={t('settings.notifications.whatsapp')}
                        secondary={t('settings.notifications.whatsappDesc')}
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications.whatsapp}
                          onChange={(e) => handleNotificationChange('whatsapp', e.target.checked)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Stack>
              </CardContent>
            </DashboardCard>
          </Grid>

          {/* Privacy Settings */}
          <Grid size={{ xs: 12 }}>
            <DashboardCard>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <IconShield size={24} color={theme.palette.success.main} />
                    <Typography variant="h6" fontWeight={600}>
                      {t('settings.privacy.title')}
                    </Typography>
                  </Stack>

                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={3}>
                        <Stack spacing={2}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {t('settings.privacy.profileVisibility')}
                          </Typography>
                          <FormControl fullWidth>
                            <Select
                              value={privacy.profileVisibility}
                              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                              sx={{ borderRadius: 2 }}
                            >
                              <MenuItem value="public">{t('settings.privacy.public')}</MenuItem>
                              <MenuItem value="private">{t('settings.privacy.private')}</MenuItem>
                              <MenuItem value="contacts">{t('settings.privacy.contactsOnly')}</MenuItem>
                            </Select>
                          </FormControl>
                        </Stack>

                        <FormControlLabel
                          control={
                            <Switch
                              checked={privacy.showEmail}
                              onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                            />
                          }
                          label={t('settings.privacy.showEmail')}
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              checked={privacy.showPhone}
                              onChange={(e) => handlePrivacyChange('showPhone', e.target.checked)}
                            />
                          }
                          label={t('settings.privacy.showPhone')}
                        />
                      </Stack>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={3}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={privacy.allowDownload}
                              onChange={(e) => handlePrivacyChange('allowDownload', e.target.checked)}
                            />
                          }
                          label={t('settings.privacy.allowDownload')}
                        />

                        <FormControlLabel
                          control={
                            <Switch
                              checked={privacy.twoFactorAuth}
                              onChange={(e) => handlePrivacyChange('twoFactorAuth', e.target.checked)}
                            />
                          }
                          label={
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Typography>{t('settings.privacy.twoFactorAuth')}</Typography>
                              <Chip label={t('settings.privacy.recommended')} size="small" color="success" />
                            </Stack>
                          }
                        />

                        {privacy.twoFactorAuth && (
                          <Alert severity="info" sx={{ mt: 2 }}>
                            {t('settings.privacy.twoFactorDesc')}
                          </Alert>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
            </DashboardCard>
          </Grid>

          {/* Save Settings */}
          <Grid size={{ xs: 12 }}>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                {t('settings.resetToDefault')}
              </Button>
              <Button
                variant="contained"
                startIcon={<IconCheck />}
                sx={{ borderRadius: 2 }}
              >
                {t('settings.saveSettings')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default Settings;
