import React, { useState } from 'react';
import { Users, Heart, Plus, Check, Edit2, Trash2 } from 'lucide-react';
import { FamilyMember } from '../types';

interface FamilyBannerProps {
  familyMembers: FamilyMember[];
  onSaveFamily: (members: FamilyMember[]) => void;
  onOpenModal: () => void;
}

export const FamilyBanner: React.FC<FamilyBannerProps> = ({
  familyMembers,
  onSaveFamily,
  onOpenModal
}) => {
  const [isEditingInline, setIsEditingInline] = useState(false);

  // Helper getters
  const anneMember = familyMembers.find((m) => m.role === 'anne');
  const babaMember = familyMembers.find((m) => m.role === 'baba');
  const existingChildren = familyMembers.filter((m) => m.role.includes('cocuk'));

  const [anneName, setAnneName] = useState(anneMember?.name || '');
  const [babaName, setBabaName] = useState(babaMember?.name || '');

  // Up to 4 children names on the first page
  const [child1, setChild1] = useState(existingChildren[0]?.name || '');
  const [child2, setChild2] = useState(existingChildren[1]?.name || '');
  const [child3, setChild3] = useState(existingChildren[2]?.name || '');
  const [child4, setChild4] = useState(existingChildren[3]?.name || '');

  const handleQuickSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newMembers: FamilyMember[] = [];

    // Anne
    if (anneName.trim()) {
      newMembers.push({
        id: anneMember?.id || 'anne-' + Date.now(),
        name: anneName.trim(),
        role: 'anne',
        roleLabel: 'Anne',
        avatarColor: 'from-rose-500 to-pink-600',
        favoriteDrink: anneMember?.favoriteDrink || 'Tavşan Kanı Demli Çay'
      });
    }

    // Baba
    if (babaName.trim()) {
      newMembers.push({
        id: babaMember?.id || 'baba-' + Date.now(),
        name: babaName.trim(),
        role: 'baba',
        roleLabel: 'Baba',
        avatarColor: 'from-blue-600 to-indigo-700',
        favoriteDrink: babaMember?.favoriteDrink || 'Karanfilli Sıcak Çay'
      });
    }

    // Up to 4 Children
    const childrenInput = [
      { name: child1, label: '1. Çocuk' },
      { name: child2, label: '2. Çocuk' },
      { name: child3, label: '3. Çocuk' },
      { name: child4, label: '4. Çocuk' }
    ];

    const childColors = [
      'from-amber-500 to-orange-600',
      'from-teal-500 to-emerald-600',
      'from-purple-500 to-indigo-600',
      'from-pink-500 to-rose-600'
    ];

    childrenInput.forEach((ch, idx) => {
      if (ch.name.trim()) {
        newMembers.push({
          id: existingChildren[idx]?.id || `cocuk-${idx + 1}-${Date.now()}`,
          name: ch.name.trim(),
          role: idx === 0 ? 'buyuk_cocuk' : idx === 1 ? 'ortanca_cocuk' : 'kucuk_cocuk',
          roleLabel: ch.label,
          avatarColor: childColors[idx],
          favoriteDrink: existingChildren[idx]?.favoriteDrink || 'Sıcak Ihlamur & Kurabiye'
        });
      }
    });

    if (newMembers.length > 0) {
      onSaveFamily(newMembers);
      setIsEditingInline(false);
    }
  };

  const childrenCount = familyMembers.filter((m) => m.role.includes('cocuk')).length;

  return (
    <div className="mb-6 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 p-5 rounded-3xl border-2 border-orange-300 shadow-md">
      {!isEditingInline ? (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-center sm:text-left">
            <div className="flex -space-x-2 overflow-hidden shrink-0">
              {familyMembers.map((m) => (
                <div
                  key={m.id}
                  className={`inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gradient-to-tr ${m.avatarColor} text-white font-black text-sm flex items-center justify-center shadow-md`}
                  title={`${m.roleLabel}: ${m.name}`}
                >
                  {m.name.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>

            <div>
              <div className="text-sm sm:text-base font-serif font-black text-amber-950 flex items-center justify-center sm:justify-start gap-1.5">
                <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                <span>Hoş Geldiniz, Canım Ailemiz!</span>
                <span className="text-xs bg-orange-200 text-orange-900 px-2 py-0.5 rounded-full font-sans font-bold">
                  {childrenCount} Çocuk Kayıtlı
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                {familyMembers.map((m) => (
                  <span
                    key={m.id}
                    className="inline-flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-xl text-xs font-bold text-stone-900 border border-amber-300 shadow-2xs"
                  >
                    <span className="text-orange-900 font-extrabold">{m.roleLabel}:</span>
                    <span>{m.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsEditingInline(true)}
              className="py-2 px-4 bg-white hover:bg-orange-50 text-orange-950 border border-orange-300 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition"
            >
              <Edit2 className="w-3.5 h-3.5 text-orange-600" />
              İsimleri Düzenle (4 Çocuğa Kadar)
            </button>
            <button
              onClick={onOpenModal}
              className="py-2 px-4 bg-orange-700 hover:bg-orange-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition"
            >
              <Users className="w-3.5 h-3.5" />
              Detaylı Aile Yönetimi
            </button>
          </div>
        </div>
      ) : (
        /* Direct Inline Naming Form: Anne, Baba, 4 Çocuğa Kadar */
        <form onSubmit={handleQuickSave} className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-orange-300 pb-2 gap-1">
            <div className="text-sm font-serif font-black text-amber-950 flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-600" />
              <span>Aile Üyelerimizin İsimlerini Yazalım (Anne, Baba ve 4 Çocuğa Kadar)</span>
            </div>
            <span className="text-xs text-stone-600 font-medium">
              Çocuklarınızın isimlerini ilgili kutucuklara yazınız
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* Anne */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                👩 Anne
              </label>
              <input
                type="text"
                placeholder="Anne adı..."
                value={anneName}
                onChange={(e) => setAnneName(e.target.value)}
                className="w-full text-xs font-medium rounded-xl border border-orange-300 p-2.5 bg-white text-stone-900 focus:ring-2 focus:ring-orange-500 shadow-inner"
              />
            </div>

            {/* Baba */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                👨 Baba
              </label>
              <input
                type="text"
                placeholder="Baba adı..."
                value={babaName}
                onChange={(e) => setBabaName(e.target.value)}
                className="w-full text-xs font-medium rounded-xl border border-orange-300 p-2.5 bg-white text-stone-900 focus:ring-2 focus:ring-orange-500 shadow-inner"
              />
            </div>

            {/* 1. Çocuk */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                👧👦 1. Çocuk
              </label>
              <input
                type="text"
                placeholder="1. Çocuk adı..."
                value={child1}
                onChange={(e) => setChild1(e.target.value)}
                className="w-full text-xs font-medium rounded-xl border border-orange-300 p-2.5 bg-white text-stone-900 focus:ring-2 focus:ring-orange-500 shadow-inner"
              />
            </div>

            {/* 2. Çocuk */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                👧👦 2. Çocuk
              </label>
              <input
                type="text"
                placeholder="2. Çocuk adı..."
                value={child2}
                onChange={(e) => setChild2(e.target.value)}
                className="w-full text-xs font-medium rounded-xl border border-orange-300 p-2.5 bg-white text-stone-900 focus:ring-2 focus:ring-orange-500 shadow-inner"
              />
            </div>

            {/* 3. Çocuk */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                👧👦 3. Çocuk
              </label>
              <input
                type="text"
                placeholder="3. Çocuk adı..."
                value={child3}
                onChange={(e) => setChild3(e.target.value)}
                className="w-full text-xs font-medium rounded-xl border border-orange-300 p-2.5 bg-white text-stone-900 focus:ring-2 focus:ring-orange-500 shadow-inner"
              />
            </div>

            {/* 4. Çocuk */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                👧👦 4. Çocuk
              </label>
              <input
                type="text"
                placeholder="4. Çocuk adı..."
                value={child4}
                onChange={(e) => setChild4(e.target.value)}
                className="w-full text-xs font-medium rounded-xl border border-orange-300 p-2.5 bg-white text-stone-900 focus:ring-2 focus:ring-orange-500 shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-stone-600 italic">
              * Ailenizde kaç çocuk varsa o kadar kutuyu doldurmanız yeterlidir.
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditingInline(false)}
                className="py-2 px-4 rounded-xl border border-stone-300 text-xs font-bold text-stone-600 hover:bg-white transition cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="py-2 px-6 bg-orange-700 hover:bg-orange-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition"
              >
                <Check className="w-4 h-4" />
                İsimleri Kaydet
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
