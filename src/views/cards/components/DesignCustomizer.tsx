// src/views/cards/components/DesignCustomizer.tsx
import {
  Stack,
  Typography,
  Grid2 as Grid,
  Card,
  Box,
  Button,
  useTheme,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconCheck,
  IconRefresh
} from '@tabler/icons-react';

interface DesignCustomizerProps {
  cardData: any;
  updateCardData: (field: string, value: any) => void;
  isMobile: boolean;
}

const DesignCustomizer = ({ cardData, updateCardData, isMobile }: DesignCustomizerProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const templates = [
    {
      id: 'modern',
      name: t('createCard.design.templates.modern'),
      preview: '/images/templates/modern.jpg',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'minimal',
      name: t('createCard.design.templates.minimal'),
      preview: '/images/templates/minimal.jpg',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'professional',
      name: t('createCard.design.templates.professional'),
      preview: '/images/templates/professional.jpg',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'creative',
      name: t('createCard.design.templates.creative'),
      preview: '/images/templates/creative.jpg',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      id: 'elegant',
      name: t('createCard.design.templates.elegant'),
      preview: '/images/templates/elegant.jpg',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 'bold',
      name: t('createCard.design.templates.bold'),
      preview: '/images/templates/bold.jpg',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  const colorPalettes = [
    { name: 'Blue', primary: '#2196F3', secondary: '#1976D2' },
    { name: 'Purple', primary: '#9C27B0', secondary: '#7B1FA2' },
    { name: 'Green', primary: '#4CAF50', secondary: '#388E3C' },
    { name: 'Orange', primary: '#FF9800', secondary: '#F57C00' },
    { name: 'Red', primary: '#F44336', secondary: '#D32F2F' },
    { name: 'Teal', primary: '#009688', secondary: '#00695C' },
    { name: 'Pink', primary: '#E91E63', secondary: '#C2185B' },
    { name: 'Indigo', primary: '#3F51B5', secondary: '#303F9F' }
  ];

  const fonts = [
    { value: 'roboto', label: 'Roboto', preview: 'font-family: Roboto' },
    { value: 'cairo', label: 'Cairo', preview: 'font-family: Cairo' },
    { value: 'opensans', label: 'Open Sans', preview: 'font-family: Open Sans' },
    { value: 'lato', label: 'Lato', preview: 'font-family: Lato' },
    { value: 'montserrat', label: 'Montserrat', preview: 'font-family: Montserrat' },
    { value: 'poppins', label: 'Poppins', preview: 'font-family: Poppins' }
  ];

  return (
    <Stack spacing={{ xs: 3, md: 4 }}>
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        sx={{ fontWeight: 600, color: theme.palette.text.primary }}
      >
        {t('createCard.design.title')}
      </Typography>

      {/* Template Selection */}
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600}>
          {t('createCard.design.selectTemplate')}
        </Typography>
        
        <Grid container spacing={2}>
          {templates.map((template) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={template.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  borderRadius: 2,
                  border: cardData.template === template.id
                    ? `2px solid ${theme.palette.primary.main}`
                    : `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[6]
                  }
                }}
                onClick={() => updateCardData('template', template.id)}
              >
                <Box
                  sx={{
                    height: { xs: 80, md: 100 },
                    background: template.gradient,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cardData.template === template.id && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <IconCheck size={16} color={theme.palette.primary.main} />
                    </Box>
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      textAlign: 'center',
                      fontSize: { xs: '0.7rem', md: '0.75rem' }
                    }}
                  >
                    {template.name}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Divider />

      {/* Color Customization */}
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={600}>
          {t('createCard.design.colors')}
        </Typography>

        {/* Color Palettes */}
        <Stack spacing={2}>
          <Typography variant="subtitle2" fontWeight={600}>
            {t('createCard.design.colorPalettes')}
          </Typography>
          
          <Grid container spacing={1}>
            {colorPalettes.map((palette, index) => (
              <Grid size={{ xs: 3, sm: 2, md: 1.5 }} key={index}>
                <Box
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: cardData.primaryColor === palette.primary
                      ? `3px solid ${theme.palette.text.primary}`
                      : `1px solid ${theme.palette.divider}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                  onClick={() => {
                    updateCardData('primaryColor', palette.primary);
                    updateCardData('secondaryColor', palette.secondary);
                  }}
                >
                  <Box
                    sx={{
                      height: { xs: 40, md: 50 },
                      background: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`
                    }}
                  />
                  <Box sx={{ p: 1, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                      {palette.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>

        {/* Custom Colors */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('createCard.design.primaryColor')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <input
                  type="color"
                  value={cardData.primaryColor}
                  onChange={(e) => updateCardData('primaryColor', e.target.value)}
                  style={{
                    width: 50,
                    height: 40,
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer'
                  }}
                />
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {cardData.primaryColor}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('createCard.design.backgroundColor')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <input
                  type="color"
                  value={cardData.backgroundColor}
                  onChange={(e) => updateCardData('backgroundColor', e.target.value)}
                  style={{
                    width: 50,
                    height: 40,
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer'
                  }}
                />
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {cardData.backgroundColor}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Stack>

      <Divider />

      {/* Typography */}
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={600}>
          {t('createCard.design.typography')}
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>{t('createCard.design.fontFamily')}</InputLabel>
              <Select
                value={cardData.fontFamily || 'roboto'}
                label={t('createCard.design.fontFamily')}
                onChange={(e) => updateCardData('fontFamily', e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                {fonts.map((font) => (
                  <MenuItem key={font.value} value={font.value}>
                    <Typography sx={{ fontFamily: font.label }}>
                      {font.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" fontWeight={600}>
                {t('createCard.design.fontSize')} ({cardData.fontSize || 16}px)
              </Typography>
              <Slider
                value={cardData.fontSize || 16}
                onChange={(_, value) => updateCardData('fontSize', value)}
                min={12}
                max={24}
                step={1}
                marks={[
                  { value: 12, label: '12px' },
                  { value: 16, label: '16px' },
                  { value: 20, label: '20px' },
                  { value: 24, label: '24px' }
                ]}
                sx={{
                  '& .MuiSlider-thumb': {
                    backgroundColor: cardData.primaryColor
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: cardData.primaryColor
                  }
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>

      <Divider />

      {/* Advanced Settings */}
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={600}>
          {t('createCard.design.advanced')}
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={cardData.showShadow || false}
                    onChange={(e) => updateCardData('showShadow', e.target.checked)}
                  />
                }
                label={t('createCard.design.cardShadow')}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={cardData.showBorder || false}
                    onChange={(e) => updateCardData('showBorder', e.target.checked)}
                  />
                }
                label={t('createCard.design.cardBorder')}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={cardData.showPattern || false}
                    onChange={(e) => updateCardData('showPattern', e.target.checked)}
                  />
                }
                label={t('createCard.design.backgroundPattern')}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('createCard.design.borderRadius')} ({cardData.borderRadius || 16}px)
                </Typography>
                <Slider
                  value={cardData.borderRadius || 16}
                  onChange={(_, value) => updateCardData('borderRadius', value)}
                  min={0}
                  max={32}
                  step={2}
                  marks={[
                    { value: 0, label: '0' },
                    { value: 16, label: '16' },
                    { value: 32, label: '32' }
                  ]}
                />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {t('createCard.design.opacity')} ({Math.round((cardData.opacity || 1) * 100)}%)
                </Typography>
                <Slider
                  value={cardData.opacity || 1}
                  onChange={(_, value) => updateCardData('opacity', value)}
                  min={0.5}
                  max={1}
                  step={0.1}
                  marks={[
                    { value: 0.5, label: '50%' },
                    { value: 0.75, label: '75%' },
                    { value: 1, label: '100%' }
                  ]}
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>

      {/* Reset Button */}
      <Box sx={{ pt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<IconRefresh />}
          onClick={() => {
            updateCardData('template', 'modern');
            updateCardData('primaryColor', theme.palette.primary.main);
            updateCardData('backgroundColor', '#ffffff');
            updateCardData('fontFamily', 'roboto');
            updateCardData('fontSize', 16);
            updateCardData('borderRadius', 16);
            updateCardData('opacity', 1);
            updateCardData('showShadow', false);
            updateCardData('showBorder', false);
            updateCardData('showPattern', false);
          }}
          sx={{
            borderRadius: 2,
            px: 3
          }}
        >
          {t('createCard.design.resetToDefault')}
        </Button>
      </Box>
    </Stack>
  );
};

export default DesignCustomizer;
