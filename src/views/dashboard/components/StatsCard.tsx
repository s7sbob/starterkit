// src/views/dashboard/components/StatsCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  useTheme,
  alpha
} from '@mui/material';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
  isMobile: boolean;
}

const StatsCard = ({ title, value, change, trend, icon: Icon, color, isMobile }: StatsCardProps) => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        borderRadius: { xs: 2, md: 3 },
        boxShadow: theme.shadows[2],
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: theme.shadows[4],
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={2}>
          {/* Icon and Trend */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box
              sx={{
                width: { xs: 40, md: 48 },
                height: { xs: 40, md: 48 },
                borderRadius: 2,
                backgroundColor: alpha(color, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon size={isMobile ? 20 : 24} color={color} />
            </Box>
            
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {trend === 'up' ? (
                <IconTrendingUp size={16} color={theme.palette.success.main} />
              ) : (
                <IconTrendingDown size={16} color={theme.palette.error.main} />
              )}
              <Typography
                variant="caption"
                sx={{
                  color: trend === 'up' ? theme.palette.success.main : theme.palette.error.main,
                  fontWeight: 600,
                  fontSize: { xs: '0.7rem', md: '0.75rem' }
                }}
              >
                {change}
              </Typography>
            </Stack>
          </Stack>
          
          {/* Value and Title */}
          <Stack spacing={0.5}>
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                lineHeight: 1.2
              }}
            >
              {value}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                lineHeight: 1.3
              }}
            >
              {title}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
