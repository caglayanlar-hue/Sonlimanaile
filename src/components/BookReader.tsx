import React, { useState } from 'react';
import { BookOpen, Sparkles, Heart, MessageCircle, Bookmark, ArrowRight, UserCheck, Flame } from 'lucide-react';
import { STORIES, BOOK_METADATA } from '../data/bookData';
import { Story } from '../types';

interface BookReaderProps {
  onStartDiscussion: () => void;
  onOpenMeeting: () => void;
}

export const BookReader: React.FC<BookReaderProps> = ({ onStartDiscussion, onOpenMeeting }) => {
  const [selectedStory, setSelectedStory] = useState<Story>(STORIES[0]);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [readStories, setReadStories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aile_read_stories');
      return saved ? JSON.parse(saved) : ['mirasin-gercek-sahibi'];
    } catch {
      return ['mirasin-gercek-sahibi'];
    }
  });

  const toggleReadStory = (id: string) => {
    const updated = readStories.includes(id)
      ? readStories.filter((s) => s !== id)
      : [...readStories, id];
    setReadStories(updated);
    try {
      localStorage.setItem('aile_read_stories', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const fontSizeClass = {
    normal: 'text-base leading-relaxed',
    large: 'text-lg leading-loose',
    xlarge: 'text-xl leading-loose font-serif'
  }[fontSize];

  // Unique list of student authors
  const uniqueAuthors = Array.from(new Set(STORIES.map((s) => s.author)));

  return (
    <div className="space-y-10">
      {/* Opening Typographic Hero Banner (NO IMAGES, pure warm typography as requested) */}
      <section className="bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-amber-300/40 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/60 text-amber-200 text-xs sm:text-sm font-bold uppercase tracking-wider border border-amber-300/40">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Öğrenci Yazarlarımızın Yüreğinden
          </div>

          {/* User specifically requested: "Bilsem Öğrencilerinin Kaleminden Aile Dediğin yazısı olsun sadece. görsel olmasın." */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-amber-50 drop-shadow-md">
            {BOOK_METADATA.mainHeading}
          </h1>

          <p className="text-amber-100 text-base sm:text-lg font-serif italic max-w-2xl mx-auto">
            "Biz olma" ruhunu, Anadolu sıcaklığını ve unutulmaz anıları kelime kelime işleyen öyküler
          </p>

          {/* Inspirational Quote Box */}
          <div className="bg-amber-950/70 p-5 rounded-2xl border border-amber-400/40 max-w-3xl mx-auto mt-6 shadow-inner">
            <p className="font-serif text-lg sm:text-xl italic text-amber-100 leading-relaxed">
              &ldquo;Aile, insanın ruhunu ısıtan en eski ocaktır. Bir çocuğun masumiyeti ve bir gencin heyecanıyla harmanlanan bu emek, dijital dünyanın soğukluğuna karşı verilmiş en samimi cevaptır.&rdquo;
            </p>
          </div>

          {/* Action Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={onStartDiscussion}
              className="py-3 px-6 bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-200 hover:to-yellow-300 text-stone-950 font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 text-stone-950" />
              Kitap Hakkında Sohbet Konularına Geç
            </button>
            <button
              onClick={onOpenMeeting}
              className="py-3 px-6 bg-amber-950/80 hover:bg-amber-950 text-amber-200 text-sm font-bold rounded-xl border border-amber-400/40 flex items-center gap-2 cursor-pointer transition"
            >
              <Heart className="w-4 h-4 text-rose-300 fill-rose-300/40" />
              Haftalık Aile Toplantısı
            </button>
          </div>
        </div>
      </section>

      {/* Author Directory Ribbon */}
      <div className="bg-amber-100/90 border border-amber-300 p-4 rounded-2xl shadow-sm">
        <div className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-orange-600" />
          Kitapta Yer Alan BİLSEM Öğrenci Yazarlarımız ({uniqueAuthors.length} Yazar, {STORIES.length} Öykü):
        </div>
        <div className="flex flex-wrap gap-2">
          {uniqueAuthors.map((author) => (
            <span
              key={author}
              className="bg-white text-stone-800 text-xs font-semibold px-3 py-1.5 rounded-xl border border-amber-300 shadow-2xs"
            >
              ✍️ {author}
            </span>
          ))}
        </div>
      </div>

      {/* Main Interactive Story Reader */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-300 pb-3">
          <div>
            <h2 className="text-2xl font-serif font-black text-amber-950 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-orange-600" />
              Kitaptaki Bütün Öyküler ({STORIES.length})
            </h2>
            <p className="text-xs text-stone-600">
              Okumak istediğiniz öyküye tıklayarak tam metnini okuyabilirsiniz
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-orange-950 bg-amber-200/80 px-3.5 py-1.5 rounded-full border border-amber-300">
            <Bookmark className="w-3.5 h-3.5 text-orange-700" />
            <span>Okunan: {readStories.length} / {STORIES.length} Öykü</span>
          </div>
        </div>

        {/* Story Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {STORIES.map((story) => {
            const isSelected = selectedStory.id === story.id;
            const isRead = readStories.includes(story.id);

            return (
              <button
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-700 to-orange-700 text-white border-orange-500 shadow-md scale-102 font-medium'
                    : 'bg-white text-stone-800 border-amber-200 hover:border-orange-400 hover:bg-orange-50/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-orange-950 text-amber-200'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {story.category}
                  </span>
                  {isRead && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <UserCheck className="w-3.5 h-3.5" />
                      Okundu
                    </span>
                  )}
                </div>

                <h3 className={`font-serif font-bold text-base leading-snug line-clamp-1 ${isSelected ? 'text-amber-100' : 'text-stone-900'}`}>
                  {story.title}
                </h3>
                <p className={`text-xs mt-1 ${isSelected ? 'text-amber-200/90' : 'text-stone-600'}`}>
                  Yazan: <strong className={isSelected ? 'text-white' : 'text-amber-950'}>{story.author}</strong>
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Story Full Reader Container (NO GRAPHICS / NO DRAWINGS as requested) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-xl space-y-8">
          {/* Header of Active Story */}
          <div className="border-b border-amber-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold text-orange-900 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
                  {selectedStory.category}
                </span>
                <span className="text-xs text-stone-400">•</span>
                <span className="text-xs text-stone-600">
                  Yazar: <strong className="text-amber-950 text-sm">{selectedStory.author}</strong>
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-amber-950">
                {selectedStory.title}
              </h2>
            </div>

            {/* Font Size & Mark as Read */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-300 text-xs">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${fontSize === 'normal' ? 'bg-white shadow text-stone-900' : 'text-stone-500'}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${fontSize === 'large' ? 'bg-white shadow text-stone-900' : 'text-stone-500'}`}
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${fontSize === 'xlarge' ? 'bg-white shadow text-stone-900' : 'text-stone-500'}`}
                >
                  A++
                </button>
              </div>

              <button
                onClick={() => toggleReadStory(selectedStory.id)}
                className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                  readStories.includes(selectedStory.id)
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                {readStories.includes(selectedStory.id) ? 'Ailecek Okundu ✓' : 'Okundu Olarak İşaretle'}
              </button>
            </div>
          </div>

          {/* Key Quote Box */}
          <div className="bg-amber-50 border-l-4 border-orange-600 p-5 rounded-r-2xl shadow-xs">
            <p className="font-serif italic text-amber-950 text-base sm:text-lg leading-relaxed">
              &ldquo;{selectedStory.keyQuote}&rdquo;
            </p>
          </div>

          {/* Story Text (Clean readable layout without image distractions) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className={`lg:col-span-8 text-stone-900 space-y-6 font-serif ${fontSizeClass}`}>
              {selectedStory.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {index === 0 ? (
                    <span className="float-left text-4xl sm:text-5xl font-serif font-black text-orange-700 pr-2 pt-1 leading-none">
                      {paragraph.charAt(0)}
                    </span>
                  ) : null}
                  {index === 0 ? paragraph.slice(1) : paragraph}
                </p>
              ))}
            </div>

            {/* Side Card: Summary & Family Chat Prompt */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                  Öykünün Özü & Mesajı
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">
                  {selectedStory.summary}
                </p>
              </div>

              <div className="bg-orange-100/70 p-5 rounded-2xl border border-orange-300 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-950 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-orange-700" />
                  Ailecek Konuşalım
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-orange-950 leading-relaxed italic">
                  "{selectedStory.familyDiscussionPrompt}"
                </p>
              </div>

              <button
                onClick={onStartDiscussion}
                className="w-full py-3 px-4 bg-orange-700 hover:bg-orange-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow cursor-pointer transition"
              >
                <span>Bu Öyküyle İlgili Sohbete Katıl</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Reader Footer */}
          <div className="border-t border-amber-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-500">
              Yazar: <strong className="text-amber-950">{selectedStory.author}</strong> — "Bilsem Öğrencilerinin Kaleminden Aile Dediğin"
            </div>

            <button
              onClick={onStartDiscussion}
              className="py-2.5 px-5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow cursor-pointer transition"
            >
              <span>"Aile Dediğin" Kitabı Hakkında Sohbet'e Geç</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
