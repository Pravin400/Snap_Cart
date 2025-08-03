import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Fade
} from '@mui/material';
import ProductCard from '../components/shop/ProductCard';
import ProductModal from '../components/shop/ProductModal';
import Loading from '../components/Loading';
import { productAPI } from '../services/api';
import BackButton from '../components/common/BackButton';

const ShopPage = ({ category, searchQuery, onBuyNow, onProductDetail, onBackToHome }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productAPI.getAllProducts(),
          productAPI.getCategories()
        ]);
        
        setProducts(productsData);
        setCategories(['all', ...categoriesData]);
        
        // Apply filters
        let filtered = productsData;
        
        // Filter by search query first
        if (searchQuery && searchQuery.trim()) {
          filtered = filtered.filter(product => 
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        // Then filter by category if specified
        if (category && category !== 'all') {
          filtered = filtered.filter(product => 
            product.category.toLowerCase() === category.toLowerCase()
          );
          setSelectedCategory(category);
        } else if (!searchQuery) {
          // Only show all products if no search query
          setSelectedCategory('all');
        }
        
        setFilteredProducts(filtered);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, searchQuery]);

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    
    // Apply both search and category filters
    let filtered = products;
    
    // Filter by search query if exists
    if (searchQuery && searchQuery.trim()) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Then filter by category
    if (newCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === newCategory.toLowerCase()
      );
    }
    
    setFilteredProducts(filtered);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleBuyNow = (product) => {
    onBuyNow();
  };

  if (loading) {
    return <Loading message="Loading products..." />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  const getCategoryDisplayName = (cat) => {
    if (cat === 'all') return 'All Products';
    return cat.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <>
      <BackButton onClick={onBackToHome} position="fixed" top={80} left={20} />
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
                WebkitTextFillColor: 'transparent'
              }}
            >
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Shop Our Collection'}
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              {searchQuery ? 
                `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} matching your search` : 
                'Discover amazing products at great prices'
              }
            </Typography>
          </Box>

          {/* Category Filter */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: { xs: 0, md: 8 } }}>
            <Box>
              <Chip
                label={`${filteredProducts.length} Products`}
                variant="outlined"
                sx={{ 
                  fontWeight: 600,
                  borderColor: 'primary.main',
                  color: 'primary.main'
                }}
              />
              {selectedCategory !== 'all' && (
                <Chip
                  label={getCategoryDisplayName(selectedCategory)}
                  sx={{ 
                    ml: 1,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    fontWeight: 600
                  }}
                />
              )}
            </Box>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={handleCategoryChange}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {getCategoryDisplayName(cat)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {searchQuery ? 
                  `No products found matching "${searchQuery}"` : 
                  'No products found in this category'
                }
              </Typography>
              {searchQuery && (
                <Typography variant="body2" color="text.secondary">
                  Try searching with different keywords or browse all products
                </Typography>
              )}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Grid 
                container 
                spacing={3} 
                sx={{ 
                  maxWidth: '1200px',
                  justifyContent: 'center'
                }}
              >
                {filteredProducts.map((product, index) => (
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
          )}

          {/* Product Modal */}
          <ProductModal
            product={selectedProduct}
            open={modalOpen}
            onClose={handleCloseModal}
            onBuyNow={handleBuyNow}
          />
        </Box>
      </Fade>
    </Container>
    </>
  );
};

export default ShopPage;
