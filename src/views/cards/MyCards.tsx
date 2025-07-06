// src/views/cards/MyCards.tsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid2 as Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  useMediaQuery,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Skeleton
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  IconPlus,
  IconSearch,
  IconEye,
  IconEdit,
  IconShare,
  IconTrash,
  IconQrcode,
  IconCopy,
  IconDots,
  IconDownload,
  IconCheck,
  IconX
} from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../dashboard/components/DashboardCard';

const MyCards = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // بيانات وهمية للبطاقات
  const [cards, setCards] = useState([
    {
      id: 1,
      name: 'بطاقة العمل الرئيسية',
      avatar: '/images/avatars/user1.jpg',
      views: 1234,
      shares: 89,
      qrScans: 456,
      status: 'active',
      lastUpdated: '2024-01-15',
      template: 'modern',
      isPublic: true,
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://mazyone.com/card/1'
    },
    {
      id: 2,
      name: 'بطاقة المشاريع',
      avatar: '/images/avatars/user2.jpg',
      views: 567,
      shares: 34,
      qrScans: 123,
      status: 'active',
      lastUpdated: '2024-01-10',
      template: 'creative',
      isPublic: false,
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://mazyone.com/card/2'
    },
    {
      id: 3,
      name: 'بطاقة شخصية',
      avatar: '/images/avatars/user3.jpg',
      views: 234,
      shares: 12,
      qrScans: 67,
      status: 'draft',
      lastUpdated: '2024-01-08',
      template: 'minimal',
      isPublic: true,
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://mazyone.com/card/3'
    }
  ]);

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || card.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, card: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedCard(card);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCard(null);
  };

  const handleCopyQR = async (qrCode: string) => {
    try {
      await navigator.clipboard.writeText(qrCode);
      // إشعار نجاح
    } catch (error) {
      console.error('Failed to copy QR code');
    }
  };

  const handleDeleteCard = async () => {
    if (selectedCard) {
      setLoading(true);
      try {
        // API call to delete card
        setCards(cards.filter(card => card.id !== selectedCard.id));
        setDeleteDialog(false);
        handleMenuClose();
      } catch (error) {
        console.error('Failed to delete card');
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'draft': return 'warning';
      case 'inactive': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <IconCheck size={14} />;
      case 'draft': return <IconEdit size={14} />;
      case 'inactive': return <IconX size={14} />;
      default: return undefined;
    }
  };

  if (loading && cards.length === 0) {
    return (
      <PageContainer title={t('cards.title')} description={t('cards.description')}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Skeleton variant="circular" width={60} height={60} />
                      <Skeleton variant="text" width="80%" height={24} />
                      <Skeleton variant="text" width="60%" height={20} />
                      <Stack direction="row" spacing={1}>
                        <Skeleton variant="rectangular" width={60} height={20} />
                        <Skeleton variant="rectangular" width={60} height={20} />
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={t('cards.title')} description={t('cards.description')}>
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
            {t('cards.myCards')}
          </Typography>

          {!isMobile && (
            <Button
              variant="contained"
              startIcon={<IconPlus />}
              href="/dashboard/cards/create"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1.5
              }}
            >
              {t('cards.createNew')}
            </Button>
          )}
        </Stack>

        {/* Filters and Search */}
        <DashboardCard sx={{ mb: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Grid container spacing={2} alignItems="center">
              {/* Search */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  placeholder={t('cards.searchPlaceholder')}
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

              {/* Status Filter */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>{t('cards.status')}</InputLabel>
                  <Select
                    value={statusFilter}
                    label={t('cards.status')}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="all">{t('cards.allStatus')}</MenuItem>
                    <MenuItem value="active">{t('cards.active')}</MenuItem>
                    <MenuItem value="draft">{t('cards.draft')}</MenuItem>
                    <MenuItem value="inactive">{t('cards.inactive')}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* View Mode Toggle */}
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('grid')}
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    {t('cards.gridView')}
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('list')}
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    {t('cards.listView')}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </DashboardCard>

        {/* Cards Display */}
        {filteredCards.length === 0 ? (
          <DashboardCard>
            <CardContent sx={{ p: { xs: 3, md: 6 }, textAlign: 'center' }}>
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
                  <IconPlus size={48} color={theme.palette.text.secondary} />
                </Box>
                
                <Typography variant="h6" color="text.secondary">
                  {searchTerm || statusFilter !== 'all' 
                    ? t('cards.noCardsFound')
                    : t('cards.noCards')
                  }
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
                  {searchTerm || statusFilter !== 'all'
                    ? t('cards.noCardsFoundDescription')
                    : t('cards.noCardsDescription')
                  }
                </Typography>
                
                <Button
                  variant="contained"
                  startIcon={<IconPlus />}
                  href="/dashboard/cards/create"
                  sx={{ borderRadius: 2, px: 4 }}
                >
                  {t('cards.createFirstCard')}
                </Button>
              </Stack>
            </CardContent>
          </DashboardCard>
        ) : (
          <Grid container spacing={3}>
            {filteredCards.map((card) => (
              <Grid 
                size={{ 
                  xs: 12, 
                  sm: viewMode === 'grid' ? 6 : 12, 
                  md: viewMode === 'grid' ? 4 : 12,
                  lg: viewMode === 'grid' ? 3 : 12
                }} 
                key={card.id}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      boxShadow: theme.shadows[6],
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    {viewMode === 'grid' ? (
                      <Stack spacing={2}>
                        {/* Card Header */}
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Avatar
                            src={card.avatar}
                            sx={{
                              width: { xs: 50, md: 60 },
                              height: { xs: 50, md: 60 }
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuClick(e, card)}
                          >
                            <IconDots size={16} />
                          </IconButton>
                        </Stack>

                        {/* Card Info */}
                        <Stack spacing={1}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              fontSize: { xs: '1rem', md: '1.1rem' },
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {card.name}
                          </Typography>
                          
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                              label={t(`cards.${card.status}`)}
                              color={getStatusColor(card.status)}
                              size="small"
                              sx={{ height: 24, fontSize: '0.75rem' }}
                              {...(getStatusIcon(card.status) !== null && getStatusIcon(card.status) !== undefined ? { icon: getStatusIcon(card.status) } : {})}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {card.template}
                            </Typography>
                          </Stack>
                        </Stack>

                        {/* Stats */}
                        <Grid container spacing={1}>
                          <Grid size={4}>
                            <Stack alignItems="center" spacing={0.5}>
                              <IconEye size={16} color={theme.palette.text.secondary} />
                              <Typography variant="caption" fontWeight={600}>
                                {card.views}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                                {t('cards.views')}
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid size={4}>
                            <Stack alignItems="center" spacing={0.5}>
                              <IconShare size={16} color={theme.palette.text.secondary} />
                              <Typography variant="caption" fontWeight={600}>
                                {card.shares}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                                {t('cards.shares')}
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid size={4}>
                            <Stack alignItems="center" spacing={0.5}>
                              <IconQrcode size={16} color={theme.palette.text.secondary} />
                              <Typography variant="caption" fontWeight={600}>
                                {card.qrScans}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                                {t('cards.scans')}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>

                        {/* Actions */}
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<IconEye />}
                            href={`/dashboard/cards/preview/${card.id}`}
                            sx={{ borderRadius: 2, flex: 1 }}
                          >
                            {t('cards.preview')}
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<IconEdit />}
                            href={`/dashboard/cards/edit/${card.id}`}
                            sx={{ borderRadius: 2, flex: 1 }}
                          >
                            {t('cards.edit')}
                          </Button>
                        </Stack>
                      </Stack>
                    ) : (
                      // List View
                      <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 2, sm: 1 }}>
                          <Avatar src={card.avatar} sx={{ width: 50, height: 50 }} />
                        </Grid>
                        
                        <Grid size={{ xs: 10, sm: 4 }}>
                          <Stack spacing={0.5}>
                            <Typography variant="h6" fontWeight={600}>
                              {card.name}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Chip
                                label={t(`cards.${card.status}`)}
                                color={getStatusColor(card.status)}
                                size="small"
                                icon={getStatusIcon(card.status)}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {card.lastUpdated}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>

                        {!isMobile && (
                          <Grid size={{ sm: 3 }}>
                            <Stack direction="row" spacing={3}>
                              <Stack alignItems="center">
                                <Typography variant="h6" fontWeight={600}>
                                  {card.views}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {t('cards.views')}
                                </Typography>
                              </Stack>
                              <Stack alignItems="center">
                                <Typography variant="h6" fontWeight={600}>
                                  {card.shares}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {t('cards.shares')}
                                </Typography>
                              </Stack>
                              <Stack alignItems="center">
                                <Typography variant="h6" fontWeight={600}>
                                  {card.qrScans}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {t('cards.scans')}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Grid>
                        )}

                        <Grid size={{ xs: 12, sm: 4 }}>
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <IconButton
                              size="small"
                              href={`/dashboard/cards/preview/${card.id}`}
                              color="primary"
                            >
                              <IconEye size={18} />
                            </IconButton>
                            <IconButton
                              size="small"
                              href={`/dashboard/cards/edit/${card.id}`}
                              color="primary"
                            >
                              <IconEdit size={18} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleCopyQR(card.qrCode)}
                              color="secondary"
                            >
                              <IconCopy size={18} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuClick(e, card)}
                            >
                              <IconDots size={18} />
                            </IconButton>
                          </Stack>
                        </Grid>
                      </Grid>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Floating Action Button - Mobile */}
        {isMobile && (
          <Fab
            color="primary"
            href="/dashboard/cards/create"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000
            }}
          >
            <IconPlus />
          </Fab>
        )}

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: { minWidth: 200 }
          }}
        >
          <MenuItem onClick={() => {
            // Preview action
            handleMenuClose();
          }}>
            <IconEye size={16} style={{ marginRight: 8 }} />
            {t('cards.preview')}
          </MenuItem>
          <MenuItem onClick={() => {
            // Edit action
            handleMenuClose();
          }}>
            <IconEdit size={16} style={{ marginRight: 8 }} />
            {t('cards.edit')}
          </MenuItem>
          <MenuItem onClick={() => {
            setShareDialog(true);
            handleMenuClose();
          }}>
            <IconShare size={16} style={{ marginRight: 8 }} />
            {t('cards.share')}
          </MenuItem>
          <MenuItem onClick={() => {
            handleCopyQR(selectedCard?.qrCode);
            handleMenuClose();
          }}>
            <IconCopy size={16} style={{ marginRight: 8 }} />
            {t('cards.copyQR')}
          </MenuItem>
          <MenuItem onClick={() => {
            // Download action
            handleMenuClose();
          }}>
            <IconDownload size={16} style={{ marginRight: 8 }} />
            {t('cards.download')}
          </MenuItem>
          <MenuItem 
            onClick={() => {
              setDeleteDialog(true);
              handleMenuClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <IconTrash size={16} style={{ marginRight: 8 }} />
            {t('cards.delete')}
          </MenuItem>
        </Menu>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog}
          onClose={() => setDeleteDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {t('cards.deleteConfirmTitle')}
          </DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 2 }}>
              {t('cards.deleteWarning')}
            </Alert>
            <Typography>
              {t('cards.deleteConfirmMessage', { cardName: selectedCard?.name })}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteCard}
              disabled={loading}
            >
              {loading ? t('cards.deleting') : t('cards.delete')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Share Dialog */}
        <Dialog
          open={shareDialog}
          onClose={() => setShareDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {t('cards.shareCard')}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ pt: 1 }}>
              <TextField
                fullWidth
                label={t('cards.cardLink')}
                value={`https://mazyone.com/card/${selectedCard?.id}`}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => navigator.clipboard.writeText(`https://mazyone.com/card/${selectedCard?.id}`)}
                      >
                        <IconCopy size={16} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src={selectedCard?.qrCode}
                  alt="QR Code"
                  style={{ width: 200, height: 200 }}
                />
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  {t('cards.qrCodeDescription')}
                </Typography>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShareDialog(false)}>
              {t('common.close')}
            </Button>
            <Button
              variant="contained"
              startIcon={<IconDownload />}
              onClick={() => {
                // Download QR code
              }}
            >
              {t('cards.downloadQR')}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </PageContainer>
  );
};

export default MyCards;
