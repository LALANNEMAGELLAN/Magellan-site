'use client';

import Hero from "../components/Hero";
import BetaSignup from "../components/BetaSignup";
import SectionObserver from "../components/SectionObserver";
import BackgroundImage from "../components/BackgroundImage";
import TravelRouteBackground from "../components/TravelRouteBackground";
import ExploreSection from "../components/ExploreSection";
import WhyMagellanSection from "../components/WhyMagellanSection";
import ShareSection from "../components/ShareSection";
import RememberSection from "../components/RememberSection";

export default function HomePage() {
  return (
    <>
      <BackgroundImage />
      <SectionObserver />
      <Hero />
      {/* Section Explore refondue avec animation d'itinéraire dynamique */}
      <ExploreSection />
      {/* Section Share refondue avec animation d'itinéraire dynamique */}
      <ShareSection />
      {/* Section Remember refondue avec animation d'itinéraire dynamique */}
      <RememberSection />
      {/* Section Pourquoi Magellan */}
      <WhyMagellanSection />
      {/* Animation d'arrière-plan avec carte et itinéraire animé */}
      {/* S'affiche après le hero et s'anime au scroll */}
      <TravelRouteBackground />
      {/* Wrapper invisible pour que l'animation suive toutes les sections */}
      <div id="scroll-container" className="relative">
        <BetaSignup />
      </div>
    </>
  );
}
