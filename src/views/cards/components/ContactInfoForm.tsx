// src/views/cards/components/ContactInfoForm.tsx
import React from 'react';
import {
  Stack,
  Typography,
  TextField,
  Grid2 as Grid,
  useTheme,
  InputAdornment,
  IconButton,
  Box,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconMail,
  IconPhone,
  IconWorld,
  IconMapPin,
  IconCopy,
  IconCheck
} from '@tabler/icons-react';

interface ContactInfoFormProps {
  cardData: any;
  updateCardData: (field: string, value: any) => void;
  isMobile: boolean;
}

const ContactInfoForm = ({ cardData, updateCardData, isMobile }: ContactInfoFormProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateWebsite = (website: string) => {
    try {
      new URL(website.startsWith('http') ? website : `https://${website}`);
      return true;
    } catch {
      return false;
    }
  };

  const contactFields = [
    {
      key: 'email',
      label: t('createCard.contactInfo.email'),
      icon: IconMail,
      type: 'email',
      placeholder: 'example@domain.com',
      validator: validateEmail,
      required: true
    },
    {
      key: 'phone',
      label: t('createCard.contactInfo.phone'),
      icon: IconPhone,
      type: 'tel',
      placeholder: '+966 50 123 4567',
      validator: validatePhone,
      required: false
    },
    {
      key: 'website',
      label: t('createCard.contactInfo.website'),
      icon: IconWorld,
      type: 'url',
      placeholder: 'www.example.com',
      validator: validateWebsite,
      required: false
    },
    {
      key: 'address',
      label: t('createCard.contactInfo.address'),
      icon: IconMapPin,
      type: 'text',
      placeholder: t('createCard.contactInfo.addressPlaceholder'),
      validator: null,
      required: false,
      multiline: true
    }
  ];

  return (
    <Stack spacing={{ xs: 3, md: 4 }}>
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        sx={{ fontWeight: 600, color: theme.palette.text.primary }}
      >
        {t('createCard.contactInfo.title')}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {t('createCard.contactInfo.description')}
      </Typography>

      {/* Contact Fields */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {contactFields.map((field) => {
          const Icon = field.icon;
          const value = cardData[field.key] || '';
          const isValid = field.validator ? field.validator(value) : true;
          const hasError = value && !isValid;

          return (
            <Grid size={{ xs: 12, md: field.multiline ? 12 : 6 }} key={field.key}>
              <TextField
                fullWidth
                label={field.label}
                type={field.type}
                value={value}
                onChange={(e) => updateCardData(field.key, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                multiline={field.multiline}
                rows={field.multiline ? (isMobile ? 3 : 4) : 1}
                error={hasError}
                helperText={
                  hasError
                    ? t(`createCard.contactInfo.${field.key}Error`)
                    : field.required
                    ? t('createCard.contactInfo.required')
                    : ''
                }
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon
                        size={20}
                        color={
                          hasError
                            ? theme.palette.error.main
                            : value && isValid
                            ? theme.palette.success.main
                            : theme.palette.text.secondary
                        }
                      />
                    </InputAdornment>
                  ),
                  endAdornment: value && !field.multiline && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => handleCopy(value, field.key)}
                        sx={{
                          color: copiedField === field.key
                            ? theme.palette.success.main
                            : theme.palette.text.secondary
                        }}
                      >
                        {copiedField === field.key ? (
                          <IconCheck size={16} />
                        ) : (
                          <IconCopy size={16} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      {/* Contact Preview Card */}
      <Card
        sx={{
          borderRadius: 2,
          backgroundColor: theme.palette.grey[50],
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack spacing={2}>
            <Typography variant="subtitle2" fontWeight={600}>
              {t('createCard.contactInfo.preview')}
            </Typography>
            
            <Grid container spacing={2}>
              {contactFields.map((field) => {
                const Icon = field.icon;
                const value = cardData[field.key];
                
                if (!value) return null;

                return (
                  <Grid size={{ xs: 12, sm: 6 }} key={field.key}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="flex-start"
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: 'white',
                        border: `1px solid ${theme.palette.divider}`,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          boxShadow: theme.shadows[2]
                        }
                      }}
                    >
                      <Icon size={18} color={theme.palette.primary.main} />
                      <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            fontWeight: 600
                          }}
                        >
                          {field.label}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.primary,
                            fontSize: '0.85rem',
                            wordBreak: 'break-word',
                            lineHeight: 1.4
                          }}
                        >
                          {value}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>

            {/* Validation Status */}
            <Box>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {contactFields.map((field) => {
                  const value = cardData[field.key];
                  if (!value) return null;

                  const isValid = field.validator ? field.validator(value) : true;
                  
                  return (
                    <Chip
                      key={field.key}
                      label={field.label}
                      size="small"
                      color={isValid ? 'success' : 'error'}
                      variant={isValid ? 'filled' : 'outlined'}
                      icon={isValid ? <IconCheck size={14} /> : undefined}
                      sx={{
                        fontSize: '0.7rem',
                        height: 24
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card
        sx={{
          borderRadius: 2,
          backgroundColor: theme.palette.info.light,
          border: `1px solid ${theme.palette.info.main}`
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
            {t('createCard.contactInfo.tips.title')}
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              • {t('createCard.contactInfo.tips.tip1')}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              • {t('createCard.contactInfo.tips.tip2')}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
              • {t('createCard.contactInfo.tips.tip3')}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ContactInfoForm;
