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
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const navItems = [
    { id: 'stories', label: 'Kitap & Öyküler', icon: BookOpen },
    { id: 'discussion', label: 'Kitap Hakkında Sohbet', icon: MessageSquare },
    { id: 'weekly', label: '7 Günlük Etkinlik', icon: Calendar },
    { id: 'games', label: 'Her Güne Oyun', icon: Sparkles },
    { id: 'meeting', label: 'Aile Toplantısı & Word', icon: Coffee },
    { id: 'messages', label: 'Sevgi Panosu', icon: MessageSquareHeart },
    { id: 'responsibilities', label: 'Aile İçi Sorumluluklarım', icon: CheckSquare }
  ];

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-stone-100 backdrop-blur-md border-b-2 border-orange-500/50 shadow-xl transition-all">
      {/* Top Banner: Date, Time & Inspirational Family Quote */}
      <div className="bg-gradient-to-r from-orange-950 via-amber-900 to-orange-950 text-amber-200 text-xs px-4 py-2 border-b border-orange-700/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          {/* Live Date & Time */}
          <div className="flex items-center gap-4 text-stone-100 font-medium">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{formattedDate}</span>
            </span>
            <span className="text-orange-400/50">|</span>
            <span className="flex items-center gap-1.5 text-amber-100 font-mono tracking-wider bg-black/40 px-2.5 py-0.5 rounded-md border border-amber-600/40 shadow-inner">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{formattedTime}</span>
            </span>
          </div>

          {/* Cycling Heartfelt Quote from "Aile Dediğin" */}
          <div className="flex items-center gap-2 text-amber-100 text-xs italic overflow-hidden">
            <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0 fill-rose-400 animate-pulse" />
            <span className="transition-all duration-700 font-serif font-medium">
              &ldquo;{BOOK_METADATA.coreQuotes[quoteIndex]}&rdquo;
            </span>
          </div>

          {/* Family member quick setup button */}
          <button
            onClick={onOpenFamilyModal}
            className="flex items-center gap-1.5 text-xs text-amber-200 hover:text-white bg-orange-900/60 hover:bg-orange-800/80 px-3 py-1 rounded-lg border border-amber-400/50 transition cursor-pointer font-semibold shadow-xs"
          >
            <Users className="w-3.5 h-3.5 text-amber-300" />
            <span>Aile Üyeleri ({familyMembers.length})</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div
          onClick={() => setActiveTab('stories')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-300 flex items-center justify-center text-stone-950 font-serif font-black text-2xl shadow-lg shadow-orange-950/50 group-hover:scale-105 transition transform">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-lg sm:text-xl tracking-wide text-amber-100">
                AİLE DEDİĞİN
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-600/40 text-amber-300 font-bold border border-orange-400/50">
                BİLSEM
              </span>
            </div>
            <p className="text-[11px] text-amber-200/80 font-medium">
              Bilsem Öğrencilerinin Kaleminden Aile Dediğin
            </p>
          </div>
        </div>

        {/* Navigation Tabs with Vibrant Active State */}
        <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-stone-950 shadow-lg shadow-orange-950/40 scale-102'
                    : 'text-amber-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-amber-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
