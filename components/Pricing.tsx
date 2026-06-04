import AnimateIn from '@/components/AnimateIn';

const checkIcon = (
  <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 text-emerald-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const features = [
  'Sitio web profesional con pedidos online propios',
  'Sistema de pedidos directo — sin comisiones a DoorDash/UberEats',
  'Respuestas profesionales a todas las reseñas de Google',
  'Respuestas profesionales a todas las reseñas de Yelp',
  '3 Reels por semana con IA mostrando sus platos',
  'Optimización de Google Business Profile',
  'Soporte técnico incluido',
];

export default function Pricing({ restaurantName }: { restaurantName?: string }) {
  const waMsg = (plan: string) =>
    `https://wa.me/16178628607?text=${encodeURIComponent(
      `Hola! Me interesa el Plan ${plan} de Sazon Digital${restaurantName ? ` para ${restaurantName}` : ''}. ¿Podemos hablar?`
    )}`;

  return (
    <section className="py-10">
      {/* Header */}
      <AnimateIn className="text-center mb-10">
        <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Nuestros Planes</p>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E] tracking-tight mb-3">
          Elija cómo quiere crecer
        </h2>
        <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
          Tres servicios en cada plan: <strong>sitio web con pedidos</strong>, <strong>respuestas a reseñas</strong> y <strong>3 Reels por semana con IA</strong>.
        </p>
      </AnimateIn>

      {/* Plans grid */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Plan ARRANQUE */}
        <AnimateIn animation="fadeInUp" delay={0}>
          <div className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col h-full">
            <div className="mb-6">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Plan Arranque</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-[#0F1C2E] tracking-tight">$497</span>
                <span className="text-slate-400 text-sm mb-1">/mes</span>
              </div>
              <p className="text-xs text-slate-400">Sin costo inicial · Contrato 12 meses</p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-6">
              <p className="text-xs text-amber-700 font-medium">
                🚀 Empezamos hoy sin que usted pague un solo centavo. Nosotros construimos todo.
              </p>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                  {checkIcon} {f}
                </li>
              ))}
              <li className="flex items-start gap-2.5 text-sm text-slate-500 italic">
                <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 text-slate-400 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                </svg>
                Compromiso mínimo de 12 meses
              </li>
            </ul>

            <a
              href={waMsg('Arranque')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-[#0F1C2E] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1a2d47] transition-colors text-sm"
            >
              Quiero el Plan Arranque
            </a>
          </div>
        </AnimateIn>

        {/* Plan INVERSIÓN — recommended */}
        <AnimateIn animation="fadeInUp" delay={120}>
          <div className="bg-[#0F1C2E] rounded-2xl p-7 flex flex-col h-full relative overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#C9A84C] opacity-10 blur-2xl pointer-events-none" />

            <div className="relative z-10 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest">Plan Inversión</div>
                <span className="text-xs bg-[#C9A84C] text-[#0F1C2E] font-bold px-2.5 py-1 rounded-full">Más Popular</span>
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-white tracking-tight">$247</span>
                <span className="text-slate-400 text-sm mb-1">/mes</span>
              </div>
              <p className="text-slate-500 text-xs">$1,497 pago inicial + mes a mes sin contrato</p>
            </div>

            <div className="relative z-10 bg-white/5 border border-white/10 rounded-xl p-3 mb-6">
              <p className="text-xs text-slate-300 font-medium">
                ⭐ El setup cubre todo el trabajo de construcción. Después paga menos cada mes, sin compromisos.
              </p>
            </div>

            <ul className="relative z-10 space-y-3 flex-1 mb-8">
              {features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 text-[#C9A84C] mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {f}
                </li>
              ))}
              <li className="flex items-start gap-2.5 text-sm text-slate-400 italic">
                <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 text-slate-500 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Sin contrato mínimo — cancele cuando quiera
              </li>
            </ul>

            <a
              href={waMsg('Inversión')}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 w-full text-center bg-[#C9A84C] text-[#0F1C2E] font-bold py-3.5 rounded-xl hover:bg-[#E8C97A] transition-colors text-sm"
            >
              Quiero el Plan Inversión
            </a>
          </div>
        </AnimateIn>

        {/* Plan ANUAL */}
        <AnimateIn animation="fadeInUp" delay={240}>
          <div className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col h-full">
            <div className="mb-6">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Plan Anual</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black text-[#0F1C2E] tracking-tight">$3,997</span>
              </div>
              <p className="text-xs text-slate-400">Pago único anual · equivale a $333/mes</p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 mb-6">
              <p className="text-xs text-emerald-700 font-medium">
                💎 Ahorra $2,000 vs el Plan Arranque. Todo pagado, sin preocupaciones por 12 meses.
              </p>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
                  {checkIcon} {f}
                </li>
              ))}
              <li className="flex items-start gap-2.5 text-sm font-medium text-emerald-700">
                <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 text-emerald-500 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Soporte prioritario + informe mensual
              </li>
            </ul>

            <a
              href={waMsg('Anual')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-[#0F1C2E] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1a2d47] transition-colors text-sm"
            >
              Quiero el Plan Anual
            </a>
          </div>
        </AnimateIn>
      </div>

      {/* Bottom note */}
      <AnimateIn animation="fadeIn" delay={300}>
        <p className="text-center text-xs text-slate-400 mt-8">
          Todos los planes incluyen los mismos servicios. La diferencia es cómo prefiere invertir.
          <br />¿Preguntas? Escríbanos por WhatsApp — respondemos en menos de 5 minutos.
        </p>
      </AnimateIn>
    </section>
  );
}
