import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
  IconButton
} from '@mui/material';
import { ShoppingCart, Visibility, FavoriteBorder, Favorite } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContent';

const ProductCard = ({ product, onViewDetails, onBuyNow }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product);
    onBuyNow();
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    onViewDetails(product);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Card 
      sx={{ 
        width: { xs: '100%', sm: 280 },
        height: { xs: 380, sm: 420 },
        maxWidth: 320,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        margin: '0 auto',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(139, 92, 246, 0.15)',
          '& .product-actions': {
            opacity: 1,
            transform: 'translateY(0)'
          },
          '& .product-image': {
            transform: 'scale(1.02)'
          }
        }
      }}
      onClick={handleViewDetails}
    >
      {/* Wishlist Button */}
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: isInWishlist(product.id) ? '#ef4444' : 'gray',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            color: '#ef4444',
            transform: 'scale(1.1)'
          }
        }}
        onClick={handleWishlistToggle}
      >
        {isInWishlist(product.id) ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
      </IconButton>

      <CardMedia
        component="img"
        className="product-image"
        sx={{
          height: 180,
          objectFit: 'contain',
          padding: '16px',
          backgroundColor: '#fafafa',
          transition: 'transform 0.3s ease-in-out'
        }}
        image={product.image}
        alt={product.title}
      />
      
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box sx={{ mb: 1 }}>
          <Chip 
            label={product.category} 
            size="small" 
            variant="outlined"
            sx={{ 
              textTransform: 'capitalize',
              fontSize: '0.75rem',
              height: 24,
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              color: 'primary.main',
              borderColor: 'primary.main'
            }}
          />
        </Box>
        
        <Typography 
          variant="h6" 
          component="div"
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.6rem',
            mb: 1
          }}
        >
          {product.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating 
            value={product.rating?.rate || 0} 
            precision={0.1} 
            size="small" 
            readOnly 
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.rating?.count || 0})
          </Typography>
        </Box>
        
        <Typography 
          variant="h6" 
          color="primary"
          sx={{ 
            fontWeight: 700,
            fontSize: '1.25rem'
          }}
        >
          ${product.price?.toFixed(2)}
        </Typography>
      </CardContent>
      
      {/* Hover Actions */}
      <Box
        className="product-actions"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          p: 1,
          opacity: 0,
          transform: 'translateY(100%)',
          transition: 'all 0.3s ease'
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={handleBuyNow}
            sx={{ 
              flex: 1, 
              textTransform: 'none',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.2)'
              }
            }}
          >
            Buy Now
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            sx={{ 
              flex: 1, 
              textTransform: 'none',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
              }
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;
