import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailCard from './components/ProductDetailCard';
import perfumesData from './data/perfumes.json';

const PRODUCTS_PER_PAGE = 12;

const allBrands = [...new Set(perfumesData.map((perfume) => perfume.brand))].sort();
const allSizes = [...new Set(perfumesData.flatMap((perfume) => perfume.sizes.map((size) => size.label)))].sort(
  (a, b) => parseInt(a, 10) - parseInt(b, 10)
);

const minPrice = Math.floor(Math.min(...perfumesData.map((perfume) => Math.min(...perfume.sizes.map((size) => size.price)))));
const maxPrice = Math.ceil(Math.max(...perfumesData.map((perfume) => Math.max(...perfume.sizes.map((size) => size.price)))));
const pricePresets = [
  { label: `Under $10`, range: [minPrice, 10] },
  { label: `$10 to $20`, range: [10, 20] },
  { label: `$20 to $30`, range: [20, 30] },
  { label: `Premium`, range: [30, maxPrice] },
];

const isFreeDeliverySize = (sizeLabel) => parseInt(sizeLabel, 10) >= 20;

function Catalog() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = perfumesData.filter((perfume) => {
      const lowerQuery = searchQuery.trim().toLowerCase();
      if (lowerQuery) {
        const matchesName = perfume.name.toLowerCase().includes(lowerQuery);
        const matchesBrand = perfume.brand.toLowerCase().includes(lowerQuery);
        if (!matchesName && !matchesBrand) {
          return false;
        }
      }

      if (selectedBrands.length > 0 && !selectedBrands.includes(perfume.brand)) {
        return false;
      }

      if (selectedSizes.length > 0) {
        const perfumeSizes = perfume.sizes.map((size) => size.label);
        const hasSelectedSize = selectedSizes.some((size) => perfumeSizes.includes(size));
        if (!hasSelectedSize) {
          return false;
        }
      }

      const basePrice = Math.min(...perfume.sizes.map((size) => size.price));
      if (basePrice < priceRange[0] || basePrice > priceRange[1]) {
        return false;
      }

      if (freeDeliveryOnly) {
        const hasFreeDeliverySize = perfume.sizes.some((size) => isFreeDeliverySize(size.label));
        if (!hasFreeDeliverySize) {
          return false;
        }
      }

      return true;
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      const priceA = Math.min(...a.sizes.map((size) => size.price));
      const priceB = Math.min(...b.sizes.map((size) => size.price));

      switch (sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return a.id - b.id;
      }
    });

    return sorted;
  }, [searchQuery, selectedBrands, selectedSizes, priceRange, freeDeliveryOnly, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedBrands, selectedSizes, priceRange, freeDeliveryOnly, sortBy]);

  const totalProducts = filteredAndSortedProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((value) => value !== brand) : [...prev, brand]));
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((value) => value !== size) : [...prev, size]));
  };

  const updateMinPrice = (nextMin) => {
    setPriceRange((prev) => [Math.min(Math.max(nextMin, minPrice), prev[1]), prev[1]]);
  };

  const updateMaxPrice = (nextMax) => {
    setPriceRange((prev) => [prev[0], Math.max(Math.min(nextMax, maxPrice), prev[0])]);
  };

  const applyPricePreset = (range) => {
    setPriceRange([Math.max(minPrice, range[0]), Math.min(maxPrice, range[1])]);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedBrands([]);
    setSelectedSizes([]);
    setPriceRange([minPrice, maxPrice]);
    setFreeDeliveryOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery.trim() ||
    selectedBrands.length > 0 ||
    selectedSizes.length > 0 ||
    freeDeliveryOnly ||
    priceRange[0] > minPrice ||
    priceRange[1] < maxPrice ||
    sortBy !== 'featured';

  const activeFilterCount =
    (searchQuery.trim() ? 1 : 0) +
    (selectedBrands.length > 0 ? 1 : 0) +
    (selectedSizes.length > 0 ? 1 : 0) +
    (freeDeliveryOnly ? 1 : 0) +
    (priceRange[0] > minPrice || priceRange[1] < maxPrice ? 1 : 0) +
    (sortBy !== 'featured' ? 1 : 0);

  const activeFilterChips = [
    ...selectedBrands.map((brand) => ({
      id: `brand-${brand}`,
      label: brand,
      onRemove: () => toggleBrand(brand),
    })),
    ...selectedSizes.map((size) => ({
      id: `size-${size}`,
      label: size,
      onRemove: () => toggleSize(size),
    })),
    ...(freeDeliveryOnly
      ? [
          {
            id: 'free-delivery',
            label: 'Free delivery only',
            onRemove: () => setFreeDeliveryOnly(false),
          },
        ]
      : []),
    ...(priceRange[0] > minPrice || priceRange[1] < maxPrice
      ? [
          {
            id: 'price-range',
            label: `$${priceRange[0]} - $${priceRange[1]}`,
            onRemove: () => setPriceRange([minPrice, maxPrice]),
          },
        ]
      : []),
  ];

  const FilterPanel = (
    <div className="rounded-3xl border border-rose-100 bg-white/95 p-5 shadow-xl shadow-rose-100/40 backdrop-blur">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-rose-400">Filters</p>
          <h2 className="font-serif text-xl text-slate-900">Refine your picks</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50"
          >
            Reset all
          </button>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Sort by</label>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-rose-400 focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Price range</label>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-3 grid grid-cols-2 gap-2">
              <label className="text-xs font-semibold text-slate-500">
                Min
                <input
                  type="number"
                  min={minPrice}
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(event) => updateMinPrice(Number(event.target.value) || minPrice)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-700 focus:border-rose-400 focus:outline-none"
                />
              </label>
              <label className="text-xs font-semibold text-slate-500">
                Max
                <input
                  type="number"
                  min={priceRange[0]}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(event) => updateMaxPrice(Number(event.target.value) || maxPrice)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-700 focus:border-rose-400 focus:outline-none"
                />
              </label>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {pricePresets.map((preset) => {
                const isActive = priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1];
                return (
                  <button
                    key={preset.label}
                    onClick={() => applyPricePreset(preset.range)}
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
                      isActive
                        ? 'border-rose-500 bg-rose-500 text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-rose-200 hover:bg-rose-50'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Brand</label>
          <div className="flex flex-wrap gap-2">
            {allBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  selectedBrands.includes(brand)
                    ? 'border-rose-500 bg-rose-500 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-rose-200 hover:bg-rose-50'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Sizes</label>
          <div className="flex flex-wrap gap-2">
            {allSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  selectedSizes.includes(size)
                    ? 'border-teal-500 bg-teal-500 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:bg-teal-50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <input
            type="checkbox"
            checked={freeDeliveryOnly}
            onChange={(event) => setFreeDeliveryOnly(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-rose-500 focus:ring-rose-400"
          />
          <div>
            <p className="text-sm font-semibold text-slate-700">Free delivery only</p>
            <p className="text-xs text-slate-500">Show products that include 20ml+ sizes</p>
          </div>
        </label>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-3xl border border-rose-100 bg-white/80 p-4 shadow-lg shadow-rose-100/30 backdrop-blur sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search perfume name or brand"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-rose-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMobileFilters((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 lg:hidden"
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="rounded-full bg-rose-500 px-2 py-0.5 text-xs text-white">{activeFilterCount}</span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
              >
                <X size={16} />
                Clear
              </button>
            )}
          </div>
        </div>

        {activeFilterChips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeFilterChips.map((chip) => (
              <button
                key={chip.id}
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                {chip.label}
                <X size={12} />
              </button>
            ))}
          </div>
        )}
      </div>

      {showMobileFilters && <div className="mb-6 lg:hidden">{FilterPanel}</div>}

      <div className="grid gap-6 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr]">
        <aside className="hidden lg:block lg:sticky lg:top-6 lg:self-start">{FilterPanel}</aside>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-rose-500">Catalog</p>
              <h2 className="font-serif text-2xl text-slate-900">{totalProducts} fragrances found</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <Sparkles size={14} />
              Free delivery on 20ml+
            </div>
          </div>

          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {currentProducts.map((perfume) => (
                <ProductCard
                  key={perfume.id}
                  perfume={perfume}
                  onViewDetails={() => navigate(`/product/${perfume.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <h3 className="font-serif text-2xl text-slate-900">No matches right now</h3>
              <p className="mt-2 text-sm text-slate-500">Try removing a few filters to see more perfumes.</p>
              <button
                onClick={clearFilters}
                className="mt-5 rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Reset filters
              </button>
            </div>
          )}

          {totalProducts > PRODUCTS_PER_PAGE && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white p-1 shadow-lg shadow-slate-200/40">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="px-3 text-sm font-semibold text-slate-700">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <p className="text-xs text-slate-500">
                Showing {startIndex + 1} to {Math.min(startIndex + PRODUCTS_PER_PAGE, totalProducts)} of {totalProducts}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const perfume = perfumesData.find((product) => product.id.toString() === id);

  if (!perfume) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="font-serif text-3xl text-slate-900">Product not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-5 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Back to catalog
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50"
      >
        <ArrowLeft size={16} />
        Back to catalog
      </button>
      <ProductDetailCard perfume={perfume} />
    </div>
  );
}

function App() {
  const location = useLocation();
  const isProductDetailPage = location.pathname.startsWith('/product/');

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe4e6_0%,#fffaf4_36%,#f8fafc_100%)] text-slate-900">
      {!isProductDetailPage && <Hero />}

      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      <footer className="border-t border-rose-100 bg-white/80 px-6 py-10 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <img src="/images/logo.jpg" alt="Eternal Scents logo" className="h-10 w-10 rounded-lg object-cover" />
            <p className="font-serif text-lg text-slate-800">Eternal Scents</p>
          </div>
          <p>Catalog display only. Contact us for orders.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
