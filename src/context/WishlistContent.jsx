import React, { createContext, useContext, useReducer } from 'react';

// Wishlist reducer
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Item already in wishlist
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: []
      };
    
    default:
      return state;
  }
};

// Initial wishlist state
const initialState = {
  items: []
};

// Create context
const WishlistContext = createContext();

// Wishlist provider component
export const WishlistProvider = ({ children, onShowSnackbar }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Calculate total items
  const totalItems = state.items.length;

  const addToWishlist = (product) => {
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      if (onShowSnackbar) {
        onShowSnackbar(`${product.title} is already in wishlist`, 'info');
      }
      return;
    }
    
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    if (onShowSnackbar) {
      onShowSnackbar(`${product.title} added to wishlist!`, 'success');
    }
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      ...state,
      totalItems,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
