'use client';
import { useEffect, useRef, useState } from 'react';

export default function AnimatedScore({ score, size = 120 }: { score: number; size?: number }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<SVGSVGElement>(null);

  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = score >= 70 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444';
  const label = score >= 70 ? 'Avanzado' : score >= 50 ? 'En Desarrollo' : score >= 30 ? 'Crítico' : 'Urgente';
  const score10 = (score / 10).toFixed(1);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 1400;
        const startTime = performance.now();
        const animate = (now: number) => {
          const elapsed = now - startTime;
          const t = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          start = ease * score;
          setProgress(start);
          if (t < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [score]);

  const offset = circumference - (progress / 100) * circumference;
  const animatedScore10 = ((progress / 10)).toFixed(1);

  return (
    <div className="flex flex-col items-center">
      <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#1e293b" strokeWidth={8} />
        <circle
          cx={size/2} cy={size/2} r={radius} fill="none"
          stroke={color} strokeWidth={8}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: 'stroke-dashoffset 0.05s linear', filter: `drop-shadow(0 0 10px ${color}80)` }}
        />
        {/* Big score number — no "de 10" */}
        <text x={size/2} y={size/2 + size/10} textAnchor="middle" fontSize={size/3.2} fontWeight="900" fill={color}>{animatedScore10}</text>
      </svg>
      <span className="mt-2 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${color}20`, color }}>{label}</span>
    </div>
  );
}
