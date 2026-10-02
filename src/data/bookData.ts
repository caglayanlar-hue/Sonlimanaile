import { Story } from '../types';

export const BOOK_METADATA = {
  mainHeading: 'Bilsem Öğrencilerinin Kaleminden Aile Dediğin',
  title: 'Aile Dediğin',
  subtitle: 'BİLSEM Öğrencilerinin Kaleminden Sımsıcak Aile Öyküleri',
  coreQuotes: [
    'Aile, insanın ruhunu ısıtan en eski ocaktır.',
    'Aile, en karanlık yollarda bile insanın önünü aydınlatan tek fenerdir.',
    'Bir sorunun varsa onu saklamak yarayı derinleştirir, paylaşmak ise şifa getirir.',
    'Ailece yer sofrasında yenilen o sıcak yemeğin tadı, dünyanın en lüks sofralarından daha değerlidir.',
    'Kendin gibi olmak bir kusur değil, en büyük özgürlüktür; aile ise sığınılacak en güvenli limandır.',
    'Bazı eşyalar ses kaydetmez, bazı sesler zaman kaydeder.',
    'Mutlu olmak için iki şey gerekir: mutlu bir aile ve huzurlu pazar günleri.'
  ]
};

export const STORIES: Story[] = [
  {
    id: 'mirasin-gercek-sahibi',
    title: 'Mirasın Gerçek Sahibi',
    author: 'Ertuğrul ERDEM',
    category: 'Vefa & Maneviyat',
    summary: 'Dedelerinden yadigâr paha biçilmez antika kaftanı telefon almak için satmak isteyen telefon bağımlısı bir aile ve o kaftanın gerçek vefasını anlayan genç çobanın öyküsü.',
    keyQuote: 'Dedelerden mirastır bu bana, satılık değildir!',
    familyDiscussionPrompt: 'Evinizde sizin için paradan veya telefondan çok daha kıymetli manevi bir hatıra veya aile yadigârı var mı? Ona ne kadar kıymet veriyoruz?',
    paragraphs: [
      'Bir zamanlar, dört duvarı teknolojiyle örülü bir evde yaşayan bir aile vardı. Bu ailenin elinde, dedelerinden yadigâr kalan, ipek kumaşlı antika bir kaftan bulunurdu. Sözde çok değerliydi; ondan bir ikincisi daha dikilmemişti bu topraklarda. Ama gelgelelim, bizim bu telefon kolik aile ona hiç kıymet vermezdi.',
      'Kaftanı bazanın altına tıkıştırmışlardı. Onlar için manevi hazinelerin bir değeri yoktu. Gözleri telefon ekranından başka bir şey görmezdi çünkü. İster milattan önce olsun ister milattan sonra, onlar sadece dijital bir zamana hapsolmuşlardı. Tek dertleri, o kaftanı satıp elde edecekleri parayla telefon modellerini yükseltmekti.',
      'Bir gün, o büyük planı gerçekleştirmek için bazayı kaldırdılar. Uçar gibi gittiler servetlerinin yanına ama bir de baktılar ki, kaftan yok! Şaşırdılar diyeceğim ama inanın umurlarında bile olmadı. "Aman canım, sağlık olsun." deyip tekrar telefonlarına gömüldüler. Oysa bir bilseler o kaftan ne ellere düştü... Kader mi taşıdı bilinmez; kaftan bizim gariban, genç çobanın nasibi oluverdi.',
      'Kış kapıdaydı, hatta ayazı gelmişti bile. Ne yapsın bizim fakir çoban? Bulduğu bu kalın kumaşlı kaftanı sırtına attığı gibi evin yolunu tuttu. Kulübesine girdiğinde soba gürül gürül yanmış, közlenen patates kokuları her yeri sarmıştı. Gece oldu, yatak serildi. Yorgan yetmeyince "kaftan kaftan üstüne" dedi, örtündü o tarihi mirası üzerine. Anadolu sıcaklığı ile birbirlerine karıştılar. Çoban, üzerindeki bu kumaşa bakıp mırıldandı: "Nereden geldin sen böyle?"',
      'İşte o an bir mucize oldu. Bizim kaftan dile geldi, cevap vermez mi! "Bilmem ki..." dedi derin, yorgun bir sesle: "Bildiğim tek şey, geldiğim yerde kültürel mirasa değer verilmiyordu. Benim geldiğim o diyarda, adına telefon dedikleri bir icat bulmuşlar, insanlar kafalarını o ışıktan kaldırmıyorlar. Dedelerinden mirastım oysa ben. Baş tacı edilmem gerekirken, bazaların altına atıldım. Ama seni gördüğüm anda anladım vefanı. Artık sana yoldaşım."',
      'Ertesi gün pazara gittiklerinde bir antikacı çobanın yolunu kesti: "Evlat, ver bana sırtındaki şu kaftanı, al şu yüklü miktar parayı. Hayatın kurtulur bu parayla." Çoban bakmış paraya... Alsa zengin olurdu ama hiç düşünmeden reddetmiş: "Ne yapayım ben bu parayı beyim? Benim paha biçilemez, vefalı bir kaftanım var. Üstüne bir de çobanlık yapıyorum. Çok şükür, kazanıyorum ekmeğimi. Ne diye açgözlülük yapayım şu üç günlük dünyada? Dedelerden mirastır bu bana, satılık değildir!" Çoban bu cevabı verince, kaftan anlamış yeni sahibinin değerini. O günden sonra sevmişler, ısıtmışlar birbirlerini ölene kadar.'
    ]
  },
  {
    id: 'tencere-yuvarlanmis',
    title: 'Tencere Yuvarlanmış, Hikayesini Bulmuş',
    author: 'Ertuğrul ERDEM',
    category: 'Mutfak & Birlik',
    summary: 'Mutfaktaki emektar çelik bir tencerenin samimi fısıltıları: Taşırılan sütler, çaydanlığın esprileri, ramazan sofrası ve kapağı olmadan bir hiç olduğunu anlayan bir tencere.',
    keyQuote: 'Biz tencerelerin kaderi ne yemekle ne de ateşle ilgili. Bizim bütün olayımız "kapak". Çünkü o üzerime kapandığında ben bir bütünüm.',
    familyDiscussionPrompt: 'Bir ailede herkes bir tencere ve kapak gibi birbirini nasıl tamamlar? Biz birbirimizin eksiklerini nasıl kapatıyoruz?',
    paragraphs: [
      'Bu bir kere yaşayacağımız hayatta bir "tencere" olmak size boş ve çok anlamsız geliyor, değil mi? Ben öyle vitrinde süs diye duran çıtkırıldım porselen tencerelerden değilim. Gövdemde yılların izini taşıyan, orta boy, emektar bir tencereyim. Sol yanımda geçen bayram sert telle ovulduğum için kalan minik bir çizik var; o benim savaş madalyam. Kulplarım biraz gevşek ama sıcağa gelince kimsenin elini yakmam, vefalıyımdır.',
      'Annelerin o güzel elleri ile yaptıkları yemeklerin ilk gurmesi olmak benim işim. İçimdeki su kaynamaya başladığında kapağımın tıkır tıkır oynamasıyla ritim tutmak, mutfakta bir konser veriyormuş gibi hissetmek... Bazen anneniz sütü koyduktan sonra kahvesini alıp dizisinin başına geçer ya... Ben dayanamayıp o sütü köpürterek taşırıveririm. Ocaktaki çaydanlık hemen esprisini patlatır: "Ah çocuğum, bak yine ortalık karıştı!"',
      'En sevdiğim zaman ise Ramazan Ayı. Akşam vakti yaklaşınca o kalabalık sofranın gürültüsü, küçüğün tekne orucu sevinci, içimde demlenen pilavın kokusu paha biçilemez. Ama durun... Size bir sır vereyim mi? Asıl mesele dolu veya boş olmak değilmiş. Mutfak ışığı kapandı, evin babası içeri girdi ve kapağımı kaldırdı.',
      'İşte o an gerçeği fark ettim: Biz tencerelerin kaderi ne yemekle ne de ateşle ilgili. Bizim bütün olayımız "kapak". Çünkü o üzerime kapandığında ben bir bütünüm, o gittiğinde ise sadece içi boş bir metalim. Atalarınız boşuna dememiş "Tencere yuvarlanmış, kapağını bulmuş" diye. Kapağım yanımda oldukça karanlık dolaplar bile bana vız gelir.'
    ]
  },
  {
    id: 'zaman-yolculugu-ve-aile-hasreti',
    title: 'Zaman Yolculuğu ve Aile Hasreti',
    author: 'Sahra KARAKAYA',
    category: 'Zaman & Özlem',
    summary: 'Odasında ailesinin eski günlerine hasret çeken bir kahramanın zaman makinesiyle geçmişe yaptığı duygu dolu yolculuk ve aile şiiri.',
    keyQuote: 'Benim ailem tıpkı bir sur gibidir, beni bütün kötülüklerden korur.',
    familyDiscussionPrompt: 'Zaman makineniz olsaydı ailemizle birlikte geçmişteki hangi güne veya ana geri dönmek isterdiniz?',
    paragraphs: [
      'Yatağımda öylece uzanıyordum. Odanın sessizliği içinde aklıma ailem düştü yine. Ne kadar güzel, ne kadar renkli anılarımız vardı. Ama şimdi hepsi birer birer uçup gitmiş, gri bir toz bulutuna dönüşmüştü. Odamın köşesinde duran o icat geldi aklıma: Zaman makinem. Ailemi o kadar özlemiştim ki mantığım susmuş, kalbim konuşuyordu.',
      'Makinenin içine yerleştim. Gözümü açtığımda büyük bir salonun kürsüsündeydim. Elimde mikrofon vardı ve ezberimdeki mısraları okuyordum: "Benim ailem tıpkı dalları sarıp sarmalayan yapraklara benzer / Onlar sürekli beni korur. Benim ailem tıpkı bir sur gibidir / Beni bütün kötülüklerden korur / Benim ailem tıpkı gökten düşen bembeyaz kar tanesi gibidir / Söyledikleri her söz etrafı neşelendirir / Benim ailem tıpkı melodi gibidir / Yaptıkları her şey bana huzur verir."',
      'Sonra kendimi yemyeşil bir çayırda buldum. Ailemle piknik yapıyorduk. Minik kardeşim rüzgarla dans eder gibi dönüyordu. Başka bir zamana savruldum; burası yuvamdı. Evin içi buram buram lavanta kokardı. Annemin kadife sesiyle söylediği ninniler, vadideki çiçekler...',
      'Makine durup odama geri döndüğümde şunu anladım: Aile, sadece bir yuva değil, insanın ruhunu ısıtan en eski ocaktır. Birbirimize sarılmak ve şimdiki zamanın kıymetini bilmek her şeyden değerlidir.'
    ]
  },
  {
    id: 'en-buyuk-hazinem-ailem',
    title: 'En Büyük Hazinem: Ailem',
    author: 'Sahra KARAKAYA',
    category: 'Sevgi & Dayanışma',
    summary: 'Orman pikniği, voleybol maçı, dahi babanın matematik kutu oyunu şampiyonluğu ve ablanın akşam çayında hediye ettiği sürpriz aile tuvali.',
    keyQuote: 'En büyük değerim ailem. Ailemden daha değerli, paha biçilemez bir hazinem yok.',
    familyDiscussionPrompt: 'Ailemizdeki herkesin en sevdiğiniz ve size güç veren özelliği nedir?',
    paragraphs: [
      'Penceremden sızan güneş ışıklarıyla mutlu bir sabaha uyandım yine. Annem mutfaktan "Uyandın mı uykucu?" dedi. Peynirler, zeytinler ve sıcak çay eşliğinde kahvaltımızı yaptıktan sonra piknik malzemelerini hazırlamaya başladık. Çünkü bugün büyük piknik günüydü!',
      'Şehirden uzaklaşıp çam kokularının kuş cıvıltılarına karıştığı bir ormana gittik. Kırmızı kareli piknik örtüsünü serdik. Babamla hamak kurduk. Ablam kulağında kulaklığıyla ritim tutarak dans eder gibi anneme yardım ediyordu. Mavi voleybol topunu alıp yeşilliklerin üzerinde voleybol oynamaya başladık. Çıkan kahkahalar ormanda yankılanıyordu.',
      'Ablam müzik bağımlısıydı ama resim çizmeyi de çok severdi. Annem ailede en çok güler yüzlümüzdür; yüzündeki o sıcak tebessüm hiç eksik olmaz. Babamın eğitimi ilkokul düzeyinde olsa da o, hayat okulunu birincilikle bitirmiş çok zeki bir adamdır. En zor matematik sorusunu beş dakikada çözer.',
      'Akşam eve döndüğümüzde annem tavşan kanı çayları getirdi. Tam o sırada ablam balkona elinde bir tuvalle geldi: Bizi, canım ailemizi çizmişti! Babam "Bu bir sanat eseri, hemen duvara asmalıyız" dedi ve evin en güzel köşesine astı. Çaylarımızı yudumlarken gökyüzündeki ayı ve yıldızları seyrettik. Ailem albümlere sığmayacak en büyük hazinemdir.'
    ]
  },
  {
    id: 'ilmek-ilmek-sevgi',
    title: 'İlmek İlmek Sevgi',
    author: 'Eslim Deniz UŞAR',
    category: 'Fedakarlık & Emek',
    summary: 'Evin emektar halısının gözünden; oduncu babanın yorgun adımları, fedakar annenin duaları, küçük kardeşlerini büyüten ablanın azmi ve sevgiden örülen güçlü bir yuva.',
    keyQuote: 'Çünkü sevgi sahip olunmayanlara üzülmek değil, sahip olunan tek bir yüreğe sımsıkı sarılmaktı.',
    familyDiscussionPrompt: 'Zor zamanlarda birbirimize nasıl destek oluyoruz? Ailemizin sevgisi evimizi nasıl ısıtıyor?',
    paragraphs: [
      'Evin dar ve uzun koridorunun ardındaki o sırrı bir ben bilirim, bir de şu duvarlar. Ben kendimi bildim bileli bu evin halısıyım. Üstümden geçen her adımın hikayesini, bu evdeki saygıyı ve hiç bitmeyen o muhabbeti hep hissettim.',
      'Önce evin babası... O evin direği, sönmeyen umududur. Bir oduncuydu o. Nasırlı elleriyle kazandığı maaşı kıt kanaatti. Ama o baba, yırtık ve yamalı çoraplarıyla üstüme bastığında üzerimdeki o boğuk renkler gider, yerini cıvıl cıvıl neşeli renklere bırakırdı.',
      'Sonra anne gelir... O evin kelebeği, koruyucu meleğiydi. Gün boyu evi didik didik eder, kısıtlı imkanlarla harikalar yaratırdı. Evin büyük kızı küçük omuzlarına kardeşlerinin sorumluluğunu yükler, lamba ışığında ders çalışırdı. Ortanca kız resimler çizer, en küçük bebek ise evin neşesi olurdu.',
      'Tüm bu yokluğa rağmen bu aileyi ayakta tutan tek bir şey vardı: sevgi. Onlar için sevgi, karın doyuran bir ekmek, kışın ısıtan bir hırkaydı. Zaman geçti; o bebek bir ressam, o abla binlerce çocuğu aydınlatan bir öğretmen, elleri nasır tutan kız ise bir doktor oldu. Sevgi, sahip olunan tek bir yüreğe sımsıkı sarılmaktı.'
    ]
  },
  {
    id: 'sessizligin-icindeki-ses',
    title: 'Sessizliğin İçindeki Ses',
    author: 'Eslim Deniz UŞAR',
    category: 'Hatıralar & Zaman',
    summary: '2038 yılında tavan arasında bulunan 1996 yılına ait eski bir kasetçalar ve içindeki yaşlı dede ile torununun yürek titreten samimi kaydı.',
    keyQuote: 'Bazı eşyalar ses kaydetmez, bazı sesler zaman kaydeder.',
    familyDiscussionPrompt: 'Gelecek nesillere ailemizden bir ses veya bir hatıra bırakacak olsaydık bu ne olurdu?',
    paragraphs: [
      '2038 yılının sıcak bir yaz sabahı, eski bir kasaba evinin yıkımında tavan arasında gri renkli, garip bir kutu bulundu: "Kasetçalar". Yanında solgun bir kağıt vardı: "Bu ses belki bana ait olmayacak. Ama bir gün biri dinlerse, bu evde yaşayanlar hiç unutulmamış olacak. — 1996."',
      'Eski cihazı çalıştırdıklarında kasetten yaşlı bir adamın sesi duyuldu: "Bu kaseti dinleyen kimse... Belki beni tanımıyorsun, belki yüzümü hiç görmedin. Ama ben bu sesi kaydederken tek bir şey istedim: Bir gün biri duysun ve anlasın ki, biz bu evde sadece yaşamadık... Sevdik, bekledik, hatırladık."',
      'Sonra küçük bir çocuğun neşeli sesi duyuldu: "Dede, sesim kaydoldu mu?" Yaşlı adamın gülüşüyle kaset bitti. Kaseti dinleyen gençler o gün anladılar ki: Bazı eşyalar ses kaydetmez, bazı sesler zaman kaydeder. Ve kimse o kasetçaları atmaya kıyamadı.'
    ]
  },
  {
    id: 'eski-zamanlar',
    title: 'Eski Zamanlar',
    author: 'Fatih Mehmet DEMİRTAŞ',
    category: 'Nostalji & Yuva',
    summary: 'Nehir kenarında uykuya dalan yaşlı bir adamın rüyasında zaman makinesiyle oğlunun 12. yaş gününe ve çocukluk yıllarının anne masallarına dönüşü.',
    keyQuote: 'Meğer hayatın en büyük hediyesi, o hediyeleri ararken birbirimize bakıp geçirdiğimiz vakitmiş.',
    familyDiscussionPrompt: 'Ailemizle kutladığımız en unutulmaz doğum günü veya bayram hangisiydi?',
    paragraphs: [
      'Nehir kenarındaki ulu çınarın altında huzur dolu bir uykuya daldım. Rüyada karşıma bir zaman makinesi çıktı ve tereddüt etmeden ilk durağımı yazdım: Eşim ve oğlumla kutladığımız o unutulmaz doğum günü.',
      'Oğlum okuldan dönmüştü, 12. yaşını kutluyorduk. Eşim hediyeleri evin en gizli köşelerine saklamıştı; akşama kadar aramaktan yorulmuştuk. Meğer hayatın en büyük hediyesi, o hediyeleri ararken birbirimize bakıp gülüştüğümüz vakitmiş.',
      'Sonra ilkokul yıllarıma gittim. Kapıda annemle babamın beni karşılaması, sokakta akşam ezanına kadar kardeşimle oyun oynamak, televizyon karşısında çekirdek ailemizle toplanmak ve annemin yatakta okuduğu masal... Kuş cıvıltısıyla uyandığımda şunu anladım: Aile, insanın ruhunu ısıtan en eski ocaktır. O anlar makineler olmasa da kalbimizin en güzel köşesinde yaşar.'
    ]
  },
  {
    id: 'aileyi-ayakta-tutan-sir',
    title: 'Aileden Sır Saklanmaz',
    author: 'Fatih Mehmet DEMİRTAŞ',
    category: 'Dürüstlük & Güven',
    summary: 'Annesinden yadigâr paha biçilmez bakır tepsiyi sandığa saklayan bir adam ve gerçeği ailesiyle paylaştığında ferahlayan vicdanı.',
    keyQuote: 'Aile en karanlık yollarda bile insanın önünü aydınlatan tek fenerdir. Sorunu saklamak yarayı derinleştirir, paylaşmak şifa getirir.',
    familyDiscussionPrompt: 'Bir problem yaşadığımızda ailemize anlatmaktan çekindiğimiz anlar oluyor mu? Açıkça konuşunca nasıl hafifliyoruz?',
    paragraphs: [
      'Eşyaların dile geldiği bir masal şehrinde, bir adamın annesinden yadigâr bakır tepsisi kayboldu ve sonra gizemli bir şekilde geri döndü.',
      'Tepsi dile geldi: "Beni var etmek için koca dağları patlattılar, madenleri talan ettiler. Beni o açgözlü zenginlere geri verirsen doğayı katletmeye devam edecekler!" Adam ne yapacağını şaşırdı. Tepsiyi sandığa kilitledi ama vicdanı onu rahat bırakmadı. Uykusuz bir gecenin ardından karar verdi: "Aile arasında sır olmaz, bu yükü tek başıma taşıyamam."',
      'Kahvaltı masasında kardeşlerine her şeyi anlattı. Ailesi onu yargılamak yerine dikkatlice dinledi ve adil çözümü sundu. Adam evine dönerken omuzlarındaki yükün hafiflediğini hissetti: "Aile en karanlık yollarda bile insanın önünü aydınlatan tek fenerdir. Çünkü biliyordu ki, bir sorunun varsa onu saklamak yarayı derinleştirir, paylaşmak ise şifa getirir."'
    ]
  },
  {
    id: 'duvardaki-saat',
    title: 'Duvardaki Saat',
    author: 'Eslem Beyza EKMEN',
    category: 'Zaman & Hatıralar',
    summary: 'Salonun başköşesinde 30 yıldır asılı duran emektar saatin gözünden: Çay saatleri, duvarda ölçülen çocuk boyları ve çocukların yazdığı mektuplarla eriyen aile buzları.',
    keyQuote: 'Zaman hızla geçiyor ama yaşanmış güzel anılar asla unutulmuyordu.',
    familyDiscussionPrompt: 'Eskiye göre ailemizde daha az yaptığımız ama hepimizi çok mutlu eden bir alışkanlığımız var mı? Yeniden canlandıralım mı?',
    paragraphs: [
      'Ben bu evin en yaşlı üyesiyim. Salonun başköşesinde tam otuz yıldır zamana şahitlik ediyorum. Zaman deyince aklıma çayın kokusu, çocukların ayak sesleri ve ekmeğin sıcaklığı gelirdi.',
      'Bu evin kuralı televizyon ve telefonun kısıtlı olmasıydı. Her akşam aile meclisi kurulur; Mangala, Dedektif, Kelime Oyunu gibi oyunlar oynanırdı. Gövdemin yanındaki duvarda kurşun kalem çizgileri vardı; babaları her doğum gününde çocukların boyunu ölçerdi: Zeynep, Zehra, Asım...',
      'Ancak bir dönem geldi ki herkes kendi ekranına çekildi. Çay saatleri unutuldu. Sarkacım bu bağın kopmasına dayanamadı ve durdu. Ta ki bir pazar sabahı küçük kardeşler mutfak masasına gizlice birer mektup bırakana kadar... Mektupta "Yine eskisi gibi mutlu bir aile olabilir miyiz? Biz eski günleri çok özledik" yazıyordu. Anne ve babanın gözleri doldu, sarıldılar. İşte o an sarkacım neşeyle yeniden salındı: Tik-tak!'
    ]
  },
  {
    id: 'huzurlu-ev',
    title: 'Huzurlu Ev',
    author: 'Zehra AY',
    category: 'Kardeşlik & Dayanışma',
    summary: 'Evin dört patili kedisi Ottimo ve muhabbet kuşu Limon\'un gözünden: Okulda üzülen kardeşlerin birbirine sarılması ve gerçek dostluğun sırrı.',
    keyQuote: 'Kendin gibi olmak bir kusur değil, en büyük özgürlüktür. Aile ise sığınılacak en güvenli limandır.',
    familyDiscussionPrompt: 'Okulda veya dışarıda canımızı sıkan bir durum olduğunda evimizde birbirimizi nasıl teselli ediyoruz?',
    paragraphs: [
      'Ben evin dört patili üyesi Ottimo, bir kediyim! Evin büyük kızı Nida okuldan üzgün dönüp ağladığında annesi yanına oturdu, saçlarını okşadı ve başarının yeniden denemek olduğunu söyledi. İşte aile buydu: Düştüğünde seni tutan o sıcacık eldi.',
      'Sözü dostum muhabbet kuşu Limon\'a bırakıyorum: Bizim evde küçük Defne okulda dışlandığını gözyaşlarıyla ablası Gamze\'ye anlattığında, ablası ellerini tuttu: "Defne, eğer insanlar seni sırf kendin olduğun için dışlıyorsa gerçek arkadaşlar seni olduğun halinle sevenlerdir." Kardeşler o gün bize öğretti ki: Kendin gibi olmak bir kusur değil, en büyük özgürlüktür; aile ise sığınılacak en güvenli limandır.'
    ]
  },
  {
    id: 'keske-her-gun-pazar-olsa',
    title: 'Keşke Her Gün Pazar Olsa',
    author: 'Büşra ERYİĞİT',
    category: 'Aile Vakti & Huzur',
    summary: 'Haftanın altı günü sınavlar, staj ve iş koşturmacasıyla yorulan bir ailenin buzdolabında kırmızı kalple işaretli tek huzur sığınağı: Pazar günleri.',
    keyQuote: 'Mutlu olmak için iki şey gerekir: mutlu bir aile ve pazar günleri. Sahi, keşke her gün pazar olsa!',
    familyDiscussionPrompt: 'Hafta içi koşturmacasında birbirimize ayırdığımız vakti nasıl daha kaliteli ve keyifli kılabiliriz?',
    paragraphs: [
      'Haftanın altı günü dur durak bilmeden koşturuyoruz. Erkek kardeşim sınavlara hazırlanıyor, kahvaltıyı çiğnemeden yutuyor. Annem ve babam işten başını kaldıramıyor. Ama bu hızlı hayat pazar günleri öylece mola veriyor.',
      'Pazar günleri ailecek zaman geçirdiğimiz tek gün. Öğle vaktine kadar uyuyor, kahvaltıyı yavaş yavaş yapıyoruz. Küçük kardeşim buzdolabındaki takvimde pazar günlerini kalp içine aldı. Pazar günleri kimse işlere elini sürmez. Tepsi kurabiye, sıcak çikolata ve kutu oyunları...',
      'Dışarıda yağmur yağarken eve koştum, tüm aile beni beklemişti. Kutu oyunu oynayıp sıcak çikolata içtik. Mutlu olmak için iki şey gerekir: mutlu bir aile ve pazar günleri. Keşke her gün pazar olsa!'
    ]
  },
  {
    id: 'ailedeki-yaslilarin-teknoloji-ile-imtihani',
    title: 'Ailedeki Yaşlıların Teknoloji ile İmtihanı',
    author: 'Cihangir Kenan YILDIRIM',
    category: 'Mizah & Kuşaklararası Sevgi',
    summary: '68 yaşındaki Halil dedenin Google Asistan ile konuşma çabaları, babaanne Naciyenin sanal sepeti ve torunların dedelerini YouTube şöhretine dönüştürmesi.',
    keyQuote: 'Oğlum ben Asistan\'la değil, patronla konuşurum!',
    familyDiscussionPrompt: 'Büyüklerimizle teknoloji kullanırken yaşadığımız en komik anı neydi? Onlara sabırla rehberlik edebiliyor muyuz?',
    paragraphs: [
      '68 yaşındaki Halil dede internete kafa tutmaya karar verdi: "Bu internet nasıl bir mahluk? Gözle görünmüyor ama her şeyi biliyor." Torunu Ege güldü: "Dede, sesli arama yapabilirsin." Dede telefona eğildi: "Gugıl oğlum, bana kuru fasulye tarifi ver!" Telefon sessiz kalınca Ege "Dede, Google Asistan\'a bas" dedi. Dede ise "Oğlum ben asistanla değil, patronla konuşurum!" dedi.',
      'Babaanne Naciye ise tabletten alışveriş yaparken sordu: "Bu sanal sepet eve mi gelecek? İçine domates de koyayım, pazar parası kurtulur." Akşam dede okulun veliler grubuna tarladaki kazların videosunu atınca ortalık şenlendi. Torunlar dedenin videolarını YouTube\'a yükleyince 20 bin takipçiye ulaştılar. Halil dede tebessümle: "Şu YouTube denen çocuğa misafirliğe gidelim de teşekkür edelim" dedi.'
    ]
  },
  {
    id: 'renkler-nerede',
    title: 'Renkler Nerede?',
    author: 'Zeynep Nevra AY',
    category: 'Neşe & Birliktelik',
    summary: 'Bir sabah dünyadaki tüm renklerin griye dönüştüğü bir dünyada, kedisi Pamuk ve Barış Manço şarkısıyla dünyaya ve evine yeniden sevgi renklerini getiren bir çocuğun öyküsü.',
    keyQuote: 'Dün gece düşündüm de renkler olmasaydı yaşanmazdı bu dünyada... Bırakın renkleri bütün çocuklara!',
    familyDiscussionPrompt: 'Ailemiz bir resim olsaydı içinde hangi canlı ve sıcak renkler bulunurdu?',
    paragraphs: [
      'Bir sabah uyandığımda evimizin ve sokağımızın tüm renkleri kaybolmuş, her şey siyah-beyaz ve gri olmuştu. Neşe de canlılık da gitmişti. Kedim Pamuk beni parka götürdü. Odama dönüp bir kitap açtım, sadece şu yazıyordu: "Bırakın renkleri bütün çocuklara."',
      'Hemen Barış Manço\'nun o şarkısını hatırladım: "Günaydın Çocuklar". Şarkıyı söylemeye başladığım anda odamın duvarları, yatağım, oyuncaklarım rengini bulmaya başladı. Ertesi sabah sokaktaki tüm çocukları topladım, el ele tutuşup dostluk ve sevgi şarkısını söyledik. Dünya renkleriyle, aile ise sevgisiyle güzeldi.'
    ]
  },
  {
    id: 'yagmur-park-ve-anne-sicakligi',
    title: 'Yağmur, Park ve Anne Sıcaklığı',
    author: 'Yusuf ÜNAL',
    category: 'Şefkat & Anne Sıcaklığı',
    summary: 'Parkta sırılsıklam ıslanan bir çocuğun eve dönüşünde annesinin şefkatle sardığı kırmızı kazak, dumanı tüten naneli sıcak çorba ve ıhlamur eşliğinde kitap okuma huzuru.',
    keyQuote: 'Yağmurun sesi, annem, sıcacık yuvam ve kitaplarım... İşte benim mutluluk kaynaklarım.',
    familyDiscussionPrompt: 'Yağmurlu ve soğuk bir günde evimizin sıcaklığını bize en çok hissettiren şey nedir?',
    paragraphs: [
      'İlkokul üçüncü sınıftaydım. Parkta kuru yaprakların arasında oynarken birdenbire yağmur boşaldı ve sırılsıklam oldum. Eve vardığımda annem kapıyı açtı; "Ah yavrum yine mi şemsiyeni unuttun" dedi ama gözlerinde sonsuz bir merhamet vardı.',
      'Annem en kalın kırmızı kazağımı getirdi, üşümüş ellerimi avuçlarıyla ısıttı. Mutfaktan mis gibi nane ve kekik kokan dumanı üzerinde bol limonlu bir çorba getirdi. Uyumadan önce birlikte ıhlamur içtik ve kitap okuduk. Dışarıda yağmur yağarken annemin şefkati, sıcacık yuvam ve kitaplarım benim en büyük mutluluk kaynağımdı.'
    ]
  }
];
