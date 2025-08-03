import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Snackbar, Alert, Box } from '@mui/material';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContent';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import Cart from './components/Cart';
import BackButton from './components/common/BackButton';

// Create stunning beautiful color scheme - Sexy & Attractive
const theme = createTheme({
  palette: {
    primary: {
      main: '#8b5cf6', // Beautiful Purple - Magical brand color
      dark: '#7c3aed',
      light: '#c4b5fd',
    },
    secondary: {
      main: '#f59e0b', // Golden Amber - Luxury accent
      dark: '#d97706',
      light: '#fbbf24',
    },
    info: {
      main: '#06b6d4', // Electric Cyan - Modern tech color
      dark: '#0891b2',
      light: '#67e8f9',
    },
    success: {
      main: '#10b981', // Emerald Success
    },
    warning: {
      main: '#f59e0b', // Golden Warning
    },
    error: {
      main: '#ef4444', // Vibrant Red
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        },
      },
    },
  },
});

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleNavigation = (page, options = {}) => {
    if (page === 'shop' && options.category) {
      setCategoryFilter(options.category);
      setSearchQuery(''); 
    } else {
      setCategoryFilter(null);
      if (page !== 'shop') {
        setSearchQuery(''); 
      }
    }
    setCurrentPage(page);
  };

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };

  const handleWishlistClick = () => {
    setCurrentPage('wishlist');
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleShowSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBuyNow = () => {
    setCurrentPage('checkout');
    setCartOpen(false);
  };

  const handleOrderComplete = () => {
    setCurrentPage('home');
    handleShowSnackbar('Thank you for your order!', 'success');
  };

  const handleProductDetail = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleBackToShop = () => {
    setCurrentPage('shop');
    setSelectedProduct(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCategoryFilter(null); 
    setCurrentPage('shop');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onShopNow={handleNavigation} />;
      case 'shop':
        return (
          <ShopPage 
            category={categoryFilter} 
            searchQuery={searchQuery}
            onBuyNow={handleBuyNow}
            onProductDetail={handleProductDetail}
            onBackToHome={() => handleNavigation('home')}
          />
        );
      case 'product-detail':
        return (
          <ProductDetailPage 
            product={selectedProduct}
            onBack={handleBackToShop}
            onBuyNow={handleBuyNow}
          />
        );
      case 'checkout':
        return <CheckoutPage onOrderComplete={handleOrderComplete} />;
      case 'wishlist':
        return (
          <WishlistPage 
            onBuyNow={handleBuyNow}
            onProductDetail={handleProductDetail}
            onBackToShop={() => handleNavigation('shop')}
          />
        );
      case 'help':
        return (
          <>
            <BackButton onClick={() => handleNavigation('home')} position="fixed" top={80} left={20} />
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <h2>Help & Support</h2>
              <p>Contact us at <a href="#">SITMAX123@gmail.com</a> or call: <a href="#">+91 82xxx91xxx</a></p>
            </Box>
          </>
        );
      default:
        return <HomePage onShopNow={handleNavigation} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider onShowSnackbar={handleShowSnackbar}>
        <WishlistProvider onShowSnackbar={handleShowSnackbar}>
          <Box sx={{ 
            minHeight: '100vh', 
            width: '100vw',
          background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #fef3c7 100%)',
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Navbar 
            onNavigate={handleNavigation}
            onCartClick={handleCartToggle}
            onWishlistClick={handleWishlistClick}
            onSearch={handleSearch}
            currentPage={currentPage}
          />
          
          <Box sx={{ 
            flexGrow: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch'
          }}>
            <Box sx={{ width: '100%', maxWidth: '100vw' }}>
              {renderCurrentPage()}
            </Box>
          </Box>
          
          <Cart open={cartOpen} onClose={handleCartClose} onBuyNow={handleBuyNow} />

          <Snackbar
            open={snackbarOpen} 
            autoHideDuration={4000} 
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={handleSnackbarClose} 
              severity={snackbarSeverity}
              elevation={6} 
              variant="filled"
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
          </Box>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
