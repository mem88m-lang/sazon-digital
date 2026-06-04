export default function LeadForm({
  restaurantName,
}: {
  restaurantName?: string;
  theme?: 'dark' | 'light';
}) {
  const msg = restaurantName
    ? `Hola! Vi el análisis de crecimiento de ${restaurantName} y me interesa mejorar mi presencia digital. ¿Podemos hablar?`
    : `Hola! Me interesa mejorar la presencia digital de mi restaurante. ¿Podemos hablar?`;

  const emailSubject = restaurantName
    ? `Análisis de Crecimiento — ${restaurantName}`
    : `Análisis de Crecimiento Digital`;

  const emailBody = restaurantName
    ? `Hola,\n\nVi el análisis de crecimiento de ${restaurantName} en Sazon Digital y me interesa mejorar la presencia digital de mi restaurante.\n\n¿Podemos hablar?`
    : `Hola,\n\nMe interesa mejorar la presencia digital de mi restaurante a través de Sazon Digital.\n\n¿Podemos hablar?`;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-slate-400 text-sm text-center mb-1">
        Contáctenos por el medio que prefiera — respondemos en menos de 5 minutos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">

        {/* WhatsApp */}
        <a
          href={`https://wa.me/16178628607?text=${encodeURIComponent(msg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-green-900/20 text-sm"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.532 5.856L.057 23.786a.5.5 0 00.638.592l6.094-1.597A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.52-5.21-1.43l-.374-.22-3.876 1.016 1.035-3.77-.242-.387A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          WhatsApp
        </a>

        {/* SMS */}
        <a
          href={`sms:+16178628607&body=${encodeURIComponent(msg)}`}
          className="flex items-center justify-center gap-2.5 bg-[#0F1C2E] hover:bg-[#1a2d47] text-white font-semibold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] border border-white/10 text-sm"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
          </svg>
          Texto / SMS
        </a>

        {/* Email */}
        <a
          href={`mailto:marcosazondigital@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
          className="flex items-center justify-center gap-2.5 bg-[#0F1C2E] hover:bg-[#1a2d47] text-white font-semibold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] border border-white/10 text-sm"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
          </svg>
          Email
        </a>

      </div>

      <p className="text-slate-600 text-xs text-center mt-1">
        Sin compromiso. Le respondemos en menos de 5 minutos.
      </p>
    </div>
  );
}
