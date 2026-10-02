import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, Sparkles, Coffee, Heart, MessageCircle, ChevronRight, Award } from 'lucide-react';
import { WEEKLY_ACTIVITIES } from '../data/weeklyActivities';
import { WeeklyActivity } from '../types';

export const WeeklySchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('aile_completed_days');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  const toggleDayCompleted = (dayNumber: number) => {
    const updated = completedDays.includes(dayNumber)
      ? completedDays.filter((d) => d !== dayNumber)
      : [...completedDays, dayNumber];
    setCompletedDays(updated);
    try {
      localStorage.setItem('aile_completed_days', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const activeActivity = WEEKLY_ACTIVITIES.find((a) => a.dayNumber === selectedDay) || WEEKLY_ACTIVITIES[0];

  return (
    <div className="space-y-8">
      {/* Header Banner - Warmer & Vibrant */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-400/50 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/60 text-amber-200 text-xs font-bold border border-amber-300/40">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              7 Günlük Aile İletişim Programı
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-amber-50">
              Haftalık Aile Etkinlikleri
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl leading-relaxed">
              Pazartesi dijital detokstan, çarşamba kurabiye pişirmeye, cuma kutu oyunundan, pazar gününün unutulmaz büyük kahvaltısına kadar her güne özel bir bağ kurma ritüeli!
            </p>
          </div>

          {/* Weekly Completion Progress */}
          <div className="bg-orange-950/70 p-4 rounded-2xl border border-amber-300/40 text-center shrink-0 min-w-[180px] shadow-inner">
            <div className="flex items-center justify-center gap-1.5 text-amber-300 text-xs font-bold mb-1">
              <Award className="w-4 h-4" />
              Haftalık İlerleme
            </div>
            <div className="text-2xl font-black font-serif text-white">
              {completedDays.length} / 7 Gün
            </div>
            <div className="w-full bg-orange-900 rounded-full h-2.5 mt-2 overflow-hidden border border-orange-700">
              <div
                className="bg-amber-300 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(completedDays.length / 7) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {WEEKLY_ACTIVITIES.map((act) => {
          const isSelected = selectedDay === act.dayNumber;
          const isDone = completedDays.includes(act.dayNumber);

          return (
            <button
              key={act.dayNumber}
              onClick={() => setSelectedDay(act.dayNumber)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-amber-800 text-white border-amber-900 shadow-md scale-102 font-bold'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100/70'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-amber-300 hover:bg-amber-50/50'
              }`}
            >
              <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                {act.dayName}
              </div>
              <div className="text-xs sm:text-sm font-semibold truncate mt-0.5" title={act.title}>
                {act.dayNumber}. Gün
              </div>

              {/* Status Indicator */}
              <div className="mt-2 flex items-center justify-center">
                {isDone ? (
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Yapıldı
                  </span>
                ) : (
                  <span className={`text-[10px] ${isSelected ? 'text-amber-200' : 'text-stone-400'}`}>
                    {act.duration}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Detail Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-900/15 shadow-xl space-y-8 animate-fadeIn">
        {/* Activity Title & Tag */}
        <div className="border-b border-amber-200/80 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                {activeActivity.dayName} Etkinliği
              </span>
              <span className="text-xs text-stone-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {activeActivity.duration}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {activeActivity.title}
            </h3>
            <p className="text-xs sm:text-sm text-amber-900 font-medium">
              {activeActivity.subtitle}
            </p>
          </div>

          {/* Toggle Done Button */}
          <button
            onClick={() => toggleDayCompleted(activeActivity.dayNumber)}
            className={`py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition cursor-pointer border ${
              completedDays.includes(activeActivity.dayNumber)
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {completedDays.includes(activeActivity.dayNumber)
              ? 'Etkinlik Tamamlandı ✓'
              : 'Görevi Tamamladık Olarak İşaretle'}
          </button>
        </div>

        {/* Book Quote Bridge */}
        <div className="bg-amber-50/80 border-l-4 border-amber-700 p-4 sm:p-5 rounded-r-2xl">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            "Aile Dediğin" Kitabından İlham
          </div>
          <p className="text-stone-800 text-sm sm:text-base font-serif italic">
            &ldquo;{activeActivity.bookQuote}&rdquo;
          </p>
        </div>

        {/* Description & Concrete Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-stone-900 text-base">
                Etkinliğin Amacı & Özeti
              </h4>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {activeActivity.description}
              </p>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-stone-900 text-base">
                Nasıl Uygulayacağız? (Adım Adım)
              </h4>
              <div className="space-y-2.5">
                {activeActivity.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3 text-sm text-stone-800"
                  >
                    <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Prompts: Conversation & Treats */}
          <div className="lg:col-span-4 space-y-4">
            {/* Conversation Starter */}
            <div className="bg-amber-100/70 p-5 rounded-2xl border border-amber-300 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-amber-700" />
                Günün Sohbet Sorusu
              </h4>
              <p className="text-sm font-semibold text-amber-900 leading-snug">
                "{activeActivity.familyChatQuestion}"
              </p>
              <p className="text-xs text-amber-800/80 italic">
                Çay içerken sırayla herkes cevaplasın.
              </p>
            </div>

            {/* Treat Suggestion */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-amber-700" />
                Etkinlik Yanı İkramı
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {activeActivity.treatSuggestion}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
