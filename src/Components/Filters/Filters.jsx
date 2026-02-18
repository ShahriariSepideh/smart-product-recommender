import React, { useState } from 'react';
import './Filters.scss';

const Filters = ({
                     onPriceChange,
                     onAvailabilityChange,
                     onSortChange,
                     minPrice = 0,
                     maxPrice = 2000
                 }) => {
    const [tempRange, setTempRange] = useState({ min: minPrice, max: maxPrice });
    const [showInStock, setShowInStock] = useState(false);
    const [sortBy, setSortBy] = useState('default');

    // تغییر حداقل قیمت
    const handleMinChange = (e) => {
        const value = parseInt(e.target.value);
        setTempRange(prev => ({ ...prev, min: Math.min(value, prev.max - 10) }));
    };

    // تغییر حداکثر قیمت
    const handleMaxChange = (e) => {
        const value = parseInt(e.target.value);
        setTempRange(prev => ({ ...prev, max: Math.max(value, prev.min + 10) }));
    };

    // تغییر نوع مرتب‌سازی
    const handleSortChange = (value) => {
        setSortBy(value);
        onSortChange(value);
    };

    // اعمال همه فیلترها
    const applyFilters = () => {
        onPriceChange(tempRange);
        onAvailabilityChange(showInStock);
    };

    // پاک کردن همه فیلترها
    const clearFilters = () => {
        setTempRange({ min: minPrice, max: maxPrice });
        setShowInStock(false);
        setSortBy('default');

        onPriceChange({ min: minPrice, max: maxPrice });
        onAvailabilityChange(false);
        onSortChange('default');
    };

    return (
        <div className="price-filter">
            <h3 className="price-filter__title">Filters</h3>

            {/* بخش مرتب‌سازی */}
            <div className="price-filter__section">
                <h4 className="price-filter__subtitle">Sort By</h4>
                <div className="price-filter__sort">
                    <button
                        className={`price-filter__sort-btn ${sortBy === 'default' ? 'price-filter__sort-btn--active' : ''}`}
                        onClick={() => handleSortChange('default')}
                    >
                        Default
                    </button>
                    <button
                        className={`price-filter__sort-btn ${sortBy === 'price-asc' ? 'price-filter__sort-btn--active' : ''}`}
                        onClick={() => handleSortChange('price-asc')}
                    >
                        <span>💰</span> Cheapest First
                    </button>
                    <button
                        className={`price-filter__sort-btn ${sortBy === 'price-desc' ? 'price-filter__sort-btn--active' : ''}`}
                        onClick={() => handleSortChange('price-desc')}
                    >
                        <span></span> Most Expensive First
                    </button>
                </div>
            </div>

            {/* محدوده قیمت */}
            <div className="price-filter__section">
                <h4 className="price-filter__subtitle">Price Range</h4>
                <div className="price-filter__inputs">
                    <div className="price-filter__input-group">
                        <label>Min: ${tempRange.min}</label>
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={tempRange.min}
                            onChange={handleMinChange}
                            className="price-filter__slider"
                        />
                    </div>

                    <div className="price-filter__input-group">
                        <label>Max: ${tempRange.max}</label>
                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={tempRange.max}
                            onChange={handleMaxChange}
                            className="price-filter__slider"
                        />
                    </div>
                </div>
                <div className="price-filter__display">
                    ${tempRange.min} - ${tempRange.max}
                </div>
            </div>

            {/* فیلتر موجودی */}
            <div className="price-filter__section">
                <h4 className="price-filter__subtitle">Availability</h4>
                <label className="price-filter__checkbox">
                    <input
                        type="checkbox"
                        checked={showInStock}
                        onChange={(e) => setShowInStock(e.target.checked)}
                    />
                    <span>Show only in-stock items</span>
                </label>
            </div>

            {/* دکمه‌ها */}
            <div className="price-filter__actions">
                <button
                    onClick={applyFilters}
                    className="price-filter__button price-filter__button--apply"
                >
                    Apply Filters
                </button>

                <button
                    onClick={clearFilters}
                    className="price-filter__button price-filter__button--clear"
                >
                    Clear All
                </button>
            </div>
        </div>
    );
};

export default Filters;