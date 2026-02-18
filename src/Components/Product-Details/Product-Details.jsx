import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import SimilarProducts from '../Similar-Products/Similar-Products';
import { getProductById, getProducts } from '../../Services/api';
import './Product-Details.scss';

const ProductDetails = ({ cartCount, onSearch, onAddToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const productData = await getProductById(id);
                setProduct({
                    ...productData,
                    inStock: Math.random() > 0.3
                });

                const productsData = await getProducts();
                setAllProducts(productsData);

                setError(null);
            } catch (err) {
                setError('Error fetching product details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            onAddToCart({ ...product, quantity });
            alert(`${quantity} product(s) added to cart!`);
        }
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Header onSearch={onSearch} cartCount={cartCount} showCategories={false} />
                </div>
                <div className="product-details__loading">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Header onSearch={onSearch} cartCount={cartCount} showCategories={false} />
                </div>
                <div className="product-details__error">
                    <p>{error || 'Product not found'}</p>
                    <button onClick={() => navigate('/')}>Back to Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Header onSearch={onSearch} cartCount={cartCount} showCategories={false} />
            </div>


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8"> {/* باکس سفید دور محتوا */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* سمت چپ - عکس و ویژگی‌ها */}
                        <div className="lg:w-2/3">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* عکس */}
                                <div className="md:w-1/2">
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center h-64">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                </div>

                                {/* ویژگی‌ها */}
                                <div className="md:w-1/2">
                                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h1>
                                    <p className="text-gray-600 mb-4">{product.description}</p>

                                    <div className="space-y-2">
                                        <p><span className="font-semibold">Category:</span> {product.category}</p>
                                        {product.rating && (
                                            <p>
                                                <span className="font-semibold">Rating:</span>
                                                {product.rating.rate} ⭐ ({product.rating.count} reviews)
                                            </p>
                                        )}
                                        <p className="text-2xl font-bold text-blue-600">${product.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* سمت راست - قیمت و دکمه‌ها */}
                        <div className="lg:w-1/3">
                            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                                <div className="mb-4">
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                                        product.inStock
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <p className="text-3xl font-bold text-blue-600">${product.price}</p>
                                </div>

                                {/* انتخاب تعداد */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity:</label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={decreaseQuantity}
                                            disabled={quantity <= 1}
                                            className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-medium">{quantity}</span>
                                        <button
                                            onClick={increaseQuantity}
                                            className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* دکمه‌ها */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed mb-3"
                                >
                                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>

                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
                                >
                                    Back to Store
                                </button>

                                {/* اطلاعات اضافی */}
                                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Free shipping on orders over $50</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>30-day money-back guarantee</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>2-year warranty</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* محصولات مشابه */}
                <SimilarProducts
                    products={allProducts}
                    currentProductId={product.id}
                />
            </div>
        </div>
    );
};

export default ProductDetails;