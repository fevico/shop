import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    loading: false,
    error: null,
    products: [],
    product: null,
    pagination: {},
    favouritesTogggled: true,
    reviewed: false,
    favourite: JSON.parse(localStorage.getItem('favourites')) ?? [],
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setLoading: (state) =>{
            state.loading = true;
        },
        setProducts: (state, {payload}) =>{
            state.loading = false;
            state.error = null;
            state.products = payload;
        }, 
        setProduct: (state, {payload}) =>{
            state.product = payload;
            state.loading = false;
            state.error = null;
            state.reviewed = false
        },
        setError: (state, {payload}) =>{
            state.loading = false;
            state.error = payload;
        },
        setPagination: (state, {payload}) => {
            state.loading = false;
            state.error = null;
            state.pagination = payload
        }, 
        setFavourite: (state, {payload}) => {
            state.favourite = payload
        },
        setFavouritesToggle: (state, {payload}) =>{
            state.favouritesTogggled = payload;
        }
    },
})

export const {
    setLoading, setProducts, setError, setPagination, setFavourite, setFavouritesToggle, setProduct
} = productsSlice.actions

export default productsSlice.reducer;
export const productSelector = (state) => state.products;