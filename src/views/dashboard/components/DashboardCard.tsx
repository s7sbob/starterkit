// src/views/dashboard/components/DashboardCard.tsx
import React from 'react';
import { Card, CardProps, useTheme } from '@mui/material';

interface DashboardCardProps extends CardProps {
  children: React.ReactNode;
}

const DashboardCard = ({ children, sx, ...props }: DashboardCardProps) => {
  const theme = useTheme();
  
  return (
    <Card
      {...props}
      sx={{
        borderRadius: { xs: 2, md: 3 },
        boxShadow: theme.shadows[2],
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: theme.shadows[4]
        },
        ...sx
      }}
    >
      {children}
    </Card>
  );
};

export default DashboardCard;
