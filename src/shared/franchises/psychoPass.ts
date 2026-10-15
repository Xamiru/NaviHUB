// Psycho-Pass — Production I.G's original anime: three TV seasons, the 2015
// film, the Sinners of the System film trilogy, the First Inspector finale to
// season three and the 2023 film Providence. Chrono follows in-universe time:
// First Guardian (Sugo and Masaoka before the series) is slot 1; the seasons
// and the 2015 film follow in order; Sinners of the System's first and third
// cases share the slot after the film; Providence, which fills the gap
// before season three, comes next; then season three and First Inspector,
// its conclusion. Route is release order, with First Guardian as an optional
// detour. Excluded: the manga and novel adaptations (the anime is the
// original), the spin-off and parody manga, and the games.
// Ids, dates and scores from AniList; art from AniList, curl-verified
// 2026-10-14.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const PSYCHO_PASS: FranchiseCfg = {
  id: 'psycho-pass',
  name: 'Psycho-Pass',
  short: 'Psycho-Pass',
  color: '#2f8f9d',
  heroUrl: `${AL}/media/anime/banner/13601-YrCmS1oY4uBZ.jpg`,
  studio: 'Production I.G',
  tagline: 'A city that can measure the likelihood of a crime in a citizen’s mind, and the officers who carry the guns that read it.',
  trivia: [
    {
      title: 'The Sibyl System',
      body: 'The setting is a future Japan governed by the Sibyl System, which continuously scans citizens’ mental states and assigns each a Crime Coefficient. Inspectors and their Enforcers, latent criminals kept on a leash to catch other criminals, carry Dominators: guns that read the target’s coefficient and decide on their own whether to stun, kill or not fire at all.'
    },
    {
      title: 'Urobuchi’s first season',
      body: 'The first season (2012) was written by Gen Urobuchi, already known for Puella Magi Madoka Magica and Fate/Zero, and directed by Naoyoshi Shiotani under chief director Katsuyuki Motohiro. Its antagonist, Makishima, quotes literature constantly, and the series is threaded with references to Philip K. Dick, Orwell and Foucault.'
    },
    {
      title: 'Longer episodes for a third season',
      body: 'Psycho-Pass 3 (2019) moved to a new pair of inspectors and to eight episodes of roughly double the usual length. Its story was left open and concluded in First Inspector, a three-part follow-up released in 2020, while the 2023 film Providence went back to fill in the years between the earlier films and the third season.'
    }
  ],
  entries: [
    {
      id: 'pp-s1',
      title: 'Psycho-Pass',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '13601' }],
      year: 2012,
      releaseDate: '2012-10-12',
      chrono: 2,
      route: 1,
      mc: 81,
      note: 'Rookie inspector Akane Tsunemori joins Division One as a string of crimes slips past Sibyl’s scanners'
    },
    {
      id: 'pp-s2',
      title: 'Psycho-Pass 2',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '20513' }],
      year: 2014,
      releaseDate: '2014-10-10',
      chrono: 3,
      route: 2,
      mc: 71,
      note: 'A year and a half later, Akane faces a criminal Sibyl cannot see at all'
    },
    {
      id: 'pp-movie',
      title: 'Psycho-Pass: The Movie',
      mediaType: 'anime',
      aliases: ['Psycho-Pass Movie'],
      externalIds: [{ source: 'anilist', id: '20514' }],
      year: 2015,
      releaseDate: '2015-01-09',
      chrono: 4,
      route: 3,
      mc: 75,
      note: 'Sibyl’s system is exported abroad, and Akane follows a trail that leads to Kogami'
    },
    {
      id: 'pp-sots-1',
      title: 'Psycho-Pass: Sinners of the System 1 - Crime and Punishment',
      mediaType: 'anime',
      aliases: ['Psycho-Pass Sinners of the System Case 1: Tsumi to Batsu'],
      externalIds: [{ source: 'anilist', id: '102649' }],
      year: 2019,
      releaseDate: '2019-01-25',
      chrono: 5,
      route: 4,
      mc: 70,
      note: 'Case 1: Inspector Shimotsuki and Enforcer Ginoza investigate a closed town'
    },
    {
      id: 'pp-sots-2',
      title: 'Psycho-Pass: Sinners of the System 2 - First Guardian',
      mediaType: 'anime',
      aliases: ['Psycho-Pass Sinners of the System Case 2: First Guardian'],
      externalIds: [{ source: 'anilist', id: '104382' }],
      year: 2019,
      releaseDate: '2019-02-15',
      chrono: 1,
      route: 5,
      optional: true,
      mc: 73,
      note: 'Case 2: a prequel following Sugo’s military past and Masaoka before the series'
    },
    {
      id: 'pp-sots-3',
      title: 'Psycho-Pass: Sinners of the System 3 - On the Other Side of Love and Hate',
      mediaType: 'anime',
      aliases: ['Psycho-Pass Sinners of the System Case 3: Onshuu no Kanata ni'],
      externalIds: [{ source: 'anilist', id: '104990' }],
      year: 2019,
      releaseDate: '2019-03-08',
      chrono: 5,
      route: 6,
      mc: 76,
      note: 'Case 3: Kogami, still a fugitive abroad, is caught up in a war in South Asia'
    },
    {
      id: 'pp-s3',
      title: 'Psycho-Pass 3',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '108307' }],
      year: 2019,
      releaseDate: '2019-10-24',
      chrono: 7,
      route: 7,
      mc: 73,
      note: 'New inspectors Arata Shindo and Kei Mikhail Ignatov take over a changing Division One'
    },
    {
      id: 'pp-first-inspector',
      title: 'Psycho-Pass 3: First Inspector',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '113917' }],
      year: 2020,
      releaseDate: '2020-03-27',
      chrono: 8,
      route: 8,
      mc: 77,
      note: 'The three-part conclusion to season three'
    },
    {
      id: 'pp-providence',
      title: 'Psycho-Pass: Providence',
      mediaType: 'anime',
      aliases: ['Psycho-Pass Movie: Providence'],
      externalIds: [{ source: 'anilist', id: '153687' }],
      year: 2023,
      releaseDate: '2023-05-12',
      chrono: 6,
      route: 9,
      mc: 76,
      note: 'Film filling the gap before season three, with Akane, Kogami and the Ministry of Foreign Affairs'
    }
  ],
  characters: [
    {
      id: 'pp-akane',
      name: 'Akane Tsunemori',
      role: 'Inspector, Division One',
      portraitUrl: `${AL}/character/large/b68583-sEP2wyE2Tk7a.png`,
      appearsIn: ['pp-s1', 'pp-s2', 'pp-movie', 'pp-s3', 'pp-first-inspector', 'pp-providence'],
      blurb: 'A rookie with an unusually stable mind who learns how the system really works and decides to uphold the law anyway, on her own terms.'
    },
    {
      id: 'pp-kogami',
      name: 'Shinya Kogami',
      role: 'Enforcer, former inspector',
      portraitUrl: `${AL}/character/large/b68315-f9RBjyJCoj95.jpg`,
      appearsIn: ['pp-s1', 'pp-movie', 'pp-sots-3', 'pp-s3', 'pp-first-inspector', 'pp-providence'],
      blurb: 'Demoted to Enforcer after a case destroyed his own psycho-pass, he hunts Makishima with a single-mindedness that puts him outside the law.'
    },
    {
      id: 'pp-ginoza',
      name: 'Nobuchika Ginoza',
      role: 'Inspector, later Enforcer',
      portraitUrl: `${AL}/character/large/b69057-491sAhqnEsFZ.png`,
      appearsIn: ['pp-s1', 'pp-s2', 'pp-movie', 'pp-sots-1', 'pp-s3', 'pp-first-inspector', 'pp-providence'],
      blurb: 'A rigid, rule-bound inspector who fears becoming a latent criminal like his father, and is changed more than anyone by the first season.'
    },
    {
      id: 'pp-masaoka',
      name: 'Tomomi Masaoka',
      role: 'Veteran Enforcer',
      portraitUrl: `${AL}/character/large/n69061-qPWM72rly4m4.png`,
      appearsIn: ['pp-s1', 'pp-sots-2'],
      blurb: 'An old-school detective from before Sibyl, now an Enforcer, who trusts instinct over scanners and is quietly Ginoza’s father.'
    },
    {
      id: 'pp-makishima',
      name: 'Shogo Makishima',
      role: 'Antagonist',
      portraitUrl: `${AL}/character/large/n69725-Seck1SZfwQiR.jpg`,
      appearsIn: ['pp-s1'],
      blurb: 'A man whose crime coefficient never rises whatever he does, who arranges crimes for others to test what Sibyl’s society is worth.'
    },
    {
      id: 'pp-arata',
      name: 'Arata Shindo',
      role: 'Inspector, season three',
      portraitUrl: `${AL}/character/large/b146412-Nx0AzlsNAHot.png`,
      appearsIn: ['pp-s3', 'pp-first-inspector'],
      blurb: 'A new inspector with an uncanny ability to think like the people he investigates, searching for the truth about his father’s death.'
    },
    {
      id: 'pp-kei',
      name: 'Kei Mikhail Ignatov',
      role: 'Inspector, season three',
      portraitUrl: `${AL}/character/large/b146413-fse6clZ5L57M.png`,
      appearsIn: ['pp-s3', 'pp-first-inspector'],
      blurb: 'Arata’s childhood friend and partner, a former soldier whose brother’s death draws him toward a dangerous offer.'
    }
  ]
}
