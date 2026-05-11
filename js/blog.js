/* =====================================================
   PAWCO — blog.js
   Blog: veri, filtreleme, sayfalama, render
   ===================================================== */
'use strict';

// ── BLOG YAZILARI VERİSİ ──────────────────────────────
const BLOG_POSTS = [
  {
    id: 1,
    title: 'Hayvan Barınağı Kurulumu ve Destek Yöntemleri: Sahiplendirme, Bağış ve Gönüllülük Rehberi',
    excerpt: 'Sokakta yaşayan hayvanlar için güvenli alan, düzenli bakım ve kayıt takip büyük önem taşır. Günlük dilde "hayvan barınağı" olarak anılan bu yapılar, yasal mevzuatta çoğunlukla hayvan bakımevi, doğal yaşam alanı veya özel hayvan yaşamevi olarak geçmektedir. Hayvan barınağı...',
    cat: 'kedi-bakimi',
    catLabel: 'Kedi Bakımı',
    date: '30.05.2025',
    author: 'Duru Oz',
    authorRole: null,
    readTime: '8 dk',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=440&h=290&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 2,
    title: 'Muhabbet Kuşlarının Tüketeceği Besinler ve Sağlıklı Beslenme',
    excerpt: 'Muhabbet kuşu beslenme, evcil hayvanınızın sağlıklı, uzun ömürlü ve mutlu bir yaşam sürmesi için dikkat edilmesi gereken konuların başında gelir. Yanlış ya da eksik beslenme, kuşun bağışıklığını zayıflatabilir, tüy...',
    cat: 'kus-beslenmesi',
    catLabel: 'Kuş Beslenmesi',
    date: '17.05.2025',
    author: 'Ayşegül Tunçay',
    authorRole: null,
    readTime: '6 dk',
    img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'DL-Metiyoninin Kedilerde Önemi',
    excerpt: 'Kedilerde üriner sistem sağlığı büyük önem taşır; birçok kedi, yaşamının farklı dönemlerinde idrar yolu sağlığı ile ilgili problemlerle karşılaşabilir. Özellikle evde yaşayan, az hareket eden ve su tüketimi yetersiz kedi kedilerde idrar yolu problemleri sıklıkla görülebilmektedir.',
    cat: 'kedi-sagligi',
    catLabel: 'Kedi Sağlığı',
    date: '15.05.2025',
    author: 'Veteriner Hekim Uğurcan Yavuz',
    authorRole: 'Veteriner Hekim',
    readTime: '5 dk',
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Rüyada Kedi Görmek: Siyah, Beyaz Kediler ve Kediyle İlgili Tüm Rüya Tabirleri',
    excerpt: 'İnsan beyin rüyaları uyarı amaçlı olarak üretir. Bazen işe güçlü bir içgüdü gibi sinyaller alırsınız. Bir görüntü, bir ses bir hayvanı ya da da konuşmayan bir şeyin size hiç olmadığı bir an zihinde bir çıkışı bulur. Rüyada kedi görmek de bu...',
    cat: 'kedi-bakimi',
    catLabel: 'Kedi Bakımı',
    date: '22.05.2025',
    author: 'Deniz Oz',
    authorRole: null,
    readTime: '7 dk',
    img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Kediler Neden Kusar? Kedilerde Kusmayi Önleme Yöntemleri',
    excerpt: 'Kediler zaman zaman kusabilir ve bu durumun birçok farklı nedeni olabilir. Günlük ve geçici bir nedenden kaynaklı ya da daha ciddi bir sağlık sorununa işaret edebilir. Sık tekrarlayan kusma veya yanında başka bulgular olan durumlarda veteriner hekime başvurmak önemlidir.',
    cat: 'kedi-sagligi',
    catLabel: 'Kedi Sağlığı',
    date: '20.04.2025',
    author: 'Veteriner Hekim Tuğba Dinçersen',
    authorRole: 'Veteriner Hekim',
    readTime: '9 dk',
    img: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Evde Bakılabilecek Akvaryum Balıkları: Türler, Bakım ve Uyumluluk Rehberi',
    excerpt: 'Evde akvaryum kurma fikri çoğu zaman renkli balıklara bakma isteğiyle başlar. Sana daha önce önemli sorular geldi: Hangi balıklar birlikte yaşayabilir? Akvaryum kaç litre olmalı? Hangi filtreyi almalısın? Balıkların sağlıklı yaşayabilmesi için su değerlerini nasıl takip edersin?',
    cat: 'balik-turleri',
    catLabel: 'Balık Türleri',
    date: '17.04.2025',
    author: 'Deniz Oz',
    authorRole: null,
    readTime: '11 dk',
    img: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 7,
    title: "Atatürk'ün Köpeği: İsmi, Türü, Hikâyesi ve Hayatındaki Önemi",
    excerpt: 'Atatürk tarihimizin her köşesinde karşılaşılan bir isimdir. Büyük kararları, söylemleri ve reformları anlatılır. Ancak daha az anlatılan yönleri de vardır; bu yönlerin bir bölümünde köpekleri de yer alır. Bizi yakından ilgilendiren en meşhur örnekte Atatürk\'ün köpeği...',
    cat: 'kopek-bakimi',
    catLabel: 'Köpek Bakımı',
    date: '26.04.2025',
    author: 'Deniz Oz',
    authorRole: null,
    readTime: '8 dk',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 8,
    title: 'Evcil Hayvan Beslenmesinde Omega Yağ Asitleri',
    excerpt: 'Omega yağ asitleri kedi ve köpek beslenmesinde sıkça gündeme gelen ancak zaman zaman yüzeysel anlatılan önemli bir konudur. Oysa konuyu biraz yakından bakarsanız, omega 3 ve omega 6\'nın evcil hayvan bakışının sağlık ve yaşam kalitesine katkısını daha açık, daha dürüst ve bunun ortasına eklenmiş baz sapmalarla...',
    cat: 'kedi-beslenmesi',
    catLabel: 'Kedi Beslenmesi',
    date: '24.04.2025',
    author: 'Veteriner Hekim Uğurcan Yavuz',
    authorRole: 'Veteriner Hekim',
    readTime: '10 dk',
    img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 9,
    title: 'Sevgi Dolu Uzmanlık',
    excerpt: 'Uzmanlarımız bağı çoğu zaman kelimelerden öte bulunmaktadır. Onlar hayatınıza dahil olan, yanınıza evcil hayvanınızla birlikte gelen birini yalnız hissettirmeyi, bir arkadaş, bir abi gibi bakan, birlikte olması ve birlikte yaşam durumunun sorumluluğunu ön sıralara taşıdıklarında çok daha özgün ve bağlı günleri paylaşan insanlardır.',
    cat: 'kedi-bakimi',
    catLabel: 'Kedi Bakımı',
    date: '24.04.2025',
    author: 'Burcu Tunakan',
    authorRole: null,
    readTime: '4 dk',
    img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 10,
    title: 'Palyaço Balığı (Anemon Balığı) Rehberi: Türlerden Beslenmeye, Üremeden Hastalıklara',
    excerpt: 'Dünyanın sayısız akvaryum filminde turuncu rengi ve beyaz çizgileriyle görüntüsüyle Küçük balık olarak kabul edilenin doğru yerindedir. Bircok kişi bu balığı keşfetmiş; zararlı, hareketli ve dikkat çeken görüntüsüyle akvaryum meraklılarını büyüleyen bir tür...',
    cat: 'balik-turleri',
    catLabel: 'Balık Türleri',
    date: '24.04.2025',
    author: 'Deniz Oz',
    authorRole: null,
    readTime: '12 dk',
    img: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 11,
    title: 'Yavru Köpeklerde Sosyalleşme: Ne Zaman ve Nasıl Başlamalı?',
    excerpt: 'Yavru bir köpeğin ilk haftaları, ilerleyen yaşam kalitesi açısından kritik önem taşır. Bu dönemde kazanılan deneyimler, köpeğin diğer hayvanlarla, insanlarla ve farklı çevreyle olan ilişkisini şekillendirir.',
    cat: 'yavru-kopek',
    catLabel: 'Yavru Köpek',
    date: '18.03.2025',
    author: 'Veteriner Hekim Tuğba Dinçersen',
    authorRole: 'Veteriner Hekim',
    readTime: '7 dk',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 12,
    title: 'Kedi Kumu Seçerken Dikkat Edilmesi Gerekenler',
    excerpt: 'Kedi sahibinin günlük rutininde önemli bir yer tutan kedi kumu seçimi, dostunuzun tuvaletini doğru şekilde kullanmasını ve ev hijyenini doğrudan etkiler. Topaklanan, kristal, bitkisel ve çam pellet kumu arasındaki farkları öğrenin.',
    cat: 'kedi-bakimi',
    catLabel: 'Kedi Bakımı',
    date: '05.04.2025',
    author: 'Ayşegül Tunçay',
    authorRole: null,
    readTime: '6 dk',
    img: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 13,
    title: 'Hamster Bakımında Sık Yapılan 10 Hata',
    excerpt: 'Hamsterlar küçük bedenleri ve sevimli görünüşleriyle yeni evcil hayvan sahiplerinin sıkça tercih ettiği hayvanlar arasındadır. Ancak bu küçük dostların özel gereksinimleri vardır ve pek çok yaygın hata onların yaşam kalitesini ciddi ölçüde etkileyebilir.',
    cat: 'kemirgen-bakimi',
    catLabel: 'Kemirgen Bakımı',
    date: '12.04.2025',
    author: 'Deniz Oz',
    authorRole: null,
    readTime: '8 dk',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 14,
    title: 'Golden Retriever\'da Kalça Displazisi: Belirtiler ve Yaşam Kalitesi',
    excerpt: 'Büyük ırk köpekler arasında en sık görülen ortopedik sorunların başında kalça displazisi gelir. Golden Retriever\'lar genetik yatkınlık açısından risk altındaki ırklardan biri olup erken teşhis yaşam kalitesini büyük ölçüde artırabilir.',
    cat: 'kopek-sagligi',
    catLabel: 'Köpek Sağlığı',
    date: '28.03.2025',
    author: 'Veteriner Hekim Tuğba Dinçersen',
    authorRole: 'Veteriner Hekim',
    readTime: '9 dk',
    img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 15,
    title: 'Kedi Sahiplenmenin Psikolojik Faydaları',
    excerpt: 'Araştırmalar, kedi sahibi olan bireylerin stres ve kaygı düzeylerinin kedi sahibi olmayanlara kıyasla daha düşük olduğunu ortaya koymaktadır. Bir kedinin mırıltısı, serotonin ve oksitosin gibi mutluluk hormonlarının salgılanmasını tetikleyebilir.',
    cat: 'kedi-bakimi',
    catLabel: 'Kedi Bakımı',
    date: '14.03.2025',
    author: 'Burcu Tunakan',
    authorRole: null,
    readTime: '5 dk',
    img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 16,
    title: 'Köpeklerde Diş Sağlığı: Fırçalama ve Önleyici Bakım',
    excerpt: 'Köpeklerde diş taşı birikimi ve diş eti iltihabı oldukça yaygın ancak büyük ölçüde önlenebilir sorunlardandır. Düzenli diş fırçalama alışkanlığı kazandırmak ve veteriner kontrollerini aksatmamak, uzun vadede ciddi sağlık sorunlarının önüne geçer.',
    cat: 'kopek-sagligi',
    catLabel: 'Köpek Sağlığı',
    date: '02.03.2025',
    author: 'Veteriner Hekim Uğurcan Yavuz',
    authorRole: 'Veteriner Hekim',
    readTime: '7 dk',
    img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 17,
    title: 'Muhabbet Kuşu Tüy Dökümesi: Nedenleri ve Çözüm Yolları',
    excerpt: 'Muhabbet kuşlarında periyodik tüy dökümü (tüy değişimi) normaldir; ancak aşırı veya düzensiz tüy kaybı sağlık sorununun işareti olabilir. Beslenme eksikliği, stres, hastalık veya yetersiz ışık gibi etkenler bu duruma yol açabilir.',
    cat: 'kus-bakimi',
    catLabel: 'Kuş Bakımı',
    date: '20.02.2025',
    author: 'Ayşegül Tunçay',
    authorRole: null,
    readTime: '6 dk',
    img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 18,
    title: 'Kedi Maması Seçerken Etiket Okuma Rehberi',
    excerpt: 'Piyasada onlarca farklı kedi maması bulunurken hangisini seçeceğinize nasıl karar verirsiniz? Ham protein kaynağı, nem oranı, katkı maddeleri ve yaşa uygunluk gibi kriterleri göz önünde bulundurarak bilinçli bir seçim yapabilirsiniz.',
    cat: 'kedi-beslenmesi',
    catLabel: 'Kedi Beslenmesi',
    date: '10.02.2025',
    author: 'Veteriner Hekim Tuğba Dinçersen',
    authorRole: 'Veteriner Hekim',
    readTime: '10 dk',
    img: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 19,
    title: 'Köpek Eğitiminde Pozitif Pekiştirme Yöntemi',
    excerpt: 'Pozitif pekiştirme, köpeğin istenen bir davranışı gerçekleştirdiğinde ödüllendirilerek bu davranışın tekrarlanma olasılığının artırılmasına dayanır. Bilimsel araştırmalar bu yöntemin hem daha hızlı öğrenmeye hem de köpek-sahip ilişkisinin güçlenmesine katkı sağladığını göstermektedir.',
    cat: 'kopek-egitimi',
    catLabel: 'Köpek Eğitimi',
    date: '28.01.2025',
    author: 'Burcu Tunakan',
    authorRole: null,
    readTime: '8 dk',
    img: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=440&h=290&auto=format&fit=crop',
  },
  {
    id: 20,
    title: 'Kemirgen Kafesi Kurulumu: Hamster ve Kobaylar İçin İdeal Yaşam Alanı',
    excerpt: 'Kemirgen kafesi sadece bir barınak değil, dostunuzun tüm yaşamını geçireceği bir dünyacıktır. Koşu tekeri, tünel sistemi, yem kabı, su şişesi ve uyku alanı gibi unsurların doğru planlanması hayvan refahını doğrudan etkiler.',
    cat: 'kemirgen-bakimi',
    catLabel: 'Kemirgen Bakımı',
    date: '15.01.2025',
    author: 'Deniz Oz',
    authorRole: null,
    readTime: '9 dk',
    img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=440&h=290&auto=format&fit=crop',
  },
];

