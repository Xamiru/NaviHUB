// Mobile Suit Gundam — Universal Century continuity ONLY. Every alternate
// Gundam continuity (After War, Wing, Seed, 00, Iron-Blooded Orphans, The
// Witch from Mercury and the rest) is a separate setting and out of scope
// here; so is GQuuuuuuX (2025), which Sunrise has described as a parallel,
// "if" take on UC rather than a mainline entry, and the After Colony-era
// Build/G-era spinoffs. Chrono ranks the in-universe Universal Century
// year each release is set in (0068 = 1, 0079 = 2, 0083 = 3, 0087 = 4,
// 0088 = 5, 0093 = 6, 0096 = 7, 0097 = 8, 0105 = 9, 0123 = 10, 0153 = 11);
// stories set in the same year share a slot. The Origin's manga and OVA open
// around UC 0068, years before the original 1979 TV series they lead into. Route is a release-order newcomer
// path; its non-optional backbone is the six-work core most guides treat as
// essential — 0079, Zeta, ZZ, Char's Counterattack, Unicorn and Hathaway —
// with every side story, compilation film and re-edit marked optional.
// Unicorn RE:0096 is kept as its own optional row (a TV re-edit of the
// Unicorn OVA, not a different story). The three 1981-1982 compilation
// films condense the original TV series with some new footage and are
// included as the task asks; the Zeta/ZZ-era "New Translation" compilation
// films are left out to keep the page to the requested scope. Ids and years
// from AniList, art from AniList, curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const GUNDAM_UC: FranchiseCfg = {
  id: 'gundam-uc',
  name: 'Mobile Suit Gundam',
  short: 'Gundam (UC)',
  color: '#8b2635',
  heroUrl: `${AL}/media/anime/banner/80-LcQhJ600WeDn.jpg`,
  studio: 'Sunrise',
  tagline: 'A one-year war between Earth and its space colonies, and the pilots who keep refighting its aftermath for a century.',
  trivia: [
    {
      title: 'The war that never really ends',
      body: 'The original 1979 series set the template the whole Universal Century keeps returning to: a war between the Earth Federation and a breakaway space colony faction (Zeon, and its various successors) fought with mobile suits, with a young, reluctant pilot and Newtype psychic potential at the center. Zeta, ZZ, Char’s Counterattack, Unicorn and Hathaway each restage some version of that conflict decades apart on the UC calendar.'
    },
    {
      title: 'One rivalry across five decades of story',
      body: 'Amuro Ray and Char Aznable’s rivalry, begun in the original series, runs through Zeta and ZZ as a backdrop and comes to a head in Char’s Counterattack (UC 0093) — and the fallout from that film is still being argued about, directly, in Hathaway thirty years later.'
    },
    {
      title: 'A franchise that keeps filling in its own gaps',
      body: 'Side stories like 0080, 0083, 08th MS Team, Thunderbolt, Cucuruz Doan’s Island and Requiem for Vengeance all return to the original one-year war to tell stories the 1979 series had no runtime for, while The Origin goes further back, covering the years before UC 0079 that made Char and the Zabi family who they are.'
    }
  ],
  entries: [
    {
      id: 'uc-0079-tv',
      title: 'Mobile Suit Gundam',
      mediaType: 'anime',
      aliases: ['Kidou Senshi Gundam'],
      externalIds: [{ source: 'anilist', id: '80' }],
      year: 1979,
      releaseDate: '1979-04-07',
      chrono: 2,
      route: 1,
      mc: 77,
      note: 'UC 0079: Amuro Ray stumbles into the cockpit of a Federation prototype and the One Year War follows him'
    },
    {
      id: 'uc-movie-1',
      title: 'Mobile Suit Gundam I',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '1090' }],
      year: 1981,
      releaseDate: '1981-03-14',
      chrono: 2,
      route: 2,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 71,
      note: 'First of three theatrical compilation films condensing the original TV series with new footage'
    },
    {
      id: 'uc-movie-2',
      title: 'Mobile Suit Gundam II: Soldiers of Sorrow',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '1091' }],
      year: 1981,
      releaseDate: '1981-07-11',
      chrono: 2,
      route: 3,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 71,
      note: 'Second compilation film, covering the TV series’ middle stretch'
    },
    {
      id: 'uc-movie-3',
      title: 'Mobile Suit Gundam III: Encounters in Space',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '1092' }],
      year: 1982,
      releaseDate: '1982-03-13',
      chrono: 2,
      route: 4,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 76,
      note: 'Closing compilation film, with new animation for the One Year War’s final battles'
    },
    {
      id: 'uc-zeta',
      title: 'Mobile Suit Zeta Gundam',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '85' }],
      year: 1985,
      releaseDate: '1985-03-02',
      chrono: 4,
      route: 5,
      mc: 78,
      note: 'UC 0087-0088: a new Federation splinter group, the AEUG, fights a Federation turned as authoritarian as Zeon once was'
    },
    {
      id: 'uc-zz',
      title: 'Mobile Suit Gundam ZZ',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '86' }],
      year: 1986,
      releaseDate: '1986-03-08',
      chrono: 5,
      route: 6,
      mc: 66,
      note: 'Continues directly from Zeta: a scrap-dealing new pilot, Judau Ashta, inherits the AEUG’s fight against a Zeon remnant'
    },
    {
      id: 'uc-cca',
      title: 'Mobile Suit Gundam: Char’s Counterattack',
      mediaType: 'anime',
      aliases: ['Gyakushuu no Char'],
      externalIds: [{ source: 'anilist', id: '87' }],
      year: 1988,
      releaseDate: '1988-03-12',
      chrono: 6,
      route: 7,
      mc: 76,
      note: 'UC 0093: Char Aznable tries to drop a colony on Earth, and Amuro Ray is the one who has to stop him'
    },
    {
      id: 'uc-0080',
      title: 'Mobile Suit Gundam 0080: War in the Pocket',
      mediaType: 'anime',
      aliases: ['Pocket no Naka no Sensou'],
      externalIds: [{ source: 'anilist', id: '82' }],
      year: 1989,
      releaseDate: '1989-03-25',
      chrono: 2,
      route: 8,
      optional: true,
      spinOff: true,
      mc: 80,
      note: 'A child living near a neutral colony befriends a Zeon mobile suit pilot in the war’s final days'
    },
    {
      id: 'uc-f91',
      title: 'Mobile Suit Gundam F91',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '88' }],
      year: 1991,
      releaseDate: '1991-03-16',
      chrono: 10,
      route: 9,
      optional: true,
      mc: 63,
      note: 'UC 0123: a condensed feature film jumping thirty years ahead to a new war and a new generation of pilots'
    },
    {
      id: 'uc-0083',
      title: 'Mobile Suit Gundam 0083: Stardust Memory',
      mediaType: 'anime',
      aliases: ['Stardust Memory'],
      externalIds: [{ source: 'anilist', id: '84' }],
      year: 1991,
      releaseDate: '1991-05-23',
      chrono: 3,
      route: 10,
      optional: true,
      spinOff: true,
      mc: 67,
      note: 'UC 0083: Zeon loyalists steal a prototype Gundam, setting off the incident that leads to Zeta’s AEUG'
    },
    {
      id: 'uc-victory',
      title: 'Mobile Suit Victory Gundam',
      mediaType: 'anime',
      aliases: ['Kidou Senshi V Gundam'],
      externalIds: [{ source: 'anilist', id: '89' }],
      year: 1993,
      releaseDate: '1993-04-02',
      chrono: 11,
      route: 11,
      optional: true,
      mc: 67,
      note: 'UC 0153: a militia of child soldiers fights a new Zeon remnant occupying Earth'
    },
    {
      id: 'uc-08th',
      title: 'Mobile Suit Gundam: The 08th MS Team',
      mediaType: 'anime',
      aliases: ['Dai 08 MS Shotai'],
      externalIds: [{ source: 'anilist', id: '81' }],
      year: 1996,
      releaseDate: '1996-01-25',
      chrono: 2,
      route: 12,
      optional: true,
      spinOff: true,
      mc: 77,
      note: 'A ground-war love story between a Federation officer and a Zeon engineer, away from the series’ usual cast'
    },
    {
      id: 'uc-origin-manga',
      title: 'Mobile Suit Gundam: The Origin',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '30214' }],
      year: 2001,
      releaseDate: '2001-06-25',
      chrono: 1,
      mc: 83,
      note: 'Yoshikazu Yasuhiko’s manga, retelling the war’s origins from UC 0068 through Char and Amuro’s youth'
    },
    {
      id: 'uc-unicorn',
      title: 'Mobile Suit Gundam UC',
      mediaType: 'anime',
      aliases: ['Mobile Suit Gundam Unicorn'],
      externalIds: [{ source: 'anilist', id: '6336' }],
      year: 2010,
      releaseDate: '2010-02-20',
      chrono: 7,
      route: 13,
      mc: 78,
      note: 'UC 0096: Banagher Links inherits a Gundam built to carry the Federation’s most dangerous secret'
    },
    {
      id: 'uc-origin-ova',
      title: 'Mobile Suit Gundam: The Origin',
      mediaType: 'anime',
      aliases: ['Kidou Senshi Gundam: The Origin'],
      externalIds: [{ source: 'anilist', id: '10937' }],
      year: 2015,
      releaseDate: '2015-02-28',
      chrono: 1,
      route: 14,
      optional: true,
      adaptation: true,
      mc: 81,
      note: 'OVA adaptation of the manga’s early volumes'
    },
    {
      id: 'uc-thunderbolt-1',
      title: 'Mobile Suit Gundam Thunderbolt',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21458' }],
      year: 2015,
      releaseDate: '2015-12-25',
      chrono: 2,
      route: 15,
      optional: true,
      spinOff: true,
      mc: 77,
      note: 'A jazz-scored side story set in the debris-choked Thunderbolt Sector during the One Year War'
    },
    {
      id: 'uc-unicorn-re0096',
      title: 'Mobile Suit Gundam Unicorn RE:0096',
      mediaType: 'anime',
      aliases: ['Gundam Unicorn RE: 0096'],
      externalIds: [{ source: 'anilist', id: '21658' }],
      year: 2016,
      releaseDate: '2016-04-03',
      chrono: 7,
      route: 16,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 74,
      note: 'TV re-edit of the Unicorn OVA into weekly episodes, with some re-timed and extended scenes'
    },
    {
      id: 'uc-thunderbolt-dec-sky',
      title: 'Mobile Suit Gundam Thunderbolt: December Sky',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21893' }],
      year: 2016,
      releaseDate: '2016-06-25',
      chrono: 2,
      route: 17,
      optional: true,
      adaptation: true,
      mc: 78,
      note: 'Compilation film re-cutting Thunderbolt’s first season for theaters'
    },
    {
      id: 'uc-thunderbolt-bandit',
      title: 'Mobile Suit Gundam Thunderbolt: Bandit Flower',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '99547' }],
      year: 2017,
      releaseDate: '2017-11-18',
      chrono: 2,
      route: 18,
      optional: true,
      spinOff: true,
      mc: 69,
      note: 'Continues Thunderbolt’s story as its two rival pilots’ fight gets personal'
    },
    {
      id: 'uc-nt',
      title: 'Mobile Suit Gundam Narrative',
      mediaType: 'anime',
      aliases: ['Gundam NT'],
      externalIds: [{ source: 'anilist', id: '101554' }],
      year: 2018,
      releaseDate: '2018-11-30',
      chrono: 8,
      route: 19,
      optional: true,
      spinOff: true,
      mc: 61,
      note: 'UC 0097: a direct follow-up to Unicorn, chasing another Federation secret a year later'
    },
    {
      id: 'uc-origin-advent',
      title: 'Mobile Suit Gundam: The Origin - Advent of the Red Comet',
      mediaType: 'anime',
      aliases: ['THE ORIGIN - Zenya Akai Suisei'],
      externalIds: [{ source: 'anilist', id: '108039' }],
      year: 2019,
      releaseDate: '2019-04-29',
      chrono: 1,
      route: 20,
      optional: true,
      adaptation: true,
      mc: 79,
      note: 'Prequel OVA covering Char’s early path toward the Zabi family and the war to come'
    },
    {
      id: 'uc-hathaway',
      title: 'Mobile Suit Gundam Hathaway',
      mediaType: 'anime',
      aliases: ['Senkou no Hathaway'],
      externalIds: [{ source: 'anilist', id: '105595' }],
      year: 2021,
      releaseDate: '2021-06-11',
      chrono: 9,
      route: 21,
      mc: 79,
      note: 'UC 0105: Char’s Counterattack’s fallout, told through Bright Noa’s son turned anti-Federation terrorist'
    },
    {
      id: 'uc-doan',
      title: 'Mobile Suit Gundam: Cucuruz Doan’s Island',
      mediaType: 'anime',
      aliases: ['Kidou Senshi Gundam: Cucuruz Doan no Shima'],
      externalIds: [{ source: 'anilist', id: '139273' }],
      year: 2022,
      releaseDate: '2022-06-03',
      chrono: 2,
      route: 22,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 73,
      note: 'Theatrical remake of a 1979 TV episode: a deserter hiding child survivors from both armies'
    },
    {
      id: 'uc-requiem',
      title: 'GUNDAM: Requiem for Vengeance',
      mediaType: 'anime',
      aliases: ['Kidou Senshi Gundam: Fukushuu no Requiem'],
      externalIds: [{ source: 'anilist', id: '166703' }],
      year: 2024,
      releaseDate: '2024-10-17',
      chrono: 2,
      route: 23,
      optional: true,
      spinOff: true,
      mc: 61,
      note: 'A Zeon submarine crew’s side of the One Year War on the European front'
    },
    {
      id: 'uc-hathaway-2',
      title: 'Mobile Suit Gundam Hathaway: The Sorcery of Nymph Circe',
      mediaType: 'anime',
      aliases: ['Senkou no Hathaway - Circe no Majo'],
      externalIds: [{ source: 'anilist', id: '113971' }],
      year: 2026,
      releaseDate: '2026-01-30',
      chrono: 9,
      route: 24,
      mc: 79,
      note: 'Continues Hathaway’s story directly from the first film'
    }
  ],
  characters: [
    {
      id: 'uc-amuro',
      name: 'Amuro Ray',
      role: 'Pilot, RX-78-2 Gundam',
      portraitUrl: `${AL}/character/large/b1335-uzT1UsLOu3nE.png`,
      appearsIn: ['uc-0079-tv', 'uc-movie-1', 'uc-movie-2', 'uc-movie-3', 'uc-zeta', 'uc-cca'],
      blurb: 'A withdrawn engineer’s son who ends up piloting the Federation’s first Gundam by accident, and becomes the war’s most famous ace by the time it ends.'
    },
    {
      id: 'uc-char',
      name: 'Char Aznable',
      role: 'The Red Comet',
      portraitUrl: `${AL}/character/large/b1336-VjllcTHMDuhI.png`,
      appearsIn: ['uc-0079-tv', 'uc-movie-1', 'uc-movie-2', 'uc-movie-3', 'uc-zeta', 'uc-cca', 'uc-origin-manga', 'uc-origin-ova', 'uc-origin-advent'],
      blurb: 'A Zeon ace hiding his real identity and a grudge against the ruling Zabi family under a mask and a famous red mobile suit.'
    },
    {
      id: 'uc-bright',
      name: 'Bright Noa',
      role: 'Federation officer',
      portraitUrl: `${AL}/character/large/b1337-1Onnawv89DVo.png`,
      appearsIn: ['uc-0079-tv', 'uc-zeta', 'uc-zz', 'uc-unicorn', 'uc-hathaway'],
      blurb: 'Commands Federation ships across four decades of UC history, aging from a young officer into the father of Hathaway’s own story.'
    },
    {
      id: 'uc-kamille',
      name: 'Kamille Bidan',
      role: 'Pilot, Zeta Gundam',
      portraitUrl: `${AL}/character/large/b1341-dZu7Pi8FAKGi.png`,
      appearsIn: ['uc-zeta'],
      blurb: 'A sharp-tempered Newtype pilot who joins the AEUG after a Federation officer insults his mother, and pays dearly for his power by the series’ end.'
    },
    {
      id: 'uc-judau',
      name: 'Judau Ashta',
      role: 'Pilot, ZZ Gundam',
      portraitUrl: `${AL}/character/large/7904.jpg`,
      appearsIn: ['uc-zz'],
      blurb: 'A scrap dealer who steals a mobile suit to protect his sister and ends up leading the AEUG’s fight against a resurgent Zeon.'
    },
    {
      id: 'uc-banagher',
      name: 'Banagher Links',
      role: 'Pilot, Unicorn Gundam',
      portraitUrl: `${AL}/character/large/b9465-y2u6LL2HNtCy.png`,
      appearsIn: ['uc-unicorn', 'uc-unicorn-re0096'],
      blurb: 'A colony engineering student handed a Gundam built to unlock a secret both the Federation and Zeon remnants want buried.'
    },
    {
      id: 'uc-hathaway-noa',
      name: 'Hathaway Noa',
      role: 'Protagonist, Hathaway',
      portraitUrl: `${AL}/character/large/b40465-DmFzAQtt6GSC.png`,
      appearsIn: ['uc-hathaway', 'uc-hathaway-2'],
      blurb: 'Bright Noa’s son, radicalized by what he saw during Char’s Counterattack into leading an anti-Federation terror cell years later.'
    },
    {
      id: 'uc-sayla',
      name: 'Sayla Mass',
      role: 'Pilot, Char’s estranged sister',
      portraitUrl: `${AL}/character/large/b1338-gAbM9bSiwexP.png`,
      appearsIn: ['uc-0079-tv', 'uc-movie-1', 'uc-movie-2', 'uc-movie-3', 'uc-zz'],
      blurb: 'Fights alongside Amuro’s crew under a false name, hiding her real identity as Char’s sister and a Zabi by birth.'
    }
  ]
}
