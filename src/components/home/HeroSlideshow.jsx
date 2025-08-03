import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';
import {
  ArrowBackIos,
  ArrowForwardIos,
  ShoppingBag
} from '@mui/icons-material';

const HeroSlideshow = ({ onShopNow }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Electronics Shop',
      subtitle: 'Latest technology at your fingertips',
      description: 'Discover cutting-edge electronics with advanced features and modern designs.',
      buttonText: 'Shop Electronics',
      category: 'electronics',
      overlay: 'linear-gradient(135deg, rgba(255,152,0,0.7) 0%, rgba(255,152,0,0.4) 100%)'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1506629905607-e9349935ca4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Jewelry Shop',
      subtitle: 'Elegant pieces for special moments',
      description: 'Beautiful jewelry collections that add sparkle to your style.',
      buttonText: 'Shop Jewelry',
      category: 'jewelery',
      overlay: 'linear-gradient(135deg, rgba(156,39,176,0.7) 0%, rgba(156,39,176,0.4) 100%)'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Men\'s Clothing',
      subtitle: 'Stylish wear for modern men',
      description: 'Discover premium men\'s clothing from casual to formal wear.',
      buttonText: 'Shop Men\'s',
      category: "men's clothing",
      overlay: 'linear-gradient(135deg, rgba(33,150,243,0.7) 0%, rgba(33,150,243,0.4) 100%)'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Women\'s Clothing',
      subtitle: 'Elegant fashion for every woman',
      description: 'Beautiful women\'s clothing collection for all occasions.',
      buttonText: 'Shop Women\'s',
      category: "women's clothing",
      overlay: 'linear-gradient(135deg, rgba(233,30,99,0.7) 0%, rgba(233,30,99,0.4) 100%)'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '70vh', md: '90vh' },
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ml: 'calc(-50vw + 50%)',
        mr: 'calc(-50vw + 50%)'
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${currentSlideData.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'all 1s ease-in-out',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: currentSlideData.overlay,
            zIndex: 1
          }
        }}
      />

      {/* Content */}
      <Fade in={true} timeout={1000} key={currentSlide}>
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            color: 'white',
            px: { xs: 3, md: 6 },
            maxWidth: '800px'
          }}
        >
          <Typography
            variant={isMobile ? 'h3' : 'h1'}
            sx={{
              fontWeight: 800,
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              lineHeight: 1.2
            }}
          >
            {currentSlideData.title}
          </Typography>

          <Typography
            variant={isMobile ? 'h6' : 'h4'}
            sx={{
              fontWeight: 400,
              mb: 3,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              opacity: 0.9
            }}
          >
            {currentSlideData.subtitle}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              fontSize: { xs: '1rem', md: '1.2rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            {currentSlideData.description}
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingBag />}
            onClick={() => onShopNow('shop', { category: currentSlideData.category })}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
              textTransform: 'none',
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(25, 118, 210, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {currentSlideData.buttonText}
          </Button>
        </Box>
      </Fade>

      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrevSlide}
        sx={{
          position: 'absolute',
          left: { xs: 16, md: 32 },
          zIndex: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
          }
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        onClick={handleNextSlide}
        sx={{
          position: 'absolute',
          right: { xs: 16, md: 32 },
          zIndex: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
          }
        }}
      >
        <ArrowForwardIos />
      </IconButton>

      {/* Slide Indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 3
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'white'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HeroSlideshow;
