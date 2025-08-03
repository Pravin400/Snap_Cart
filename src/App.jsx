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
import Cart from './components/Cart';

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
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
      case 'help':
        return (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <h2>Help & Support</h2>
            <p>Contact us at support@sitmax.com or call 1-800-SITMAX</p>
          </Box>
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
            backgroundColor: '#fafafa',
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Navbar 
            onNavigate={handleNavigation}
            onCartClick={handleCartToggle}
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
