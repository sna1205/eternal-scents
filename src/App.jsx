import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailCard from './components/ProductDetailCard';
import perfumesData from './data/perfumes.json';

function Catalog() {
  const navigate = useNavigate();

  const handleViewDetails = (perfume) => {
    navigate(`/product/${perfume.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {perfumesData.map((perfume) => (
          <ProductCard
            key={perfume.id}
            perfume={perfume}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
}

function ProductDetail() {
  const navigate = useNavigate();

  // Get perfume ID from URL using useParams
  const { id } = useParams();
  const perfume = perfumesData.find(p => p.id.toString() === id);

  if (!perfume) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors font-semibold"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <button
        onClick={() => navigate('/')}
        className="mb-6 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors font-semibold"
      >
        ← Back to Catalog
      </button>
      <ProductDetailCard perfume={perfume} />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Hero Section */}
      <Hero />

      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg mb-2">Premium Perfume Catalog</p>
          <p className="text-sm text-gray-500">Contact us to place your order</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
