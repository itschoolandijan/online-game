/* ===================================================================
   GAMEZONE 3D — PLATFORM CORE ENGINE & ORCHESTRATION
   Localization (UZ, EN, RU), Web Audio Synthesizer, Three.js 3D Hero,
   Universal Game HUD Player, Search & Filter, Profile, Favorites, Theme
   =================================================================== */

// Global State
const GameZone = {
  currentLang: localStorage.getItem('gz_lang') || 'uz',
  currentTheme: localStorage.getItem('gz_theme') || 'dark',
  soundEnabled: localStorage.getItem('gz_sound') !== 'false',
  musicEnabled: localStorage.getItem('gz_music') === 'true',
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'popular',
  favorites: JSON.parse(localStorage.getItem('gz_favorites') || '[]'),
  profile: JSON.parse(localStorage.getItem('gz_profile') || JSON.stringify({
    username: 'CyberGamer_01',
    avatar: '⚡',
    xp: 240,
    level: 3,
    totalPlays: 14,
    playTimeSeconds: 1250,
    highScores: {},
    achievements: ['first_blood', 'speed_demon']
  })),
  activeGameId: null,
  activeEngine: null
};

/* --- 24 GAMES DATABASE --- */
const GAMES_DATA = [
  // SHOOTER (5)
  {
    id: 'space-shooter',
    engineKey: 'space-shooter',
    category: 'shooter',
    rating: 4.9,
    difficulty: 'medium',
    plays: '84.5K',
    trending: true,
    is3D: false,
    tags: ['shooter', 'space', 'kosmos', 'космос', 'otish', 'ship', 'kema', 'laser', 'boss']
  },
  {
    id: 'zombie-survival',
    engineKey: 'zombie-survival',
    category: 'shooter',
    rating: 4.8,
    difficulty: 'hard',
    plays: '92.1K',
    trending: true,
    is3D: false,
    tags: ['shooter', 'zombie', 'zombi', 'зомби', 'survival', 'guns', 'qurol', 'waves']
  },
  {
    id: 'target-shooter-3d',
    engineKey: 'target-shooter-3d',
    category: 'shooter',
    rating: 4.9,
    difficulty: 'medium',
    plays: '76.4K',
    trending: true,
    is3D: true,
    tags: ['shooter', '3d', 'target', 'nishon', 'мишень', 'aim', 'sniper', 'mergan']
  },
  {
    id: 'tank-battle',
    engineKey: 'tank-battle',
    category: 'shooter',
    rating: 4.7,
    difficulty: 'medium',
    plays: '68.3K',
    trending: false,
    is3D: false,
    tags: ['shooter', 'tank', 'jang', 'танк', 'battle', 'war', 'urush', 'cannon']
  },
  {
    id: 'alien-attack',
    engineKey: 'alien-attack',
    category: 'shooter',
    rating: 4.8,
    difficulty: 'hard',
    plays: '61.7K',
    trending: false,
    is3D: false,
    tags: ['shooter', 'alien', 'begona', 'пришельцы', 'invaders', 'space', 'plasma', 'bomb']
  },

  // RPG (4)
  {
    id: 'fantasy-adventure',
    engineKey: 'fantasy-adventure',
    category: 'rpg',
    rating: 4.9,
    difficulty: 'medium',
    plays: '88.2K',
    trending: true,
    is3D: false,
    tags: ['rpg', 'fantasy', 'sarguzasht', 'фэнтези', 'sword', 'qilich', 'hero', 'qahramon']
  },
  {
    id: 'dungeon-quest',
    engineKey: 'dungeon-quest',
    category: 'rpg',
    rating: 4.8,
    difficulty: 'hard',
    plays: '71.5K',
    trending: false,
    is3D: false,
    tags: ['rpg', 'dungeon', 'zindon', 'подземелье', 'maze', 'key', 'kalit', 'chest']
  },
  {
    id: 'pixel-hero',
    engineKey: 'pixel-hero',
    category: 'rpg',
    rating: 4.7,
    difficulty: 'medium',
    plays: '59.8K',
    trending: false,
    is3D: false,
    tags: ['rpg', 'pixel', 'retro', '8bit', 'turnbased', 'magic', 'sehr', 'fireball']
  },
  {
    id: 'dragon-world',
    engineKey: 'dragon-world',
    category: 'rpg',
    rating: 5.0,
    difficulty: 'hard',
    plays: '104.2K',
    trending: true,
    is3D: false,
    tags: ['rpg', 'dragon', 'ajdarho', 'дракон', 'boss', 'fire', 'olov', 'epic']
  },

  // RACING / DRIVING (5)
  {
    id: 'city-driving-3d',
    engineKey: 'city-driving-3d',
    category: 'racing',
    rating: 4.9,
    difficulty: 'medium',
    plays: '95.6K',
    trending: true,
    is3D: true,
    tags: ['racing', '3d', 'car', 'mashina', 'машина', 'shahar', 'city', 'город', 'drive', 'haydash']
  },
  {
    id: 'highway-racing',
    engineKey: 'highway-racing',
    category: 'racing',
    rating: 4.8,
    difficulty: 'easy',
    plays: '83.4K',
    trending: true,
    is3D: false,
    tags: ['racing', 'highway', 'trassa', 'трасса', 'speed', 'tezlik', 'nitro', 'poyga', 'гонки']
  },
  {
    id: 'drift-master',
    engineKey: 'drift-master',
    category: 'racing',
    rating: 4.9,
    difficulty: 'hard',
    plays: '79.1K',
    trending: true,
    is3D: false,
    tags: ['racing', 'drift', 'dripht', 'дрифт', 'skid', 'smoke', 'tire', 'car']
  },
  {
    id: 'offroad-adventure',
    engineKey: 'offroad-adventure',
    category: 'racing',
    rating: 4.7,
    difficulty: 'hard',
    plays: '64.9K',
    trending: false,
    is3D: false,
    tags: ['racing', 'offroad', '4x4', 'tog', 'mountain', 'гора', 'physics', 'rover']
  },
  {
    id: 'parking-challenge',
    engineKey: 'parking-challenge',
    category: 'racing',
    rating: 4.6,
    difficulty: 'medium',
    plays: '58.2K',
    trending: false,
    is3D: false,
    tags: ['racing', 'parking', 'parkovka', 'парковка', 'car', 'steer', 'gear']
  },

  // BRAIN / PUZZLE (6)
  {
    id: 'tetris',
    engineKey: 'tetris',
    category: 'puzzle',
    rating: 5.0,
    difficulty: 'medium',
    plays: '112.4K',
    trending: true,
    is3D: false,
    tags: ['puzzle', 'tetris', 'blok', 'тетрис', 'classic', 'lines', 'polyomino']
  },
  {
    id: 'xo-battle',
    engineKey: 'xo-battle',
    category: 'puzzle',
    rating: 4.7,
    difficulty: 'easy',
    plays: '67.0K',
    trending: false,
    is3D: false,
    tags: ['puzzle', 'xo', 'tic tac toe', 'krestiki noliki', 'крестики нолики', 'ai', '2player']
  },
  {
    id: 'block-blast',
    engineKey: 'block-blast',
    category: 'puzzle',
    rating: 4.9,
    difficulty: 'medium',
    plays: '91.8K',
    trending: true,
    is3D: false,
    tags: ['puzzle', 'block', 'blast', 'portlash', 'взрыв', 'grid', 'polyomino']
  },
  {
    id: 'memory-cards',
    engineKey: 'memory-cards',
    category: 'puzzle',
    rating: 4.8,
    difficulty: 'easy',
    plays: '54.3K',
    trending: false,
    is3D: false,
    tags: ['puzzle', 'memory', 'xotira', 'память', 'cards', 'karta', 'karty', 'match']
  },
  {
    id: 'sudoku-master',
    engineKey: 'sudoku-master',
    category: 'puzzle',
    rating: 4.8,
    difficulty: 'hard',
    plays: '62.7K',
    trending: false,
    is3D: false,
    tags: ['puzzle', 'sudoku', 'sudoku', 'судоку', 'numbers', 'raqamlar', 'числа', 'logic']
  },
  {
    id: 'bubble-shooter',
    engineKey: 'bubble-shooter',
    category: 'puzzle',
    rating: 4.9,
    difficulty: 'easy',
    plays: '86.4K',
    trending: true,
    is3D: false,
    tags: ['puzzle', 'bubble', 'pufak', 'шарики', 'shooter', 'color', 'match3']
  },

  // TRAVEL / ADVENTURE (4)
  {
    id: 'world-explorer',
    engineKey: 'world-explorer-3d',
    category: 'travel',
    rating: 4.9,
    difficulty: 'easy',
    plays: '74.1K',
    trending: true,
    is3D: true,
    tags: ['travel', '3d', 'world', 'dunyo', 'мир', 'globe', 'xarita', 'earth', 'wonders']
  },
  {
    id: 'island-adventure',
    engineKey: 'island-adventure',
    category: 'travel',
    rating: 4.8,
    difficulty: 'medium',
    plays: '78.9K',
    trending: true,
    is3D: false,
    tags: ['travel', 'island', 'orol', 'остров', 'survival', 'craft', 'raft', 'nature']
  },
  {
    id: 'mountain-climber',
    engineKey: 'mountain-climber',
    category: 'travel',
    rating: 4.8,
    difficulty: 'hard',
    plays: '66.2K',
    trending: false,
    is3D: false,
    tags: ['travel', 'mountain', 'tog', 'гора', 'climber', 'grapple', 'rope', 'peak']
  },
  {
    id: 'airport-tycoon',
    engineKey: 'airport-tycoon',
    category: 'travel',
    rating: 4.9,
    difficulty: 'medium',
    plays: '81.0K',
    trending: true,
    is3D: false,
    tags: ['travel', 'airport', 'aeroport', 'аэропорт', 'plane', 'samolyot', 'самолет', 'tycoon']
  }
];

