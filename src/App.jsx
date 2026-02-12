import React, { useState } from 'react';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import perfumesData from './data/perfumes.json';

function App() {
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Hero Section */}
      <Hero />
      
      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {perfumesData.map((perfume) => (
            <ProductCard 
              key={perfume.id} 
              perfume={perfume}
              onViewDetails={setSelectedPerfume}
            />
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg mb-2">Premium Perfume Catalog</p>
          <p className="text-sm text-gray-500">Contact us to place your order</p>
        </div>
      </footer>
      
      {/* Modal */}
      {selectedPerfume && (
        <ProductDetailModal 
          perfume={selectedPerfume}
          onClose={() => setSelectedPerfume(null)}
        />
      )}
    </div>
  );
}

export default App;