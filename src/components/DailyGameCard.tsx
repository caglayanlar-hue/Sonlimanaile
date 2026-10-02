import React, { useState, useEffect } from 'react';
import { Sparkles, Dices, Play, Pause, RotateCcw, CheckCircle2, Clock, Users, Flame, Heart } from 'lucide-react';
import { DAILY_GAMES } from '../data/dailyGames';
import { DailyGame } from '../types';

export const DailyGameCard: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<DailyGame>(DAILY_GAMES[0]);
  const [timerSeconds, setTimerSeconds] = useState(selectedGame.durationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [playedGames, setPlayedGames] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aile_played_games');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Update timer if game changes
  const handleSelectGame = (game: DailyGame) => {
    setSelectedGame(game);
    setIsTimerRunning(false);
    setTimerSeconds(game.durationMinutes * 60);
  };

  // Random game generator ("Günün Oyununu Çek!")
  const handleRandomGame = () => {
    const randomIndex = Math.floor(Math.random() * DAILY_GAMES.length);
    handleSelectGame(DAILY_GAMES[randomIndex]);
  };

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const togglePlayed = (id: string) => {
    const updated = playedGames.includes(id)
      ? playedGames.filter((g) => g !== id)
      : [...playedGames, id];
    setPlayedGames(updated);
    try {
      localStorage.setItem('aile_played_games', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const formatTimer = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Header Banner - Warm & Vibrant */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-400/50 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/60 text-amber-200 text-xs font-bold border border-amber-300/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Her Güne Bir Aile Oyunu
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-amber-50">
              Birlikte Neşeli Vakit Geçirelim
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl leading-relaxed">
              Özel bir malzeme gerektirmeyen, anne, baba ve çocukların ekranları kapatıp göz göze gelmesini ve kahkahalarla yakınlaşmasını sağlayan geleneksel ve modern oyunlar!
            </p>
          </div>

          {/* Random Game Button */}
          <button
            onClick={handleRandomGame}
            className="py-3 px-6 bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-200 hover:to-yellow-300 text-stone-950 font-black text-sm rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
          >
            <Dices className="w-5 h-5 text-stone-950" />
            Bugünün Oyununu Seç!
          </button>
        </div>
      </div>

      {/* Game Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DAILY_GAMES.map((game) => {
          const isSelected = selectedGame.id === game.id;
          const isPlayed = playedGames.includes(game.id);

          return (
            <button
              key={game.id}
              onClick={() => handleSelectGame(game)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-900 text-white border-amber-800 shadow-md scale-102'
                  : 'bg-white text-stone-800 border-amber-200/80 hover:border-amber-400 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`font-semibold flex items-center gap-1 ${isSelected ? 'text-amber-300' : 'text-amber-800'}`}>
                  <Clock className="w-3 h-3" />
                  {game.durationMinutes} Dk
                </span>
                {isPlayed && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                    Oynandı ✓
                  </span>
                )}
              </div>
              <h4 className={`font-serif font-bold text-sm sm:text-base line-clamp-1 ${isSelected ? 'text-amber-100' : 'text-stone-900'}`}>
                {game.title}
              </h4>
              <p className={`text-xs mt-1 line-clamp-1 ${isSelected ? 'text-amber-200/80' : 'text-stone-500'}`}>
                {game.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Game Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-900/15 shadow-xl space-y-8 animate-fadeIn">
        {/* Title & Game Header */}
        <div className="border-b border-amber-200/80 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Süre: {selectedGame.durationMinutes} Dakika
              </span>
              <span className="text-xs text-stone-500">
                Gereken: <strong>{selectedGame.materialsNeeded}</strong>
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {selectedGame.title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              {selectedGame.subtitle}
            </p>
          </div>

          {/* Timer & Mark as Played */}
          <div className="flex items-center gap-3">
            {/* Interactive Game Timer */}
            <div className="bg-stone-900 text-amber-300 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-inner">
              <span className="font-mono text-xl font-bold tracking-wider">
                {formatTimer(timerSeconds)}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1 text-white hover:text-amber-400 cursor-pointer"
                  title={isTimerRunning ? 'Durdur' : 'Başlat'}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(selectedGame.durationMinutes * 60);
                  }}
                  className="p-1 text-stone-400 hover:text-white cursor-pointer"
                  title="Sıfırla"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={() => togglePlayed(selectedGame.id)}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                playedGames.includes(selectedGame.id)
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {playedGames.includes(selectedGame.id) ? 'Oynadık ✓' : 'Oynandı İşaretle'}
            </button>
          </div>
        </div>

        {/* How to Play Rules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <h4 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-600" />
              Nasıl Oynanır? (Kurallar)
            </h4>
            <div className="space-y-3">
              {selectedGame.howToPlay.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-3 text-sm text-stone-800"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-800 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Family Value & Fun factor */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                Bu Oyun Bize Ne Kazandırır?
              </h5>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {selectedGame.familyValue}
              </p>
            </div>

            <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-rose-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-600" />
                Eğlence Faktörü
              </h5>
              <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-medium">
                {selectedGame.funFactor}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
