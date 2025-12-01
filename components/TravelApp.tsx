/**
 * TravelApp - Application mobile de gestion de voyages
 * Support multilingue : Français, English, Español
 * Mockup iPhone avec liste de voyages, recherche, onglets et navigation
 */

'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Search, Clock, MoreHorizontal, Camera, MessageSquare, 
  MapPin, User, Shuffle, BookImage, Wand2, Plus, RotateCw, 
  ArrowDownCircle, Wrench 
} from "lucide-react";

type Language = 'fr' | 'en' | 'es';

interface Translation {
  title: string;
  searchPlaceholder: string;
  tabs: {
    all: string;
    shared: string;
    albums: string;
    inProgress: string;
    archived: string;
  };
  status: {
    completed: string;
    inProgress: string;
  };
  photos: string;
  days: string;
  bottomNav: {
    albums: string;
    discussions: string;
    magellan: string;
    account: string;
  };
  trips: Array<{
    title: string;
    location: string;
    dateRange: string;
    duration: string;
  }>;
}

const translations: Record<Language, Translation> = {
  fr: {
    title: "Mes voyages",
    searchPlaceholder: "Rechercher un voyage...",
    tabs: {
      all: "Tous",
      shared: "Partagés",
      albums: "Mes Albums",
      inProgress: "En cours",
      archived: "Archivés"
    },
    status: {
      completed: "Terminé",
      inProgress: "En cours"
    },
    photos: "photos",
    days: "jours",
    bottomNav: {
      albums: "Albums",
      discussions: "Discussions",
      magellan: "Dis Magellan",
      account: "Compte"
    },
    trips: [
      {
        title: "Road trip Hongrie",
        location: "Hongrie",
        dateRange: "28 juil. 2025 - 10 août 2025",
        duration: "13 jours"
      },
      {
        title: "Road trip Israel",
        location: "Jerusalem Distr",
        dateRange: "15 mars 2025 - 22 mars 2025",
        duration: "7 jours"
      }
    ]
  },
  en: {
    title: "My Trips",
    searchPlaceholder: "Search for a trip...",
    tabs: {
      all: "All",
      shared: "Shared",
      albums: "My Albums",
      inProgress: "In Progress",
      archived: "Archived"
    },
    status: {
      completed: "Completed",
      inProgress: "In Progress"
    },
    photos: "photos",
    days: "days",
    bottomNav: {
      albums: "Albums",
      discussions: "Discussions",
      magellan: "Ask Magellan",
      account: "Account"
    },
    trips: [
      {
        title: "Road trip in Hungary",
        location: "Hungary",
        dateRange: "Jul 28, 2025 - Aug 10, 2025",
        duration: "13 days"
      },
      {
        title: "Road trip in Israel",
        location: "Jerusalem District",
        dateRange: "Jun 15, 2025 - Jun 25, 2025",
        duration: "10 days"
      }
    ]
  },
  es: {
    title: "Mis Viajes",
    searchPlaceholder: "Buscar un viaje...",
    tabs: {
      all: "Todos",
      shared: "Compartidos",
      albums: "Mis Álbumes",
      inProgress: "En curso",
      archived: "Archivados"
    },
    status: {
      completed: "Finalizado",
      inProgress: "En curso"
    },
    photos: "fotos",
    days: "días",
    bottomNav: {
      albums: "Álbumes",
      discussions: "Discusiones",
      magellan: "Pregunta Magellan",
      account: "Cuenta"
    },
    trips: [
      {
        title: "Road trip en Hungría",
        location: "Hungría",
        dateRange: "28 jul. 2025 - 10 ago. 2025",
        duration: "13 días"
      },
      {
        title: "Road trip en Israel",
        location: "Distrito de Jerusalén",
        dateRange: "15 jun. 2025 - 25 jun. 2025",
        duration: "10 días"
      }
    ]
  }
};

interface TravelAppProps {
  language?: Language;
  showLanguageSelector?: boolean;
}

