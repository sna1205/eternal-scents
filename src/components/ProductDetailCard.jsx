import React, { useEffect, useState } from 'react';
import { Ban, Heart, ShoppingCart, Star, Truck } from 'lucide-react';

const ProductDetailCard = ({ perfume }) => {
  const [selectedSize, setSelectedSize] = useState(() => perfume?.sizes?.[0] || null);

  useEffect(() => {
    if (perfume?.sizes?.length) {
      setSelectedSize(perfume.sizes[0]);
    }
  }, [perfume]);

  if (!perfume || !selectedSize) {
    return null;
  }

  const hasFreeDelivery = parseInt(selectedSize.label, 10) >= 20;

  return (
    <article className="overflow-hidden rounded-3xl border border-white/80 bg-white/80 shadow-[0_24px_80px_rgba(59,130,246,0.16)] backdrop-blur">
      <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative bg-[linear-gradient(150deg,#ecfeff_0%,#fdf4ff_55%,#fff7ed_100%)] p-6 sm:p-8">
          <img src={perfume.image} alt={perfume.name} className="h-full max-h-[520px] w-full rounded-2xl object-cover object-top" />
          <button className="absolute right-10 top-10 rounded-full bg-white/90 p-2.5 text-slate-600 shadow-lg backdrop-blur transition hover:text-rose-500">
            <Heart size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-5 flex items-center justify-between">
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
              {perfume.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, index) => (
                <Star key={index} size={14} className="fill-current" />
              ))}
              <span className="ml-1 text-xs font-semibold text-slate-500">4.8</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl text-slate-900 sm:text-4xl">{perfume.name}</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{perfume.description}</p>

          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Choose size</p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {perfume.sizes.map((size) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-xl border px-2 py-3 text-sm font-semibold transition sm:px-4 ${
                    selectedSize.label === size.label
                      ? 'border-cyan-500 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-200 hover:bg-cyan-50'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Selected price</p>
            <p className="mt-2 bg-gradient-to-r from-cyan-600 to-fuchsia-600 bg-clip-text text-4xl font-bold text-transparent">${selectedSize.price}</p>
            <p className="mt-1 text-sm text-slate-500">{selectedSize.label} bottle</p>

            <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-900 to-cyan-900 px-4 py-3 text-sm font-semibold text-white transition hover:from-cyan-600 hover:to-fuchsia-600">
              <ShoppingCart size={18} />
              Add to cart
            </button>
          </div>

          {hasFreeDelivery ? (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              <Truck size={18} />
              Free delivery included for this size
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
              <Ban size={18} />
              Delivery fee applies for 10ml
            </div>
          )}

          <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-800">
            <strong>Note:</strong> This page is for catalog browsing. Contact us to place an order.
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductDetailCard;
