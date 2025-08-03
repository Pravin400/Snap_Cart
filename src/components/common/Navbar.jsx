import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  ShoppingCart,
  Store,
  Menu as MenuIcon,
  KeyboardArrowDown,
  Favorite
} from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContent';
import SmartSearch from './SmartSearch';

const Navbar = ({ onNavigate, onCartClick, currentPage, onSearch, onWishlistClick }) => {
  const { totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [categoryAnchor, setCategoryAnchor] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: "men's clothing", name: "Men's Clothing" },
    { id: "women's clothing", name: "Women's Clothing" },
    { id: 'jewelery', name: 'Jewelry' }
  ];

  const handleCategoryClick = (event) => {
    setCategoryAnchor(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryAnchor(null);
  };

  const handleCategorySelect = (category) => {
    onNavigate('shop', { category });
    handleCategoryClose();
  };

  const handleMobileMenuClick = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const navItems = [
    { label: 'HOME', action: () => onNavigate('home') },
    { label: 'SHOP', action: () => onNavigate('shop') },
    { 
      label: 'CATEGORY', 
      action: handleCategoryClick,
      hasDropdown: true 
    },
    { label: 'HELP', action: () => onNavigate('help') }
  ];

  if (isMobile) {
    return (
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          color: 'black',
          boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleMobileMenuClick}
            sx={{ mr: 2, color: 'black' }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box 
            sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, cursor: 'pointer' }}
            onClick={() => onNavigate('home')}
          >
            <Store sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography
              variant="h6"
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #8b5cf6, #c4b5fd)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              SITMAX
            </Typography>
          </Box>

          <IconButton 
            onClick={onWishlistClick} 
            sx={{ 
              color: 'black',
              mr: 1,
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: '#ef4444'
              }
            }}
          >
            <Badge badgeContent={wishlistItems} color="error">
              <Favorite />
            </Badge>
          </IconButton>

          <IconButton onClick={onCartClick} sx={{ color: 'black' }}>
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
          >
            {navItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => {
                  item.action();
                  handleMobileMenuClose();
                }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        color: 'black',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
        zIndex: 1000
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        <Box 
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => onNavigate('home')}
        >
          <Store sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 32 }} />
          <Typography
            variant="h5"
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #8b5cf6, #c4b5fd)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '1px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            SITMAX
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              onClick={item.action}
              endIcon={item.hasDropdown ? <KeyboardArrowDown /> : null}
              sx={{
                color: 'black',
                fontWeight: 600,
                fontSize: '0.95rem',
                textTransform: 'none',
                letterSpacing: '0.5px',
                '&:hover': {
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  color: theme.palette.primary.main
                }
              }}
            >
              {item.label}
            </Button>
          ))}
          
          {/* Smart Search Bar */}
          <SmartSearch onSearch={onSearch} onNavigate={onNavigate} />

          <IconButton 
            onClick={onWishlistClick}
            sx={{ 
              color: 'black',
              '&:hover': {
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                color: '#ef4444'
              }
            }}
          >
            <Badge badgeContent={wishlistItems} color="error">
              <Favorite />
            </Badge>
          </IconButton>

          <IconButton 
            onClick={onCartClick} 
            sx={{ 
              color: 'black',
              '&:hover': {
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                color: theme.palette.primary.main
              }
            }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>

        <Menu
          anchorEl={categoryAnchor}
          open={Boolean(categoryAnchor)}
          onClose={handleCategoryClose}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
            }
          }}
        >
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              sx={{ 
                minWidth: 180,
                '&:hover': {
                  backgroundColor: 'rgba(139, 92, 246, 0.1)'
                }
              }}
            >
              {category.name}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
