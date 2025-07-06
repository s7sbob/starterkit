// src/views/qr/QRGenerator.tsx
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid2 as Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  useTheme,
  useMediaQuery,
  Alert,
  Chip,
  Tabs,
  Tab,
  Divider
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconQrcode,
  IconDownload,
  IconShare,
  IconCopy,
  IconRefresh,
  IconEye,
  IconCheck,
  IconCamera,
  IconLink,
  IconMail,
  IconPhone,
  IconMapPin,
  IconWifi,
  IconBrandWhatsapp
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../dashboard/components/DashboardCard';

const QRGenerator = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [activeTab, setActiveTab] = useState(0);
  const [, setQrData] = useState('');
  const [qrType, setQrType] = useState('url');
  const [qrOptions, setQrOptions] = useState({
    size: 300,
    errorCorrection: 'M',
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    logo: null as File | null,
    logoSize: 20,
    borderRadius: 0,
    margin: 4
  });
  const [generatedQR, setGeneratedQR] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // QR Types Configuration
  const qrTypes = [
    {
      value: 'url',
      label: t('qr.types.url'),
      icon: IconLink,
      placeholder: 'https://example.com',
      fields: ['url']
    },
    {
      value: 'text',
      label: t('qr.types.text'),
      icon: IconQrcode,
      placeholder: t('qr.placeholders.text'),
      fields: ['text']
    },
    {
      value: 'email',
      label: t('qr.types.email'),
      icon: IconMail,
      placeholder: 'example@domain.com',
      fields: ['email', 'subject', 'body']
    },
    {
      value: 'phone',
      label: t('qr.types.phone'),
      icon: IconPhone,
      placeholder: '+966501234567',
      fields: ['phone']
    },
    {
      value: 'sms',
      label: t('qr.types.sms'),
      icon: IconBrandWhatsapp,
      placeholder: '+966501234567',
      fields: ['phone', 'message']
    },
    {
      value: 'wifi',
      label: t('qr.types.wifi'),
      icon: IconWifi,
      placeholder: 'WiFi Network',
      fields: ['ssid', 'password', 'security']
    },
    {
      value: 'location',
      label: t('qr.types.location'),
      icon: IconMapPin,
      placeholder: '24.7136, 46.6753',
      fields: ['latitude', 'longitude']
    }
  ];

  const [formData, setFormData] = useState({
    url: '',
    text: '',
    email: '',
    subject: '',
    body: '',
    phone: '',
    message: '',
    ssid: '',
    password: '',
    security: 'WPA',
    latitude: '',
    longitude: ''
  });

  const currentQrType = qrTypes.find(type => type.value === qrType);

  useEffect(() => {
    generateQRData();
  }, [qrType, formData]);

  const generateQRData = () => {
    let data = '';
    
    switch (qrType) {
      case 'url':
        data = formData.url;
        break;
      case 'text':
        data = formData.text;
        break;
      case 'email':
        data = `mailto:${formData.email}?subject=${formData.subject}&body=${formData.body}`;
        break;
      case 'phone':
        data = `tel:${formData.phone}`;
        break;
      case 'sms':
        data = `sms:${formData.phone}?body=${formData.message}`;
        break;
      case 'wifi':
        data = `WIFI:T:${formData.security};S:${formData.ssid};P:${formData.password};;`;
        break;
      case 'location':
        data = `geo:${formData.latitude},${formData.longitude}`;
        break;
      default:
        data = formData.url;
    }
    
    setQrData(data);
    if (data) {
      generateQRCode(data);
    }
  };

  const generateQRCode = async (data: string) => {
    if (!data.trim()) return;
    
    setLoading(true);
    try {
      // محاكاة API call لتوليد QR
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrOptions.size}x${qrOptions.size}&data=${encodeURIComponent(data)}&color=${qrOptions.foregroundColor.replace('#', '')}&bgcolor=${qrOptions.backgroundColor.replace('#', '')}&margin=${qrOptions.margin}&ecc=${qrOptions.errorCorrection}`;
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setGeneratedQR(qrUrl);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (option: string, value: any) => {
    setQrOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleDownload = async () => {
    if (!generatedQR) return;
    
    try {
      const response = await fetch(generatedQR);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr-code-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download QR code:', error);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedQR);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy QR code URL:', error);
    }
  };

  const renderFormFields = () => {
    if (!currentQrType) return null;

    return (
      <Stack spacing={3}>
        {currentQrType.fields.map((field) => {
          switch (field) {
            case 'url':
              return (
                <TextField
                  key={field}
                  fullWidth
                  label={t('qr.fields.url')}
                  placeholder={currentQrType.placeholder}
                  value={formData.url}
                  onChange={(e) => handleFormChange('url', e.target.value)}
                  type="url"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              );
            case 'text':
              return (
                <TextField
                  key={field}
                  fullWidth
                  multiline
                  rows={4}
                  label={t('qr.fields.text')}
                  placeholder={currentQrType.placeholder}
                  value={formData.text}
                  onChange={(e) => handleFormChange('text', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              );
            case 'email':
              return (
                <TextField
                  key={field}
                  fullWidth
                  label={t('qr.fields.email')}
                  placeholder={currentQrType.placeholder}
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  type="email"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              );
            case 'subject':
              return (
                <TextField
                  key={field}
                  fullWidth
                  label={t('qr.fields.subject')}
                  placeholder={t('qr.placeholders.subject')}
                  value={formData.subject}
                  onChange={(e) => handleFormChange('subject', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              );
            case 'body':
              return (
                <TextField
                  key={field}
                  fullWidth
                  multiline
                  rows={3}
                  label={t('qr.fields.body')}
                  placeholder={t('qr.placeholders.body')}
                  value={formData.body}
                  onChange={(e) => handleFormChange('body', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              );
            case 'phone':
              return (
                <TextField
                  key={field}
                  fullWidth
                  label={t('qr.fields.phone')}
                  placeholder={currentQrType.placeholder}
                  value={formData.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  type="tel"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              );
            case 'message':
              return (
                <TextField
                  key={field}
                  fullWidth
                  multiline
                  rows={3}
                  label={t('qr.fields.message')}
                  placeholder={t('qr.placeholders.message')}
                  value={formData.message}
                  onChange={(e) => handleFormChange('message', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              );
            case 'ssid':
              return (
                <TextField
                  key={field}
                  fullWidth
                  label={t('qr.fields.ssid')}
                  placeholder={t('qr.placeholders.ssid')}
                  value={formData.ssid}
                  onChange={(e) => handleFormChange('ssid', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              );
            case 'password':
              return (
                <TextField
                  key={field}
                  fullWidth
                  label={t('qr.fields.password')}
                  placeholder={t('qr.placeholders.password')}
                  value={formData.password}
                  onChange={(e) => handleFormChange('password', e.target.value)}
                  type="password"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              );
            case 'security':
              return (
                <FormControl key={field} fullWidth>
                  <InputLabel>{t('qr.fields.security')}</InputLabel>
                  <Select
                    value={formData.security}
                    label={t('qr.fields.security')}
                    onChange={(e) => handleFormChange('security', e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="WPA">WPA/WPA2</MenuItem>
                    <MenuItem value="WEP">WEP</MenuItem>
                    <MenuItem value="nopass">{t('qr.security.open')}</MenuItem>
                  </Select>
                </FormControl>
              );
            case 'latitude':
              return (
                <TextField
                  key={field}
                  fullWidth
                  label={t('qr.fields.latitude')}
                  placeholder="24.7136"
                  value={formData.latitude}
                  onChange={(e) => handleFormChange('latitude', e.target.value)}
                  type="number"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              );
            case 'longitude':
              return (
                <TextField
                  key={field}
                  fullWidth
                  label={t('qr.fields.longitude')}
                  placeholder="46.6753"
                  value={formData.longitude}
                  onChange={(e) => handleFormChange('longitude', e.target.value)}
                  type="number"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              );
            default:
              return null;
          }
        })}
      </Stack>
    );
  };

  return (
    <PageContainer title={t('qr.title')} description={t('qr.description')}>
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
            {t('qr.generator')}
          </Typography>

          {generatedQR && !isMobile && (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<IconEye />}
                onClick={() => window.open(generatedQR, '_blank')}
                sx={{ borderRadius: 2 }}
              >
                {t('qr.preview')}
              </Button>
              <Button
                variant="contained"
                startIcon={<IconDownload />}
                onClick={handleDownload}
                sx={{ borderRadius: 2 }}
              >
                {t('qr.download')}
              </Button>
            </Stack>
          )}
        </Stack>

        <Grid container spacing={3}>
          {/* QR Configuration */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <DashboardCard>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Tabs
                  value={activeTab}
                  onChange={(_, newValue) => setActiveTab(newValue)}
                  sx={{ mb: 3 }}
                  variant={isMobile ? 'scrollable' : 'standard'}
                  scrollButtons="auto"
                >
                  <Tab label={t('qr.tabs.content')} />
                  <Tab label={t('qr.tabs.design')} />
                  <Tab label={t('qr.tabs.advanced')} />
                </Tabs>

                {/* Content Tab */}
                {activeTab === 0 && (
                  <Stack spacing={3}>
                    <Typography variant="h6" fontWeight={600}>
                      {t('qr.selectType')}
                    </Typography>

                    {/* QR Type Selection */}
                    <Grid container spacing={2}>
                      {qrTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={type.value}>
                            <Card
                              sx={{
                                cursor: 'pointer',
                                borderRadius: 2,
                                border: qrType === type.value
                                  ? `2px solid ${theme.palette.primary.main}`
                                  : `1px solid ${theme.palette.divider}`,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: theme.shadows[4]
                                }
                              }}
                              onClick={() => setQrType(type.value)}
                            >
                              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                                <Stack spacing={1} alignItems="center">
                                  <Icon
                                    size={24}
                                    color={qrType === type.value
                                      ? theme.palette.primary.main
                                      : theme.palette.text.secondary
                                    }
                                  />
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontWeight: 600,
                                      color: qrType === type.value
                                        ? theme.palette.primary.main
                                        : theme.palette.text.secondary
                                    }}
                                  >
                                    {type.label}
                                  </Typography>
                                </Stack>
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>

                    <Divider />

                    {/* Form Fields */}
                    <Typography variant="h6" fontWeight={600}>
                      {t('qr.enterData')}
                    </Typography>

                    {renderFormFields()}
                  </Stack>
                )}

                {/* Design Tab */}
                {activeTab === 1 && (
                  <Stack spacing={4}>
                    <Typography variant="h6" fontWeight={600}>
                      {t('qr.customizeDesign')}
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={3}>
                          <Stack spacing={2}>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {t('qr.size')} ({qrOptions.size}px)
                            </Typography>
                            <Slider
                              value={qrOptions.size}
                              onChange={(_, value) => handleOptionChange('size', value)}
                              min={200}
                              max={800}
                              step={50}
                              marks={[
                                { value: 200, label: '200px' },
                                { value: 400, label: '400px' },
                                { value: 600, label: '600px' },
                                { value: 800, label: '800px' }
                              ]}
                            />
                          </Stack>

                          <Stack spacing={2}>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {t('qr.foregroundColor')}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <input
                                type="color"
                                value={qrOptions.foregroundColor}
                                onChange={(e) => handleOptionChange('foregroundColor', e.target.value)}
                                style={{
                                  width: 50,
                                  height: 40,
                                  border: 'none',
                                  borderRadius: 8,
                                  cursor: 'pointer'
                                }}
                              />
                              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                {qrOptions.foregroundColor}
                              </Typography>
                            </Box>
                          </Stack>

                          <Stack spacing={2}>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {t('qr.backgroundColor')}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <input
                                type="color"
                                value={qrOptions.backgroundColor}
                                onChange={(e) => handleOptionChange('backgroundColor', e.target.value)}
                                style={{
                                  width: 50,
                                  height: 40,
                                  border: 'none',
                                  borderRadius: 8,
                                  cursor: 'pointer'
                                }}
                              />
                              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                {qrOptions.backgroundColor}
                              </Typography>
                            </Box>
                          </Stack>
                        </Stack>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={3}>
                          <FormControl fullWidth>
                            <InputLabel>{t('qr.errorCorrection')}</InputLabel>
                            <Select
                              value={qrOptions.errorCorrection}
                              label={t('qr.errorCorrection')}
                              onChange={(e) => handleOptionChange('errorCorrection', e.target.value)}
                              sx={{ borderRadius: 2 }}
                            >
                              <MenuItem value="L">{t('qr.errorLevels.low')}</MenuItem>
                              <MenuItem value="M">{t('qr.errorLevels.medium')}</MenuItem>
                              <MenuItem value="Q">{t('qr.errorLevels.quartile')}</MenuItem>
                              <MenuItem value="H">{t('qr.errorLevels.high')}</MenuItem>
                            </Select>
                          </FormControl>

                          <Stack spacing={2}>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {t('qr.margin')} ({qrOptions.margin}px)
                            </Typography>
                            <Slider
                              value={qrOptions.margin}
                              onChange={(_, value) => handleOptionChange('margin', value)}
                              min={0}
                              max={20}
                              step={1}
                              marks={[
                                { value: 0, label: '0' },
                                { value: 10, label: '10' },
                                { value: 20, label: '20' }
                              ]}
                            />
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                )}

                {/* Advanced Tab */}
                {activeTab === 2 && (
                  <Stack spacing={3}>
                    <Typography variant="h6" fontWeight={600}>
                      {t('qr.advancedOptions')}
                    </Typography>

                    <Alert severity="info">
                      {t('qr.advancedDescription')}
                    </Alert>

                    <Stack spacing={3}>
                      <Button
                        variant="outlined"
                        startIcon={<IconCamera />}
                        component="label"
                        sx={{ borderRadius: 2 }}
                      >
                        {t('qr.addLogo')}
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleOptionChange('logo', e.target.files[0]);
                            }
                          }}
                        />
                      </Button>

                      {qrOptions.logo && (
                        <Stack spacing={2}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {t('qr.logoSize')} ({qrOptions.logoSize}%)
                          </Typography>
                          <Slider
                            value={qrOptions.logoSize}
                            onChange={(_, value) => handleOptionChange('logoSize', value)}
                            min={10}
                            max={30}
                            step={1}
                            marks={[
                              { value: 10, label: '10%' },
                              { value: 20, label: '20%' },
                              { value: 30, label: '30%' }
                            ]}
                          />
                        </Stack>
                      )}

                      <Button
                        variant="outlined"
                        startIcon={<IconRefresh />}
                        onClick={() => {
                          setQrOptions({
                            size: 300,
                            errorCorrection: 'M',
                            foregroundColor: '#000000',
                            backgroundColor: '#FFFFFF',
                            logo: null,
                            logoSize: 20,
                            borderRadius: 0,
                            margin: 4
                          });
                        }}
                        sx={{ borderRadius: 2, alignSelf: 'flex-start' }}
                      >
                        {t('qr.resetToDefault')}
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </CardContent>
            </DashboardCard>
          </Grid>

          {/* QR Preview */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <DashboardCard sx={{ position: 'sticky', top: 20 }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack spacing={3}>
                  <Typography variant="h6" fontWeight={600}>
                    {t('qr.preview')}
                  </Typography>

                  {/* QR Code Display */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: 300,
                      backgroundColor: theme.palette.grey[50],
                      borderRadius: 3,
                      border: `1px solid ${theme.palette.divider}`,
                      position: 'relative'
                    }}
                  >
                    {loading ? (
                      <Stack alignItems="center" spacing={2}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            border: `3px solid ${theme.palette.primary.light}`,
                            borderTop: `3px solid ${theme.palette.primary.main}`,
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            '@keyframes spin': {
                              '0%': { transform: 'rotate(0deg)' },
                              '100%': { transform: 'rotate(360deg)' }
                            }
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {t('qr.generating')}
                        </Typography>
                      </Stack>
                    ) : generatedQR ? (
                      <img
                        src={generatedQR}
                        alt="Generated QR Code"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          borderRadius: 8
                        }}
                      />
                    ) : (
                      <Stack alignItems="center" spacing={2}>
                        <IconQrcode size={48} color={theme.palette.text.secondary} />
                        <Typography variant="body2" color="text.secondary" textAlign="center">
                          {t('qr.enterDataToGenerate')}
                        </Typography>
                      </Stack>
                    )}
                  </Box>

                  {/* QR Info */}
                  {generatedQR && (
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          {t('qr.type')}:
                        </Typography>
                        <Chip
                          label={currentQrType?.label}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Stack>

                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          {t('qr.size')}:
                        </Typography>
                        <Typography variant="body2">
                          {qrOptions.size}x{qrOptions.size}px
                        </Typography>
                      </Stack>

                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          {t('qr.errorCorrection')}:
                        </Typography>
                        <Typography variant="body2">
                          {qrOptions.errorCorrection}
                        </Typography>
                      </Stack>
                    </Stack>
                  )}

                  {/* Actions */}
                  {generatedQR && (
                    <Stack spacing={2}>
                      <Button
                        variant="contained"
                        startIcon={<IconDownload />}
                        onClick={handleDownload}
                        fullWidth
                        sx={{ borderRadius: 2 }}
                      >
                        {t('qr.download')}
                      </Button>

                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          startIcon={copied ? <IconCheck /> : <IconCopy />}
                          onClick={handleCopy}
                          sx={{ borderRadius: 2, flex: 1 }}
                          color={copied ? 'success' : 'primary'}
                        >
                          {copied ? t('qr.copied') : t('qr.copyUrl')}
                        </Button>

                        <Button
                          variant="outlined"
                          startIcon={<IconShare />}
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: t('qr.shareTitle'),
                                url: generatedQR
                              });
                            }
                          }}
                          sx={{ borderRadius: 2, flex: 1 }}
                        >
                          {t('qr.share')}
                        </Button>
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </CardContent>
            </DashboardCard>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default QRGenerator;
