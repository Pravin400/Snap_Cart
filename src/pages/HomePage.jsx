import React from 'react';
import HeroSlideshow from '../components/home/HeroSlideshow';
import { Container, Typography, Button, Box, Fade } from '@mui/material';

const HomePage = ({ onShopNow }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <HeroSlideshow onShopNow={onShopNow} />
      <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, md: 4 } }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #8b5cf6, #f59e0b)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: 'all 0.3s ease-in-out',
            mb: 3,
            opacity: 0,
            transform: 'translateY(-20px)',
            animation: 'fadeSlideIn 1s forwards',
            '@keyframes fadeSlideIn': {
              from: { opacity: 0, transform: 'translateY(-20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          Explore Our Products
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary" 
          paragraph
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto', 
            mb: 4,
            opacity: 0,
            transform: 'translateY(-10px)',
            animation: 'fadeSlideIn 1s 0.3s forwards'
          }}
        >
          We offer a wide range of high-quality products, from electronics to fashion, ensuring something for everyone.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => onShopNow('shop')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #8b5cf6, #f59e0b)',
              transition: 'all 0.2s ease-in-out',
              opacity: 0,
              transform: 'translateY(10px)',
              animation: 'fadeSlideIn 1s 0.5s forwards',
              '&:hover': {
                background: 'linear-gradient(45deg, #7c3aed, #d97706)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
              }
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