/* --- TRANSLATIONS (UZBEK, ENGLISH, RUSSIAN) --- */
const TRANSLATIONS = {
  uz: {
    nav_home: 'ASOSIY',
    nav_all: 'BARCHA O‘YINLAR',
    nav_shooter: 'SHOOTER',
    nav_rpg: 'RPG JANG',
    nav_racing: 'POYGA',
    nav_puzzle: 'BOSHQOTIRMA',
    nav_travel: 'SAYOHAT',
    nav_favorites: 'SEVIMLILAR',
    hero_badge: 'PREMIUM GAMING PLATFORMA 3D',
    hero_title: 'O‘YINLAR DUNYOSIGA',
    hero_title_highlight: 'XUSH KELIBSIZ',
    hero_sub: '24 ta haqiqiy o‘ynaladigan futuristik 3D mini-o‘yinlar, kiberpank atmosfera va yuqori darajadagi tajriba!',
    btn_play_now: 'HOZIR O‘YNASH',
    btn_trending: 'TOP O‘YINLAR',
    stat_games: 'HAQIQIY O‘YINLAR',
    stat_players: 'FAOL O‘YINCHILAR',
    stat_rating: 'REYTING',
    stat_latency: 'KECIKISH',
    cat_all: 'Barchasi',
    cat_trending: 'Trendda',
    cat_shooter: 'Shooter',
    cat_rpg: 'RPG',
    cat_racing: 'Poyga',
    cat_puzzle: 'Boshqotirma',
    cat_travel: 'Sayohat',
    cat_favorites: 'Sevimlilar',
    search_placeholder: 'O‘yin nomi yoki kalit so‘zni qidiring...',
    sort_popular: 'Eng ommabop',
    sort_rating: 'Yuqori reyting',
    sort_name: 'Nomi bo‘yicha (A-Z)',
    section_all_games: 'Barcha O‘yinlar',
    section_tag: 'ULTRA GAMING KATALOG',
    btn_play: 'O‘YNASH',
    diff_easy: 'Oson',
    diff_medium: 'O‘rta',
    diff_hard: 'Qiyin',
    no_results_title: 'Hech qanday o‘yin topilmadi',
    no_results_text: 'Boshqa kalit so‘z bilan qidirib ko‘ring yoki barcha o‘yinlar toifasini tanlang.',
    btn_reset_filter: 'Filtrlarni tozalash',
    modal_score: 'BALL:',
    modal_health: 'JON:',
    modal_level: 'BOSQICH:',
    modal_time: 'VAQT:',
    game_over_win: 'G‘ALABA! SIZ YUTTINGIZ!',
    game_over_lose: 'O‘YIN TUGADI (GAME OVER)',
    btn_replay: 'QAYTA O‘YNASH',
    btn_exit: 'CHIQISH',
    profile_title: 'GAMER PROFILI',
    profile_level: 'Daraja',
    profile_xp: 'Tajriba (XP)',
    stat_played: 'O‘ynalgan',
    stat_time: 'O‘yin vaqti',
    stat_favs: 'Sevimlilar',
    achievements_title: 'YUTUQLAR & MEDALLAR',
    footer_about: 'GAMEZONE 3D — zamonaviy WebGL va Three.js texnologiyalari bilan yaratilgan dunyo darajasidagi eng chiroyli onlayn 3D gaming platformasi.',
    footer_categories: 'Kategoriyalar',
    footer_links: 'Havolalar',
    footer_legal: 'Qoidalar',
    back_to_top: 'Yuqoriga qaytish',
    // 24 Games info
    games: {
      'space-shooter': {
        title: 'Space Shooter',
        desc: 'Kosmik kemani boshqaring, dushman lazerlarini yengib, kuchli boss janglarida g‘alaba qozoning!',
        controls: 'WASD / Strelkalar: Harakat | SPACE: Lazer otish'
      },
      'zombie-survival': {
        title: 'Zombie Survival',
        desc: '360 darajali arena omon qolish o‘yini: zombilardan himoyalaning, qurollarni almashtiring va to‘lqinlarni yenging!',
        controls: 'WASD: Harakat | Sichqoncha: Nishon & Otish | 1,2,3: Qurollar'
      },
      'target-shooter-3d': {
        title: '3D Target Shooter',
        desc: 'Three.js 3D tir maydonchasi: harakatlanayotgan 3D nishonlarni optik pritsel bilan aniq urib ochko to‘plang!',
        controls: 'Sichqoncha: Aim | Bosish / SPACE: Otish'
      },
      'tank-battle': {
        title: 'Tank Battle',
        desc: 'Taktik tank arenasi: dushman tanklarini devorlar ortidan o‘qqa tuting va to‘siqlarni portlating!',
        controls: 'WASD: Tank harakati | Sichqoncha / SPACE: Minomyot otish'
      },
      'alien-attack': {
        title: 'Alien Attack',
        desc: 'Yer sayyorasini o‘zga sayyoraliklar hujumidan himoya qiling, plazma bombalari bilan osmonni tozalang!',
        controls: 'Strelkalar / A, D: Harakat | SPACE: Lazer | B / X: Plazma bomba'
      },
      'fantasy-adventure': {
        title: 'Fantasy Adventure',
        desc: 'Afsonaviy qahramon bilan zindonlarni tozalang, oltinlar yig‘ing va dushmanlarni qilich zarbasi bilan yiqiting!',
        controls: 'WASD: Harakat | SPACE: Qilich zarbasi | X: Aylanma hujum'
      },
      'dungeon-quest': {
        title: 'Dungeon Quest',
        desc: 'Sirli zindon labirintini o‘rganing, bronza va oltin kalitlarni topib, eshiklarni oching va xazinalarni qo‘lga kiriting!',
        controls: 'WASD / Strelkalar: Labirintda harakatlanish'
      },
      'pixel-hero': {
        title: 'Pixel Hero RPG',
        desc: 'Klassik 8-bit RPG taktik jangi: sehrli olov sharlari, momaqaldiroq chaqiruvlari va sehrlar bilan monsterlarni yeng!',
        controls: '1, 2, 3, 4 tugmalari yoki Ekranning pastki qismidagi amallarni bosing'
      },
      'dragon-world': {
        title: 'Dragon World',
        desc: 'Qadimiy ulkan ajdarho bilan epik jang! Olov oqimlaridan dumalab qoching va sehrli kamon bilan ajdarhoni mahv eting!',
        controls: 'WASD: Harakat | SPACE: O‘q uzish | C / Shift: Dumalash'
      },
      'city-driving-3d': {
        title: 'City Car Driving 3D',
        desc: 'Futuristik 3D kiberpank shahrida sportkar haydash: real fizika, svetoforlar, tirbandlik va kamerani almashtirish!',
        controls: 'W, S: Gaz & Tormoz | A, D: Rul | C: Kamera ko‘rinishini almashtirish'
      },
      'highway-racing': {
        title: 'Highway Racing',
        desc: 'Katta tezlikda trassada poyga: boshqa mashinalardan epchillik bilan qoching, nitro yoqing va rekord o‘rnating!',
        controls: 'A, D: Qatorni almashtirish | W, S: Tezlik | SPACE: Nitro turbina'
      },
      'drift-master': {
        title: 'Drift Master',
        desc: 'Haqiqiy drift fizikasi: burilishlarda sirpanish burchagini saqlab, shinadan tutun chiqaring va rekord ball yig‘ing!',
        controls: 'W, S: Gaz / Orqaga | A, D: Rul | SPACE: Qo‘l tormozi (Ruchnik)'
      },
      'offroad-adventure': {
        title: 'Offroad Adventure',
        desc: '4x4 yo‘ltanlamas avtomobili bilan tog‘li cho‘qqilarni zabt eting, havoda muvozanat saqlang va ag‘darilib ketmang!',
        controls: 'D / O‘ng: Gaz | A / Chap: Tormoz | W, S: Havoda muvozanat'
      },
      'parking-challenge': {
        title: 'Parking Challenge',
        desc: 'Mashinani to‘g‘ri joyga qo‘yish simulyatori: tezlikni va vitesni (D/R) boshqarib, belgilangan kiber-hududga parkovka qiling!',
        controls: 'W, S: Gaz & Tormoz | A, D: Rul | R / SPACE: Vitesni almashtirish (D / R)'
      },
      'tetris': {
        title: 'Tetris',
        desc: 'Afsonaviy klassik bloklar: shakllarni to‘g‘ri joylashtiring, qatorlarni tozalang va yuqori darajaga yeting!',
        controls: 'Chap / O‘ng: Siljitish | Yuqori: Aylantirish | Past: Tushirish | SPACE: Darhol tushirish | C: Saqlash'
      },
      'xo-battle': {
        title: 'XO Battle',
        desc: 'Kiber neon Krestiki-Noliki: sun’iy intellektga qarshi yoki ikkinchi o‘yinchi bilan o‘ynang va g‘alaba qozoning!',
        controls: 'Sichqoncha bilan katakchalarni bosing'
      },
      'block-blast': {
        title: 'Block Blast',
        desc: '8x8 maydonda bloklarni joylashtiring, qator va ustunlarni birdaniga portlatib, kombo ochkolarni to‘plang!',
        controls: 'Pastdagi shakllarni tanlang va doskadagi bo‘sh joyga bosing'
      },
      'memory-cards': {
        title: 'Memory Cards',
        desc: 'Kiberpank xotira o‘yini: 3D kartalarni aylantirib, bir xil belgilarni toping va eng kam harakatda yakunlang!',
        controls: 'Kartalarni ochish uchun ularning ustiga bosing'
      },
      'sudoku-master': {
        title: 'Sudoku Master',
        desc: '9x9 klassik mantiqiy Sudoku: raqamlarni to‘g‘ri joylashtiring, xatolardan saqlaning va aqlingizni charxlang!',
        controls: 'Katakchani tanlang va 1-9 gacha bo‘lgan raqamlarni bosing'
      },
      'bubble-shooter': {
        title: 'Bubble Shooter',
        desc: 'Rangli pufakchalarni pushka bilan otib, 3 ta va undan ortiq bir xil rangdagi sharchalarni portlatib yuboring!',
        controls: 'Sichqoncha: Yo‘nalish | Bosish / SPACE: Pufakchani otish'
      },
      'world-explorer': {
        title: 'World Explorer 3D',
        desc: 'Interaktiv 3D Yer globusi: dunyo mamlakatlari va tarixiy obidalarni (Samarqand, Parij, Tokio) o‘rganing!',
        controls: 'Sichqoncha bilan globusni aylantiring va kiber nishonlarga bosing'
      },
      'island-adventure': {
        title: 'Island Adventure',
        desc: 'Tropik orolda omon qolish: daraxtlarni kesing, tosh qazing, kokos yeb ochlikni qondiring va qochish uchun sol yasang!',
        controls: 'WASD: Harakat | SPACE: Daraxt/Tosh qazish | C: Sol yasash'
      },
      'mountain-climber': {
        title: 'Mountain Climber',
        desc: 'Tik qoyalarga chiqish: ilgak arqonni otib qoyalarga ilashib oling, qulayotgan toshlardan saqlanib cho‘qqiga chiqing!',
        controls: 'Strelkalar: Tebranish | SPACE / Bosish: Ilgakni otish | W: Arqonni tortish'
      },
      'airport-tycoon': {
        title: 'Airport Tycoon',
        desc: 'Aeroport dispetcheri simulyatori: samolyotlarni qo‘ndiring, yo‘lovchilarni tushiring, yonilg‘i quying va uchiring!',
        controls: 'Samolyotni tanlang va QO‘NDIRISH yoki UCHIRISH buyruqlarini bosing'
      }
    }
  },

  en: {
    nav_home: 'HOME',
    nav_all: 'ALL GAMES',
    nav_shooter: 'SHOOTER',
    nav_rpg: 'RPG BATTLE',
    nav_racing: 'RACING',
    nav_puzzle: 'BRAIN GAMES',
    nav_travel: 'TRAVEL',
    nav_favorites: 'FAVORITES',
    hero_badge: 'PREMIUM GAMING PLATFORM 3D',
    hero_title: 'ENTER THE WORLD OF',
    hero_title_highlight: 'NEXT-GEN GAMES',
    hero_sub: '24 fully playable futuristic 3D mini-games with cyberpunk aesthetics, responsive controls and zero lag!',
    btn_play_now: 'PLAY NOW',
    btn_trending: 'TRENDING GAMES',
    stat_games: 'PLAYABLE GAMES',
    stat_players: 'ACTIVE GAMERS',
    stat_rating: 'RATING',
    stat_latency: 'LATENCY',
    cat_all: 'All Games',
    cat_trending: 'Trending',
    cat_shooter: 'Shooter',
    cat_rpg: 'RPG',
    cat_racing: 'Racing',
    cat_puzzle: 'Brain Games',
    cat_travel: 'Travel',
    cat_favorites: 'Favorites',
    search_placeholder: 'Search by game title or tags...',
    sort_popular: 'Most Popular',
    sort_rating: 'Top Rated',
    sort_name: 'Name (A-Z)',
    section_all_games: 'All Games',
    section_tag: 'ULTRA GAMING ROSTER',
    btn_play: 'PLAY NOW',
    diff_easy: 'Easy',
    diff_medium: 'Medium',
    diff_hard: 'Hard',
    no_results_title: 'No games found',
    no_results_text: 'Try searching with different keywords or reset your filter.',
    btn_reset_filter: 'Clear Filters',
    modal_score: 'SCORE:',
    modal_health: 'HEALTH:',
    modal_level: 'STAGE:',
    modal_time: 'TIME:',
    game_over_win: 'VICTORY! YOU WON!',
    game_over_lose: 'GAME OVER',
    btn_replay: 'PLAY AGAIN',
    btn_exit: 'EXIT TO MENU',
    profile_title: 'GAMER PROFILE',
    profile_level: 'Level',
    profile_xp: 'Experience (XP)',
    stat_played: 'Games Played',
    stat_time: 'Play Time',
    stat_favs: 'Favorites',
    achievements_title: 'ACHIEVEMENTS & BADGES',
    footer_about: 'GAMEZONE 3D is a premier next-gen online browser gaming platform engineered with Three.js and modern WebGL.',
    footer_categories: 'Categories',
    footer_links: 'Quick Links',
    footer_legal: 'Legal & Privacy',
    back_to_top: 'Back to Top',
    games: {
      'space-shooter': {
        title: 'Space Shooter',
        desc: 'Pilot advanced starfighters across alien sectors, dodge bullet storms, and vanquish colossal armada bosses!',
        controls: 'WASD / Arrows: Steer Ship | SPACE: Fire Laser Cannons'
      },
      'zombie-survival': {
        title: 'Zombie Survival',
        desc: 'Survive unrelenting undead hordes in top-down 360 arena combat with shotguns, rifles, and medkits!',
        controls: 'WASD: Movement | Mouse: Aim & Shoot | 1,2,3: Switch Guns'
      },
      'target-shooter-3d': {
        title: '3D Target Shooter',
        desc: 'Step into a holographic WebGL 3D shooting range: track high-speed drones with raycasting precision scopes!',
        controls: 'Mouse: Aim Reticle | Click / SPACE: Fire'
      },
      'tank-battle': {
        title: 'Tank Battle',
        desc: 'Engage in tactical armor warfare: blast destructible brick walls and ricochet shells to obliterate enemy tanks!',
        controls: 'WASD: Maneuver Tank | Mouse / SPACE: Aim & Fire Cannon'
      },
      'alien-attack': {
        title: 'Alien Attack',
        desc: 'Protect Earth command center from descending alien legions with particle cannons and screen-clearing plasma bombs!',
        controls: 'Arrows / A,D: Move | SPACE: Blaster | B / X: Plasma Bomb'
      },
      'fantasy-adventure': {
        title: 'Fantasy Adventure',
        desc: 'Slash through dungeon beasts, collect radiant gemstones, level up your stats and unleash whirlwind blades!',
        controls: 'WASD: Movement | SPACE: Sword Slash | X: Whirlwind'
      },
      'dungeon-quest': {
        title: 'Dungeon Quest',
        desc: 'Navigate uncharted dungeon labyrinths through fog of war, find bronze and gold skeleton keys, and unlock loot chests!',
        controls: 'WASD / Arrows: Move through maze tiles'
      },
      'pixel-hero': {
        title: 'Pixel Hero RPG',
        desc: 'Tactical turn-based 8-bit battles: wield swords, cast fiery meteors, heal wounds, and defeat legendary beasts!',
        controls: 'Hotkeys 1, 2, 3, 4 or tap action buttons'
      },
      'dragon-world': {
        title: 'Dragon World',
        desc: 'Confront a legendary colossal fire dragon! Dodge fiery breath streams, dodge-roll, and loose arcane enchanted arrows!',
        controls: 'WASD: Move | SPACE: Shoot Bow | C / Shift: Dodge Roll'
      },
      'city-driving-3d': {
        title: 'City Car Driving 3D',
        desc: 'Cruise through an electric cyberpunk metropolis in 3D: realistic handling physics, dense traffic, and switchable cameras!',
        controls: 'W, S: Gas & Brake | A, D: Steering | C: Switch Camera View'
      },
      'highway-racing': {
        title: 'Highway Racing',
        desc: 'High-speed highway rush: weave between heavy traffic, collect gold coin caches, and activate turbo nitro boost!',
        controls: 'A, D: Switch Lanes | W, S: Speed | SPACE: Nitro Boost'
      },
      'drift-master': {
        title: 'Drift Master',
        desc: 'True slip-angle physics drift racing: smoke your rear tires around hairpins, leave rubber skid marks, and rack up combos!',
        controls: 'W, S: Accelerate / Reverse | A, D: Steer | SPACE: Handbrake'
      },
      'offroad-adventure': {
        title: 'Offroad Adventure',
        desc: 'Conquer rugged mountain peaks with 4x4 spring suspension, manage fuel cans, and maintain air balance!',
        controls: 'D / Right: Gas | A / Left: Brake | W, S: Air Tilt Balance'
      },
      'parking-challenge': {
        title: 'Parking Challenge',
        desc: 'Precision driving and parking simulator: master forward and reverse gears to dock neatly inside the glowing bay!',
        controls: 'W, S: Drive & Stop | A, D: Steer | R / SPACE: Switch Gear (D / R)'
      },
      'tetris': {
        title: 'Tetris',
        desc: 'The timeless classic polyomino puzzler: rotate pieces, plan ghost piece projections, and trigger multi-line Tetris clears!',
        controls: 'Left/Right: Shift | Up: Rotate | Down: Soft Drop | SPACE: Hard Drop | C: Hold'
      },
      'xo-battle': {
        title: 'XO Battle',
        desc: 'Futuristic Tic-Tac-Toe with neon glow: play solo against an unbeatable Minimax AI or challenge a friend in 2P mode!',
        controls: 'Click any tile on the 3x3 grid'
      },
      'block-blast': {
        title: 'Block Blast',
        desc: 'Fit colorful polyomino shapes onto the 8x8 grid to blast complete rows and columns into particle showers!',
        controls: 'Select a shape from the tray and click on the grid to drop'
      },
      'memory-cards': {
        title: 'Memory Cards',
        desc: 'Holographic memory match: flip 3D cyber runes, match twin pairs, and beat the clock in minimal moves!',
        controls: 'Click cards to flip and match'
      },
      'sudoku-master': {
        title: 'Sudoku Master',
        desc: 'Master 9x9 logic numbers with automated conflict validation, note assistance, and multiple difficulties!',
        controls: 'Click a cell and tap numbers 1-9'
      },
      'bubble-shooter': {
        title: 'Bubble Shooter',
        desc: 'Rotate the laser-guided bubble cannon, aim for matching color clusters, and pop groups of 3 or more!',
        controls: 'Mouse: Aim Cannon | Click / SPACE: Launch Bubble'
      },
      'world-explorer': {
        title: 'World Explorer 3D',
        desc: 'Spin a 3D Earth globe in WebGL: discover world wonders, cultural capitals, and landmark expedition trivia!',
        controls: 'Click & Drag to rotate Earth | Click pins to explore'
      },
      'island-adventure': {
        title: 'Island Adventure',
        desc: 'Stranded on a tropical island: harvest timber, quarry stone, forage coconuts, manage hunger, and craft an escape raft!',
        controls: 'WASD: Move | SPACE: Harvest Resource | C: Craft Raft'
      },
      'mountain-climber': {
        title: 'Mountain Climber',
        desc: 'Scale vertiginous mountain cliffs: fire grapple ropes, swing past rock avalanches, manage stamina, and reach the 1000m peak!',
        controls: 'Arrows: Swing | SPACE / Click: Shoot Grapple | W: Reel in'
      },
      'airport-tycoon': {
        title: 'Airport Tycoon',
        desc: 'Control international flight operations: sequence landings, taxi to terminal gates, refuel, and launch departures!',
        controls: 'Click inbound planes to select, then click LAND or DEPART'
      }
    }
  },

  ru: {
    nav_home: 'ГЛАВНАЯ',
    nav_all: 'ВСЕ ИГРЫ',
    nav_shooter: 'ШУТЕРЫ',
    nav_rpg: 'RPG ИГРЫ',
    nav_racing: 'ГОНКИ',
    nav_puzzle: 'ГОЛОВОЛОМКИ',
    nav_travel: 'ПУТЕШЕСТВИЯ',
    nav_favorites: 'ИЗБРАННОЕ',
    hero_badge: 'ПРЕМИУМ ИГРОВАЯ ПЛАТФОРМА 3D',
    hero_title: 'ДОБРО ПОЖАЛОВАТЬ В',
    hero_title_highlight: 'МИР ИГР 3D',
    hero_sub: '24 полноценные футуристические 3D мини-игры с киберпанк атмосферой, отзывчивым управлением и высоким FPS!',
    btn_play_now: 'ИГРАТЬ СЕЙЧАС',
    btn_trending: 'ПОПУЛЯРНЫЕ',
    stat_games: 'РАБОЧИХ ИГР',
    stat_players: 'АКТИВНЫХ ИГРОКОВ',
    stat_rating: 'РЕЙТИНГ',
    stat_latency: 'ЗАДЕРЖКА',
    cat_all: 'Все игры',
    cat_trending: 'Тренды',
    cat_shooter: 'Шутеры',
    cat_rpg: 'RPG',
    cat_racing: 'Гонки',
    cat_puzzle: 'Головоломки',
    cat_travel: 'Путешествия',
    cat_favorites: 'Избранное',
    search_placeholder: 'Поиск по названию или тегам...',
    sort_popular: 'По популярности',
    sort_rating: 'По рейтингу',
    sort_name: 'По названию (А-Я)',
    section_all_games: 'Все Игры',
    section_tag: 'КАТАЛОГ ИГР',
    btn_play: 'ИГРАТЬ',
    diff_easy: 'Легко',
    diff_medium: 'Средне',
    diff_hard: 'Сложно',
    no_results_title: 'Игры не найдены',
    no_results_text: 'Попробуйте изменить запрос или сбросить фильтры.',
    btn_reset_filter: 'Сбросить фильтры',
    modal_score: 'ОЧКИ:',
    modal_health: 'ЖИЗНЬ:',
    modal_level: 'УРОВЕНЬ:',
    modal_time: 'ВРЕМЯ:',
    game_over_win: 'ПОБЕДА! ВЫ ВЫИГРАЛИ!',
    game_over_lose: 'ИГРА ОКОНЧЕНА',
    btn_replay: 'ИГРАТЬ СНОВА',
    btn_exit: 'В МЕНЮ',
    profile_title: 'ПРОФИЛЬ ИГРОКА',
    profile_level: 'Уровень',
    profile_xp: 'Опыт (XP)',
    stat_played: 'Сыграно игр',
    stat_time: 'Время в игре',
    stat_favs: 'Избранное',
    achievements_title: 'ДОСТИЖЕНИЯ И МЕДАЛИ',
    footer_about: 'GAMEZONE 3D — первоклассная онлайн-платформа браузерных 3D игр, созданная на базе Three.js и WebGL.',
    footer_categories: 'Категории',
    footer_links: 'Ссылки',
    footer_legal: 'Правила',
    back_to_top: 'Наверх',
    games: {
      'space-shooter': {
        title: 'Space Shooter',
        desc: 'Управляйте звездным истребителем, уклоняйтесь от лазеров и сокрушайте гигантских космических боссов!',
        controls: 'WASD / Стрелки: Движение | SPACE: Огонь лазерами'
      },
      'zombie-survival': {
        title: 'Zombie Survival',
        desc: 'Выживайте среди орд зомби на круговой 360 арене с дробовиками, автоматами и аптечками!',
        controls: 'WASD: Движение | Мышь: Прицел & Стрельба | 1,2,3: Оружие'
      },
      'target-shooter-3d': {
        title: '3D Target Shooter',
        desc: 'Голографический 3D тир на Three.js: сбивайте летающие мишени с оптической точностью!',
        controls: 'Мышь: Прицел | Клик / SPACE: Выстрел'
      },
      'tank-battle': {
        title: 'Tank Battle',
        desc: 'Тактическая танковая битва: уничтожайте кирпичные преграды и расстреливайте вражеские танки рикошетом!',
        controls: 'WASD: Движение | Мышь / SPACE: Огонь из башни'
      },
      'alien-attack': {
        title: 'Alien Attack',
        desc: 'Защитите Землю от вторжения пришельцев с помощью лазерных установок и плазменных бомб!',
        controls: 'Стрелки / A, D: Движение | SPACE: Лазер | B / X: Плазменная бомба'
      },
      'fantasy-adventure': {
        title: 'Fantasy Adventure',
        desc: 'Управляйте воином в подземелье, собирайте золото, рубите врагов мечом и круговыми ударами!',
        controls: 'WASD: Движение | SPACE: Удар мечом | X: Круговая атака'
      },
      'dungeon-quest': {
        title: 'Dungeon Quest',
        desc: 'Исследуйте лабиринт в тумане войны, находите бронзовые и золотые ключи от сундуков с сокровищами!',
        controls: 'WASD / Стрелки: Перемещение по клеткам'
      },
      'pixel-hero': {
        title: 'Pixel Hero RPG',
        desc: 'Пошаговые ретро-бои 8-бит: используйте меч, огненные шары, молнии и исцеление против монстров!',
        controls: 'Клавиши 1, 2, 3, 4 или кнопки действий на экране'
      },
      'dragon-world': {
        title: 'Dragon World',
        desc: 'Эпическая битва с древним огнедышащим драконом! Уклоняйтесь кувырками и разите магическими стрелами!',
        controls: 'WASD: Движение | SPACE: Выстрел из лука | C / Shift: Кувырок'
      },
      'city-driving-3d': {
        title: 'City Car Driving 3D',
        desc: '3D езда по неоновому мегаполису: реалистичная физика, трафик, переключение камер и спидометр!',
        controls: 'W, S: Газ & Тормоз | A, D: Руль | C: Смена камеры'
      },
      'highway-racing': {
        title: 'Highway Racing',
        desc: 'Гонка на шоссе на предельной скорости: обгоняйте плотный трафик, включайте нитро и ставьте рекорды!',
        controls: 'A, D: Смена полосы | W, S: Скорость | SPACE: Нитро'
      },
      'drift-master': {
        title: 'Drift Master',
        desc: 'Настоящая физика дрифта: пускайте спорткар в занос, оставляйте следы шин и собирайте комбо-очки!',
        controls: 'W, S: Газ / Назад | A, D: Руль | SPACE: Ручной тормоз'
      },
      'offroad-adventure': {
        title: 'Offroad Adventure',
        desc: 'Покоряйте горные склоны на полноприводном 4x4 внедорожнике с пружинной подвеской и балансом!',
        controls: 'D / Вправо: Газ | A / Влево: Тормоз | W, S: Балансировка в воздухе'
      },
      'parking-challenge': {
        title: 'Parking Challenge',
        desc: 'Симулятор ювелирной парковки: переключайте передачи (D/R) и припаркуйте машину точно в неоновый бокс!',
        controls: 'W, S: Газ и Тормоз | A, D: Руль | R / SPACE: Передача (D / R)'
      },
      'tetris': {
        title: 'Tetris',
        desc: 'Легендарный классический Тетрис: вращайте полимино, очищайте ряды и бейте рекорды скорости!',
        controls: 'Стрелки: Движение | Вверх: Вращение | SPACE: Быстрый сброс | C: Удержание'
      },
      'xo-battle': {
        title: 'XO Battle',
        desc: 'Неоновые крестики-нолики: сразитесь с непобедимым ИИ Минимакс или играйте вдвоем на одном экране!',
        controls: 'Кликайте по клеткам 3x3'
      },
      'block-blast': {
        title: 'Block Blast',
        desc: 'Размещайте блоки на доске 8x8, взрывайте полные ряды и столбцы яркими неоновыми взрывами!',
        controls: 'Выберите фигуру внизу и кликните на доску'
      },
      'memory-cards': {
        title: 'Memory Cards',
        desc: 'Киберпанк тренировка памяти: переворачивайте 3D карточки и находите совпадающие пары за минимум ходов!',
        controls: 'Кликайте по карточкам'
      },
      'sudoku-master': {
        title: 'Sudoku Master',
        desc: 'Классическое Судоку 9x9: расставляйте числа, проверяйте конфликты и развивайте логику!',
        controls: 'Кликните на клетку и выберите цифру 1-9'
      },
      'bubble-shooter': {
        title: 'Bubble Shooter',
        desc: 'Стреляйте цветными пузырями из пушки, собирайте кластеры из 3+ шариков и очищайте экран!',
        controls: 'Мышь: Прицел | Клик / SPACE: Выстрел'
      },
      'world-explorer': {
        title: 'World Explorer 3D',
        desc: 'Интерактивный 3D глобус Земли на Three.js: исследуйте чудеса света и столицы (Самарканд, Париж, Токио)!',
        controls: 'Зажмите и крутите глобус | Кликайте по меткам'
      },
      'island-adventure': {
        title: 'Island Adventure',
        desc: 'Выживание на тропическом острове: рубите пальмы, добывайте камень, собирайте кокосы и постройте плот!',
        controls: 'WASD: Движение | SPACE: Сбор ресурсов | C: Создать плот'
      },
      'mountain-climber': {
        title: 'Mountain Climber',
        desc: 'Вертикальный альпинизм: стреляйте крюком-кошкой, уклоняйтесь от камнепадов и покорите пик 1000м!',
        controls: 'Стрелки: Раскачка | SPACE / Клик: Крюк | W: Подтянуться'
      },
      'airport-tycoon': {
        title: 'Airport Tycoon',
        desc: 'Симулятор авиадиспетчера: управляйте взлетно-посадочными полосами, сажайте лайнеры и обслуживайте пассажиров!',
        controls: 'Кликните по самолету, затем нажмите ПОСАДКА или ВЗЛЕТ'
      }
    }
  }
};

