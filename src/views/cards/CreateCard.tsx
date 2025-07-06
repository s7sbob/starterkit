// src/views/cards/CreateCard.tsx
import React, { useState } from 'react';
import {
  Box,
  Grid2 as Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  IconButton,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Alert
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconCamera,
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconUpload} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import CardPreviewComponent from './components/CardPreviewComponent';
import SocialLinksManager from './components/SocialLinksManager';
import ContactInfoForm from './components/ContactInfoForm';
import DesignCustomizer from './components/DesignCustomizer';

const CreateCard = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [activeStep, setActiveStep] = useState(0);
  const [cardData, setCardData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    jobTitle: '',
    company: '',
    bio: '',
    avatar: null as File | null,
    
    // Contact Info
    email: '',
    phone: '',
    website: '',
    address: '',
    
    // Social Links
    socialLinks: [] as Array<{id: string, platform: string, url: string}>,
    
    // Design
    template: 'modern',
    primaryColor: theme.palette.primary.main,
    backgroundColor: '#ffffff',
    textColor: '#000000',
    
    // Settings
    isPublic: true,
    allowDownload: true,
    showQR: true
  });

  const steps = [
    t('createCard.steps.basicInfo'),
    t('createCard.steps.contactInfo'),
    t('createCard.steps.socialLinks'),
    t('createCard.steps.design'),
    t('createCard.steps.preview')
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSave = async () => {
    try {
      console.log('Saving card:', cardData);
      // API call here
      // navigate('/dashboard/cards');
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const updateCardData = (field: string, value: any) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

const renderStepContent = () => {
  switch (activeStep) {
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
        <PreviewStep
          cardData={cardData}
          updateCardData={updateCardData} // إضافة هذا السطر
          isMobile={isMobile}
        />
      );
    default:
      return null;
  }
};

  return (
    <PageContainer title={t('createCard.title')} description={t('createCard.description')}>
      <Box sx={{ pb: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: { xs: 2, md: 3 } }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary
            }}
          >
            {t('createCard.title')}
          </Typography>
          
          <Button
            variant="outlined"
            startIcon={<IconArrowLeft />}
            href="/dashboard/cards"
            sx={{
              borderRadius: 2,
              px: { xs: 2, md: 3 }
            }}
          >
            {isMobile ? t('common.back') : t('createCard.backToCards')}
          </Button>
        </Stack>

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
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        )}

        {/* Mobile Progress */}
        {isMobile && (
          <Card sx={{ mb: 2, borderRadius: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    {t('createCard.step')} {activeStep + 1} {t('createCard.of')} {steps.length}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {Math.round(((activeStep + 1) / steps.length) * 100)}%
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    width: '100%',
                    height: 4,
                    backgroundColor: theme.palette.grey[200],
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      width: `${((activeStep + 1) / steps.length) * 100}%`,
                      height: '100%',
                      backgroundColor: theme.palette.primary.main,
                      transition: 'width 0.3s ease'
                    }}
                  />
                </Box>
                <Typography variant="body2" fontWeight={600}>
                  {steps[activeStep]}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Form Section */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card
              sx={{
                borderRadius: { xs: 2, md: 3 },
                border: `1px solid ${theme.palette.divider}`,
                minHeight: { xs: 'auto', md: '600px' }
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                {renderStepContent()}
              </CardContent>
            </Card>
          </Grid>

          {/* Preview Section - Desktop */}
          {!isMobile && (
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
                      {t('createCard.livePreview')}
                    </Typography>
                    <CardPreviewComponent
                      cardData={cardData}
                      isPreview={true}
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
            mt: { xs: 2, md: 3 },
            borderRadius: { xs: 2, md: 3 },
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Button
              variant="outlined"
              startIcon={<IconArrowLeft />}
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{
                borderRadius: 2,
                px: { xs: 2, md: 4 }
              }}
            >
              {t('common.previous')}
            </Button>

            <Stack direction="row" spacing={2}>
              {/* Save Draft - Mobile */}
              {isMobile && (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  {t('createCard.saveDraft')}
                </Button>
              )}

              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  startIcon={<IconCheck />}
                  onClick={handleSave}
                  sx={{
                    borderRadius: 2,
                    px: { xs: 3, md: 4 }
                  }}
                >
                  {t('createCard.createCard')}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  endIcon={<IconArrowRight />}
                  onClick={handleNext}
                  sx={{
                    borderRadius: 2,
                    px: { xs: 3, md: 4 }
                  }}
                >
                  {t('common.next')}
                </Button>
              )}
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </PageContainer>
  );
};

// Basic Info Step Component
const BasicInfoStep = ({ cardData, updateCardData, isMobile }: any) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [dragOver, setDragOver] = useState(false);

  const handleAvatarUpload = (file: File) => {
    updateCardData('avatar', file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleAvatarUpload(files[0]);
    }
  };

  return (
    <Stack spacing={{ xs: 3, md: 4 }}>
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        sx={{ fontWeight: 600, color: theme.palette.text.primary }}
      >
        {t('createCard.basicInfo.title')}
      </Typography>

      {/* Avatar Upload */}
      <Stack spacing={2} alignItems="center">
        <Box
          sx={{
            position: 'relative',
            width: { xs: 100, md: 120 },
            height: { xs: 100, md: 120 }
          }}
        >
          <Avatar
            src={cardData.avatar ? URL.createObjectURL(cardData.avatar) : undefined}
            sx={{
              width: '100%',
              height: '100%',
              fontSize: { xs: '2rem', md: '2.5rem' },
              backgroundColor: theme.palette.grey[200]
            }}
          >
            {!cardData.avatar && (
              <IconCamera size={isMobile ? 24 : 32} color={theme.palette.text.secondary} />
            )}
          </Avatar>
          
          <IconButton
            component="label"
            sx={{
              position: 'absolute',
              bottom: -8,
              right: -8,
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark
              }
            }}
          >
            <IconUpload size={16} />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleAvatarUpload(e.target.files[0]);
                }
              }}
            />
          </IconButton>
        </Box>

        {/* Drag & Drop Area - Desktop */}
        {!isMobile && (
          <Box
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            sx={{
              width: '100%',
              maxWidth: 300,
              height: 100,
              border: `2px dashed ${dragOver ? theme.palette.primary.main : theme.palette.divider}`,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: dragOver ? theme.palette.primary.light : 'transparent'
            }}
          >
            <Stack alignItems="center" spacing={1}>
              <IconUpload size={24} color={theme.palette.text.secondary} />
              <Typography variant="body2" color="text.secondary" textAlign="center">
                {t('createCard.basicInfo.dragImage')}
              </Typography>
            </Stack>
          </Box>
        )}
      </Stack>

      {/* Form Fields */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label={t('createCard.basicInfo.firstName')}
            value={cardData.firstName}
            onChange={(e) => updateCardData('firstName', e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label={t('createCard.basicInfo.lastName')}
            value={cardData.lastName}
            onChange={(e) => updateCardData('lastName', e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label={t('createCard.basicInfo.jobTitle')}
            value={cardData.jobTitle}
            onChange={(e) => updateCardData('jobTitle', e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label={t('createCard.basicInfo.company')}
            value={cardData.company}
            onChange={(e) => updateCardData('company', e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={isMobile ? 3 : 4}
            label={t('createCard.basicInfo.bio')}
            value={cardData.bio}
            onChange={(e) => updateCardData('bio', e.target.value)}
            variant="outlined"
            helperText={`${cardData.bio.length}/200`}
            inputProps={{ maxLength: 200 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

interface PreviewStepProps {
  cardData: any;
  updateCardData: (field: string, value: any) => void; // إضافة هذا السطر
  isMobile: boolean;
}

// Preview Step Component
const PreviewStep = ({ cardData, updateCardData, isMobile }: PreviewStepProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Stack spacing={{ xs: 3, md: 4 }}>
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        sx={{ fontWeight: 600, color: theme.palette.text.primary }}
      >
        {t('createCard.preview.title')}
      </Typography>

      <Alert severity="info" sx={{ borderRadius: 2 }}>
        {t('createCard.preview.description')}
      </Alert>

      {/* Card Preview */}
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
          scale={isMobile ? 0.8 : 1}
        />
      </Box>

      {/* Settings */}
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600}>
          {t('createCard.preview.settings')}
        </Typography>
        
        <Stack spacing={2}>
          <FormControlLabel
            control={
              <Switch
                checked={cardData.isPublic}
                onChange={(e) => updateCardData('isPublic', e.target.checked)}
              />
            }
            label={t('createCard.preview.makePublic')}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={cardData.allowDownload}
                onChange={(e) => updateCardData('allowDownload', e.target.checked)}
              />
            }
            label={t('createCard.preview.allowDownload')}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={cardData.showQR}
                onChange={(e) => updateCardData('showQR', e.target.checked)}
              />
            }
            label={t('createCard.preview.showQR')}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CreateCard;