export function TravelApp({ language = 'fr', showLanguageSelector = false }: TravelAppProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'shared' | 'albums' | 'inProgress' | 'archived'>('albums');
  const t = translations[language];

  // Images avec fallback
  const budapestImage = "https://images.unsplash.com/photo-1544695275-dc75ae5b79d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";
  const jerusalemImage = "https://images.unsplash.com/photo-1628175810529-8cb4a4d374e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080";

  return (
    <motion.div 
      className="relative w-full max-w-sm mx-auto bg-white rounded-[50px] shadow-2xl overflow-hidden border-[14px] border-slate-800"
      style={{ aspectRatio: '9/19.5', maxHeight: '90vh', minHeight: '750px', height: '844px' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-11 bg-white px-6 flex items-center justify-between z-50">
        <span className="text-sm font-semibold">16:24</span>
        <div className="w-[120px] h-[30px] bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-0" />
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-1 h-2 bg-slate-900 rounded-full" />
            <div className="w-1 h-3 bg-slate-900 rounded-full" />
            <div className="w-1 h-4 bg-slate-900 rounded-full" />
            <div className="w-1 h-3 bg-slate-400 rounded-full" />
          </div>
          <span className="text-xs font-semibold ml-1">4G</span>
          <div className="w-6 h-3 border-2 border-slate-900 rounded ml-1 relative">
            <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-1 h-1.5 bg-slate-900 rounded-r" />
            <div className="absolute inset-0.5 bg-slate-900 rounded" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-11 pb-20 h-full overflow-y-auto bg-gray-50" style={{ maxHeight: 'calc(844px - 44px)', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
        {/* Header */}
        <div className="bg-white px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <Wrench className="w-6 h-6 text-slate-700" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
              <RotateCw className="w-6 h-6 text-slate-700" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-slate-900 font-bold text-2xl">{t.title}</h1>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <ArrowDownCircle className="w-5 h-5 text-blue-500" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-slate-700'
              }`}
            >
              {t.tabs.all}
            </button>
            <button
              onClick={() => setActiveTab('shared')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'shared'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-slate-700'
              }`}
            >
              {t.tabs.shared}
            </button>
            <button
              onClick={() => setActiveTab('albums')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'albums'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-slate-700'
              }`}
            >
              {t.tabs.albums}
            </button>
            <button
              onClick={() => setActiveTab('inProgress')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'inProgress'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-slate-700'
              }`}
            >
              {t.tabs.inProgress}
            </button>
          </div>
        </div>

        {/* Trip Cards */}
        <div className="px-4 py-4 space-y-4 pb-8">
          {/* Trip Card 1 - Budapest */}
          <motion.div 
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative h-48 bg-gradient-to-br from-gray-400 to-gray-600 overflow-hidden">
              <img 
                src={budapestImage}
                alt="Budapest" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              <div className="absolute top-3 left-3">
                <span className="inline-block px-2.5 py-1 bg-green-500 text-white text-xs font-semibold rounded-md">
                  {t.status.completed}
                </span>
              </div>
              
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <span className="text-white text-xs font-semibold">397 {t.photos}</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg mb-0.5 drop-shadow-lg">
                    {t.trips[0].title}
                  </h3>
                  <p className="text-white/90 text-sm drop-shadow-lg">{t.trips[0].location}</p>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-7 h-7 rounded-full bg-blue-400 border-2 border-white" />
                </div>
              </div>
            </div>

            <div className="p-3 flex items-center justify-between">
              <div>
                <p className="text-slate-700 text-sm">{t.trips[0].dateRange}</p>
                <p className="text-slate-500 text-xs">{t.trips[0].duration}</p>
              </div>
              <button className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors">
                <MoreHorizontal className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </motion.div>

          {/* Trip Card 2 - Jerusalem */}
          <motion.div 
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative h-48 bg-gradient-to-br from-amber-300 to-blue-400 overflow-hidden">
              <img 
                src={jerusalemImage}
                alt="Jerusalem" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              <div className="absolute top-3 left-3">
                <span className="inline-block px-2.5 py-1 bg-green-500 text-white text-xs font-semibold rounded-md">
                  {t.status.completed}
                </span>
              </div>
              
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <span className="text-white text-xs font-semibold">189 {t.photos}</span>
              </div>

              <div className="absolute bottom-3 left-3 max-w-[40%]">
                <h3 className="text-white font-bold text-base mb-0.5 drop-shadow-lg leading-tight">
                  {t.trips[1].title}
                </h3>
                <p className="text-white/90 text-xs drop-shadow-lg">{t.trips[1].location}</p>
              </div>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5 text-blue-500 stroke-[2.5]" />
                </button>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <Camera className="w-5 h-5 text-green-500 stroke-[1.5]" />
                </button>
              </div>

              <div className="absolute bottom-3 right-3">
                <div className="w-7 h-7 rounded-full bg-pink-400 border-2 border-white" />
              </div>
            </div>

            <div className="p-3 flex items-center justify-between">
              <div>
                <p className="text-slate-700 text-sm">{t.trips[1].dateRange}</p>
                <p className="text-slate-500 text-xs">{t.trips[1].duration}</p>
              </div>
              <button className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors">
                <MoreHorizontal className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-black/10 rounded-b-[50px]">
        <div className="flex items-center justify-around px-4 pt-1 pb-6">
          <button className="flex flex-col items-center gap-0.5 min-w-[60px] text-blue-500 transition-all">
            <BookImage className="w-[26px] h-[26px] stroke-[2]" />
            <span className="text-[11px] mt-0.5">{t.bottomNav.albums}</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 min-w-[60px] text-gray-500 hover:text-gray-700 transition-all">
            <MessageSquare className="w-[26px] h-[26px] stroke-[2]" />
            <span className="text-[11px] mt-0.5">{t.bottomNav.discussions}</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 min-w-[60px] text-gray-500 hover:text-gray-700 transition-all">
            <Wand2 className="w-[26px] h-[26px] stroke-[2]" />
            <span className="text-[11px] mt-0.5">{t.bottomNav.magellan}</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 min-w-[60px] text-gray-500 hover:text-gray-700 transition-all">
            <User className="w-[26px] h-[26px] stroke-[2]" />
            <span className="text-[11px] mt-0.5">{t.bottomNav.account}</span>
          </button>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-36 h-[5px] bg-black rounded-full" />
    </motion.div>
  );
}
