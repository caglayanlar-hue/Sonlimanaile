import React, { useState, useEffect } from 'react';
import { Users, Heart, Check, Edit2, RotateCcw } from 'lucide-react';
import { FamilyMember } from '../types';

interface FamilyBannerProps {
  familyMembers: FamilyMember[];
  onSaveFamily: (members: FamilyMember[]) => void;
  onOpenModal: () => void;
}

// Helper to check if a name is just a generic placeholder word
const isGenericPlaceholder = (name: string) => {
  if (!name) return true;
  const lower = name.trim().toLowerCase();
  return (
    lower === 'anne' ||
    lower === 'baba' ||
    lower === 'çocuk' ||
    lower === 'cocuk' ||
    lower.includes('1. çocuk') ||
    lower.includes('2. çocuk') ||
    lower.includes('3. çocuk') ||
    lower.includes('4. çocuk')
  );
};

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

  const [anneName, setAnneName] = useState('');
  const [babaName, setBabaName] = useState('');
  const [child1, setChild1] = useState('');
  const [child2, setChild2] = useState('');
  const [child3, setChild3] = useState('');
  const [child4, setChild4] = useState('');

  // Sync inputs whenever familyMembers changes
  useEffect(() => {
    const anne = familyMembers.find((m) => m.role === 'anne');
    const baba = familyMembers.find((m) => m.role === 'baba');
    const kids = familyMembers.filter((m) => m.role.includes('cocuk'));

    setAnneName(anne && !isGenericPlaceholder(anne.name) ? anne.name : '');
    setBabaName(baba && !isGenericPlaceholder(baba.name) ? baba.name : '');
    setChild1(kids[0] && !isGenericPlaceholder(kids[0].name) ? kids[0].name : '');
    setChild2(kids[1] && !isGenericPlaceholder(kids[1].name) ? kids[1].name : '');
    setChild3(kids[2] && !isGenericPlaceholder(kids[2].name) ? kids[2].name : '');
    setChild4(kids[3] && !isGenericPlaceholder(kids[3].name) ? kids[3].name : '');
  }, [familyMembers]);

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

    onSaveFamily(newMembers);
    setIsEditingInline(false);
  };

  const handleResetAll = () => {
    if (window.confirm('Tüm isimleri temizleyip sıfırlamak istiyor musunuz?')) {
      setAnneName('');
      setBabaName('');
      setChild1('');
      setChild2('');
      setChild3('');
      setChild4('');
      onSaveFamily([]);
      setIsEditingInline(false);
    }
  };

  // Filter members that have actual names (not generic placeholders)
  const realMembers = familyMembers.filter((m) => !isGenericPlaceholder(m.name));

  return (
    <div className="mb-6 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 p-5 sm:p-6 rounded-3xl border-2 border-orange-300 shadow-md">
      {!isEditingInline ? (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-center sm:text-left">
            {realMembers.length > 0 ? (
              <>
                <div className="flex -space-x-2 overflow-hidden shrink-0">
                  {realMembers.map((m) => (
                    <div
                      key={m.id}
                      className={`inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gradient-to-tr ${m.avatarColor} text-white font-black text-sm flex items-center justify-center shadow-md`}
                      title={m.name}
                    >
                      {m.name.charAt(0).toUpperCase()}
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-sm sm:text-base font-serif font-black text-amber-950 flex items-center justify-center sm:justify-start gap-1.5">
                    <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                    <span>Hoş Geldiniz, Canım Ailemiz!</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1.5">
                    {/* Sadece aile fertlerinin gerçek adları yazılır */}
                    {realMembers.map((m) => (
                      <span
                        key={m.id}
                        className="inline-flex items-center bg-white/95 px-3 py-1 rounded-xl text-xs sm:text-sm font-black text-stone-900 border border-amber-300 shadow-2xs"
                      >
                        {m.name}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="text-sm sm:text-base font-serif font-black text-amber-950 flex items-center justify-center sm:justify-start gap-1.5">
                  <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                  <span>Kendi Aile Üyelerinizin İsimlerini Ekleyin</span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  Bu web sitesi her ziyaretçiye özeldir. Aşağıdaki butona tıklayarak kendi aile fertlerinizin isimlerini kolayca yazabilirsiniz.
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsEditingInline(true)}
              className="py-2.5 px-4 bg-white hover:bg-orange-50 text-orange-950 border border-orange-300 rounded-xl text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition"
            >
              <Edit2 className="w-3.5 h-3.5 text-orange-600" />
              <span>{realMembers.length > 0 ? 'İsimleri Düzenle' : 'Kendi Aile İsimlerinizi Yazın'}</span>
            </button>
            <button
              onClick={onOpenModal}
              className="py-2.5 px-4 bg-orange-700 hover:bg-orange-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Detaylı Yönetim</span>
            </button>
          </div>
        </div>
      ) : (
        /* Sade ve Anlaşılır İsim Giriş Formu */
        <form onSubmit={handleQuickSave} className="space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-orange-300 pb-2.5 gap-1">
            <div className="text-sm sm:text-base font-serif font-black text-amber-950 flex items-center gap-2">
              <Users className="w-4 h-4 text-orange-600" />
              <span>Kendi Aile Üyelerinizin İsimlerini Yazın</span>
            </div>
            <span className="text-xs text-stone-600 font-medium">
              Herkes kendi aile fertlerinin isimlerini dilediği gibi değiştirebilir.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* Anne */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Anne
              </label>
              <input
                type="text"
                placeholder="Anne adını yazınız..."
                value={anneName}
                onChange={(e) => setAnneName(e.target.value)}
                className="w-full text-xs sm:text-sm font-medium rounded-xl border border-orange-300 p-2.5 bg-white text-stone-900 focus:ring-2 focus:ring-orange-500 shadow-inner"
              />
            </div>

            {/* Baba */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Baba
              </label>
              <input
                type="text"
                placeholder="Baba adını yazınız..."
                value={babaName}
                onChange={(e) => setBabaName(e.target.value)}
                className="w-full text-xs sm:text-sm font-medium rounded-xl border border-orange-300 p-2.5 bg-white text-stone-900 focus:ring-2 focus:ring-orange-500 shadow-inner"
              />
            </div>

            {/* 1. Çocuk */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                1. Çocuk
              </label>
              <input
                type="text"
                placeholder="1. Çocuk adını yazınız..."
                value={child1}
                onChange={(e) => setChild1(e.target.value)}
                className="w-full text-xs sm:text-sm font-medium rounded-xl border border-orange-300 p-2.5 bg-white text-stone-900 focus:ring-2 focus:ring-orange-500 shadow-inner"
              />
            </div>

            {/* 2. Çocuk */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                2. Çocuk (Varsa)
              </label>
              <input
                type="text"
                placeholder="2. Çocuk adını yazınız..."
                value={child2}
                onChange={(e) => setChild2(e.target.value)}
                className="w-full text-xs sm:text-sm font-medium rounded-xl border border-orange-300 p-2.5 bg-white text-stone-900 focus:ring-2 focus:ring-orange-500 shadow-inner"
              />
            </div>

            {/* 3. Çocuk */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                3. Çocuk (Varsa)
              </label>
              <input
                type="text"
                placeholder="3. Çocuk adını yazınız..."
                value={child3}
                onChange={(e) => setChild3(e.target.value)}
                className="w-full text-xs sm:text-sm font-medium rounded-xl border border-orange-300 p-2.5 bg-white text-stone-900 focus:ring-2 focus:ring-orange-500 shadow-inner"
              />
            </div>

            {/* 4. Çocuk */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                4. Çocuk (Varsa)
              </label>
              <input
                type="text"
                placeholder="4. Çocuk adını yazınız..."
                value={child4}
                onChange={(e) => setChild4(e.target.value)}
                className="w-full text-xs sm:text-sm font-medium rounded-xl border border-orange-300 p-2.5 bg-white text-stone-900 focus:ring-2 focus:ring-orange-500 shadow-inner"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-3">
            <button
              type="button"
              onClick={handleResetAll}
              className="text-xs text-rose-700 hover:text-rose-900 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tüm İsimleri Sıfırla / Temizle</span>
            </button>

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
                className="py-2 px-6 bg-orange-700 hover:bg-orange-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition"
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
