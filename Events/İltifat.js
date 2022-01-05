const ayar = require('../settings.js');
const { MessageEmbed } = require('discord.js');
let iltifatSayi = 0;
let iltifatlar = [
  "Yaşanılacak en güzel mevsim sensin.",
  "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
  "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
  "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
  "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
  "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
  "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
  "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
  "Bir gamzen var sanki cennette bir çukur.",
  "Gecemi aydınlatan yıldızımsın.",
  'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
  'Mavi gözlerin, gökyüzü oldu dünyamın.',
  'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
  'Huzur kokuyor geçtiğin her yer.',
  'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
  'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
  'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
  'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
  'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
  'Etkili gülüş kavramını ben senden öğrendim.',
  'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
  'Gözlerinle baharı getirdin garip gönlüme.',
  'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
  'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
  'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
  'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
  'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
  'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
  'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
  'Biraz Çevrendeki İnsanları Takarmısın ?',
  'İğrenç İnsansın!',
  'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
  'Onu Bunu Boşver de bize gel 2 bira içelim.',
  'Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.',
  'Ben seni çok sevdim...',
  "Yaşanılacak en güzel mevsim sensin.",
  "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
  "fıstık naber?",
  "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
  "Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi...",
  'Mucizelerden bahsediyordum.',
  "hayat ölümse koyam gotune gülümse",
  "Ya al silahı vur beni ya da tak yüzüğü kurana el bas benim ol",
  "Ponçik burnundan ısırırım seni",
  "Bu dünyanın 8. harikası olma ihtimalin?",
  "fıstık naber?",
  "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
  "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
  "Müsaitsen aklım bu gece sende kalacak.",
  "Gemim olsa ne yazar liman sen olmadıktan sonra...",
  "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
  "Sabahları görmek istediğim ilk şey sensin.",
  "Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.",
  "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
  "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
  "Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
  "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
  "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
  "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
  "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
  "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
  "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
  "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
  "Gülüşün ne güzel öyle, cumhuriyetin gelişi gibi..."
];
module.exports = async message => {
  let client = message.client;
  if (message.author.bot) return;
  if (message.content.startsWith(ayar.bot.botPrefix)) return;
  if (message.channel.id != ayar.channels.genelChat) return;
  let iltifat = iltifatlar[Math.floor(Math.random() * iltifatlar.length)];

  iltifatSayi++;
  if (iltifatSayi >= 40) {
  iltifatSayi = 0;
  message.reply(iltifat);

  };
};