/* --- WEB AUDIO PROCEDURAL SYNTHESIZER --- */
const SoundEngine = (function() {
  let audioCtx = null;
  let bgOsc = null;
  let bgGain = null;
  let isPlayingBgm = false;

  function initContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSound(type) {
    if (!GameZone.soundEnabled) return;
    initContext();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;

    if (type === 'laser') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'explosion') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'coin') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.28);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } else if (type === 'hit') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'click') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  }

  function toggleMusic() {
    initContext();
    if (!audioCtx) return;

    if (isPlayingBgm) {
      if (bgOsc) { bgOsc.stop(); bgOsc = null; }
      isPlayingBgm = false;
      GameZone.musicEnabled = false;
    } else {
      bgOsc = audioCtx.createOscillator();
      bgGain = audioCtx.createGain();
      bgOsc.type = 'sine';
      bgOsc.frequency.setValueAtTime(110, audioCtx.currentTime); // Low A ambient drone
      bgGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      bgOsc.connect(bgGain);
      bgGain.connect(audioCtx.destination);
      bgOsc.start();
      isPlayingBgm = true;
      GameZone.musicEnabled = true;
    }
    localStorage.setItem('gz_music', GameZone.musicEnabled);
  }

  return { playSound, toggleMusic, initContext };
})();

