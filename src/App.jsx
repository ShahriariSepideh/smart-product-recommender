import React, { useState } from 'react';
import Header from './components/header/Header';
import PriceFilter from './Components/Price-Filter/Price-Filter';
import ProductList from "./Components/Product-List/Product-List.jsx";

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all'); // state  برای دسته‌بندی
    const [filters, setFilters] = useState({
        priceRange: { min: 0, max: 2000 },
        colors: [],
        os: [],
        inStock: false
    });
    const [sortBy, setSortBy] = useState('default');
    const [cartCount, setCartCount] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;


    const products = [
        // Apple Products
        {
            id: 1,
            title: 'iPhone 14 Pro',
            price: 999,
            color: 'purple',
            os: 'ios',
            inStock: true,
            category: 'iphone',
            image: 'https://via.placeholder.com/400x400/000000/ffffff?text=iPhone+14+Pro'
        },
        {
            id: 2,
            title: 'iPhone 14',
            price: 799,
            color: 'blue',
            os: 'ios',
            inStock: true,
            category: 'iphone',
            image: 'https://via.placeholder.com/400x400/000000/ffffff?text=iPhone+14'
        },
        {
            id: 3,
            title: 'iPhone 13 Pro Max',
            price: 1099,
            color: 'gold',
            os: 'ios',
            inStock: false,
            category: 'iphone',
            image: 'https://via.placeholder.com/400x400/000000/ffffff?text=iPhone+13+Pro+Max'
        },
        {
            id: 4,
            title: 'iPhone 13',
            price: 699,
            color: 'red',
            os: 'ios',
            inStock: true,
            category: 'iphone',
            image: 'https://via.placeholder.com/400x400/000000/ffffff?text=iPhone+13'
        },
        {
            id: 5,
            title: 'iPhone SE',
            price: 429,
            color: 'black',
            os: 'ios',
            inStock: true,
            category: 'iphone',
            image: 'https://via.placeholder.com/400x400/000000/ffffff?text=iPhone+SE'
        },
        {
            id: 6,
            title: 'iPhone 12',
            price: 599,
            color: 'white',
            os: 'ios',
            inStock: true,
            category: 'iphone',
            image: 'https://via.placeholder.com/400x400/000000/ffffff?text=iPhone+12'
        },
        {
            id: 7,
            title: 'iPhone 11',
            price: 499,
            color: 'purple',
            os: 'ios',
            inStock: false,
            category: 'iphone',
            image: 'https://via.placeholder.com/400x400/000000/ffffff?text=iPhone+11'
        },
        // Samsung Products
        {
            id: 8,
            title: 'Samsung Galaxy S23 Ultra',
            price: 1199,
            color: 'black',
            os: 'android',
            inStock: true,
            category: 'samsung',
            image: 'https://via.placeholder.com/400x400/1428A0/ffffff?text=S23+Ultra'
        },
        {
            id: 9,
            title: 'Samsung Galaxy S23+',
            price: 999,
            color: 'green',
            os: 'android',
            inStock: true,
            category: 'samsung',
            image: 'https://via.placeholder.com/400x400/1428A0/ffffff?text=S23%2B'
        },
        {
            id: 10,
            title: 'Samsung Galaxy S23',
            price: 799,
            color: 'purple',
            os: 'android',
            inStock: false,
            category: 'samsung',
            image: 'https://via.placeholder.com/400x400/1428A0/ffffff?text=S23'
        },
        {
            id: 11,
            title: 'Samsung Galaxy Z Fold5',
            price: 1799,
            color: 'blue',
            os: 'android',
            inStock: true,
            category: 'samsung',
            image: 'https://via.placeholder.com/400x400/1428A0/ffffff?text=Z+Fold5'
        },
        {
            id: 12,
            title: 'Samsung Galaxy Z Flip5',
            price: 999,
            color: 'gold',
            os: 'android',
            inStock: true,
            category: 'samsung',
            image: 'https://via.placeholder.com/400x400/1428A0/ffffff?text=Z+Flip5'
        },
        // Xiaomi Products
        {
            id: 13,
            title: 'Xiaomi 13 Pro',
            price: 899,
            color: 'blue',
            os: 'android',
            inStock: true,
            category: 'xiaomi',
            image: 'https://via.placeholder.com/400x400/FF6900/ffffff?text=Xiaomi+13+Pro'
        },
        {
            id: 14,
            title: 'Xiaomi 13',
            price: 699,
            color: 'green',
            os: 'android',
            inStock: true,
            category: 'xiaomi',
            image: 'https://via.placeholder.com/400x400/FF6900/ffffff?text=Xiaomi+13'
        },
        {
            id: 15,
            title: 'Xiaomi 12T',
            price: 549,
            color: 'black',
            os: 'android',
            inStock: false,
            category: 'xiaomi',
            image: 'https://via.placeholder.com/400x400/FF6900/ffffff?text=Xiaomi+12T'
        },
        // Google Products
        {
            id: 16,
            title: 'Google Pixel 7 Pro',
            price: 899,
            color: 'white',
            os: 'android',
            inStock: true,
            category: 'google',
            image: 'https://via.placeholder.com/400x400/4285F4/ffffff?text=Pixel+7+Pro'
        },
        {
            id: 17,
            title: 'Google Pixel 7',
            price: 599,
            color: 'black',
            os: 'android',
            inStock: true,
            category: 'google',
            image: 'https://via.placeholder.com/400x400/4285F4/ffffff?text=Pixel+7'
        },
        // Huawei Products
        {
            id: 18,
            title: 'Huawei P60 Pro',
            price: 999,
            color: 'green',
            os: 'harmony',
            inStock: false,
            category: 'huawei',
            image: 'https://via.placeholder.com/400x400/FF0000/ffffff?text=P60+Pro'
        },
        {
            id: 19,
            title: 'Huawei Mate 50 Pro',
            price: 899,
            color: 'black',
            os: 'harmony',
            inStock: true,
            category: 'huawei',
            image: 'https://via.placeholder.com/400x400/FF0000/ffffff?text=Mate+50'
        },
    ];

    // تابع سورت کردن محصولات
    const getSortedProducts = (productsToSort) => {
        if (sortBy === 'price-asc') {
            return [...productsToSort].sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            return [...productsToSort].sort((a, b) => b.price - a.price);
        }
        return productsToSort;
    };

    // فیلتر محصولات
    const filteredProducts = products.filter(product => {
        // فیلتر دسته‌بندی
        if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;

        // فیلتر قیمت
        if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;

        // فیلتر رنگ
        if (filters.colors.length > 0 && !filters.colors.includes(product.color)) return false;

        // فیلتر سیستم عامل
        if (filters.os.length > 0 && !filters.os.includes(product.os)) return false;

        // فیلتر موجودی
        if (filters.inStock && !product.inStock) return false;

        // فیلتر جستجو
        if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;

        return true;
    });

    // اعمال سورت روی محصولات فیلتر شده
    const sortedProducts = getSortedProducts(filteredProducts);

    // محاسبات pagination
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handler functions
    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePriceChange = (range) => {
        setFilters(prev => ({ ...prev, priceRange: range }));
        setCurrentPage(1);
    };

    const handleColorChange = (colors) => {
        setFilters(prev => ({ ...prev, colors }));
        setCurrentPage(1);
    };

    const handleOsChange = (os) => {
        setFilters(prev => ({ ...prev, os }));
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

    return (
        <div className="min-h-screen bg-gray-100">
            <Header
                onSearch={handleSearch}
                onCategorySelect={handleCategorySelect}
                selectedCategory={selectedCategory}
                cartCount={cartCount}
            />

            <main className="container mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="lg:w-1/4">
                        <div className="sticky top-4">
                            <PriceFilter
                                onPriceChange={handlePriceChange}
                                onColorChange={handleColorChange}
                                onOsChange={handleOsChange}
                                onAvailabilityChange={handleAvailabilityChange}
                                onSortChange={handleSortChange}
                                minPrice={0}
                                maxPrice={2000}
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
                            sortBy={sortBy}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;