import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Filters from './components/Filters/Filters';
import ProductList from './components/Product-List/Product-List';
import ProductDetails from './components/Product-Details/Product-Details';
import { getProducts } from "./Services/api.js";
import { saveToStorage, loadFromStorage } from './utils/storage';
import { debounce } from './utils/debounce';
import './App.css';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filters, setFilters] = useState(() => {
        // بارگذاری فیلترها از localStorage
        return loadFromStorage('filters', {
            priceRange: { min: 0, max: 1000 },
            inStock: false
        });
    });
    const [sortBy, setSortBy] = useState(() => {
        return loadFromStorage('sortBy', 'default');
    });
    const [cartCount, setCartCount] = useState(() => {
        return loadFromStorage('cartCount', 0);
    });
    const [cartItems, setCartItems] = useState(() => {
        return loadFromStorage('cartItems', []);
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState(() => {
        // بارگذاری محصولات از localStorage
        return loadFromStorage('products', []);
    });
    const [loading, setLoading] = useState(products.length === 0);
    const [error, setError] = useState(null);
    const productsPerPage = 9;

    // تابع debounce برای جستجو
    const debouncedSearch = useCallback(
        debounce((term) => {
            setDebouncedSearchTerm(term);
            setCurrentPage(1);
        }, 500),
        []
    );

    const handleSearch = (term) => {
        setSearchTerm(term);
        debouncedSearch(term);
    };

    // دریافت محصولات از API (اگه تو localStorage نباشه)
    useEffect(() => {
        const fetchProducts = async () => {
            if (products.length > 0) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await getProducts();

                const formattedProducts = data.map(product => ({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    category: product.category,
                    image: product.image,
                    description: product.description,
                    inStock: Math.random() > 0.3,
                }));

                setProducts(formattedProducts);
                saveToStorage('products', formattedProducts);
                setError(null);
            } catch (err) {
                setError('Error fetching products');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [products.length]);

    // ذخیره فیلترها در localStorage
    useEffect(() => {
        saveToStorage('filters', filters);
    }, [filters]);

    // ذخیره sortBy در localStorage
    useEffect(() => {
        saveToStorage('sortBy', sortBy);
    }, [sortBy]);

    // ذخیره سبد خرید در localStorage
    useEffect(() => {
        saveToStorage('cartItems', cartItems);
        saveToStorage('cartCount', cartCount);
    }, [cartItems, cartCount]);

    // فیلتر محصولات (با استفاده از debouncedSearchTerm)
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // فیلتر دسته‌بندی
            if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;

            // فیلتر قیمت
            if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;

            // فیلتر موجودی
            if (filters.inStock && !product.inStock) return false;

            // فیلتر جستجو (با debounced term)
            if (debouncedSearchTerm && !product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) return false;

            return true;
        });
    }, [products, selectedCategory, filters, debouncedSearchTerm]);

    // مرتب‌سازی محصولات
    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            return 0;
        });
    }, [filteredProducts, sortBy]);

    // صفحه‌بندی
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePriceChange = (range) => {
        setFilters(prev => ({ ...prev, priceRange: range }));
        setCurrentPage(1);
    };

    const handleAvailabilityChange = (inStock) => {
        setFilters(prev => ({ ...prev, inStock }));
        setCurrentPage(1);
    };

    const handleSortChange = (sortType) => {
        setSortBy(sortType);
        setCurrentPage(1);
    };

    const handleAddToCart = (product) => {
        setCartItems(prev => [...prev, product]);
        setCartCount(prev => prev + 1);
        alert(`${product.title} added to cart!`);
    };

    // نمایش لودینگ
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    // نمایش خطا
    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center text-red-600">
                    <p className="text-xl">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={
                <div className="min-h-screen bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Header
                            onSearch={handleSearch}
                            onCategorySelect={handleCategorySelect}
                            selectedCategory={selectedCategory}
                            cartCount={cartCount}
                            showCategories={true}
                        />
                    </div>

                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <aside className="lg:w-1/4">
                                <div className="sticky top-4">
                                    <Filters
                                        onPriceChange={handlePriceChange}
                                        onAvailabilityChange={handleAvailabilityChange}
                                        onSortChange={handleSortChange}
                                        minPrice={0}
                                        maxPrice={1000}
                                    />
                                </div>
                            </aside>

                            <div className="lg:w-3/4">
                                <ProductList
                                    products={currentProducts}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    totalProducts={sortedProducts.length}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            } />

            <Route path="/product/:id" element={
                <ProductDetails
                    cartCount={cartCount}
                    onSearch={handleSearch}
                    onAddToCart={handleAddToCart}
                />
            } />
        </Routes>
    );
}

export default App;