// ── DURUM ─────────────────────────────────────────────
const state = {
  activeCat:    'all',
  searchQuery:  '',
  currentPage:  1,
  perPage:      10,
  view:         'list',  // 'list' | 'grid'
};

// ── INIT ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  showSkeleton();
  setTimeout(() => {
    render();
  }, 400); // kısa skeleton gösterimi
});

// ── SKELETON ──────────────────────────────────────────
function showSkeleton() {
  const list = document.getElementById('blogList');
  if (!list) return;
  list.innerHTML = Array.from({length: 5}).map(() => `
    <div class="blog-skeleton-row" >
      <div class="blog-skeleton-thumb"></div>
      <div class="blog-skeleton-body">
        <div class="blog-skeleton-line w40"></div>
        <div class="blog-skeleton-line title"></div>
        <div class="blog-skeleton-line w80"></div>
        <div class="blog-skeleton-line w60"></div>
        <div class="blog-skeleton-line w40"></div>
      </div>
    </div>`).join('');
}

// ── FİLTRELEME ───────────────────────────────────────
function getFiltered() {
  let posts = [...BLOG_POSTS];

  if (state.activeCat !== 'all') {
    posts = posts.filter(p => p.cat === state.activeCat);
  }

  if (state.searchQuery.length > 1) {
    const q = state.searchQuery.toLowerCase();
    posts = posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.catLabel.toLowerCase().includes(q) ||
      (p.author && p.author.toLowerCase().includes(q))
    );
  }

  return posts;
}

