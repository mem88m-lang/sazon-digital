'use client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  value: string; // e.g. "+35%", "$5,400", "2×", "+28%"
  label: string;
  delay?: number;
}

function parse(value: string): { prefix: string; number: number; suffix: string } {
  // patterns: "+35%", "$5,400", "2×", "+28%", "$1500"
  const match = value.match(/^([+$]?)(\d[\d,]*)([%×xX]?)$/);
  if (!match) return { prefix: '', number: 0, suffix: value };
  const prefix = match[1];
  const num = parseInt(match[2].replace(/,/g, ''), 10);
  const suffix = match[3];
  return { prefix, number: num, suffix };
}

function format(prefix: string, current: number, suffix: string): string {
  if (prefix === '$') return `$${current.toLocaleString()}`;
  return `${prefix}${current}${suffix}`;
}

export default function AnimatedStat({ value, label, delay = 0 }: Props) {
  const { prefix, number, suffix } = parse(value);
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => {
            const duration = 1400;
            const startTime = performance.now();
            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              setCurrent(Math.round(eased * number));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [number, delay]);

  const display = format(prefix, current, suffix);

  return (
    <div ref={ref} className="bg-white/5 rounded-xl p-5 border border-white/8">
      <div className="text-2xl font-bold text-[#C9A84C] mb-1.5 tracking-tight tabular-nums">
        {display}
      </div>
      <div className="text-slate-500 text-xs leading-relaxed">{label}</div>
    </div>
  );
}
