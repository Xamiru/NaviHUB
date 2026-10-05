// Star Wars — Lucasfilm's saga films, anthology films and Disney+ television
// era. Core rows: the nine Skywalker saga films, Rogue One, Solo, the 2008
// Clone Wars theatrical film, and one row per live-action-or-mixed Disney+/TV
// series released by 2026-10-05, plus the 2026 theatrical The Mandalorian and
// Grogu (an addition beyond the base list — it released in theaters before the
// cutoff, so it is included as its own film row). Excluded as animated-only
// anthology/kids series outside the "live-action series" rule for additions:
// Star Wars Resistance, Star Wars Visions, Tales of the Jedi, Tales of the
// Empire and Young Jedi Adventures. Excluded as unreleased by the cutoff: Maul:
// Shadow Lord (not yet aired). Route is the release-order newcomer path with
// every television series marked as an optional detour. Chrono follows the
// standard in-universe timeline (BBY/ABY), with ties where series overlap the
// same stretch of galactic history (the two Clone Wars works; Rebels and
// Andor; the post-Return of the Jedi cluster of Mandalorian-era shows and
// Skeleton Crew). Ids and dates from TMDB (en-US), eras cross-checked against
// Wikipedia's episode-guide summaries, all curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

const TM = 'https://image.tmdb.org/t/p'

