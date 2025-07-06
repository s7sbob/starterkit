// src/views/cards/components/BasicInfoStep.tsx
import React, { useState } from 'react';
import {
  Stack,
  Typography,
  TextField,
  Grid2 as Grid,
  Box,
  Avatar,
  IconButton,
  useTheme,
  Card,
  CardContent,
  Alert,
  Chip
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconCamera,
  IconUpload,
  IconX,
  IconCheck,
  IconUser
} from '@tabler/icons-react';


interface BasicInfoStepProps {
  cardData: any;
  updateCardData: (field: string, value: any) => void; // تغيير النوع
  isMobile: boolean;
}

const BasicInfoStep = ({ cardData, updateCardData, isMobile }: BasicInfoStepProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [dragOver, setDragOver] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    cardData.avatar ? URL.createObjectURL(cardData.avatar) : null
  );

  const handleAvatarUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      updateCardData('avatar', file);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleAvatarUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeAvatar = () => {
    updateCardData('avatar', null);
    setImagePreview(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'firstName':
      case 'lastName':
        return value.length >= 2;
      case 'jobTitle':
        return value.length >= 3;
      case 'company':
        return value.length >= 2;
      case 'bio':
        return value.length <= 200;
      default:
        return true;
    }
  };

  const getFieldError = (field: string, value: string) => {
    if (!value) return '';
    
    switch (field) {
      case 'firstName':
      case 'lastName':
        return value.length < 2 ? t('basicInfo.errors.nameShort') : '';
      case 'jobTitle':
        return value.length < 3 ? t('basicInfo.errors.jobTitleShort') : '';
      case 'company':
        return value.length < 2 ? t('basicInfo.errors.companyShort') : '';
      case 'bio':
        return value.length > 200 ? t('basicInfo.errors.bioLong') : '';
      default:
        return '';
    }
  };

  return (
    <Stack spacing={{ xs: 3, md: 4 }}>
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        sx={{ fontWeight: 600, color: theme.palette.text.primary }}
      >
        {t('basicInfo.title')}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {t('basicInfo.description')}
      </Typography>

      {/* Avatar Upload Section */}
      <Card
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          backgroundColor: theme.palette.grey[50]
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              {t('basicInfo.profilePhoto')}
            </Typography>

            {/* Avatar Display */}
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={imagePreview || undefined}
                sx={{
                  width: { xs: 120, md: 150 },
                  height: { xs: 120, md: 150 },
                  fontSize: { xs: '2rem', md: '3rem' },
                  backgroundColor: theme.palette.grey[200],
                  border: `4px solid ${theme.palette.background.paper}`,
                  boxShadow: theme.shadows[4]
                }}
              >
                {!imagePreview && (
                  <IconUser size={isMobile ? 48 : 64} color={theme.palette.text.secondary} />
                )}
              </Avatar>

              {/* Upload Button */}
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: -8,
                  right: -8,
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  width: 40,
                  height: 40,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark
                  }
                }}
              >
                <IconCamera size={20} />
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

              {/* Remove Button */}
              {imagePreview && (
                <IconButton
                  onClick={removeAvatar}
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    backgroundColor: theme.palette.error.main,
                    color: 'white',
                    width: 32,
                    height: 32,
                    '&:hover': {
                      backgroundColor: theme.palette.error.dark
                    }
                  }}
                >
                  <IconX size={16} />
                </IconButton>
              )}
            </Box>

            {/* Drag & Drop Area - Desktop */}
            {!isMobile && (
              <Box
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                sx={{
                  width: '100%',
                  maxWidth: 400,
                  height: 120,
                  border: `2px dashed ${dragOver ? theme.palette.primary.main : theme.palette.divider}`,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: dragOver ? theme.palette.primary.light : 'transparent',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.primary.light
                  }
                }}
                component="label"
              >
                <Stack alignItems="center" spacing={1}>
                  <IconUpload size={32} color={theme.palette.text.secondary} />
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    {t('basicInfo.dragImage')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('basicInfo.imageFormats')}
                  </Typography>
                </Stack>
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
              </Box>
            )}

            <Alert severity="info" sx={{ width: '100%' }}>
              {t('basicInfo.imageRecommendation')}
            </Alert>
          </Stack>
        </CardContent>
      </Card>

      {/* Form Fields */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {/* First Name */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label={t('basicInfo.firstName')}
            value={cardData.firstName || ''}
            onChange={(e) => updateCardData('firstName', e.target.value)}
            required
            error={!!getFieldError('firstName', cardData.firstName || '')}
            helperText={getFieldError('firstName', cardData.firstName || '') || t('basicInfo.required')}
            variant="outlined"
            InputProps={{
              endAdornment: validateField('firstName', cardData.firstName || '') && cardData.firstName ? (
                <IconCheck size={20} color={theme.palette.success.main} />
              ) : null
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Grid>

        {/* Last Name */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label={t('basicInfo.lastName')}
            value={cardData.lastName || ''}
            onChange={(e) => updateCardData('lastName', e.target.value)}
            required
            error={!!getFieldError('lastName', cardData.lastName || '')}
            helperText={getFieldError('lastName', cardData.lastName || '') || t('basicInfo.required')}
            variant="outlined"
            InputProps={{
              endAdornment: validateField('lastName', cardData.lastName || '') && cardData.lastName ? (
                <IconCheck size={20} color={theme.palette.success.main} />
              ) : null
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Grid>

        {/* Job Title */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label={t('basicInfo.jobTitle')}
            value={cardData.jobTitle || ''}
            onChange={(e) => updateCardData('jobTitle', e.target.value)}
            required
            error={!!getFieldError('jobTitle', cardData.jobTitle || '')}
            helperText={getFieldError('jobTitle', cardData.jobTitle || '') || t('basicInfo.jobTitleHelper')}
            variant="outlined"
            InputProps={{
              endAdornment: validateField('jobTitle', cardData.jobTitle || '') && cardData.jobTitle ? (
                <IconCheck size={20} color={theme.palette.success.main} />
              ) : null
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Grid>

        {/* Company */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label={t('basicInfo.company')}
            value={cardData.company || ''}
            onChange={(e) => updateCardData('company', e.target.value)}
            required
            error={!!getFieldError('company', cardData.company || '')}
            helperText={getFieldError('company', cardData.company || '') || t('basicInfo.companyHelper')}
            variant="outlined"
            InputProps={{
              endAdornment: validateField('company', cardData.company || '') && cardData.company ? (
                <IconCheck size={20} color={theme.palette.success.main} />
              ) : null
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Grid>

        {/* Bio */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={isMobile ? 4 : 5}
            label={t('basicInfo.bio')}
            value={cardData.bio || ''}
            onChange={(e) => updateCardData('bio', e.target.value)}
            variant="outlined"
            error={!!getFieldError('bio', cardData.bio || '')}
            helperText={
              getFieldError('bio', cardData.bio || '') || 
              `${(cardData.bio || '').length}/200 - ${t('basicInfo.bioHelper')}`
            }
            inputProps={{ maxLength: 200 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Grid>
      </Grid>

      {/* Preview Card */}
      <Card
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          backgroundColor: theme.palette.grey[50]
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            {t('basicInfo.preview')}
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={imagePreview || undefined}
              sx={{ width: 60, height: 60 }}
            >
              {!imagePreview && <IconUser size={24} />}
            </Avatar>
            
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                {cardData.firstName || t('basicInfo.firstName')} {cardData.lastName || t('basicInfo.lastName')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {cardData.jobTitle || t('basicInfo.jobTitle')}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {cardData.company || t('basicInfo.company')}
              </Typography>
            </Stack>
            
            <Stack spacing={1}>
              {[
                { field: 'firstName', valid: validateField('firstName', cardData.firstName || '') },
                { field: 'lastName', valid: validateField('lastName', cardData.lastName || '') },
                { field: 'jobTitle', valid: validateField('jobTitle', cardData.jobTitle || '') },
                { field: 'company', valid: validateField('company', cardData.company || '') }
              ].map(({ field, valid }) => (
                <Chip
                  key={field}
                  label={t(`basicInfo.${field}`)}
                  size="small"
                  color={valid && cardData[field] ? 'success' : 'default'}
                  icon={valid && cardData[field] ? <IconCheck size={14} /> : undefined}
                  sx={{ fontSize: '0.7rem', height: 20 }}
                />
              ))}
            </Stack>
          </Stack>

          {cardData.bio && (
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              {cardData.bio}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Tips */}
      <Alert severity="info">
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
          {t('basicInfo.tips.title')}
        </Typography>
        <Stack spacing={0.5}>
          <Typography variant="body2">• {t('basicInfo.tips.tip1')}</Typography>
          <Typography variant="body2">• {t('basicInfo.tips.tip2')}</Typography>
          <Typography variant="body2">• {t('basicInfo.tips.tip3')}</Typography>
          <Typography variant="body2">• {t('basicInfo.tips.tip4')}</Typography>
        </Stack>
      </Alert>
    </Stack>
  );
};

export default BasicInfoStep;
