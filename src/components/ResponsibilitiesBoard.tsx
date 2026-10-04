import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, Award, Heart, MessageSquare, Flame, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { FamilyMember, FamilyTask } from '../types';

interface ResponsibilitiesBoardProps {
  familyMembers: FamilyMember[];
}

export const ResponsibilitiesBoard: React.FC<ResponsibilitiesBoardProps> = ({ familyMembers }) => {
  const [tasks, setTasks] = useState<FamilyTask[]>(() => {
    try {
      const saved = localStorage.getItem('aile_responsibilities');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 't1',
        title: 'Akşam çayı ve ıhlamur için suyu kaynatma',
        assignedTo: familyMembers.find(m => m.role === 'anne')?.name || 'Anne',
        assignedRole: 'Anne',
        frequency: 'Her Gün',
        completed: true,
        category: 'mutfak'
      },
      {
        id: 't2',
        title: 'Sabah taze ve sıcacık ekmekleri fırından alma',
        assignedTo: familyMembers.find(m => m.role === 'baba')?.name || 'Baba',
        assignedRole: 'Baba',
        frequency: 'Her Gün',
        completed: true,
        category: 'salon'
      },
      {
        id: 't3',
        title: 'Yemek sofrasını kurmaya ve tabakları dizmeye yardım etme',
        assignedTo: familyMembers.find(m => m.role.includes('cocuk'))?.name || 'Çocuk',
        assignedRole: 'Çocuk',
        frequency: 'Her Gün',
        completed: false,
        category: 'mutfak'
      },
      {
        id: 't4',
        title: 'Salondaki kutu oyunlarını ve kitapları raflarına toplama',
        assignedTo: familyMembers.find(m => m.role.includes('cocuk'))?.name || 'Çocuk',
        assignedRole: 'Çocuk',
        frequency: 'Akşam',
        completed: false,
        category: 'salon'
      },
      {
        id: 't5',
        title: 'Pazar kahvaltısında çay bardaklarını dizme ve sofrayı toplama',
        assignedTo: 'Tüm Aile',
        assignedRole: 'Tüm Aile',
        frequency: 'Hafta Sonu',
        completed: false,
        category: 'toplanti'
      }
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [assignedMemberName, setAssignedMemberName] = useState(
    familyMembers[0]?.name || 'Anne'
  );
  const [frequency, setFrequency] = useState<FamilyTask['frequency']>('Her Gün');

  const [concerns, setConcerns] = useState<string[]>([
    'Sabahları hazırlanırken acele edip birbirimize ses yükseltmeyelim, tebessümle konuşalım.',
    'Ders çalışırken odanın kapısı kapalıysa lütfen önce kapıyı çalarak girelim.',
    'Hafta sonu akşamları hep beraber televizyonsuz sohbet edip çay içelim.'
  ]);
  const [newConcern, setNewConcern] = useState('');

  const saveTasks = (newTasks: FamilyTask[]) => {
    setTasks(newTasks);
    try {
      localStorage.setItem('aile_responsibilities', JSON.stringify(newTasks));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTasks(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const memberObj = familyMembers.find((m) => m.name === assignedMemberName);
    const newTask: FamilyTask = {
      id: 'task-' + Date.now(),
      title: newTaskTitle.trim(),
      assignedTo: assignedMemberName,
      assignedRole: memberObj?.roleLabel || 'Aile Ferdi',
      frequency,
      completed: false,
      category: 'salon'
    };

    saveTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const handleDeleteTask = (id: string) => {
    saveTasks(tasks.filter((t) => t.id !== id));
  };

  const handleAddConcern = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConcern.trim()) return;
    setConcerns([...concerns, newConcern.trim()]);
    setNewConcern('');
  };

  const handleDeleteConcern = (index: number) => {
    setConcerns(concerns.filter((_, i) => i !== index));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-10">
      {/* Header Banner - Warm & Vibrant */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-400/50 relative overflow-hidden">
        <div className="relative z-10 space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/60 text-amber-200 text-xs font-bold border border-amber-300/40">
            <CheckSquare className="w-3.5 h-3.5 text-amber-300" />
            Birlikte Üretme & Dayanışma
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-amber-50">
            Aile İçi Sorumluluklarım
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl leading-relaxed">
            "Sorumluluk paylaşıldıkça hafifler, sevgi paylaşıldıkça çoğalır." Evimizin huzurunu korumak için herkes elini taşın altına koyar, birbirimizin yükünü sevgiyle alırız.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Görev Paylaşım Tablosu */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-amber-200 pb-4">
            <div>
              <h3 className="font-serif font-black text-amber-950 text-xl flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-orange-600" />
                Sorumluluk Listemiz
              </h3>
              <p className="text-xs text-stone-500">
                Tamamlanan: {completedCount} / {tasks.length} Sorumluluk
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-950 bg-amber-200/80 px-3.5 py-1.5 rounded-full border border-amber-300">
              <Star className="w-4 h-4 text-orange-600 fill-orange-500" />
              <span>{Math.round((completedCount / (tasks.length || 1)) * 100)}% Tamamlandı</span>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-2.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition flex items-center justify-between gap-3 ${
                  task.completed
                    ? 'bg-emerald-50/80 border-emerald-300 text-stone-500'
                    : 'bg-amber-50/40 border-amber-200 hover:border-orange-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition cursor-pointer border-2 ${
                      task.completed
                        ? 'bg-emerald-600 border-emerald-700 text-white shadow-xs'
                        : 'border-orange-400 bg-white hover:bg-orange-50'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                  <div>
                    <div className={`text-sm font-bold ${task.completed ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                      {task.title}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-600 mt-0.5">
                      <span className="font-bold text-orange-950 bg-orange-100 px-2 py-0.5 rounded">
                        {task.assignedTo}
                      </span>
                      <span>•</span>
                      <span>{task.frequency}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                  title="Sorumluluğu Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Task Form */}
          <form onSubmit={handleAddTask} className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-300 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-orange-600" />
              Yeni Sorumluluk Ekle
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="Sorumluluk adı (Örn: Çiçekleri sulamak, Sofrayı toplamak...)"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full text-xs rounded-xl border border-amber-300 p-2.5 bg-white"
                />
              </div>

              <div>
                <select
                  value={assignedMemberName}
                  onChange={(e) => setAssignedMemberName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-amber-300 p-2.5 bg-white"
                >
                  <option value="Tüm Aile">Tüm Aile Birlikte</option>
                  {familyMembers.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={!newTaskTitle.trim()}
              className="w-full py-2.5 bg-orange-700 hover:bg-orange-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow transition"
            >
              <Plus className="w-4 h-4" />
              Sorumluluğu Kaydet
            </button>
          </form>
        </div>

        {/* Right: İletişim Rehberi & Konuşulacaklar Listesi */}
        <div className="lg:col-span-5 space-y-6">
          {/* Empati ve Çözüm Rehberi */}
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-3xl border border-orange-300 shadow-md space-y-3">
            <h3 className="font-serif font-black text-amber-950 text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              Problemleri Sevgiyle Çözme Kuralları
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              "Aileden Sır Saklanmaz" ve "Tencere Yuvarlanmış" hikâyelerindeki gibi sorunları içimize atmadan nasıl konuşuruz?
            </p>

            <div className="space-y-2.5 text-xs text-stone-800">
              <div className="p-3 bg-white/90 rounded-xl border border-amber-300 shadow-2xs">
                <div className="font-bold text-orange-950 mb-0.5">1. "Ben Dili" Kullanın</div>
                <p>"Beni hiç dinlemiyorsun!" yerine <em>"Ben bir şey anlatırken dinlenmediğimde kendimi üzgün hissediyorum"</em> deyin.</p>
              </div>

              <div className="p-3 bg-white/90 rounded-xl border border-amber-300 shadow-2xs">
                <div className="font-bold text-orange-950 mb-0.5">2. Tencere ve Kapak Gibi Tamamlayın</div>
                <p>Kusur aramak yerine, "Bu konuda birbirimize nasıl destek olabiliriz?" diye sorarak çözüm arayın.</p>
              </div>

              <div className="p-3 bg-white/90 rounded-xl border border-amber-300 shadow-2xs">
                <div className="font-bold text-orange-950 mb-0.5">3. Sorunları Saklamayın, Paylaşın</div>
                <p>Dertler paylaşıldıkça hafifler; aile meclisinde sıcak bir çay eşliğinde konuşmak en güzel şifadır.</p>
              </div>
            </div>
          </div>

          {/* Konuşulacaklar Listesi */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-xl space-y-4">
            <h4 className="font-serif font-black text-stone-900 text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-orange-600" />
              Toplantıda Konuşulacak İhtiyaç ve Dertler
            </h4>
            <p className="text-xs text-stone-500">
              Haftalık toplantıda ele alınmasını istediğiniz bir konuyu buraya yazın:
            </p>

            <div className="space-y-2">
              {concerns.map((con, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-orange-50/60 rounded-xl border border-orange-200 flex items-start justify-between gap-2 text-xs text-stone-800"
                >
                  <span className="leading-relaxed">💬 {con}</span>
                  <button
                    onClick={() => handleDeleteConcern(idx)}
                    className="text-stone-400 hover:text-rose-600 p-0.5 cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddConcern} className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Konuşulacak bir konu yazın..."
                value={newConcern}
                onChange={(e) => setNewConcern(e.target.value)}
                className="flex-1 text-xs rounded-xl border border-stone-300 p-2.5 bg-stone-50 focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                disabled={!newConcern.trim()}
                className="py-2.5 px-4 bg-orange-700 hover:bg-orange-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow"
              >
                Ekle
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
