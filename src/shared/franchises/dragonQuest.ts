// Dragon Quest — curated canon. Mainline I-IX and XI (X is a Japan-first
// MMO whose offline version never shipped in the West — excluded on the
// FF XI logic) + Builders 1/2 (approved spin-off tier) + the HD-2D remakes.
// Heroes / Monsters / Treasures excluded. No `chrono`: mostly standalone
// worlds; the Erdrick trilogy runs III -> I -> II and the Zenithian trilogy
// VI -> IV -> V, and both are noted on the rows.
// All art URLs curl-verified 2026-08-15.

import type { FranchiseCfg } from './types'

export const DRAGON_QUEST: FranchiseCfg = {
  id: 'dragon-quest',
  name: 'Dragon Quest',
  short: 'Dragon Quest',
  color: '#3f8fd6',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1295510/library_hero.jpg',
  studio: 'Square Enix (Enix / Armor Project / Bird Studio)',
  tagline: 'Slimes, spells, and the same three names on every JRPG that followed.',
  trivia: [
    {
      title: 'The trinity',
      body: 'Every mainline entry since 1986 has come from the same three men: Yuji Horii writing and designing, Akira Toriyama drawing every monster and hero, Koichi Sugiyama composing. No other 40-year series has held one creative core that long. Toriyama and Sugiyama both died in the 2020s; XII is the first game after them.'
    },
    {
      title: 'The Japanese RPG, defined',
      body: 'Dragon Quest (1986) turned Western computer RPGs into something a Famicom owner could play — one hero, a menu, a world map — and sold the whole genre to Japan. The urban legend that DQ III caused school absences was real enough that later entries released on Saturdays; the game is a national event there in a way it never became in the West, where it spent years as "Dragon Warrior".'
    },
    {
      title: 'Two trilogies',
      body: 'I, II and III are the Erdrick (Loto) trilogy — III is the prequel that ends by revealing you have been playing the legend the first two games worship. IV, V and VI are the Zenithian trilogy, bound by a castle in the sky. Everything after stands alone, which is why this page has no Story order.'
    }
  ],
  entries: [
    { id: 'dq-1', title: 'Dragon Quest', aliases: ['Dragon Warrior', 'Dragon Quest I'], year: 1986, bgUrl: 'https://static.wikia.nocookie.net/dragonquest/images/3/37/GvkNOEeWcAALZEG.jpg/revision/latest?cb=20250716154202', note: 'Erdrick trilogy — the one hero' },
    { id: 'dq-2', title: 'Dragon Quest II: Luminaries of the Legendary Line', aliases: ['Dragon Quest II', 'Dragon Warrior II'], year: 1987, bgUrl: 'https://dragon-quest.org/w/images/a/a7/Dragon-Quest-II-japanese-box-art.jpg', note: 'Erdrick trilogy — a party of three' },
    { id: 'dq-3', title: 'Dragon Quest III: The Seeds of Salvation', aliases: ['Dragon Quest III', 'Dragon Warrior III'], year: 1988, bgUrl: 'https://dragon-quest.org/w/images/4/4e/DQIII_Famicom_Box_%28Front_Side%29.jpg', note: 'Erdrick trilogy — the prequel that started the legend' },
    { id: 'dq-4', title: 'Dragon Quest IV: Chapters of the Chosen', aliases: ['Dragon Quest IV', 'Dragon Warrior IV'], year: 1990, bgUrl: 'https://static.wikia.nocookie.net/dragonquest/images/9/9b/Dragon_Quest_4_remake_promo_art.jpg/revision/latest?cb=20241119005249', note: 'Zenithian trilogy — five chapters' },
    { id: 'dq-5', title: 'Dragon Quest V: Hand of the Heavenly Bride', aliases: ['Dragon Quest V'], year: 1992, mc: 87, bgUrl: 'https://static.wikia.nocookie.net/dragonquest/images/5/59/Dragon_quest_v_wall_1.jpg/revision/latest?cb=20140414034522', note: 'Zenithian trilogy — a whole life, and a bride' },
    { id: 'dq-6', title: 'Dragon Quest VI: Realms of Revelation', aliases: ['Dragon Quest VI'], year: 1995, mc: 80, bgUrl: 'https://static.wikia.nocookie.net/dragonquest/images/5/50/DQVISNES.jpg/revision/latest?cb=20211030014620', note: 'Zenithian trilogy — the dream world' },
    { id: 'dq-7', title: 'Dragon Quest VII: Fragments of the Forgotten Past', aliases: ['Dragon Quest VII', 'Dragon Warrior VII', 'Dragon Quest VII Reimagined'], externalIds: [{ source: 'steam', id: '2499860' }], year: 2000, mc: 82, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2499860/library_hero.jpg', note: 'The 100-hour one' },
    { id: 'dq-8', title: 'Dragon Quest VIII: Journey of the Cursed King', aliases: ['Dragon Quest VIII'], year: 2004, mc: 89, bgUrl: 'https://static.wikia.nocookie.net/dragonquest/images/f/f8/DQ8_party.webp/revision/latest?cb=20231110095559', note: 'Full 3D — the West finally noticed' },
    { id: 'dq-9', title: 'Dragon Quest IX: Sentinels of the Starry Skies', aliases: ['Dragon Quest IX'], year: 2009, mc: 87, bgUrl: 'https://static.wikia.nocookie.net/dragonquest/images/8/8c/DQIX_-_Promotion_Artwork_1.jpg/revision/latest?cb=20200817181955', note: 'DS — Japan played it on trains, together' },
    { id: 'dq-builders', title: 'Dragon Quest Builders', externalIds: [{ source: 'steam', id: '2436570' }], year: 2016, mc: 83, spinOff: true, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2436570/library_hero.jpg', note: 'Block-building in a fallen Alefgard' },
    { id: 'dq-11', title: 'Dragon Quest XI: Echoes of an Elusive Age', aliases: ['Dragon Quest XI', 'Dragon Quest XI S: Echoes of an Elusive Age - Definitive Edition'], externalIds: [{ source: 'steam', id: '1295510' }, { source: 'steam', id: '742120' }], year: 2017, mc: 86, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1295510/library_hero.jpg', note: 'The modern classic' },
    { id: 'dq-builders-2', title: 'Dragon Quest Builders 2', externalIds: [{ source: 'steam', id: '1072420' }], year: 2018, mc: 86, spinOff: true, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1072420/library_hero.jpg', note: 'Bigger, kinder, better' },
    { id: 'dq-3-hd2d', title: 'Dragon Quest III HD-2D Remake', externalIds: [{ source: 'steam', id: '2701660' }], year: 2024, mc: 83, remake: true, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2701660/library_hero.jpg', note: 'Remake of III — start of the Erdrick trilogy in HD-2D' },
    { id: 'dq-1-2-hd2d', title: 'Dragon Quest I & II HD-2D Remake', externalIds: [{ source: 'steam', id: '2893570' }], year: 2025, remake: true, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2893570/library_hero.jpg', note: 'Remake of I and II — the trilogy complete' }
  ],
  characters: [
    { id: 'dq-slime', name: 'Slime', role: 'Mascot', portraitUrl: 'https://static.wikia.nocookie.net/dragonquest/images/6/60/Slime_Artwork.png/revision/latest?cb=20250919234447', appearsIn: ['dq-1', 'dq-2', 'dq-3', 'dq-4', 'dq-5', 'dq-6', 'dq-7', 'dq-8', 'dq-9', 'dq-builders', 'dq-11', 'dq-builders-2', 'dq-3-hd2d', 'dq-1-2-hd2d'], blurb: 'A blue teardrop with a smile — the first thing every player fights and the friendliest monster in games. Toriyama\'s most-copied design.' },
    { id: 'dq-erdrick', name: 'Erdrick (Hero of III)', role: 'The legend', portraitUrl: 'https://static.wikia.nocookie.net/dragonquest/images/e/e0/Hero_DQIII_Artwork_Original.png/revision/latest?cb=20190830150554', appearsIn: ['dq-3', 'dq-3-hd2d', 'dq-1', 'dq-2', 'dq-1-2-hd2d'], blurb: 'The hero whose name I and II invoke as myth — and who you turn out to have been playing in III. The trilogy\'s twist.' },
    { id: 'dq-hero-5', name: 'Hero of V', role: 'Protagonist (V)', portraitUrl: 'https://static.wikia.nocookie.net/dragonquest/images/e/e4/Hero_DQV_Adult_Artwork.png/revision/latest?cb=20201024020356', appearsIn: ['dq-5'], blurb: 'Followed from childhood to fatherhood, enslaved, married, turned to stone — and never the chosen one; his son is. The series\' best story.' },
    { id: 'dq-bianca', name: 'Bianca', role: 'The bride (V)', portraitUrl: 'https://static.wikia.nocookie.net/dragonquest/images/d/d4/Bianca_HQ.png/revision/latest?cb=20200924235735', appearsIn: ['dq-5'], blurb: 'Childhood friend and one of the three possible brides in V. Thirty years later fans still argue you should pick her.' },
    { id: 'dq-hero-8', name: 'Hero of VIII', role: 'Protagonist (VIII)', portraitUrl: 'https://static.wikia.nocookie.net/dragonquest/images/b/b8/Hero_DQVIII_2_Artwork.png/revision/latest?cb=20201230204347', appearsIn: ['dq-8'], blurb: 'A royal guard escorting a king turned into a troll and a princess turned into a horse. The one who brought the West in.' },
    { id: 'dq-yangus', name: 'Yangus', role: 'Companion (VIII)', portraitUrl: 'https://static.wikia.nocookie.net/dragonquest/images/a/a6/Yangus_DQVIII_Artwork.png/revision/latest?cb=20201230192725', appearsIn: ['dq-8'], blurb: 'A reformed bandit with a Cockney accent and total devotion to "guv". Every party since has tried to have one of him.' },
    { id: 'dq-luminary', name: 'The Luminary', role: 'Protagonist (XI)', portraitUrl: 'https://static.wikia.nocookie.net/dragonquest/images/4/4d/Hero_DQXI_Artwork.png/revision/latest?cb=20201024030207', appearsIn: ['dq-11'], blurb: 'Born with the mark of the chosen, branded a demon by his own kingdom for it. XI\'s hero — and, by its ending, more than that.' },
    { id: 'dq-erik', name: 'Erik', role: 'Companion (XI)', portraitUrl: 'https://static.wikia.nocookie.net/dragonquest/images/9/96/DQXI_-_Erik.png/revision/latest?cb=20191227210121', appearsIn: ['dq-11'], blurb: 'The blue-haired thief who breaks the Luminary out of a dungeon and stays for the whole quest. XI\'s heart.' }
  ]
}
