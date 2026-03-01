import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD': {
            const existing = state.find(i => i.id === action.product.id);
            if (existing) {
                return state.map(i =>
                    i.id === action.product.id ? { ...i, qty: i.qty + (action.qty ?? 1) } : i
                );
            }
            return [...state, { ...action.product, qty: action.qty ?? 1 }];
        }
        case 'REMOVE':
            return state.filter(i => i.id !== action.id);
        case 'UPDATE_QTY':
            return state.map(i =>
                i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
            );
        case 'CLEAR':
            return [];
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    const addToCart = (product, qty = 1) => dispatch({ type: 'ADD', product, qty });
    const removeFromCart = (id) => dispatch({ type: 'REMOVE', id });
    const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty });
    const clearCart = () => dispatch({ type: 'CLEAR' });

    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = cart.reduce((sum, i) => sum + i.priceRaw * i.qty, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, subtotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
