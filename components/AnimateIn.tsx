'use client';
import { useEffect, useRef, ReactNode, CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'scaleIn';
}

const initialStyles: Record<string, CSSProperties> = {
  fadeInUp:    { opacity: 0, transform: 'translateY(32px)' },
  fadeIn:      { opacity: 0, transform: 'translateY(0)' },
  slideInLeft: { opacity: 0, transform: 'translateX(-24px)' },
  scaleIn:     { opacity: 0, transform: 'scale(0.92)' },
};

export default function AnimateIn({ children, className = '', delay = 0, animation = 'fadeInUp' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1) translateX(0)';
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...initialStyles[animation],
        transition: 'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
