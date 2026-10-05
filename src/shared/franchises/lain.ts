// Serial Experiments Lain — the 1998 cross-media project built around director
// Ryutaro Nakamura, writer Chiaki Konaka and character designer Yoshitoshi ABe:
// the TV anime, a PlayStation hypertext "game" told from Lain’s point of view
// with its own continuity, and ABe’s one-shot manga released the same year.
// No other entries are documented on AniList for this project; it is a small,
// deliberately flat franchise. No chrono — the game is a parallel, non-linear
// telling rather than a sequel or prequel, so an in-universe order would be
// misleading. No route — three releases in one year with no meaningful watch
// order. The PlayStation disc has no Steam release, so it carries no
// externalIds and matches the library by title only.
// Ids and years from AniList; the game's release date from Wikipedia/GameFAQs.
// Art from AniList, curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const SERIAL_EXPERIMENTS_LAIN: FranchiseCfg = {
  id: 'lain',
  name: 'Serial Experiments Lain',
  short: 'Lain',
  color: '#2a9d8f',
  heroUrl: `${AL}/media/anime/banner/339-Lh0tuuwRLRgI.jpg`,
  studio: 'Triangle Staff / Yoshitoshi ABe',
  tagline: 'Present day, present time: a shut-in girl logs into the Wired and stops being sure where she ends.',
  trivia: [
    {
      title: 'A cross-media project, not a show with tie-ins',
      body: 'Serial Experiments Lain was planned from the start as three simultaneous 1998 releases under one concept, pushed by producer Yasuyuki Ueda: a TV anime directed by Ryutaro Nakamura and written by Chiaki Konaka, a PlayStation disc, and a one-shot manga, all sharing Yoshitoshi ABe’s character designs and the project’s central image of a girl dissolving into a global network called the Wired.\n\nThe anime itself is almost dialogue-light and told through disorienting edits, intentional visual noise and repeated motifs (power lines, the Cyberia club, Lain’s room), building a thriller about identity and connectivity out of atmosphere as much as plot.'
    },
    {
      title: 'The PlayStation disc is not a game to beat',
      body: 'The 1998 PlayStation release has no win state, combat or even much player agency: it presents itself as a hypertext database of diary entries, psychiatric session notes, news clippings and character profiles that the player browses in roughly chronological order, accompanied by ambient audio. It tells its own version of Lain’s story rather than adapting the anime’s script, which is why it sits beside the show as a companion piece rather than before or after it.'
    },
    {
      title: 'Protocol 7 and the Knights',
      body: 'Across the project, the Wired is reached through an upgraded protocol that erases the line between the network and physical reality, and a hacker collective called the Knights of the Eastern Calculus pursues Lain because of what her family and the dead hacker Masami Eiri built into it. How literally to take any of this is left to the viewer; the anime never settles whether Lain is a program, a girl, or both.'
    }
  ],
  entries: [
    {
      id: 'lain-manga',
      title: 'Serial Experiments Lain: The Nightmare of Fabrication',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '35461' }],
      year: 1998,
      spinOff: true,
      optional: true,
      note: 'Yoshitoshi ABe’s one-shot illustrated story published alongside the project'
    },
    {
      id: 'lain-anime',
      title: 'Serial Experiments Lain',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '339' }],
      year: 1998,
      releaseDate: '1998-07-06',
      mc: 80,
      note: 'Thirteen episodes: Lain Iwakura follows a dead classmate’s email into the Wired and starts losing track of which Lain is real'
    },
    {
      id: 'lain-game',
      title: 'Serial Experiments Lain',
      mediaType: 'game',
      year: 1998,
      releaseDate: '1998-11-26',
      spinOff: true,
      optional: true,
      note: 'PlayStation-only Japanese release: a browsable hypertext telling of Lain’s story, no dialogue or win state'
    }
  ],
  characters: [
    {
      id: 'lain-iwakura',
      name: 'Lain Iwakura',
      role: 'Protagonist',
      portraitUrl: `${AL}/character/large/b2219-K3wzEOVwdUhL.png`,
      appearsIn: ['lain-anime', 'lain-game'],
      blurb: 'A withdrawn middle schooler who barely uses her computer until a dead classmate emails her — after that, a second, confident Lain starts appearing in the Wired without her.'
    },
    {
      id: 'lain-arisu',
      name: 'Arisu Mizuki',
      role: 'Lain’s classmate',
      portraitUrl: `${AL}/character/large/b7610-vpsZ4tS74eDf.png`,
      appearsIn: ['lain-anime'],
      blurb: 'One of the few people who treats Lain as an ordinary friend, and the one most frightened by how she starts to change.'
    },
    {
      id: 'lain-eiri',
      name: 'Masami Eiri',
      role: 'Wired researcher',
      portraitUrl: `${AL}/character/large/7609.jpg`,
      appearsIn: ['lain-anime'],
      blurb: 'A Tachibana Labs engineer who believed consciousness could survive into the Wired after death, and who built Protocol 7 to prove it.'
    },
    {
      id: 'lain-mika',
      name: 'Mika Iwakura',
      role: 'Lain’s older sister',
      portraitUrl: `${AL}/character/large/b7611-BQZc2e247eNV.png`,
      appearsIn: ['lain-anime'],
      blurb: 'Shares a house with Lain that grows quietly stranger as the series goes on, from a family that may not be what it appears.'
    },
    {
      id: 'lain-yasuo',
      name: 'Yasuo Iwakura',
      role: 'Lain’s father',
      portraitUrl: `${AL}/character/large/b7612-InAJM2Tco34f.jpg`,
      appearsIn: ['lain-anime'],
      blurb: 'Encourages Lain’s sudden interest in the Navi computer he upgrades for her, for reasons the show leaves unstated for a long time.'
    }
  ]
}
