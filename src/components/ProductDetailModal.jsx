import React, { useState, useEffect } from 'react';
import { X, Truck, Ban } from 'lucide-react';

const ProductDetailModal = ({ perfume, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(() => perfume?.sizes?.[0] || null);

  useEffect(() => {
    if (perfume && !selectedSize) {
      setSelectedSize(perfume.sizes[0]);
    }
  }, [perfume, selectedSize]);
  
  useEffect(() => {
    // Prevent body scroll when modal is open
    if (perfume) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [perfume]);
  
  if (!perfume || !selectedSize) return null;
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl my-8 animate-fadeIn">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="relative">
              <img 
                src={perfume.image} 
                alt={perfume.name}
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              {perfume.hasFreeDelivery ? (
                <div className="mt-4 bg-emerald-50 border-2 border-emerald-500 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3">
                  <Truck size={20} className="flex-shrink-0" />
                  <span className="font-semibold">Free Delivery Included</span>
                </div>
              ) : (
                <div className="mt-4 bg-gray-50 border-2 border-gray-300 text-gray-600 px-4 py-3 rounded-xl flex items-center gap-3">
                  <Ban size={20} className="flex-shrink-0" />
                  <span className="font-semibold">Delivery Fee Applies</span>
                </div>
              )}
            </div>
            
            {/* Details Section */}
            <div className="flex flex-col">
              <div className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">
                {perfume.brand}
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {perfume.name}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
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
                      className={`py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
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
              
              {/* Price Display */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-6 border border-amber-200">
                <div className="text-sm text-gray-600 mb-1">Selected Price</div>
                <div className="text-5xl font-bold text-gray-900">
                  ${selectedSize.price}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {selectedSize.label} bottle
                </div>
              </div>
              
              {/* Action Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                <strong>Note:</strong> This is a catalog display only. Contact us to place your order.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;