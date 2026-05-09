// ============================================================
// PAWCO - Site Verisi
// Bu dosya yalnızca veri içerir. İleride backend'den fetch
// ile de yüklenebilir; sadece bu dosyayı değiştirmeniz yeter.
// ============================================================

const PAWCO_DATA = {
  "site": {
    "name": "Pawco",
    "tagline": "Evcil Dostların Dünyası",
    "logo": "🐾"
  },
  "nav": [
    { "id": "cat",       "label": "Kedi Ürünleri",     "icon": "" },
    { "id": "dog",       "label": "Köpek Ürünleri",    "icon": "" },
    { "id": "bird",      "label": "Kuş Ürünleri",      "icon": "" },
    { "id": "rodent",    "label": "Kemirgen Ürünleri", "icon": "" },
    { "id": "campaigns", "label": "Kampanyalar",        "icon": "" },
    { "id": "club",      "label": "Pawco Salon",        "icon": "" },
    { "id": "Rezervation","label": "Randevu",           "icon": "" }
  ],
  "animals": {
    "cat": {
      "label": "Kedi",
      "icon": "",
      "color": "#FF6B6B",
      "banner": "Kediniz İçin En İyi Ürünler",
      "sidebar": [
        { "id": "cat-food",    "label": "Kedi Maması",                         "icon": "🥣", "hasChildren": true },
        { "id": "cat-wet",     "label": "Kedi Konserve Maması",                "icon": "🥫", "hasChildren": true },
        { "id": "cat-treat",   "label": "Kedi Ödül Maması",                    "icon": "🎁", "hasChildren": true },
        { "id": "cat-litter",  "label": "Kedi Kumu",                           "icon": "🪣", "hasChildren": true },
        { "id": "cat-vitamin", "label": "Vitaminler ve Ek Besinler",           "icon": "💊", "hasChildren": true },
        { "id": "cat-toy",     "label": "Kedi Oyuncağı",                       "icon": "🧶", "hasChildren": true },
        { "id": "cat-care",    "label": "Bakım ve Temizlik",                   "icon": "✂️", "hasChildren": true },
        { "id": "cat-bowl",    "label": "Kedi Mama ve Su Kabı",                "icon": "🍽️","hasChildren": true },
        { "id": "cat-toilet",  "label": "Kedi Tuvaletleri ve Ekipmanları",     "icon": "🚽", "hasChildren": true },
        { "id": "cat-brush",   "label": "Kedi Tarağı ve Fırçası",              "icon": "🪮", "hasChildren": false },
        { "id": "cat-scratch", "label": "Tırmalama Tahtası",                   "icon": "🪵", "hasChildren": false },
        { "id": "cat-collar",  "label": "Kedi Tasması",                        "icon": "📿", "hasChildren": true },
        { "id": "cat-carrier", "label": "Kedi Taşıma Ekipmanları",             "icon": "👜", "hasChildren": true },
        { "id": "cat-bed",     "label": "Kedi Evleri ve Yatakları",            "icon": "🏠", "hasChildren": true },
        { "id": "cat-door",    "label": "Kedi Kapıları ve Güvenlik Ürünleri",  "icon": "🚪", "hasChildren": true }
      ],
      "mainCategories": {
        "cat-food": {
          "title": "Kedi Maması Kategorileri",
          "items": [
            { "id": "cf-all",     "label": "Tümünü Gör",                 "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cf-neutered","label": "Kısırlaştırılmış Kedi Maması","icon": "🐱", "color": "#fff3cd" },
            { "id": "cf-adult",   "label": "Yetişkin Kedi Maması",        "icon": "🐈", "color": "#d4edda" },
            { "id": "cf-kitten",  "label": "Yavru Kedi Maması",           "icon": "🐱", "color": "#cce5ff" },
            { "id": "cf-light",   "label": "Light Kedi Maması",           "icon": "💚", "color": "#d1ecf1" },
            { "id": "cf-vet",     "label": "Veteriner Diyet Maması",      "icon": "🏥", "color": "#f8d7da" },
            { "id": "cf-senior",  "label": "Yaşlı Kedi Maması",           "icon": "🧓", "color": "#e2e3e5" },
            { "id": "cf-breed",   "label": "Özel Irk Kedi Maması",        "icon": "🏆", "color": "#fff3cd" },
            { "id": "cf-tester",  "label": "Tester Kedi Mamaları",        "icon": "🧪", "color": "#d4edda" }
          ],
          "related": [
            { "id": "cr-wet",     "label": "Kedi Konserve Maması",        "icon": "🥫" },
            { "id": "cr-vitamin", "label": "Vitaminler ve Ek Besinler",   "icon": "💊" },
            { "id": "cr-treat",   "label": "Kedi Ödül Maması",            "icon": "🎁" },
            { "id": "cr-bowl",    "label": "Kedi Mama ve Su Kabı",        "icon": "🍽️" }
          ]
        },
        "cat-wet": {
          "title": "Kedi Konserve Kategorileri",
          "items": [
            { "id": "cw-all",    "label": "Tümünü Gör",       "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cw-adult",  "label": "Yetişkin Konserve","icon": "🐈", "color": "#d4edda" },
            { "id": "cw-kitten", "label": "Yavru Konserve",   "icon": "🐱", "color": "#cce5ff" },
            { "id": "cw-senior", "label": "Yaşlı Konserve",   "icon": "🧓", "color": "#e2e3e5" },
            { "id": "cw-vet",    "label": "Veteriner Diyet",  "icon": "🏥", "color": "#f8d7da" },
            { "id": "cw-tuna",   "label": "Ton Balıklı",      "icon": "🐟", "color": "#d1ecf1" },
            { "id": "cw-chicken","label": "Tavuklu",           "icon": "🍗", "color": "#fff3cd" }
          ],
          "related": [
            { "id": "cr-food",  "label": "Kedi Maması",       "icon": "🥣" },
            { "id": "cr-treat", "label": "Kedi Ödül Maması",  "icon": "🎁" },
            { "id": "cr-bowl",  "label": "Kedi Mama ve Su Kabı","icon": "🍽️" }
          ]
        },
        "cat-treat": {
          "title": "Kedi Ödül Maması Kategorileri",
          "items": [
            { "id": "ctr-all",    "label": "Tümünü Gör",    "icon": "🔢", "color": "#f0f0f0" },
            { "id": "ctr-stick",  "label": "Stick Ödüller", "icon": "🥢", "color": "#fff3cd" },
            { "id": "ctr-cream",  "label": "Krem Ödüller",  "icon": "🍦", "color": "#f8d7da" },
            { "id": "ctr-crunch", "label": "Çıtır Ödüller", "icon": "🍪", "color": "#d4edda" },
            { "id": "ctr-dental", "label": "Dental Ödüller","icon": "🦷", "color": "#cce5ff" }
          ],
          "related": [
            { "id": "cr-food", "label": "Kedi Maması",          "icon": "🥣" },
            { "id": "cr-wet",  "label": "Kedi Konserve Maması", "icon": "🥫" }
          ]
        },
        "cat-litter": {
          "title": "Kedi Kumu Kategorileri",
          "items": [
            { "id": "cl-all",     "label": "Tümünü Gör",    "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cl-clump",   "label": "Topaklanan Kum","icon": "🪨", "color": "#d4edda" },
            { "id": "cl-crystal", "label": "Kristal Kum",   "icon": "💎", "color": "#cce5ff" },
            { "id": "cl-plant",   "label": "Bitkisel Kum",  "icon": "🌿", "color": "#d4edda" },
            { "id": "cl-pine",    "label": "Çam Pellet",    "icon": "🌲", "color": "#d4edda" },
            { "id": "cl-scented", "label": "Kokulu Kum",    "icon": "🌸", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "cr-toilet", "label": "Kedi Tuvaletleri",   "icon": "🚽" },
            { "id": "cr-care",   "label": "Bakım ve Temizlik",   "icon": "✂️" }
          ]
        },
        "cat-vitamin": {
          "title": "Vitamin ve Ek Besin Kategorileri",
          "items": [
            { "id": "cv-all",    "label": "Tümünü Gör",           "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cv-paste",  "label": "Malt ve Pasta",         "icon": "🧴", "color": "#fff3cd" },
            { "id": "cv-tablet", "label": "Tablet Vitaminler",     "icon": "💊", "color": "#d4edda" },
            { "id": "cv-liquid", "label": "Sıvı Vitaminler",       "icon": "💧", "color": "#cce5ff" },
            { "id": "cv-omega",  "label": "Omega 3 & Yağ Asitleri","icon": "🐟", "color": "#d1ecf1" },
            { "id": "cv-joint",  "label": "Eklem Destekleri",      "icon": "🦴", "color": "#e2e3e5" }
          ],
          "related": [
            { "id": "cr-food", "label": "Kedi Maması",           "icon": "🥣" },
            { "id": "cr-vet",  "label": "Veteriner Diyet Maması","icon": "🏥" }
          ]
        },
        "cat-toy": {
          "title": "Kedi Oyuncağı Kategorileri",
          "items": [
            { "id": "ct-all",    "label": "Tümünü Gör",       "icon": "🔢", "color": "#f0f0f0" },
            { "id": "ct-feather","label": "Tüylü Oyuncaklar", "icon": "🪶", "color": "#fff3cd" },
            { "id": "ct-laser",  "label": "Lazer Oyuncaklar", "icon": "🔴", "color": "#f8d7da" },
            { "id": "ct-tunnel", "label": "Tünel ve Çadırlar","icon": "🎪", "color": "#d4edda" },
            { "id": "ct-mouse",  "label": "Fare Oyuncaklar",  "icon": "🐭", "color": "#cce5ff" },
            { "id": "ct-ball",   "label": "Top Oyuncaklar",   "icon": "⚽", "color": "#d1ecf1" },
            { "id": "ct-wand",   "label": "Olta Oyuncaklar",  "icon": "🎣", "color": "#e2e3e5" }
          ],
          "related": [
            { "id": "cr-scratch","label": "Tırmalama Tahtası",        "icon": "🪵" },
            { "id": "cr-bed",    "label": "Kedi Evleri ve Yatakları", "icon": "🏠" }
          ]
        },
        "cat-care": {
          "title": "Bakım ve Temizlik Kategorileri",
          "items": [
            { "id": "cc-all",    "label": "Tümünü Gör",  "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cc-shampoo","label": "Kedi Şampuanı","icon": "🧴", "color": "#cce5ff" },
            { "id": "cc-wipe",   "label": "Islak Mendil", "icon": "🧻", "color": "#d4edda" },
            { "id": "cc-dental", "label": "Diş Bakımı",  "icon": "🦷", "color": "#fff3cd" },
            { "id": "cc-eye",    "label": "Göz ve Kulak","icon": "👁️","color": "#d1ecf1" },
            { "id": "cc-flea",   "label": "Pire ve Kene","icon": "🪲", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "cr-brush", "label": "Kedi Tarağı ve Fırçası","icon": "🪮" },
            { "id": "cr-litter","label": "Kedi Kumu",              "icon": "🪣" }
          ]
        },
        "cat-bowl": {
          "title": "Mama ve Su Kabı Kategorileri",
          "items": [
            { "id": "cb-all",      "label": "Tümünü Gör",       "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cb-ceramic",  "label": "Seramik Kaplar",   "icon": "🏺", "color": "#fff3cd" },
            { "id": "cb-stainless","label": "Paslanmaz Çelik",  "icon": "⚙️", "color": "#e2e3e5" },
            { "id": "cb-plastic",  "label": "Plastik Kaplar",   "icon": "🪣", "color": "#cce5ff" },
            { "id": "cb-fountain", "label": "Su Çeşmesi",       "icon": "⛲", "color": "#d1ecf1" },
            { "id": "cb-auto",     "label": "Otomatik Besleyici","icon": "🤖", "color": "#d4edda" }
          ],
          "related": [
            { "id": "cr-food","label": "Kedi Maması",         "icon": "🥣" },
            { "id": "cr-wet", "label": "Kedi Konserve Maması","icon": "🥫" }
          ]
        },
        "cat-toilet": {
          "title": "Tuvalet ve Ekipman Kategorileri",
          "items": [
            { "id": "cto-all",   "label": "Tümünü Gör",      "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cto-open",  "label": "Açık Tuvalet",    "icon": "🟫", "color": "#d4edda" },
            { "id": "cto-closed","label": "Kapalı Tuvalet",  "icon": "🏠", "color": "#cce5ff" },
            { "id": "cto-auto",  "label": "Otomatik Tuvalet","icon": "🤖", "color": "#fff3cd" },
            { "id": "cto-scoop", "label": "Kürek ve Aksesuar","icon": "🥄", "color": "#e2e3e5" }
          ],
          "related": [
            { "id": "cr-litter","label": "Kedi Kumu",       "icon": "🪣" },
            { "id": "cr-care",  "label": "Bakım ve Temizlik","icon": "✂️" }
          ]
        },
        "cat-collar": {
          "title": "Kedi Tasması Kategorileri",
          "items": [
            { "id": "cco-all",   "label": "Tümünü Gör",     "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cco-basic", "label": "Standart Tasma", "icon": "📿", "color": "#fff3cd" },
            { "id": "cco-safety","label": "Emniyet Tasması","icon": "🔒", "color": "#d4edda" },
            { "id": "cco-gps",   "label": "GPS Takip",      "icon": "📍", "color": "#cce5ff" },
            { "id": "cco-flea",  "label": "Pire Tasması",   "icon": "🪲", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "cr-carrier","label": "Kedi Taşıma Ekipmanları","icon": "👜" },
            { "id": "cr-care",   "label": "Bakım ve Temizlik",      "icon": "✂️" }
          ]
        },
        "cat-carrier": {
          "title": "Taşıma Ekipmanları Kategorileri",
          "items": [
            { "id": "cca-all",     "label": "Tümünü Gör",          "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cca-hard",    "label": "Sert Taşıma Çantası", "icon": "🧳", "color": "#e2e3e5" },
            { "id": "cca-soft",    "label": "Kumaş Taşıma Çantası","icon": "👜", "color": "#cce5ff" },
            { "id": "cca-bag",     "label": "Sırt Çantası",        "icon": "🎒", "color": "#d4edda" },
            { "id": "cca-stroller","label": "Puset ve Araba",      "icon": "🛒", "color": "#fff3cd" }
          ],
          "related": [
            { "id": "cr-collar","label": "Kedi Tasması",           "icon": "📿" },
            { "id": "cr-bed",   "label": "Kedi Evleri ve Yatakları","icon": "🏠" }
          ]
        },
        "cat-bed": {
          "title": "Ev ve Yatak Kategorileri",
          "items": [
            { "id": "cbe-all",     "label": "Tümünü Gör",            "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cbe-bed",     "label": "Kedi Yatakları",        "icon": "🛏️","color": "#cce5ff" },
            { "id": "cbe-house",   "label": "Kedi Evleri",           "icon": "🏠", "color": "#d4edda" },
            { "id": "cbe-tree",    "label": "Kedi Tırmalama Ağacı",  "icon": "🌳", "color": "#d4edda" },
            { "id": "cbe-hammock", "label": "Hamak",                 "icon": "🪢", "color": "#fff3cd" },
            { "id": "cbe-cave",    "label": "Kedi Mağarası",         "icon": "🕳️","color": "#e2e3e5" }
          ],
          "related": [
            { "id": "cr-scratch","label": "Tırmalama Tahtası","icon": "🪵" },
            { "id": "cr-toy",    "label": "Kedi Oyuncağı",    "icon": "🧶" }
          ]
        },
        "cat-door": {
          "title": "Kapı ve Güvenlik Ürünleri",
          "items": [
            { "id": "cdo-all",  "label": "Tümünü Gör",   "icon": "🔢", "color": "#f0f0f0" },
            { "id": "cdo-flap", "label": "Kedi Kapısı",  "icon": "🚪", "color": "#fff3cd" },
            { "id": "cdo-net",  "label": "Balkon Filesi","icon": "🕸️","color": "#d4edda" },
            { "id": "cdo-fence","label": "Güvenlik Çiti","icon": "🔒", "color": "#cce5ff" }
          ],
          "related": [
            { "id": "cr-carrier","label": "Kedi Taşıma Ekipmanları","icon": "👜" },
            { "id": "cr-collar", "label": "Kedi Tasması",           "icon": "📿" }
          ]
        }
      }
    },
    "dog": {
      "label": "Köpek",
      "icon": "",
      "color": "#4ECDC4",
      "banner": "Köpeğiniz İçin En İyi Ürünler",
      "sidebar": [
        { "id": "dog-food",    "label": "Köpek Maması",                 "icon": "🥣", "hasChildren": true },
        { "id": "dog-wet",     "label": "Köpek Konserve Maması",        "icon": "🥫", "hasChildren": true },
        { "id": "dog-treat",   "label": "Köpek Ödül Maması",            "icon": "🦴", "hasChildren": true },
        { "id": "dog-vitamin", "label": "Vitaminler ve Ek Besinler",    "icon": "💊", "hasChildren": true },
        { "id": "dog-toy",     "label": "Köpek Oyuncağı",               "icon": "🎾", "hasChildren": true },
        { "id": "dog-care",    "label": "Bakım ve Temizlik",            "icon": "✂️", "hasChildren": true },
        { "id": "dog-bowl",    "label": "Köpek Mama ve Su Kabı",        "icon": "🍽️","hasChildren": true },
        { "id": "dog-brush",   "label": "Köpek Tarağı ve Fırçası",     "icon": "🪮", "hasChildren": false },
        { "id": "dog-collar",  "label": "Köpek Tasması ve Gezdirme",   "icon": "📿", "hasChildren": true },
        { "id": "dog-carrier", "label": "Köpek Taşıma Ekipmanları",    "icon": "👜", "hasChildren": true },
        { "id": "dog-bed",     "label": "Köpek Yatakları ve Evleri",   "icon": "🏠", "hasChildren": true },
        { "id": "dog-clothes", "label": "Köpek Kıyafetleri",           "icon": "👕", "hasChildren": true },
        { "id": "dog-health",  "label": "Sağlık ve Hijyen",            "icon": "🏥", "hasChildren": true }
      ],
      "mainCategories": {
        "dog-food": {
          "title": "Köpek Maması Kategorileri",
          "items": [
            { "id": "df-all",   "label": "Tümünü Gör",            "icon": "🔢", "color": "#f0f0f0" },
            { "id": "df-adult", "label": "Yetişkin Köpek Maması", "icon": "🐕", "color": "#d4edda" },
            { "id": "df-puppy", "label": "Yavru Köpek Maması",    "icon": "🐶", "color": "#cce5ff" },
            { "id": "df-senior","label": "Yaşlı Köpek Maması",    "icon": "🧓", "color": "#e2e3e5" },
            { "id": "df-small", "label": "Küçük Irk Maması",      "icon": "🐩", "color": "#fff3cd" },
            { "id": "df-large", "label": "Büyük Irk Maması",      "icon": "🦮", "color": "#d1ecf1" },
            { "id": "df-vet",   "label": "Veteriner Diyet Maması","icon": "🏥", "color": "#f8d7da" },
            { "id": "df-light", "label": "Light Köpek Maması",    "icon": "💚", "color": "#d1ecf1" },
            { "id": "df-grain", "label": "Tahılsız Mama",         "icon": "🌾", "color": "#fff3cd" }
          ],
          "related": [
            { "id": "dr-wet",    "label": "Köpek Konserve Maması",     "icon": "🥫" },
            { "id": "dr-treat",  "label": "Köpek Ödül Maması",         "icon": "🦴" },
            { "id": "dr-vitamin","label": "Vitaminler ve Ek Besinler", "icon": "💊" },
            { "id": "dr-bowl",   "label": "Köpek Mama ve Su Kabı",     "icon": "🍽️" }
          ]
        },
        "dog-wet": {
          "title": "Köpek Konserve Kategorileri",
          "items": [
            { "id": "dw-all",    "label": "Tümünü Gör",       "icon": "🔢", "color": "#f0f0f0" },
            { "id": "dw-adult",  "label": "Yetişkin Konserve","icon": "🐕", "color": "#d4edda" },
            { "id": "dw-puppy",  "label": "Yavru Konserve",   "icon": "🐶", "color": "#cce5ff" },
            { "id": "dw-senior", "label": "Yaşlı Konserve",   "icon": "🧓", "color": "#e2e3e5" },
            { "id": "dw-beef",   "label": "Biftekli",         "icon": "🥩", "color": "#f8d7da" },
            { "id": "dw-chicken","label": "Tavuklu",           "icon": "🍗", "color": "#fff3cd" },
            { "id": "dw-lamb",   "label": "Kuzulu",            "icon": "🐑", "color": "#d1ecf1" }
          ],
          "related": [
            { "id": "dr-food",  "label": "Köpek Maması",       "icon": "🥣" },
            { "id": "dr-treat", "label": "Köpek Ödül Maması",  "icon": "🦴" }
          ]
        },
        "dog-treat": {
          "title": "Köpek Ödül Maması Kategorileri",
          "items": [
            { "id": "dtr-all",      "label": "Tümünü Gör",      "icon": "🔢", "color": "#f0f0f0" },
            { "id": "dtr-bone",     "label": "Kemik Ödüller",   "icon": "🦴", "color": "#fff3cd" },
            { "id": "dtr-strip",    "label": "Et Şeritler",     "icon": "🥩", "color": "#f8d7da" },
            { "id": "dtr-biscuit",  "label": "Bisküvi Ödüller", "icon": "🍪", "color": "#d4edda" },
            { "id": "dtr-dental",   "label": "Dental Ödüller",  "icon": "🦷", "color": "#cce5ff" },
            { "id": "dtr-training", "label": "Eğitim Ödülleri", "icon": "🏆", "color": "#d1ecf1" }
          ],
          "related": [
            { "id": "dr-food","label": "Köpek Maması",    "icon": "🥣" },
            { "id": "dr-toy", "label": "Köpek Oyuncağı", "icon": "🎾" }
          ]
        },
        "dog-toy": {
          "title": "Köpek Oyuncağı Kategorileri",
          "items": [
            { "id": "dt-all",    "label": "Tümünü Gör",         "icon": "🔢", "color": "#f0f0f0" },
            { "id": "dt-ball",   "label": "Top Oyuncaklar",     "icon": "🎾", "color": "#fff3cd" },
            { "id": "dt-rope",   "label": "İp Oyuncaklar",      "icon": "🧵", "color": "#d4edda" },
            { "id": "dt-chew",   "label": "Çiğneme Oyuncakları","icon": "🦴", "color": "#cce5ff" },
            { "id": "dt-squeaky","label": "Sesli Oyuncaklar",   "icon": "🔊", "color": "#f8d7da" },
            { "id": "dt-fetch",  "label": "Getir Oyuncakları",  "icon": "🥏", "color": "#d1ecf1" },
            { "id": "dt-puzzle", "label": "Zeka Oyuncakları",   "icon": "🧩", "color": "#e2e3e5" }
          ],
          "related": [
            { "id": "dr-collar","label": "Köpek Tasması ve Gezdirme","icon": "📿" },
            { "id": "dr-care",  "label": "Bakım ve Temizlik",        "icon": "✂️" }
          ]
        },
        "dog-collar": {
          "title": "Tasma ve Gezdirme Kategorileri",
          "items": [
            { "id": "dc-all",    "label": "Tümünü Gör",     "icon": "🔢", "color": "#f0f0f0" },
            { "id": "dc-collar", "label": "Köpek Tasması",  "icon": "📿", "color": "#fff3cd" },
            { "id": "dc-leash",  "label": "Gezdirme Kayışı","icon": "🔗", "color": "#d4edda" },
            { "id": "dc-harness","label": "Göğüs Tasması",  "icon": "🦺", "color": "#cce5ff" },
            { "id": "dc-retract","label": "Uzayan Kayış",   "icon": "📏", "color": "#d1ecf1" },
            { "id": "dc-gps",    "label": "GPS Takip",      "icon": "📍", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "dr-care",   "label": "Bakım ve Temizlik",       "icon": "✂️" },
            { "id": "dr-carrier","label": "Köpek Taşıma Ekipmanları","icon": "👜" }
          ]
        },
        "dog-bed": {
          "title": "Yatak ve Ev Kategorileri",
          "items": [
            { "id": "db-all",  "label": "Tümünü Gör",  "icon": "🔢", "color": "#f0f0f0" },
            { "id": "db-bed",  "label": "Köpek Yatakları","icon": "🛏️","color": "#cce5ff" },
            { "id": "db-house","label": "Köpek Kulübesi","icon": "🏠", "color": "#d4edda" },
            { "id": "db-crate","label": "Kafes ve Kasa", "icon": "📦", "color": "#e2e3e5" },
            { "id": "db-mat",  "label": "Paspas ve Mat", "icon": "🪣", "color": "#fff3cd" }
          ],
          "related": [
            { "id": "dr-carrier","label": "Köpek Taşıma Ekipmanları","icon": "👜" },
            { "id": "dr-toy",    "label": "Köpek Oyuncağı",          "icon": "🎾" }
          ]
        },
        "dog-clothes": {
          "title": "Köpek Kıyafetleri Kategorileri",
          "items": [
            { "id": "dkl-all",      "label": "Tümünü Gör",        "icon": "🔢", "color": "#f0f0f0" },
            { "id": "dkl-sweater",  "label": "Kazak ve Süveter",  "icon": "🧥", "color": "#cce5ff" },
            { "id": "dkl-raincoat", "label": "Yağmurluk",         "icon": "🌂", "color": "#d1ecf1" },
            { "id": "dkl-shoes",    "label": "Köpek Ayakkabısı",  "icon": "👟", "color": "#fff3cd" },
            { "id": "dkl-costume",  "label": "Kostüm",            "icon": "🎭", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "dr-care",  "label": "Bakım ve Temizlik","icon": "✂️" },
            { "id": "dr-collar","label": "Tasma ve Gezdirme","icon": "📿" }
          ]
        },
        "dog-health": {
          "title": "Sağlık ve Hijyen Kategorileri",
          "items": [
            { "id": "dh-all",   "label": "Tümünü Gör",   "icon": "🔢", "color": "#f0f0f0" },
            { "id": "dh-pee",   "label": "Tuvalet Pedi", "icon": "🟦", "color": "#cce5ff" },
            { "id": "dh-bag",   "label": "Kaka Torbası", "icon": "🛍️","color": "#d4edda" },
            { "id": "dh-flea",  "label": "Pire ve Kene", "icon": "🪲", "color": "#f8d7da" },
            { "id": "dh-dental","label": "Diş Bakımı",   "icon": "🦷", "color": "#fff3cd" },
            { "id": "dh-deodor","label": "Koku Giderici","icon": "🌸", "color": "#d1ecf1" }
          ],
          "related": [
            { "id": "dr-care",   "label": "Bakım ve Temizlik",        "icon": "✂️" },
            { "id": "dr-vitamin","label": "Vitaminler ve Ek Besinler","icon": "💊" }
          ]
        }
      }
    },
    "bird": {
      "label": "Kuş",
      "icon": "",
      "color": "#45B7D1",
      "banner": "Kuşunuz İçin En İyi Ürünler",
      "sidebar": [
        { "id": "bird-food",   "label": "Kuş Yemi",               "icon": "🌾", "hasChildren": true },
        { "id": "bird-treat",  "label": "Kuş Ödül Yemi",          "icon": "🎁", "hasChildren": true },
        { "id": "bird-cage",   "label": "Kafes ve Aksesuarlar",   "icon": "🏠", "hasChildren": true },
        { "id": "bird-toy",    "label": "Kuş Oyuncağı",           "icon": "🎠", "hasChildren": true },
        { "id": "bird-vitamin","label": "Vitamin ve Mineraller",  "icon": "💊", "hasChildren": true },
        { "id": "bird-perch",  "label": "Tünek ve Duraklar",      "icon": "🎋", "hasChildren": false },
        { "id": "bird-bath",   "label": "Kuş Banyosu",            "icon": "🛁", "hasChildren": false },
        { "id": "bird-care",   "label": "Bakım Ürünleri",         "icon": "✂️", "hasChildren": true },
        { "id": "bird-nest",   "label": "Yuva ve Barınak",        "icon": "🪺", "hasChildren": false },
        { "id": "bird-sand",   "label": "Kum ve Zemin Malzemeleri","icon": "🪨", "hasChildren": false }
      ],
      "mainCategories": {
        "bird-food": {
          "title": "Kuş Yemi Kategorileri",
          "items": [
            { "id": "bf-all",    "label": "Tümünü Gör",       "icon": "🔢", "color": "#f0f0f0" },
            { "id": "bf-canary", "label": "Kanarya Yemi",     "icon": "🐤", "color": "#fff3cd" },
            { "id": "bf-budgie", "label": "Muhabbet Kuşu Yemi","icon": "🐦", "color": "#d4edda" },
            { "id": "bf-parrot", "label": "Papağan Yemi",     "icon": "🦜", "color": "#cce5ff" },
            { "id": "bf-finch",  "label": "İspinoz Yemi",     "icon": "🐦", "color": "#d1ecf1" },
            { "id": "bf-mixed",  "label": "Karışık Yem",      "icon": "🌾", "color": "#e2e3e5" },
            { "id": "bf-pellet", "label": "Pelet Yem",        "icon": "⚫", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "br-treat",  "label": "Kuş Ödül Yemi",        "icon": "🎁" },
            { "id": "br-vitamin","label": "Vitamin ve Mineraller", "icon": "💊" },
            { "id": "br-cage",   "label": "Kafes ve Aksesuarlar",  "icon": "🏠" }
          ]
        },
        "bird-treat": {
          "title": "Kuş Ödül Yemi Kategorileri",
          "items": [
            { "id": "bt-all",        "label": "Tümünü Gör",              "icon": "🔢", "color": "#f0f0f0" },
            { "id": "bt-stick",      "label": "Ballı Stick",             "icon": "🍯", "color": "#fff3cd" },
            { "id": "bt-mineral",    "label": "Mineral Taşı",            "icon": "🪨", "color": "#e2e3e5" },
            { "id": "bt-cuttlebone", "label": "Mürekkep Balığı Kemiği", "icon": "🦑", "color": "#d1ecf1" },
            { "id": "bt-fruit",      "label": "Meyve Ödüller",           "icon": "🍎", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "br-food",   "label": "Kuş Yemi",               "icon": "🌾" },
            { "id": "br-vitamin","label": "Vitamin ve Mineraller",   "icon": "💊" }
          ]
        },
        "bird-cage": {
          "title": "Kafes ve Aksesuar Kategorileri",
          "items": [
            { "id": "bc-all",    "label": "Tümünü Gör",       "icon": "🔢", "color": "#f0f0f0" },
            { "id": "bc-small",  "label": "Küçük Kafesler",   "icon": "🏠", "color": "#cce5ff" },
            { "id": "bc-large",  "label": "Büyük Kafesler",   "icon": "🏛️","color": "#d4edda" },
            { "id": "bc-feeder", "label": "Yemlik ve Suluklar","icon": "🍽️","color": "#fff3cd" },
            { "id": "bc-cover",  "label": "Kafes Örtüleri",   "icon": "🛏️","color": "#e2e3e5" },
            { "id": "bc-stand",  "label": "Kafes Ayakları",   "icon": "🪑", "color": "#d1ecf1" }
          ],
          "related": [
            { "id": "br-perch","label": "Tünek ve Duraklar","icon": "🎋" },
            { "id": "br-toy",  "label": "Kuş Oyuncağı",     "icon": "🎠" }
          ]
        },
        "bird-toy": {
          "title": "Kuş Oyuncağı Kategorileri",
          "items": [
            { "id": "bto-all",    "label": "Tümünü Gör",          "icon": "🔢", "color": "#f0f0f0" },
            { "id": "bto-swing",  "label": "Salıncak",            "icon": "🎡", "color": "#fff3cd" },
            { "id": "bto-mirror", "label": "Ayna Oyuncaklar",     "icon": "🪞", "color": "#d1ecf1" },
            { "id": "bto-bell",   "label": "Çıngıraklı Oyuncaklar","icon": "🔔","color": "#f8d7da" },
            { "id": "bto-ladder", "label": "Merdiven",            "icon": "🪜", "color": "#d4edda" },
            { "id": "bto-rope",   "label": "İp Oyuncaklar",       "icon": "🧵", "color": "#e2e3e5" }
          ],
          "related": [
            { "id": "br-perch","label": "Tünek ve Duraklar",  "icon": "🎋" },
            { "id": "br-cage", "label": "Kafes ve Aksesuarlar","icon": "🏠" }
          ]
        },
        "bird-vitamin": {
          "title": "Vitamin ve Mineral Kategorileri",
          "items": [
            { "id": "bv-all",     "label": "Tümünü Gör", "icon": "🔢", "color": "#f0f0f0" },
            { "id": "bv-liquid",  "label": "Sıvı Vitamin","icon": "💧", "color": "#cce5ff" },
            { "id": "bv-powder",  "label": "Toz Vitamin", "icon": "🧂", "color": "#e2e3e5" },
            { "id": "bv-calcium", "label": "Kalsiyum",    "icon": "🦴", "color": "#d4edda" },
            { "id": "bv-feather", "label": "Tüy Sağlığı", "icon": "🪶", "color": "#fff3cd" }
          ],
          "related": [
            { "id": "br-food",  "label": "Kuş Yemi",      "icon": "🌾" },
            { "id": "br-treat", "label": "Kuş Ödül Yemi", "icon": "🎁" }
          ]
        },
        "bird-care": {
          "title": "Bakım Ürünleri Kategorileri",
          "items": [
            { "id": "bca-all",  "label": "Tümünü Gör",  "icon": "🔢", "color": "#f0f0f0" },
            { "id": "bca-spray","label": "Tüy Spreyi",  "icon": "💦", "color": "#d1ecf1" },
            { "id": "bca-beak", "label": "Gaga Bakımı", "icon": "🪨", "color": "#e2e3e5" },
            { "id": "bca-claw", "label": "Tırnak Bakımı","icon": "✂️","color": "#fff3cd" }
          ],
          "related": [
            { "id": "br-bath",   "label": "Kuş Banyosu",         "icon": "🛁" },
            { "id": "br-vitamin","label": "Vitamin ve Mineraller","icon": "💊" }
          ]
        }
      }
    },
    "rodent": {
      "label": "Kemirgen",
      "icon": "",
      "color": "#96CEB4",
      "banner": "Kemirgenlerin Dünyası",
      "sidebar": [
        { "id": "rod-food",   "label": "Kemirgen Yemi",          "icon": "🌾", "hasChildren": true },
        { "id": "rod-treat",  "label": "Ödül Yemi",              "icon": "🎁", "hasChildren": true },
        { "id": "rod-cage",   "label": "Kafes ve Teraryum",      "icon": "🏠", "hasChildren": true },
        { "id": "rod-toy",    "label": "Oyuncak ve Aktivite",    "icon": "🎡", "hasChildren": true },
        { "id": "rod-bedding","label": "Altlık ve Talaş",        "icon": "🪵", "hasChildren": true },
        { "id": "rod-vitamin","label": "Vitamin ve Mineral",     "icon": "💊", "hasChildren": true },
        { "id": "rod-wheel",  "label": "Koşu Tekeri",            "icon": "⭕", "hasChildren": false },
        { "id": "rod-nest",   "label": "Yuva ve Barınak",        "icon": "🪺", "hasChildren": false },
        { "id": "rod-tube",   "label": "Tünel ve Borular",       "icon": "🔄", "hasChildren": false },
        { "id": "rod-water",  "label": "Su Şişesi ve Besleyici", "icon": "💧", "hasChildren": false }
      ],
      "mainCategories": {
        "rod-food": {
          "title": "Kemirgen Yemi Kategorileri",
          "items": [
            { "id": "rf-all",       "label": "Tümünü Gör",   "icon": "🔢", "color": "#f0f0f0" },
            { "id": "rf-hamster",   "label": "Hamster Yemi", "icon": "🐹", "color": "#fff3cd" },
            { "id": "rf-rabbit",    "label": "Tavşan Yemi",  "icon": "🐰", "color": "#f8d7da" },
            { "id": "rf-guinea",    "label": "Guinea Pig Yemi","icon": "🐾","color": "#d4edda" },
            { "id": "rf-rat",       "label": "Rat ve Fare Yemi","icon": "🐭","color": "#e2e3e5" },
            { "id": "rf-chinchilla","label": "Çinçilla Yemi", "icon": "🦔", "color": "#cce5ff" },
            { "id": "rf-hay",       "label": "Saman ve Ot",  "icon": "🌿", "color": "#d4edda" }
          ],
          "related": [
            { "id": "rr-treat",  "label": "Ödül Yemi",         "icon": "🎁" },
            { "id": "rr-bedding","label": "Altlık ve Talaş",   "icon": "🪵" },
            { "id": "rr-vitamin","label": "Vitamin ve Mineral", "icon": "💊" }
          ]
        },
        "rod-treat": {
          "title": "Kemirgen Ödül Yemi Kategorileri",
          "items": [
            { "id": "rt-all",     "label": "Tümünü Gör",       "icon": "🔢", "color": "#f0f0f0" },
            { "id": "rt-stick",   "label": "Tahıl Çubukları",  "icon": "🌾", "color": "#fff3cd" },
            { "id": "rt-dried",   "label": "Kurutulmuş Meyve", "icon": "🍎", "color": "#f8d7da" },
            { "id": "rt-mineral", "label": "Mineral Taşı",     "icon": "🪨", "color": "#e2e3e5" },
            { "id": "rt-biscuit", "label": "Bisküvi Ödüller",  "icon": "🍪", "color": "#d4edda" }
          ],
          "related": [
            { "id": "rr-food",   "label": "Kemirgen Yemi",      "icon": "🌾" },
            { "id": "rr-vitamin","label": "Vitamin ve Mineral",  "icon": "💊" }
          ]
        },
        "rod-cage": {
          "title": "Kafes ve Teraryum Kategorileri",
          "items": [
            { "id": "rc-all",      "label": "Tümünü Gör",       "icon": "🔢", "color": "#f0f0f0" },
            { "id": "rc-hamster",  "label": "Hamster Kafesi",   "icon": "🏠", "color": "#fff3cd" },
            { "id": "rc-rabbit",   "label": "Tavşan Kafesi",    "icon": "🐰", "color": "#f8d7da" },
            { "id": "rc-guinea",   "label": "Guinea Pig Kafesi","icon": "🐾", "color": "#d4edda" },
            { "id": "rc-terrarium","label": "Teraryum",         "icon": "🌿", "color": "#cce5ff" },
            { "id": "rc-starter",  "label": "Başlangıç Kitleri","icon": "📦", "color": "#d1ecf1" }
          ],
          "related": [
            { "id": "rr-wheel","label": "Koşu Tekeri",        "icon": "⭕" },
            { "id": "rr-toy",  "label": "Oyuncak ve Aktivite","icon": "🎡" }
          ]
        },
        "rod-toy": {
          "title": "Oyuncak ve Aktivite Kategorileri",
          "items": [
            { "id": "rto-all",    "label": "Tümünü Gör",         "icon": "🔢", "color": "#f0f0f0" },
            { "id": "rto-wheel",  "label": "Koşu Tekeri",        "icon": "⭕", "color": "#d4edda" },
            { "id": "rto-ball",   "label": "Yürüme Topu",        "icon": "⚽", "color": "#cce5ff" },
            { "id": "rto-tunnel", "label": "Tünel ve Boru",      "icon": "🔄", "color": "#fff3cd" },
            { "id": "rto-chew",   "label": "Çiğneme Oyuncakları","icon": "🪵", "color": "#e2e3e5" },
            { "id": "rto-swing",  "label": "Salıncak",           "icon": "🎡", "color": "#f8d7da" }
          ],
          "related": [
            { "id": "rr-cage","label": "Kafes ve Teraryum","icon": "🏠" },
            { "id": "rr-nest","label": "Yuva ve Barınak",  "icon": "🪺" }
          ]
        },
        "rod-bedding": {
          "title": "Altlık ve Talaş Kategorileri",
          "items": [
            { "id": "rb-all",    "label": "Tümünü Gör",  "icon": "🔢", "color": "#f0f0f0" },
            { "id": "rb-wood",   "label": "Ahşap Talaş", "icon": "🪵", "color": "#fff3cd" },
            { "id": "rb-paper",  "label": "Kağıt Altlık","icon": "📄", "color": "#e2e3e5" },
            { "id": "rb-hemp",   "label": "Kenevir Altlık","icon": "🌿","color": "#d4edda" },
            { "id": "rb-cotton", "label": "Pamuk Yuva",  "icon": "☁️", "color": "#cce5ff" }
          ],
          "related": [
            { "id": "rr-cage","label": "Kafes ve Teraryum","icon": "🏠" },
            { "id": "rr-nest","label": "Yuva ve Barınak",  "icon": "🪺" }
          ]
        },
        "rod-vitamin": {
          "title": "Vitamin ve Mineral Kategorileri",
          "items": [
            { "id": "rv-all",      "label": "Tümünü Gör",       "icon": "🔢", "color": "#f0f0f0" },
            { "id": "rv-liquid",   "label": "Sıvı Vitamin",     "icon": "💧", "color": "#cce5ff" },
            { "id": "rv-calcium",  "label": "Kalsiyum Takviyesi","icon": "🦴", "color": "#d4edda" },
            { "id": "rv-probiotic","label": "Probiyotik",        "icon": "🦠", "color": "#d1ecf1" },
            { "id": "rv-mineral",  "label": "Mineral Taşı",     "icon": "🪨", "color": "#e2e3e5" }
          ],
          "related": [
            { "id": "rr-food", "label": "Kemirgen Yemi","icon": "🌾" },
            { "id": "rr-treat","label": "Ödül Yemi",    "icon": "🎁" }
          ]
        }
      }
    }
  }
};