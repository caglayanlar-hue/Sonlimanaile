import React, { useState } from 'react';
import { MessageSquareHeart, Heart, Send, Sparkles, Pin, Trash2, Smile, ThumbsUp } from 'lucide-react';
import { FamilyMessage, FamilyMember } from '../types';

interface MessageBoardProps {
  familyMembers: FamilyMember[];
}

const NOTE_COLORS = [
  { id: 'yellow', name: 'Sarı', bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-950', pin: 'text-amber-600' },
  { id: 'rose', name: 'Pembe', bg: 'bg-rose-100', border: 'border-rose-300', text: 'text-rose-950', pin: 'text-rose-600' },
  { id: 'blue', name: 'Mavi', bg: 'bg-sky-100', border: 'border-sky-300', text: 'text-sky-950', pin: 'text-sky-600' },
  { id: 'green', name: 'Yeşil', bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-950', pin: 'text-emerald-600' },
  { id: 'purple', name: 'Lila', bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-950', pin: 'text-purple-600' }
];

const PRESET_MESSAGES = [
  'Günün harika geçsin, seni çok seviyorum! ❤️',
  'Dün akşamki güzel sohbet için teşekkürler, iyi ki varsın! 🌸',
  'Yaptığın o sıcacık çay/kurabiye içimi ısıttı anneciğim! 🍪',
  'Dağ gibi arkamda durduğun için teşekkürler babacığım! 🏔️',
  'Dünkü sabırsızlığım için özür dilerim, hadi barışıp sarılalım! 🤗',
  'Bugün sınavında/işinde sana bol şans, başarılar dilerim! 🌟'
];

export const MessageBoard: React.FC<MessageBoardProps> = ({ familyMembers }) => {
  const [messages, setMessages] = useState<FamilyMessage[]>(() => {
    try {
      const saved = localStorage.getItem('aile_messages');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'msg-1',
        fromName: familyMembers[0]?.name || 'Anne',
        fromRole: 'Anne',
        toName: 'Tüm Aile',
        messageText: 'Akşam fırından yeni çıkmış tarçınlı kurabiyelerimiz var! Hepinizi çok seviyorum, iyi ki benim ailemsiniz. ❤️',
        category: 'sevgi',
        color: 'yellow',
        createdAt: 'Bugün 14:30',
        likes: 4
      },
      {
        id: 'msg-2',
        fromName: familyMembers[1]?.name || 'Baba',
        fromRole: 'Baba',
        toName: 'Çocuklar',
        messageText: 'Dün akşamki kutu oyununda gösterdiğiniz tatlı gayret için tebrikler. Pazar günü piknik sözüm geçerli! 🌿',
        category: 'motivasyon',
        color: 'blue',
        createdAt: 'Dün 21:00',
        likes: 3
      },
      {
        id: 'msg-3',
        fromName: familyMembers[2]?.name || 'Çocuk',
        fromRole: 'Çocuk',
        toName: 'Anne ve Baba',
        messageText: 'Bize her zaman sıcacık bir yuva sunduğunuz için teşekkür ederim. Sizi dünyalar kadar seviyorum! 🌸',
        category: 'tesekkur',
        color: 'rose',
        createdAt: '2 gün önce',
        likes: 5
      }
    ];
  });

  const [fromMember, setFromMember] = useState(familyMembers[0]?.name || 'Anne');
  const [toName, setToName] = useState('Tüm Aile');
  const [messageText, setMessageText] = useState('');
  const [category, setCategory] = useState<FamilyMessage['category']>('sevgi');
  const [selectedColor, setSelectedColor] = useState<FamilyMessage['color']>('yellow');

  const saveMessagesToStorage = (newMsgs: FamilyMessage[]) => {
    setMessages(newMsgs);
    try {
      localStorage.setItem('aile_messages', JSON.stringify(newMsgs));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const memberObj = familyMembers.find((m) => m.name === fromMember);
    const newMsg: FamilyMessage = {
      id: 'msg-' + Date.now(),
      fromName: fromMember,
      fromRole: memberObj?.roleLabel || 'Aile Ferdi',
      toName: toName.trim() || 'Herkese',
      messageText: messageText.trim(),
      category,
      color: selectedColor,
      createdAt: 'Az önce',
      likes: 0
    };

    saveMessagesToStorage([newMsg, ...messages]);
    setMessageText('');
  };

  const handleLike = (id: string) => {
    const updated = messages.map((m) =>
      m.id === id ? { ...m, likes: m.likes + 1 } : m
    );
    saveMessagesToStorage(updated);
  };

  const handleDelete = (id: string) => {
    saveMessagesToStorage(messages.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header Banner - Warm, Joyful & Vibrant */}
      <div className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-400/50 relative overflow-hidden">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/60 text-amber-200 text-xs font-bold border border-amber-300/40">
            <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
            Aile Sevgi & Mesaj Panosu
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-amber-50">
            Birbirimize Not Bırakalım
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl leading-relaxed">
            "Duvardaki Saat" hikâyesindeki çocukların gizli mektupları gibi... Gün içinde birbirimize tebessüm ettirecek sevgi sözcükleri, teşekkürler ve minik sürpriz notlar bırakalım!
          </p>
        </div>
      </div>

      {/* New Note Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-xl space-y-6">
        <h3 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          Panoya Yeni Not İğnele
        </h3>

        <form onSubmit={handleAddMessage} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Notu Yazan (Kimden?)
              </label>
              <select
                value={fromMember}
                onChange={(e) => setFromMember(e.target.value)}
                className="w-full text-xs rounded-xl border border-stone-300 p-2.5 bg-stone-50 text-stone-800"
              >
                {familyMembers.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} ({m.roleLabel})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Not Kime?
              </label>
              <input
                type="text"
                placeholder="Örn: Canım Anneme, Babama, Herkese..."
                value={toName}
                onChange={(e) => setToName(e.target.value)}
                className="w-full text-xs rounded-xl border border-stone-300 p-2.5 bg-stone-50 text-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Mesaj Türü
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs rounded-xl border border-stone-300 p-2.5 bg-stone-50 text-stone-800"
              >
                <option value="sevgi">❤️ Sevgi & Kalp Sözcüğü</option>
                <option value="tesekkur">🌸 Teşekkür & Minnet</option>
                <option value="ozur">🤗 Özür & Barışma Notu</option>
                <option value="motivasyon">🌟 Günün Motivasyonu</option>
                <option value="hatirlatma">📌 Tatlı Bir Hatırlatma</option>
              </select>
            </div>
          </div>

          {/* Quick presets */}
          <div>
            <div className="text-[11px] font-semibold text-stone-500 mb-1.5 flex items-center gap-1">
              <Smile className="w-3.5 h-3.5 text-amber-600" />
              Hızlı Sevgi Cümleleri (Tıkla ve Ekle):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_MESSAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessageText(preset)}
                  className="text-[11px] bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 px-2.5 py-1 rounded-lg border border-stone-200 transition cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Mesajınız / Kalpten Gelen Sözler
            </label>
            <textarea
              rows={3}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Canım aileme söylemek istediğim güzel bir söz..."
              className="w-full text-sm rounded-xl border border-stone-300 p-3 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Color Selection & Submit */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-600">Not Kağıdı Rengi:</span>
              <div className="flex items-center gap-1.5">
                {NOTE_COLORS.map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setSelectedColor(col.id as any)}
                    className={`w-6 h-6 rounded-full ${col.bg} border-2 transition cursor-pointer ${
                      selectedColor === col.id ? 'border-stone-900 scale-110 shadow' : 'border-stone-300'
                    }`}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!messageText.trim()}
              className="py-2.5 px-6 bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow cursor-pointer transition"
            >
              <Send className="w-4 h-4" />
              Notu Panoya As!
            </button>
          </div>
        </form>
      </div>

      {/* Corkboard / Panodaki Notlar */}
      <div className="bg-amber-900/15 p-6 sm:p-8 rounded-3xl border-4 border-amber-950/20 shadow-inner space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-amber-950 text-xl flex items-center gap-2">
            <Pin className="w-5 h-5 text-rose-600 fill-rose-600" />
            Ailemizin Sevgi Panosu ({messages.length} Not)
          </h3>
          <span className="text-xs text-amber-900 font-medium">
            Kalpleri ısıtan sözler bu panoda saklanır
          </span>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-12 bg-white/60 rounded-2xl border border-dashed border-amber-300">
            <p className="text-sm text-stone-600">
              Henüz panoya not bırakılmadı. İlk güzel sözü siz asın!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {messages.map((msg) => {
              const colorConfig =
                NOTE_COLORS.find((c) => c.id === msg.color) || NOTE_COLORS[0];

              return (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl ${colorConfig.bg} border-2 ${colorConfig.border} shadow-md relative group transform hover:-translate-y-1 transition duration-200 flex flex-col justify-between`}
                >
                  {/* Pin icon on top center */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-rose-500 shadow-md border-2 border-white flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>

                  <div>
                    {/* Header info */}
                    <div className="flex items-center justify-between text-xs mb-2 pt-1">
                      <div className="font-bold text-stone-800">
                        {msg.fromName} ({msg.fromRole}) ➔{' '}
                        <span className="text-amber-900 font-bold">{msg.toName}</span>
                      </div>
                      <span className="text-[10px] text-stone-500">{msg.createdAt}</span>
                    </div>

                    {/* Note body */}
                    <p className={`font-serif text-sm leading-relaxed ${colorConfig.text} whitespace-pre-wrap my-2`}>
                      {msg.messageText}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-black/10 pt-3 mt-3 flex items-center justify-between">
                    <button
                      onClick={() => handleLike(msg.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900 bg-white/70 hover:bg-white px-2.5 py-1 rounded-lg border border-black/10 transition cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span>{msg.likes} Kalp</span>
                    </button>

                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="text-stone-400 hover:text-rose-700 opacity-60 group-hover:opacity-100 transition p-1 cursor-pointer"
                      title="Notu Kaldır"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
