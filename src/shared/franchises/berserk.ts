// Berserk — Kentaro Miura's manga and its three separate anime adaptations of
// the Golden Age Arc, plus the 2016-2017 TV continuation. Chrono: the manga is
// the one continuous story (slot 1 up through the Eclipse, slot 2 for
// everything after); the 1997 TV series, the 2012-2013 Golden Age Arc films
// and the 2022 Memorial Edition are three separate adaptations of the SAME
// arc and share slot 1, while the 2016/2017 TV seasons adapt the manga's
// Conviction and Fantasia arcs and share slot 2. Route starts at the 1997 TV
// series (the best-regarded version of the Golden Age Arc) and treats every
// later adaptation as an optional alternate or continuation, since the real
// "next" step after any of them is the still-ongoing manga. Excluded:
// "Berserk of Gluttony" and its explainer ONA, an unrelated isekai series
// that only shares the word "Berserk"; "Berserk: Shinen no Kami", a separate
// spin-off manga.
// Ids and years from AniList, art from AniList, curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const BERSERK: FranchiseCfg = {
  id: 'berserk',
  name: 'Berserk',
  short: 'Berserk',
  color: '#8a1538',
  heroUrl: `${AL}/media/anime/banner/33-g7HwYRVm0ZkN.jpg`,
  studio: 'Studio Gaga (manga) / OLM, Millepensee, GEMBA (anime)',
  tagline: 'A lone mercenary swordsman against a world of demons, and a brotherhood that made him one.',
  trivia: [
    {
      title: 'One story, three Golden Age adaptations',
      body: 'The Golden Age Arc — Guts joining Griffith’s Band of the Hawk, their rise through the Hundred Years’ War, and the Eclipse that ends it — has been animated three separate times: the 1997 TV series (which also continues a short way past it before ending abruptly), the 2012-2013 trilogy of theatrical films with early 3D-CG character models, and a 2022 "Memorial Edition" that re-cuts and re-times the films into a 13-episode TV format.'
    },
    {
      title: 'The 2016-2017 TV seasons and their reputation',
      body: 'After decades without an anime continuation past the Eclipse, 2016’s Berserk and 2017’s Berserk 2 adapted the Conviction and Fantasia arcs — the holy war against the Kushan Empire and the voyage to Elfhelm — but used heavier, more obvious CG than the Golden Age films and were received far less warmly, reflected in their much lower audience scores.'
    },
    {
      title: 'Kentaro Miura’s death and the manga’s continuation',
      body: 'Miura died suddenly in May 2021 with the manga still ongoing. His close friend Kouji Mori, working from Miura’s notes and plot outlines with the Studio Gaga team Miura had built, resumed serialization in 2022 and continues the story to this day.'
    }
  ],
  entries: [
    {
      id: 'bsk-manga',
      title: 'Berserk',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '30002' }],
      year: 1989,
      releaseDate: '1989-08-25',
      chrono: 1,
      mc: 92,
      note: 'Miura’s still-ongoing manga, continued since 2022 by Studio Gaga from his notes'
    },
    {
      id: 'bsk-anime97',
      title: 'Berserk',
      mediaType: 'anime',
      aliases: ['Kenpuu Denki Berserk', 'Berserk (1997)'],
      externalIds: [{ source: 'anilist', id: '33' }],
      year: 1997,
      releaseDate: '1997-10-07',
      chrono: 1,
      route: 1,
      adaptation: true,
      mc: 84,
      note: 'Twenty-five episodes covering Guts’ rise with the Band of the Hawk up to the Eclipse, and no further'
    },
    {
      id: 'bsk-ga1',
      title: 'Berserk: The Golden Age Arc I - The Egg of the King',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '10218' }],
      year: 2012,
      releaseDate: '2012-02-04',
      chrono: 1,
      route: 2,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 74,
      note: 'First of three films retelling the Golden Age Arc with CG character models'
    },
    {
      id: 'bsk-ga2',
      title: 'Berserk: The Golden Age Arc II - The Battle for Doldrey',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '12113' }],
      year: 2012,
      releaseDate: '2012-06-23',
      chrono: 1,
      route: 3,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 75,
      note: 'The Band of the Hawk takes the fortress of Doldrey and Griffith’s ambitions keep climbing'
    },
    {
      id: 'bsk-ga3',
      title: 'Berserk: The Golden Age Arc III - The Advent',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '12115' }],
      year: 2013,
      releaseDate: '2013-02-01',
      chrono: 1,
      route: 4,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 79,
      note: 'The Eclipse, and the price Griffith is willing to pay to survive it'
    },
    {
      id: 'bsk-2016',
      title: 'Berserk (2016)',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21560' }],
      year: 2016,
      releaseDate: '2016-07-01',
      chrono: 2,
      route: 5,
      optional: true,
      adaptation: true,
      mc: 56,
      note: 'Picks up after the Eclipse: Guts, branded and hunted by demons, gathers new companions for the Conviction Arc'
    },
    {
      id: 'bsk-2017',
      title: 'Berserk 2',
      mediaType: 'anime',
      aliases: ['Berserk (2017)'],
      externalIds: [{ source: 'anilist', id: '97643' }],
      year: 2017,
      releaseDate: '2017-04-07',
      chrono: 2,
      route: 6,
      optional: true,
      adaptation: true,
      mc: 60,
      note: 'Concludes the Conviction Arc and adapts the voyage into the Fantasia Arc'
    },
    {
      id: 'bsk-memorial',
      title: 'Berserk: The Golden Age Arc - Memorial Edition',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '155011' }],
      year: 2022,
      releaseDate: '2022-10-02',
      chrono: 1,
      route: 7,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 77,
      note: 'The 2012-2013 films re-cut and re-timed into thirteen TV episodes'
    }
  ],
  characters: [
    {
      id: 'bsk-guts',
      name: 'Guts',
      role: 'Protagonist, the Black Swordsman',
      portraitUrl: `${AL}/character/large/b422-XTaiTuvRohsV.png`,
      appearsIn: ['bsk-manga', 'bsk-anime97', 'bsk-ga1', 'bsk-ga2', 'bsk-ga3', 'bsk-memorial', 'bsk-2016', 'bsk-2017'],
      blurb: 'A mercenary who has fought since childhood, who finds a cause worth belonging to in the Band of the Hawk and loses almost everything the night it ends.'
    },
    {
      id: 'bsk-casca',
      name: 'Casca',
      role: 'Commander of the Band of the Hawk',
      portraitUrl: `${AL}/character/large/b423-AmVFCaJJOBsc.png`,
      appearsIn: ['bsk-manga', 'bsk-anime97', 'bsk-ga1', 'bsk-ga2', 'bsk-ga3', 'bsk-memorial', 'bsk-2016', 'bsk-2017'],
      blurb: 'Rose from nothing to lead the Hawks’ best unit, loves Griffith and Guts in turn, and survives the Eclipse at an unbearable cost.'
    },
    {
      id: 'bsk-griffith',
      name: 'Griffith',
      role: 'Leader of the Band of the Hawk',
      portraitUrl: `${AL}/character/large/b424-Jfrsf8I7zBps.png`,
      appearsIn: ['bsk-manga', 'bsk-anime97', 'bsk-ga1', 'bsk-ga2', 'bsk-ga3', 'bsk-memorial', 'bsk-2016', 'bsk-2017'],
      blurb: 'A mercenary commander with no ambition smaller than his own kingdom, who turns out willing to sacrifice anyone, including his own men, to get it.'
    },
    {
      id: 'bsk-puck',
      name: 'Puck',
      role: 'Elf companion',
      portraitUrl: `${AL}/character/large/b5060-PWn2hc2nBy9J.jpg`,
      appearsIn: ['bsk-manga', 'bsk-2016', 'bsk-2017'],
      blurb: 'A small, talkative elf who attaches himself to Guts after the Eclipse and provides most of the story’s comic relief.'
    },
    {
      id: 'bsk-farnese',
      name: 'Farnese de Vandimion',
      role: 'Holy Iron Chain Knights commander',
      portraitUrl: `${AL}/character/large/b7857-W7WpcGlw2aeH.png`,
      appearsIn: ['bsk-manga', 'bsk-2016', 'bsk-2017'],
      blurb: 'Leads the inquisition sent after Guts in the Conviction Arc, before her own convictions about demons and faith start to crack.'
    },
    {
      id: 'bsk-serpico',
      name: 'Serpico',
      role: 'Farnese’s bodyguard',
      portraitUrl: `${AL}/character/large/b5059-wWVkoasyfJNk.png`,
      appearsIn: ['bsk-manga', 'bsk-2016', 'bsk-2017'],
      blurb: 'Sworn to protect Farnese since childhood, and the only one in her retinue who keeps his composure once Guts enters the picture.'
    }
  ]
}