/* --- THREE.JS 3D HERO INTERACTIVE SCENE --- */
function initHero3D() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Ambient & Point Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  const cyanLight = new THREE.PointLight(0x00f0ff, 2.5, 30);
  cyanLight.position.set(5, 5, 5);
  scene.add(cyanLight);

  const purpleLight = new THREE.PointLight(0xa855f7, 2.5, 30);
  purpleLight.position.set(-5, -5, 5);
  scene.add(purpleLight);

  // Floating Cyber Crystal (Icosahedron)
  const crystalGeo = new THREE.IcosahedronGeometry(1.8, 0);
  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    emissive: 0x8b5cf6,
    emissiveIntensity: 0.45,
    roughness: 0.15,
    metalness: 0.85,
    wireframe: false
  });
  const crystal = new THREE.Mesh(crystalGeo, crystalMat);
  scene.add(crystal);

  // Outer Glowing Wireframe Rings
  const ring1Geo = new THREE.TorusGeometry(2.6, 0.04, 16, 64);
  const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  scene.add(ring1);

  const ring2Geo = new THREE.TorusGeometry(3.1, 0.03, 16, 64);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = Math.PI / 2.8;
  scene.add(ring2);

  // Background 3D Starfield Galaxy Particles
  const starsCount = 600;
  const starsGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starsCount * 3);
  for (let i = 0; i < starsCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 28;
    starPositions[i + 1] = (Math.random() - 0.5) * 28;
    starPositions[i + 2] = (Math.random() - 0.5) * 28;
  }
  starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starsMat = new THREE.PointsMaterial({
    size: 0.065,
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.75
  });
  const starField = new THREE.Points(starsGeo, starsMat);
  scene.add(starField);

  // Mouse Parallax Interaction
  let targetRotX = 0;
  let targetRotY = 0;
  window.addEventListener('mousemove', (e) => {
    targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.8;
    targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.8;
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    crystal.rotation.x += 0.005;
    crystal.rotation.y += 0.008;

    ring1.rotation.x += 0.004;
    ring1.rotation.y += 0.006;
    ring2.rotation.y -= 0.007;

    starField.rotation.y += 0.0006;

    // Smooth camera mouse follow
    camera.position.x += (targetRotY * 2 - camera.position.x) * 0.05;
    camera.position.y += (-targetRotX * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    if (!canvas) return;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
}

/* --- CUSTOM GAMING CURSOR --- */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states on interactive items
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('button, a, .game-card, .cat-pill, input, select')) {
      document.body.classList.add('cursor-hover');
    } else {
      document.body.classList.remove('cursor-hover');
    }
  });
}

