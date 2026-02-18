import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ onSearch, onCategorySelect, cartCount = 0, selectedCategory = 'all', showCategories = true }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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

    const handleHomeClick = () => {
        navigate('/');
        if (onCategorySelect) {
            onCategorySelect('all');
        }
    };

    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg rounded-lg mx-4 sm:mx-6 lg:mx-auto mt-4">
            <div className="container mx-auto max-w-7xl px-4 py-4">
                {/* ردیف بالا: لوگو و سبد خرید */}
                <div className="flex justify-between items-center mb-6">
                    <h1
                        onClick={handleHomeClick}
                        className="text-2xl md:text-3xl font-bold hover:text-yellow-300 transition-colors cursor-pointer"
                    >
                        MARKET
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

                {/* سرچ باکس - با رنگ جدید و برجسته */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-full md:w-2/3 lg:w-1/2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search for products..."
                            className="w-full px-4 py-3 pl-12 rounded-lg bg-white text-gray-900 placeholder-gray-500 border-2 border-yellow-400 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-300 focus:outline-none shadow-lg transition-all"
                        />
                        <svg
                            className="absolute left-4 top-3.5 h-5 w-5 text-gray-500"
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

                {/* دسته‌بندی‌ها */}
                {showCategories && (
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm md:text-base">
                        <button
                            onClick={() => handleCategoryClick('all')}
                            className={`cursor-pointer transition-all px-3 md:px-4 py-2 rounded-lg ${
                                selectedCategory === 'all'
                                    ? 'bg-yellow-500 text-blue-900 font-bold shadow-lg scale-105'
                                    : 'hover:bg-blue-700 hover:text-yellow-300'
                            }`}
                        >
                            All Products
                        </button>
                        <button
                            onClick={() => handleCategoryClick("men's clothing")}
                            className={`cursor-pointer transition-all px-3 md:px-4 py-2 rounded-lg ${
                                selectedCategory === "men's clothing"
                                    ? 'bg-yellow-500 text-blue-900 font-bold shadow-lg scale-105'
                                    : 'hover:bg-blue-700 hover:text-yellow-300'
                            }`}
                        >
                            👔 Men's Clothing
                        </button>
                        <button
                            onClick={() => handleCategoryClick("women's clothing")}
                            className={`cursor-pointer transition-all px-3 md:px-4 py-2 rounded-lg ${
                                selectedCategory === "women's clothing"
                                    ? 'bg-yellow-500 text-blue-900 font-bold shadow-lg scale-105'
                                    : 'hover:bg-blue-700 hover:text-yellow-300'
                            }`}
                        >
                            👗 Women's Clothing
                        </button>
                        <button
                            onClick={() => handleCategoryClick('electronics')}
                            className={`cursor-pointer transition-all px-3 md:px-4 py-2 rounded-lg ${
                                selectedCategory === 'electronics'
                                    ? 'bg-yellow-500 text-blue-900 font-bold shadow-lg scale-105'
                                    : 'hover:bg-blue-700 hover:text-yellow-300'
                            }`}
                        >
                            💻 Electronics
                        </button>
                        <button
                            onClick={() => handleCategoryClick('jewelery')}
                            className={`cursor-pointer transition-all px-3 md:px-4 py-2 rounded-lg ${
                                selectedCategory === 'jewelery'
                                    ? 'bg-yellow-500 text-blue-900 font-bold shadow-lg scale-105'
                                    : 'hover:bg-blue-700 hover:text-yellow-300'
                            }`}
                        >
                            💍 Jewelery
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;