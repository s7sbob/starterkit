// src/views/cards/EditCard.tsx
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
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Snackbar,
  Breadcrumbs,
  Link,
  Switch,
  FormControlLabel
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconArrowLeft,
  IconDeviceFloppy, // استبدال IconSave
  IconTrash,
  IconEye,
  IconCopy,
  IconEdit,
  IconRefresh} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import BasicInfoStep from './components/BasicInfoStep';
import ContactInfoForm from './components/ContactInfoForm';
import SocialLinksManager from './components/SocialLinksManager';
import DesignCustomizer from './components/DesignCustomizer';
import CardPreviewComponent from './components/CardPreviewComponent';

// تعريف نوع البيانات
interface CardData {
  id: string | undefined;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  bio: string;
  avatar: File | null;
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
  createdAt: string;
  updatedAt: string;
  views: number;
  shares: number;
}

type AlertSeverity = 'success' | 'error' | 'warning' | 'info';

const EditCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [originalData, setOriginalData] = useState<CardData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [discardDialog, setDiscardDialog] = useState(false);
  const [snackbar, setSnackbar] = useState<{ 
    open: boolean; 
    message: string; 
    severity: AlertSeverity 
  }>({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const tabs = [
    { label: t('editCard.tabs.basicInfo'), icon: IconEdit },
    { label: t('editCard.tabs.contact'), icon: IconEdit },
    { label: t('editCard.tabs.social'), icon: IconEdit },
    { label: t('editCard.tabs.design'), icon: IconEdit },
    { label: t('editCard.tabs.preview'), icon: IconEye }
  ];

  useEffect(() => {
    loadCardData();
  }, [id]);

  useEffect(() => {
    if (cardData && originalData) {
      const hasChanged = JSON.stringify(cardData) !== JSON.stringify(originalData);
      setHasChanges(hasChanged);
    }
  }, [cardData, originalData]);

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
        bio: 'مطور تطبيقات محترف مع خبرة 5 سنوات في تطوير التطبيقات المحمولة والويب. متخصص في React Native و Flutter.',
        avatar: null,
        email: 'ahmed.mohammed@techcompany.com',
        phone: '+966501234567',
        website: 'https://ahmed-dev.com',
        address: 'الرياض، المملكة العربية السعودية',
        socialLinks: [
          { id: '1', platform: 'linkedin', url: 'https://linkedin.com/in/ahmed-mohammed' },
          { id: '2', platform: 'twitter', url: 'https://twitter.com/ahmed_dev' },
          { id: '3', platform: 'github', url: 'https://github.com/ahmed-mohammed' }
        ],
        template: 'modern',
        primaryColor: theme.palette.primary.main,
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
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        views: 1234,
        shares: 89
      };
      
      setCardData(mockCardData);
      setOriginalData(JSON.parse(JSON.stringify(mockCardData)));
      setLastSaved(new Date(mockCardData.updatedAt));
    } catch (error) {
      console.error('Failed to load card data:', error);
      setSnackbar({
        open: true,
        message: t('editCard.errors.loadFailed'),
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

const updateCardData = (field: string, value: any) => {
  setCardData(prev => prev ? ({
    ...prev,
    [field]: value
  }) : null);
};

  const handleSave = async () => {
    try {
      setSaving(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (cardData) {
        setOriginalData(JSON.parse(JSON.stringify(cardData)));
        setLastSaved(new Date());
        setSnackbar({
          open: true,
          message: t('editCard.success.saved'),
          severity: 'success'
        });
      }
    } catch (error) {
      console.error('Failed to save card:', error);
      setSnackbar({
        open: true,
        message: t('editCard.errors.saveFailed'),
        severity: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (originalData) {
      setCardData(JSON.parse(JSON.stringify(originalData)));
      setDiscardDialog(false);
      setSnackbar({
        open: true,
        message: t('editCard.success.discarded'),
        severity: 'info'
      });
    }
  };

  const handleDelete = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDeleteDialog(false);
      navigate('/dashboard/cards');
      setSnackbar({
        open: true,
        message: t('editCard.success.deleted'),
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to delete card:', error);
      setSnackbar({
        open: true,
        message: t('editCard.errors.deleteFailed'),
        severity: 'error'
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://mazyone.com/card/${id}`);
      setSnackbar({
        open: true,
        message: t('editCard.success.linkCopied'),
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const renderTabContent = () => {
    if (!cardData) return null;

    switch (activeTab) {
      case 0:
        return (
          <BasicInfoStep
            cardData={cardData}
            updateCardData={updateCardData}
            isMobile={isMobile}
          />
        );
      case 1:
        return (
          <ContactInfoForm
            cardData={cardData}
            updateCardData={updateCardData}
            isMobile={isMobile}
          />
        );
      case 2:
        return (
          <SocialLinksManager
            socialLinks={cardData.socialLinks}
            updateSocialLinks={(links) => updateCardData('socialLinks', links)}
            isMobile={isMobile}
          />
        );
      case 3:
        return (
          <DesignCustomizer
            cardData={cardData}
            updateCardData={updateCardData}
            isMobile={isMobile}
          />
        );
      case 4:
        return (
          <PreviewTab
            cardData={cardData}
            updateCardData={updateCardData}
            isMobile={isMobile}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <PageContainer title={t('editCard.title')} description={t('editCard.description')}>
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
                {t('editCard.loading')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('editCard.loadingDescription')}
              </Typography>
            </Stack>
          </Box>
        </Container>
      </PageContainer>
    );
  }

  if (!cardData) {
    return (
      <PageContainer title={t('editCard.title')} description={t('editCard.description')}>
        <Container maxWidth="xl">
          <Stack spacing={3} alignItems="center" sx={{ mt: 6 }}>
            <Alert severity="error" sx={{ maxWidth: 600 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {t('editCard.errors.notFound')}
              </Typography>
              <Typography variant="body2">
                {t('editCard.errors.notFoundDescription')}
              </Typography>
            </Alert>
            <Button
              variant="contained"
              onClick={() => navigate('/dashboard/cards')}
              sx={{ borderRadius: 2 }}
            >
              {t('editCard.backToCards')}
            </Button>
          </Stack>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={t('editCard.title')} description={t('editCard.description')}>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/dashboard')}
            sx={{ textDecoration: 'none' }}
          >
            {t('common.dashboard')}
          </Link>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate('/dashboard/cards')}
            sx={{ textDecoration: 'none' }}
          >
            {t('common.cards')}
          </Link>
          <Typography variant="body2" color="text.primary">
            {cardData.firstName} {cardData.lastName}
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            mb: 3,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'stretch', md: 'center' }}
            spacing={2}
          >
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="outlined"
                  startIcon={<IconArrowLeft />}
                  onClick={() => {
                    if (hasChanges) {
                      setDiscardDialog(true);
                    } else {
                      navigate('/dashboard/cards');
                    }
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  {t('common.back')}
                </Button>
                <Typography
                  variant={isMobile ? 'h5' : 'h4'}
                  sx={{ fontWeight: 700, color: theme.palette.text.primary }}
                >
                  {t('editCard.editCard')}
                </Typography>
                <Chip
                  label={t(`cards.${cardData.status}`)}
                  color={cardData.status === 'active' ? 'success' : 'warning'}
                  size="small"
                />
              </Stack>

              <Stack direction="row" spacing={3} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  {t('editCard.lastSaved')}: {lastSaved?.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cardData.views} {t('cards.views')} • {cardData.shares} {t('cards.shares')}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              {hasChanges && (
                <Alert severity="warning" sx={{ py: 0, px: 2 }}>
                  <Typography variant="body2">
                    {t('editCard.unsavedChanges')}
                  </Typography>
                </Alert>
              )}

              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<IconEye />}
                  onClick={() => navigate(`/dashboard/cards/preview/${id}`)}
                  sx={{ borderRadius: 2 }}
                >
                  {isMobile ? t('common.preview') : t('editCard.preview')}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<IconCopy />}
                  onClick={handleCopyLink}
                  sx={{ borderRadius: 2 }}
                >
                  {isMobile ? t('common.copy') : t('editCard.copyLink')}
                </Button>

                <Button
                  variant="contained"
                  startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <IconDeviceFloppy />}
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  sx={{ borderRadius: 2 }}
                >
                  {saving ? t('editCard.saving') : t('editCard.save')}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>

        {/* Stepper - Desktop */}
        {!isMobile && (
          <Paper
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Stepper activeStep={activeTab} alternativeLabel>
              {tabs.map((tab, index) => (
                <Step key={index} completed={false}>
                  <StepLabel
                    onClick={() => setActiveTab(index)}
                    sx={{
                      cursor: 'pointer',
                      '& .MuiStepLabel-label': {
                        fontWeight: activeTab === index ? 600 : 400
                      }
                    }}
                  >
                    {tab.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        )}

        {/* Mobile Tab Navigation */}
        {isMobile && (
          <Paper
            sx={{
              mb: 2,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Stack direction="row" sx={{ overflowX: 'auto', p: 1 }}>
              {tabs.map((tab, index) => (
                <Button
                  key={index}
                  variant={activeTab === index ? 'contained' : 'text'}
                  onClick={() => setActiveTab(index)}
                  size="small"
                  sx={{
                    minWidth: 'auto',
                    borderRadius: 2,
                    mx: 0.5,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </Button>
              ))}
            </Stack>
          </Paper>
        )}

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Form Section */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card
              sx={{
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                minHeight: 600
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                {renderTabContent()}
              </CardContent>
            </Card>
          </Grid>

          {/* Preview Section - Desktop */}
          {!isMobile && activeTab !== 4 && (
            <Grid size={{ xs: 12, lg: 4 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  position: 'sticky',
                  top: 20
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={600}>
                      {t('editCard.livePreview')}
                    </Typography>
                    <CardPreviewComponent
                      cardData={cardData}
                      isPreview={true}
                      scale={0.8}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        {/* Navigation Buttons */}
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            mt: 3,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="outlined"
              onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
              disabled={activeTab === 0}
              sx={{ borderRadius: 2 }}
            >
              {t('common.previous')}
            </Button>

            <Stack direction="row" spacing={2}>
              {hasChanges && (
                <Button
                  variant="outlined"
                  startIcon={<IconRefresh />}
                  onClick={() => setDiscardDialog(true)}
                  sx={{ borderRadius: 2 }}
                >
                  {t('editCard.discardChanges')}
                </Button>
              )}

              <Button
                variant="outlined"
                color="error"
                startIcon={<IconTrash />}
                onClick={() => setDeleteDialog(true)}
                sx={{ borderRadius: 2 }}
              >
                {t('editCard.deleteCard')}
              </Button>
            </Stack>

            <Button
              variant="contained"
              onClick={() => setActiveTab(Math.min(tabs.length - 1, activeTab + 1))}
              disabled={activeTab === tabs.length - 1}
              sx={{ borderRadius: 2 }}
            >
              {t('common.next')}
            </Button>
          </Stack>
        </Paper>

        {/* Floating Save Button - Mobile */}
        {isMobile && hasChanges && (
          <Fab
            color="primary"
            onClick={handleSave}
            disabled={saving}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000
            }}
          >
            {saving ? <CircularProgress size={24} color="inherit" /> : <IconDeviceFloppy />}
          </Fab>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog}
          onClose={() => setDeleteDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {t('editCard.deleteConfirmTitle')}
          </DialogTitle>
          <DialogContent>
            <Alert severity="error" sx={{ mb: 2 }}>
              {t('editCard.deleteWarning')}
            </Alert>
            <Typography>
              {t('editCard.deleteConfirmMessage', { 
                cardName: `${cardData.firstName} ${cardData.lastName}` 
              })}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              {t('editCard.confirmDelete')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Discard Changes Dialog */}
        <Dialog
          open={discardDialog}
          onClose={() => setDiscardDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {t('editCard.discardTitle')}
          </DialogTitle>
          <DialogContent>
            <Typography>
              {t('editCard.discardMessage')}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDiscardDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={handleDiscard}
            >
              {t('editCard.confirmDiscard')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </PageContainer>
  );
};

// Preview Tab Component
interface PreviewTabProps {
  cardData: CardData;
  updateCardData: (field: keyof CardData, value: any) => void;
  isMobile: boolean;
}

const PreviewTab = ({ cardData, updateCardData, isMobile }: PreviewTabProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Stack spacing={4}>
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        sx={{ fontWeight: 600, color: theme.palette.text.primary }}
      >
        {t('editCard.finalPreview')}
      </Typography>

      <Alert severity="info">
        {t('editCard.previewDescription')}
      </Alert>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: { xs: 2, md: 4 },
          backgroundColor: theme.palette.grey[50],
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <CardPreviewComponent
          cardData={cardData}
          isPreview={false}
          scale={isMobile ? 0.9 : 1}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              {t('editCard.cardSettings')}
            </Typography>
            
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={cardData.isPublic}
                    onChange={(e) => updateCardData('isPublic', e.target.checked)}
                  />
                }
                label={t('editCard.makePublic')}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={cardData.allowDownload}
                    onChange={(e) => updateCardData('allowDownload', e.target.checked)}
                  />
                }
                label={t('editCard.allowDownload')}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={cardData.showQR}
                    onChange={(e) => updateCardData('showQR', e.target.checked)}
                  />
                }
                label={t('editCard.showQR')}
              />
            </Stack>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              {t('editCard.cardStats')}
            </Typography>
            
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  {t('editCard.totalViews')}:
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {cardData.views?.toLocaleString()}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  {t('editCard.totalShares')}:
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {cardData.shares?.toLocaleString()}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  {t('editCard.created')}:
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {new Date(cardData.createdAt).toLocaleDateString()}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  {t('editCard.lastUpdated')}:
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {new Date(cardData.updatedAt).toLocaleDateString()}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default EditCard;
