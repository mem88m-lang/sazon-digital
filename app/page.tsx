import Link from "next/link";
import { restaurants, getScoreLabel } from "@/lib/restaurants";
import AnimateIn from "@/components/AnimateIn";
import StateFilter from "@/components/StateFilter";
import LeadForm from "@/components/LeadForm";
import MobileMenu from "@/components/MobileMenu";
import Pricing from "@/components/Pricing";

// ── Clean SVG icons ──────────────────────────────────────────────────────────
function IconShoppingCart() {
  return <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5"><path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>;
}
function IconMagnifyingGlass() {
  return <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"/></svg>;
}
function IconUsers() {
  return <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5"><path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>;
}
function IconStar() {
  return <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>;
}
function IconGlobe() {
  return <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3.157 7.582A8.959 8.959 0 003 12c0 .778.099 1.533.284 2.253"/></svg>;
}
function IconHeart() {
  return <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5"><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>;
}

export default function Home() {
  const avgScore = Math.round(restaurants.reduce((s, r) => s + r.score, 0) / restaurants.length);
  const avgScore10 = (avgScore / 10).toFixed(1);
  const cities = Array.from(new Set(restaurants.map(r => r.city))).length;

  const problems = [
    { icon: <IconShoppingCart />, title: "Sin pedidos online propios", stat: "68%", description: "Dependen de Uber Eats y DoorDash, pagando hasta 30% de comisión en cada pedido." },
    { icon: <IconMagnifyingGlass />, title: "SEO local inexistente", stat: "82%", description: "No aparecen en Google cuando clientes buscan su tipo de comida en la ciudad." },
    { icon: <IconUsers />, title: "Sin captura de clientes", stat: "74%", description: "No tienen emails ni teléfonos de sus clientes. Cada visita se pierde para siempre." },
    { icon: <IconStar />, title: "Reseñas sin gestionar", stat: "61%", description: "No responden reseñas negativas ni tienen estrategia de calificaciones positivas." },
    { icon: <IconGlobe />, title: "Sitio web desactualizado", stat: "55%", description: "Sitios lentos, sin optimizar para móviles y sin sistema de pedidos integrado." },
    { icon: <IconHeart />, title: "Sin programa de fidelización", stat: "88%", description: "Los clientes no tienen incentivo para regresar en lugar de probar la competencia." },
  ];

  const steps = [
    {
      step: "01",
      title: "Escaneamos su negocio",
      description: "Analizamos su presencia digital completa: Google, Yelp, sitio web, redes sociales, SEO y más. Sin que usted tenga que hacer nada.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"/>
        </svg>
      ),
    },
    {
      step: "02",
      title: "Generamos su análisis",
      description: "Entregamos un reporte personalizado con su puntuación, problemas específicos y oportunidades ordenadas por impacto.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
        </svg>
      ),
    },
    {
      step: "03",
      title: "Implementamos mejoras",
      description: "Nuestro equipo ejecuta las mejoras por usted. Usted se enfoca en cocinar; nosotros en hacer crecer su negocio.",
      icon: (
        <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
    },
  ];

  const checklistItems = [
    "Google Reviews y calificación","Yelp Reviews y presencia","Calidad del sitio web",
    "Velocidad del sitio","Optimización móvil","Redes sociales",
    "Frecuencia de publicaciones","Calidad de fotografías","SEO local",
    "Perfil de Google Business","Sistema de pedidos online","Dependencia de DoorDash",
    "Dependencia de Uber Eats","Dependencia de Grubhub","Programa de fidelización",
    "Captura de clientes SMS","Captura de clientes Email","Posición vs. competidores",
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0F1C2E] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-[#C9A84C] font-bold text-xs tracking-tight">SD</span>
            </div>
            <span className="font-semibold text-[#0F1C2E] text-sm tracking-tight">Sazon Digital</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8">
              <a href="#analisis" className="text-sm text-slate-500 hover:text-[#0F1C2E] transition-colors">Análisis</a>
              <a href="#como-funciona" className="text-sm text-slate-500 hover:text-[#0F1C2E] transition-colors">Cómo Funciona</a>
              <a href="#servicios" className="text-sm text-slate-500 hover:text-[#0F1C2E] transition-colors">Servicios</a>
              <a href="#precios" className="text-sm text-slate-500 hover:text-[#0F1C2E] transition-colors">Precios</a>
              <a href="https://wa.me/16178628607" className="bg-[#0F1C2E] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#1a2d47] transition-colors font-medium">
                Solicitar Análisis
              </a>
            </div>
            <MobileMenu />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-16 pb-20 px-4 md:px-6 bg-[#0F1C2E] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#C9A84C] opacity-[0.03] blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-10 max-w-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0" />
            <span className="text-slate-400 text-xs font-medium tracking-wide">Análisis de Crecimiento · Restaurantes Latinos</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight text-balance">
            Descubra cuánto dinero está perdiendo su restaurante por{" "}
            <span className="gradient-text">problemas digitales</span>{" "}
            que probablemente no conoce.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            Hemos analizado <strong className="text-white font-semibold">{restaurants.length} restaurantes latinos</strong> en Estados Unidos. La mayoría pierde entre $2,000 y $8,000 al mes en comisiones y oportunidades digitales perdidas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#analisis" className="bg-[#C9A84C] text-[#0F1C2E] font-semibold px-6 py-3.5 rounded-lg hover:bg-[#E8C97A] transition-colors text-center text-sm">
              Ver análisis de ejemplo
            </a>
            <a href="https://wa.me/16178628607" className="border border-white/15 text-white px-6 py-3.5 rounded-lg hover:bg-white/5 transition-colors text-center text-sm">
              Solicitar mi análisis
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-10 md:mt-20 md:pt-16 border-t border-white/8">
            {[
              { value: restaurants.length.toString(), label: "Restaurantes analizados" },
              { value: avgScore10 + " / 10", label: "Puntuación promedio" },
              { value: "68%", label: "Sin sistema de pedidos propio" },
              { value: "$4,800", label: "Perdido en comisiones / mes" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1.5 tracking-tight">{stat.value}</div>
                <div className="text-slate-500 text-sm leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMAS */}
      <section className="py-16 px-4 md:py-24 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimateIn className="mb-16">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Lo que encontramos</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1C2E] tracking-tight mb-4">Los problemas más comunes</h2>
            <p className="text-slate-500 text-lg max-w-xl leading-relaxed">Después de analizar {restaurants.length} restaurantes, estos problemas aparecen una y otra vez.</p>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
            {problems.map((p, i) => (
              <AnimateIn key={p.title} delay={i * 60} animation="fadeIn">
                <div className="bg-white p-8 hover:bg-slate-50 transition-colors h-full">
                  <div className="w-10 h-10 bg-[#0F1C2E] rounded-xl flex items-center justify-center text-white mb-5">
                    {p.icon}
                  </div>
                  <div className="text-3xl font-bold text-[#0F1C2E] tracking-tight mb-1">{p.stat}</div>
                  <div className="text-xs text-slate-400 mb-4">de restaurantes afectados</div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ ANALIZAMOS */}
      <section id="servicios" className="py-16 px-4 md:py-24 md:px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <AnimateIn className="mb-16">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Metodología</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1C2E] tracking-tight mb-4">Qué analizamos en cada informe</h2>
            <p className="text-slate-500 text-lg max-w-xl leading-relaxed">Un análisis completo de 18 puntos de su presencia digital.</p>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {checklistItems.map((item, i) => (
              <AnimateIn key={i} delay={i * 30} animation="fadeIn">
                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-slate-100 hover:border-slate-300 transition-colors group">
                  <svg className="w-3.5 h-3.5 text-[#C9A84C] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">{item}</span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-16 px-4 md:py-24 md:px-6 bg-[#0F1C2E]">
        <div className="max-w-5xl mx-auto">
          <AnimateIn className="mb-16">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Proceso</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Cómo funciona</h2>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">Tres pasos para transformar la presencia digital de su restaurante.</p>
          </AnimateIn>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((s, i) => (
              <AnimateIn key={s.step} delay={i * 150} animation="fadeInUp">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-slate-400">
                    {s.icon}
                  </div>
                  <span className="text-xs font-mono text-slate-600 tracking-widest">{s.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ANÁLISIS GRID */}
      <section id="analisis" className="py-16 px-4 md:py-24 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimateIn className="mb-16">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Análisis publicados</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1C2E] tracking-tight mb-4">Análisis de Crecimiento realizados</h2>
            <p className="text-slate-500 text-lg max-w-xl leading-relaxed">{restaurants.length} restaurantes analizados en {cities} ciudades de Estados Unidos.</p>
          </AnimateIn>
          <StateFilter restaurants={restaurants} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 md:py-24 md:px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <AnimateIn className="mb-16">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-3">Preguntas frecuentes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1C2E] tracking-tight">Todo lo que necesita saber</h2>
          </AnimateIn>
          <div className="divide-y divide-slate-100">
            {[
              { q: "¿Cuánto tiempo toma generar mi análisis?", a: "Generamos el análisis en 48-72 horas laborables. Una vez listo, lo recibirá por WhatsApp con un enlace personalizado." },
              { q: "¿Cuánto cuesta el análisis?", a: "Contáctenos directamente por WhatsApp para conocer nuestros planes. El análisis completo y el plan de implementación son parte de nuestros servicios." },
              { q: "¿Necesito conocimientos técnicos?", a: "No. Nuestro equipo maneja todo lo técnico. Usted solo necesita aprobarlo y nosotros implementamos." },
              { q: "¿Cuánto tiempo tardan en verse resultados?", a: "Las acciones rápidas (sitio web, Google Business) muestran resultados en 30 días. El SEO y fidelización muestran resultados sostenibles en 90 días." },
              { q: "¿Trabajan solo con restaurantes latinos?", a: "Nos especializamos en restaurantes latinos en Estados Unidos porque entendemos el mercado, la comunidad y los desafíos específicos que enfrentan." },
            ].map((faq, i) => (
              <AnimateIn key={i} delay={i * 60} animation="fadeInUp">
                <div className="py-6">
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">{faq.q}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="precios" className="py-16 px-4 md:py-24 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <Pricing />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 px-4 md:py-24 md:px-6 bg-[#0F1C2E]">
        <div className="max-w-2xl mx-auto">
          <AnimateIn className="mb-10">
            <p className="text-xs font-semibold text-[#C9A84C] uppercase tracking-widest mb-4">Empiece hoy</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Su restaurante merece crecer digitalmente.</h2>
            <p className="text-slate-400 leading-relaxed">Complete el formulario y le contactamos en menos de 5 minutos con su análisis personalizado.</p>
          </AnimateIn>
          <AnimateIn animation="fadeInUp" delay={150}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-8">
              <LeadForm />
            </div>
          </AnimateIn>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-[#0F1C2E] rounded-lg flex items-center justify-center">
              <span className="text-[#C9A84C] font-bold text-xs">SD</span>
            </div>
            <span className="text-sm font-medium text-[#0F1C2E]">Sazon Digital</span>
          </div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Sazon Digital. Especialistas en transformación digital para restaurantes latinos.</p>
        </div>
      </footer>

    </div>
  );
}
