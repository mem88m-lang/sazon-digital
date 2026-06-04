import Link from "next/link";
import { notFound } from "next/navigation";
import { restaurants, getRestaurant, getScoreColor, getScoreLabel } from "@/lib/restaurants";
import AnimateIn from "@/components/AnimateIn";
import AnimatedScore from "@/components/AnimatedScore";
import AnimatedBar from "@/components/AnimatedBar";
import LeadForm from "@/components/LeadForm";
import AnimatedStat from "@/components/AnimatedStat";
import AnimatedNumber from "@/components/AnimatedNumber";
import Pricing from "@/components/Pricing";

export async function generateStaticParams() {
  return restaurants.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getRestaurant(slug);
  if (!r) return {};
  return {
    title: `Análisis de Crecimiento — ${r.name} | Sazon Digital`,
    description: `Análisis completo de la presencia digital de ${r.name} en ${r.city}, ${r.state}. Puntuación: ${(r.score / 10).toFixed(1)} de 10.`,
  };
}

// ── SVG Icon set ─────────────────────────────────────────────────────────────
const Icon = {
  star: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>,
  globe: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3.157 7.582A8.959 8.959 0 003 12c0 .778.099 1.533.284 2.253"/></svg>,
  bag: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5"><path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>,
  share: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5"><path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"/></svg>,
  search: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-5 h-5"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"/></svg>,
  check: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4 h-4"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  signal: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4 h-4"><path d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"/></svg>,
  chart: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4 h-4"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>,
  target: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4 h-4"><path d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/></svg>,
  bolt: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4 h-4"><path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>,
  trend: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4 h-4"><path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg>,
  flag: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-4 h-4"><path d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"/></svg>,
  pin: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>,
  phone: <svg fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>,
};

