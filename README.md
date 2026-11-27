# 🎮 GAMEZONE 3D — ULTIMATE GAMING PLATFORM

Dunyodagi eng chiroyli, zamonaviy, futuristik va professional onlayn gaming platformalaridan biri.

Loyihada **24 ta haqiqatan ishlaydigan va o'ynaladigan o'yinlar**, 3D Glassmorphism va Cyberpunk dizayn, Three.js 3D WebGL elementlari, to'liq ishlaydigan navigatsiya, real-vaqtli qidiruv, 3 ta til (O'zbekcha 🇺🇿, English 🇬🇧, Русский 🇷🇺), Dark/Light rejim, Web Audio sintezatori, foydalanuvchi profili, yutuqlar tizimi va mobil sensorli boshqaruv mavjud.

---

## 🚀 Texnologiyalar

- **HTML5** & **CSS3** (Kiberpank neon, 3D Glassmorphism, 3D Tilt Cards, Responsive Mobile HUD)
- **Vanilla JavaScript (ES6+)** (Modulli o'yin dvigatellari arxitekturasi, xotira optimizatsiyasi)
- **Three.js (WebGL)** (3D Hero kiber-kristall & yulduzlar galaktikasi, 3D Target Shooter, City Car Driving 3D, World Explorer 3D globus)
- **Web Audio API** (Sintezlangan protsedurali tovush effektlari va kiberpank ambient fon musiqasi — tashqi fayllarsiz 100% oflayn ishlaydi)
- **Local Storage API** (Til sozlamalari, mavzu, sevimlilar, o'yinchi darajasi (XP), yuqori natijalar)

---

## 📁 Loyiha Strukturasi

```text
GAMEZONE-3D/
│
├── index.html                   # Asosiy portal, Hero section, HUD modal, profillar
├── style.css                    # Ultra premium cyberpunk glassmorphism uslublari
├── script.js                    # Platforma yadrosi, qidiruv, til, profil, audio dvigatel
│
├── games/                       # 24 ta mustaqil ishlaydigan mini-o'yinlar
│   ├── shooter/
│   │   ├── space-shooter.js     # 1. Space Shooter (Boss janglari, qurollar, qalqon)
│   │   ├── zombie-survival.js   # 2. Zombie Survival (360° to'lqinlar, qurol turlari)
│   │   ├── target-shooter-3d.js # 3. 3D Target Shooter (Three.js 3D nishonlar tiri)
│   │   ├── tank-battle.js       # 4. Tank Battle (Devorlar, rikoshet o'qlar, dushman tanklari)
│   │   └── alien-attack.js      # 5. Alien Attack (O'zga sayyoraliklar hujumi, plazma bomba)
│   │
│   ├── rpg/
│   │   ├── fantasy-adventure.js # 6. Fantasy Adventure (Qilich zarbasi, aylanma zarba, XP)
│   │   ├── dungeon-quest.js     # 7. Dungeon Quest (Labirint, tuman, bronza va oltin kalitlar)
│   │   ├── pixel-hero.js        # 8. Pixel Hero RPG (8-bit taktik jang, olov va chaqmoq sehrlari)
│   │   └── dragon-world.js      # 9. Dragon World (Qanot qoqayotgan ulkan olovli ajdarho)
│   │
│   ├── racing/
│   │   ├── city-driving-3d.js   # 10. City Car Driving (Three.js 3D shahar, kamera almashinuvi)
│   │   ├── highway-racing.js    # 11. Highway Racing (Trassada tezlik, nitro boost, tangalar)
│   │   ├── drift-master.js      # 12. Drift Master (Haqiqiy drift fizikasi, shina izlari va tutun)
│   │   ├── offroad-adventure.js # 13. Offroad Adventure (4x4 tog' roveri, havoda muvozanat)
│   │   └── parking-challenge.js # 14. Parking Challenge (Avtomobil parkovkasi, D/R uzatmalar)
│   │
│   ├── puzzle/
│   │   ├── tetris.js            # 15. Tetris (SRS aylanish, ghost proyeksiyasi, hard drop)
│   │   ├── xo-battle.js         # 16. XO Battle (Aqlli Minimax AI yoki 2 kishilik rejim)
│   │   ├── block-blast.js       # 17. Block Blast (8x8 polyomino bloklar, portlash kombolari)
│   │   ├── memory-cards.js      # 18. Memory Cards (3D xotira kartalari juftlash)
│   │   ├── sudoku-master.js     # 19. Sudoku Master (9x9 Sudoku, xatolarni tekshirish, raqamlar)
│   │   └── bubble-shooter.js    # 20. Bubble Shooter (Rangli pufakchalar otish va portlatish)
│   │
│   └── travel/
│       ├── world-explorer-3d.js # 21. World Explorer 3D (Three.js aylanuvchi 3D Yer globusi)
│       ├── island-adventure.js  # 22. Island Adventure (Tropik orolda omon qolish va sol yasash)
│       ├── mountain-climber.js  # 23. Mountain Climber (Ilgak arqon bilan tik qoyalarga chiqish)
│       └── airport-tycoon.js    # 24. Airport Tycoon (Aeroport dispetcheri, samolyotlarni qo'ndirish)
│
├── assets/
│   └── images/
│       └── game-posters.js      # Har bir o'yin uchun unikal original SVG poster san'ati
│
└── README.md                    # Loyiha hujjatlari
```

---

## 🌟 Asosiy Imkoniyatlar

1. **24 ta Haqiqiy O'ynaladigan O'yin**:
   - Har bir o'yinda to'liq Canvas yoki Three.js WebGL rendering, g'alaba/mag'lubiyat shartlari, ball hisobi, timer, jon/salomatlik ko'rsatkichlari bor.
2. **Universal Gaming HUD Player**:
   - Pause / Resume, Restart, Fullscreen (to'liq ekran), Mute / Unmute, ko'rsatmalar paneli va mobil ekranlar uchun virtual sensorli D-Pad + A/B tugmalari.
3. **3D Glassmorphism & Cyberpunk Dizayn**:
   - Neon binafsha, ko'k va moviy yorug'liklar, kartalar ustiga sichqoncha kelganda 3D perspektiv egilish (3D tilt effect).
4. **Ko'p Tillik Tizim (3 ta til)**:
   - O'zbekcha 🇺🇿, English 🇬🇧 va Русский 🇷🇺.
   - Barcha menyular, sarlavhalar, o'yin tavsiflari va boshqaruv ko'rsatmalari to'liq tarjima qilingan.
5. **Aqlli Qidiruv va Filtrlar**:
   - real-time qidiruv tizimi inglizcha, o'zbekcha va ruscha so'zlarni taniydi (masalan: `car`, `mashina`, `гонки` barcha poyga o'yinlarini ko'rsatadi).
6. **Dark / Light Mode**:
   - Kiberpank qorong'i rejim va o'qish uchun qulay yuqori texnologiyali yorug' rejim.
7. **Kiber Gaming Cursor**:
   - Neon doira kursor va uning orqasidan ergashuvchi silliq nurli halqa.

---

## 🕹️ O'yinni Ishga Tushirish

Loyihani ishga tushirish uchun `GAMEZONE-3D/index.html` faylini istalgan zamonaviy brauzerda ochish kifoya (Chrome, Edge, Firefox, Safari, Opera).
Hech qanday qo'shimcha paketlar yoki serverlar o'rnatish shart emas!
