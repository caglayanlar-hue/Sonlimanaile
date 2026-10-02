import React, { useState } from 'react';
import { Coffee, FileText, Download, Plus, Trash2, Heart, CheckCircle2, Calendar, Clock, Users, Sparkles, MessageSquare, Award } from 'lucide-react';
import { FamilyMeetingRecord, FamilyMeetingDecision, FamilyMember } from '../types';
import { exportMeetingToWordDoc } from '../utils/wordExport';

interface FamilyMeetingProps {
  familyMembers: FamilyMember[];
  onOpenFamilyModal: () => void;
}

const DEFAULT_TREATS = [
  { id: 'cay', label: 'Tavşan Kanı Demli Çay', icon: '🫖', desc: 'İnce belli bardakta sıcak' },
  { id: 'ihlamur', label: 'Bal & Limonlu Sıcak Ihlamur', icon: '🌿', desc: 'Şifa ve huzur dolu' },
  { id: 'kurabiye', label: 'Fırından Taze Anne Kurabiyesi', icon: '🍪', desc: 'Tarçınlı ve cevizli' },
  { id: 'cikolata', label: 'Sıcak Çikolata & Kek', icon: '🍫', desc: 'Çocukların favorisi' }
];

export const FamilyMeeting: React.FC<FamilyMeetingProps> = ({
  familyMembers,
  onOpenFamilyModal
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [meetingDate, setMeetingDate] = useState(todayStr);
  const [meetingTime, setMeetingTime] = useState('20:00');
  const [moderator, setModerator] = useState<string>(familyMembers[0]?.name || 'Anne');
  const [scribe, setScribe] = useState<string>(familyMembers[1]?.name || familyMembers[0]?.name || 'Yazman');
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>(
    familyMembers.map((m) => m.id)
  );

  const [selectedTreats, setSelectedTreats] = useState<string[]>([
    'Tavşan Kanı Demli Çay',
    'Fırından Taze Anne Kurabiyesi',
    'Bal & Limonlu Sıcak Ihlamur'
  ]);

  const [gratitudeText, setGratitudeText] = useState(
    'Bu hafta hep birlikte sağlıklı ve huzurluyduk. Çocuklar derslerine özen gösterdi, sofralarımız neşeyle kuruldu.'
  );

  const [problemsText, setProblemsText] = useState(
    'Akşamları herkesin kendi telefonuna fazla dalması sohbetlerimizi azalttı. Ayrıca sabahları hazırlanırken küçük aceleler yaşandı; birbirimize daha sabırlı olmayı ve ben diliyle konuşmayı hedefliyoruz.'
  );

  const [decisions, setDecisions] = useState<FamilyMeetingDecision[]>([
    {
      id: 'd1',
      topic: 'Ekran Saati & Dijital Detoks',
      decisionText: 'Akşam yemeklerinden sonra 20:00 - 21:00 arası tüm telefonlar salondaki huzur kutusuna konulacak.',
      responsible: 'Tüm Aile',
      targetDate: 'Her Akşam'
    },
    {
      id: 'd2',
      topic: 'Haftalık Kurabiye & Kitap Günü',
      decisionText: 'Her çarşamba akşamı birlikte ıhlamur kaynatılıp 30 dakika kitap okunacak.',
      responsible: 'Tüm Aile',
      targetDate: 'Çarşamba Günleri'
    },
    {
      id: 'd3',
      topic: 'Pazar Sabahı Ritüeli',
      decisionText: 'Pazar günleri kimse acele etmeyecek; hikâyelerdeki gibi uzun ve huzurlu bir aile kahvaltısı yapılacak.',
      responsible: 'Tüm Aile',
      targetDate: 'Her Pazar'
    }
  ]);

  const [newTopic, setNewTopic] = useState('');
  const [newDecision, setNewDecision] = useState('');
  const [newResponsible, setNewResponsible] = useState('Tüm Aile');
  const [newTargetDate, setNewTargetDate] = useState('Sürekli');
  const [nextMeetingDate, setNextMeetingDate] = useState('Gelecek Pazar 20:00');
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  const toggleTreat = (label: string) => {
    if (selectedTreats.includes(label)) {
      setSelectedTreats(selectedTreats.filter((t) => t !== label));
    } else {
      setSelectedTreats([...selectedTreats, label]);
    }
  };

  const toggleAttendee = (id: string) => {
    if (selectedAttendees.includes(id)) {
      setSelectedAttendees(selectedAttendees.filter((a) => a !== id));
    } else {
      setSelectedAttendees([...selectedAttendees, id]);
    }
  };

  const handleAddDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim() || !newDecision.trim()) return;

    const newDec: FamilyMeetingDecision = {
      id: 'dec-' + Date.now(),
      topic: newTopic.trim(),
      decisionText: newDecision.trim(),
      responsible: newResponsible.trim() || 'Tüm Aile',
      targetDate: newTargetDate.trim() || 'Sürekli'
    };

    setDecisions([...decisions, newDec]);
    setNewTopic('');
    setNewDecision('');
  };

  const handleRemoveDecision = (id: string) => {
    setDecisions(decisions.filter((d) => d.id !== id));
  };

  const handleExportWord = () => {
    const record: FamilyMeetingRecord = {
      id: 'rec-' + Date.now(),
      meetingDate,
      meetingTime,
      moderator,
      scribe,
      attendees: selectedAttendees,
      treats: selectedTreats,
      gratitudeSection: gratitudeText,
      problemsAndNeeds: problemsText,
      decisions,
      nextMeetingDate
    };

    exportMeetingToWordDoc(record, familyMembers);
    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 4500);
  };

  return (
    <div className="space-y-10">
      {/* Header Banner - Rich Warm Honey & Sunset Orange */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-400/50 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/60 text-amber-200 text-xs font-bold border border-amber-300/40">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              Haftalık Aile Meclisi & İstişare
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-amber-50">
              Haftalık Aile Toplantısı
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl leading-relaxed">
              "Aile, insanın ruhunu ısıtan en eski ocaktır." Masanın etrafında toplanıyor, sıcacık çay, ıhlamur ve kurabiyeler eşliğinde sorunlarımızı konuşuyor, ortak kararlar alıyoruz.
            </p>
          </div>

          {/* Big Action: Word Belgesi Çıktı Al Button */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <button
              onClick={handleExportWord}
              className="py-3.5 px-6 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 hover:from-amber-200 hover:to-yellow-300 text-stone-950 font-black text-sm sm:text-base rounded-2xl shadow-xl flex items-center gap-2.5 cursor-pointer transition transform hover:scale-105 active:scale-95"
            >
              <FileText className="w-5 h-5 text-stone-950" />
              <span>Word Belgesi (.doc) Olarak Çıktı Al</span>
              <Download className="w-4 h-4 text-stone-950" />
            </button>
            <span className="text-[11px] text-amber-200 font-semibold">
              İmzalanabilir resmi Word tutanağı olarak indirilir
            </span>
          </div>
        </div>
      </div>

      {showExportSuccess && (
        <div className="p-4 bg-emerald-100 text-emerald-950 border-2 border-emerald-400 rounded-2xl flex items-center justify-between animate-fadeIn shadow-md">
          <div className="flex items-center gap-2.5 text-sm font-bold">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>Aile Meclisi Karar Belgesi Word formatında indirildi! Yazdırıp imzaları atabilir ve buzdolabınıza asabilirsiniz.</span>
          </div>
        </div>
      )}

      {/* Meeting Parameters & Atmosphere (Yanında Çay, Ihlamur, Kurabiye vb.) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Meeting Time, Attendees & Roles */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl space-y-6">
          <h3 className="font-serif font-black text-amber-950 text-xl flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            Toplantı Zamanı & Katılımcılar
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Toplantı Tarihi
              </label>
              <input
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="w-full text-sm font-medium rounded-xl border border-amber-300 p-2.5 bg-amber-50/40 text-stone-800 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Toplantı Saati
              </label>
              <input
                type="text"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                placeholder="Örn: 20:00 (Akşam Çayı)"
                className="w-full text-sm font-medium rounded-xl border border-amber-300 p-2.5 bg-amber-50/40 text-stone-800 focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Toplantı Başkanı / Moderatör
              </label>
              <select
                value={moderator}
                onChange={(e) => setModerator(e.target.value)}
                className="w-full text-sm font-medium rounded-xl border border-amber-300 p-2.5 bg-amber-50/40 text-stone-800"
              >
                {familyMembers.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} ({m.roleLabel})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Toplantı Yazmanı (Katip)
              </label>
              <select
                value={scribe}
                onChange={(e) => setScribe(e.target.value)}
                className="w-full text-sm font-medium rounded-xl border border-amber-300 p-2.5 bg-amber-50/40 text-stone-800"
              >
                {familyMembers.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} ({m.roleLabel})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Attendees Selection */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700">
                Toplantıya Katılan Aile Fertleri
              </label>
              <button
                onClick={onOpenFamilyModal}
                className="text-xs text-orange-700 hover:underline font-bold cursor-pointer"
              >
                + Üye Ekle / Düzenle
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {familyMembers.map((m) => {
                const isSelected = selectedAttendees.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleAttendee(m.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                      isSelected
                        ? 'bg-orange-700 text-white border-orange-800 shadow-xs'
                        : 'bg-stone-100 text-stone-600 border-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    <span>{m.roleLabel}:</span>
                    <strong>{m.name}</strong>
                    {isSelected && <span className="text-amber-300">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Meeting Treats & Ambience (Çay, Ihlamur, Kurabiye vb.) */}
        <div className="lg:col-span-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-6 sm:p-8 border-2 border-orange-300 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-black text-amber-950 text-xl flex items-center gap-2">
              <Coffee className="w-5 h-5 text-orange-600" />
              Toplantı İkramı & Ambiyans
            </h3>
            <span className="text-xs font-bold text-orange-950 bg-orange-200/80 px-3 py-1 rounded-full border border-orange-300">
              Sıcak & Samimi
            </span>
          </div>

          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            Aile toplantılarının kalbi sıcacık bir demlik çay, mis kokulu ıhlamur ve fırından yeni çıkmış kurabiyedir! Seçilen ikramlar Word belgesine resmi olarak işlenir:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DEFAULT_TREATS.map((treat) => {
              const isSelected = selectedTreats.includes(treat.label);
              return (
                <div
                  key={treat.id}
                  onClick={() => toggleTreat(treat.label)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-400/40'
                      : 'bg-white/60 border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <span className="text-2xl">{treat.icon}</span>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-stone-900">
                      {treat.label}
                    </div>
                    <div className="text-[11px] text-stone-600 font-medium">{treat.desc}</div>
                  </div>
                  {isSelected && (
                    <span className="ml-auto text-emerald-600 text-xs font-black">
                      ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-orange-900/10 rounded-2xl border border-orange-300 flex items-center gap-3">
            <span className="text-3xl animate-bounce">🫖</span>
            <div className="text-xs text-amber-950 leading-relaxed">
              <strong>Sıcak Sohbet Kuralı:</strong> Bardaklar doldurulur, telefonlar salondaki sepete bırakılır ve herkes birbiriyle göz teması kurar.
            </div>
          </div>
        </div>
      </div>

      {/* Section 1 & 2: Gratitude & Problems/Needs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gratitude / Bu Hafta Neler Güzel Gitti */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl space-y-4">
          <h3 className="font-serif font-black text-stone-900 text-base sm:text-lg flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            1. Bu Haftaki Güzellikler & Şükranlarımız
          </h3>
          <p className="text-xs text-stone-500">
            Önce güzellikleri takdir ediyoruz: Kim kime teşekkür etmek ister? Ne güzel anlar yaşadık?
          </p>
          <textarea
            rows={4}
            value={gratitudeText}
            onChange={(e) => setGratitudeText(e.target.value)}
            placeholder="Örn: Bu hafta sofrayı toplamada herkes yardım etti, babamın yaptığı espriye çok güldük..."
            className="w-full text-sm rounded-xl border border-amber-300 p-3 bg-amber-50/40 text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500 leading-relaxed font-medium"
          />
        </div>

        {/* Problems & Needs / Sorunlar ve İhtiyaçları Konuşma */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl space-y-4">
          <h3 className="font-serif font-black text-stone-900 text-base sm:text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-600" />
            2. Konuşulan Sorunlar & Samimi İhtiyaçlar
          </h3>
          <p className="text-xs text-stone-500">
            "Aileden Sır Saklanmaz" hikâyesindeki gibi dertler paylaşıldıkça hafifler. Suçlamadan, "Ben diliyle" konuşma alanı.
          </p>
          <textarea
            rows={4}
            value={problemsText}
            onChange={(e) => setProblemsText(e.target.value)}
            placeholder="Örn: Hafta içi herkes çok yorgun olduğu için yeterince konuşamadık, odaların düzeni konusunda sıkıntı var..."
            className="w-full text-sm rounded-xl border border-amber-300 p-3 bg-amber-50/40 text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500 leading-relaxed font-medium"
          />
        </div>
      </div>

      {/* Section 3: Alınan Aile Kararları (Karar Defteri) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-4">
          <div>
            <h3 className="font-serif font-black text-amber-950 text-xl flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-600" />
              3. Aile Meclisinde Alınan Kararlar ({decisions.length})
            </h3>
            <p className="text-xs text-stone-500">
              Bu kararlar Word belgesine resmi tutanak olarak aktarılacak ve altına tüm aile üyelerinin imza çizgisi açılacaktır.
            </p>
          </div>

          <button
            onClick={handleExportWord}
            className="py-2.5 px-4 bg-orange-700 hover:bg-orange-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow cursor-pointer transition"
          >
            <Download className="w-4 h-4" />
            Word Olarak İndir (.doc)
          </button>
        </div>

        {/* Existing Decisions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-orange-700 to-amber-700 text-white font-serif">
                <th className="p-3 rounded-tl-xl w-12 text-center font-bold">No</th>
                <th className="p-3 w-48 font-bold">Konu</th>
                <th className="p-3 font-bold">Alınan Karar / Kural</th>
                <th className="p-3 w-36 text-center font-bold">Sorumlu</th>
                <th className="p-3 w-28 text-center font-bold">Tarih</th>
                <th className="p-3 rounded-tr-xl w-14 text-center font-bold">Sil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-200">
              {decisions.map((dec, index) => (
                <tr key={dec.id} className="hover:bg-amber-50/70 transition">
                  <td className="p-3 text-center font-bold text-orange-900">{index + 1}</td>
                  <td className="p-3 font-bold text-stone-900">{dec.topic}</td>
                  <td className="p-3 text-stone-800 font-medium">{dec.decisionText}</td>
                  <td className="p-3 text-center">
                    <span className="bg-orange-100 text-orange-950 px-2 py-0.5 rounded text-xs font-bold">
                      {dec.responsible}
                    </span>
                  </td>
                  <td className="p-3 text-center text-stone-500 text-xs font-medium">{dec.targetDate}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleRemoveDecision(dec.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Decision Form */}
        <form onSubmit={handleAddDecision} className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-2xl border-2 border-amber-300 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-orange-600" />
            Yeni Aile Kararı Ekle
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Karar Konusu
              </label>
              <input
                type="text"
                placeholder="Örn: Kitap Saati, Harçlık, Piknik..."
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="w-full text-xs rounded-xl border border-amber-300 p-2.5 bg-white font-medium"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Alınan Ortak Karar
              </label>
              <input
                type="text"
                placeholder="Örn: Hafta sonu birlikte pasta yapılacak ve dedeye gidilecek."
                value={newDecision}
                onChange={(e) => setNewDecision(e.target.value)}
                className="w-full text-xs rounded-xl border border-amber-300 p-2.5 bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Sorumlu
              </label>
              <input
                type="text"
                placeholder="Örn: Tüm Aile, Çocuklar, Anne..."
                value={newResponsible}
                onChange={(e) => setNewResponsible(e.target.value)}
                className="w-full text-xs rounded-xl border border-amber-300 p-2.5 bg-white font-medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <label className="text-[11px] font-bold text-stone-700">
                Gelecek Toplantı:
              </label>
              <input
                type="text"
                value={nextMeetingDate}
                onChange={(e) => setNextMeetingDate(e.target.value)}
                className="text-xs rounded-xl border border-amber-300 p-2 bg-white text-stone-800 font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={!newTopic.trim() || !newDecision.trim()}
              className="py-2.5 px-6 bg-orange-700 hover:bg-orange-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition"
            >
              <Plus className="w-4 h-4" />
              Kararı Deftere Ekle
            </button>
          </div>
        </form>

        {/* Word Export Callout Banner */}
        <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 p-6 rounded-2xl border-2 border-orange-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-serif font-black text-amber-950 text-base sm:text-lg flex items-center justify-center sm:justify-start gap-2">
              <span>📄 Toplantıyı Resmileştirin & İmzaları Atın!</span>
            </div>
            <p className="text-xs text-stone-700 max-w-xl font-medium">
              "Word Belgesi Olarak Çıktı Al" butonuna bastığınızda bu kararlar, katılımcı isimleri ve altındaki imza çizgileriyle beraber indirilmeye hazır hale gelir.
            </p>
          </div>

          <button
            onClick={handleExportWord}
            className="py-3.5 px-6 bg-stone-900 hover:bg-stone-800 text-amber-300 font-black text-xs sm:text-sm rounded-xl shadow-lg flex items-center gap-2 shrink-0 cursor-pointer transition"
          >
            <Download className="w-4 h-4 text-amber-400" />
            Word (.doc) İndir
          </button>
        </div>
      </div>
    </div>
  );
};
