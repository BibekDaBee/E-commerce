import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart data from localStorage
const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {
        products: [],
        selectedItems: 0,
        totalPrice: 0,
        tax: 0,
        taxRate: 0.05,
        grandTotal: 0,
    };
};

// Initial state loaded from localStorage (if any)
const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find((product) => product._id === action.payload._id);

            if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 });
            } else {
                console.log("Item is already added");
            }

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
            saveCartToLocalStorage(state); // Save to localStorage
        },

        updateQuantity: (state, action) => {
            state.products = state.products.map((product) => {
                if (product._id === action.payload._id) {
                    if (action.payload.type === 'increment') {
                        product.quantity += 1;
                    } else if (action.payload.type === 'decrement' && product.quantity > 1) {
                        product.quantity -= 1;
                    }
                }
                return product;
            });

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);

            saveCartToLocalStorage(state); // Save to localStorage
        },

        removeFromCart: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload._id);
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);

            saveCartToLocalStorage(state); // Save to localStorage
        },

        clearCart: (state) => {
            state.products = [];
            state.selectedItems = 0;
            state.totalPrice = 0;
            state.tax = 0;
            state.grandTotal = 0;

            saveCartToLocalStorage(state); // Save to localStorage
        }
    },
});

// Helper function to save the current cart state to localStorage
const saveCartToLocalStorage = (state) => {
    localStorage.setItem('cart', JSON.stringify(state));
};

export const setSelectedItems = (state) => state.products.reduce((total, product) => total + product.quantity, 0);
export const setTotalPrice = (state) => state.products.reduce((total, product) => total + product.quantity * product.price, 0);
export const setTax = (state) => setTotalPrice(state) * state.taxRate;
export const setGrandTotal = (state) => setTotalPrice(state) + setTax(state);

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
