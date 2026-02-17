import React, { useState } from 'react';
import './Price-Filter.scss';

const PriceFilter = ({
                         onPriceChange,
                         onColorChange,
                         onOsChange,
                         onAvailabilityChange,
                         onSortChange,
                         minPrice = 0,
                         maxPrice = 2000
                     }) => {
    const [tempRange, setTempRange] = useState({ min: minPrice, max: maxPrice });
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedOs, setSelectedOs] = useState([]);
    const [showInStock, setShowInStock] = useState(false);
    const [sortBy, setSortBy] = useState('default'); // 'default', 'price-asc', 'price-desc'

    const colors = [
        { id: 'black', name: 'Black', class: 'bg-gray-900' },
        { id: 'white', name: 'White', class: 'bg-gray-100 border border-gray-300' },
        { id: 'silver', name: 'Silver', class: 'bg-gray-400' },
        { id: 'gold', name: 'Gold', class: 'bg-yellow-600' },
        { id: 'blue', name: 'Blue', class: 'bg-blue-600' },
        { id: 'red', name: 'Red', class: 'bg-red-600' },
        { id: 'green', name: 'Green', class: 'bg-green-600' },
        { id: 'purple', name: 'Purple', class: 'bg-purple-600' },
    ];

    const operatingSystems = [
        { id: 'ios', name: 'iOS' },
        { id: 'android', name: 'Android' },
        { id: 'harmony', name: 'HarmonyOS' },
    ];

    const handleMinChange = (e) => {
        const value = parseInt(e.target.value);
        setTempRange(prev => ({ ...prev, min: Math.min(value, prev.max - 10) }));
    };

    const handleMaxChange = (e) => {
        const value = parseInt(e.target.value);
        setTempRange(prev => ({ ...prev, max: Math.max(value, prev.min + 10) }));
    };

    const handleColorToggle = (colorId) => {
        setSelectedColors(prev => {
            if (prev.includes(colorId)) {
                return prev.filter(c => c !== colorId);
            } else {
                return [...prev, colorId];
            }
        });
    };

    const handleOsToggle = (osId) => {
        setSelectedOs(prev => {
            if (prev.includes(osId)) {
                return prev.filter(os => os !== osId);
            } else {
                return [...prev, osId];
            }
        });
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        onSortChange(value);
    };

    const applyFilters = () => {
        onPriceChange(tempRange);
        onColorChange(selectedColors);
        onOsChange(selectedOs);
        onAvailabilityChange(showInStock);

    };

    const clearFilters = () => {
        setTempRange({ min: minPrice, max: maxPrice });
        setSelectedColors([]);
        setSelectedOs([]);
        setShowInStock(false);
        setSortBy('default');

        onPriceChange({ min: minPrice, max: maxPrice });
        onColorChange([]);
        onOsChange([]);
        onAvailabilityChange(false);
        onSortChange('default');
    };

    return (
        <div className="price-filter">
            <h3 className="price-filter__title">Filters</h3>

            {/* بخش مرتب‌سازی جدید */}
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
                        <span>💎</span> Most Expensive First
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

            <div className="price-filter__section">
                <h4 className="price-filter__subtitle">Color</h4>
                <div className="price-filter__colors">
                    {colors.map(color => (
                        <button
                            key={color.id}
                            onClick={() => handleColorToggle(color.id)}
                            className={`price-filter__color-btn ${selectedColors.includes(color.id) ? 'price-filter__color-btn--selected' : ''}`}
                            title={color.name}
                        >
                            <span className={`price-filter__color-dot ${color.class}`} />
                            <span className="price-filter__color-name">{color.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* فیلتر سیستم‌عامل */}
            <div className="price-filter__section">
                <h4 className="price-filter__subtitle">Operating System</h4>
                <div className="price-filter__os">
                    {operatingSystems.map(os => (
                        <label key={os.id} className="price-filter__checkbox">
                            <input
                                type="checkbox"
                                checked={selectedOs.includes(os.id)}
                                onChange={() => handleOsToggle(os.id)}
                            />
                            <span>{os.name}</span>
                        </label>
                    ))}
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

export default PriceFilter;