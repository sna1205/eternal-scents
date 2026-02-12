import React, { useState, useEffect } from 'react';
import { Truck, Ban, Star, Heart, ShoppingCart } from 'lucide-react';

const ProductDetailCard = ({ perfume }) => {
  const [selectedSize, setSelectedSize] = useState(() => perfume?.sizes?.[0] || null);

  useEffect(() => {
    if (perfume && !selectedSize) {
      setSelectedSize(perfume.sizes[0]);
    }
  }, [perfume, selectedSize]);

  if (!perfume || !selectedSize) return null;

  return (
    <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl animate-fadeIn">
      {/* Mobile: Single Column Layout */}
      <div className="block md:hidden">
        {/* Full-width Image */}
        <div className="relative px-4 pt-4">
          <img
            src={perfume.image}
            alt={perfume.name}
            className="w-full h-80 object-contain rounded-2xl shadow-xl"
          />
          <button className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <Heart size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Details Section */}
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs uppercase tracking-widest text-amber-600 font-bold">
              {perfume.brand}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-amber-400 fill-current" />
              ))}
              <span className="text-xs text-gray-500 ml-1">(4.8)</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
            {perfume.name}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6 text-sm">
            {perfume.description}
          </p>

          {/* Size Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
              Select Size
            </label>
            <div className="grid grid-cols-3 gap-3">
              {perfume.sizes.map((size) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(size)}
                  className={`py-4 px-4 rounded-xl font-semibold transition-all duration-200 text-sm ${
                    selectedSize.label === size.label
                      ? 'bg-amber-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={selectedSize.label === size.label}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Display with CTA */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-6 border border-amber-200">
            <div className="text-sm text-gray-600 mb-2">Selected Price</div>
            <div className="text-4xl font-bold text-gray-900 mb-4">
              ${selectedSize.price}
            </div>
            <div className="text-sm text-gray-500 mb-4">
              {selectedSize.label} bottle
            </div>
            <button className="w-full bg-amber-600 text-white py-4 rounded-xl font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>

          {/* Delivery Info */}
          {perfume.hasFreeDelivery ? (
            <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3 mb-4">
              <Truck size={20} className="flex-shrink-0" />
              <span className="font-semibold text-sm">Free Delivery Included</span>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-gray-300 text-gray-600 px-4 py-3 rounded-xl flex items-center gap-3 mb-4">
              <Ban size={20} className="flex-shrink-0" />
              <span className="font-semibold text-sm">Delivery Fee Applies</span>
            </div>
          )}

          {/* Action Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <strong>Note:</strong> This is a catalog display only. Contact us to place your order.
          </div>
        </div>
      </div>

      {/* Desktop: Two Column Layout */}
      <div className="hidden md:grid md:grid-cols-2 gap-12 pt-12 pb-12 px-12">
        {/* Image Section */}
        <div className="relative">
          <img
            src={perfume.image}
            alt={perfume.name}
            className="w-full h-96 object-cover object-top rounded-2xl shadow-xl"
          />
          <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <Heart size={24} className="text-gray-600" />
          </button>
          {perfume.hasFreeDelivery ? (
            <div className="mt-6 bg-emerald-50 border-2 border-emerald-500 text-emerald-700 px-6 py-4 rounded-xl flex items-center gap-3">
              <Truck size={20} className="flex-shrink-0" />
              <span className="font-semibold">Free Delivery Included</span>
            </div>
          ) : (
            <div className="mt-6 bg-gray-50 border-2 border-gray-300 text-gray-600 px-6 py-4 rounded-xl flex items-center gap-3">
              <Ban size={20} className="flex-shrink-0" />
              <span className="font-semibold">Delivery Fee Applies</span>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs uppercase tracking-widest text-amber-600 font-bold">
              {perfume.brand}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-amber-400 fill-current" />
              ))}
              <span className="text-sm text-gray-500 ml-1">(4.8)</span>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {perfume.name}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8 text-base">
            {perfume.description}
          </p>

          {/* Size Selector */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">
              Select Size
            </label>
            <div className="grid grid-cols-3 gap-4">
              {perfume.sizes.map((size) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(size)}
                  className={`py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    selectedSize.label === size.label
                      ? 'bg-amber-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-pressed={selectedSize.label === size.label}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Display with CTA */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 mb-8 border border-amber-200">
            <div className="text-sm text-gray-600 mb-2">Selected Price</div>
            <div className="text-5xl font-bold text-gray-900 mb-4">
              ${selectedSize.price}
            </div>
            <div className="text-sm text-gray-500 mb-6">
              {selectedSize.label} bottle
            </div>
            <button className="w-full bg-amber-600 text-white py-4 rounded-xl font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>

          {/* Action Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-sm text-blue-800">
            <strong>Note:</strong> This is a catalog display only. Contact us to place your order.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
