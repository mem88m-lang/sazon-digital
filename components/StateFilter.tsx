'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Restaurant, getScoreColor, getScoreBg, getScoreLabel } from '@/lib/restaurants';

const PAGE_SIZE = 12;

export default function StateFilter({ restaurants }: { restaurants: Restaurant[] }) {
  const [selected, setSelected] = useState('ALL');
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const states = useMemo(() => {
    const counts: Record<string, number> = {};
    restaurants.forEach(r => { counts[r.state] = (counts[r.state] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [restaurants]);

  const filtered = useMemo(() => {
    setVisible(PAGE_SIZE); // reset on filter/search change
    return restaurants.filter(r => {
      const matchState = selected === 'ALL' || r.state === selected;
      const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.city.toLowerCase().includes(search.toLowerCase());
      return matchState && matchSearch;
    });
  }, [restaurants, selected, search]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <div>
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar restaurante o ciudad..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-[#0F1C2E] transition-colors bg-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelected('ALL')}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${selected === 'ALL' ? 'bg-[#0F1C2E] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'}`}
          >
            Todos · {restaurants.length}
          </button>
          {states.map(([state, count]) => (
            <button
              key={state}
              onClick={() => setSelected(state)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${selected === state ? 'bg-[#0F1C2E] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'}`}
            >
              {state} · {count}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-slate-400 text-xs mb-5">
        {filtered.length} restaurante{filtered.length !== 1 ? 's' : ''}
        {selected !== 'ALL' && <span> en <span className="text-[#0F1C2E] font-medium">{selected}</span></span>}
        {search && <span> · "<span className="text-[#0F1C2E] font-medium">{search}</span>"</span>}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {shown.map((r) => {
          const s10 = (r.score / 10).toFixed(1);
          const g10 = (r.googleScore / 10).toFixed(1);
          const w10 = (r.webScore / 10).toFixed(1);
          const o10 = (r.ordersScore / 10).toFixed(1);
          return (
            <Link key={r.slug} href={"/" + r.slug}
              className="group bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all block">
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 bg-[#0F1C2E] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A84C] text-xs font-bold">
                    {r.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <div className="text-right">
                  <div className={"text-xl font-bold tracking-tight " + getScoreColor(r.score)}>{s10}</div>
                  <div className="text-xs text-slate-300">/ 10</div>
                </div>
              </div>
              <h3 className="font-semibold text-[#0F1C2E] mb-0.5 group-hover:text-[#C9A84C] transition-colors text-sm leading-snug">{r.name}</h3>
              <p className="text-slate-400 text-xs mb-4">{r.city}, {r.state} · {r.cuisine}</p>
              <div className="space-y-1.5 mb-4">
                {[
                  { label: "Google", value: r.googleScore, d: g10 },
                  { label: "Web", value: r.webScore, d: w10 },
                  { label: "Pedidos", value: r.ordersScore, d: o10 },
                ].map((cat) => (
                  <div key={cat.label} className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 w-14">{cat.label}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-1">
                      <div
                        className={"h-1 rounded-full " + (cat.value >= 70 ? "bg-emerald-400" : cat.value >= 50 ? "bg-amber-400" : "bg-red-400")}
                        style={{ width: cat.value + "%" }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-5 text-right">{cat.d}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3.5 border-t border-slate-50 flex items-center justify-between">
                <span className={"text-xs font-medium px-2 py-0.5 rounded-md " + getScoreBg(r.score) + " " + getScoreColor(r.score)}>
                  {getScoreLabel(r.score)}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-[#C9A84C] transition-colors">
                  Ver análisis →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="text-center mt-10">
          <p className="text-slate-400 text-xs mb-4">
            Mostrando {shown.length} de {filtered.length} restaurantes
          </p>
          <button
            onClick={() => setVisible(v => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 bg-[#0F1C2E] text-white text-sm font-semibold px-8 py-3.5 rounded-xl hover:bg-[#1a2d47] transition-all hover:scale-[1.02]"
          >
            Ver más restaurantes
            <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"/>
            </svg>
          </div>
          <p className="text-[#0F1C2E] font-medium mb-1">Sin resultados</p>
          <p className="text-slate-400 text-sm">Intente con otro filtro o término de búsqueda.</p>
        </div>
      )}
    </div>
  );
}