export const STAR_WARS: FranchiseCfg = {
  id: 'star-wars',
  name: 'Star Wars',
  short: 'Star Wars',
  color: '#ffe81f',
  heroUrl: `${TM}/w1280/zqkmTXzjkAgXmEWLRsY4UpTWCeo.jpg`,
  studio: 'Lucasfilm',
  tagline: 'A galaxy far, far away, told across nine saga films and a growing Disney+ era.',
  trivia: [
    {
      title: 'The saga and its anthologies',
      body: 'George Lucas released the original trilogy first (1977-1983), then the prequel trilogy (1999-2005) explaining how the Republic fell to the Empire, then sold Lucasfilm to Disney, which produced a sequel trilogy (2015-2019). Rogue One and Solo are anthology films that sit beside the saga rather than inside its numbered episodes, filling in the theft of the Death Star plans and young Han Solo\'s early years.\n\nThe 2008 Clone Wars film was cut together from the first four already-produced episodes of the animated series as a theatrical introduction, which is why it plays as a rougher, more compressed version of the show\'s own opening arc.'
    },
    {
      title: 'The Disney+ era',
      body: 'Starting with The Mandalorian in 2019, Lucasfilm built a connected run of live-action and animated television: The Mandalorian, The Book of Boba Fett, Obi-Wan Kenobi, Andor, Ahsoka and Skeleton Crew all share writers, directors and continuity with each other and with the earlier Clone Wars and Rebels. The Mandalorian, Boba Fett, Ahsoka and Skeleton Crew are explicitly the same stretch of timeline, about nine years after Return of the Jedi, and 2026\'s The Mandalorian and Grogu continues directly from Ahsoka\'s ending.'
    },
    {
      title: 'Watching by era, not release order',
      body: 'Because the saga was filmed out of internal order, two common routes exist: release order (this page\'s route) watches the films as audiences first saw them, starting with the 1977 original; "machete order" and other internal-chronology routes instead start with the prequels. Andor and Rebels cover overlapping years leading up to Rogue One from different angles — Andor follows the rebellion\'s political formation, Rebels follows a single starfighter crew — so neither supersedes the other.'
    }
  ],
  entries: [
    {
      id: 'sw-anh',
      title: 'Star Wars',
      mediaType: 'movie',
      aliases: ['Star Wars: Episode IV - A New Hope'],
      externalIds: [{ source: 'tmdb', id: '11' }],
      year: 1977,
      releaseDate: '1977-05-25',
      chrono: 11,
      route: 1,
      note: 'Luke Skywalker joins the Rebellion to destroy the Empire\'s Death Star'
    },
    {
      id: 'sw-esb',
      title: 'The Empire Strikes Back',
      mediaType: 'movie',
      aliases: ['Star Wars: Episode V - The Empire Strikes Back'],
      externalIds: [{ source: 'tmdb', id: '1891' }],
      year: 1980,
      releaseDate: '1980-05-20',
      chrono: 12,
      route: 2,
      note: 'The Empire routs the Rebellion, and Vader reveals he is Luke\'s father'
    },
    {
      id: 'sw-rotj',
      title: 'Return of the Jedi',
      mediaType: 'movie',
      aliases: ['Star Wars: Episode VI - Return of the Jedi'],
      externalIds: [{ source: 'tmdb', id: '1892' }],
      year: 1983,
      releaseDate: '1983-05-25',
      chrono: 13,
      route: 3,
      note: 'Luke confronts Vader and the Emperor as the Rebellion assaults the second Death Star'
    },
    {
      id: 'sw-tpm',
      title: 'Star Wars: Episode I - The Phantom Menace',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '1893' }],
      year: 1999,
      releaseDate: '1999-05-19',
      chrono: 2,
      route: 4,
      note: 'A trade blockade of Naboo leads the Jedi to a gifted slave boy, Anakin Skywalker'
    },
    {
      id: 'sw-aotc',
      title: 'Star Wars: Episode II - Attack of the Clones',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '1894' }],
      year: 2002,
      releaseDate: '2002-05-15',
      chrono: 3,
      route: 5,
      note: 'A secret clone army and a droid separatist movement push the Republic toward war'
    },
    {
      id: 'sw-rots',
      title: 'Star Wars: Episode III - Revenge of the Sith',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '1895' }],
      year: 2005,
      releaseDate: '2005-05-17',
      chrono: 5,
      route: 6,
      note: 'Anakin falls to the dark side and becomes Darth Vader as the Republic becomes the Empire'
    },
    {
      id: 'sw-cw-film',
      title: 'Star Wars: The Clone Wars',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '12180' }],
      year: 2008,
      releaseDate: '2008-08-05',
      chrono: 4,
      route: 7,
      optional: true,
      note: 'Theatrical compilation of the animated series\' first four episodes, introducing Ahsoka Tano'
    },
    {
      id: 'sw-cw-tv',
      title: 'Star Wars: The Clone Wars',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '4194' }],
      year: 2008,
      releaseDate: '2008-10-03',
      chrono: 4,
      route: 8,
      optional: true,
      note: 'Six seasons (plus a later Netflix/Disney+ run) following the Jedi through the Clone Wars'
    },
    {
      id: 'sw-rebels',
      title: 'Star Wars Rebels',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '60554' }],
      year: 2014,
      releaseDate: '2014-10-13',
      chrono: 9,
      route: 9,
      optional: true,
      note: 'A small starfighter crew sparks the early Rebellion in the years before Rogue One'
    },
    {
      id: 'sw-tfa',
      title: 'Star Wars: The Force Awakens',
      mediaType: 'movie',
      aliases: ['Star Wars: Episode VII - The Force Awakens'],
      externalIds: [{ source: 'tmdb', id: '140607' }],
      year: 2015,
      releaseDate: '2015-12-15',
      chrono: 14,
      route: 10,
      note: 'Thirty years on, a scavenger named Rey finds herself drawn into a new war with the First Order'
    },
    {
      id: 'sw-rogue-one',
      title: 'Rogue One: A Star Wars Story',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '330459' }],
      year: 2016,
      releaseDate: '2016-12-14',
      chrono: 10,
      route: 11,
      spinOff: true,
      note: 'A band of Rebels steals the Death Star plans in the days just before A New Hope'
    },
    {
      id: 'sw-tlj',
      title: 'Star Wars: The Last Jedi',
      mediaType: 'movie',
      aliases: ['Star Wars: Episode VIII - The Last Jedi'],
      externalIds: [{ source: 'tmdb', id: '181808' }],
      year: 2017,
      releaseDate: '2017-12-13',
      chrono: 15,
      route: 12,
      note: 'Rey seeks out the exiled Luke Skywalker while the Resistance is run to ground'
    },
    {
      id: 'sw-solo',
      title: 'Solo: A Star Wars Story',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '348350' }],
      year: 2018,
      releaseDate: '2018-05-15',
      chrono: 7,
      route: 13,
      spinOff: true,
      note: 'How a young Han Solo met Chewbacca and won the Millennium Falcon, about ten years before A New Hope'
    },
    {
      id: 'sw-mandalorian',
      title: 'The Mandalorian',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '82856' }],
      year: 2019,
      releaseDate: '2019-11-12',
      chrono: 17,
      route: 14,
      optional: true,
      note: 'A lone bounty hunter protects a foundling of Grogu\'s species, nine years after Return of the Jedi'
    },
    {
      id: 'sw-tros',
      title: 'Star Wars: The Rise of Skywalker',
      mediaType: 'movie',
      aliases: ['Star Wars: Episode IX - The Rise of Skywalker'],
      externalIds: [{ source: 'tmdb', id: '181812' }],
      year: 2019,
      releaseDate: '2019-12-18',
      chrono: 16,
      route: 15,
      note: 'The returned Emperor Palpatine forces a final confrontation with Rey'
    },
    {
      id: 'sw-bad-batch',
      title: 'Star Wars: The Bad Batch',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '105971' }],
      year: 2021,
      releaseDate: '2021-05-04',
      chrono: 6,
      route: 16,
      optional: true,
      note: 'A squad of mutated clone troopers goes rogue in the days right after Order 66'
    },
    {
      id: 'sw-boba-fett',
      title: 'The Book of Boba Fett',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '115036' }],
      year: 2021,
      releaseDate: '2021-12-29',
      chrono: 17,
      route: 17,
      optional: true,
      spinOff: true,
      note: 'Boba Fett claims Jabba\'s old territory on Tatooine, in the same stretch of timeline as The Mandalorian'
    },
    {
      id: 'sw-kenobi',
      title: 'Obi-Wan Kenobi',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '92830' }],
      year: 2022,
      releaseDate: '2022-05-26',
      chrono: 8,
      route: 18,
      optional: true,
      note: 'Ten years after Revenge of the Sith, a hiding Obi-Wan is drawn back out by the Inquisitors'
    },
    {
      id: 'sw-andor',
      title: 'Andor',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '83867' }],
      year: 2022,
      releaseDate: '2022-09-21',
      chrono: 9,
      route: 19,
      optional: true,
      note: 'Cassian Andor\'s five-year radicalization into the spy who steals the Death Star plans'
    },
    {
      id: 'sw-ahsoka',
      title: 'Ahsoka',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '114461' }],
      year: 2023,
      releaseDate: '2023-08-22',
      chrono: 17,
      route: 20,
      optional: true,
      spinOff: true,
      note: 'Ahsoka Tano hunts the Imperial remnant trying to bring Grand Admiral Thrawn home'
    },
    {
      id: 'sw-acolyte',
      title: 'The Acolyte',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '114479' }],
      year: 2024,
      releaseDate: '2024-06-04',
      chrono: 1,
      route: 21,
      optional: true,
      note: 'A century before the Skywalker saga, a Jedi investigation uncovers a hidden Sith apprentice'
    },
    {
      id: 'sw-skeleton-crew',
      title: 'Star Wars: Skeleton Crew',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '202879' }],
      year: 2024,
      releaseDate: '2024-12-02',
      chrono: 17,
      route: 22,
      optional: true,
      note: 'Four kids get lost in the galaxy, in the same post-Return-of-the-Jedi era as The Mandalorian'
    },
    {
      id: 'sw-mando-grogu',
      title: 'The Mandalorian and Grogu',
      mediaType: 'movie',
      aliases: ['The Mandalorian & Grogu'],
      externalIds: [{ source: 'tmdb', id: '1228710' }],
      year: 2026,
      releaseDate: '2026-05-20',
      chrono: 17,
      route: 23,
      note: 'Din Djarin and Grogu\'s first feature film, continuing The Mandalorian'
    }
  ],
  characters: [
    {
      id: 'sw-luke',
      name: 'Luke Skywalker',
      role: 'Jedi (original trilogy)',
      portraitUrl: `${TM}/w300_and_h450_face/zMQ93JTLW8KxusKhOlHFZhih3YQ.jpg`,
      appearsIn: ['sw-anh', 'sw-esb', 'sw-rotj'],
      blurb: 'A moisture farmer on Tatooine who turns out to be the son of Darth Vader, and trains as a Jedi to face him.'
    },
    {
      id: 'sw-han',
      name: 'Han Solo',
      role: 'Smuggler (original trilogy)',
      portraitUrl: `${TM}/w300_and_h450_face/pjBMJVPpcZK23Vt1nzr1zEBTWrP.jpg`,
      appearsIn: ['sw-anh', 'sw-esb', 'sw-rotj', 'sw-tfa'],
      blurb: 'Captain of the Millennium Falcon, talked into the Rebellion for the money and then staying for the people.'
    },
    {
      id: 'sw-leia',
      name: 'Princess Leia Organa',
      role: 'Rebel leader (original and sequel trilogies)',
      portraitUrl: `${TM}/w300_and_h450_face/of4yHmryKPy92eeskUQ7MRmjC3l.jpg`,
      appearsIn: ['sw-anh', 'sw-esb', 'sw-rotj', 'sw-tfa'],
      blurb: 'Senator, Rebel general and later General of the Resistance, and Luke\'s twin sister.'
    },
    {
      id: 'sw-anakin',
      name: 'Anakin Skywalker / Darth Vader',
      role: 'Jedi turned Sith (prequel trilogy)',
      portraitUrl: `${TM}/w300_and_h450_face/hqEgJYEUvZvL9ytmmiYBbbt63qd.jpg`,
      appearsIn: ['sw-tpm', 'sw-aotc', 'sw-cw-film', 'sw-cw-tv', 'sw-rots'],
      blurb: 'A Jedi prophesied to bring balance to the Force, whose fear of loss leads him to the dark side as Darth Vader.'
    },
    {
      id: 'sw-obiwan',
      name: 'Obi-Wan Kenobi',
      role: 'Jedi Master (prequel trilogy and Kenobi)',
      portraitUrl: `${TM}/w300_and_h450_face/q2UDxfwWnmXTB7khOUF3J9puBVP.jpg`,
      appearsIn: ['sw-tpm', 'sw-aotc', 'sw-rots', 'sw-kenobi'],
      blurb: 'Anakin\'s Jedi master and later Luke\'s hidden protector on Tatooine, forced out of exile a decade after the Empire\'s rise.'
    },
    {
      id: 'sw-rey',
      name: 'Rey',
      role: 'Scavenger turned Jedi (sequel trilogy)',
      portraitUrl: `${TM}/w300_and_h450_face/A8QZBHZjlbWDiUXBvCTk4Zv5oBs.jpg`,
      appearsIn: ['sw-tfa', 'sw-tlj', 'sw-tros'],
      blurb: 'A scavenger on Jakku whose unexplained strength in the Force pulls her into the war between the Resistance and the First Order.'
    },
    {
      id: 'sw-din-djarin',
      name: 'Din Djarin',
      role: 'Mandalorian bounty hunter (The Mandalorian era)',
      portraitUrl: `${TM}/w300_and_h450_face/oKcMbVn0NJTNzQt0ClKKvVXkm60.jpg`,
      appearsIn: ['sw-mandalorian', 'sw-boba-fett', 'sw-mando-grogu'],
      blurb: 'A Mandalorian bounty hunter who abandons a lucrative job to protect a foundling of Grogu\'s unnamed species.'
    }
  ]
}
