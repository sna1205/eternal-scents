import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import ProductDetailCard from './ProductDetailCard';

const ProductDetailModal = ({ perfume, onClose }) => {
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

  if (!perfume) return null;

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
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl mt-12 md:mt-16 mb-4 md:mb-8 animate-fadeIn">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <ProductDetailCard perfume={perfume} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
