import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Header = ({ onSearch, onCategorySelect, cartCount = 0, selectedCategory = 'all' }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleCategoryClick = (category) => {
        if (onCategorySelect) {
            onCategorySelect(category);
        }
    };

    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
            <div className="container mx-auto max-w-7xl px-4 py-4">
                {/* ردیف بالا: لوگو و سبد خرید */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold hover:text-yellow-300 transition-colors cursor-pointer">
                        Mobile Store
                    </h1>

                    <button className="relative p-2 hover:bg-blue-700 rounded-full transition-colors">
                        <FaShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* سرچ باکس */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-full md:w-2/3 lg:w-1/2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search for mobiles, accessories..."
                            className="w-full px-4 py-3 pl-12 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
                        />
                        <svg
                            className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* دسته‌بندی‌های سریع - با قابلیت انتخاب */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base">
                    <button
                        onClick={() => handleCategoryClick('all')}
                        className={`cursor-pointer transition-all px-4 py-2 rounded-full ${
                            selectedCategory === 'all'
                                ? 'bg-yellow-500 text-blue-900 font-bold shadow-lg scale-110'
                                : 'hover:bg-blue-700 hover:text-yellow-300'
                        }`}
                    >
                        All Products
                    </button>
                    <button
                        onClick={() => handleCategoryClick('iphone')}
                        className={`cursor-pointer transition-all px-4 py-2 rounded-full ${
                            selectedCategory === 'iphone'
                                ? 'bg-yellow-500 text-blue-900 font-bold shadow-lg scale-110'
                                : 'hover:bg-blue-700 hover:text-yellow-300'
                        }`}
                    >
                        iPhone
                    </button>
                    <button
                        onClick={() => handleCategoryClick('samsung')}
                        className={`cursor-pointer transition-all px-4 py-2 rounded-full ${
                            selectedCategory === 'samsung'
                                ? 'bg-yellow-500 text-blue-900 font-bold shadow-lg scale-110'
                                : 'hover:bg-blue-700 hover:text-yellow-300'
                        }`}
                    >
                        Samsung
                    </button>
                    <button
                        onClick={() => handleCategoryClick('xiaomi')}
                        className={`cursor-pointer transition-all px-4 py-2 rounded-full ${
                            selectedCategory === 'xiaomi'
                                ? 'bg-yellow-500 text-blue-900 font-bold shadow-lg scale-110'
                                : 'hover:bg-blue-700 hover:text-yellow-300'
                        }`}
                    >
                        Xiaomi
                    </button>
                    <button
                        onClick={() => handleCategoryClick('google')}
                        className={`cursor-pointer transition-all px-4 py-2 rounded-full ${
                            selectedCategory === 'google'
                                ? 'bg-yellow-500 text-blue-900 font-bold shadow-lg scale-110'
                                : 'hover:bg-blue-700 hover:text-yellow-300'
                        }`}
                    >
                        Google
                    </button>
                    <button
                        onClick={() => handleCategoryClick('huawei')}
                        className={`cursor-pointer transition-all px-4 py-2 rounded-full ${
                            selectedCategory === 'huawei'
                                ? 'bg-yellow-500 text-blue-900 font-bold shadow-lg scale-110'
                                : 'hover:bg-blue-700 hover:text-yellow-300'
                        }`}
                    >
                        Huawei
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;