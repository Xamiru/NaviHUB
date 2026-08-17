// Persona — curated canon: the numbered games (P1, both P2s, P3, P4, P5),
// P3 Reload as a remake row, and P5 Strikers (approved spin-off tier — a
// canon sequel). Enhanced editions (FES/Portable, Golden, Royal) are ALIASES
// of their base game, not rows: same story, and Steam only lists the
// enhanced version. Arena, Dancing, Q and Tactica are excluded. Story order:
// 1 -> 2 IS -> 2 EP -> 3 (Reload retells it) -> 4 -> 5 -> Strikers.
// All art URLs curl-verified 2026-08-15.

import type { FranchiseCfg } from './types'

export const PERSONA: FranchiseCfg = {
  id: 'persona',
  name: 'Persona',
  short: 'Persona',
  color: '#d63a3a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1687950/library_hero.jpg',
  studio: 'Atlus (P-Studio)',
  tagline: 'School by day, the collective unconscious by night.',
  trivia: [
    {
      title: 'A Megami Tensei spin-off',
      body: 'Persona began in 1996 as a Shin Megami Tensei side series — same demon-negotiation roots, moved from post-apocalypse to a Japanese high school. Persona 3 (2006) added the calendar, the social links and the daily-life half, and the spin-off outgrew its parent: P5 alone has outsold every mainline SMT combined.'
    },
    {
      title: 'Jung with a soundtrack',
      body: 'Personas, Shadows, the Velvet Room and Igor come straight from Carl Jung — the persona as social mask, the shadow as the repressed self. Shoji Meguro\'s scores (P3\'s hip-hop, P4\'s pop, P5\'s acid jazz) are why every entry\'s battle theme is a genre in itself.'
    },
    {
      title: 'The definitive editions',
      body: 'Every modern Persona ships twice: P3 became FES then Portable then Reload, P4 became Golden, P5 became Royal. This page folds each enhanced release into its base row — Reload is the exception, a ground-up remake with its own slot.'
    }
  ],
  entries: [
    { id: 'persona-1', title: 'Revelations: Persona', aliases: ['Persona', 'Shin Megami Tensei: Persona'], year: 1996, chrono: 1, bgUrl: 'https://static.wikia.nocookie.net/megamitensei/images/0/0a/P1_Main_Visual.jpg/revision/latest?cb=20240325061522', note: 'PS1 — St. Hermelin High' },
    { id: 'persona-2-is', title: 'Persona 2: Innocent Sin', aliases: ['Shin Megami Tensei: Persona 2: Innocent Sin'], year: 1999, chrono: 2, bgUrl: 'https://static.wikia.nocookie.net/megamitensei/images/d/d6/Innocent_Sin_characters.png/revision/latest?cb=20161017161516', note: 'Rumours become real' },
    { id: 'persona-2-ep', title: 'Persona 2: Eternal Punishment', aliases: ['Shin Megami Tensei: Persona 2: Eternal Punishment'], year: 2000, chrono: 3, bgUrl: 'https://static.wikia.nocookie.net/megamitensei/images/4/4d/Persona_2_characters.png/revision/latest?cb=20161017160710', note: 'The other side of Innocent Sin' },
    { id: 'persona-3', title: 'Persona 3', aliases: ['Shin Megami Tensei: Persona 3', 'Persona 3 FES', 'Persona 3 Portable', 'Shin Megami Tensei: Persona 3 FES', 'Shin Megami Tensei: Persona 3 Portable'], externalIds: [{ source: 'steam', id: '1809700' }], year: 2006, chrono: 4, mc: 86, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1809700/library_hero.jpg', note: 'The Dark Hour — where modern Persona starts (FES / Portable folded in)' },
    { id: 'persona-4', title: 'Persona 4', aliases: ['Shin Megami Tensei: Persona 4', 'Persona 4 Golden'], externalIds: [{ source: 'steam', id: '1113000' }], year: 2008, chrono: 6, mc: 90, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1113000/library_hero.jpg', note: 'Inaba, the Midnight Channel (Golden folded in)' },
    { id: 'persona-5', title: 'Persona 5', aliases: ['Persona 5 Royal'], externalIds: [{ source: 'steam', id: '1687950' }], year: 2016, chrono: 7, mc: 93, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1687950/library_hero.jpg', note: 'The Phantom Thieves (Royal folded in)' },
    { id: 'persona-5-strikers', title: 'Persona 5 Strikers', aliases: ['Persona 5 Scramble: The Phantom Strikers'], externalIds: [{ source: 'steam', id: '1382330' }], year: 2020, chrono: 8, mc: 81, spinOff: true, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1382330/library_hero.jpg', note: 'Canon summer road-trip sequel, musou-style' },
    { id: 'persona-3-reload', title: 'Persona 3 Reload', externalIds: [{ source: 'steam', id: '2161700' }], year: 2024, chrono: 5, mc: 87, remake: true, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2161700/library_hero.jpg', note: 'Full remake of Persona 3' }
  ],
  characters: [
    { id: 'persona-joker', name: 'Joker', role: 'Leader of the Phantom Thieves (P5)', portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/6/63/Persona_5_Hero.png/revision/latest?cb=20240407105006', appearsIn: ['persona-5', 'persona-5-strikers'], blurb: 'Ren Amamiya, on probation in Tokyo for a crime he did not commit, stealing hearts by night. The Smash Bros. invite made him the face of the whole series.' },
    { id: 'persona-morgana', name: 'Morgana', role: 'Not a cat (P5)', portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/6/68/P5_Morgana_character_artwork.png/revision/latest?cb=20200603184558', appearsIn: ['persona-5', 'persona-5-strikers'], blurb: 'The Phantom Thieves\' guide, transport, and bedtime enforcer. Insists he is human. The evidence is mixed.' },
    { id: 'persona-ann', name: 'Ann Takamaki', role: 'Panther (P5)', portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/b/be/An_takamaki.png/revision/latest?cb=20170426203909', appearsIn: ['persona-5', 'persona-5-strikers'], blurb: 'The first heart the Thieves steal is stolen for her sake. Model, whip, Carmen — and the team\'s conscience about why they do this.' },
    { id: 'persona-yu', name: 'Yu Narukami', role: 'Protagonist (P4)', portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/0/01/P4_Protagonist.png/revision/latest?cb=20230208003759', appearsIn: ['persona-4'], blurb: 'The transfer student who spends a year in Inaba solving murders through a television. Persona 4\'s whole thesis — facing yourself — runs through him.' },
    { id: 'persona-yosuke', name: 'Yosuke Hanamura', role: 'Partner (P4)', portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/9/95/Yosuke_Hanamura.png/revision/latest?cb=20230208003803', appearsIn: ['persona-4'], blurb: 'The Junes heir and Yu\'s first friend in town; the first Shadow you watch someone accept. Inaba\'s "prince".' },
    { id: 'persona-makoto', name: 'Makoto Yuki', role: 'Protagonist (P3)', portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/c/c1/P3_Protagonist.png/revision/latest?cb=20230205054436', appearsIn: ['persona-3', 'persona-3-reload'], blurb: 'The orphan who summons a Persona by putting an Evoker to his head — the image that defined P3\'s tone, and the ending it earns.' },
    { id: 'persona-aigis', name: 'Aigis', role: 'Anti-Shadow weapon (P3)', portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/2/22/P3_Aigis.png/revision/latest?cb=20230205053002', appearsIn: ['persona-3', 'persona-3-reload'], blurb: 'The android built to fight Shadows who learns what she was really built for. P3\'s epilogue is hers.' },
    { id: 'persona-igor', name: 'Igor', role: 'Master of the Velvet Room', portraitUrl: 'https://static.wikia.nocookie.net/megamitensei/images/6/68/Igor_%28Persona_Art%29.png/revision/latest?cb=20220227125743', appearsIn: ['persona-1', 'persona-2-is', 'persona-2-ep', 'persona-3', 'persona-4', 'persona-5', 'persona-3-reload', 'persona-5-strikers'], blurb: 'The long-nosed host who greets every protagonist between dream and reality. Welcome to the Velvet Room.' }
  ]
}
