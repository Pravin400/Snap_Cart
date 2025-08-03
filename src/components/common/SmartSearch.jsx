import React, { useState, useEffect } from 'react';
import {
  TextField,
  Autocomplete,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  Chip
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { productAPI } from '../../services/api';

const SmartSearch = ({ onSearch, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productAPI.getAllProducts();
        setAllProducts(products);
      } catch (error) {
        console.error('Failed to fetch products for search:', error);
      }
    };
    fetchProducts();
  }, []);

  const generateSuggestions = (query) => {
    if (!query || query.length < 2) return [];
    
    const lowercaseQuery = query.toLowerCase();
    const suggestions = new Set();
    
    allProducts.forEach(product => {
      // Add product titles that match
      if (product.title.toLowerCase().includes(lowercaseQuery)) {
        suggestions.add(product.title);
      }
      
      // Add categories that match
      if (product.category.toLowerCase().includes(lowercaseQuery)) {
        suggestions.add(product.category);
      }
      
      // Add brand names if they exist in title (like Samsung, Apple, etc.)
      const words = product.title.split(' ');
      words.forEach(word => {
        if (word.toLowerCase().startsWith(lowercaseQuery) && word.length > 2) {
          suggestions.add(word);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 8);
  };

  const handleInputChange = (event, newValue) => {
    setSearchQuery(newValue);
    if (newValue && newValue.length >= 2) {
      const newSuggestions = generateSuggestions(newValue);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (searchTerm = searchQuery) => {
    if (searchTerm && searchTerm.trim()) {
      onSearch(searchTerm.trim());
      onNavigate('shop');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  const handleSuggestionSelect = (event, value) => {
    if (value) {
      setSearchQuery(value);
      handleSearch(value);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex' }}>
      <Autocomplete
        freeSolo
        options={suggestions}
        value={searchQuery}
        onInputChange={handleInputChange}
        onChange={handleSuggestionSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            placeholder="Search products..."
            sx={{
              minWidth: { xs: 160, md: 220 },
              width: { xs: '100%', md: 'auto' },
              backgroundColor: 'white',
              borderRadius: 1,
              transition: 'all 0.2s ease-in-out',
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(99, 102, 241, 0.1)'
                },
                '&.Mui-focused': {
                  boxShadow: '0 2px 12px rgba(99, 102, 241, 0.2)'
                }
              }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    type="submit" 
                    size="small"
                    sx={{ 
                      color: 'primary.main',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        color: 'primary.dark'
                      }
                    }}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            sx={{
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                transform: 'translateX(4px)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Search sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2">{option}</Typography>
            </Box>
          </Box>
        )}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.1)',
            mt: 1
          }
        }}
      />
    </Box>
  );
};

export default SmartSearch;
