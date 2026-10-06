// Kingdom Hearts — every mainline and story-relevant entry of the Dark Seeker
// Saga: KH, Chain of Memories, KH2, 358/2 Days, Birth by Sleep, Re:coded,
// Dream Drop Distance, 0.2, KH3, Melody of Memory. The HD collections
// (1.5+2.5 ReMIX, 2.8 Final Chapter Prologue) bundle several of these into one
// Steam product each, so they are EXTRA Steam ids shared across the games they
// contain, never rows of their own: 1.5+2.5 (2552430) holds KH Final Mix,
// Re:Chain of Memories, 358/2 Days, KH2 Final Mix, Birth by Sleep Final Mix and
// Re:coded; 2.8 (2552440) holds Dream Drop Distance and 0.2. Melody of Memory
// was never released on Steam (Epic Games Store on PC). Excluded: the mobile
// Union χ / Dark Road prologue games and the Kingdom Hearts χ Back Cover movie
// bundled inside 2.8, since all three belong to that excluded browser/mobile
// side-story; Kingdom Hearts IV, announced but unreleased by 2026-10-05.
// Route is the standard recommended order (release order; Melody of Memory is
// an optional rhythm-game recap, not required reading). Chrono is the
// in-universe order per the series' own numbering scheme — Birth by Sleep is
// "0", so it opens the story, and 0.2 is placed directly before Kingdom Hearts
// III, matching its ending (Aqua's rescue) and the 2.8 collection's own
// positioning as KH3's immediate lead-in.
// Ids and dates from Wikipedia and the Steam store; no anime adaptations exist
// for this franchise, so character art is from the Kingdom Hearts Wiki
// (Fandom) — no Steam, AniList or Wikimedia Commons source carries official
// character renders for this series. All verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const KINGDOM_HEARTS: FranchiseCfg = {
  id: 'kingdom-hearts',
  name: 'Kingdom Hearts',
  short: 'Kingdom Hearts',
  color: '#f2c40c',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2552450/library_hero.jpg',
  studio: 'Square Enix (Nomura Tetsuya)',
  tagline: 'Disney worlds, Final Fantasy faces, one Keyblade war.',
  trivia: [
    {
      title: 'An elevator pitch, literally',
      body: 'The idea began with Shinji Hashimoto and Hironobu Sakaguchi wishing Square had a character as recognizable as Mario for a 3D platformer; Tetsuya Nomura, overhearing them, volunteered to direct. Square and Disney shared the same Tokyo office building at the time, and a chance elevator meeting between Hashimoto and a Disney executive turned the idea into an actual pitch. Development started in February 2000, with Kazushige Nojima (Final Fantasy VII, VIII) writing the scenario.'
    },
    {
      title: 'The Dark Seeker Saga',
      body: 'Every entry here but Melody of Memory belongs to one ongoing story, the "Dark Seeker Saga," running from the original 2002 game through Kingdom Hearts III. Several entries first shipped on handhelds or mobile phones, which is why the PlayStation HD collections present 358/2 Days and Re:coded as cinematic movies rather than playable games, and why the subtitles (358/2 Days, Re:coded, 0.2) read as a puzzle until the whole saga is laid out.'
    },
    {
      title: 'One antagonist, thirteen vessels',
      body: 'Xehanort — split across thirteen bodies, Ansem the Wise\'s former apprentice, and the source of nearly every Organization XIII member — is the throughline antagonist across the whole saga. Donald Duck, Goofy and King Mickey are voiced by their standing Disney voice actors throughout, which is part of why the series reads as a genuine Square/Disney collaboration rather than a license coat of paint.'
    }
  ],
  entries: [
    {
      id: 'kh-1',
      title: 'Kingdom Hearts',
      aliases: ['Kingdom Hearts Final Mix'],
      externalIds: [{ source: 'steam', id: '2552430' }],
      year: 2002,
      releaseDate: '2002-03-28',
      chrono: 2,
      route: 1,
      note: 'Sora, Riku and Kairi, the Destiny Islands, and the first Keyblade'
    },
    {
      id: 'kh-com',
      title: 'Kingdom Hearts: Chain of Memories',
      aliases: ['Kingdom Hearts Re:Chain of Memories'],
      externalIds: [{ source: 'steam', id: '2552430' }],
      year: 2004,
      releaseDate: '2004-11-11',
      chrono: 3,
      route: 2,
      note: 'Castle Oblivion erases memories with every floor Sora climbs'
    },
    {
      id: 'kh-2',
      title: 'Kingdom Hearts II',
      aliases: ['Kingdom Hearts II Final Mix'],
      externalIds: [{ source: 'steam', id: '2552430' }],
      year: 2005,
      releaseDate: '2005-12-22',
      chrono: 5,
      route: 3,
      note: 'A year asleep later, Organization XIII and Roxas'
    },
    {
      id: 'kh-358',
      title: 'Kingdom Hearts 358/2 Days',
      externalIds: [{ source: 'steam', id: '2552430' }],
      year: 2009,
      releaseDate: '2009-05-30',
      chrono: 4,
      route: 4,
      note: 'Roxas\'s 358 days in Organization XIII, concurrent with Sora\'s sleep'
    },
    {
      id: 'kh-bbs',
      title: 'Kingdom Hearts: Birth by Sleep',
      aliases: ['Kingdom Hearts Birth by Sleep Final Mix'],
      externalIds: [{ source: 'steam', id: '2552430' }],
      year: 2010,
      releaseDate: '2010-01-09',
      chrono: 1,
      route: 5,
      note: 'Ten years earlier: Terra, Aqua and Ventus, and the Keyblade War\'s shadow'
    },
    {
      id: 'kh-recoded',
      title: 'Kingdom Hearts Re:coded',
      aliases: ['Kingdom Hearts coded'],
      externalIds: [{ source: 'steam', id: '2552430' }],
      year: 2010,
      releaseDate: '2010-10-07',
      chrono: 6,
      route: 6,
      note: 'A digitized Sora re-reads Jiminy\'s corrupted journal'
    },
    {
      id: 'kh-ddd',
      title: 'Kingdom Hearts 3D: Dream Drop Distance',
      externalIds: [{ source: 'steam', id: '2552440' }],
      year: 2012,
      releaseDate: '2012-03-29',
      chrono: 7,
      route: 7,
      note: 'Sora and Riku\'s Mark of Mastery exam, through sleeping worlds'
    },
    {
      id: 'kh-02',
      title: 'Kingdom Hearts 0.2: Birth by Sleep – A Fragmentary Passage',
      externalIds: [{ source: 'steam', id: '2552440' }],
      year: 2017,
      releaseDate: '2017-01-12',
      chrono: 8,
      route: 8,
      note: 'Aqua, alone in the Realm of Darkness, right up to Kingdom Hearts III\'s opening'
    },
    {
      id: 'kh-3',
      title: 'Kingdom Hearts III',
      externalIds: [{ source: 'steam', id: '2552450' }],
      year: 2019,
      releaseDate: '2019-01-25',
      chrono: 9,
      route: 9,
      note: 'The Dark Seeker Saga\'s conclusion: the second Keyblade War'
    },
    {
      id: 'kh-mom',
      title: 'Kingdom Hearts: Melody of Memory',
      year: 2020,
      releaseDate: '2020-11-11',
      chrono: 10,
      route: 10,
      optional: true,
      spinOff: true,
      note: 'Rhythm-game retrospective through the whole series\' music, with a short new epilogue'
    }
  ],
  characters: [
    {
      id: 'kh-sora',
      name: 'Sora',
      role: 'Keyblade wielder, protagonist',
      portraitUrl: 'https://static.wikia.nocookie.net/kingdomhearts/images/2/27/Sora_KHIV_Render.png/revision/latest?cb=20260816173717',
      appearsIn: ['kh-1', 'kh-com', 'kh-2', 'kh-recoded', 'kh-ddd', 'kh-3', 'kh-mom'],
      blurb: 'A Destiny Islands kid handed a Keyblade by accident, who crosses a dozen worlds trying to get his friends back. The saga never really leaves his point of view.'
    },
    {
      id: 'kh-riku',
      name: 'Riku',
      role: 'Sora\'s rival and best friend',
      portraitUrl: 'https://static.wikia.nocookie.net/kingdomhearts/images/7/75/Riku_KHIII.png/revision/latest?cb=20180614200451',
      appearsIn: ['kh-1', 'kh-com', 'kh-2', 'kh-ddd', 'kh-3', 'kh-mom'],
      blurb: 'Gives in to the darkness in the first game to protect Kairi, then spends every entry after earning his way back from it. The other half of the series\' real relationship.'
    },
    {
      id: 'kh-kairi',
      name: 'Kairi',
      role: 'Princess of Heart',
      portraitUrl: 'https://static.wikia.nocookie.net/kingdomhearts/images/a/a5/KairiKH3.png/revision/latest?cb=20190217034502',
      appearsIn: ['kh-1', 'kh-2', 'kh-3'],
      blurb: 'The reason Sora and Riku leave the islands in the first place, and the one Princess of Heart who eventually picks up a Keyblade of her own.'
    },
    {
      id: 'kh-roxas',
      name: 'Roxas',
      role: 'Sora\'s Nobody',
      portraitUrl: 'https://static.wikia.nocookie.net/kingdomhearts/images/e/e7/Roxas_from_Days_render.png/revision/latest?cb=20200127033946',
      appearsIn: ['kh-358', 'kh-2', 'kh-3'],
      blurb: 'Created the instant Sora loses his heart at the end of Chain of Memories. 358/2 Days is entirely his: Organization XIII, a sea-salt ice cream friendship, and a goodbye he does not get to choose.'
    },
    {
      id: 'kh-axel',
      name: 'Axel',
      role: 'Organization VIII, later Lea',
      portraitUrl: 'https://static.wikia.nocookie.net/kingdomhearts/images/0/0a/Axel_KHHD1.png/revision/latest?cb=20190217044616',
      appearsIn: ['kh-358', 'kh-2', 'kh-recoded', 'kh-3'],
      blurb: 'Got it memorized? The Organization\'s flame-wielder and Roxas\'s closest friend, whose loyalty to Roxas and Xion quietly outlasts his loyalty to the Organization.'
    },
    {
      id: 'kh-aqua',
      name: 'Aqua',
      role: 'Keyblade Master (Birth by Sleep)',
      portraitUrl: 'https://static.wikia.nocookie.net/kingdomhearts/images/0/0a/Aqua_KHIII.png/revision/latest?cb=20200705044213',
      appearsIn: ['kh-bbs', 'kh-02', 'kh-3'],
      blurb: 'The one member of Birth by Sleep\'s trio who keeps her heart and her Mastery — and pays for it with ten years trapped alone in the Realm of Darkness.'
    },
    {
      id: 'kh-terra',
      name: 'Terra',
      role: 'Keyblade apprentice (Birth by Sleep)',
      portraitUrl: 'https://static.wikia.nocookie.net/kingdomhearts/images/a/ad/Terra_kingdom_hearts_birth_by_sleep.webp/revision/latest?cb=20221004013447',
      appearsIn: ['kh-bbs', 'kh-3'],
      blurb: 'Strong enough to worry his own master, and exactly the apprentice Xehanort needs as a vessel. His body is not his own again until Kingdom Hearts III.'
    },
    {
      id: 'kh-xemnas',
      name: 'Xemnas',
      role: 'Superior of Organization XIII',
      portraitUrl: 'https://static.wikia.nocookie.net/kingdomhearts/images/0/01/Xemnas_KHIII.png/revision/latest?cb=20241014224831',
      appearsIn: ['kh-358', 'kh-2'],
      blurb: 'Xehanort\'s Nobody, and the one holding Organization XIII together around a single goal: a man-made Kingdom Hearts built from the hearts the Organization harvests.'
    }
  ]
}
