import React, { useState } from 'react';
import { Smile, Heart, Calendar as CalendarIcon, Sparkles, TrendingUp, Sun, CloudRain, Coffee, Check, Users, MessageSquareHeart, ChevronLeft, ChevronRight } from 'lucide-react';
import { FamilyMember, MoodEntry, MoodType } from '../types';

interface MoodCalendarProps {
  familyMembers: FamilyMember[];
  onSendLoveNote?: (toName: string, message: string) => void;
}

const MOOD_OPTIONS: {
  type: MoodType;
  emoji: string;
  label: string;
  desc: string;
  score: number;
  bgGradient: string;
}[] = [
  {
    type: 'cok_mutlu',
    emoji: '🌟',
    label: 'Çok Mutlu',
    desc: 'Güneş gibi parlıyorum, harika bir gün!',
    score: 100,
    bgGradient: 'from-amber-400 to-yellow-500'
  },
  {
    type: 'neseli',
    emoji: '😊',
    label: 'Neşeli & Enerjik',
    desc: 'Keyfim yerinde, neşem bol!',
    score: 85,
    bgGradient: 'from-orange-400 to-amber-500'
  },
  {
    type: 'sakin',
    emoji: '😌',
    label: 'Sakin & Huzurlu',
    desc: 'Dinginim, yuvamda rahatım.',
    score: 75,
    bgGradient: 'from-teal-400 to-emerald-500'
  },
  {
    type: 'yorgun',
    emoji: '🥱',
    label: 'Yorgun',
    desc: 'Biraz dinlenmeye ve çaya ihtiyacım var.',
    score: 50,
    bgGradient: 'from-blue-400 to-indigo-500'
  },
  {
    type: 'uzgun',
    emoji: '🥺',
    label: 'Üzgün / Düşünceli',
    desc: 'Moralim biraz bozuk, sarılmaya ihtiyacım var.',
    score: 30,
    bgGradient: 'from-purple-400 to-rose-500'
  },
  {
    type: 'stresli',
    emoji: '😤',
    label: 'Gergin / Stresli',
    desc: 'Zor bir gündü, biraz anlayış arıyorum.',
    score: 30,
    bgGradient: 'from-rose-500 to-red-600'
  }
];

