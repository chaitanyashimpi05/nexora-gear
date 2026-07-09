import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("nexora_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("nexora_cart", JSON.stringify(cart));
  }, [cart]);

  // Add Item to Cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        // Add new item
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.images[0],
            category: product.category,
            stockStatus: product.stockStatus
          }
        ];
      }
    });
  };

  // Remove Item from Cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update Item Quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  // Get total items in cart
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Financial calculations
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // 18% GST (Indian tax standard)
  const gst = Math.round(subtotal * 0.18);
  
  // Shipping Charges: Free shipping above ₹9,999, else ₹150
  const shippingThreshold = 9999;
  const shipping = subtotal > 0 && subtotal < shippingThreshold ? 150 : 0;
  
  const grandTotal = subtotal + gst + shipping;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        gst,
        shipping,
        grandTotal,
        shippingThreshold
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
