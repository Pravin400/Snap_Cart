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
  Favorite,
  Search
} from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContent';

const Navbar = ({ onNavigate, onCartClick, currentPage, onSearch }) => {
  const { totalItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [categoryAnchor, setCategoryAnchor] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
      onNavigate('shop');
    }
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
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Store sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography
              variant="h6"
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              SITMAX
            </Typography>
          </Box>

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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Store sx={{ mr: 1, color: theme.palette.primary.main, fontSize: 32 }} />
          <Typography
            variant="h5"
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '1px'
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
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  color: theme.palette.primary.main
                }
              }}
            >
              {item.label}
            </Button>
          ))}
          
          {/* Search Bar */}
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex' }}>
            <TextField
              size="small"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                minWidth: 250,
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      type="submit" 
                      size="small"
                      sx={{ color: 'primary.main' }}
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>

          <IconButton 
            sx={{ 
              color: 'black',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                color: 'red'
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
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
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
                  backgroundColor: 'rgba(25, 118, 210, 0.1)'
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
