'use client';
import { useState } from 'react';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
        aria-label="Menú"
      >
        {open ? (
          <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-5 h-5 text-[#0F1C2E]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-5 h-5 text-[#0F1C2E]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg px-4 py-4 flex flex-col gap-1">
          <a
            href="#analisis"
            onClick={() => setOpen(false)}
            className="text-sm text-slate-600 hover:text-[#0F1C2E] font-medium px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Análisis
          </a>
          <a
            href="#como-funciona"
            onClick={() => setOpen(false)}
            className="text-sm text-slate-600 hover:text-[#0F1C2E] font-medium px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cómo Funciona
          </a>
          <a
            href="#servicios"
            onClick={() => setOpen(false)}
            className="text-sm text-slate-600 hover:text-[#0F1C2E] font-medium px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Servicios
          </a>
          <div className="pt-2 mt-1 border-t border-slate-100">
            <a
              href="https://wa.me/16178628607"
              className="block bg-[#0F1C2E] text-white text-sm font-medium px-4 py-3 rounded-lg text-center hover:bg-[#1a2d47] transition-colors"
            >
              Solicitar Análisis
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
