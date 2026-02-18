import React from 'react';
import { ArrowRight, Truck } from 'lucide-react';

const ProductCard = ({ perfume, onViewDetails }) => {
  const startingPrice = Math.min(...perfume.sizes.map((size) => size.price));
  const hasFreeDeliverySize = perfume.sizes.some((size) => parseInt(size.label, 10) >= 20);
  const sortedSizes = [...perfume.sizes].sort((a, b) => parseInt(a.label, 10) - parseInt(b.label, 10));

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-100/50">
      <div className="relative h-60 overflow-hidden bg-[linear-gradient(145deg,#fdf2f8_0%,#fff7ed_100%)]">
        <img
          src={perfume.image}
          alt={perfume.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
          {perfume.brand}
        </div>

        {hasFreeDeliverySize && (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-semibold text-white shadow-md">
            <Truck size={12} />
            Free 20ml+
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-serif text-xl text-slate-900">{perfume.name}</h3>
        <p className="mt-2 text-sm text-slate-500">Starting at</p>
        <p className="text-3xl font-bold text-slate-900">${startingPrice}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {sortedSizes.map((size) => (
            <span key={`${perfume.id}-${size.label}`} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {size.label}
            </span>
          ))}
        </div>

        <button
          onClick={() => onViewDetails(perfume)}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
          aria-label={`View details for ${perfume.name}`}
        >
          View details
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
