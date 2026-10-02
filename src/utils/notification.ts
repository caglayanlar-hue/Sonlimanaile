// Web Audio API & Browser Notification utility for Aile Meclisi

export function playMeetingChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const playBell = (frequency: number, delay: number, duration: number, volume: number = 0.25) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

      gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    };

    // Warm, melodious 3-tone chime (F#5, A5, C#6) mimicking cozy tea bell
    playBell(739.99, 0.0, 0.8, 0.25);
    playBell(880.00, 0.15, 1.0, 0.28);
    playBell(1108.73, 0.35, 1.4, 0.30);
  } catch (e) {
    console.error('Audio play error:', e);
  }
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied';
  }
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (e) {
    console.error('Notification permission error:', e);
    return 'denied';
  }
}

export function sendBrowserNotification(title: string, body: string) {
  playMeetingChime();

  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🫖</text></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🏡</text></svg>'
      });
    } catch (e) {
      console.warn('Native notification failed, falling back:', e);
    }
  }
}
