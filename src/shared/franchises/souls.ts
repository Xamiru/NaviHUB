// FromSoftware Souls — the soulslike line: Demon's Souls, the Dark Souls
// trilogy, Bloodborne, Sekiro, Elden Ring, the Demon's Souls remake and
// Nightreign (approved spin-off). Armored Core, King's Field and The
// Duskbloods are excluded (not soulslike / not yet released). No `chrono`:
// only Dark Souls 1 -> 2 -> 3 is a story line, and even that is loose.
// All art URLs curl-verified 2026-08-15; Demon's Souls (both) and
// Bloodborne are PlayStation-only, so their backgrounds are official key art.

import type { FranchiseCfg } from './types'

export const SOULS: FranchiseCfg = {
  id: 'souls',
  name: 'FromSoftware Souls',
  short: 'Souls',
  color: '#c9903a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_hero.jpg',
  studio: 'FromSoftware (Hidetaka Miyazaki)',
  tagline: 'You died. Try again — the game is fair, you just are not yet.',
  trivia: [
    {
      title: 'The demon that nobody wanted',
      body: 'Demon\'s Souls (2009) was a troubled Sony-published project that Hidetaka Miyazaki, then a junior director, took over because nobody else wanted it. Sony declined to publish it in the West; Atlus did, and a genre was born from a game its own publisher had written off.\n\nMiyazaki has directed every entry since except Dark Souls II, and became FromSoftware\'s president in 2014.'
    },
    {
      title: 'A genre named after itself',
      body: '"Soulslike" is one of the few genre names taken from a single series: stamina-gated combat, corpse runs, bonfires, bosses that teach through death, and stories told through item descriptions instead of cutscenes. Half of modern action design descends from it.'
    },
    {
      title: 'The Ring',
      body: 'Elden Ring (2022), with world-building by George R. R. Martin, took the formula open-world and sold over 25 million copies — the studio\'s first true blockbuster and Game of the Year almost everywhere. Nightreign (2025) turned it into a co-op roguelike; the studio has never sat still.'
    }
  ],
  entries: [
    { id: 'souls-demons', title: 'Demon\'s Souls', aliases: ['Demon\'s Souls (2009)'], year: 2009, mc: 89, bgUrl: 'https://static.wikia.nocookie.net/demonssouls/images/2/21/Boletaria.jpg/revision/latest?cb=20130714091505', note: 'PS3 — Boletaria, where it began' },
    { id: 'souls-ds1', title: 'Dark Souls', aliases: ['Dark Souls: Prepare to Die Edition', 'Dark Souls: Remastered'], externalIds: [{ source: 'steam', id: '570940' }, { source: 'steam', id: '211420' }], year: 2011, mc: 89, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570940/library_hero.jpg', note: 'Lordran — praise the sun' },
    { id: 'souls-ds2', title: 'Dark Souls II', aliases: ['Dark Souls II: Scholar of the First Sin'], externalIds: [{ source: 'steam', id: '335300' }, { source: 'steam', id: '236430' }], year: 2014, mc: 91, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/335300/library_hero.jpg', note: 'Drangleic — the one Miyazaki did not direct' },
    { id: 'souls-bloodborne', title: 'Bloodborne', year: 2015, mc: 92, bgUrl: 'https://static.wikia.nocookie.net/bloodborne/images/2/2f/Bb-yharnam-alley.jpg/revision/latest?cb=20180104023328', note: 'PS4 — Yharnam, gothic and fast' },
    { id: 'souls-ds3', title: 'Dark Souls III', aliases: ['Dark Souls III: The Fire Fades Edition'], externalIds: [{ source: 'steam', id: '374320' }], year: 2016, mc: 89, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/library_hero.jpg', note: 'Lothric — the fire fades' },
    { id: 'souls-sekiro', title: 'Sekiro: Shadows Die Twice', externalIds: [{ source: 'steam', id: '814380' }], year: 2019, mc: 90, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/814380/library_hero.jpg', note: 'Sengoku Japan — parry or die' },
    { id: 'souls-demons-remake', title: 'Demon\'s Souls (2020)', aliases: ['Demon\'s Souls Remake'], year: 2020, mc: 92, remake: true, bgUrl: 'https://static.wikia.nocookie.net/demonssouls/images/9/91/Remake_Screenshot_-_1.jpg/revision/latest?cb=20200922210122', note: 'Bluepoint remake — PS5 launch showpiece' },
    { id: 'souls-elden-ring', title: 'Elden Ring', externalIds: [{ source: 'steam', id: '1245620' }], year: 2022, mc: 96, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_hero.jpg', note: 'The Lands Between — the blockbuster' },
    { id: 'souls-nightreign', title: 'Elden Ring Nightreign', externalIds: [{ source: 'steam', id: '2622380' }], year: 2025, mc: 77, spinOff: true, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2622380/library_hero.jpg', note: 'Three-player roguelike runs through Limveld' }
  ],
  characters: [
    { id: 'souls-solaire', name: 'Solaire of Astora', role: 'Warrior of Sunlight', portraitUrl: 'https://static.wikia.nocookie.net/darksouls/images/2/21/DS1R_Solaire_of_Astora_in_Undead_Burg_%28half_body%2C_front%29.webp/revision/latest/scale-to-width-down/800?cb=20231127191535', appearsIn: ['souls-ds1'], blurb: 'The knight looking for his own sun, and the friendliest face in Lordran. Praise it. Jolly co-operation.' },
    { id: 'souls-artorias', name: 'Artorias the Abysswalker', role: 'Knight of Gwyn', portraitUrl: 'https://static.wikia.nocookie.net/darksouls/images/b/ba/Knight_Artorias_Model.png/revision/latest/scale-to-width-down/541?cb=20210810060149', appearsIn: ['souls-ds1'], blurb: 'The legend of Oolacile, met at the bottom of the Abyss with his arm broken and his mind gone. The DLC boss that defined FromSoftware bosses.' },
    { id: 'souls-gwyn', name: 'Gwyn, Lord of Cinder', role: 'The first flame\'s keeper', portraitUrl: 'https://static.wikia.nocookie.net/darksouls/images/b/b4/Gwyn_Lord_of_Cinder.png/revision/latest/scale-to-width-down/637?cb=20181028080820', appearsIn: ['souls-ds1', 'souls-ds3'], blurb: 'The god who lit the fire and then burned himself to keep it lit. The final boss whose piano theme rewrites the whole game behind you.' },
    { id: 'souls-maria', name: 'Lady Maria of the Astral Clocktower', role: 'Hunter of the Healing Church', portraitUrl: 'https://static.wikia.nocookie.net/bloodborne/images/a/a7/Lady_Maria_concept_art.jpg/revision/latest/scale-to-width-down/1000?cb=20180726134851', appearsIn: ['souls-bloodborne'], blurb: 'The Old Hunters\' still centre — asleep in her chair until you wake her, then the best duel in Bloodborne.' },
    { id: 'souls-gehrman', name: 'Gehrman, the First Hunter', role: 'Your host in the Dream', portraitUrl: 'https://static.wikia.nocookie.net/bloodborne/images/d/da/Gehrman%2C_the_First_Hunter_concept_art_1.jpg/revision/latest/scale-to-width-down/839?cb=20180728123257', appearsIn: ['souls-bloodborne'], blurb: 'The old man in the wheelchair who offers you mercy at the end. Refuse it and you find out why he is called the first.' },
    { id: 'souls-wolf', name: 'Wolf', role: 'Protagonist (Sekiro)', portraitUrl: 'https://static.wikia.nocookie.net/sekiro/images/4/41/Sekiro.png/revision/latest?cb=20190422172934&path-prefix=es', appearsIn: ['souls-sekiro'], blurb: 'The one-armed shinobi bound to a divine child, and the studio\'s only voiced, named lead. Hesitation is defeat.' },
    { id: 'souls-ranni', name: 'Ranni the Witch', role: 'Empyrean (Elden Ring)', portraitUrl: 'https://static.wikia.nocookie.net/eldenring/images/f/f4/ER_Concept_Art_Ranni.jpg/revision/latest?cb=20240819025648', appearsIn: ['souls-elden-ring'], blurb: 'The four-armed doll who set the whole Shattering in motion and offers you the Age of Stars. Elden Ring\'s best questline.' },
    { id: 'souls-malenia', name: 'Malenia, Blade of Miquella', role: 'The undefeated', portraitUrl: 'https://static.wikia.nocookie.net/eldenring/images/9/98/ER_Boss_Malenia%2C_Goddess_of_Rot_Scarlet_Aeonia.png/revision/latest?cb=20251211015318', appearsIn: ['souls-elden-ring'], blurb: 'Rotting from within, never once defeated in battle — and the boss that turned Let Me Solo Her into a folk hero.' }
  ]
}
