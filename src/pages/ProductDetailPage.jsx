import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Rating,
  Chip,
  IconButton,
  Divider,
  Breadcrumbs,
  Link
} from '@mui/material';
import { 
  ShoppingCart, 
  LocalShipping, 
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContent';
import BackButton from '../components/common/BackButton';

const ProductDetailPage = ({ product, onBack, onBuyNow }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6">Product not found</Typography>
        <Button onClick={onBack} sx={{ mt: 2 }}>Go Back</Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    onBuyNow();
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Fixed Back Button - Top Left Corner */}
      <BackButton onClick={onBack} position="fixed" top={80} left={20} />
      
      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        
        <Breadcrumbs>
          <Link 
            underline="hover" 
            color="inherit" 
            href="#" 
            onClick={(e) => { e.preventDefault(); onBack(); }}
          >
            Shop
          </Link>
          <Typography color="text.primary">{product.title}</Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={4}>
        {/* Fixed Product Image Area */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              width: '100%',
              height: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: 2,
              p: 3,
              border: '2px solid #f1f5f9',
              boxShadow: '0 8px 25px rgba(99, 102, 241, 0.1)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                borderColor: 'rgba(99, 102, 241, 0.3)',
                boxShadow: '0 12px 30px rgba(99, 102, 241, 0.15)'
              }
            }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                maxWidth: '350px',
                maxHeight: '400px',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                transition: 'transform 0.3s ease-in-out'
              }}
            />
          </Box>
        </Grid>

        {/* Product Details - Right Side aligned with image */}
        <Grid item xs={12} md={7}>
          <Box sx={{ height: { xs: 'auto', md: '500px' }, display: 'flex', flexDirection: 'column' }}>
            {/* Top Section - Aligned with Image */}
            <Box sx={{ flex: 1 }}>
              {/* Breadcrumb and Category */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {product.category?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Typography>
              </Box>

              {/* Product Title */}
              <Typography
                variant="h4"
                component="h1"
                sx={{ 
                  fontWeight: 700, 
                  lineHeight: 1.3,
                  fontSize: { xs: '1.5rem', md: '1.8rem' },
                  mb: 2,
                  color: '#232F3E'
                }}
              >
                {product.title}
              </Typography>

              {/* Rating and Reviews */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating
                  value={product.rating?.rate || 0}
                  precision={0.1}
                  readOnly
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="primary" sx={{ mr: 1, textDecoration: 'underline', cursor: 'pointer' }}>
                  {product.rating?.rate || 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({product.rating?.count || 0} customer reviews)
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Price Section */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Price:
                  </Typography>
                  <Typography
                    variant="h4"
                    color="#B12704"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '1.6rem', md: '2rem' }
                    }}
                  >
                    ${product.price?.toFixed(2)}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  & FREE Returns
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  onClick={handleAddToCart}
                  variant="outlined"
                  startIcon={<ShoppingCart />}
                  size="large"
                  sx={{ 
                    flex: 1,
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderWidth: 2,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
                    }
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="contained"
                  size="large"
                  sx={{ 
                    flex: 1,
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'none',
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #6366f1, #8b89f8)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #4f46e5, #6366f1)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                    }
                  }}
                >
                  Buy Now
                </Button>
              </Box>

              {/* Wishlist Button */}
              <Box sx={{ mb: 2 }}>
                <Button
                  onClick={handleWishlistToggle}
                  variant="text"
                  startIcon={isInWishlist(product.id) ? <Favorite /> : <FavoriteBorder />}
                  sx={{
                    color: isInWishlist(product.id) ? '#ef4444' : 'gray',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      color: '#ef4444',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      transform: 'scale(1.02)'
                    }
                  }}
                >
                  {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Content - Center the content */}
      <Box sx={{ mt: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Divider sx={{ mb: 4 }} />
            
            {/* Product Description */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#232F3E' }}>
                About this item
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.6,
                  color: '#0F1111',
                  fontSize: '1rem',
                  mb: 3
                }}
              >
                {product.description}
              </Typography>
            </Box>

            {/* Delivery Info */}
            <Box
              sx={{
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderRadius: 2,
                p: 3,
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                maxWidth: '600px'
              }}
            >
              <LocalShipping sx={{ color: 'success.main', mr: 2, fontSize: 32 }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                  Free Delivery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expected delivery in 2-3 business days
                </Typography>
              </Box>
            </Box>

            {/* Additional Product Info */}
            <Box 
              sx={{ 
                backgroundColor: '#f5f5f5', 
                borderRadius: 2, 
                p: 3,
                border: '1px solid #e0e0e0',
                maxWidth: '600px'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Product Details
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Category:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                    {product.category}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Rating:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {product.rating?.rate || 0}/5.0
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Reviews:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {product.rating?.count || 0} customer reviews
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
