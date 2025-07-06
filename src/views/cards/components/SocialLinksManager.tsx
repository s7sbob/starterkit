// src/views/cards/components/SocialLinksManager.tsx
import {
  Stack,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Card,
  CardContent,
  Grid2 as Grid,
  useTheme,
  Box,
  Avatar
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconPlus,
  IconTrash,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandTiktok,
  IconWorld
} from '@tabler/icons-react';

interface SocialLinksManagerProps {
  socialLinks: Array<{id: string, platform: string, url: string}>;
  updateSocialLinks: (links: Array<{id: string, platform: string, url: string}>) => void;
  isMobile: boolean;
}

const SocialLinksManager = ({ socialLinks, updateSocialLinks, isMobile }: SocialLinksManagerProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const platforms = [
    { value: 'linkedin', label: 'LinkedIn', icon: IconBrandLinkedin, color: '#0077B5' },
    { value: 'twitter', label: 'Twitter', icon: IconBrandTwitter, color: '#1DA1F2' },
    { value: 'facebook', label: 'Facebook', icon: IconBrandFacebook, color: '#1877F2' },
    { value: 'instagram', label: 'Instagram', icon: IconBrandInstagram, color: '#E4405F' },
    { value: 'youtube', label: 'YouTube', icon: IconBrandYoutube, color: '#FF0000' },
    { value: 'tiktok', label: 'TikTok', icon: IconBrandTiktok, color: '#000000' },
    { value: 'website', label: 'Website', icon: IconWorld, color: '#666666' }
  ];

  const addSocialLink = () => {
    const newLink = {
      id: Date.now().toString(),
      platform: 'linkedin',
      url: ''
    };
    updateSocialLinks([...socialLinks, newLink]);
  };

  const removeSocialLink = (id: string) => {
    updateSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const updateSocialLink = (id: string, field: string, value: string) => {
    updateSocialLinks(
      socialLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  const getPlatformIcon = (platform: string) => {
    const platformData = platforms.find(p => p.value === platform);
    return platformData ? platformData.icon : IconWorld;
  };

  const getPlatformColor = (platform: string) => {
    const platformData = platforms.find(p => p.value === platform);
    return platformData ? platformData.color : '#666666';
  };

  return (
    <Stack spacing={{ xs: 3, md: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          sx={{ fontWeight: 600, color: theme.palette.text.primary }}
        >
          {t('createCard.socialLinks.title')}
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<IconPlus />}
          onClick={addSocialLink}
          size={isMobile ? 'small' : 'medium'}
          sx={{ borderRadius: 2 }}
        >
          {isMobile ? t('createCard.socialLinks.add') : t('createCard.socialLinks.addLink')}
        </Button>
      </Stack>

      <Typography variant="body2" color="text.secondary">
        {t('createCard.socialLinks.description')}
      </Typography>

      {socialLinks.length === 0 ? (
        <Card
          sx={{
            borderRadius: 2,
            border: `2px dashed ${theme.palette.divider}`,
            backgroundColor: theme.palette.grey[50]
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
            <Stack spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.grey[200],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <IconPlus size={24} color={theme.palette.text.secondary} />
              </Box>
              <Typography variant="h6" color="text.secondary">
                {t('createCard.socialLinks.noLinks')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('createCard.socialLinks.noLinksDescription')}
              </Typography>
              <Button
                variant="contained"
                startIcon={<IconPlus />}
                onClick={addSocialLink}
                sx={{ borderRadius: 2 }}
              >
                {t('createCard.socialLinks.addFirst')}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {socialLinks.map((link, _index) => {
            const Icon = getPlatformIcon(link.platform);
            const color = getPlatformColor(link.platform);
            
            return (
              <Card
                key={link.id}
                sx={{
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: theme.shadows[3]
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Grid container spacing={2} alignItems="center">
                    {/* Platform Icon */}
                    <Grid size={{ xs: 2, sm: 1 }}>
                      <Avatar
                        sx={{
                          backgroundColor: `${color}20`,
                          color: color,
                          width: { xs: 40, md: 48 },
                          height: { xs: 40, md: 48 }
                        }}
                      >
                        <Icon size={isMobile ? 20 : 24} />
                      </Avatar>
                    </Grid>

                    {/* Platform Selection */}
                    <Grid size={{ xs: 10, sm: isMobile ? 4 : 3 }}>
                      <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                        <InputLabel>{t('createCard.socialLinks.platform')}</InputLabel>
                        <Select
                          value={link.platform}
                          label={t('createCard.socialLinks.platform')}
                          onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                          sx={{
                            borderRadius: 2,
                            '& .MuiSelect-select': {
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1
                            }
                          }}
                        >
                          {platforms.map((platform) => {
                            const PlatformIcon = platform.icon;
                            return (
                              <MenuItem key={platform.value} value={platform.value}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  <PlatformIcon size={16} color={platform.color} />
                                  <Typography>{platform.label}</Typography>
                                </Stack>
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* URL Input */}
                    <Grid size={{ xs: 12, sm: isMobile ? 6 : 7 }}>
                      <TextField
                        fullWidth
                        label={t('createCard.socialLinks.url')}
                        value={link.url}
                        onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                        placeholder={`https://...`}
                        size={isMobile ? 'small' : 'medium'}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                          }
                        }}
                      />
                    </Grid>

                    {/* Delete Button */}
                    <Grid size={{ xs: 12, sm: 1 }}>
                      <IconButton
                        onClick={() => removeSocialLink(link.id)}
                        color="error"
                        size={isMobile ? 'small' : 'medium'}
                        sx={{
                          width: '100%',
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.error.light}`,
                          '&:hover': {
                            backgroundColor: theme.palette.error.light
                          }
                        }}
                      >
                        <IconTrash size={isMobile ? 16 : 20} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}

      {/* Popular Platforms Quick Add */}
      {socialLinks.length > 0 && (
        <Card
          sx={{
            borderRadius: 2,
            backgroundColor: theme.palette.grey[50],
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              {t('createCard.socialLinks.quickAdd')}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {platforms.slice(0, 4).map((platform) => {
                const Icon = platform.icon;
                const isAdded = socialLinks.some(link => link.platform === platform.value);
                
                return (
                  <Button
                    key={platform.value}
                    variant={isAdded ? 'contained' : 'outlined'}
                    startIcon={<Icon size={16} />}
                    onClick={() => {
                      if (!isAdded) {
                        const newLink = {
                          id: Date.now().toString(),
                          platform: platform.value,
                          url: ''
                        };
                        updateSocialLinks([...socialLinks, newLink]);
                      }
                    }}
                    disabled={isAdded}
                    size="small"
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      backgroundColor: isAdded ? platform.color : 'transparent',
                      borderColor: platform.color,
                      color: isAdded ? 'white' : platform.color,
                      '&:hover': {
                        backgroundColor: isAdded ? platform.color : `${platform.color}20`
                      }
                    }}
                  >
                    {platform.label}
                  </Button>
                );
              })}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
};

export default SocialLinksManager;
