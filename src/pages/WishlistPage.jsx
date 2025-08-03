import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Container,
  Fade,
  Button,
  Chip
} from '@mui/material';
import { Favorite, ShoppingBag } from '@mui/icons-material';
import ProductCard from '../components/shop/ProductCard';
import { useWishlist } from '../context/WishlistContent';
import BackButton from '../components/common/BackButton';

const WishlistPage = ({ onBuyNow, onProductDetail, onBackToShop }) => {
  const { items: wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <>
        <BackButton onClick={onBackToShop} position="fixed" top={80} left={20} />
        <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Fade in={true} timeout={800}>
          <Box>
            <Favorite 
              sx={{ 
                fontSize: 80, 
                color: 'text.secondary', 
                mb: 3,
                opacity: 0.5 
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #8b5cf6, #f59e0b)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Your Wishlist is Empty
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Add some products to your wishlist to see them here
            </Typography>
            <Button
              variant="contained"
              startIcon={<ShoppingBag />}
              onClick={onBackToShop}
              sx={{
                mt: 3,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: 'linear-gradient(45deg, #8b5cf6, #f59e0b)',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #7c3aed, #d97706)',
                  boxShadow: '0 8px 30px rgba(139, 92, 246, 0.5)',
                }
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Fade>
      </Container>
      </>
    );
  }

  return (
    <>
      <BackButton onClick={onBackToShop} position="fixed" top={80} left={20} />
      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 }, width: '100%' }}>
      <Fade in={true} timeout={800}>
        <Box sx={{ width: '100%' }}>
          {/* Header */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #8b5cf6, #06b6d4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <Favorite sx={{ fontSize: 40, color: '#ef4444' }} />
              My Wishlist
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              {wishlistItems.length} product{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
            </Typography>
          </Box>

          {/* Wishlist Items Count */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Chip
                label={`${wishlistItems.length} Products`}
                variant="outlined"
                sx={{ 
                  fontWeight: 600,
                  borderColor: 'primary.main',
                  color: 'primary.main'
                }}
              />
              <Chip
                label="Wishlist Items"
                sx={{ 
                  ml: 1,
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  fontWeight: 600
                }}
              />
            </Box>

            <Button
              variant="outlined"
              startIcon={<ShoppingBag />}
              onClick={onBackToShop}
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                  borderColor: 'primary.dark'
                }
              }}
            >
              Continue Shopping
            </Button>
          </Box>

          {/* Products Grid */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid 
              container 
              spacing={3} 
              sx={{ 
                maxWidth: '1200px',
                justifyContent: 'center'
              }}
            >
              {wishlistItems.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={product.id}>
                  <Fade in={true} timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
                    <div>
                      <ProductCard 
                        product={product} 
                        onViewDetails={onProductDetail}
                        onBuyNow={onBuyNow}
                      />
                    </div>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Fade>
    </Container>
    </>
  );
};

export default WishlistPage;
