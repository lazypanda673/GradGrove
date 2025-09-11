'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'slideInUp';
  delay?: number;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedElement({ 
  children, 
  animation = 'fadeIn', 
  delay = 0, 
  threshold = 0.1,
  className = '',
  style = {} 
}: AnimatedElementProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  const animationClass = isVisible ? animation : '';
  const delayClass = delay > 0 ? `animate-delay-${delay}` : '';

  return (
    <div
      ref={elementRef}
      className={`${animationClass} ${delayClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}

export default AnimatedElement;
