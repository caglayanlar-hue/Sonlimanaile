import React, { useState } from 'react';
import { Header } from './components/Header';
import { FamilyBanner } from './components/FamilyBanner';
import { BookReader } from './components/BookReader';
import { BookDiscussion } from './components/BookDiscussion';
import { WeeklySchedule } from './components/WeeklySchedule';
import { DailyGameCard } from './components/DailyGameCard';
import { FamilyMeeting } from './components/FamilyMeeting';
import { MessageBoard } from './components/MessageBoard';
import { ResponsibilitiesBoard } from './components/ResponsibilitiesBoard';
import { FamilySetupModal } from './components/FamilySetupModal';
import { FamilyMember } from './types';
import { Heart, Sparkles, BookOpen } from 'lucide-react';

// Clean initial family members (no pre-filled old names, users enter their real names!)
const INITIAL_FAMILY: FamilyMember[] = [
  {
    id: 'f1',
    name: 'Anne',
    role: 'anne',
    roleLabel: 'Anne',
    avatarColor: 'from-rose-500 to-pink-600',
    favoriteDrink: 'Tavşan Kanı Demli Çay'
  },
  {
    id: 'f2',
    name: 'Baba',
    role: 'baba',
    roleLabel: 'Baba',
    avatarColor: 'from-blue-600 to-indigo-700',
    favoriteDrink: 'Karanfilli Sıcak Çay'
  },
  {
    id: 'f3',
    name: '1. Çocuk',
    role: 'buyuk_cocuk',
    roleLabel: 'Çocuk',
    avatarColor: 'from-amber-500 to-orange-600',
    favoriteDrink: 'Sıcak Ihlamur & Kurabiye'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('stories');
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
    try {
      const saved = localStorage.getItem('aile_members_data_v2');
      return saved ? JSON.parse(saved) : INITIAL_FAMILY;
    } catch {
      return INITIAL_FAMILY;
    }
  });

  const handleSaveFamily = (members: FamilyMember[]) => {
    setFamilyMembers(members);
    try {
      localStorage.setItem('aile_members_data_v2', JSON.stringify(members));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/70 text-stone-900 selection:bg-orange-200">
      {/* Top Header with live clock, quote & navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        familyMembers={familyMembers}
        onOpenFamilyModal={() => setIsFamilyModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Family Member Names Banner (Direct write/edit area) */}
        <FamilyBanner
          familyMembers={familyMembers}
          onSaveFamily={handleSaveFamily}
          onOpenModal={() => setIsFamilyModalOpen(true)}
        />

        {/* Tab Views */}
        {activeTab === 'stories' && (
          <BookReader
            onStartDiscussion={() => setActiveTab('discussion')}
            onOpenMeeting={() => setActiveTab('meeting')}
          />
        )}

        {activeTab === 'discussion' && (
          <BookDiscussion
            familyMembers={familyMembers}
            onGoToStories={() => setActiveTab('stories')}
          />
        )}

        {activeTab === 'weekly' && <WeeklySchedule />}

        {activeTab === 'games' && <DailyGameCard />}

        {activeTab === 'meeting' && (
          <FamilyMeeting
            familyMembers={familyMembers}
            onOpenFamilyModal={() => setIsFamilyModalOpen(true)}
          />
        )}

        {activeTab === 'messages' && (
          <MessageBoard familyMembers={familyMembers} />
        )}

        {activeTab === 'responsibilities' && (
          <ResponsibilitiesBoard familyMembers={familyMembers} />
        )}
      </main>

      {/* Footer - Celebrating BİLSEM Student Writers (No teacher/director names) */}
      <footer className="bg-stone-950 text-stone-300 border-t-2 border-orange-600 mt-16 py-10 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-serif font-black text-xl">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span>Bilsem Öğrencilerinin Kaleminden Aile Dediğin</span>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed font-serif max-w-2xl mx-auto italic">
            "Aile, insanın ruhunu ısıtan en eski ocaktır. Bir çocuğun masumiyeti ve bir gencin heyecanıyla harmanlanan bu öyküler, dijital dünyanın soğukluğuna karşı verilmiş en samimi cevaptır."
          </p>

          <div className="border-t border-stone-800 pt-4 text-xs text-amber-200/90 font-medium">
            <strong className="text-amber-400">BİLSEM Öğrenci Yazarlarımız:</strong><br />
            Ertuğrul ERDEM • Sahra KARAKAYA • Eslim Deniz UŞAR • Fatih Mehmet DEMİRTAŞ • Eslem Beyza EKMEN • Zehra AY • Büşra ERYİĞİT • Cihangir Kenan YILDIRIM • Yusuf ÜNAL • Zeynep Nevra AY
          </div>
        </div>
      </footer>

      {/* Family Profile Setup Modal */}
      <FamilySetupModal
        isOpen={isFamilyModalOpen}
        onClose={() => setIsFamilyModalOpen(false)}
        familyMembers={familyMembers}
        onSaveFamily={handleSaveFamily}
      />
    </div>
  );
}
