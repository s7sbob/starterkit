// src/views/cards/components/CardPreviewComponent.tsx
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Stack,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import {
  IconMail,
  IconPhone,
  IconWorld,
  IconMapPin,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconQrcode
} from '@tabler/icons-react';

interface CardPreviewProps {
  cardData: any;
  isPreview: boolean;
  scale?: number;
}

const CardPreviewComponent = ({ cardData, isPreview, scale = 1 }: CardPreviewProps) => {
  const theme = useTheme();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return IconBrandLinkedin;
      case 'twitter': return IconBrandTwitter;
      case 'facebook': return IconBrandFacebook;
      case 'instagram': return IconBrandInstagram;
      default: return IconWorld;
    }
  };

  return (
    <Box
      sx={{
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        width: isPreview ? '100%' : 350,
        maxWidth: '100%'
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: theme.shadows[8],
          background: `linear-gradient(135deg, ${cardData.primaryColor || theme.palette.primary.main} 0%, ${alpha(cardData.primaryColor || theme.palette.primary.main, 0.8)} 100%)`,
          position: 'relative'
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 20% 80%, ${alpha('#ffffff', 0.1)} 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, ${alpha('#ffffff', 0.1)} 0%, transparent 50%)`,
            pointerEvents: 'none'
          }}
        />

        <CardContent sx={{ p: 3, position: 'relative' }}>
          <Stack spacing={3}>
            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={cardData.avatar ? URL.createObjectURL(cardData.avatar) : undefined}
                  sx={{
                    width: 60,
                    height: 60,
                    border: `3px solid ${alpha('#ffffff', 0.3)}`
                  }}
                >
                  {cardData.firstName?.[0]}{cardData.lastName?.[0]}
                </Avatar>
                
                <Stack spacing={0.5}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '1.1rem'
                    }}
                  >
                    {cardData.firstName} {cardData.lastName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: alpha('#ffffff', 0.9),
                      fontSize: '0.9rem'
                    }}
                  >
                    {cardData.jobTitle}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: alpha('#ffffff', 0.8),
                      fontSize: '0.8rem'
                    }}
                  >
                    {cardData.company}
                  </Typography>
                </Stack>
              </Stack>

              {cardData.showQR && (
                <IconButton
                  sx={{
                    backgroundColor: alpha('#ffffff', 0.2),
                    color: 'white',
                    '&:hover': {
                      backgroundColor: alpha('#ffffff', 0.3)
                    }
                  }}
                >
                  <IconQrcode size={20} />
                </IconButton>
              )}
            </Stack>

            {/* Bio */}
            {cardData.bio && (
              <Typography
                variant="body2"
                sx={{
                  color: alpha('#ffffff', 0.9),
                  fontSize: '0.85rem',
                  lineHeight: 1.5
                }}
              >
                {cardData.bio}
              </Typography>
            )}

            {/* Contact Info */}
            <Stack spacing={1.5}>
              {cardData.email && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconMail size={16} color={alpha('#ffffff', 0.8)} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: alpha('#ffffff', 0.9),
                      fontSize: '0.8rem'
                    }}
                  >
                    {cardData.email}
                  </Typography>
                </Stack>
              )}

              {cardData.phone && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconPhone size={16} color={alpha('#ffffff', 0.8)} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: alpha('#ffffff', 0.9),
                      fontSize: '0.8rem'
                    }}
                  >
                    {cardData.phone}
                  </Typography>
                </Stack>
              )}

              {cardData.website && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconWorld size={16} color={alpha('#ffffff', 0.8)} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: alpha('#ffffff', 0.9),
                      fontSize: '0.8rem'
                    }}
                  >
                    {cardData.website}
                  </Typography>
                </Stack>
              )}

              {cardData.address && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconMapPin size={16} color={alpha('#ffffff', 0.8)} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: alpha('#ffffff', 0.9),
                      fontSize: '0.8rem'
                    }}
                  >
                    {cardData.address}
                  </Typography>
                </Stack>
              )}
            </Stack>

            {/* Social Links */}
            {cardData.socialLinks && cardData.socialLinks.length > 0 && (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {cardData.socialLinks.map((link: any, index: number) => {
                  const Icon = getSocialIcon(link.platform);
                  return (
                    <IconButton
                      key={index}
                      size="small"
                      sx={{
                        backgroundColor: alpha('#ffffff', 0.2),
                        color: 'white',
                        '&:hover': {
                          backgroundColor: alpha('#ffffff', 0.3)
                        }
                      }}
                    >
                      <Icon size={16} />
                    </IconButton>
                  );
                })}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardPreviewComponent;
