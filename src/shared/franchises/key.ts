// Key — the Visual Arts brand's visual novels and the anime around them, one
// row per release in release order: the twenty main and spin-off novels from
// Kanon (1999) to anemoi (2026), the Toei, Kyoto Animation, J.C.Staff, Eight
// Bit, David Production and Feel adaptations, and the three original P.A.
// Works series written by Jun Maeda (Angel Beats!, Charlotte, The Day I Became
// a God). Enhanced and all-ages editions (Little Busters! Ecstasy and its
// Converted/English editions, planetarian HD, Harmonia Full HD
// Edition, Summer Pockets Reflection Blue) are ALIASES of their base novel,
// the Persona rule. No chrono column: each title is a separate story.
// Excluded: the mobile RPG Heaven Burns Red (2022, no verified Steam release),
// short fan-disc extras (Clannad Hikari Mimamoru Sakamichi de, Little Busters!
// SS, the Nishizono Mio and Rewrite gaiden shorts, Rewrite: Cradles Tale),
// Kanon Kazahana, Air in Summer, the Angel Beats! and Charlotte specials, the
// Little Busters! OVA, Kaginado Season 2, the four 2025 Summer Pockets
// compilation films, and the unreleased Summer Pockets Sunnyside Stories
// (2026-12) and later Prima Doll volumes. Ids and dates from VNDB / AniList,
// story facts from the Wikipedia Key and per-title articles, art from AniList,
// all verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const KEY_VISUAL_ARTS: FranchiseCfg = {
  id: 'key',
  name: 'Key',
  short: 'Key',
  color: '#7fb8e6',
  heroUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/4181.jpg',
  studio: 'Key (Visual Arts)',
  tagline: 'Ordinary days, a sudden loss, and the long way back to a reunion.',
  trivia: [
    {
      title: 'The crying game',
      body: 'Key\'s founders came from Tactics, where One: Kagayaku Kisetsu e was built on a simple formula: a comedic first half, a heart-warming romantic middle, a tragic separation and finally an emotional reunion. The genre it named is the "crying game", or nakige. When most of that staff left to join Visual Arts, they formed Key on July 21, 1998, and used the same formula for Kanon.\n\nThe brand name came late. The working name was Azurite, which Jun Maeda disliked; he took "Key" from the sign of a musical instrument store he passed on his way to work, and the staff adopted it by majority vote. Ryukishi07 later wrote that he studied Key\'s games while planning Higurashi, aiming to scare where Key made players cry.'
    },
    {
      title: 'Jun Maeda',
      body: 'Co-founder Jun Maeda planned, wrote and composed for most of Key\'s novels. He stepped down as main scenario writer after Little Busters! Ecstasy but kept writing music, designed Angel Beats! 1st Beat and supplied the original concept for Summer Pockets. He chose not to write the Summer Pockets scenario himself because its rural, seaside summer was too close to Air.\n\nWith P.A. Works and Aniplex, Key turned Maeda\'s ideas into three original anime series: Angel Beats! (2010), Charlotte (2015) and The Day I Became a God (2020). He wrote the screenplay of each, with original character designs by Key artist Na-Ga.'
    },
    {
      title: 'Kinetic novels',
      body: 'Planetarian (2004), Key\'s shortest game, has no choices and a single ending; Key called the format a "kinetic novel", read like a CD or a film is played. Harmonia (2016) returned to the format and was released in English before its Japanese release.\n\nIn October 2020 Key announced three more kinetic novels at once: Loopers, Lunaria: Virtualized Moonchild and Stella of The End, released in 2021, 2021 and 2022. Kanon and Air began as adult games before all-ages versions; Clannad (2004) was the first Key novel made for all ages from the start.'
    }
  ],
  entries: [
    {
      id: 'key-kanon',
      title: 'Kanon',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '33' }],
      year: 1999,
      releaseDate: '1999-06-04',
      note: 'Yuichi returns to a snowbound city after seven years and slowly regains his lost memories'
    },
    {
      id: 'key-air',
      title: 'Air',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '36' }],
      year: 2000,
      releaseDate: '2000-09-08',
      note: 'Traveling showman Yukito searches for the girl in the sky; told in Dream, Summer and Air arcs'
    },
    {
      id: 'key-kanon-2002',
      title: 'Kanon',
      mediaType: 'anime',
      aliases: ['Kanon (2002)'],
      externalIds: [{ source: 'anilist', id: '144' }],
      year: 2002,
      releaseDate: '2002-01-31',
      adaptation: true,
      note: 'Toei Animation\'s 13-episode adaptation'
    },
    {
      id: 'key-clannad',
      title: 'Clannad',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '4' }],
      year: 2004,
      releaseDate: '2004-04-28',
      note: 'Tomoya Okazaki from his last school year into adulthood; After Story opens after School Life'
    },
    {
      id: 'key-planetarian',
      title: 'Planetarian: The Reverie of a Little Planet',
      mediaType: 'visual_novel',
      aliases: ['planetarian ~Chiisana Hoshi no Yume~', 'planetarian HD'],
      externalIds: [{ source: 'vndb', id: '34' }],
      year: 2004,
      releaseDate: '2004-11-29',
      note: 'A junker meets Yumemi, a robot still running a planetarium in a dead city'
    },
    {
      id: 'key-air-tv',
      title: 'Air',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '101' }],
      year: 2005,
      releaseDate: '2005-01-07',
      adaptation: true,
      note: 'Kyoto Animation\'s 13-episode adaptation'
    },
    {
      id: 'key-air-film',
      title: 'Air: The Motion Picture',
      mediaType: 'anime',
      aliases: ['Air (Movie)'],
      externalIds: [{ source: 'anilist', id: '713' }],
      year: 2005,
      releaseDate: '2005-02-05',
      adaptation: true,
      note: 'Toei Animation film directed by Osamu Dezaki'
    },
    {
      id: 'key-tomoyo-after',
      title: 'Tomoyo After: It\'s a Wonderful Life',
      mediaType: 'visual_novel',
      aliases: ['Tomoyo After'],
      externalIds: [{ source: 'vndb', id: '12' }],
      year: 2005,
      releaseDate: '2005-11-25',
      spinOff: true,
      note: 'Tomoya, now a garbage collector, dates Tomoyo and takes in her half-sister Tomo'
    },
    {
      id: 'key-kanon-2006',
      title: 'Kanon (2006)',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '1530' }],
      year: 2006,
      releaseDate: '2006-10-05',
      adaptation: true,
      note: 'Kyoto Animation\'s 24-episode adaptation, with Pachelbel\'s Canon as a recurring piece'
    },
    {
      id: 'key-little-busters',
      title: 'Little Busters!',
      mediaType: 'visual_novel',
      aliases: [
        'Little Busters! Ecstasy',
        'Little Busters! English Edition',
        'Little Busters! Converted Edition'
      ],
      externalIds: [{ source: 'vndb', id: '5' }],
      year: 2007,
      releaseDate: '2007-07-27',
      note: 'Narcoleptic Riki recruits a baseball team while Rin hunts the secret to this world'
    },
    {
      id: 'key-clannad-film',
      title: 'Clannad: The Motion Picture',
      mediaType: 'anime',
      aliases: ['Clannad Movie'],
      externalIds: [{ source: 'anilist', id: '1723' }],
      year: 2007,
      releaseDate: '2007-09-15',
      adaptation: true,
      note: 'Toei Animation film that reinterprets the story around Nagisa'
    },
    {
      id: 'key-clannad-tv',
      title: 'Clannad',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '2167' }],
      year: 2007,
      releaseDate: '2007-10-05',
      adaptation: true,
      note: 'Kyoto Animation\'s first season: Tomoya meets Nagisa, who is repeating her final year'
    },
    {
      id: 'key-clannad-tomoyo-ova',
      title: 'Clannad: Another World, Tomoyo Chapter',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '4059' }],
      year: 2008,
      releaseDate: '2008-07-16',
      spinOff: true,
      note: 'Alternate-world episode: Tomoya dates Tomoyo as she becomes student council president'
    },
    {
      id: 'key-clannad-after-story',
      title: 'Clannad: After Story',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '4181' }],
      year: 2008,
      releaseDate: '2008-10-03',
      adaptation: true,
      note: 'Second season: Tomoya and Nagisa marry and start a family of their own'
    },
    {
      id: 'key-clannad-kyou-ova',
      title: 'Clannad: Another World, Kyou Chapter',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '6351' }],
      year: 2009,
      releaseDate: '2009-07-01',
      spinOff: true,
      note: 'Alternate-world episode with Kyou as heroine while her sister Ryou dates Tomoya'
    },
    {
      id: 'key-angel-beats',
      title: 'Angel Beats!',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '6547' }],
      year: 2010,
      releaseDate: '2010-04-03',
      note: 'Amnesiac Otonashi joins the Afterlife Battlefront against Angel at an afterlife school'
    },
    {
      id: 'key-kud-wafter',
      title: 'Kud Wafter',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '3079' }],
      year: 2010,
      releaseDate: '2010-06-25',
      spinOff: true,
      note: 'Riki and Kudryavka\'s romance, continuing her story after Little Busters! Ecstasy'
    },
    {
      id: 'key-rewrite',
      title: 'Rewrite',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '751' }],
      year: 2011,
      releaseDate: '2011-06-24',
      note: 'Kotarou is drawn into a war between familiar summoners and superhumans in Kazamatsuri'
    },
    {
      id: 'key-rewrite-harvest-festa',
      title: 'Rewrite Harvest festa!',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '8020' }],
      year: 2012,
      releaseDate: '2012-07-27',
      spinOff: true,
      note: 'Fan disc with six heroine scenarios and the RPG minigame Rewrite Quest'
    },
    {
      id: 'key-lb-anime',
      title: 'Little Busters!',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '13655' }],
      year: 2012,
      releaseDate: '2012-10-06',
      adaptation: true,
      note: 'J.C.Staff\'s first season: Riki recruits new members to form a baseball team'
    },
    {
      id: 'key-lb-refrain',
      title: 'Little Busters! Refrain',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '18195' }],
      year: 2013,
      releaseDate: '2013-10-05',
      adaptation: true,
      note: 'Riki learns the secret behind his narcolepsy and the truth about this world'
    },
    {
      id: 'key-lb-ex',
      title: 'Little Busters! EX',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '20481' }],
      year: 2014,
      releaseDate: '2014-01-29',
      adaptation: true,
      note: 'Eight episodes following Saya Tokido, the heroine added in Ecstasy'
    },
    {
      id: 'key-angel-beats-1st-beat',
      title: 'Angel Beats! -1st beat-',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '13774' }],
      year: 2015,
      releaseDate: '2015-06-26',
      adaptation: true,
      note: 'First volume of a novel retelling of the anime, with routes for individual characters'
    },
    {
      id: 'key-charlotte',
      title: 'Charlotte',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '20997' }],
      year: 2015,
      releaseDate: '2015-07-05',
      note: 'Yuu can possess others for five seconds, until Nao Tomori exposes him'
    },
    {
      id: 'key-rewrite-anime',
      title: 'Rewrite',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21382' }],
      year: 2016,
      releaseDate: '2016-07-02',
      adaptation: true,
      note: 'Eight Bit\'s first 13 episodes'
    },
    {
      id: 'key-planetarian-ona',
      title: 'Planetarian: The Reverie of a Little Planet',
      mediaType: 'anime',
      aliases: ['planetarian: Chiisana Hoshi no Yume'],
      externalIds: [{ source: 'anilist', id: '21732' }],
      year: 2016,
      releaseDate: '2016-07-07',
      adaptation: true,
      note: 'Five-episode net series by David Production'
    },
    {
      id: 'key-planetarian-film',
      title: 'Planetarian: Storyteller of the Stars',
      mediaType: 'anime',
      aliases: ['planetarian: Hoshi no Hito'],
      externalIds: [{ source: 'anilist', id: '21771' }],
      year: 2016,
      releaseDate: '2016-09-03',
      adaptation: true,
      note: 'Film joining the original story to the Hoshi no Hito light novel sequel'
    },
    {
      id: 'key-harmonia',
      title: 'Harmonia',
      mediaType: 'visual_novel',
      aliases: ['Harmonia Full HD Edition'],
      externalIds: [{ source: 'vndb', id: '16510' }],
      year: 2016,
      releaseDate: '2016-09-23',
      note: 'Emotionless Rei, with a mechanical right hand, learns to feel in a ruined world'
    },
    {
      id: 'key-rewrite-s2',
      title: 'Rewrite: Moon and Terra',
      mediaType: 'anime',
      aliases: ['Rewrite 2nd Season'],
      externalIds: [{ source: 'anilist', id: '97665' }],
      year: 2017,
      releaseDate: '2017-01-14',
      adaptation: true,
      note: 'Final 11 episodes, adapting the Moon and Terra routes'
    },
    {
      id: 'key-summer-pockets',
      title: 'Summer Pockets',
      mediaType: 'visual_novel',
      aliases: ['Summer Pockets Reflection Blue'],
      externalIds: [{ source: 'vndb', id: '20424' }],
      year: 2018,
      releaseDate: '2018-06-29',
      note: 'Hairi escapes to the island of Torishirojima after his grandmother\'s death'
    },
    {
      id: 'key-day-i-became-a-god',
      title: 'The Day I Became a God',
      mediaType: 'anime',
      aliases: ['Kamisama ni Natta Hi'],
      externalIds: [{ source: 'anilist', id: '118419' }],
      year: 2020,
      releaseDate: '2020-10-11',
      note: 'Hina, calling herself the god Odin, tells Yota the world will end in 30 days'
    },
    {
      id: 'key-planetarian-snow-globe-ova',
      title: 'Planetarian: Snow Globe',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '113595' }],
      year: 2021,
      releaseDate: '2021-01-20',
      spinOff: true,
      note: 'Crowdfunded OVA of the prequel short story'
    },
    {
      id: 'key-loopers',
      title: 'Loopers',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '29445' }],
      year: 2021,
      releaseDate: '2021-05-28',
      note: 'Tyler and his geohunting friends are trapped in a loop that repeats the same day'
    },
    {
      id: 'key-kud-wafter-film',
      title: 'Kud Wafter',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '104749' }],
      year: 2021,
      releaseDate: '2021-07-16',
      adaptation: true,
      note: '51-minute J.C.Staff film of the spin-off'
    },
    {
      id: 'key-planetarian-snow-globe',
      title: 'Planetarian: Snow Globe',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '27747' }],
      year: 2021,
      releaseDate: '2021-09-03',
      spinOff: true,
      note: 'Kinetic novel of the prequel, released with the Planetarian Ultimate Edition'
    },
    {
      id: 'key-kaginado',
      title: 'Kaginado',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '132528' }],
      year: 2021,
      releaseDate: '2021-10-13',
      spinOff: true,
      note: 'Chibi crossover comedy putting characters from Kanon to Rewrite in one school'
    },
    {
      id: 'key-lunaria',
      title: 'LUNARiA -Virtualized Moonchild-',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '29444' }],
      year: 2021,
      releaseDate: '2021-12-24',
      note: 'Genius gamer T-bit meets LUNAR-Q, an AI living on a hidden Moon server'
    },
    {
      id: 'key-prima-doll-anime',
      title: 'Prima Doll',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '144509' }],
      year: 2022,
      releaseDate: '2022-07-09',
      note: 'Automata built for war find a new life serving at the Kuronekotei cafe'
    },
    {
      id: 'key-stella-of-the-end',
      title: 'Stella of The End',
      mediaType: 'visual_novel',
      aliases: ['Tsui no Stella'],
      externalIds: [{ source: 'vndb', id: '29443' }],
      year: 2022,
      releaseDate: '2022-09-30',
      note: 'Courier Jude escorts Philia, an android girl unaffected by the Singularity Machines'
    },
    {
      id: 'key-prima-doll-1',
      title: 'Prima Doll: Winter Sky Fireworks / Snowflake Patterns',
      mediaType: 'visual_novel',
      aliases: ['Prima Doll: Fuyuzora Hanabi / Sekka Mon\'you'],
      externalIds: [{ source: 'vndb', id: '29761' }],
      year: 2023,
      releaseDate: '2023-04-28',
      note: 'First Prima Doll kinetic novel, telling Haizakura\'s and Karasuba\'s pasts'
    },
    {
      id: 'key-prima-doll-2',
      title: 'Prima Doll: Ceremony of the Unknown',
      mediaType: 'visual_novel',
      aliases: ['Prima Doll: Mumei Tenrei'],
      externalIds: [{ source: 'vndb', id: '49954' }],
      year: 2024,
      releaseDate: '2024-05-31',
      note: 'Second volume: a nameless soldier and the doll Houkiboshi flee a ruined battlefield'
    },
    {
      id: 'key-summer-pockets-anime',
      title: 'Summer Pockets',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '143200' }],
      year: 2025,
      releaseDate: '2025-04-07',
      adaptation: true,
      note: 'Feel\'s 26-episode adaptation'
    },
    {
      id: 'key-kousai-toshi',
      title: 'Kousai Toshi',
      mediaType: 'visual_novel',
      aliases: ['Kōsai Toshi: Augment Protocol'],
      externalIds: [{ source: 'vndb', id: '48532' }],
      year: 2025,
      releaseDate: '2025-11-28',
      note: 'Demoted investigator Shion faces a conspiracy in District Zero, an augmented-reality city'
    },
    {
      id: 'key-anemoi',
      title: 'Anemoi',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '47937' }],
      year: 2026,
      releaseDate: '2026-04-24',
      note: 'Mugi and his sister Rikka visit windy Masumi to open a ten-year-old time capsule'
    }
  ],
  characters: [
    {
      id: 'key-ayu',
      name: 'Ayu Tsukimiya',
      role: 'Kanon heroine',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b250-nHDtLhTa83UB.png',
      appearsIn: ['key-kanon', 'key-kanon-2002', 'key-kanon-2006'],
      blurb: 'A small, energetic girl with a winged backpack who literally bumps into Yuichi early in the story and loves taiyaki. Like Yuichi, she has lost memories of the past.'
    },
    {
      id: 'key-misuzu',
      name: 'Misuzu Kamio',
      role: 'Air heroine',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b188-GZZD6CO44tdn.png',
      appearsIn: ['key-air', 'key-air-tv', 'key-air-film'],
      blurb: 'A lonely girl obsessed with dinosaurs who believes another self of hers is flying in the sky. She names the crow she finds Sora.'
    },
    {
      id: 'key-tomoya',
      name: 'Tomoya Okazaki',
      role: 'Clannad protagonist',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b4606-61r9h3WUrkA9.png',
      appearsIn: [
        'key-clannad',
        'key-tomoyo-after',
        'key-clannad-film',
        'key-clannad-tv',
        'key-clannad-tomoyo-ova',
        'key-clannad-after-story',
        'key-clannad-kyou-ova'
      ],
      blurb: 'A third-year student labelled a delinquent, estranged from his father after a shoulder injury ended his basketball. Clannad follows him from school into adulthood.'
    },
    {
      id: 'key-nagisa',
      name: 'Nagisa Furukawa',
      role: 'Clannad heroine',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b4604-YFJiWeuGSIYf.png',
      appearsIn: [
        'key-clannad',
        'key-clannad-film',
        'key-clannad-tv',
        'key-clannad-after-story'
      ],
      blurb: 'A timid girl repeating her final year after a long illness, who wants to revive the school theater club. In After Story she marries Tomoya and dies soon after their daughter Ushio is born.'
    },
    {
      id: 'key-riki',
      name: 'Riki Naoe',
      role: 'Little Busters! protagonist',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b4624-PHjBHfiBMGTD.png',
      appearsIn: [
        'key-little-busters',
        'key-kud-wafter',
        'key-lb-anime',
        'key-lb-refrain',
        'key-lb-ex',
        'key-kud-wafter-film'
      ],
      blurb: 'Orphaned young and diagnosed with narcolepsy, he was pulled out of his grief by the Little Busters. Now he is tasked with recruiting a baseball team.'
    },
    {
      id: 'key-kanade',
      name: 'Kanade Tachibana',
      role: 'Angel Beats! heroine',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b22369-zC7OgGbfO7b6.jpg',
      appearsIn: ['key-angel-beats', 'key-angel-beats-1st-beat'],
      blurb: 'The afterlife school\'s student council president, called Angel by the Afterlife Battlefront. Her duty to stop disruption sets her against Yuri, and she defends herself with abilities she calls Guard Skills.'
    },
    {
      id: 'key-yumemi',
      name: 'Yumemi Hoshino',
      role: 'Planetarian heroine',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b35292-ZD7SwfF1jK2H.png',
      appearsIn: [
        'key-planetarian',
        'key-planetarian-ona',
        'key-planetarian-film',
        'key-planetarian-snow-globe-ova',
        'key-planetarian-snow-globe'
      ],
      blurb: 'A talkative gynoid attendant who has waited thirty years for a customer in an abandoned rooftop planetarium. She is unaware of how the world outside has changed.'
    },
    {
      id: 'key-shiroha',
      name: 'Shiroha Naruse',
      role: 'Summer Pockets heroine',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b274071-9lvsb2dkcSCK.png',
      appearsIn: ['key-summer-pockets', 'key-summer-pockets-anime'],
      blurb: 'The main heroine of Summer Pockets, a calm, shy girl with no friends besides her grandfather. She often gazes out over the sea around the island.'
    }
  ]
}
