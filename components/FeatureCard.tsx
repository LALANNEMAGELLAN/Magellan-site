'use client';

import React from 'react';

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
};

/**
 * Composant de carte de fonctionnalité réutilisable
 * Style cohérent avec les cartes de la section Benefits
 */
export default function FeatureCard({ title, description, icon, color = 'bg-brand/10 text-brand' }: FeatureCardProps) {
  return (
    <article
      className="group relative rounded-2xl border border-surface-border bg-surface-card p-6 transition-all duration-300 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10 hover:-translate-y-1"
      role="listitem"
    >
      <div className="space-y-4">
        {/* Icône (optionnelle) */}
        {icon && (
          <div className={`flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl ${color} transition-transform duration-300 group-hover:scale-110`}>
            {icon}
          </div>
        )}

        {/* Contenu */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-text-base">
            {title}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}


