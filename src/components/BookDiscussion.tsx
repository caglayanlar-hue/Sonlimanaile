import React, { useState } from 'react';
import { MessageSquare, Heart, Sparkles, Dices, CheckCircle2, Users, ArrowRight, BookOpen, Coffee, Flame } from 'lucide-react';
import { STORY_DISCUSSIONS } from '../data/discussionData';
import { StoryDiscussionTopic, FamilyMember } from '../types';

interface BookDiscussionProps {
  familyMembers: FamilyMember[];
  onGoToStories: () => void;
}

export const BookDiscussion: React.FC<BookDiscussionProps> = ({ familyMembers, onGoToStories }) => {
  const [selectedTopic, setSelectedTopic] = useState<StoryDiscussionTopic>(STORY_DISCUSSIONS[0]);
  const [discussedTopics, setDiscussedTopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aile_discussed_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleDiscussed = (id: string) => {
    const updated = discussedTopics.includes(id)
      ? discussedTopics.filter((t) => t !== id)
      : [...discussedTopics, id];
    setDiscussedTopics(updated);
    try {
      localStorage.setItem('aile_discussed_topics', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRandomTopic = () => {
    const randomIdx = Math.floor(Math.random() * STORY_DISCUSSIONS.length);
    setSelectedTopic(STORY_DISCUSSIONS[randomIdx]);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner - Warm & Vibrant Colors */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-400/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-900/60 text-amber-200 text-xs font-bold border border-amber-300/40">
              <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
              "Aile Dediğin" Kitabı Hakkında Sohbet
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-amber-50">
              Hikâyelerle Kalpten Kalbe Sohbet
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl leading-relaxed">
              Öğrencilerimizin kaleme aldığı hikâyelerin derinliklerine iniyor, çayımızı yudumlarken birbirimize sorular soruyor ve aile bağlarımızı perçinliyoruz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleRandomTopic}
              className="py-3 px-5 bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-200 hover:to-yellow-300 text-stone-950 font-bold text-xs sm:text-sm rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
            >
              <Dices className="w-4 h-4 text-stone-950" />
              Rastgele Bir Sohbet Konusu Seç!
            </button>
            <button
              onClick={onGoToStories}
              className="py-3 px-4 bg-orange-950/70 hover:bg-orange-950 text-amber-200 text-xs sm:text-sm font-semibold rounded-2xl border border-amber-400/40 flex items-center gap-1.5 cursor-pointer transition"
            >
              <BookOpen className="w-4 h-4" />
              Hikâyeyi Oku
            </button>
          </div>
        </div>
      </div>

      {/* Story Topic Selector Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {STORY_DISCUSSIONS.map((topic) => {
          const isSelected = selectedTopic.id === topic.id;
          const isDone = discussedTopics.includes(topic.id);

          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-amber-700 to-orange-700 text-white border-orange-500 shadow-md scale-102 font-medium'
                  : 'bg-white text-stone-800 border-amber-200/90 hover:border-orange-400 hover:bg-orange-50/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  isSelected ? 'bg-orange-900 text-amber-200' : 'bg-amber-100 text-amber-900'
                }`}>
                  {topic.mainTheme.split('&')[0]}
                </span>
                {isDone && (
                  <span className="text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
                    Konuşuldu ✓
                  </span>
                )}
              </div>
              <h4 className={`font-serif font-bold text-sm sm:text-base line-clamp-1 ${isSelected ? 'text-amber-100' : 'text-stone-900'}`}>
                {topic.storyTitle}
              </h4>
              <p className={`text-xs mt-1 ${isSelected ? 'text-amber-200/90' : 'text-stone-500'}`}>
                Yazar: <strong>{topic.author}</strong>
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Discussion Detail Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-300 shadow-xl space-y-8 animate-fadeIn">
        {/* Header of Active Topic */}
        <div className="border-b border-amber-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-orange-950 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
                {selectedTopic.mainTheme}
              </span>
              <span className="text-xs text-stone-500">
                Hikâye: <strong className="text-stone-800">{selectedTopic.storyTitle}</strong> ({selectedTopic.author})
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-amber-950">
              {selectedTopic.coreQuestion}
            </h3>
          </div>

          <button
            onClick={() => toggleDiscussed(selectedTopic.id)}
            className={`py-2.5 px-5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition cursor-pointer border ${
              discussedTopics.includes(selectedTopic.id)
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {discussedTopics.includes(selectedTopic.id)
              ? 'Ailecek Konuştuk ✓'
              : 'Konuştuk Olarak İşaretle'}
          </button>
        </div>

        {/* 2 Column Questions: Parents vs Children */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Questions for Parents */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 p-6 rounded-2xl border border-amber-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-950 font-serif font-bold text-base">
              <span className="text-2xl">👩‍🦰👨</span>
              <h4>Anne ve Babaya Soru</h4>
            </div>
            <p className="text-sm font-medium text-stone-800 leading-relaxed italic bg-white/80 p-4 rounded-xl border border-amber-200/70">
              &ldquo;{selectedTopic.questionsForParents}&rdquo;
            </p>
            <p className="text-xs text-stone-500">
              Anne ve baba sırayla kendi çocukluklarından veya hayat tecrübelerinden örnek vererek cevaplasın.
            </p>
          </div>

          {/* Questions for Children */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-100/60 p-6 rounded-2xl border border-orange-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-orange-950 font-serif font-bold text-base">
              <span className="text-2xl">👧👦</span>
              <h4>Çocuklara Soru</h4>
            </div>
            <p className="text-sm font-medium text-stone-800 leading-relaxed italic bg-white/80 p-4 rounded-xl border border-orange-200/70">
              &ldquo;{selectedTopic.questionsForChildren}&rdquo;
            </p>
            <p className="text-xs text-stone-500">
              Çocuklar içlerinden geldiği gibi, hiçbir sansür olmadan samimiyetle kalplerini açsın.
            </p>
          </div>
        </div>

        {/* Family Reflection & Instant Action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Reflection */}
          <div className="lg:col-span-7 bg-amber-900/10 p-6 rounded-2xl border border-amber-300 space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
              Kitaptaki Aile Dersi & Tefekkür
            </h5>
            <p className="text-sm text-amber-950 font-serif leading-relaxed">
              {selectedTopic.familyReflection}
            </p>
          </div>

          {/* Instant Action Prompt */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-600 to-orange-600 text-white p-6 rounded-2xl shadow-md space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-200 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-300" />
              Bu Akşamın Sevgi Eylemi
            </h5>
            <p className="text-xs sm:text-sm font-semibold leading-relaxed text-amber-50">
              {selectedTopic.actionPrompt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
