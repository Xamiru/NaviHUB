// Zero Escape — 999, Virtue's Last Reward and Zero Time Dilemma. Steam only
// sells 999 and VLR bundled as "The Nonary Games," so that Steam id sits on
// both; Zero Time Dilemma is its own separate Steam listing. Route is release
// order (999, VLR, ZTD) — the order the puzzles and twists were designed to
// be experienced in. Chrono is different and deliberate: Zero Time Dilemma's
// story sits chronologically BETWEEN 999 and Virtue's Last Reward (999=1,
// ZTD=2, VLR=3) — its ending sets up the "Free the Soul" cult and the Mars
// mission background that Virtue's Last Reward then assumes. Playing in
// chrono order spoils 999 and VLR's own reveals, which is exactly why the
// route (release/intended play order) and chrono (story order) diverge here
// more than in any other franchise on this page. No anime adaptations exist,
// so character art is from the Zero Escape Wiki (Fandom, hosted at
// ninehourspersonsdoors.fandom.com) — the one unavoidable case among this
// batch, since no official CDN or AniList/TMDB source carries these
// characters at all. Ids and dates from Steam and Wikipedia.
// All verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const ZERO_ESCAPE: FranchiseCfg = {
  id: 'zero-escape',
  name: 'Zero Escape',
  short: 'Zero Escape',
  color: '#8a1f1f',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/477740/library_hero.jpg',
  studio: 'Chunsoft / Spike Chunsoft (Kotaro Uchikoshi)',
  tagline: 'Nine doors, nine hours, nine people — and a bracelet that will kill you.',
  trivia: [
    {
      title: 'Escape rooms with a body count',
      body: 'Each game traps a cast in a facility rigged by "Zero," forcing them through numbered escape-room puzzles between visual-novel segments where the real game is deciding who to trust. Writer-director Kotaro Uchikoshi builds every plot around a real scientific or philosophical idea — the Nonary Games\' digital roots and morphogenetic fields in 999, quantum mechanics and the Schrödinger\'s Cat thought experiment in Virtue\'s Last Reward.'
    },
    {
      title: 'A flowchart instead of a straight line',
      body: 'Starting with Virtue\'s Last Reward, the series abandoned linear chapter-select for a visible flowchart of every branch, letting the player jump between timelines and consciously compare how a single choice plays out multiple ways. Zero Time Dilemma pushed this further, deliberately scrambling its own scene order so the player reconstructs the true sequence of events themselves.'
    },
    {
      title: 'A trilogy that almost didn\'t finish',
      body: 'After Virtue\'s Last Reward sold poorly in Japan, Uchikoshi put the third game on hold in 2014. Western fans campaigned for it, and Zero Time Dilemma was announced in 2015 and released in 2016, closing the trilogy. The Nonary Games, a 2017 remaster bundling 999 and Virtue\'s Last Reward, then brought the first two games to PC and modern consoles.'
    }
  ],
  entries: [
    {
      id: 'ze-999',
      title: '999: Nine Hours, Nine Persons, Nine Doors',
      aliases: ['Nine Hours, Nine Persons, Nine Doors'],
      externalIds: [{ source: 'steam', id: '477740' }],
      year: 2009,
      releaseDate: '2009-12-10',
      chrono: 1,
      route: 1,
      note: 'Junpei wakes up on a sinking ship, bracelet locked to his wrist'
    },
    {
      id: 'ze-vlr',
      title: 'Zero Escape: Virtue\'s Last Reward',
      aliases: ['Virtue\'s Last Reward'],
      externalIds: [{ source: 'steam', id: '477740' }],
      year: 2012,
      releaseDate: '2012-02-16',
      chrono: 3,
      route: 2,
      note: 'A new Nonary Game, a flowchart of branching timelines, and Sigma and Phi'
    },
    {
      id: 'ze-ztd',
      title: 'Zero Time Dilemma',
      externalIds: [{ source: 'steam', id: '311240' }],
      year: 2016,
      releaseDate: '2016-06-30',
      chrono: 2,
      route: 3,
      note: 'Three teams, a decision-theory death game, and scenes told out of order'
    }
  ],
  characters: [
    {
      id: 'ze-junpei',
      name: 'Junpei Tenmyouji',
      role: 'Protagonist (999)',
      portraitUrl: 'https://static.wikia.nocookie.net/ninehourspersonsdoors/images/d/db/Junpei.png/revision/latest?cb=20150701115746',
      appearsIn: ['ze-999'],
      blurb: 'A college student kidnapped into the first Nonary Game, searching for a childhood friend he lost touch with years earlier.'
    },
    {
      id: 'ze-akane',
      name: 'Akane Kurashiki',
      role: 'Nonary Game survivor',
      portraitUrl: 'https://static.wikia.nocookie.net/ninehourspersonsdoors/images/e/ea/June.png/revision/latest?cb=20141228162415',
      appearsIn: ['ze-999'],
      blurb: 'Junpei\'s missing childhood friend, whose real role in 999\'s Nonary Game is the twist the whole story is built around.'
    },
    {
      id: 'ze-clover',
      name: 'Clover Field',
      role: 'Nonary Game participant (999)',
      portraitUrl: 'https://static.wikia.nocookie.net/ninehourspersonsdoors/images/c/c4/Clover.png/revision/latest?cb=20161027215722',
      appearsIn: ['ze-999', 'ze-vlr'],
      blurb: 'Snake\'s younger sister, dragged into the Nonary Game with him, who turns up again, changed, in Virtue\'s Last Reward.'
    },
    {
      id: 'ze-sigma',
      name: 'Sigma Klim',
      role: 'Protagonist (Virtue\'s Last Reward, Zero Time Dilemma)',
      portraitUrl: 'https://static.wikia.nocookie.net/ninehourspersonsdoors/images/5/51/SigmaOfficialArt.png/revision/latest?cb=20210810182030',
      appearsIn: ['ze-vlr', 'ze-ztd'],
      blurb: 'Wakes up in a new Nonary Game with no memory of how he got there, paired with Phi in a prisoner\'s-dilemma vote that decides who gets to leave each round.'
    },
    {
      id: 'ze-phi',
      name: 'Phi',
      role: 'Nonary Game participant',
      portraitUrl: 'https://static.wikia.nocookie.net/ninehourspersonsdoors/images/6/6d/PhiOfficialArt.png/revision/latest?cb=20210810181733',
      appearsIn: ['ze-vlr', 'ze-ztd'],
      blurb: 'Calm under pressure to an unnerving degree, and the one player whose grasp of the game\'s rules is consistently ahead of everyone else\'s.'
    },
    {
      id: 'ze-carlos',
      name: 'Carlos',
      role: 'Protagonist (Zero Time Dilemma)',
      portraitUrl: 'https://static.wikia.nocookie.net/ninehourspersonsdoors/images/b/bf/Carlosztd.png/revision/latest?cb=20211208053855',
      appearsIn: ['ze-ztd'],
      blurb: 'A rookie firefighter dragged into the Decision Game, whose instinct to protect everyone collides hard with a game that only ends once six of the nine players are dead.'
    }
  ]
}
