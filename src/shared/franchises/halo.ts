// Halo — curated canon: the mainline FPS campaigns + ODST + Reach + the two
// Halo Wars RTS spin-offs. Spartan Assault/Strike and the Anniversary
// re-releases are excluded (Anniversaries and The Master Chief Collection
// are ALIASES of the games they contain — CE Anniversary -> CE, MCC -> CE as
// the first title it holds). Story order = in-universe year: Halo Wars 2531
// -> Reach 2552 -> CE (Campaign Evolved retells it) -> 2 -> ODST -> 3 -> 4
// (2557) -> 5 -> Wars 2 -> Infinite.
// All art URLs curl-verified 2026-08-15.

import type { FranchiseCfg } from './types'

export const HALO: FranchiseCfg = {
  id: 'halo',
  name: 'Halo',
  short: 'Halo',
  color: '#4c9a6a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/library_hero.jpg',
  studio: 'Bungie, then 343 Industries / Halo Studios (Xbox)',
  tagline: 'Finish the fight — the console shooter that built the Xbox.',
  trivia: [
    {
      title: 'Bungie\'s Mac game',
      body: 'Halo was announced by Steve Jobs at Macworld 1999 as a Mac and PC real-time strategy game. Microsoft bought Bungie in 2000, made it an Xbox launch title, and Combat Evolved (2001) is the reason the Xbox survived its first year — and the reason console shooters use two sticks the way they do.'
    },
    {
      title: 'Halo 2 and Live',
      body: 'Halo 2 (2004) built Xbox Live: matchmaking, party systems and ranked playlists as we know them were made for it. Its cliffhanger ending, cut for time, is still the most complained-about in the series; Halo 3 (2007) finished the fight and became the year\'s biggest entertainment launch of any kind.'
    },
    {
      title: 'After Bungie',
      body: 'Bungie left after Reach (2010) to make Destiny; 343 Industries took the series into the Reclaimer saga (4, 5, Infinite) and was renamed Halo Studios in 2024. Halo: Campaign Evolved (2026) is a ground-up remake of the first game.'
    }
  ],
  entries: [
    { id: 'halo-ce', title: 'Halo: Combat Evolved', aliases: ['Halo: Combat Evolved Anniversary', 'Halo: The Master Chief Collection'], externalIds: [{ source: 'steam', id: '976730' }, { source: 'steam', id: '1064221' }], year: 2001, chrono: 3, mc: 97, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1064221/capsule_616x353.jpg', note: 'The ring — where it all began (MCC folded in)' },
    { id: 'halo-2', title: 'Halo 2', aliases: ['Halo 2: Anniversary'], externalIds: [{ source: 'steam', id: '1064270' }], year: 2004, chrono: 5, mc: 95, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1064270/capsule_616x353.jpg', note: 'The Arbiter, Xbox Live, the cliffhanger' },
    { id: 'halo-3', title: 'Halo 3', externalIds: [{ source: 'steam', id: '1064271' }], year: 2007, chrono: 7, mc: 94, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1064271/header.jpg', note: 'Finish the fight' },
    { id: 'halo-wars', title: 'Halo Wars', aliases: ['Halo Wars: Definitive Edition'], externalIds: [{ source: 'steam', id: '459220' }], year: 2009, releaseDate: '2009-02-26', chrono: 1, mc: 82, spinOff: true, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/459220/capsule_616x353.jpg', note: 'RTS — 2531, the Spirit of Fire' },
    { id: 'halo-odst', title: 'Halo 3: ODST', externalIds: [{ source: 'steam', id: '1064272' }], year: 2009, releaseDate: '2009-09-22', chrono: 6, mc: 83, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1064272/capsule_616x353.jpg', note: 'New Mombasa, no Chief, all jazz' },
    { id: 'halo-reach', title: 'Halo: Reach', externalIds: [{ source: 'steam', id: '1064220' }], year: 2010, chrono: 2, mc: 91, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1064220/capsule_616x353.jpg', note: 'Bungie\'s farewell — you already know how it ends' },
    { id: 'halo-4', title: 'Halo 4', externalIds: [{ source: 'steam', id: '1064273' }], year: 2012, chrono: 8, mc: 87, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1064273/capsule_616x353.jpg', note: '343 takes over — the Didact' },
    { id: 'halo-5', title: 'Halo 5: Guardians', year: 2015, chrono: 9, mc: 84, bgUrl: 'https://www.halopedia.org/images/c/c6/H5G_-_Chief_vs_Warden.jpg', note: 'Xbox One only — Fireteam Osiris' },
    { id: 'halo-wars-2', title: 'Halo Wars 2', year: 2017, chrono: 10, mc: 79, spinOff: true, bgUrl: 'https://www.halopedia.org/images/1/16/HW2-TheHaloBattle01.png', note: 'RTS — Atriox and the Banished' },
    { id: 'halo-infinite', title: 'Halo Infinite', externalIds: [{ source: 'steam', id: '1240440' }], year: 2021, chrono: 11, mc: 87, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1240440/library_hero.jpg', note: 'Zeta Halo, open world' },
    { id: 'halo-campaign-evolved', title: 'Halo: Campaign Evolved', externalIds: [{ source: 'steam', id: '2806050' }], year: 2026, chrono: 4, remake: true, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2806050/library_hero.jpg', note: 'Ground-up remake of Combat Evolved' }
  ],
  characters: [
    { id: 'halo-master-chief', name: 'Master Chief', role: 'Spartan-117', portraitUrl: 'https://www.halopedia.org/images/7/77/HINF_John-117_RenderCrop.png', appearsIn: ['halo-ce', 'halo-campaign-evolved', 'halo-2', 'halo-3', 'halo-4', 'halo-5', 'halo-infinite'], blurb: 'John-117, the last of the Spartan-IIs and the face of the Xbox. Never takes the helmet off, never needs to.' },
    { id: 'halo-cortana', name: 'Cortana', role: 'AI companion', portraitUrl: 'https://www.halopedia.org/images/c/c2/HINF_CortanaCutout.png', appearsIn: ['halo-ce', 'halo-campaign-evolved', 'halo-2', 'halo-3', 'halo-4', 'halo-5'], blurb: 'The AI in the Chief\'s head — the voice of the series, and in Halo 4 its tragedy, as her seven-year lifespan runs out mid-war.' },
    { id: 'halo-arbiter', name: 'The Arbiter', role: 'Thel \'Vadam', portraitUrl: 'https://www.halopedia.org/images/d/d5/Enc22_ThelVadam.jpg', appearsIn: ['halo-2', 'halo-3', 'halo-5'], blurb: 'The disgraced Covenant commander given the mark of shame and made playable in Halo 2 — the series\' boldest swing, and its best co-lead.' },
    { id: 'halo-johnson', name: 'Sergeant Johnson', role: 'Avery Johnson, UNSC', portraitUrl: 'https://www.halopedia.org/images/7/7b/Hw2-leader-crop-johnson.png', appearsIn: ['halo-ce', 'halo-2', 'halo-3'], blurb: 'The cigar-chomping marine who survives everything until Halo 3 decides otherwise. "I know what the ladies like."' },
    { id: 'halo-noble-six', name: 'Noble Six', role: 'Spartan-B312 (Reach)', portraitUrl: 'https://www.halopedia.org/images/2/2b/B312.png', appearsIn: ['halo-reach'], blurb: 'Your Spartan on a planet that is going to fall no matter what you do. Reach\'s last mission has no objective but "Survive", and it is not one you can complete.' },
    { id: 'halo-guilty-spark', name: '343 Guilty Spark', role: 'Monitor of Installation 04', portraitUrl: 'https://www.halopedia.org/images/8/8f/HTMCC-H2A_343GuiltySpark.png', appearsIn: ['halo-ce', 'halo-2', 'halo-3'], blurb: 'The chirpy floating Forerunner AI who forgot to mention that firing the ring kills everyone. Ally, then very much not.' },
    { id: 'halo-atriox', name: 'Atriox', role: 'Warmaster of the Banished', portraitUrl: 'https://www.halopedia.org/images/b/b3/HINF_AtrioxRender.png', appearsIn: ['halo-wars-2', 'halo-infinite'], blurb: 'The Brute who broke from the Covenant and beat the Chief off-screen. Halo Wars 2\'s villain became the modern series\' big bad.' },
    { id: 'halo-keyes', name: 'Captain Jacob Keyes', role: 'Captain of the Pillar of Autumn', portraitUrl: 'https://www.halopedia.org/images/e/e6/Keyes.png', appearsIn: ['halo-ce'], blurb: 'The captain who wakes the Chief up over Halo, and the first Halo character whose fate the series made you carry. "Keyes" is a level name for a reason.' }
  ]
}
