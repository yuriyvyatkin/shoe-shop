import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider(props) {
  const [cart, setCart] = useState(function () {
    let savedCart = [];

    try {
      savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
      savedCart = [];
    }

    return savedCart;
  });

  useEffect(() => {
    if (cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  function getProductIndex(id, size) {
    const index = cart.findIndex((product) => {
      return product.id === id && product.size === size;
    });

    return index;
  }

  function handleProductAdd(newProduct) {
    const { id, size } = newProduct;
    const index = getProductIndex(id, size);

    if (index !== -1) {
      const newCount= cart[index].count + newProduct.count;

      const updatedCart = cart.slice();

      updatedCart[index].count = newCount > 10 ? 10 : newCount;

      setCart(updatedCart);
    } else {
      setCart([...cart, newProduct]);
    }
  }

  function handleProductDelete(index) {
    const updatedCart = [
      ...cart.slice(0, index),
      ...cart.slice(index + 1),
    ];

    setCart(updatedCart);
  }

  function handleCartClear() {
    setCart([]);
  }

  const value = {
    cart,
    onProductAdd: handleProductAdd,
    onProductDelete: handleProductDelete,
    onCartClear: handleCartClear,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
}
