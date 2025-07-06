// src/views/profile/Profile.tsx
import { useState } from 'react';
import {
  Box,
  Container,
  Grid2 as Grid,
  CardContent,
  Typography,
  Button,
  Stack,
  Avatar,
  TextField,
  useTheme,
  useMediaQuery,
  Chip,
  IconButton,
  Alert,
  Switch,
  FormControlLabel
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCalendar,
  IconEdit,
  IconCamera,
  IconCheck,
  IconX,
  IconShield,
  IconEye,
  IconCrown,
  IconTrendingUp
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../dashboard/components/DashboardCard';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';

const Profile = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'أحمد',
    lastName: 'محمد',
    email: 'ahmed.mohammed@example.com',
    phone: '+966501234567',
    location: 'الرياض، السعودية',
    bio: 'مطور تطبيقات محترف مع خبرة 5 سنوات في تطوير التطبيقات المحمولة والويب',
    company: 'شركة التقنية المتقدمة',
    website: 'https://ahmed-dev.com',
    joinDate: '2023-01-15'
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    profileVisibility: true,
    twoFactorAuth: false
  });

  const handleSave = () => {
    setEditMode(false);
    // API call to save profile data
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset form data
  };

  const profileStats = [
    {
      title: t('profile.stats.cardsCreated'),
      value: '12',
      icon: IconUser,
      color: 'primary'
    },
    {
      title: t('profile.stats.totalViews'),
      value: '2,847',
      icon: IconEye,
      color: 'success'
    },
    {
      title: t('profile.stats.profileViews'),
      value: '1,234',
      icon: IconTrendingUp,
      color: 'warning'
    },
    {
      title: t('profile.stats.accountLevel'),
      value: 'Pro',
      icon: IconCrown,
      color: 'info'
    }
  ];

  return (
    <PageContainer title={t('profile.title')} description={t('profile.description')}>
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
            {t('profile.myProfile')}
          </Typography>

          <Stack direction="row" spacing={2}>
            {editMode ? (
              <>
                <Button
                  variant="outlined"
                  startIcon={<IconX />}
                  onClick={handleCancel}
                  sx={{ borderRadius: 2 }}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<IconCheck />}
                  onClick={handleSave}
                  sx={{ borderRadius: 2 }}
                >
                  {t('common.save')}
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                startIcon={<IconEdit />}
                onClick={() => setEditMode(true)}
                sx={{ borderRadius: 2 }}
              >
                {t('profile.editProfile')}
              </Button>
            )}
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {/* Profile Card */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <DashboardCard>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={3} alignItems="center">
                  {/* Avatar */}
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      src={ProfileImg}
                      sx={{
                        width: { xs: 120, md: 150 },
                        height: { xs: 120, md: 150 },
                        border: `4px solid ${theme.palette.background.paper}`,
                        boxShadow: theme.shadows[4]
                      }}
                    />
                    {editMode && (
                      <IconButton
                        component="label"
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          backgroundColor: theme.palette.primary.main,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: theme.palette.primary.dark
                          }
                        }}
                      >
                        <IconCamera size={20} />
                        <input type="file" hidden accept="image/*" />
                      </IconButton>
                    )}
                  </Box>

                  {/* Profile Info */}
                  <Stack spacing={1} alignItems="center">
                    <Typography variant="h5" fontWeight={600}>
                      {profileData.firstName} {profileData.lastName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {profileData.company}
                    </Typography>
                    <Chip
                      label="Pro Member"
                      color="primary"
                      icon={<IconCrown size={16} />}
                      sx={{ fontWeight: 600 }}
                    />
                  </Stack>

                  {/* Bio */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    sx={{ maxWidth: 300 }}
                  >
                    {profileData.bio}
                  </Typography>

                  {/* Contact Info */}
                  <Stack spacing={2} sx={{ width: '100%' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <IconMail size={20} color={theme.palette.text.secondary} />
                      <Typography variant="body2">{profileData.email}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <IconPhone size={20} color={theme.palette.text.secondary} />
                      <Typography variant="body2">{profileData.phone}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <IconMapPin size={20} color={theme.palette.text.secondary} />
                      <Typography variant="body2">{profileData.location}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <IconCalendar size={20} color={theme.palette.text.secondary} />
                      <Typography variant="body2">
                        {t('profile.memberSince')} {new Date(profileData.joinDate).getFullYear()}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </DashboardCard>

            {/* Stats Card */}
            <DashboardCard sx={{ mt: 3 }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  {t('profile.statistics')}
                </Typography>
                
                <Stack spacing={2}>
                  {profileStats.map((stat, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            backgroundColor: `${stat.color}.light`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <stat.icon size={20} color={`${stat.color}.main`} />
                        </Box>
                        <Typography variant="body2">{stat.title}</Typography>
                      </Stack>
                      <Typography variant="h6" fontWeight={600}>
                        {stat.value}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </DashboardCard>
          </Grid>

          {/* Profile Details */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={3}>
              {/* Personal Information */}
              <DashboardCard>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                    {t('profile.personalInformation')}
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label={t('profile.firstName')}
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        disabled={!editMode}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label={t('profile.lastName')}
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        disabled={!editMode}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label={t('profile.email')}
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!editMode}
                        type="email"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label={t('profile.phone')}
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!editMode}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label={t('profile.company')}
                        value={profileData.company}
                        onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                        disabled={!editMode}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label={t('profile.website')}
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        disabled={!editMode}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label={t('profile.bio')}
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        disabled={!editMode}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </DashboardCard>

              {/* Privacy Settings */}
              <DashboardCard>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                    {t('profile.privacySettings')}
                  </Typography>

                  <Stack spacing={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.emailNotifications}
                          onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                        />
                      }
                      label={t('profile.emailNotifications')}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.pushNotifications}
                          onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                        />
                      }
                      label={t('profile.pushNotifications')}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.profileVisibility}
                          onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.checked })}
                        />
                      }
                      label={t('profile.profileVisibility')}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.twoFactorAuth}
                          onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                        />
                      }
                      label={t('profile.twoFactorAuth')}
                    />
                  </Stack>
                </CardContent>
              </DashboardCard>

              {/* Account Actions */}
              <DashboardCard>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                    {t('profile.accountActions')}
                  </Typography>

                  <Stack spacing={2}>
                    <Alert severity="info">
                      {t('profile.dataExportInfo')}
                    </Alert>
                    
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<IconShield />}
                        sx={{ borderRadius: 2 }}
                      >
                        {t('profile.changePassword')}
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                      >
                        {t('profile.exportData')}
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ borderRadius: 2 }}
                      >
                        {t('profile.deleteAccount')}
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </DashboardCard>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default Profile;
