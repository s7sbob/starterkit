// src/views/public/PublicCard.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
  Fab,
  Dialog,
  DialogContent,
  Alert,
  CircularProgress,
  Tooltip,
  Slide
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconDownload,
  IconShare,
  IconQrcode,
  IconMail,
  IconPhone,
  IconWorld,
  IconMapPin,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconX,
  IconCheck,
  IconCopy,
  IconHeart,
  IconHeartFilled
} from '@tabler/icons-react';
import { alpha } from '@mui/material/styles';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface CardData {
  id: string | undefined;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  bio: string;
  avatar: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  socialLinks: SocialLink[];
  template: string;
  primaryColor: string;
  backgroundColor: string;
  allowDownload: boolean;
  showQR: boolean;
  isPublic: boolean;
  views: number;
  likes: number;
  qrCode: string;
}

const PublicCard = () => {
  const { username, cardId } = useParams();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [qrDialog, setQrDialog] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    loadPublicCard();
    trackView();
  }, [username, cardId]);

  const loadPublicCard = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCardData = {
        id: cardId || username,
        firstName: 'أحمد',
        lastName: 'محمد',
        jobTitle: 'مطور تطبيقات محترف',
        company: 'شركة التقنية المتقدمة',
        bio: 'مطور تطبيقات محترف مع خبرة 5 سنوات في تطوير التطبيقات المحمولة والويب. متخصص في React Native و Flutter مع شغف بالتقنيات الحديثة والحلول الإبداعية.',
        avatar: '/images/avatars/user1.jpg',
        email: 'ahmed.mohammed@techcompany.com',
        phone: '+966501234567',
        website: 'https://ahmed-dev.com',
        address: 'الرياض، المملكة العربية السعودية',
        socialLinks: [
          { id: '1', platform: 'linkedin', url: 'https://linkedin.com/in/ahmed-mohammed' },
          { id: '2', platform: 'twitter', url: 'https://twitter.com/ahmed_dev' },
          { id: '3', platform: 'github', url: 'https://github.com/ahmed-mohammed' },
          { id: '4', platform: 'instagram', url: 'https://instagram.com/ahmed_dev' }
        ],
        template: 'modern',
        primaryColor: '#1976d2',
        backgroundColor: '#ffffff',
        allowDownload: true,
        showQR: true,
        isPublic: true,
        views: 1234,
        likes: 89,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.href)}`
      };
      
      setCardData(mockCardData);
      setViewCount(mockCardData.views);
    } catch (error) {
      console.error('Failed to load public card:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackView = async () => {
    try {
      // Track view analytics
      setViewCount(prev => prev + 1);
    } catch (error) {
      console.error('Failed to track view:', error);
    }
  };

  const handleDownload = async () => {
    if (!cardData?.allowDownload) return;
    
    try {
      // Generate vCard format
      const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${cardData.firstName} ${cardData.lastName}
ORG:${cardData.company}
TITLE:${cardData.jobTitle}
EMAIL:${cardData.email}
TEL:${cardData.phone}
URL:${cardData.website}
ADR:;;${cardData.address};;;;
NOTE:${cardData.bio}
END:VCARD`;

      const blob = new Blob([vCard], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cardData.firstName}-${cardData.lastName}.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download card:', error);
    }
  };

  const handleShare = async () => {
    if (!cardData) return;
    const shareData = {
      title: `${cardData.firstName} ${cardData.lastName} - ${cardData.jobTitle}`,
      text: cardData.bio,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Failed to share:', error);
        setShareDialog(true);
      }
    } else {
      setShareDialog(true);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleLike = async () => {
    try {
      setLiked(!liked);
      // API call to like/unlike
    } catch (error) {
      console.error('Failed to like card:', error);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return IconBrandLinkedin;
      case 'twitter': return IconBrandTwitter;
      case 'facebook': return IconBrandFacebook;
      case 'instagram': return IconBrandInstagram;
      default: return IconWorld;
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.grey[100]
        }}
      >
        <Stack alignItems="center" spacing={3}>
          <CircularProgress size={64} thickness={4} />
          <Typography variant="h6" color="text.secondary">
            {t('publicCard.loading')}
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (!cardData || !cardData.isPublic) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.grey[100]
        }}
      >
        <Container maxWidth="sm">
          <Alert severity="error" sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t('publicCard.notFound')}
            </Typography>
            <Typography variant="body2">
              {t('publicCard.notFoundDescription')}
            </Typography>
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.grey[100],
        py: { xs: 2, md: 4 }
      }}
    >
      <Container maxWidth="md">
        {/* Main Card */}
        <Card
          sx={{
            borderRadius: { xs: 3, md: 4 },
            overflow: 'hidden',
            boxShadow: theme.shadows[12],
            background: `linear-gradient(135deg, ${cardData.primaryColor} 0%, ${alpha(cardData.primaryColor, 0.8)} 100%)`,
            position: 'relative',
            mb: 3
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

          <CardContent sx={{ p: { xs: 3, md: 4 }, position: 'relative' }}>
            <Stack spacing={4}>
              {/* Header Section */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                <Avatar
                  src={cardData.avatar}
                  sx={{
                    width: { xs: 120, md: 150 },
                    height: { xs: 120, md: 150 },
                    border: `4px solid ${alpha('#ffffff', 0.3)}`,
                    boxShadow: theme.shadows[8]
                  }}
                >
                  {cardData.firstName?.[0]}{cardData.lastName?.[0]}
                </Avatar>
                
                <Stack spacing={2} sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                  <Stack spacing={1}>
                    <Typography
                      variant={isMobile ? 'h4' : 'h3'}
                      sx={{
                        color: 'white',
                        fontWeight: 800,
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      {cardData.firstName} {cardData.lastName}
                    </Typography>
                    
                    <Typography
                      variant={isMobile ? 'h6' : 'h5'}
                      sx={{
                        color: alpha('#ffffff', 0.95),
                        fontWeight: 500
                      }}
                    >
                      {cardData.jobTitle}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        color: alpha('#ffffff', 0.9),
                        fontWeight: 400
                      }}
                    >
                      {cardData.company}
                    </Typography>
                  </Stack>

                  {/* Stats */}
                  <Stack direction="row" spacing={3} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                    <Stack alignItems="center">
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                        {viewCount.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.8) }}>
                        {t('publicCard.views')}
                      </Typography>
                    </Stack>
                    
                    <Stack alignItems="center">
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                        {cardData.likes?.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.8) }}>
                        {t('publicCard.likes')}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>

                {/* Action Buttons */}
                <Stack direction={{ xs: 'row', sm: 'column' }} spacing={1}>
                  <Tooltip title={liked ? t('publicCard.unlike') : t('publicCard.like')}>
                    <IconButton
                      onClick={handleLike}
                      sx={{
                        backgroundColor: alpha('#ffffff', 0.2),
                        color: 'white',
                        '&:hover': {
                          backgroundColor: alpha('#ffffff', 0.3)
                        }
                      }}
                    >
                      {liked ? <IconHeartFilled /> : <IconHeart />}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={t('publicCard.share')}>
                    <IconButton
                      onClick={handleShare}
                      sx={{
                        backgroundColor: alpha('#ffffff', 0.2),
                        color: 'white',
                        '&:hover': {
                          backgroundColor: alpha('#ffffff', 0.3)
                        }
                      }}
                    >
                      <IconShare />
                    </IconButton>
                  </Tooltip>

                  {cardData.showQR && (
                    <Tooltip title={t('publicCard.showQR')}>
                      <IconButton
                        onClick={() => setQrDialog(true)}
                        sx={{
                          backgroundColor: alpha('#ffffff', 0.2),
                          color: 'white',
                          '&:hover': {
                            backgroundColor: alpha('#ffffff', 0.3)
                          }
                        }}
                      >
                        <IconQrcode />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              </Stack>

              {/* Bio */}
              {cardData.bio && (
                <Typography
                  variant="body1"
                  sx={{
                    color: alpha('#ffffff', 0.95),
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.6,
                    textAlign: { xs: 'center', sm: 'left' }
                  }}
                >
                  {cardData.bio}
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: theme.shadows[4],
            mb: 3
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
              {t('publicCard.contactInfo')}
            </Typography>
            
            <Stack spacing={2}>
              {cardData.email && (
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.grey[50],
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.grey[100],
                      transform: 'translateX(4px)'
                    }
                  }}
                  component="a"
                  href={`mailto:${cardData.email}`}
                >
                  <IconMail size={24} color={theme.palette.primary.main} />
                  <Typography variant="body1" sx={{ flex: 1 }}>
                    {cardData.email}
                  </Typography>
                </Stack>
              )}

              {cardData.phone && (
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.grey[50],
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.grey[100],
                      transform: 'translateX(4px)'
                    }
                  }}
                  component="a"
                  href={`tel:${cardData.phone}`}
                >
                  <IconPhone size={24} color={theme.palette.success.main} />
                  <Typography variant="body1" sx={{ flex: 1 }}>
                    {cardData.phone}
                  </Typography>
                </Stack>
              )}

              {cardData.website && (
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.grey[50],
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.grey[100],
                      transform: 'translateX(4px)'
                    }
                  }}
                  component="a"
                  href={cardData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconWorld size={24} color={theme.palette.info.main} />
                  <Typography variant="body1" sx={{ flex: 1 }}>
                    {cardData.website}
                  </Typography>
                </Stack>
              )}

              {cardData.address && (
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.grey[50]
                  }}
                >
                  <IconMapPin size={24} color={theme.palette.warning.main} />
                  <Typography variant="body1" sx={{ flex: 1 }}>
                    {cardData.address}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Social Links */}
        {cardData.socialLinks && cardData.socialLinks.length > 0 && (
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: theme.shadows[4],
              mb: 3
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                {t('publicCard.socialLinks')}
              </Typography>
              
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {cardData.socialLinks.map((link, index) => {
                  const Icon = getSocialIcon(link.platform);
                  return (
                    <Button
                      key={index}
                      variant="outlined"
                      startIcon={<Icon size={20} />}
                      component="a"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1.5,
                        textTransform: 'capitalize',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4]
                        }
                      }}
                    >
                      {link.platform}
                    </Button>
                  );
                })}
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Download Button */}
        {cardData.allowDownload && (
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: theme.shadows[4]
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                {t('publicCard.saveContact')}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {t('publicCard.saveContactDescription')}
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                startIcon={<IconDownload />}
                onClick={handleDownload}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem'
                }}
              >
                {t('publicCard.downloadContact')}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Floating Copy Link Button - Mobile */}
        {isMobile && (
          <Fab
            color="primary"
            onClick={handleCopyLink}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000
            }}
          >
            {copied ? <IconCheck /> : <IconCopy />}
          </Fab>
        )}

        {/* QR Dialog */}
        <Dialog
          open={qrDialog}
          onClose={() => setQrDialog(false)}
          maxWidth="sm"
          fullWidth
          TransitionComponent={(props) => <Slide direction="up" {...props} />}
        >
          <DialogContent sx={{ p: 4 }}>
            <Stack spacing={3} alignItems="center">
              <IconButton
                onClick={() => setQrDialog(false)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8
                }}
              >
                <IconX />
              </IconButton>
              
              <Typography variant="h6" fontWeight={600}>
                {t('publicCard.qrCode')}
              </Typography>
              
              <Box
                sx={{
                  p: 3,
                  backgroundColor: 'white',
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <img
                  src={cardData.qrCode}
                  alt="QR Code"
                  style={{ width: 250, height: 250, display: 'block' }}
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" textAlign="center">
                {t('publicCard.qrDescription')}
              </Typography>
              
              <Button
                variant="contained"
                startIcon={<IconDownload />}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = cardData.qrCode;
                  link.download = `${cardData.firstName}-${cardData.lastName}-qr.png`;
                  link.click();
                }}
                sx={{ borderRadius: 2 }}
              >
                {t('publicCard.downloadQR')}
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>

        {/* Share Dialog */}
        <Dialog
          open={shareDialog}
          onClose={() => setShareDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent sx={{ p: 4 }}>
            <Stack spacing={3} alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                {t('publicCard.shareCard')}
              </Typography>
              
              <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                <Button
                  variant="outlined"
                  startIcon={copied ? <IconCheck /> : <IconCopy />}
                  onClick={handleCopyLink}
                  fullWidth
                  color={copied ? 'success' : 'primary'}
                  sx={{ borderRadius: 2 }}
                >
                  {copied ? t('publicCard.copied') : t('publicCard.copyLink')}
                </Button>
                
                <Button
                  variant="outlined"
                  onClick={() => setShareDialog(false)}
                  sx={{ borderRadius: 2 }}
                >
                  {t('common.close')}
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default PublicCard;
