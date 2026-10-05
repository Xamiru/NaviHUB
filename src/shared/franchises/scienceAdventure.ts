// Science Adventure — the 5pb./MAGES. visual novel series and its anime.
// Formerly the "Science Adventure" cross-media guide: its franchise and entry
// ids (science-adventure, sa-*) are kept. Core rows are the seven main novels;
// anime adaptations are optional route detours. Enhanced editions (Chaos;Head
// Noah over the 2008 original, Robotics;Notes Elite, Steins;Gate Elite) are
// ALIASES of their base novel, the Persona rule. Fan discs and spin-offs
// (Hiyoku Renri, Linear Bounded Phenogram, Love Chu Chu) and Occultic;Nine are
// excluded. Story order follows the in-universe years: 2009, 2010, 2010-11,
// 2015, 2019, 2020, 2036. Ids and years from VNDB/AniList, art from AniList,
// all curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const SCIENCE_ADVENTURE: FranchiseCfg = {
  id: 'science-adventure',
  name: 'Science Adventure',
  short: 'Science Adventure',
  color: '#c9a227',
  heroUrl: `${AL}/media/anime/banner/n9253-JIhmKgBKsWUN.jpg`,
  studio: 'MAGES. (5pb.) / Nitroplus',
  tagline: 'Delusion, time travel and conspiracy in one shared Tokyo.',
  trivia: [
    {
      title: 'One world, several cities',
      body: 'Every Science Adventure novel builds a thriller on real science and internet folklore: delusion and a Shibuya earthquake in Chaos;Head, John Titor and the Large Hadron Collider in Steins;Gate, augmented reality and solar flares in Robotics;Notes. The stories share one world, and the Committee of 300 conspiracy links Shibuya, Akihabara and Tanegashima across the series.\n\nChiyomaru Shikura created the series. Each core title is written to stand alone, so the order mostly matters for references, with two exceptions: Chaos;Child follows Chaos;Head, and Steins;Gate 0 follows Steins;Gate.'
    },
    {
      title: 'Reading order',
      body: 'This route follows the core novels in release order: Chaos;Head Noah, Steins;Gate, Robotics;Notes, Chaos;Child, Steins;Gate 0, Robotics;Notes DaSH and Anonymous;Code. Chaos;Child is a direct sequel to Chaos;Head, set six years after its Shibuya earthquake. Steins;Gate 0 branches from late in Steins;Gate’s final route, so finish Steins;Gate first. Robotics;Notes DaSH is a sequel set about half a year after Robotics;Notes, and Anonymous;Code comes last because it draws on the earlier games.'
    },
    {
      title: 'Which anime to watch',
      body: 'The Steins;Gate and Steins;Gate 0 anime are faithful and well loved; watching Steins;Gate after the novel is a common way to revisit it. The Chaos;Head (2008) and Chaos;Child (2017) anime compress long novels into twelve and thirteen episodes and are best treated as companions to the games rather than substitutes. Silent Sky concludes the Chaos;Child anime.'
    }
  ],
  entries: [
    {
      id: 'sa-chaoshead-anime',
      title: 'Chaos;Head',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '4975' }],
      year: 2008,
      releaseDate: '2008-10-09',
      chrono: 1,
      adaptation: true,
      optional: true,
      note: 'Twelve-episode adaptation of the original novel'
    },
    {
      id: 'sa-noah',
      title: 'Chaos;Head Noah',
      mediaType: 'visual_novel',
      aliases: ['Chaos;Head', 'カオスヘッド ノア'],
      externalIds: [
        { source: 'vndb', id: '22505' },
        { source: 'vndb', id: '382' }
      ],
      year: 2009,
      releaseDate: '2009-02-26',
      chrono: 1,
      route: 1,
      note: 'Shut-in Takumi and the New Generation murders in Shibuya (Noah expands the 2008 original)'
    },
    {
      id: 'sa-sg-vn',
      title: 'Steins;Gate',
      mediaType: 'visual_novel',
      aliases: ['Steins;Gate Elite', 'シュタインズ・ゲート'],
      externalIds: [{ source: 'vndb', id: '2002' }],
      year: 2009,
      releaseDate: '2009-10-15',
      chrono: 2,
      route: 2,
      note: 'Okabe’s phone microwave sends texts to the past, and SERN notices'
    },
    {
      id: 'sa-sg-anime',
      title: 'Steins;Gate',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '9253' }],
      year: 2011,
      releaseDate: '2011-04-06',
      chrono: 2,
      route: 3,
      adaptation: true,
      optional: true,
      note: 'White Fox’s faithful 24-episode adaptation'
    },
    {
      id: 'sa-sg-poriomania',
      title: 'Steins;Gate: Egoistic Poriomania',
      mediaType: 'anime',
      aliases: ['Steins;Gate: Oukoubakko no Poriomania'],
      externalIds: [{ source: 'anilist', id: '10863' }],
      year: 2012,
      releaseDate: '2012-02-22',
      chrono: 2,
      spinOff: true,
      optional: true,
      note: 'Comedy OVA set after the anime’s ending'
    },
    {
      id: 'sa-rn-vn',
      title: 'Robotics;Notes',
      mediaType: 'visual_novel',
      aliases: ['ROBOTICS;NOTES ELITE', 'ロボティクス・ノーツ'],
      externalIds: [{ source: 'vndb', id: '5883' }],
      year: 2012,
      releaseDate: '2012-06-28',
      chrono: 5,
      route: 5,
      note: 'A Tanegashima robotics club builds a giant robot and finds a conspiracy'
    },
    {
      id: 'sa-rn-anime',
      title: 'Robotics;Notes',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '13599' }],
      year: 2012,
      releaseDate: '2012-10-12',
      chrono: 5,
      route: 6,
      adaptation: true,
      optional: true,
      note: 'Production I.G’s 22-episode adaptation'
    },
    {
      id: 'sa-sg-movie',
      title: 'Steins;Gate: The Movie – Load Region of Déjà Vu',
      mediaType: 'anime',
      aliases: ['Steins;Gate: Fuka Ryouiki no Déjà vu'],
      externalIds: [{ source: 'anilist', id: '11577' }],
      year: 2013,
      releaseDate: '2013-04-20',
      chrono: 2,
      route: 4,
      optional: true,
      note: 'Original sequel film: a year later, Okabe starts slipping out of the world line'
    },
    {
      id: 'sa-cc-vn',
      title: 'Chaos;Child',
      mediaType: 'visual_novel',
      aliases: ['カオスチャイルド'],
      externalIds: [{ source: 'vndb', id: '14018' }],
      year: 2014,
      releaseDate: '2014-12-18',
      chrono: 4,
      route: 7,
      note: 'Six years after the Shibuya earthquake, the New Generation murders begin again'
    },
    {
      id: 'sa-sg0-beta',
      title: 'Steins;Gate 0: 23β -Divide by Zero-',
      mediaType: 'anime',
      aliases: ['Steins;Gate: Kyoukaimenjou no Missing Link - Divide By Zero'],
      externalIds: [{ source: 'anilist', id: '21624' }],
      year: 2015,
      releaseDate: '2015-12-03',
      chrono: 3,
      spinOff: true,
      optional: true,
      note: 'Alternate episode 23 that bridges the Steins;Gate anime into Steins;Gate 0'
    },
    {
      id: 'sa-sg0-vn',
      title: 'Steins;Gate 0',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '17102' }],
      year: 2015,
      releaseDate: '2015-12-10',
      chrono: 3,
      route: 10,
      note: 'The world line where Okabe gave up: Amadeus, an AI built from Kurisu’s memories'
    },
    {
      id: 'sa-cc-anime',
      title: 'Chaos;Child',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21126' }],
      year: 2017,
      releaseDate: '2017-01-11',
      chrono: 4,
      route: 8,
      adaptation: true,
      optional: true,
      note: 'Thirteen-episode adaptation, finished by Silent Sky'
    },
    {
      id: 'sa-cc-silent-sky',
      title: 'Chaos;Child: Silent Sky',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '98576' }],
      year: 2017,
      releaseDate: '2017-06-17',
      chrono: 4,
      route: 9,
      adaptation: true,
      optional: true,
      note: 'Film that adapts the novel’s true ending'
    },
    {
      id: 'sa-sg0-anime',
      title: 'Steins;Gate 0',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21127' }],
      year: 2018,
      releaseDate: '2018-04-12',
      chrono: 3,
      route: 11,
      adaptation: true,
      optional: true,
      note: '23-episode adaptation following the novel’s main route'
    },
    {
      id: 'sa-rnd-vn',
      title: 'Robotics;Notes DaSH',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '21281' }],
      year: 2019,
      releaseDate: '2019-01-31',
      chrono: 6,
      route: 12,
      note: 'Half a year after Robotics;Notes, Kaito is pulled into a new incident'
    },
    {
      id: 'sa-ac-vn',
      title: 'Anonymous;Code',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '17101' }],
      year: 2022,
      releaseDate: '2022-07-28',
      chrono: 7,
      route: 13,
      note: '2036: a hacker who can save and load reality'
    }
  ],
  characters: [
    {
      id: 'sa-okabe',
      name: 'Rintaro Okabe',
      role: 'Mad scientist (Steins;Gate)',
      portraitUrl: `${AL}/character/large/b35252-DY9TW6pusqeh.png`,
      appearsIn: ['sa-sg-vn', 'sa-sg-anime', 'sa-sg-poriomania', 'sa-sg-movie', 'sa-sg0-vn', 'sa-sg0-beta', 'sa-sg0-anime'],
      blurb: 'Self-styled Hououin Kyouma, founder of the Future Gadget Lab. The joke persona becomes armour once he is the only one who remembers every world line he has erased.'
    },
    {
      id: 'sa-kurisu',
      name: 'Kurisu Makise',
      role: 'Neuroscientist (Steins;Gate)',
      portraitUrl: `${AL}/character/large/b34470-Jw2LXZBL5R8i.png`,
      appearsIn: ['sa-sg-vn', 'sa-sg-anime', 'sa-sg-poriomania', 'sa-sg-movie', 'sa-sg0-vn', 'sa-sg0-beta', 'sa-sg0-anime'],
      blurb: 'An eighteen-year-old researcher whose memory-digitising paper makes time leaping possible. In Steins;Gate 0 she survives only as Amadeus, an AI copy of her mind.'
    },
    {
      id: 'sa-mayuri',
      name: 'Mayuri Shiina',
      role: 'Lab member 002 (Steins;Gate)',
      portraitUrl: `${AL}/character/large/b35253-u6QVgLLyHq2W.png`,
      appearsIn: ['sa-sg-vn', 'sa-sg-anime', 'sa-sg-poriomania', 'sa-sg-movie', 'sa-sg0-vn', 'sa-sg0-beta', 'sa-sg0-anime'],
      blurb: 'Okabe’s childhood friend, whose death on every world line drives the whole second half of the story.'
    },
    {
      id: 'sa-takumi',
      name: 'Takumi Nishijou',
      role: 'Protagonist (Chaos;Head)',
      portraitUrl: `${AL}/character/large/b12804-vs7huWRyQPZ2.png`,
      appearsIn: ['sa-noah', 'sa-chaoshead-anime'],
      blurb: 'A delusional shut-in who lives in a shipping container, drawn into the New Generation murders and unable to tell which of his fears are real.'
    },
    {
      id: 'sa-takuru',
      name: 'Takuru Miyashiro',
      role: 'Protagonist (Chaos;Child)',
      portraitUrl: `${AL}/character/large/b120858-8eTgjuxB5Ufx.jpg`,
      appearsIn: ['sa-cc-vn', 'sa-cc-anime', 'sa-cc-silent-sky'],
      blurb: 'President of his school newspaper, who investigates the copycat murders six years after the earthquake that levelled Shibuya.'
    },
    {
      id: 'sa-kaito',
      name: 'Kaito Yashio',
      role: 'Protagonist (Robotics;Notes)',
      portraitUrl: `${AL}/character/large/b60151-peXPayAsrPGG.jpg`,
      appearsIn: ['sa-rn-vn', 'sa-rn-anime', 'sa-rnd-vn'],
      blurb: 'A fighting-game obsessive in the robotics club who stumbles on a hidden report about a plot to end the world.'
    },
    {
      id: 'sa-akiho',
      name: 'Akiho Senomiya',
      role: 'Robotics club president (Robotics;Notes)',
      portraitUrl: `${AL}/character/large/b60153-JLSD4cybGZeO.png`,
      appearsIn: ['sa-rn-vn', 'sa-rn-anime', 'sa-rnd-vn'],
      blurb: 'Determined to finish the giant robot her sister’s club started, whatever it takes.'
    }
  ]
}
