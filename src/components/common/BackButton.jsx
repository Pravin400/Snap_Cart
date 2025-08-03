import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const BackButton = ({ onClick, position = 'relative', top = 20, left = 20 }) => {
  const isFixed = position === 'fixed';
  
  return (
    <IconButton 
      onClick={onClick}
      sx={{ 
        position: position,
        top: isFixed ? top : 'auto',
        left: isFixed ? left : 'auto',
        zIndex: isFixed ? 1000 : 'auto',
        backgroundColor: 'rgba(139, 92, 246, 0.9)',
        color: 'white',
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
        transition: 'all 0.2s ease-in-out',
        mb: isFixed ? 0 : 2,
        mr: isFixed ? 0 : 2,
        '&:hover': {
          backgroundColor: 'rgba(124, 58, 237, 1)',
          transform: 'translateX(-2px) scale(1.05)',
          boxShadow: '0 8px 20px rgba(139, 92, 246, 0.5)'
        }
      }}
    >
      <ArrowBack />
    </IconButton>
  );
};

export default BackButton;
