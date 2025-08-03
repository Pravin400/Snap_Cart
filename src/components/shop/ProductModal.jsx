import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  Grid,
  Rating,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import { Close, ShoppingCart, LocalShipping } from '@mui/icons-material';
import { useCart } from '../../context/CartContext';

const ProductModal = ({ product, open, onClose, onBuyNow }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product);
    onBuyNow(product);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh',
          minHeight: '70vh'
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)'
            }
          }}
        >
          <Close />
        </IconButton>

        <DialogContent sx={{ p: 0 }}>
          <Grid container spacing={0} sx={{ minHeight: '70vh' }}>
            {/* Product Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: { xs: '40vh', md: '70vh' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fafafa',
                  p: 4
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

            {/* Product Details */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={product.category}
                    variant="outlined"
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      color: 'primary.main',
                      borderColor: 'primary.main'
                    }}
                  />
                </Box>

                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{ 
                    fontWeight: 600, 
                    lineHeight: 1.3,
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}
                >
                  {product.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Rating
                    value={product.rating?.rate || 0}
                    precision={0.1}
                    readOnly
                    size="large"
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                    ({product.rating?.count || 0} reviews)
                  </Typography>
                </Box>

                <Typography
                  variant="h3"
                  color="primary"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '2rem', md: '2.5rem' }
                  }}
                >
                  ${product.price?.toFixed(2)}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  Description
                </Typography>
                
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    lineHeight: 1.7,
                    color: 'text.secondary',
                    flexGrow: 1
                  }}
                >
                  {product.description}
                </Typography>

                {/* Delivery Info */}
                <Box
                  sx={{
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderRadius: 2,
                    p: 2,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <LocalShipping sx={{ color: 'success.main', mr: 2 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Free Delivery
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Expected delivery in 2-3 business days
                    </Typography>
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                  <Button
                    onClick={handleAddToCart}
                    variant="outlined"
                    startIcon={<ShoppingCart />}
                    size="large"
                    sx={{ 
                      flex: 1,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 600
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
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default ProductModal;
