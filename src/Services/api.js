import axios from 'axios';

// Base URL برای FakeStoreAPI
const API_URL = 'https://fakestoreapi.com';

// دریافت همه محصولات
export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

// دریافت دسته‌بندی‌ها
export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/products/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

// دریافت محصولات بر اساس دسته‌بندی
export const getProductsByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_URL}/products/category/${category}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching products in category ${category}:`, error);
        return [];
    }
};

// دریافت یک محصول با ID
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
    }
};