// ── KATEGORİ FİLTRE ──────────────────────────────────
function filterCat(cat, el) {
  state.activeCat  = cat;
  state.currentPage = 1;

  // aktif class
  document.querySelectorAll('.blog-nav-item, .blog-nav-sub').forEach(n => {
    n.classList.remove('active', 'blog-nav-item--active');
  });
  if (el) el.classList.add(el.classList.contains('blog-nav-item') ? 'blog-nav-item--active' : 'active');

  // Başlık güncelle
  const titleEl = document.getElementById('blogTitle');
  if (titleEl) {
    const catName = el ? el.textContent.replace(/\d+/g, '').trim() : 'Pawco Blog';
    titleEl.textContent = cat === 'all' ? 'Pawco Blog' : catName;
  }

  render();
}

// ── ARAMA ────────────────────────────────────────────
function filterBySearch(query) {
  state.searchQuery  = query;
  state.currentPage  = 1;
  state.activeCat    = 'all';
  document.querySelectorAll('.blog-nav-item, .blog-nav-sub').forEach(n => {
    n.classList.remove('active','blog-nav-item--active');
  });
  const allBtn = document.querySelector('.blog-nav-item');
  if (allBtn) allBtn.classList.add('blog-nav-item--active');
  render();
}

// ── GÖRÜNÜM ───────────────────────────────────────────
function setView(type) {
  state.view = type;
  const list = document.getElementById('blogList');
  if (!list) return;
  if (type === 'grid') {
    list.classList.add('grid-view');
    document.getElementById('gridViewBtn')?.classList.add('active');
    document.getElementById('listViewBtn')?.classList.remove('active');
  } else {
    list.classList.remove('grid-view');
    document.getElementById('listViewBtn')?.classList.add('active');
    document.getElementById('gridViewBtn')?.classList.remove('active');
  }
}

