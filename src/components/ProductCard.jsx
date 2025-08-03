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
  Rating
} from '@mui/material';
import { ShoppingCart, Visibility } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    onViewDetails(product);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
          cursor: 'pointer'
        }
      }}
      onClick={handleViewDetails}
    >
      <CardMedia
        component="img"
        sx={{
          height: 200,
          objectFit: 'contain',
          padding: 2,
          backgroundColor: 'white'
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
              fontSize: '0.75rem'
            }}
          />
        </Box>
        
        <Typography 
          gutterBottom 
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
            minHeight: '2.6rem'
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
      
      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<Visibility />}
          onClick={handleViewDetails}
          sx={{ mr: 1, flex: 1 }}
        >
          View Details
        </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          sx={{ flex: 1 }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
