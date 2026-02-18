import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Similar-Products.scss';

const SimilarProducts = ({ products, currentProductId }) => {
    const navigate = useNavigate();

    // فیلتر کردن محصولات مشابه (حذف محصول فعلی)
    const similarProducts = products.filter(p => p.id !== currentProductId);

    if (!similarProducts || similarProducts.length === 0) {
        return null;
    }

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        window.scrollTo(0, 0); // رفتن به بالای صفحه
    };

    return (
        <div className="similar-products">
            <h2 className="similar-products__title">Similar Products</h2>

            <div className="similar-products__container">
                <div className="similar-products__wrapper">
                    {similarProducts.map(product => (
                        <div
                            key={product.id}
                            className="similar-products__card"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <div className="similar-products__image-wrapper">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="similar-products__image"
                                    loading="lazy"
                                />
                            </div>

                            <div className="similar-products__info">
                                <h3 className="similar-products__name">
                                    {product.title.length > 40
                                        ? `${product.title.substring(0, 40)}...`
                                        : product.title}
                                </h3>
                                <p className="similar-products__price">${product.price}</p>
                                <button className="similar-products__button">
                                    View Product
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SimilarProducts;