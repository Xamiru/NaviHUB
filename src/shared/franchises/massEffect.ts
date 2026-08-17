// Mass Effect — curated canon: the Shepard trilogy, the Legendary Edition
// remaster (its own row — a separate purchase and Steam product), and
// Andromeda. Story order: 1 -> 2 -> 3, Legendary re-tells 1-3, Andromeda is
// 600 years later. All art URLs curl-verified 2026-08-15.

import type { FranchiseCfg } from './types'

export const MASS_EFFECT: FranchiseCfg = {
  id: 'mass-effect',
  name: 'Mass Effect',
  short: 'Mass Effect',
  color: '#d0402a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/library_hero.jpg',
  studio: 'BioWare (EA)',
  tagline: 'One Shepard, three games, and choices that actually carried over.',
  trivia: [
    {
      title: 'The save that carried',
      body: 'Mass Effect (2007) was designed as a trilogy from the first line: a decision file follows Commander Shepard from game to game, so who lived, who you romanced and what you said comes back two games later. Nothing else at that scale had tried it.\n\nBioWare\'s Casey Hudson led all three; the Paragon/Renegade wheel became the studio\'s signature.'
    },
    {
      title: 'The ending',
      body: 'Mass Effect 3\'s original three-colour ending (2012) caused a fan revolt loud enough that BioWare shipped a free Extended Cut clarifying it — one of the first times a studio publicly re-cut a finale under pressure. The Citadel DLC that followed is the series\' real goodbye.'
    },
    {
      title: 'Andromeda and after',
      body: 'Andromeda (2017) moved to a new galaxy and a new hero, launched with animation problems that became a meme, and was left without DLC. The 2021 Legendary Edition remaster brought the trilogy back; the next Mass Effect, back in the Milky Way, is in development under Mike Gamble.'
    }
  ],
  entries: [
    { id: 'me-1', title: 'Mass Effect', aliases: ['Mass Effect (2007)'], externalIds: [{ source: 'steam', id: '17460' }], year: 2007, chrono: 1, mc: 89, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17460/library_hero.jpg', note: 'Eden Prime — Saren and the Reapers' },
    { id: 'me-2', title: 'Mass Effect 2', externalIds: [{ source: 'steam', id: '24980' }], year: 2010, chrono: 2, mc: 94, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/24980/library_hero.jpg', note: 'The suicide mission' },
    { id: 'me-3', title: 'Mass Effect 3', externalIds: [{ source: 'steam', id: '1238020' }], year: 2012, chrono: 3, mc: 89, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238020/library_hero.jpg', note: 'Earth falls, the galaxy answers' },
    { id: 'me-andromeda', title: 'Mass Effect: Andromeda', externalIds: [{ source: 'steam', id: '1238000' }], year: 2017, chrono: 5, mc: 72, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238000/library_hero.jpg', note: 'Heleus, 600 years on — the Ryders' },
    { id: 'me-legendary', title: 'Mass Effect Legendary Edition', externalIds: [{ source: 'steam', id: '1328670' }], year: 2021, chrono: 4, mc: 86, remake: true, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1328670/library_hero.jpg', note: 'Remaster of the trilogy in one package' }
  ],
  characters: [
    { id: 'me-shepard', name: 'Commander Shepard', role: 'Protagonist', portraitUrl: 'https://static.wikia.nocookie.net/masseffect/images/2/24/MELE_Default_Shepards.png', appearsIn: ['me-1', 'me-2', 'me-3', 'me-legendary'], blurb: 'The first human Spectre, the only one who believes in the Reapers, and whoever you decided they were — man or woman, saint or bastard, Shepard is the trilogy\'s one constant.' },
    { id: 'me-garrus', name: 'Garrus Vakarian', role: 'The best friend', portraitUrl: 'https://static.wikia.nocookie.net/masseffect/images/9/9d/ME_garrus_charshot.png', appearsIn: ['me-1', 'me-2', 'me-3', 'me-legendary'], blurb: 'C-Sec officer, then Archangel, then always at Shepard\'s side. Calibrating. The most loved character BioWare ever wrote.' },
    { id: 'me-liara', name: 'Liara T\'Soni', role: 'Asari scientist, then Shadow Broker', portraitUrl: 'https://static.wikia.nocookie.net/masseffect/images/c/cd/ME_liara_charshot.png', appearsIn: ['me-1', 'me-2', 'me-3', 'me-legendary'], blurb: 'The shy Prothean archaeologist who becomes the galaxy\'s information broker between games. Present at the beginning and the end.' },
    { id: 'me-tali', name: 'Tali\'Zorah', role: 'Quarian engineer', portraitUrl: 'https://static.wikia.nocookie.net/masseffect/images/7/7d/ME_tali_charshot.png', appearsIn: ['me-1', 'me-2', 'me-3', 'me-legendary'], blurb: 'On pilgrimage from the Migrant Fleet in the first game, admiral of it by the third. Keelah se\'lai.' },
    { id: 'me-wrex', name: 'Urdnot Wrex', role: 'Krogan warlord', portraitUrl: 'https://static.wikia.nocookie.net/masseffect/images/0/01/ME_wrex_charshot.png', appearsIn: ['me-1', 'me-2', 'me-3', 'me-legendary'], blurb: 'The mercenary who becomes the leader his species needed — if you kept him alive on Virmire. Shepard. Wrex.' },
    { id: 'me-mordin', name: 'Mordin Solus', role: 'Salarian scientist', portraitUrl: 'https://static.wikia.nocookie.net/masseffect/images/4/42/Mordin_ME2_charshot.png', appearsIn: ['me-2', 'me-3', 'me-legendary'], blurb: 'The fast-talking doctor who helped make the genophage and spends the third game undoing it. Had to be him. Someone else might have gotten it wrong.' },
    { id: 'me-illusive-man', name: 'The Illusive Man', role: 'Cerberus', portraitUrl: 'https://static.wikia.nocookie.net/masseffect/images/a/af/TIM_ME2_charshot.png', appearsIn: ['me-2', 'me-3', 'me-legendary'], blurb: 'The cigarette-and-dying-star silhouette who brings Shepard back from the dead, for humanity\'s sake, on his terms.' },
    { id: 'me-ryder', name: 'Sara Ryder', role: 'Pathfinder (Andromeda)', portraitUrl: 'https://static.wikia.nocookie.net/masseffect/images/3/3c/Sara_Ryder.png', appearsIn: ['me-andromeda'], blurb: 'The unready heir to the Pathfinder title in a galaxy nobody mapped. Andromeda\'s protagonist, whichever twin you chose.' }
  ]
}