export const MoodCalendar: React.FC<MoodCalendarProps> = ({ familyMembers, onSendLoveNote }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    familyMembers[0]?.id || ''
  );
  const [selectedMood, setSelectedMood] = useState<MoodType>('cok_mutlu');
  const [moodNote, setMoodNote] = useState('');
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);
  const [selectedDayDetails, setSelectedDayDetails] = useState<string | null>(todayStr);

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => {
    try {
      const saved = localStorage.getItem('aile_mood_calendar');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }

    // Default sample entries for today so family immediately sees the happiness meter!
    return [
      {
        id: 'mood-sample-1',
        date: todayStr,
        memberId: familyMembers[0]?.id || 'anne',
        memberName: familyMembers[0]?.name || 'Anne',
        memberRole: familyMembers[0]?.roleLabel || 'Anne',
        mood: 'cok_mutlu',
        emoji: '🌟',
        moodLabel: 'Çok Mutlu',
        note: 'Bugün evimiz mis gibi kurabiye kokuyor!',
        score: 100
      },
      {
        id: 'mood-sample-2',
        date: todayStr,
        memberId: familyMembers[1]?.id || 'baba',
        memberName: familyMembers[1]?.name || 'Baba',
        memberRole: familyMembers[1]?.roleLabel || 'Baba',
        mood: 'neseli',
        emoji: '😊',
        moodLabel: 'Neşeli & Enerjik',
        note: 'İşler bitti, akşam çayını sabırsızlıkla bekliyorum.',
        score: 85
      },
      {
        id: 'mood-sample-3',
        date: todayStr,
        memberId: familyMembers[2]?.id || 'cocuk-1',
        memberName: familyMembers[2]?.name || '1. Çocuk',
        memberRole: familyMembers[2]?.roleLabel || 'Çocuk',
        mood: 'sakin',
        emoji: '😌',
        moodLabel: 'Sakin & Huzurlu',
        note: 'Derslerimi bitirdim, biraz kitap okuyacağım.',
        score: 75
      }
    ];
  });

  const saveEntries = (entries: MoodEntry[]) => {
    setMoodEntries(entries);
    try {
      localStorage.setItem('aile_mood_calendar', JSON.stringify(entries));
    } catch (e) {
      console.error(e);
    }
  };

  const activeMember = familyMembers.find((m) => m.id === selectedMemberId) || familyMembers[0];

  const handleSaveMood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMember) return;

    const moodConfig = MOOD_OPTIONS.find((m) => m.type === selectedMood) || MOOD_OPTIONS[0];

    // Remove previous entry for this member on today
    const filtered = moodEntries.filter(
      (entry) => !(entry.date === todayStr && entry.memberId === activeMember.id)
    );

    const newEntry: MoodEntry = {
      id: 'mood-' + Date.now(),
      date: todayStr,
      memberId: activeMember.id,
      memberName: activeMember.name,
      memberRole: activeMember.roleLabel,
      mood: selectedMood,
      emoji: moodConfig.emoji,
      moodLabel: moodConfig.label,
      note: moodNote.trim(),
      score: moodConfig.score
    };

    saveEntries([...filtered, newEntry]);
    setShowSavedFeedback(true);
    setMoodNote('');
    setTimeout(() => setShowSavedFeedback(false), 3000);
  };

  // Calculate today's family happiness level
  const todayEntries = moodEntries.filter((e) => e.date === todayStr);
  const todayAverageScore =
    todayEntries.length > 0
      ? Math.round(
          todayEntries.reduce((sum, item) => sum + item.score, 0) / todayEntries.length
        )
      : 85;

  const getHappinessStatus = (score: number) => {
    if (score >= 85) {
      return {
        label: 'Güneşli & Çok Mutlu ☀️',
        sub: 'Ailemizde bugün bayram havası ve bol kahkaha var!',
        color: 'text-amber-800 bg-amber-100 border-amber-300'
      };
    } else if (score >= 70) {
      return {
        label: 'Huzurlu & Güzel 🌸',
        sub: 'Sofralarımız ve sohbetlerimiz sıcacık geçiyor.',
        color: 'text-emerald-800 bg-emerald-100 border-emerald-300'
      };
    } else if (score >= 50) {
      return {
        label: 'Ilık & Dinlenme İhtiyacı ☕',
        sub: 'Biraz yorgunluk var; akşam sıcacık bir çay veya ıhlamur hepimize iyi gelecek.',
        color: 'text-blue-800 bg-blue-100 border-blue-300'
      };
    } else {
      return {
        label: 'Şefkat & Sarılma Zamanı 🤗',
        sub: 'Ailemizden birinin canı sıkkın; sevgi dolu bir kucaklaşma ve dinleme vakti!',
        color: 'text-rose-800 bg-rose-100 border-rose-300'
      };
    }
  };

  const happinessStatus = getHappinessStatus(todayAverageScore);

  // Calendar generation for current month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Shift Monday to 0 index (0=Pazartesi, 6=Pazar)
  const startingDayIndex = (firstDayOfMonth + 6) % 7;

  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const selectedDateEntries = moodEntries.filter((e) => e.date === selectedDayDetails);

  return (
    <div className="space-y-10">
      {/* Header Banner - Warm & Vibrant */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-400/50 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/60 text-amber-200 text-xs font-bold border border-amber-300/40">
              <Smile className="w-3.5 h-3.5 text-amber-300" />
              Aile Duygu Takvimi & Mutluluk Barometresi
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-amber-50">
              Bugün Nasıl Hissediyoruz?
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl leading-relaxed">
              Her aile üyesi günün emojisini seçerek ruh halini takvime işler. Böylece ailemizin genel mutluluk düzeyini görür, kimin desteğe veya sarılmaya ihtiyacı olduğunu hemen fark ederiz!
            </p>
          </div>

          {/* Today's Family Happiness Meter Gauge */}
          <div className="bg-orange-950/70 p-5 rounded-2xl border border-amber-300/40 text-center shrink-0 min-w-[220px] shadow-inner space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-amber-300 text-xs font-bold">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              Aile Mutluluk Düzeyimiz
            </div>
            <div className="text-3xl sm:text-4xl font-black font-serif text-white">
              %{todayAverageScore}
            </div>
            <div className="w-full bg-orange-900 rounded-full h-3 overflow-hidden border border-orange-700">
              <div
                className="bg-gradient-to-r from-amber-400 to-yellow-300 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${todayAverageScore}%` }}
              />
            </div>
            <div className="text-[11px] font-bold text-amber-200 truncate">
              {happinessStatus.label}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Check-in Form & Happiness Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Daily Check-in Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl space-y-6">
          <div className="border-b border-amber-200 pb-4">
            <h3 className="font-serif font-black text-amber-950 text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              Bugünkü Ruh Halini İşaretle
            </h3>
            <p className="text-xs text-stone-500">
              Kendi ismini seç ve bugün kalbinde hissettiğin duyguyu işaretle
            </p>
          </div>

          {showSavedFeedback && (
            <div className="p-3.5 bg-emerald-100 text-emerald-950 border border-emerald-400 rounded-xl flex items-center gap-2 text-xs font-bold animate-fadeIn shadow-xs">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Ruh halin başarıyla duygu takvimine işlendi! 💖</span>
            </div>
          )}

          <form onSubmit={handleSaveMood} className="space-y-5">
            {/* Family Member Selector */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-2">
                Hangi Aile Üyesi Paylaşıyor?
              </label>
              <div className="flex flex-wrap gap-2">
                {familyMembers.map((m) => {
                  const isSelected = selectedMemberId === m.id;
                  const memberTodayEntry = todayEntries.find((e) => e.memberId === m.id);

                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMemberId(m.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer border-2 ${
                        isSelected
                          ? 'bg-orange-700 text-white border-orange-800 shadow-md scale-102'
                          : 'bg-stone-50 text-stone-700 border-amber-200 hover:border-orange-400'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-tr ${m.avatarColor} text-white text-[10px] flex items-center justify-center font-bold`}
                      >
                        {m.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{m.name} ({m.roleLabel})</span>
                      {memberTodayEntry && (
                        <span className="text-base ml-1" title={memberTodayEntry.moodLabel}>
                          {memberTodayEntry.emoji}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Emoji Mood Options */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-2">
                Bugün Kendini Nasıl Hissediyorsun?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {MOOD_OPTIONS.map((opt) => {
                  const isSelected = selectedMood === opt.type;
                  return (
                    <button
                      key={opt.type}
                      type="button"
                      onClick={() => setSelectedMood(opt.type)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-100/90 border-orange-600 ring-2 ring-orange-400/40 shadow-sm scale-102'
                          : 'bg-stone-50 border-stone-200 hover:border-amber-300 hover:bg-amber-50/50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{opt.emoji}</div>
                      <div className="text-xs font-bold text-stone-900">{opt.label}</div>
                      <div className="text-[10px] text-stone-500 leading-tight mt-0.5">
                        {opt.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Note input */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Günün Cümlesi / Minik Not (İsteğe Bağlı)
              </label>
              <input
                type="text"
                placeholder="Örn: Bugün sınavım çok güzel geçti / biraz yoruldum ama iyiyim..."
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                className="w-full text-xs font-medium rounded-xl border border-amber-300 p-2.5 bg-amber-50/30 text-stone-800 focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-700 hover:bg-orange-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-95"
            >
              <Check className="w-4 h-4" />
              Ruh Halimi Takvime Kaydet
            </button>
          </form>
        </div>

        {/* Right: Today's Family Summary & Empathetic Guidance */}
        <div className="lg:col-span-6 space-y-6">
          {/* Today's Checked-in Family Members List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <h3 className="font-serif font-black text-stone-900 text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                Bugün Ailemizin Hali ({todayEntries.length} Kişi İşaretledi)
              </h3>
              <span className="text-xs font-bold text-orange-900 bg-orange-100 px-2.5 py-1 rounded-full">
                Bugün
              </span>
            </div>

            {todayEntries.length === 0 ? (
              <div className="text-center py-8 bg-amber-50/60 rounded-2xl border border-dashed border-amber-300 p-4">
                <p className="text-xs text-stone-600 font-medium">
                  Henüz kimse bugünkü duygusunu işaretlemedi. Sol taraftan ilk işareti siz koyun!
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {todayEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-200 flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl shrink-0">{entry.emoji}</span>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-stone-900 flex items-center gap-2">
                          <span>{entry.memberName}</span>
                          <span className="text-[10px] font-bold text-orange-950 bg-orange-200/80 px-1.5 py-0.5 rounded">
                            {entry.memberRole}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-orange-900">
                          {entry.moodLabel}
                        </div>
                        {entry.note && (
                          <div className="text-xs text-stone-600 italic mt-0.5">
                            &ldquo;{entry.note}&rdquo;
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Empathetic Action if tired or sad */}
                    {(entry.mood === 'yorgun' || entry.mood === 'uzgun' || entry.mood === 'stresli') && (
                      <button
                        onClick={() => {
                          if (onSendLoveNote) {
                            onSendLoveNote(
                              entry.memberName,
                              `Canım ${entry.memberName}, bugün biraz ${entry.moodLabel.toLowerCase()} olduğunu gördüm. Yanındayım, seni çok seviyorum! Sıcacık bir sarılma benden! ❤️`
                            );
                          } else {
                            alert(`${entry.memberName} için sevgi ve sarılma dileğiniz iletildi! 🤗`);
                          }
                        }}
                        className="py-1.5 px-3 bg-rose-100 hover:bg-rose-200 text-rose-900 border border-rose-300 rounded-xl text-[11px] font-bold flex items-center gap-1 cursor-pointer transition shrink-0"
                        title="Sevgi ve moral desteği gönder"
                      >
                        <Heart className="w-3 h-3 text-rose-600 fill-rose-600" />
                        <span>Sarılma Gönder 🤗</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Empathy Guidance Card */}
          <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-amber-100 p-6 rounded-3xl border-2 border-orange-300 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-amber-950 font-serif font-black text-base">
              <Coffee className="w-5 h-5 text-orange-700" />
              <h4>Aile Mutluluk Barometresi Yorumu</h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
              {happinessStatus.sub}
            </p>
            <div className="text-xs text-orange-900 bg-white/80 p-3 rounded-xl border border-orange-200 font-medium">
              💡 <strong>Aile Rehberi:</strong> Bazen yorulmak veya üzülmek de ailenin doğasında vardır. Önemli olan eve geldiğimizde birbirimizin gözünün içine bakıp <em>"Bugün nasılsın, günün nasıl geçti?"</em> diye sorabilmektir.
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Month Grid View */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
          <div>
            <h3 className="font-serif font-black text-amber-950 text-xl flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-orange-600" />
              Aylık Duygu Takvimi Görünümü
            </h3>
            <p className="text-xs text-stone-500">
              Her günün kutucuğunda aile fertlerinin emojilerini görebilir, geçmiş günlerin detayına bakabilirsiniz
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="p-2 rounded-xl border border-amber-300 hover:bg-amber-100 text-stone-700 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-serif font-black text-sm text-stone-900 px-3">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 rounded-xl border border-amber-300 hover:bg-amber-100 text-stone-700 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-xs font-bold text-orange-950">
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((dayName) => (
            <div key={dayName} className="py-1 bg-amber-100/70 rounded-lg">
              {dayName}
            </div>
          ))}
        </div>

        {/* Calendar Cells */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {/* Empty prefix slots */}
          {Array.from({ length: startingDayIndex }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-20 sm:h-24 bg-stone-50/40 rounded-2xl border border-dashed border-stone-200" />
          ))}

          {/* Month Days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDayDetails;
            const dayEntries = moodEntries.filter((e) => e.date === dateStr);

            return (
              <div
                key={dateStr}
                onClick={() => setSelectedDayDetails(dateStr)}
                className={`h-20 sm:h-24 p-2 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-orange-600 bg-orange-50/80 shadow-md ring-2 ring-orange-400/30'
                    : isToday
                    ? 'border-amber-400 bg-amber-50/80 shadow-xs'
                    : 'border-amber-100 hover:border-amber-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-black ${
                      isToday
                        ? 'w-5 h-5 rounded-full bg-orange-700 text-white flex items-center justify-center'
                        : 'text-stone-700'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {dayEntries.length > 0 && (
                    <span className="text-[10px] text-amber-900 font-bold">
                      {dayEntries.length} 👤
                    </span>
                  )}
                </div>

                {/* Emojis stack */}
                <div className="flex flex-wrap gap-0.5 justify-center items-center my-auto">
                  {dayEntries.map((e) => (
                    <span key={e.id} className="text-sm sm:text-base" title={`${e.memberName}: ${e.moodLabel}`}>
                      {e.emoji}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Day Info Drawer */}
        {selectedDayDetails && (
          <div className="mt-4 p-5 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border border-amber-300 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-black text-sm sm:text-base text-amber-950 flex items-center gap-2">
                <span>📅 {selectedDayDetails} Tarihindeki Duygular</span>
              </h4>
              <span className="text-xs text-stone-500 font-medium">
                {selectedDateEntries.length} kişi işaretlemiş
              </span>
            </div>

            {selectedDateEntries.length === 0 ? (
              <p className="text-xs text-stone-500 italic">
                Bu tarihte kayıtlı bir duygu işareti bulunmamaktadır.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedDateEntries.map((entry) => (
                  <div key={entry.id} className="p-3 bg-white rounded-xl border border-amber-200 shadow-2xs flex items-center gap-3">
                    <span className="text-2xl">{entry.emoji}</span>
                    <div>
                      <div className="text-xs font-bold text-stone-900">
                        {entry.memberName} ({entry.memberRole})
                      </div>
                      <div className="text-[11px] text-orange-900 font-semibold">{entry.moodLabel}</div>
                      {entry.note && (
                        <div className="text-[10px] text-stone-600 italic">"{entry.note}"</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
