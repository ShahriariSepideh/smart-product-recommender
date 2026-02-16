import React from 'react';
import Header from './components/header/Header';

function App() {
    const handleSearch = (term) => {
        console.log('Searching for:', term);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header
                onSearch={handleSearch}
                cartCount={3}
            />
            <main className="container mx-auto max-w-7xl px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* اینجا کارت‌های محصولات نمایش داده میشن */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold">Product 1</h2>
                        <p className="text-gray-600">$99.99</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold">Product 2</h2>
                        <p className="text-gray-600">$149.99</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold">Product 3</h2>
                        <p className="text-gray-600">$199.99</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;