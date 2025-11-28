'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import MobileMenu from './MobileMenu';

type MobileMenuContextType = {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error('useMobileMenu must be used within MobileMenuProvider');
  }
  return context;
}

export default function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileMenuContext.Provider
      value={{
        isOpen,
        openMenu: () => setIsOpen(true),
        closeMenu: () => setIsOpen(false),
        toggleMenu: () => setIsOpen((prev) => !prev),
      }}
    >
      {children}
      {/* Menu rendu au niveau racine pour éviter les problèmes de z-index */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </MobileMenuContext.Provider>
  );
}











