import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

    const handleImageError = (productId) => {
        setImageErrors(prev => ({ ...prev, [productId]: true }));
    };

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
                    <Link
                        to={`/product/${product.id}`}
                        key={product.id}
                        className="product-card-link"
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="product-card">
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

                            <button
                                className="product-card__button"
                                onClick={(e) => {
                                    e.preventDefault(); // جلوگیری از رفتن به لینک
                                    // اینجا می‌تونی تابع اضافه به سبد خرید رو صدا بزنی
                                    console.log('Add to cart:', product.id);
                                }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </Link>
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