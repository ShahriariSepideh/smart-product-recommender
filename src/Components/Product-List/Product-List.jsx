import React, { useState } from 'react';
import './Product-List.scss';

const ProductList = ({ products, currentPage, totalPages, totalProducts, onPageChange }) => {
    const [imageErrors, setImageErrors] = useState({});

    if (!products || products.length === 0) {
        return (
            <div className="product-list product-list--empty">
                <p>No products found.</p>
            </div>
        );
    }

    // نقشه رنگها
    const colorMap = {
        purple: '#9333ea',
        blue: '#2563eb',
        gold: '#ca8a04',
        red: '#dc2626',
        black: '#1f2937',
        white: '#f3f4f6',
        silver: '#9ca3af',
        green: '#16a34a',
    };

    // تصویر پیش‌فرض وقتی عکس لود نمیشه
    const handleImageError = (productId) => {
        setImageErrors(prev => ({ ...prev, [productId]: true }));
    };

    // تولید شماره صفحات
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pageNumbers.push(i);
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    return (
        <div className="product-list">
            <div className="product-list__header">
                <p className="product-list__count">
                    Showing {products.length} of {totalProducts} products (Page {currentPage} of {totalPages})
                </p>
            </div>

            <div className="product-list__grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        {/* بخش عکس محصول */}
                        <div className="product-card__image-container">
                            {!imageErrors[product.id] ? (
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="product-card__image"
                                    onError={() => handleImageError(product.id)}
                                    loading="lazy"
                                />
                            ) : (
                                <div className="product-card__image-placeholder">
                                    <span>📱</span>
                                </div>
                            )}
                        </div>

                        <h3 className="product-card__title">{product.title}</h3>
                        <p className="product-card__price">${product.price}</p>

                        <div className="product-card__color">
                            <span>Color: </span>
                            <span
                                className="product-card__color-dot"
                                style={{ backgroundColor: colorMap[product.color] || '#6b7280' }}
                            />
                            <span className="product-card__color-name">{product.color}</span>
                        </div>

                        <p className="product-card__os">OS: {product.os}</p>

                        <p className={`product-card__stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </p>

                        <button className="product-card__button">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination__button"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &laquo; Previous
                    </button>

                    <div className="pagination__numbers">
                        {getPageNumbers().map((page, index) => (
                            page === '...' ? (
                                <span key={`dots-${index}`} className="pagination__dots">...</span>
                            ) : (
                                <button
                                    key={page}
                                    className={`pagination__number ${currentPage === page ? 'pagination__number--active' : ''}`}
                                    onClick={() => onPageChange(page)}
                                >
                                    {page}
                                </button>
                            )
                        ))}
                    </div>

                    <button
                        className="pagination__button"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next &raquo;
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductList;