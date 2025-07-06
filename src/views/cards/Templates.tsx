// src/views/cards/Templates.tsx
import { useState } from 'react';
import {
  Box,
  Container,
  Grid2 as Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconEye,
  IconPlus,
  IconSearch,
  IconHeart,
  IconHeartFilled,
  IconStarFilled,
  IconX,
  IconCheck
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../dashboard/components/DashboardCard';

// تعريف نوع البيانات للقالب
interface Template {
  id: number;
  name: string;
  category: string;
  preview: string;
  gradient: string;
  description: string;
  features: string[];
  rating: number;
  downloads: number;
  isPremium: boolean;
}

// تعريف نوع البيانات للفئة
interface Category {
  value: string;
  label: string;
}

const Templates = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [previewDialog, setPreviewDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [favorites, setFavorites] = useState(new Set<number>());

  // بيانات وهمية للقوالب
  const templates: Template[] = [
    {
      id: 1,
      name: 'Modern Professional',
      category: 'business',
      preview: '/images/templates/modern.jpg',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'قالب عصري ومهني مناسب لرجال الأعمال',
      features: ['تصميم عصري', 'ألوان احترافية', 'سهل القراءة'],
      rating: 4.8,
      downloads: 1234,
      isPremium: false
    },
    {
      id: 2,
      name: 'Creative Designer',
      category: 'creative',
      preview: '/images/templates/creative.jpg',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'قالب إبداعي مناسب للمصممين والفنانين',
      features: ['تصميم إبداعي', 'ألوان جذابة', 'مساحة للأعمال'],
      rating: 4.9,
      downloads: 987,
      isPremium: true
    },
    {
      id: 3,
      name: 'Minimal Clean',
      category: 'minimal',
      preview: '/images/templates/minimal.jpg',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      description: 'قالب بسيط ونظيف مناسب لجميع المهن',
      features: ['تصميم بسيط', 'سهل الاستخدام', 'متعدد الاستخدامات'],
      rating: 4.7,
      downloads: 2156,
      isPremium: false
    },
    {
      id: 4,
      name: 'Tech Innovator',
      category: 'technology',
      preview: '/images/templates/tech.jpg',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      description: 'قالب تقني مناسب للمطورين والمهندسين',
      features: ['تصميم تقني', 'ألوان حديثة', 'مناسب للتقنيين'],
      rating: 4.6,
      downloads: 876,
      isPremium: true
    },
    {
      id: 5,
      name: 'Elegant Classic',
      category: 'elegant',
      preview: '/images/templates/elegant.jpg',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      description: 'قالب أنيق وكلاسيكي مناسب للمهن الراقية',
      features: ['تصميم أنيق', 'ألوان كلاسيكية', 'مظهر راقي'],
      rating: 4.8,
      downloads: 1543,
      isPremium: false
    },
    {
      id: 6,
      name: 'Bold Statement',
      category: 'bold',
      preview: '/images/templates/bold.jpg',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      description: 'قالب جريء ومميز لمن يريد التميز',
      features: ['تصميم جريء', 'ألوان مميزة', 'يلفت الانتباه'],
      rating: 4.5,
      downloads: 654,
      isPremium: true
    }
  ];

  const categories: Category[] = [
    { value: 'all', label: t('templates.categories.all') },
    { value: 'business', label: t('templates.categories.business') },
    { value: 'creative', label: t('templates.categories.creative') },
    { value: 'minimal', label: t('templates.categories.minimal') },
    { value: 'technology', label: t('templates.categories.technology') },
    { value: 'elegant', label: t('templates.categories.elegant') },
    { value: 'bold', label: t('templates.categories.bold') }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleFavorite = (templateId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(templateId)) {
      newFavorites.delete(templateId);
    } else {
      newFavorites.add(templateId);
    }
    setFavorites(newFavorites);
  };

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setPreviewDialog(true);
  };

  const handleUseTemplate = (template: Template) => {
    // Navigate to create card with template
    console.log('Using template:', template);
  };

  return (
    <PageContainer title={t('templates.title')} description={t('templates.description')}>
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
            {t('templates.title')}
          </Typography>

          <Button
            variant="contained"
            startIcon={<IconPlus />}
            href="/dashboard/cards/create"
            sx={{ borderRadius: 2 }}
          >
            {t('templates.createCustom')}
          </Button>
        </Stack>

        {/* Filters */}
        <DashboardCard sx={{ mb: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  placeholder={t('templates.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconSearch size={20} />
                      </InputAdornment>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>{t('templates.category')}</InputLabel>
                  <Select
                    value={categoryFilter}
                    label={t('templates.category')}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {filteredTemplates.length} {t('templates.templatesFound')}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </DashboardCard>

        {/* Templates Grid */}
        <Grid container spacing={3}>
          {filteredTemplates.map((template) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={template.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: theme.shadows[8],
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                {/* Template Preview */}
                <Box
                  sx={{
                    height: 200,
                    background: template.gradient,
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onClick={() => handlePreview(template)}
                >
                  {template.isPremium && (
                    <Chip
                      label={t('templates.premium')}
                      size="small"
                      color="warning"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        fontWeight: 600
                      }}
                    />
                  )}
                  
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(template.id);
                    }}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      '&:hover': {
                        backgroundColor: 'white'
                      }
                    }}
                  >
                    {favorites.has(template.id) ? (
                      <IconHeartFilled color={theme.palette.error.main} />
                    ) : (
                      <IconHeart />
                    )}
                  </IconButton>

                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      borderRadius: 1,
                      px: 1,
                      py: 0.5
                    }}
                  >
                    <Typography variant="caption" sx={{ color: 'white' }}>
                      <IconEye size={14} style={{ marginRight: 4 }} />
                      {t('templates.preview')}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    {/* Template Info */}
                    <Stack spacing={1}>
                      <Typography variant="h6" fontWeight={600}>
                        {template.name}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {template.description}
                      </Typography>
                    </Stack>

                    {/* Rating and Downloads */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <IconStarFilled size={16} color={theme.palette.warning.main} />
                        <Typography variant="body2" fontWeight={600}>
                          {template.rating}
                        </Typography>
                      </Stack>
                      
                      <Typography variant="caption" color="text.secondary">
                        {template.downloads.toLocaleString()} {t('templates.downloads')}
                      </Typography>
                    </Stack>

                    {/* Features */}
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {template.features.slice(0, 2).map((feature: string, index: number) => (
                        <Chip
                          key={index}
                          label={feature}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      ))}
                      {template.features.length > 2 && (
                        <Chip
                          label={`+${template.features.length - 2}`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      )}
                    </Stack>

                    {/* Actions */}
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<IconEye />}
                        onClick={() => handlePreview(template)}
                        sx={{ borderRadius: 2, flex: 1 }}
                      >
                        {t('templates.preview')}
                      </Button>
                      
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<IconPlus />}
                        onClick={() => handleUseTemplate(template)}
                        sx={{ borderRadius: 2, flex: 1 }}
                      >
                        {t('templates.use')}
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <DashboardCard>
            <CardContent sx={{ p: 6, textAlign: 'center' }}>
              <Stack spacing={3} alignItems="center">
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.grey[100],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconSearch size={48} color={theme.palette.text.secondary} />
                </Box>
                
                <Typography variant="h6" color="text.secondary">
                  {t('templates.noTemplatesFound')}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  {t('templates.noTemplatesDescription')}
                </Typography>
                
                <Button
                  variant="contained"
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                  }}
                  sx={{ borderRadius: 2 }}
                >
                  {t('templates.clearFilters')}
                </Button>
              </Stack>
            </CardContent>
          </DashboardCard>
        )}

        {/* Preview Dialog */}
        <Dialog
          open={previewDialog}
          onClose={() => setPreviewDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogContent sx={{ p: 0 }}>
            {selectedTemplate && (
              <Stack>
                {/* Header */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    p: 3,
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Stack spacing={1}>
                    <Typography variant="h6" fontWeight={600}>
                      {selectedTemplate.name}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <IconStarFilled size={16} color={theme.palette.warning.main} />
                        <Typography variant="body2">
                          {selectedTemplate.rating}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {selectedTemplate.downloads.toLocaleString()} {t('templates.downloads')}
                      </Typography>
                      {selectedTemplate.isPremium && (
                        <Chip label={t('templates.premium')} size="small" color="warning" />
                      )}
                    </Stack>
                  </Stack>
                  
                  <IconButton onClick={() => setPreviewDialog(false)}>
                    <IconX />
                  </IconButton>
                </Stack>

                {/* Preview */}
                <Box
                  sx={{
                    height: 400,
                    background: selectedTemplate.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                    {selectedTemplate.name}
                  </Typography>
                </Box>

                {/* Details */}
                <Stack spacing={3} sx={{ p: 3 }}>
                  <Typography variant="body1">
                    {selectedTemplate.description}
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {t('templates.features')}:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {selectedTemplate.features.map((feature: string, index: number) => (
                        <Chip
                          key={index}
                          label={feature}
                          size="small"
                          icon={<IconCheck size={14} />}
                          color="success"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      onClick={() => setPreviewDialog(false)}
                      sx={{ borderRadius: 2 }}
                    >
                      {t('common.close')}
                    </Button>
                    
                    <Button
                      variant="contained"
                      startIcon={<IconPlus />}
                      onClick={() => {
                        handleUseTemplate(selectedTemplate);
                        setPreviewDialog(false);
                      }}
                      sx={{ borderRadius: 2, flex: 1 }}
                    >
                      {t('templates.useTemplate')}
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </PageContainer>
  );
};

export default Templates;
