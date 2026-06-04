'use client';
import { useEffect, useRef, useState } from 'react';

export default function AnimatedBar({
  value,
  color,
  height = 8,
  delay = 100,
}: {
  value: number;
  color: string;
  height?: number;
  delay?: number;
}) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth(value), delay);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div ref={ref} className="w-full bg-slate-100 rounded-full" style={{ height: `${height}px` }}>
      <div
        className="rounded-full"
        style={{
          width: `${width}%`,
          height: `${height}px`,
          backgroundColor: color,
          transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: `0 0 6px ${color}60`,
        }}
      />
    </div>
  );
}
