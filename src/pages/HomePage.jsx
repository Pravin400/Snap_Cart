import React from 'react';
import HeroSlideshow from '../components/home/HeroSlideshow';
import { Container, Typography, Button, Box } from '@mui/material';

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
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3
          }}
        >
          Explore Our Products
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary" 
          paragraph
          sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
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
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0, #1976d2)'
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