export default async function AuditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getRestaurant(slug);
  if (!r) notFound();

  const categories = [
    { label: "Google", score: r.googleScore, icon: Icon.star },
    { label: "Sitio Web", score: r.webScore, icon: Icon.globe },
    { label: "Pedidos", score: r.ordersScore, icon: Icon.bag },
    { label: "Redes", score: r.socialScore, icon: Icon.share },
    { label: "SEO", score: r.seoScore, icon: Icon.search },
  ];

  const year = new Date().getFullYear();

  const onDeliveryApps = r.hasDoorDash || r.hasUberEats || r.hasGrubhub;
  const platformCount = [r.hasDoorDash, r.hasUberEats, r.hasGrubhub].filter(Boolean).length;
  const commissionLoss = platformCount === 3 ? 5400 : platformCount === 2 ? 3800 : platformCount === 1 ? 1900 : 0;
  // Estimated monthly revenue lost by NOT being on delivery platforms
  const missedRevenue = 2500;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* NAV */}
      <nav className="bg-[#0F1C2E] text-white px-4 md:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity min-w-0">
            <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-[#C9A84C] font-bold text-xs">SD</span>
            </div>
            <span className="text-sm font-medium hidden sm:block truncate">Sazon Digital</span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-slate-400 text-sm hover:text-white transition-colors flex-shrink-0">
            <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
            <span className="hidden sm:inline">Todos los análisis</span>
            <span className="sm:hidden">Volver</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">

        {/* HEADER */}
        <AnimateIn animation="fadeInUp">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-8 mb-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="flex items-start gap-5 flex-1">
                <div className="w-14 h-14 bg-[#0F1C2E] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A84C] font-bold">
                    {r.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">{r.cuisine}</span>
                    <span className="text-slate-200">·</span>
                    <span className="text-xs text-slate-400">{r.city}, {r.state}</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#0F1C2E] tracking-tight mb-2">{r.name}</h1>
                  <p className="text-slate-400 text-sm mb-3">Análisis de Crecimiento · {year}</p>
                  {(r.address || r.phone) && (
                    <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                      {r.address && (
                        <span className="flex items-center gap-1.5">
                          {Icon.pin} {r.address}
                        </span>
                      )}
                      {r.phone && (
                        <a href={`tel:${r.phone.replace(/\D/g,'')}`} className="flex items-center gap-1.5 hover:text-[#C9A84C] transition-colors">
                          {Icon.phone} {r.phone}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                  Índice de Crecimiento Digital
                </p>
                <AnimatedScore score={r.score} size={140} />
                <p className="text-xs text-slate-400 text-center leading-snug max-w-[140px]">
                  Cuanto más alto, mayor presencia digital
                </p>
                <span className={"text-xs font-semibold px-3 py-1 rounded-full border " +
                  (r.score >= 70 ? "border-emerald-200 text-emerald-700 bg-emerald-50" :
                   r.score >= 50 ? "border-amber-200 text-amber-700 bg-amber-50" :
                   "border-red-200 text-red-700 bg-red-50")}>
                  {getScoreLabel(r.score)}
                </span>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* MONEY SECTION — always visible */}
        <AnimateIn animation="fadeInUp" delay={100}>
          <div className="bg-[#0F1C2E] rounded-2xl p-5 md:p-8 mb-5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-red-500" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse-slow" />
                  <span className="text-red-400 text-xs font-medium uppercase tracking-widest">
                    {onDeliveryApps ? 'Dinero que sale de su negocio cada mes' : 'Dinero que su negocio está dejando ir cada mes'}
                  </span>
                </div>

                {onDeliveryApps ? (
                  <>
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
                      Su restaurante paga{' '}
                      <span className="text-red-400">
                        <AnimatedNumber value={commissionLoss} prefix="$" suffix=" al mes" delay={200} />
                      </span>{' '}
                      en comisiones a plataformas externas.
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
                      Uber Eats, DoorDash y Grubhub cobran entre un 25% y 30% de comisión por cada pedido. Ese dinero le pertenece a usted — y puede recuperarlo con un sistema de pedidos propio.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
                      Su restaurante pierde aproximadamente{' '}
                      <span className="text-red-400">
                        <AnimatedNumber value={missedRevenue} prefix="$" suffix=" al mes" delay={200} />
                      </span>{' '}
                      por no tener presencia en plataformas de delivery.
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
                      El 40% de los consumidores elige restaurantes a través de DoorDash, Uber Eats o Grubhub. Sin estar en estas plataformas, su restaurante es invisible para miles de clientes potenciales en su área.
                    </p>
                  </>
                )}
              </div>

              <div className="flex-shrink-0 bg-white/5 border border-white/8 rounded-xl p-6 text-center min-w-[150px]">
                <div className="text-3xl font-bold text-red-400 mb-0.5 tracking-tight">
                  <AnimatedNumber value={onDeliveryApps ? commissionLoss : missedRevenue} prefix="$" delay={0} />
                </div>
                <div className="text-slate-500 text-xs mb-4">{onDeliveryApps ? 'por mes en comisiones' : 'por mes en ventas perdidas'}</div>
                <div className="text-xl font-bold text-white mb-0.5 tracking-tight">
                  <AnimatedNumber value={onDeliveryApps ? commissionLoss * 12 : missedRevenue * 12} prefix="$" delay={300} />
                </div>
                <div className="text-slate-500 text-xs">al año</div>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* CATEGORY CARDS */}
        <AnimateIn animation="fadeInUp" delay={150}>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-5">
            {categories.map((cat, i) => (
              <div key={cat.label} className="bg-white rounded-2xl border border-slate-100 p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-9 h-9 bg-[#0F1C2E] rounded-xl flex items-center justify-center mx-auto mb-3 text-[#C9A84C]">
                  {cat.icon}
                </div>
                <div className={"text-3xl font-black tracking-tight mb-3 " + getScoreColor(cat.score)}>
                  {(cat.score / 10).toFixed(1)}
                </div>
                <AnimatedBar
                  value={cat.score}
                  color={cat.score >= 70 ? "#10B981" : cat.score >= 50 ? "#F59E0B" : "#EF4444"}
                  height={4}
                  delay={i * 100}
                />
                <div className="text-xs text-slate-500 mt-2.5 font-medium">{cat.label}</div>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* THREE COLUMNS */}
        <div className="grid md:grid-cols-3 gap-5 mb-5">

          {/* STRENGTHS */}
          <AnimateIn animation="fadeInUp" delay={0}>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 bg-[#0F1C2E] rounded-lg flex items-center justify-center text-[#C9A84C]">
                  {Icon.check}
                </div>
                <h2 className="font-semibold text-[#0F1C2E] text-sm">Puntos Fuertes</h2>
              </div>
              <div className="space-y-3">
                {r.strengths.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                    <p className="text-sm text-slate-500 leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* DIGITAL STATUS */}
          <AnimateIn animation="fadeInUp" delay={80}>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 bg-[#0F1C2E] rounded-lg flex items-center justify-center text-[#C9A84C]">
                  {Icon.signal}
                </div>
                <h2 className="font-semibold text-[#0F1C2E] text-sm">Estado Digital</h2>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Sitio Web", value: r.hasWebsite },
                  { label: "Pedidos Propios", value: r.hasOnlineOrdering },
                  { label: "DoorDash", value: r.hasDoorDash, warning: r.hasDoorDash },
                  { label: "Uber Eats", value: r.hasUberEats, warning: r.hasUberEats },
                  { label: "Grubhub", value: r.hasGrubhub, warning: r.hasGrubhub },
                  { label: "Prog. de Lealtad", value: r.hasLoyaltyProgram },
                  { label: "Captura SMS", value: r.hasSmsCapture },
                  { label: "Captura Email", value: r.hasEmailCapture },
                  { label: "Móvil Optimizado", value: r.mobileOptimized },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{item.label}</span>
                    {item.value ? (
                      <span className={"text-xs font-medium px-2 py-0.5 rounded-md " + (item.warning ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-700")}>
                        {item.warning ? "Activo · comisiones" : "Activo"}
                      </span>
                    ) : (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-400">Inactivo</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* METRICS */}
          <AnimateIn animation="fadeInUp" delay={160}>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 bg-[#0F1C2E] rounded-lg flex items-center justify-center text-[#C9A84C]">
                  {Icon.chart}
                </div>
                <h2 className="font-semibold text-[#0F1C2E] text-sm">Métricas Clave</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xs text-slate-400">Google</span>
                    <span className="text-sm font-semibold text-[#0F1C2E]">{r.googleRating} <span className="text-slate-400 font-normal text-xs">/ 5.0</span> <span className="text-slate-400 font-normal text-xs">({r.googleReviews})</span></span>
                  </div>
                  <AnimatedBar value={r.googleRating / 5 * 100} color="#F59E0B" height={4} />
                </div>
                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xs text-slate-400">Yelp</span>
                    <span className="text-sm font-semibold text-[#0F1C2E]">{r.yelpRating} <span className="text-slate-400 font-normal text-xs">/ 5.0</span> <span className="text-slate-400 font-normal text-xs">({r.yelpReviews})</span></span>
                  </div>
                  <AnimatedBar value={r.yelpRating / 5 * 100} color="#EF4444" height={4} delay={200} />
                </div>
                <div className="pt-3 border-t border-slate-50 space-y-2.5">
                  {[
                    { label: "Instagram", value: r.instagramFollowers.toLocaleString() + " seg." },
                    { label: "Facebook", value: r.facebookFollowers.toLocaleString() + " seg." },
                    { label: "Posts / semana", value: r.postsPerWeek.toString(), color: r.postsPerWeek >= 4 ? "text-emerald-600" : r.postsPerWeek >= 2 ? "text-amber-600" : "text-red-500" },
                    { label: "Velocidad web", value: r.websiteSpeed, color: r.websiteSpeed === "Buena" ? "text-emerald-600" : r.websiteSpeed === "Regular" ? "text-amber-600" : "text-red-500" },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-xs">
                      <span className="text-slate-400">{item.label}</span>
                      <span className={"font-medium " + (item.color || "text-[#0F1C2E]")}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* OPPORTUNITIES */}
        <AnimateIn animation="fadeInUp">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 bg-[#0F1C2E] rounded-lg flex items-center justify-center text-[#C9A84C]">
                {Icon.target}
              </div>
              <h2 className="font-semibold text-[#0F1C2E]">Oportunidades de Mejora</h2>
            </div>
            <p className="text-slate-400 text-xs mb-6 ml-9">Problemas identificados ordenados por impacto y prioridad.</p>
            <div className="space-y-3">
              {r.opportunities.map((opp, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center gap-3 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#0F1C2E] mb-1">{opp.problem}</p>
                    <p className="text-xs text-slate-400">{opp.impact}</p>
                  </div>
                  <span className={
                    "text-xs font-medium px-2.5 py-1 rounded-lg flex-shrink-0 " +
                    (opp.priority === "Alta" ? "bg-red-50 text-red-600" :
                     opp.priority === "Media" ? "bg-amber-50 text-amber-600" :
                     "bg-slate-100 text-slate-500")
                  }>
                    {opp.priority} prioridad
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* ACTION PLAN */}
        <AnimateIn animation="fadeInUp">
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            {[
              { title: "Acciones Rápidas", subtitle: "Primeros 30 días", items: r.quickActions, accent: "border-[#C9A84C]", icon: Icon.bolt },
              { title: "Acciones de Crecimiento", subtitle: "60 – 90 días", items: r.growthActions, accent: "border-[#C9A84C]", icon: Icon.trend },
              { title: "Acciones Estratégicas", subtitle: "3 – 6 meses", items: r.strategicActions, accent: "border-[#C9A84C]", icon: Icon.flag },
            ].map((phase) => (
              <div key={phase.title} className={"bg-white rounded-2xl border border-slate-100 border-t-2 " + phase.accent + " p-6 shadow-sm"}>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 bg-[#0F1C2E] rounded-lg flex items-center justify-center text-[#C9A84C]">
                    {phase.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0F1C2E]">{phase.title}</div>
                    <div className="text-xs text-slate-400">{phase.subtitle}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {phase.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="text-slate-300 font-mono text-xs mt-0.5 flex-shrink-0">{String(j + 1).padStart(2, '0')}</span>
                      <p className="text-xs text-slate-500 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* PROJECTED RESULTS */}
        <AnimateIn animation="fadeInUp">
          <div className="bg-[#0F1C2E] rounded-2xl p-5 md:p-8 mb-5">
            <div className="mb-6">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">Proyección</p>
              <h2 className="font-bold text-white text-xl tracking-tight">Resultados potenciales con implementación completa</h2>
              <p className="text-slate-500 text-sm mt-1">Basados en restaurantes similares que implementaron estas mejoras.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <AnimatedStat value="+35%" label="Pedidos directos en 90 días" delay={0} />
              <AnimatedStat value={commissionLoss > 0 ? `$${commissionLoss}` : "$1500"} label="Recuperados en comisiones / mes" delay={150} />
              <AnimatedStat value="+28%" label="Más clientes recurrentes" delay={300} />
              <AnimatedStat value="2×" label="Visibilidad en Google" delay={450} />
            </div>
          </div>
        </AnimateIn>

        {/* LEAD FORM */}
        <AnimateIn animation="fadeInUp">
          <div className="rounded-2xl overflow-hidden mb-6 shadow-2xl">
            {/* Header */}
            <div className="relative bg-[#0F1C2E] px-5 py-10 md:px-12 md:py-12 text-center overflow-hidden">
              {/* Glow blobs */}
              <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#C9A84C] opacity-10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-[#C9A84C] opacity-10 blur-3xl pointer-events-none" />

              {/* Pulse dot */}
              <div className="relative z-10 inline-flex items-center gap-2 bg-[#C9A84C]/15 border border-[#C9A84C]/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse-slow" />
                <span className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest">Podemos implementar esto por usted</span>
              </div>

              <h2 className="relative z-10 font-bold text-white text-3xl md:text-4xl tracking-tight mb-4 leading-tight">
                ¿Listo para corregir<br />
                <span className="gradient-text">estos problemas?</span>
              </h2>

              <p className="relative z-10 text-slate-400 text-base max-w-lg mx-auto leading-relaxed">
                Ya sabe exactamente lo que está fallando. Nuestro equipo lo implementa por usted — sin tecnicismos, sin complicaciones, sin perder tiempo.
              </p>

              {/* Trust line */}
              <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 mt-8">
                {[
                  { icon: "⚡", text: "Contacto en 5 minutos" },
                  { icon: "✓", text: "Sin compromiso" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <span className="text-[#C9A84C]">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-white p-5 md:p-10">
              <LeadForm restaurantName={r.name} theme="light" />
            </div>
          </div>
        </AnimateIn>

        {/* PRICING */}
        <div className="bg-slate-50 rounded-2xl px-5 md:px-8 py-2 mb-6 border border-slate-100">
          <Pricing restaurantName={r.name} />
        </div>

      </div>
    </div>
  );
}