// ── ACCORDION (SOL MENÜ) ──────────────────────────────
function toggleNavGroup(titleEl) {
  const group = titleEl.closest('.blog-nav-group');
  group.classList.toggle('collapsed');
}

// ── ANA RENDER ───────────────────────────────────────
function render() {
  const filtered   = getFiltered();
  const total      = filtered.length;
  const totalPages = Math.ceil(total / state.perPage);
  const start      = (state.currentPage - 1) * state.perPage;
  const pagePosts  = filtered.slice(start, start + state.perPage);

  renderPosts(pagePosts, total);
  renderPagination(totalPages);
}

// ── YAZILARI RENDER ET ────────────────────────────────
function renderPosts(posts, total) {
  const list = document.getElementById('blogList');
  if (!list) return;

  // Grid class koru
  if (state.view === 'grid') list.classList.add('grid-view');
  else list.classList.remove('grid-view');

  if (!posts.length) {
    list.innerHTML = `
      <div class="blog-empty">
        <div class="blog-empty-icon">🔍</div>
        <h3>Sonuç bulunamadı</h3>
        <p>Farklı anahtar kelimeler ya da kategori deneyin.</p>
      </div>`;
    return;
  }

  list.innerHTML = posts.map((p, i) => postHTML(p, i)).join('');
}

