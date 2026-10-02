import React, { useState, useEffect } from 'react';
import { Bell, BellRing, Clock, Coffee, Sparkles, Check, Volume2, X, Settings2 } from 'lucide-react';
import { playMeetingChime, requestNotificationPermission, sendBrowserNotification } from '../utils/notification';

interface MeetingReminderProps {
  onGoToMeeting: () => void;
}

export const MeetingReminderBanner: React.FC<MeetingReminderProps> = ({ onGoToMeeting }) => {
  const [meetingDate, setMeetingDate] = useState<string>(() => {
    return localStorage.getItem('aile_meeting_date') || new Date().toISOString().split('T')[0];
  });
  const [meetingTime, setMeetingTime] = useState<string>(() => {
    return localStorage.getItem('aile_meeting_time') || '20:00';
  });

  const [reminderMinutes, setReminderMinutes] = useState<number>(() => {
    return Number(localStorage.getItem('aile_reminder_mins') || '15');
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    return typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted';
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [timeRemainingStr, setTimeRemainingStr] = useState<string>('');
  const [isMeetingDue, setIsMeetingDue] = useState<boolean>(false);
  const [hasNotified, setHasNotified] = useState<boolean>(false);

  // Check meeting time and calculate countdown every 10 seconds
  useEffect(() => {
    const checkSchedule = () => {
      if (!meetingDate || !meetingTime) return;

      const [hours, minutes] = meetingTime.split(':').map(Number);
      const scheduledDateTime = new Date(meetingDate);
      scheduledDateTime.setHours(hours || 20, minutes || 0, 0, 0);

      const now = new Date();
      const diffMs = scheduledDateTime.getTime() - now.getTime();
      const diffMinutes = Math.floor(diffMs / (1000 * 60));

      if (diffMs <= 0 && diffMs > -1000 * 60 * 120) {
        // Meeting is currently happening (within 2 hours)
        setIsMeetingDue(true);
        setTimeRemainingStr('Toplantı Zamanı Geldi!');

        if (!hasNotified) {
          sendBrowserNotification(
            '🫖 Aile Toplantısı Vakti Geldi!',
            'Çaylar demlensin, ıhlamurlar hazırlansın! Aile meclisimiz toplanıyor.'
          );
          setHasNotified(true);
        }
      } else if (diffMs > 0) {
        setIsMeetingDue(false);
        const days = Math.floor(diffMinutes / (60 * 24));
        const remHours = Math.floor((diffMinutes % (60 * 24)) / 60);
        const remMins = diffMinutes % 60;

        let str = '';
        if (days > 0) str += `${days} gün `;
        if (remHours > 0) str += `${remHours} saat `;
        str += `${remMins} dakika kaldı`;
        setTimeRemainingStr(str);

        // Check if within reminder window
        if (diffMinutes <= reminderMinutes && !hasNotified) {
          sendBrowserNotification(
            `🔔 Aile Toplantısına ${diffMinutes} Dakika Kaldı!`,
            'Sıcak çaylar ve kurabiyeler eşliğinde haftalık meclisimiz başlamak üzere.'
          );
          setHasNotified(true);
        }
      } else {
        setIsMeetingDue(false);
        setTimeRemainingStr('Planlanmış Toplantı');
      }
    };

    checkSchedule();
    const interval = setInterval(checkSchedule, 10000);
    return () => clearInterval(interval);
  }, [meetingDate, meetingTime, reminderMinutes, hasNotified]);

  const handleEnableNotifications = async () => {
    const res = await requestNotificationPermission();
    if (res === 'granted') {
      setNotificationsEnabled(true);
      sendBrowserNotification(
        '🎉 Bildirimler Aktif Edildi!',
        'Aile toplantısı zamanı geldiğinde tarayıcınız sizi tatlı bir çan sesiyle uyaracak.'
      );
    }
  };

  const handleTestNotification = () => {
    sendBrowserNotification(
      '🫖 Test Bildirimi: Aile Toplantısı Hatırlatıcısı',
      'Tavşan kanı çay demlendi, fırından taze kurabiye kokuları yükseliyor! Aile meclisi başlıyor.'
    );
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  const handleSaveReminderSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('aile_meeting_date', meetingDate);
    localStorage.setItem('aile_meeting_time', meetingTime);
    localStorage.setItem('aile_reminder_mins', reminderMinutes.toString());
    setHasNotified(false);
    setIsSettingsOpen(false);
  };

  return (
    <div className="mb-6">
      {/* Active Reminder Bar */}
      <div
        className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md ${
          isMeetingDue
            ? 'bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 text-white border-orange-300 animate-pulse'
            : 'bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-amber-950 border-orange-300'
        }`}
      >
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-xs shrink-0 ${
              isMeetingDue ? 'bg-white text-orange-600' : 'bg-orange-600 text-white'
            }`}
          >
            {isMeetingDue ? <BellRing className="w-5 h-5 animate-bounce" /> : <Bell className="w-5 h-5" />}
          </div>

          <div>
            <div className="text-xs sm:text-sm font-serif font-black flex items-center justify-center sm:justify-start gap-1.5">
              <span>Haftalık Aile Toplantısı Hatırlatıcısı</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isMeetingDue ? 'bg-white/30 text-white' : 'bg-orange-200 text-orange-900'
                }`}
              >
                {timeRemainingStr || 'Yaklaşıyor'}
              </span>
            </div>
            <div className="text-[11px] opacity-90 font-medium">
              📅 Toplantı Vakti: <strong>{meetingDate}</strong> Saat: <strong>{meetingTime}</strong> (Çay & Kurabiye Saati)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleTestNotification}
            className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
              isMeetingDue
                ? 'bg-white/20 hover:bg-white/30 text-white border-white/40'
                : 'bg-white hover:bg-orange-50 text-orange-950 border-orange-300 shadow-2xs'
            }`}
            title="Zil sesi ve bildirim kontrolü"
          >
            <Volume2 className="w-3.5 h-3.5 text-orange-600" />
            <span>{testSent ? 'Çalıyor! 🔔' : 'Sesi Test Et'}</span>
          </button>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className={`py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
              isMeetingDue
                ? 'bg-white/20 hover:bg-white/30 text-white border-white/40'
                : 'bg-white hover:bg-orange-50 text-orange-950 border-orange-300 shadow-2xs'
            }`}
          >
            <Settings2 className="w-3.5 h-3.5 text-orange-600" />
            <span>Hatırlatma Ayarı</span>
          </button>

          <button
            onClick={onGoToMeeting}
            className="py-1.5 px-4 bg-orange-700 hover:bg-orange-800 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer transition"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-300" />
            <span>Toplantı Masasına Geç</span>
          </button>
        </div>
      </div>

      {/* Reminder & Notification Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-amber-50 text-stone-900 w-full max-w-md rounded-3xl shadow-2xl border-2 border-orange-400 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-amber-700 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BellRing className="w-5 h-5 text-amber-300" />
                <h3 className="font-serif font-black text-lg text-white">
                  Toplantı Hatırlatıcı Ayarları
                </h3>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-white hover:bg-white/20 p-1.5 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReminderSettings} className="p-6 space-y-4">
              {/* Browser Notification Permission Button */}
              <div className="p-4 bg-white rounded-2xl border border-amber-300 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">
                    Masaüstü / Tarayıcı Bildirimleri
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      notificationsEnabled
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {notificationsEnabled ? 'Açık ✓' : 'Kapalı'}
                  </span>
                </div>
                <p className="text-xs text-stone-600">
                  Toplantı vakti geldiğinde ekranınızda açılır pencere ve çay bardağı tınısıyla haber verir.
                </p>
                {!notificationsEnabled && (
                  <button
                    type="button"
                    onClick={handleEnableNotifications}
                    className="w-full py-2 px-3 bg-orange-700 hover:bg-orange-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    Bildirimlere İzin Ver
                  </button>
                )}
              </div>

              {/* Date & Time Input */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Toplantı Tarihi
                  </label>
                  <input
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full text-xs font-medium rounded-xl border border-amber-300 p-2.5 bg-white text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Toplantı Saati
                  </label>
                  <input
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full text-xs font-medium rounded-xl border border-amber-300 p-2.5 bg-white text-stone-800"
                  />
                </div>
              </div>

              {/* Timing selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Ne Zaman Hatırlatılsın?
                </label>
                <select
                  value={reminderMinutes}
                  onChange={(e) => setReminderMinutes(Number(e.target.value))}
                  className="w-full text-xs font-medium rounded-xl border border-amber-300 p-2.5 bg-white text-stone-800"
                >
                  <option value={0}>Toplantı tam saatinde</option>
                  <option value={15}>Toplantıya 15 dakika kala (Çay demleme vakti)</option>
                  <option value={30}>Toplantıya 30 dakika kala</option>
                  <option value={60}>Toplantıya 1 saat kala</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2 border-t border-amber-200">
                <button
                  type="button"
                  onClick={handleTestNotification}
                  className="py-2 px-3 bg-amber-200 hover:bg-amber-300 text-orange-950 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Sesi Çal
                </button>

                <button
                  type="submit"
                  className="py-2.5 px-5 bg-orange-700 hover:bg-orange-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition"
                >
                  <Check className="w-4 h-4" />
                  Ayarları Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
