'use client';
import { useEffect, useRef, useState } from 'react';

// ── Lightweight scroll-triggered number animation ─────────────────────────────
function AnimPrice({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{n.toLocaleString()}{suffix}
    </span>
  );
}

// ── Feature check icon ────────────────────────────────────────────────────────
function Check({ gold }: { gold?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor"
      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${gold ? 'text-[#C9A84C]' : 'text-emerald-400'}`}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd"/>
    </svg>
  );
}

const features = [
  'Sitio web profesional con pedidos directos',
  'Sistema de pedidos online — sin comisiones a apps',
  'Optimizado para móviles y tablet',
  'Respuestas a todas las reseñas de Google',
  'Respuestas a todas las reseñas de Yelp',
  '3 Reels por semana generados con IA',
  'Contenido con sus platos y su marca',
  'Optimización de Google Business Profile',
  'Soporte técnico incluido',
];

export default function Pricing({ restaurantName }: { restaurantName?: string }) {
  const wa = (plan: string) =>
    `https://wa.me/16178628607?text=${encodeURIComponent(
      `Hola! Me interesa el Plan ${plan} de Sazon Digital${restaurantName ? ` para ${restaurantName}` : ''}. ¿Podemos hablar?`
    )}`;

  return (
    <div className="relative bg-[#0F1C2E] overflow-hidden">
      {/* Background orbs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#C9A84C] opacity-[0.04] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-500 opacity-[0.04] blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse flex-shrink-0" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">Planes y Precios</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            Elija cómo quiere<br />
            <span className="text-[#C9A84C]">hacer crecer su negocio</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Tres servicios incluidos en cada plan. Tres formas de invertir.
            Usted elige lo que mejor se adapta a su restaurante.
          </p>

          {/* Services icons row */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { icon: '🌐', label: 'Sitio web + pedidos' },
              { icon: '⭐', label: 'Respuestas a reseñas' },
              { icon: '🎬', label: '3 Reels/semana con IA' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2 text-slate-400 text-sm">
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">

          {/* ARRANQUE */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col hover:border-white/20 transition-colors">
            <div className="mb-8">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Plan Arranque</p>
              <div className="flex items-start gap-1 mb-2">
                <span className="text-slate-400 text-lg mt-2">$</span>
                <span className="text-6xl font-black text-white tracking-tight leading-none">
                  <AnimPrice value={497} />
                </span>
                <span className="text-slate-400 text-sm mt-4">/mes</span>
              </div>
              <p className="text-slate-500 text-xs">Sin costo inicial · Contrato mínimo 12 meses</p>
              <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
                <p className="text-amber-400 text-xs font-medium leading-relaxed">
                  🚀 Empezamos hoy sin que usted pague un centavo. Nosotros construimos todo.
                </p>
              </div>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-400">
                  <Check /> {f}
                </li>
              ))}
              <li className="flex items-start gap-2.5 text-xs text-slate-600 italic pt-1">
                <Check /> Compromiso mínimo de 12 meses
              </li>
            </ul>
            <a href={wa('Arranque')} target="_blank" rel="noopener noreferrer"
              className="block text-center border border-white/15 text-white text-sm font-semibold py-3.5 rounded-xl hover:bg-white/5 transition-colors">
              Comenzar con Arranque
            </a>
          </div>

          {/* INVERSIÓN — featured */}
          <div className="relative bg-[#C9A84C] rounded-2xl p-7 flex flex-col shadow-2xl shadow-[#C9A84C]/20 md:-mt-4 md:-mb-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-white text-[#0F1C2E] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                ✦ Más Popular
              </span>
            </div>
            <div className="mb-8 mt-2">
              <p className="text-xs font-semibold text-[#0F1C2E]/60 uppercase tracking-widest mb-3">Plan Inversión</p>
              <div className="flex items-start gap-1 mb-1">
                <span className="text-[#0F1C2E]/60 text-lg mt-2">$</span>
                <span className="text-6xl font-black text-[#0F1C2E] tracking-tight leading-none">
                  <AnimPrice value={247} />
                </span>
                <span className="text-[#0F1C2E]/60 text-sm mt-4">/mes</span>
              </div>
              <p className="text-[#0F1C2E]/60 text-xs">$1,497 pago inicial + sin contrato mínimo</p>
              <div className="mt-4 bg-[#0F1C2E]/10 rounded-xl px-4 py-3">
                <p className="text-[#0F1C2E] text-xs font-medium leading-relaxed">
                  ⭐ El setup cubre el trabajo de construcción. Después, el mensual más bajo — sin compromisos.
                </p>
              </div>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#0F1C2E]">
                  <Check gold /> {f}
                </li>
              ))}
              <li className="flex items-start gap-2.5 text-xs text-[#0F1C2E]/60 italic pt-1">
                <Check gold /> Sin contrato — cancele cuando quiera
              </li>
            </ul>
            <a href={wa('Inversión')} target="_blank" rel="noopener noreferrer"
              className="block text-center bg-[#0F1C2E] text-white text-sm font-bold py-3.5 rounded-xl hover:bg-[#1a2d47] transition-colors shadow-lg">
              Comenzar con Inversión
            </a>
          </div>

          {/* ANUAL */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col hover:border-white/20 transition-colors">
            <div className="mb-8">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Plan Anual</p>
              <div className="flex items-start gap-1 mb-2">
                <span className="text-slate-400 text-lg mt-2">$</span>
                <span className="text-6xl font-black text-white tracking-tight leading-none">
                  <AnimPrice value={3997} />
                </span>
              </div>
              <p className="text-slate-500 text-xs">Pago único anual · equivale a $<AnimPrice value={333} />/mes</p>
              <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                <p className="text-emerald-400 text-xs font-medium leading-relaxed">
                  💎 Ahorra $<AnimPrice value={2000} /> vs Plan Arranque. Pagado, sin contratos, sin sorpresas.
                </p>
              </div>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-400">
                  <Check /> {f}
                </li>
              ))}
              <li className="flex items-start gap-2.5 text-sm text-emerald-400 font-medium pt-1">
                <Check /> Informe mensual de resultados
              </li>
            </ul>
            <a href={wa('Anual')} target="_blank" rel="noopener noreferrer"
              className="block text-center border border-white/15 text-white text-sm font-semibold py-3.5 rounded-xl hover:bg-white/5 transition-colors">
              Comenzar con Anual
            </a>
          </div>
        </div>

        {/* Mobile App Add-on */}
        <div className="border border-[#C9A84C]/20 bg-[#C9A84C]/5 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-6 h-6 text-[#C9A84C]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3.75h3m-3 3.75H12"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-white font-bold text-lg tracking-tight">App Móvil con su Marca</h3>
                  <span className="text-xs bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/30 px-2.5 py-1 rounded-full font-semibold">Add-on</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                  Sus clientes descargan <strong className="text-white">su propia app</strong> con el logo de su restaurante. Pedidos online, notificaciones push para ofertas especiales, y acceso rápido desde la pantalla del teléfono. Sin App Store — se instala directamente desde su sitio web.
                </p>
                <div className="flex flex-wrap gap-4 mt-3">
                  {['Ícono del restaurante en el teléfono', 'Notificaciones push de ofertas', 'Pedidos con un toque', 'Compatible con iPhone y Android'].map(f => (
                    <span key={f} className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 text-center md:text-right">
              <div className="text-3xl font-black text-white mb-0.5">
                +$<AnimPrice value={97} /><span className="text-slate-400 text-base font-normal">/mes</span>
              </div>
              <p className="text-slate-500 text-xs mb-4">Se agrega a cualquier plan</p>
              <a href={`https://wa.me/16178628607?text=${encodeURIComponent(`Hola! Me interesa agregar la App Móvil${restaurantName ? ` para ${restaurantName}` : ''}. ¿Cómo funciona?`)}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#C9A84C]/40 text-[#C9A84C] text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#C9A84C]/10 transition-colors whitespace-nowrap">
                Agregar App Móvil
              </a>
            </div>
          </div>
        </div>

        {/* Bottom reassurance */}
        <p className="text-center text-slate-600 text-xs mt-8">
          Todos los planes incluyen los mismos 3 servicios. ¿Preguntas? Escríbanos —{' '}
          <a href="https://wa.me/16178628607" className="text-[#C9A84C] hover:underline">respondemos en menos de 5 minutos</a>.
        </p>

        </div>{/* end max-w-7xl */}
      </div>
    </div>
  );
}