function postHTML(p, index) {
  const delay = index * 40;
  return `
  <div class="blog-post-row" style="animation-delay:${delay}ms" onclick="window.location.href='blog-detay.html'">
    <div class="blog-post-thumb">
      <img src="${p.img}" alt="${escHtml(p.title)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=440&h=290&auto=format&fit=crop'"/>
    </div>
    <div class="blog-post-body">
      <div class="blog-post-meta">
        <span class="blog-post-cat">${escHtml(p.catLabel)}</span>
        <span class="blog-post-date">📅 Güncelleme Tarihi: ${p.date}</span>
        <span class="blog-post-author">
          👤 ${escHtml(p.author)}
          ${p.authorRole ? `<span class="blog-post-author-role">· ${escHtml(p.authorRole)}</span>` : ''}
        </span>
      </div>
      <h2 class="blog-post-title">${escHtml(p.title)}</h2>
      <p class="blog-post-excerpt">${escHtml(p.excerpt)}</p>
      <div class="blog-post-footer">
        <a class="blog-read-more" href="#" onclick="event.stopPropagation(); openPost(${p.id})">devamı » </a>
        <span class="blog-post-read-time">⏱ ${p.readTime} okuma</span>
      </div>
    </div>
  </div>`;
}

function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── SAYFALAMA ─────────────────────────────────────────
function renderPagination(totalPages) {
  const pag = document.getElementById('blogPagination');
  if (!pag || totalPages <= 1) { if(pag) pag.innerHTML = ''; return; }

  const cur = state.currentPage;
  let html = '';

  html += `<button class="blog-page-btn" ${cur===1?'disabled':''} onclick="goPage(${cur-1})">‹ Önceki</button>`;

  const range = getPageRange(cur, totalPages);
  let prev = null;
  for (const pg of range) {
    if (prev !== null && pg - prev > 1) html += `<span class="blog-page-ellipsis">…</span>`;
    html += `<button class="blog-page-btn ${pg===cur?'active':''}" onclick="goPage(${pg})">${pg}</button>`;
    prev = pg;
  }

  html += `<button class="blog-page-btn" ${cur===totalPages?'disabled':''} onclick="goPage(${cur+1})">Sonraki ›</button>`;
  pag.innerHTML = html;
}

