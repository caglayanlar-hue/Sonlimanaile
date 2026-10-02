import { DailyGame } from '../types';

export const DAILY_GAMES: DailyGame[] = [
  {
    id: 'game-1',
    title: 'Tencere ve Kapak (Empati Eşleştirme)',
    subtitle: 'Birbirini Tamamlama ve Dinleme Oyunu',
    durationMinutes: 15,
    materialsNeeded: 'Sadece aile fertleri ve iki sandalye',
    howToPlay: [
      'İki aile ferdi sırt sırta oturur (Örneğin Anne ve Çocuk veya Baba ve Çocuk).',
      'Bir moderatör soru sorar: "En sevdiği yemek ne?", "Hangi çizgi filmi/şarkıyı çok sever?", "Kızınca ne yapar?"',
      'Aynı anda 3\'e kadar sayılır ve iki kişi de cevabını sesli söyler.',
      'Cevaplar uyuşursa 1 "Tencere-Kapak Uyum Puanı" kazanılır! En çok puanı toplayan ikili haftanın uyum şampiyonu olur.'
    ],
    familyValue: 'Birbirimizin zevklerini, alışkanlıklarını ve hislerini ne kadar dikkatli gözlemlediğimizi gösterir.',
    funFactor: 'Kahkaha garantili, sıcacık bir kaynaşma sağlar.'
  },
  {
    id: 'game-2',
    title: 'Alnımdaki Kim? (Post-it Karakteri)',
    subtitle: 'Aile Üyeleri ve Sevilen Karakterleri Tahmin Etme',
    durationMinutes: 20,
    materialsNeeded: 'Küçük yapışkanlı kağıt (post-it) ve bir kalem',
    howToPlay: [
      'Herkes yanındakinin görmeyeceği şekilde bir kağıda ailenin tanıdığı birini (Dede, Anneanne, Öğretmen, Çizgi film karakteri, Kedi) yazar.',
      'Kağıt o kişinin alnına yapıştırılır.',
      'Sırası gelen kişi yalnızca "Evet" ya da "Hayır" cevabı alabileceği sorular sorar: "Ben insan mıyım?", "Gözlük takar mıyım?", "Mutfakta çok zaman geçirir miyim?"',
      'En az soruda kim olduğunu bulan turu kazanır.'
    ],
    familyValue: 'Soru sorma, mantık yürütme ve neşeli iletişim becerilerini güçlendirir.',
    funFactor: 'Alnında kağıtla komik sorular sormak çocukları çok eğlendirir.'
  },
  {
    id: 'game-3',
    title: 'Cümle Tamamlama & Sevgi Zinciri',
    subtitle: 'Kalpten Gelen İtiraflar',
    durationMinutes: 15,
    materialsNeeded: 'Yumuşak bir top veya küçük bir minder',
    howToPlay: [
      'Herkes daire şeklinde oturur. Topu elinde tutan kişi bir cümlenin başını söyler ve topu birine atar.',
      'Örnek cümle başları: "Senin en çok şu huyunu seviyorum çünkü...", "Sen bana gülümsediğinde kendimi...", "Birlikte şunu yaptığımız gün çok mutlu olmuştum..."',
      'Topu yakalayan kişi cümleyi içtenlikle tamamlar ve yeni bir sevgi cümlesiyle topu bir başkasına atar.',
      'Herkes en az iki kez konuşana kadar oyun devam eder.'
    ],
    familyValue: 'Duyguları ifade etme, takdir etme ve aile içi sevgi bağlarını sağlamlaştırma.',
    funFactor: 'Kalpleri ısıtan ve gözleri parıldatan duygusal bir sıcaklık yaratır.'
  },
  {
    id: 'game-4',
    title: 'Sessiz Sinema: Bizim Aile Halleri',
    subtitle: 'Ailenin Unutulmaz Anlarını Canlandırma',
    durationMinutes: 25,
    materialsNeeded: 'Hiçbir malzemeye gerek yok',
    howToPlay: [
      'Aile iki gruba ayrılır.',
      'Bir kişi konuşmadan, yalnızca beden dili ve jestlerle ailede yaşanmış komik bir olayı canlandırır (Örn: "Babanın mangal yakarken dumanaltı olması", "Annenin süt taşınca koşması", "Piknikte voleybol maçı").',
      'Kendi takımı 1 dakika içinde olayı doğru tahmin etmeye çalışır.',
      'Doğru tahmin edilen her anı aileye tebessüm dolu puanlar kazandırır.'
    ],
    familyValue: 'Eski güzel anıları hatırlamak ve birlikte kendi hallerine gülebilmek.',
    funFactor: 'Müthiş enerjik ve bol kahkahalı bir akşam etkinliği.'
  },
  {
    id: 'game-5',
    title: 'Hikâye Tamamlamace (Duvardaki Saat Maceraları)',
    subtitle: 'Hayal Gücü ve Ortak Masal Kurma',
    durationMinutes: 20,
    materialsNeeded: 'Sıcak bir demlik çay veya ıhlamur',
    howToPlay: [
      'En küçük aile üyesi hikâyeye bir başlangıç cümlesiyle başlar: "Bir gün salonumuzdaki duvardaki saat aniden tersine dönmeye başlamış ve..."',
      'Yanındaki kişi bu cümlenin ardından 2 cümle daha ekleyerek macerayı sürdürür.',
      'Sırayla herkes bir bölüm ekler; hikâye orman pikniğine, zaman makinesine, konuşan kaftana veya uzaya kadar gidebilir!',
      'En son konuşan aile büyüğü hikâyeye mutlu ve anlamlı bir son bağlar.'
    ],
    familyValue: 'Dinleme sabrı, ortak yaratıcılık ve dili zengin kullanma becerisi.',
    funFactor: 'Beklenmedik sürpriz sonlar ve çocukların sınırsız hayal dünyası.'
  },
  {
    id: 'game-6',
    title: 'Kulaktan Kulağa Sevgi Fısıltısı',
    subtitle: 'Sözlerin Büyüsü ve Dikkat Oyunu',
    durationMinutes: 10,
    materialsNeeded: 'Hiçbir malzeme gerekmez',
    howToPlay: [
      'Aile üyeleri yan yana dizilir.',
      'İlk kişi en baştakinin kulağına içinde sevgi ve tekerleme olan uzunca bir cümle fısıldar: "Bizim evde demlenen sıcacık çay gibi sevgimiz hiç soğumaz."',
      'Herkes yanındakine sadece bir kez hızlıca fısıldar.',
      'En sondaki kişi cümleyi yüksek sesle söyler ve cümlenin nasıl dönüştüğüne birlikte gülünür!'
    ],
    familyValue: 'Dikkatli dinleme ve dil şakaları üzerinden yakınlık kurma.',
    funFactor: 'Cümlenin komik bir şekilde değişmesi kahkahalara yol açar.'
  },
  {
    id: 'game-7',
    title: 'Ev İçi Sevgi Dedektifi',
    subtitle: 'Gizli İyilikler ve İpuçları',
    durationMinutes: 30,
    materialsNeeded: 'Küçük kağıtlar ve gizli notlar',
    howToPlay: [
      'Günün başında her aile ferdi bir torbadan başka birinin adını gizlice çeker.',
      'Gün boyunca seçtiği kişiye hissettirmeden 1 gizli iyilik yapar (Örn: yatağını düzeltmek, sevdiği kalemi masasına koymak, gizli bir not iliştirmek).',
      'Akşam toplantısında herkes "Benim gizli dedektifim kimdi?" tahmininde bulunur!',
      'Doğru tahminler ve tatlı sürprizler paylaşılır.'
    ],
    familyValue: 'Fark ettirmeden iyilik yapmanın, empati kurmanın ve inceliğin zevkini öğretir.',
    funFactor: 'Gizemli ipuçlarını takip etmek aileye heyecan katar.'
  }
];
