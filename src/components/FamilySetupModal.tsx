import React, { useState, useEffect } from 'react';
import { X, UserPlus, Heart, Trash2, CheckCircle2, Coffee, ShieldCheck, Edit2, RotateCcw, Check } from 'lucide-react';
import { FamilyMember, FamilyRole } from '../types';

interface FamilySetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyMembers: FamilyMember[];
  onSaveFamily: (members: FamilyMember[]) => void;
}

const ROLE_OPTIONS: { role: FamilyRole; label: string; icon: string; defaultColor: string }[] = [
  { role: 'anne', label: 'Anne', icon: '👩', defaultColor: 'from-rose-500 to-pink-600' },
  { role: 'baba', label: 'Baba', icon: '👨', defaultColor: 'from-blue-600 to-indigo-700' },
  { role: 'buyuk_cocuk', label: 'Çocuk (Büyük)', icon: '👧', defaultColor: 'from-amber-500 to-orange-600' },
  { role: 'ortanca_cocuk', label: 'Çocuk (Ortanca)', icon: '👦', defaultColor: 'from-emerald-500 to-teal-600' },
  { role: 'kucuk_cocuk', label: 'Çocuk (Küçük)', icon: '👶', defaultColor: 'from-purple-500 to-fuchsia-600' },
  { role: 'dede', label: 'Dede', icon: '👴', defaultColor: 'from-stone-600 to-stone-800' },
  { role: 'babaanne', label: 'Babaanne / Anneanne', icon: '👵', defaultColor: 'from-rose-400 to-amber-700' }
];

