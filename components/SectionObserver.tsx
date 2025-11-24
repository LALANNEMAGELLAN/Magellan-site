'use client';

import { useEffect } from 'react';

export default function SectionObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-80px 0px -80px 0px',
      }
    );

    // Observer toutes les sections avec la classe section-enter
    const sections = document.querySelectorAll('section.section-enter');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return null;
}



