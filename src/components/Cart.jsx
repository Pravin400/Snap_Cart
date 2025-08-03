import React from 'react';
import {
  Drawer,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Button,
  Divider,
  Badge
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  ShoppingCart,
  Close
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import BackButton from './common/BackButton';

const Cart = ({ open, onClose, onBuyNow }) => {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const handleQuantityChange = (productId, change) => {
    const item = items.find(item => item.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(productId, newQuantity);
      } else {
        removeFromCart(productId);
      }
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <>
      {open && <BackButton onClick={onClose} position="fixed" top={80} left={20} />}
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            padding: 2
          }
        }}
      >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          <ShoppingCart sx={{ mr: 1, verticalAlign: 'middle' }} />
          Shopping Cart
          {totalItems > 0 && (
            <Badge
              badgeContent={totalItems}
              color="primary"
              sx={{ ml: 1 }}
            />
          )}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      {items.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
            textAlign: 'center'
          }}
        >
          <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Your cart is empty
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add some products to get started!
          </Typography>
        </Box>
      ) : (
        <>
          <List sx={{ flexGrow: 1, overflow: 'auto' }}>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem
                  sx={{
                    alignItems: 'flex-start',
                    py: 2
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={item.image}
                      alt={item.title}
                      variant="rounded"
                      sx={{
                        width: 60,
                        height: 60,
                        mr: 2
                      }}
                    />
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          lineHeight: 1.2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                          ${item.price?.toFixed(2)}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            sx={{ mr: 1 }}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          
                          <Typography
                            variant="body2"
                            sx={{
                              minWidth: 30,
                              textAlign: 'center',
                              fontWeight: 600
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            sx={{ ml: 1 }}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                          
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveItem(item.id)}
                            color="error"
                            sx={{ ml: 2 }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                        
                        <Typography
                          variant="body2"
                          sx={{ mt: 1, fontWeight: 600 }}
                        >
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Total Items: {totalItems}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Total: ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClearCart}
                sx={{ flex: 1 }}
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                sx={{ flex: 1 }}
                onClick={onBuyNow}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Drawer>
    </>
  );
};

export default Cart;