function getPageRange(cur, total) {
  const delta = 2;
  const set   = new Set([1, total]);
  for (let i = Math.max(2, cur - delta); i <= Math.min(total - 1, cur + delta); i++) set.add(i);
  return [...set].sort((a,b) => a-b);
}

function goPage(page) {
  const total = Math.ceil(getFiltered().length / state.perPage);
  if (page < 1 || page > total) return;
  state.currentPage = page;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── YAZI DETAY (mock) ─────────────────────────────────
function openPost(id) {
  const post = BLOG_POSTS.find(p => p.id === id);
  if (!post) return;
  // Gerçek projede blog-detay sayfasına yönlendirir
  // window.location.href = `blog-post.html?id=${id}`;
  alert(`"${post.title}"\n\nBlog detay sayfasına yönlendiriliyorsunuz...\n(Backend entegrasyonu gerektirir)`);
}

// ── MOBİL SİDEBAR ────────────────────────────────────
function toggleMobileSidebar() {
  const sb  = document.getElementById('blogSidebar');
  const ov  = document.getElementById('sidebarOverlay');
  const open = sb.classList.contains('open');
  sb.classList.toggle('open', !open);
  ov.classList.toggle('visible', !open);
  document.body.style.overflow = open ? '' : 'hidden';
}

// ── GLOBAL ───────────────────────────────────────────
window.filterCat           = filterCat;
window.filterBySearch      = filterBySearch;
window.setView             = setView;
window.toggleNavGroup      = toggleNavGroup;
window.goPage              = goPage;
window.openPost            = openPost;
window.toggleMobileSidebar = toggleMobileSidebar;