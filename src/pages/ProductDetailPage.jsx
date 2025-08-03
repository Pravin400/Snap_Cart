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
  ArrowBack, 
  ShoppingCart, 
  LocalShipping, 
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContent';

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
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
      {/* Back Button and Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <IconButton 
          onClick={onBack}
          sx={{ 
            mb: 2,
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.2)'
            }
          }}
        >
          <ArrowBack />
        </IconButton>
        
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
        {/* Product Image */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              height: { xs: '400px', md: '500px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderRadius: 2,
              p: 3,
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
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
                    '&:hover': {
                      borderWidth: 2
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
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0, #1976d2)'
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
                    color: isInWishlist(product.id) ? 'red' : 'gray',
                    '&:hover': {
                      color: 'red',
                      backgroundColor: 'rgba(255, 0, 0, 0.1)'
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

      {/* Bottom Content - Below the image */}
      <Box sx={{ mt: 4 }}>
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
