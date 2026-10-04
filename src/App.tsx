import React, { useState } from 'react';
import { Header } from './components/Header';
import { FamilyBanner } from './components/FamilyBanner';
import { MeetingReminderBanner } from './components/MeetingReminderBanner';
import { BookReader } from './components/BookReader';
import { BookDiscussion } from './components/BookDiscussion';
import { WeeklySchedule } from './components/WeeklySchedule';
import { DailyGameCard } from './components/DailyGameCard';
import { FamilyMeeting } from './components/FamilyMeeting';
import { MessageBoard } from './components/MessageBoard';
import { ResponsibilitiesBoard } from './components/ResponsibilitiesBoard';
import { FamilySetupModal } from './components/FamilySetupModal';
import { FamilyMember } from './types';
import { Heart } from 'lucide-react';

// Sanitize members so generic role words (Anne, Baba, Çocuk) never appear as people's names
const sanitizeMembers = (members: FamilyMember[]): FamilyMember[] => {
  return members.filter((m) => {
    const lower = m.name?.trim().toLowerCase() || '';
    return (
      lower &&
      !['anne', 'baba', 'çocuk', 'cocuk', '1. çocuk', '2. çocuk', '3. çocuk', '4. çocuk'].includes(
        lower
      )
    );
  });
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('stories');
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
    try {
      const saved = localStorage.getItem('aile_members_data_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return sanitizeMembers(parsed);
      }
      return [];
    } catch {
      return [];
    }
  });

  const handleSaveFamily = (members: FamilyMember[]) => {
    const cleaned = sanitizeMembers(members);
    setFamilyMembers(cleaned);
    try {
      localStorage.setItem('aile_members_data_v2', JSON.stringify(cleaned));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/70 text-stone-900 selection:bg-orange-200">
      {/* Top Header with live clock, quote & UPPERCASE navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        familyMembers={familyMembers}
        onOpenFamilyModal={() => setIsFamilyModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Family Member Names Banner - Only actual names displayed */}
        <FamilyBanner
          familyMembers={familyMembers}
          onSaveFamily={handleSaveFamily}
          onOpenModal={() => setIsFamilyModalOpen(true)}
        />

        {/* Meeting Countdown & Browser Notification Reminder Banner */}
        <MeetingReminderBanner onGoToMeeting={() => setActiveTab('meeting')} />

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

      {/* Footer - Sadece Aile Dediğin */}
      <footer className="bg-stone-950 text-stone-300 border-t-2 border-orange-600 mt-16 py-10 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-serif font-black text-xl">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span>AİLE DEDİĞİN</span>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed font-serif max-w-2xl mx-auto italic">
            &ldquo;Aile, insanın ruhunu ısıtan en eski ve en samimi yuvadır. Birbirimize vakit ayırmak, dinlemek ve sevmek yuvamızı güzelleştirir.&rdquo;
          </p>

          <div className="border-t border-stone-800 pt-4 text-xs text-amber-200/90 font-medium">
            <strong className="text-amber-400">Aile Rehberi:</strong> Birlikte okunan öyküler, yapılan sohbetler ve paylaşılan çaylar aile bağlarımızı güçlendirir.
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
