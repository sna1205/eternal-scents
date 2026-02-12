import React from 'react';
import { ShoppingBag, Truck } from 'lucide-react';

const ProductCard = ({ perfume, onViewDetails }) => {
  const startingPrice = Math.min(...perfume.sizes.map(s => s.price));
  
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden h-64">
        <img 
          src={perfume.image} 
          alt={perfume.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {perfume.hasFreeDelivery && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
            <Truck size={14} />
            Free Delivery
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="text-xs uppercase tracking-wider text-amber-600 font-semibold mb-2">
          {perfume.brand}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {perfume.name}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-gray-500">Starting from</span>
            <div className="text-2xl font-bold text-gray-900">
              ${startingPrice}
            </div>
          </div>
        </div>
        <button
          onClick={() => onViewDetails(perfume)}
          className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-amber-600 transition-colors duration-300 font-semibold flex items-center justify-center gap-2"
          aria-label={`View details for ${perfume.name}`}
        >
          <ShoppingBag size={18} />
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;