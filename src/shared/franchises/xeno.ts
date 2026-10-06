// Xeno — Tetsuya Takahashi's "Xeno" series across four separate
// continuities: Xenogears, the Xenosaga trilogy, Xenoblade Chronicles X and
// the Xenoblade Chronicles 1-2-3 trilogy. No chrono: the task explicitly
// calls for one only within Xenoblade 1-3, and a chrono column cannot be
// applied to three of ten entries while leaving the rest of the franchise
// without one (the validator requires every non-spinoff game to have a value
// once any entry does), so it is omitted franchise-wide — these four stories
// do not share a timeline anyway. No route either (not one of the four
// franchises the brief calls out for a recommended order), and no Steam ids:
// every entry shipped on Nintendo or Sony platforms only, so library matching
// here is by title (and the Definitive Edition aliases) alone. Xenoblade
// Chronicles 2: Torna – The Golden Country and Xenoblade Chronicles 3: Future
// Redeemed are their own rows (prequel/epilogue spin-offs), not aliases of
// their parent game. No anime adaptation exists for any entry, so character
// art is from the Xenosaga Wiki and the Xenoblade Wiki (Fandom) — Fei Fong
// Wong is left out of the character list rather than falling back to a
// lower-quality image, since Xenogears' own fan wiki carries no usable
// artwork for him. Dates from Wikipedia. All verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const XENO: FranchiseCfg = {
  id: 'xeno',
  name: 'Xeno',
  short: 'Xeno',
  color: '#3a7dbf',
  heroUrl: 'https://static.wikia.nocookie.net/xenoblade/images/b/bb/XC3_Smartphone_wallpapers.jpg/revision/latest?cb=20220715181600',
  studio: 'Monolith Soft (Tetsuya Takahashi)',
  tagline: 'Giant mechs, cosmic religion, and one director\'s recurring obsessions.',
  trivia: [
    {
      title: 'One director, four worlds',
      body: 'Tetsuya Takahashi wrote Xenogears at Square with a story so large the back half had to be compressed into text-heavy cutscenes to ship on time. After leaving to found Monolith Soft, he returned to similar ideas — giant mechs, Gnostic and biblical naming, consciousness and reincarnation — in Xenosaga, then again in the Xenoblade series, without any of the three sharing a single continuity or cast.'
    },
    {
      title: 'From a cancelled saga to a fresh start',
      body: 'Xenosaga was announced as a six-episode saga but ended at three after disappointing sales of Episode II; several planned plot threads were resolved in a rushed Episode III instead. Takahashi has said the team started Xenoblade Chronicles partly to rebuild morale after that ending, which is why its tone and pacing read as a deliberate contrast to Xenosaga\'s density.'
    },
    {
      title: 'Xenoblade found its own identity',
      body: 'Where Xenogears and Xenosaga leaned on dense philosophy and FMV-heavy drama, the Xenoblade trilogy built its reputation on open, walkable worlds you can see across — the titans of Bionis and Mechonis in the first game, the endless ocean of Xenoblade X, the cloud sea of Alrest in 2, and the blended, time-eroded landscapes of Aionios in 3.'
    }
  ],
  entries: [
    {
      id: 'xeno-gears',
      title: 'Xenogears',
      year: 1998,
      releaseDate: '1998-02-11',
      note: 'Fei Fong Wong, an amnesiac villager, and the mech Weltall'
    },
    {
      id: 'xeno-saga-1',
      title: 'Xenosaga Episode I: Der Wille zur Macht',
      year: 2002,
      releaseDate: '2002-02-28',
      note: 'Shion Uzuki, the android KOS-MOS, and the mysterious Zohar'
    },
    {
      id: 'xeno-saga-2',
      title: 'Xenosaga Episode II: Jenseits von Gut und Böse',
      year: 2004,
      releaseDate: '2004-06-24',
      note: 'A darker, more divisive middle chapter'
    },
    {
      id: 'xeno-saga-3',
      title: 'Xenosaga Episode III: Also sprach Zarathustra',
      year: 2006,
      releaseDate: '2006-07-06',
      note: 'Closes out the trilogy\'s plot threads in a single game'
    },
    {
      id: 'xeno-xc1',
      title: 'Xenoblade Chronicles',
      aliases: ['Xenoblade Chronicles: Definitive Edition'],
      year: 2010,
      releaseDate: '2010-06-10',
      note: 'Shulk and the Monado, walking the length of two frozen titans'
    },
    {
      id: 'xeno-xcx',
      title: 'Xenoblade Chronicles X',
      aliases: ['Xenoblade Chronicles X: Definitive Edition'],
      year: 2015,
      releaseDate: '2015-04-29',
      note: 'A separate continuity: Earth is destroyed, and survivors settle the planet Mira'
    },
    {
      id: 'xeno-xc2',
      title: 'Xenoblade Chronicles 2',
      year: 2017,
      releaseDate: '2017-12-01',
      note: 'Rex and the living blade Pyra search for the paradise world Elysium'
    },
    {
      id: 'xeno-torna',
      title: 'Xenoblade Chronicles 2: Torna – The Golden Country',
      year: 2018,
      releaseDate: '2018-09-14',
      spinOff: true,
      note: 'Prequel: the kingdom of Torna, five hundred years before Xenoblade 2'
    },
    {
      id: 'xeno-xc3',
      title: 'Xenoblade Chronicles 3',
      year: 2022,
      releaseDate: '2022-07-29',
      note: 'Noah and Mio, soldiers from opposing nations in the blended world of Aionios'
    },
    {
      id: 'xeno-future-redeemed',
      title: 'Xenoblade Chronicles 3: Future Redeemed',
      year: 2023,
      releaseDate: '2023-04-25',
      spinOff: true,
      note: 'Prequel expansion with Shulk and Rex that ties the three Xenoblade worlds together'
    }
  ],
  characters: [
    {
      id: 'xeno-shion',
      name: 'Shion Uzuki',
      role: 'Protagonist (Xenosaga)',
      portraitUrl: 'https://static.wikia.nocookie.net/xenosaga/images/6/6c/Shion0.png/revision/latest?cb=20150417231545',
      appearsIn: ['xeno-saga-1', 'xeno-saga-2', 'xeno-saga-3'],
      blurb: 'Chief engineer of the android KOS-MOS and the series\' emotional center through three games of cosmic conspiracy.'
    },
    {
      id: 'xeno-kosmos',
      name: 'KOS-MOS',
      role: 'Combat android (Xenosaga)',
      portraitUrl: 'https://static.wikia.nocookie.net/xenosaga/images/a/a2/KOSMOS.png/revision/latest?cb=20150417231435',
      appearsIn: ['xeno-saga-1', 'xeno-saga-2', 'xeno-saga-3'],
      blurb: 'An android built around the mysterious Zohar research, whose true purpose unfolds gradually across the trilogy.'
    },
    {
      id: 'xeno-shulk',
      name: 'Shulk',
      role: 'Protagonist (Xenoblade Chronicles)',
      portraitUrl: 'https://static.wikia.nocookie.net/xenoblade/images/0/0e/Shulk_pic.png/revision/latest?cb=20170712150059',
      appearsIn: ['xeno-xc1'],
      blurb: 'A Homs researcher who inherits the Monado, a sword that shows him visions of the future and the one weapon that can hurt the mechanical Mechon.'
    },
    {
      id: 'xeno-rex',
      name: 'Rex',
      role: 'Protagonist (Xenoblade Chronicles 2)',
      portraitUrl: 'https://static.wikia.nocookie.net/xenoblade/images/b/b7/Rex_pic.png/revision/latest?cb=20170712045610',
      appearsIn: ['xeno-xc2'],
      blurb: 'A salvager who recovers Pyra from the Cloud Sea and sets out with her to find Elysium, the paradise every nation on Alrest is fighting over.'
    },
    {
      id: 'xeno-pyra',
      name: 'Pyra',
      role: 'Aegis Blade (Xenoblade Chronicles 2)',
      portraitUrl: 'https://static.wikia.nocookie.net/xenoblade/images/e/ee/Pyra_pic.png/revision/latest?cb=20240607232908',
      appearsIn: ['xeno-xc2'],
      blurb: 'The legendary Aegis, able to switch with her alternate persona Mythra, and the weapon every major power on Alrest wants to possess.'
    },
    {
      id: 'xeno-noah',
      name: 'Noah',
      role: 'Protagonist (Xenoblade Chronicles 3)',
      portraitUrl: 'https://static.wikia.nocookie.net/xenoblade/images/1/11/Noah_portrait.png/revision/latest?cb=20231121200836',
      appearsIn: ['xeno-xc3'],
      blurb: 'An off-seer from Keves whose squad crosses paths with Mio\'s Agnian unit, upending both nations\' belief that their endless war is simply how the world works.'
    },
    {
      id: 'xeno-mio',
      name: 'Mio',
      role: 'Protagonist (Xenoblade Chronicles 3)',
      portraitUrl: 'https://static.wikia.nocookie.net/xenoblade/images/2/28/Mio_portrait.png/revision/latest?cb=20231121202430',
      appearsIn: ['xeno-xc3'],
      blurb: 'An Agnian off-seer whose found-family bond with Noah\'s squad becomes the story\'s answer to a world built on a ten-year lifespan and mandatory combat.'
    }
  ]
}