export const FamilySetupModal: React.FC<FamilySetupModalProps> = ({
  isOpen,
  onClose,
  familyMembers,
  onSaveFamily
}) => {
  const [members, setMembers] = useState<FamilyMember[]>(familyMembers);
  const [newName, setNewName] = useState('');
  const [selectedRole, setSelectedRole] = useState<FamilyRole>('anne');
  const [favoriteDrink, setFavoriteDrink] = useState('Demli Tavşan Kanı Çay');

  // Inline editing state for existing members
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNameVal, setEditNameVal] = useState('');

  // Keep members in sync when modal opens or parent familyMembers change
  useEffect(() => {
    if (isOpen) {
      setMembers(familyMembers);
      setEditingId(null);
    }
  }, [isOpen, familyMembers]);

  if (!isOpen) return null;

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const roleConfig = ROLE_OPTIONS.find((r) => r.role === selectedRole);
    const newMember: FamilyMember = {
      id: 'member-' + Date.now(),
      name: newName.trim(),
      role: selectedRole,
      roleLabel: roleConfig?.label || 'Aile Ferdi',
      avatarColor: roleConfig?.defaultColor || 'from-amber-500 to-amber-700',
      favoriteDrink: favoriteDrink.trim() || 'Sıcak Çay'
    };

    const updated = [...members, newMember];
    setMembers(updated);
    setNewName('');
  };

  const handleRemoveMember = (id: string) => {
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
    if (editingId === id) setEditingId(null);
  };

  const handleStartEdit = (member: FamilyMember) => {
    setEditingId(member.id);
    setEditNameVal(member.name);
  };

  const handleSaveInlineEdit = (id: string) => {
    if (!editNameVal.trim()) return;
    const updated = members.map((m) =>
      m.id === id ? { ...m, name: editNameVal.trim() } : m
    );
    setMembers(updated);
    setEditingId(null);
  };

  const handleClearAll = () => {
    if (window.confirm('Kayıtlı tüm isimleri temizleyip sıfırdan başlamak istediğinize emin misiniz?')) {
      setMembers([]);
      onSaveFamily([]);
      setEditingId(null);
    }
  };

  const handleSaveAndClose = () => {
    onSaveFamily(members);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-amber-50 text-stone-900 w-full max-w-2xl rounded-3xl shadow-2xl border-2 border-orange-400 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shadow-inner">
              🏡
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-amber-50">
                Aile Üyelerimiz
              </h2>
              <p className="text-xs text-amber-100 font-medium">
                Kendi ailenizin fertlerini ekleyin, düzenleyin veya dilediğiniz zaman değiştirin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Privacy & Customization Notice */}
          <div className="bg-orange-100/70 border border-orange-300 rounded-2xl p-3 text-xs text-orange-950 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-orange-700 shrink-0" />
            <span>
              <strong>Kişiye Özel:</strong> Buraya yazdığınız isimler sadece sizin cihazınızda saklanır. Web sitesini ziyaret eden her aile yalnızca kendi üyelerini görür.
            </span>
          </div>

          {/* Add Form */}
          <form onSubmit={handleAddMember} className="bg-white p-5 rounded-2xl border-2 border-amber-300 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
              <UserPlus className="w-4 h-4 text-orange-600" />
              Yeni Aile Üyesi Ekle
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Rol (Anne, Baba, Çocuk...)
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as FamilyRole)}
                  className="w-full text-sm rounded-xl border border-amber-300 p-2.5 bg-amber-50/40 focus:ring-2 focus:ring-orange-500 font-medium"
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt.role} value={opt.role}>
                      {opt.icon} {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Kişinin Adı
                </label>
                <input
                  type="text"
                  placeholder="Kendi adınızı yazınız..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-sm rounded-xl border border-amber-300 p-2.5 bg-amber-50/40 focus:ring-2 focus:ring-orange-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Toplantıda Tercih Ettiği İkram
              </label>
              <input
                type="text"
                placeholder="Örn: Tavşan Kanı Çay, Sıcak Ihlamur, Anne Kurabiyesi..."
                value={favoriteDrink}
                onChange={(e) => setFavoriteDrink(e.target.value)}
                className="w-full text-sm rounded-xl border border-amber-300 p-2 bg-amber-50/30 text-stone-800"
              />
            </div>

            <button
              type="submit"
              disabled={!newName.trim()}
              className="w-full py-2.5 px-4 bg-orange-700 hover:bg-orange-800 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <UserPlus className="w-4 h-4" />
              Ailemize Ekle
            </button>
          </form>

          {/* Members List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                Kayıtlı Aile Üyelerimiz ({members.length})
              </h3>
              {members.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs text-rose-700 hover:text-rose-900 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Listeyi Temizle / Sıfırla</span>
                </button>
              )}
            </div>

            {members.length === 0 ? (
              <div className="text-center py-8 bg-amber-100/60 rounded-2xl border-2 border-dashed border-amber-300 p-4">
                <p className="text-sm text-stone-700 font-medium">
                  Henüz kimse eklenmedi. Kendi aile üyelerinizin isimlerini yukarıdaki formdan dilediğiniz gibi ekleyebilirsiniz.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="p-3 bg-white rounded-2xl border-2 border-amber-200 shadow-sm flex items-center justify-between hover:border-orange-400 transition"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-tr ${member.avatarColor} text-white flex items-center justify-center font-black text-sm shadow shrink-0`}
                      >
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        {editingId === member.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={editNameVal}
                              onChange={(e) => setEditNameVal(e.target.value)}
                              className="text-xs font-bold border border-orange-400 rounded-lg px-2 py-1 bg-amber-50 w-full"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveInlineEdit(member.id)}
                              className="p-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer"
                              title="Kaydet"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="font-bold text-stone-900 text-sm truncate flex items-center gap-1.5">
                              <span>{member.name}</span>
                            </div>
                            <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5 truncate">
                              <Coffee className="w-3 h-3 text-orange-700 shrink-0" />
                              <span className="truncate">{member.favoriteDrink}</span>
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {editingId !== member.id && (
                        <button
                          type="button"
                          onClick={() => handleStartEdit(member)}
                          className="text-stone-400 hover:text-orange-700 p-1.5 rounded-lg hover:bg-orange-50 transition cursor-pointer"
                          title="İsmi Değiştir"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-amber-100 border-t border-amber-200 flex items-center justify-between">
          <div className="text-xs text-amber-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Kişisel verileriniz yalnızca tarayıcınızda saklanır.</span>
          </div>
          <button
            onClick={handleSaveAndClose}
            className="py-2.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-md cursor-pointer transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            Kaydet & Devam Et
          </button>
        </div>
      </div>
    </div>
  );
};
