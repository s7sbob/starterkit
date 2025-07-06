// src/views/cards/CardPreview.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  Box,
  Container,
  Grid2 as Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  CircularProgress,
  Tooltip,
  Zoom,
  TextField,
  InputAdornment
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconArrowLeft,
  IconEdit,
  IconShare,
  IconDownload,
  IconQrcode,
  IconCopy,
  IconCheck,
  IconEye,
  IconMail,
  IconPhone,
  IconWorld,
  IconMapPin,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMaximize, // استبدال IconFullscreen
  IconX,
  IconDeviceMobile,
  IconDeviceDesktop,
  IconZoomIn,
  IconZoomOut
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import CardPreviewComponent from './components/CardPreviewComponent';

// تعريف نوع البيانات
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
  socialLinks: Array<{
    id: string;
    platform: string;
    url: string;
  }>;
  template: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: number;
  borderRadius: number;
  showShadow: boolean;
  showBorder: boolean;
  showPattern: boolean;
  opacity: number;
  isPublic: boolean;
  allowDownload: boolean;
  showQR: boolean;
  status: string;
  views: number;
  shares: number;
  qrScans: number;
  qrCode: string;
}

const CardPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [viewMode, setViewMode] = useState('desktop');
  const [scale, setScale] = useState(1);
  const [fullscreenDialog, setFullscreenDialog] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);
  const [qrDialog, setQrDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadCardData();
  }, [id]);

  const loadCardData = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCardData: CardData = {
        id: id,
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
        textColor: '#000000',
        fontFamily: 'roboto',
        fontSize: 16,
        borderRadius: 16,
        showShadow: true,
        showBorder: false,
        showPattern: true,
        opacity: 1,
        isPublic: true,
        allowDownload: true,
        showQR: true,
        status: 'active',
        views: 1234,
        shares: 89,
        qrScans: 456,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`https://mazyone.com/card/${id}`)}`
      };
      
      setCardData(mockCardData);
    } catch (error) {
      console.error('Failed to load card data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://mazyone.com/card/${id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleDownload = async () => {
    if (!cardData) return;
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = 400;
      canvas.height = 600;
      
      ctx.fillStyle = cardData.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (!blob) return;
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${cardData.firstName}-${cardData.lastName}-card.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Failed to download card:', error);
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
      <PageContainer title={t('cardPreview.title')} description={t('cardPreview.description')}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh'
            }}
          >
            <Stack alignItems="center" spacing={3}>
              <CircularProgress size={64} thickness={4} />
              <Typography variant="h6" color="text.secondary">
                {t('cardPreview.loading')}
              </Typography>
            </Stack>
          </Box>
        </Container>
      </PageContainer>
    );
  }

  if (!cardData) {
    return (
      <PageContainer title={t('cardPreview.title')} description={t('cardPreview.description')}>
        <Container maxWidth="xl">
          <Alert severity="error" sx={{ mt: 3 }}>
            {t('cardPreview.notFound')}
          </Alert>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={t('cardPreview.title')} description={t('cardPreview.description')}>
      <Container maxWidth="xl">
        {/* Header */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', md: 'center' }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              startIcon={<IconArrowLeft />}
              onClick={() => navigate('/dashboard/cards')}
              sx={{ borderRadius: 2 }}
            >
              {t('common.back')}
            </Button>
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              sx={{ fontWeight: 700, color: theme.palette.text.primary }}
            >
              {t('cardPreview.preview')}
            </Typography>
            <Chip
              label={t(`cards.${cardData.status}`)}
              color={cardData.status === 'active' ? 'success' : 'warning'}
              size="small"
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="outlined"
              startIcon={<IconEdit />}
              onClick={() => navigate(`/dashboard/cards/edit/${id}`)}
              sx={{ borderRadius: 2 }}
            >
              {t('cardPreview.edit')}
            </Button>
            <Button
              variant="outlined"
              startIcon={<IconShare />}
              onClick={() => setShareDialog(true)}
              sx={{ borderRadius: 2 }}
            >
              {t('cardPreview.share')}
            </Button>
            <Button
              variant="contained"
              startIcon={<IconDownload />}
              onClick={handleDownload}
              sx={{ borderRadius: 2 }}
            >
              {t('cardPreview.download')}
            </Button>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {/* Preview Section */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card
              sx={{
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                overflow: 'hidden'
              }}
            >
              <CardContent sx={{ p: 0 }}>
                {/* Toolbar */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    p: 2,
                    backgroundColor: theme.palette.grey[50],
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Stack direction="row" spacing={1}>
                    <Tooltip title={t('cardPreview.desktopView')}>
                      <IconButton
                        size="small"
                        color={viewMode === 'desktop' ? 'primary' : 'default'}
                        onClick={() => setViewMode('desktop')}
                      >
                        <IconDeviceDesktop size={20} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('cardPreview.mobileView')}>
                      <IconButton
                        size="small"
                        color={viewMode === 'mobile' ? 'primary' : 'default'}
                        onClick={() => setViewMode('mobile')}
                      >
                        <IconDeviceMobile size={20} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('cardPreview.fullscreen')}>
                      <IconButton
                        size="small"
                        onClick={() => setFullscreenDialog(true)}
                      >
                        <IconMaximize size={20} />
                      </IconButton>
                    </Tooltip>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Tooltip title={t('cardPreview.zoomOut')}>
                      <IconButton
                        size="small"
                        onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                        disabled={scale <= 0.5}
                      >
                        <IconZoomOut size={20} />
                      </IconButton>
                    </Tooltip>
                    <Typography variant="body2" sx={{ minWidth: 50, textAlign: 'center' }}>
                      {Math.round(scale * 100)}%
                    </Typography>
                    <Tooltip title={t('cardPreview.zoomIn')}>
                      <IconButton
                        size="small"
                        onClick={() => setScale(Math.min(2, scale + 0.1))}
                        disabled={scale >= 2}
                      >
                        <IconZoomIn size={20} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>

                {/* Preview Area */}
                <Box
                  sx={{
                    p: 4,
                    backgroundColor: theme.palette.grey[100],
                    minHeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'auto'
                  }}
                >
                  <Box
                    sx={{
                      transform: `scale(${scale})`,
                      transformOrigin: 'center',
                      transition: 'transform 0.3s ease',
                      maxWidth: viewMode === 'mobile' ? 350 : 400,
                      width: '100%'
                    }}
                  >
                    <CardPreviewComponent
                      cardData={cardData}
                      isPreview={false}
                      scale={1}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Info Panel */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={3}>
              {/* Card Stats */}
              <Card
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    {t('cardPreview.stats')}
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Stack alignItems="center" spacing={1}>
                        <IconEye size={24} color={theme.palette.primary.main} />
                        <Typography variant="h6" fontWeight={600}>
                          {cardData.views?.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t('cardPreview.views')}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid size={6}>
                      <Stack alignItems="center" spacing={1}>
                        <IconShare size={24} color={theme.palette.success.main} />
                        <Typography variant="h6" fontWeight={600}>
                          {cardData.shares?.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t('cardPreview.shares')}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid size={12}>
                      <Stack alignItems="center" spacing={1}>
                        <IconQrcode size={24} color={theme.palette.warning.main} />
                        <Typography variant="h6" fontWeight={600}>
                          {cardData.qrScans?.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t('cardPreview.qrScans')}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    {t('cardPreview.quickActions')}
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={copied ? <IconCheck /> : <IconCopy />}
                      onClick={handleCopyLink}
                      fullWidth
                      color={copied ? 'success' : 'primary'}
                      sx={{ borderRadius: 2 }}
                    >
                      {copied ? t('cardPreview.copied') : t('cardPreview.copyLink')}
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<IconQrcode />}
                      onClick={() => setQrDialog(true)}
                      fullWidth
                      sx={{ borderRadius: 2 }}
                    >
                      {t('cardPreview.showQR')}
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<IconDownload />}
                      onClick={handleDownload}
                      fullWidth
                      sx={{ borderRadius: 2 }}
                    >
                      {t('cardPreview.downloadCard')}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    {t('cardPreview.contactInfo')}
                  </Typography>
                  
                  <List sx={{ p: 0 }}>
                    {cardData.email && (
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <IconMail size={20} color={theme.palette.text.secondary} />
                        </ListItemIcon>
                        <ListItemText
                          primary={cardData.email}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    )}
                    
                    {cardData.phone && (
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <IconPhone size={20} color={theme.palette.text.secondary} />
                        </ListItemIcon>
                        <ListItemText
                          primary={cardData.phone}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    )}
                    
                    {cardData.website && (
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <IconWorld size={20} color={theme.palette.text.secondary} />
                        </ListItemIcon>
                        <ListItemText
                          primary={cardData.website}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    )}
                    
                    {cardData.address && (
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <IconMapPin size={20} color={theme.palette.text.secondary} />
                        </ListItemIcon>
                        <ListItemText
                          primary={cardData.address}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    )}
                  </List>

                  {cardData.socialLinks && cardData.socialLinks.length > 0 && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                        {t('cardPreview.socialLinks')}
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {cardData.socialLinks.map((link: any, index: number) => {
                          const Icon = getSocialIcon(link.platform);
                          return (
                            <IconButton
                              key={index}
                              size="small"
                              component="a"
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                backgroundColor: theme.palette.grey[100],
                                '&:hover': {
                                  backgroundColor: theme.palette.primary.light
                                }
                              }}
                            >
                              <Icon size={16} />
                            </IconButton>
                          );
                        })}
                      </Stack>
                    </>
                  )}
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        {/* Fullscreen Dialog */}
        <Dialog
          open={fullscreenDialog}
          onClose={() => setFullscreenDialog(false)}
          maxWidth={false}
          fullScreen
          TransitionComponent={Zoom}
        >
          <DialogContent
            sx={{
              p: 0,
              backgroundColor: theme.palette.grey[900],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <IconButton
              onClick={() => setFullscreenDialog(false)}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)'
                }
              }}
            >
              <IconX />
            </IconButton>
            
            <CardPreviewComponent
              cardData={cardData}
              isPreview={false}
              scale={isMobile ? 0.8 : 1.2}
            />
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
                {t('cardPreview.shareCard')}
              </Typography>
              
              <TextField
                fullWidth
                label={t('cardPreview.cardLink')}
                value={`https://mazyone.com/card/${id}`}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleCopyLink}>
                        {copied ? <IconCheck color="success" /> : <IconCopy />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => setShareDialog(false)}
                  sx={{ borderRadius: 2 }}
                >
                  {t('common.close')}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<IconQrcode />}
                  onClick={() => {
                    setShareDialog(false);
                    setQrDialog(true);
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  {t('cardPreview.showQR')}
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>

        {/* QR Dialog */}
        <Dialog
          open={qrDialog}
          onClose={() => setQrDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent sx={{ p: 4 }}>
            <Stack spacing={3} alignItems="center">
              <Typography variant="h6" fontWeight={600}>
                {t('cardPreview.qrCode')}
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
                {t('cardPreview.qrDescription')}
              </Typography>
              
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => setQrDialog(false)}
                  sx={{ borderRadius: 2 }}
                >
                  {t('common.close')}
                </Button>
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
                  {t('cardPreview.downloadQR')}
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      </Container>
    </PageContainer>
  );
};

export default CardPreview;
