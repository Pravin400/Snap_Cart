import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Grid,
  Rating,
  Chip,
  IconButton
} from '@mui/material';
import { Close, ShoppingCart } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const ProductModal = ({ product, open, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
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
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <Box sx={{ position: 'relative', p: 2 }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            zIndex: 1
          }}
        >
          <Close />
        </IconButton>

        <DialogContent sx={{ pt: 1 }}>
          <Grid container spacing={3}>
            {/* Product Image */}
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 400,
                  objectFit: 'contain',
                  borderRadius: 1,
                  backgroundColor: 'white',
                  padding: 2,
                  border: '1px solid #e0e0e0'
                }}
              />
            </Grid>

            {/* Product Details */}
            <Grid item xs={12} md={7}>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={product.category}
                  variant="outlined"
                  sx={{
                    textTransform: 'capitalize',
                    mb: 2
                  }}
                />
              </Box>

              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 600, lineHeight: 1.3 }}
              >
                {product.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating
                  value={product.rating?.rate || 0}
                  precision={0.1}
                  readOnly
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.rating?.count || 0} reviews)
                </Typography>
              </Box>

              <Typography
                variant="h3"
                color="primary"
                sx={{
                  fontWeight: 700,
                  mb: 3
                }}
              >
                ${product.price?.toFixed(2)}
              </Typography>

              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 600, mb: 1 }}
              >
                Description
              </Typography>
              
              <Typography
                variant="body1"
                paragraph
                sx={{
                  lineHeight: 1.6,
                  color: 'text.secondary'
                }}
              >
                {product.description}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ mr: 2 }}
          >
            Close
          </Button>
          <Button
            onClick={handleAddToCart}
            variant="contained"
            startIcon={<ShoppingCart />}
            size="large"
          >
            Add to Cart
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ProductModal;