/* --- RENDER 3D GAME CARDS GRID --- */
function renderGameCards() {
  const gridEl = document.getElementById('games-grid');
  if (!gridEl) return;

  const t = TRANSLATIONS[GameZone.currentLang];

  // Filtering
  let filtered = GAMES_DATA.filter(game => {
    // Category check
    if (GameZone.activeCategory === 'trending' && !game.trending) return false;
    if (['shooter', 'rpg', 'racing', 'puzzle', 'travel'].includes(GameZone.activeCategory) &&
        game.category !== GameZone.activeCategory) return false;
    if (GameZone.activeCategory === 'favorites' && !GameZone.favorites.includes(game.id)) return false;

    // Search query check (Multilingual)
    if (GameZone.searchQuery.trim() !== '') {
      const q = GameZone.searchQuery.toLowerCase().trim();
      const info = t.games[game.id] || {};
      const matchesTitle = info.title && info.title.toLowerCase().includes(q);
      const matchesDesc = info.desc && info.desc.toLowerCase().includes(q);
      const matchesTags = game.tags.some(tag => tag.toLowerCase().includes(q));
      if (!matchesTitle && !matchesDesc && !matchesTags) return false;
    }

    return true;
  });

  // Sorting
  if (GameZone.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (GameZone.sortBy === 'name') {
    filtered.sort((a, b) => {
      const nameA = t.games[a.id]?.title || a.id;
      const nameB = t.games[b.id]?.title || b.id;
      return nameA.localeCompare(nameB);
    });
  } else {
    // 'popular'
    filtered.sort((a, b) => parseFloat(b.plays) - parseFloat(a.plays));
  }

  // Update Section Counter
  const countBadge = document.getElementById('games-count-badge');
  if (countBadge) countBadge.textContent = `(${filtered.length})`;

  // Empty state
  if (filtered.length === 0) {
    gridEl.innerHTML = `
      <div class="no-results-state">
        <div class="no-results-icon">🎮</div>
        <h3 class="no-results-title">${t.no_results_title}</h3>
        <p class="no-results-text">${t.no_results_text}</p>
        <button class="btn-primary" onclick="resetFilters()">${t.btn_reset_filter}</button>
      </div>
    `;
    return;
  }

  gridEl.innerHTML = filtered.map(game => {
    const info = t.games[game.id] || { title: game.id, desc: '' };
    const isFav = GameZone.favorites.includes(game.id);
    const posterSvg = window.GameZonePosters ? window.GameZonePosters.getPosterSvg(game.id) : '';

    return `
      <div class="game-card-3d-wrap">
        <div class="game-card" data-id="${game.id}">
          <div class="card-media">
            <div class="card-badges">
              <span class="card-category-badge">${t['cat_' + game.category] || game.category}</span>
              <button class="card-fav-btn ${isFav ? 'is-fav' : ''}" onclick="toggleFavorite('${game.id}', event)" title="Favorite">
                ♥
              </button>
            </div>
            <div class="card-svg-art">${posterSvg}</div>
            <div class="card-media-overlay"></div>
          </div>
          <div class="card-content">
            <div class="card-title-row">
              <h3 class="card-game-title">${info.title}</h3>
              <div class="card-rating">★ ${game.rating}</div>
            </div>
            <p class="card-desc">${info.desc}</p>
            <div class="card-meta-row">
              <div class="card-plays">👥 ${game.plays}</div>
              <div class="card-difficulty diff-${game.difficulty}">${t['diff_' + game.difficulty] || game.difficulty}</div>
            </div>
            <button class="card-play-btn" onclick="launchGame('${game.id}')">
              <span>▶</span> ${t.btn_play}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  initCard3DTilt();
}

/* --- 3D PERSPECTIVE CARD TILT EFFECT --- */
function initCard3DTilt() {
  const cards = document.querySelectorAll('.game-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = -((y - centerY) / centerY) * 10;
      const rotY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* --- UNIVERSAL GAME LAUNCHER & HUD MODAL --- */
function launchGame(gameId) {
  const game = GAMES_DATA.find(g => g.id === gameId);
  if (!game) return;

  const t = TRANSLATIONS[GameZone.currentLang];
  const info = t.games[game.id] || { title: game.id, controls: '' };

  GameZone.activeGameId = game.id;
  const engine = window.GameZoneEngines[game.engineKey];
  if (!engine) {
    console.error(`Engine for ${game.engineKey} not loaded!`);
    return;
  }
  GameZone.activeEngine = engine;

  // Open Game Modal
  const modal = document.getElementById('game-modal');
  modal.classList.add('active');

  // Set Title & Details
  document.getElementById('modal-title').textContent = info.title;
  document.getElementById('modal-cat-tag').textContent = t['cat_' + game.category] || game.category;
  document.getElementById('modal-controls-hint').innerHTML = `<span class="control-badge">⌨️ ${info.controls}</span>`;

  // Reset HUD Metric Displays
  document.getElementById('hud-score-val').textContent = '0';
  document.getElementById('hud-level-val').textContent = '1';
  document.getElementById('hud-time-val').textContent = '0s';
  const healthFill = document.getElementById('hud-health-fill');
  if (healthFill) healthFill.style.width = '100%';

  // Hide end game overlay
  document.getElementById('game-end-overlay').classList.remove('active');

  // Check Touch / Mobile
  const touchOverlay = document.getElementById('touch-controls');
  if (window.innerWidth <= 992) {
    touchOverlay.classList.add('show-touch');
  }

  // Set crosshair cursor in shooter games
  if (game.category === 'shooter') {
    document.body.classList.add('cursor-aim');
  }

  // Initialize and start game engine
  const viewport = document.getElementById('active-game-container');
  engine.init(viewport, {
    updateScore: (score) => {
      document.getElementById('hud-score-val').textContent = score;
    },
    updateHealth: (cur, max) => {
      const pct = Math.max(0, Math.min(100, (cur / max) * 100));
      if (healthFill) healthFill.style.width = `${pct}%`;
    },
    updateLevel: (lvl) => {
      document.getElementById('hud-level-val').textContent = lvl;
    },
    updateTimer: (sec) => {
      document.getElementById('hud-time-val').textContent = `${sec}s`;
    },
    gameOver: (finalScore, isWin) => {
      onGameFinished(finalScore, isWin);
    },
    playSound: (soundType) => {
      SoundEngine.playSound(soundType);
    }
  });

  engine.start();

  // Profile XP award for playing
  GameZone.profile.totalPlays++;
  GameZone.profile.xp += 20;
  saveProfile();
}

function closeGameModal() {
  if (GameZone.activeEngine) {
    GameZone.activeEngine.destroy();
    GameZone.activeEngine = null;
  }
  GameZone.activeGameId = null;

  const modal = document.getElementById('game-modal');
  modal.classList.remove('active');
  document.body.classList.remove('cursor-aim');

  const viewport = document.getElementById('active-game-container');
  if (viewport) viewport.innerHTML = '';
}

function pauseActiveGame() {
  if (GameZone.activeEngine) GameZone.activeEngine.pause();
}

function resumeActiveGame() {
  if (GameZone.activeEngine) GameZone.activeEngine.resume();
}

function restartActiveGame() {
  if (GameZone.activeEngine) {
    document.getElementById('game-end-overlay').classList.remove('active');
    GameZone.activeEngine.restart();
  }
}

function toggleGameFullscreen() {
  const modalContainer = document.querySelector('.game-modal-container');
  if (!document.fullscreenElement) {
    if (modalContainer.requestFullscreen) modalContainer.requestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}

function onGameFinished(finalScore, isWin) {
  const t = TRANSLATIONS[GameZone.currentLang];
  const endOverlay = document.getElementById('game-end-overlay');
  const titleEl = document.getElementById('end-title');
  const scoreValEl = document.getElementById('end-score-val');

  endOverlay.classList.add('active');
  scoreValEl.textContent = finalScore;

  if (isWin) {
    titleEl.textContent = t.game_over_win;
    titleEl.className = 'game-end-title win';
    SoundEngine.playSound('coin');
  } else {
    titleEl.textContent = t.game_over_lose;
    titleEl.className = 'game-end-title lose';
  }

  // Update Profile High Scores & XP
  const prevHigh = GameZone.profile.highScores[GameZone.activeGameId] || 0;
  if (finalScore > prevHigh) {
    GameZone.profile.highScores[GameZone.activeGameId] = finalScore;
  }
  GameZone.profile.xp += Math.floor(finalScore / 10);
  checkLevelUp();
  saveProfile();
}

/* --- FAVORITES MANAGEMENT --- */
function toggleFavorite(gameId, event) {
  if (event) event.stopPropagation();
  const idx = GameZone.favorites.indexOf(gameId);
  if (idx === -1) {
    GameZone.favorites.push(gameId);
    SoundEngine.playSound('coin');
  } else {
    GameZone.favorites.splice(idx, 1);
    SoundEngine.playSound('hit');
  }
  localStorage.setItem('gz_favorites', JSON.stringify(GameZone.favorites));
  renderGameCards();
}

/* --- LOCALIZATION ENGINE --- */
function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  GameZone.currentLang = lang;
  localStorage.setItem('gz_lang', lang);

  // Update Active Lang Label
  const langLabel = document.getElementById('current-lang-text');
  if (langLabel) {
    langLabel.textContent = lang.toUpperCase();
  }

  // Update All Data-I18n Elements
  const t = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  // Update Search input placeholder
  const searchInput = document.getElementById('game-search-input');
  if (searchInput && t.search_placeholder) {
    searchInput.placeholder = t.search_placeholder;
  }

  // Close dropdown
  const dd = document.getElementById('lang-dropdown');
  if (dd) dd.classList.remove('show');

  renderGameCards();
}

/* --- THEME ENGINE (DARK / LIGHT) --- */
function toggleTheme() {
  GameZone.currentTheme = GameZone.currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', GameZone.currentTheme);
  localStorage.setItem('gz_theme', GameZone.currentTheme);

  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = GameZone.currentTheme === 'dark' ? '🌙' : '☀️';
  }
  SoundEngine.playSound('click');
}

/* --- PROFILE & LEVEL PROGRESSION --- */
function checkLevelUp() {
  const xpNeeded = GameZone.profile.level * 200;
  if (GameZone.profile.xp >= xpNeeded) {
    GameZone.profile.level++;
    SoundEngine.playSound('coin');
  }
}

function saveProfile() {
  localStorage.setItem('gz_profile', JSON.stringify(GameZone.profile));
  updateProfileNavBadge();
}

function updateProfileNavBadge() {
  const badgeLvl = document.getElementById('nav-profile-level');
  if (badgeLvl) badgeLvl.textContent = `LVL ${GameZone.profile.level}`;
  const avatarMini = document.getElementById('nav-avatar-mini');
  if (avatarMini) avatarMini.textContent = GameZone.profile.avatar;
}

function openProfileModal() {
  const modal = document.getElementById('user-profile-modal');
  modal.classList.add('active');

  document.getElementById('prof-username').textContent = GameZone.profile.username;
  document.getElementById('prof-avatar-big').textContent = GameZone.profile.avatar;
  document.getElementById('prof-level').textContent = `LEVEL ${GameZone.profile.level}`;
  document.getElementById('prof-plays').textContent = GameZone.profile.totalPlays;
  document.getElementById('prof-time').textContent = `${Math.floor(GameZone.profile.playTimeSeconds / 60)}m`;
  document.getElementById('prof-favs').textContent = GameZone.favorites.length;

  const xpPct = Math.min(100, (GameZone.profile.xp / (GameZone.profile.level * 200)) * 100);
  document.getElementById('prof-xp-fill').style.width = `${xpPct}%`;
}

function closeProfileModal() {
  const modal = document.getElementById('user-profile-modal');
  modal.classList.remove('active');
}

/* --- SEARCH & CATEGORY FILTERS --- */
function filterCategory(cat) {
  GameZone.activeCategory = cat;
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-cat') === cat);
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-cat') === cat);
  });
  renderGameCards();
  SoundEngine.playSound('click');
}

function resetFilters() {
  GameZone.activeCategory = 'all';
  GameZone.searchQuery = '';
  const searchInput = document.getElementById('game-search-input');
  if (searchInput) searchInput.value = '';
  document.getElementById('search-clear').classList.remove('visible');
  filterCategory('all');
}

/* --- INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
  // Theme init
  document.documentElement.setAttribute('data-theme', GameZone.currentTheme);
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) themeIcon.textContent = GameZone.currentTheme === 'dark' ? '🌙' : '☀️';

  // Sound toggle button
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.classList.toggle('active-state', GameZone.soundEnabled);
    soundBtn.addEventListener('click', () => {
      GameZone.soundEnabled = !GameZone.soundEnabled;
      localStorage.setItem('gz_sound', GameZone.soundEnabled);
      soundBtn.classList.toggle('active-state', GameZone.soundEnabled);
      SoundEngine.toggleMusic();
    });
  }

  // Language Dropdown Toggle
  const langBtn = document.getElementById('lang-btn');
  const langDd = document.getElementById('lang-dropdown');
  if (langBtn && langDd) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDd.classList.toggle('show');
    });
    window.addEventListener('click', () => langDd.classList.remove('show'));
  }

  // Category Pills Clicks
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      filterCategory(pill.getAttribute('data-cat'));
    });
  });

  // Nav Links Clicks
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const cat = link.getAttribute('data-cat');
      if (cat) {
        e.preventDefault();
        filterCategory(cat);
        const targetEl = document.getElementById('games');
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        // Close mobile drawer if open
        document.getElementById('nav-menu').classList.remove('open');
      }
    });
  });

  // Mobile Hamburger Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // Search Input with Debounce & Clear
  const searchInput = document.getElementById('game-search-input');
  const searchClear = document.getElementById('search-clear');
  if (searchInput && searchClear) {
    searchInput.addEventListener('input', (e) => {
      GameZone.searchQuery = e.target.value;
      searchClear.classList.toggle('visible', GameZone.searchQuery.length > 0);
      renderGameCards();
    });
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      GameZone.searchQuery = '';
      searchClear.classList.remove('visible');
      renderGameCards();
    });
  }

  // Sort Selector
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      GameZone.sortBy = e.target.value;
      renderGameCards();
    });
  }

  // Touch Virtual Controls Binding
  document.querySelectorAll('.touch-btn').forEach(btn => {
    const act = btn.getAttribute('data-action');
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (GameZone.activeEngine && GameZone.activeEngine.handleInput) {
        GameZone.activeEngine.handleInput(act, true);
      }
    });
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (GameZone.activeEngine && GameZone.activeEngine.handleInput) {
        GameZone.activeEngine.handleInput(act, false);
      }
    });
  });

  document.querySelectorAll('.touch-action-btn').forEach(btn => {
    const act = btn.getAttribute('data-action');
    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (GameZone.activeEngine && GameZone.activeEngine.handleInput) {
        GameZone.activeEngine.handleInput(act, true);
      }
    });
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (GameZone.activeEngine && GameZone.activeEngine.handleInput) {
        GameZone.activeEngine.handleInput(act, false);
      }
    });
  });

  // Play Time Counter ticker
  setInterval(() => {
    GameZone.profile.playTimeSeconds++;
    if (GameZone.profile.playTimeSeconds % 60 === 0) {
      saveProfile();
    }
  }, 1000);

  // Initialize Subsystems
  initCustomCursor();
  initHero3D();
  setLanguage(GameZone.currentLang);
  updateProfileNavBadge();
  renderGameCards();
});
