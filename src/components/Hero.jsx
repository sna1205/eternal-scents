import React from 'react';

const logoSrc = `${import.meta.env.BASE_URL}images/logo.jpg`;

const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-rose-100 bg-[linear-gradient(110deg,#0f172a_0%,#1e293b_45%,#0f172a_100%)] px-6 pb-16 pt-14 text-white">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-teal-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-5 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-black/20 px-3 py-2 backdrop-blur">
          <img
            src={logoSrc}
            alt="Eternal Scents logo"
            className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/20"
          />
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-rose-100">Eternal Scents</p>
            <p className="text-[11px] text-slate-300">Curated fragrance catalog</p>
          </div>
        </div>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Discover your next favorite fragrance
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">
          Browse curated scents, compare sizes quickly, and filter by brand, budget, and delivery options in one place.
        </p>
      </div>
    </section>
  );
};

export default Hero;
