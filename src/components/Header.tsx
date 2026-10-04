import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Heart, BookOpen, Users, Sparkles, MessageSquareHeart, CheckSquare, Coffee, MessageSquare } from 'lucide-react';
import { FamilyMember } from '../types';
import { BOOK_METADATA } from '../data/bookData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  familyMembers: FamilyMember[];
  onOpenFamilyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  familyMembers,
  onOpenFamilyModal
}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % BOOK_METADATA.coreQuotes.length);
    }, 12000);
    return () => clearInterval(quoteInterval);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString('tr-TR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Nav items with clear, parent-friendly UPPERCASE labels
  const navItems = [
    { id: 'stories', label: 'KİTAP & ÖYKÜLER', icon: BookOpen },
    { id: 'discussion', label: 'KİTAP SOHBETİ', icon: MessageSquare },
    { id: 'weekly', label: '7 GÜNLÜK ETKİNLİK', icon: Calendar },
    { id: 'games', label: 'HER GÜNE OYUN', icon: Sparkles },
    { id: 'meeting', label: 'AİLE TOPLANTISI', icon: Coffee },
    { id: 'messages', label: 'SEVGİ PANOSU', icon: MessageSquareHeart },
    { id: 'responsibilities', label: 'AİLE SORUMLULUKLARI', icon: CheckSquare }
  ];

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 text-stone-800 backdrop-blur-md border-b-2 border-orange-200/90 shadow-sm transition-all">
      {/* Top Mini-Banner: Slim & Warm */}
      <div className="bg-amber-100/80 text-stone-700 text-xs px-3 sm:px-5 py-1 border-b border-orange-200/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Live Date & Time */}
          <div className="flex items-center gap-2 text-stone-700 font-medium shrink-0">
            <span className="flex items-center gap-1.5 text-orange-950 font-bold">
              <Calendar className="w-3.5 h-3.5 text-orange-600" />
              <span>{formattedDate}</span>
            </span>
            <span className="text-orange-300">•</span>
            <span className="flex items-center gap-1 text-stone-800 font-mono font-semibold">
              <Clock className="w-3.5 h-3.5 text-orange-600" />
              <span>{formattedTime}</span>
            </span>
          </div>

          {/* Cycling Quote from "Aile Dediğin" */}
          <div className="hidden md:flex items-center gap-2 text-stone-700 text-xs italic truncate max-w-xl mx-2">
            <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0 fill-rose-500" />
            <span className="truncate font-serif font-medium">
              &ldquo;{BOOK_METADATA.coreQuotes[quoteIndex]}&rdquo;
            </span>
          </div>

          {/* Family member quick setup button */}
          <button
            onClick={onOpenFamilyModal}
            className="flex items-center gap-1.5 text-xs text-orange-950 bg-white hover:bg-orange-50 px-3 py-1 rounded-lg border border-orange-300 transition cursor-pointer font-bold shrink-0 shadow-2xs"
          >
            <Users className="w-3.5 h-3.5 text-orange-600" />
            <span>Aile Üyeleri ({familyMembers.length})</span>
          </button>
        </div>
      </div>

      {/* Main Navbar: Big Brand & High-Visibility Prominent Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Sol Üst Marka: "AİLE DEDİĞİN" - Büyük Puntolarla */}
        <div
          onClick={() => setActiveTab('stories')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 flex items-center justify-center text-white font-serif font-black text-2xl shadow-md group-hover:scale-105 transition transform">
            A
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-serif font-black text-2xl sm:text-3xl tracking-wide text-amber-950 leading-none drop-shadow-2xs">
                AİLE DEDİĞİN
              </span>
            </div>
            <p className="text-xs text-orange-950 font-bold tracking-tight mt-1 leading-none">
              Sıcacık Bir Aile Rehberi & Paylaşım Alanı
            </p>
          </div>
        </div>

        {/* Navigation Tabs - Belirgin, Okunaklı ve Net Kelimeler */}
        <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold tracking-normal transition-all cursor-pointer ${
                  isActive
                    ? 'bg-orange-700 text-white shadow-md ring-2 ring-orange-800/40 font-black scale-102'
                    : 'text-stone-900 bg-white/80 hover:bg-orange-100 hover:text-orange-950 border border-orange-200/90 shadow-2xs font-bold'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-orange-700'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
