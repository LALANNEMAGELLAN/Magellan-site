'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function SectionTransition({ children, className = '', id }: SectionTransitionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-enter');
            // Dispatch un événement pour notifier le header
            window.dispatchEvent(new CustomEvent('section-enter', { 
              detail: { sectionId: id } 
            }));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-100px 0px -100px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [id]);

  return (
    <section ref={ref} id={id} className={`${className} opacity-0`}>
      {children}
    </section>
  );
}



