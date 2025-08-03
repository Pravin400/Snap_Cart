import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box
} from '@mui/material';
import { ShoppingCart, Store } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const Header = ({ onCartClick }) => {
  const { totalItems } = useCart();

  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Toolbar>
        <Store sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 1,
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Mini E-Commerce Store
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {totalItems > 0 && (
            <Typography
              variant="body2"
              sx={{ 
                mr: 1,
                display: { xs: 'none', sm: 'block' }
              }}
            >
              {totalItems} item{totalItems !== 1 ? 's' : ''}
            </Typography>
          )}
          
          <IconButton
            color="inherit"
            onClick={onCartClick}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
