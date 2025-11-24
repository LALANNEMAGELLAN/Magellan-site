'use client';

import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import AppPreview from "../components/AppPreview";
import AboutStory from "../components/AboutStory";
import BetaSignup from "../components/BetaSignup";
import SectionObserver from "../components/SectionObserver";
import BackgroundImage from "../components/BackgroundImage";
import TravelRouteBackground from "../components/TravelRouteBackground";

// SECTION VERSION 2 — Film de voyage Magellan (Explore / Share / Remember)
// Pour revenir à la version 1, commenter ou supprimer l'import et l'utilisation ci-dessous
import JourneyShowcase from "../components/JourneyShowcase";

export default function HomePage() {
  return (
    <>
      <BackgroundImage />
      <SectionObserver />
      <Hero />
      {/* Animation d'arrière-plan avec carte et itinéraire animé */}
      {/* S'affiche après le hero et s'anime au scroll */}
      <TravelRouteBackground />
      {/* Wrapper invisible pour que l'animation suive toutes les sections */}
      <div id="scroll-container" className="relative">
        {/* SECTION VERSION 2 — Film de voyage Magellan */}
        {/* Pour revenir à la version 1, commenter ou supprimer la ligne suivante */}
        <JourneyShowcase />
        <Benefits />
        <AppPreview />
        <AboutStory />
        <BetaSignup />
      </div>
    </>
  );
}
