import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
    return (
        <header className=" bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Mobile store</h1>

                <button className="relative p-2">
                    <FaShoppingCart size={24} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        0
                    </span>
                </button>
            </div>

            {/* سرچ باکس */}
            <input
                type="text"
                placeholder="search..."
                className="w-full px-4 py-2 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
        </header>
    );
};

export default Header;