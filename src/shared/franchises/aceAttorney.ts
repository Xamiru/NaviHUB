// Ace Attorney — the six mainline Phoenix Wright games, both Ace Attorney
// Investigations (Miles Edgeworth) games and both Great Ace Attorney games
// (the Meiji-era prequel duology starring Phoenix's ancestor Ryunosuke
// Naruhodo), plus the 2016-2018 anime (two seasons) and Takashi Miike's 2012
// live-action film. Steam only sells these as three trilogy/duology bundles —
// Phoenix Wright: Ace Attorney Trilogy (AA1-3), Apollo Justice: Ace Attorney
// Trilogy (AA4, Dual Destinies, Spirit of Justice) and Ace Attorney
// Investigations Collection (AAI1-2) — plus The Great Ace Attorney Chronicles
// (GAA1-2); each bundle's Steam id is shared across the games it contains, not
// a row of its own. No chrono: unlike Kingdom Hearts/Danganronpa/Zero Escape,
// the task only calls for a route here, and the in-universe order already
// tracks release order closely enough (only Great Ace Attorney sits a
// century-plus earlier) that a second ordering would mostly restate release
// order with one exception — not worth a dedicated column. Route is the
// standard recommended order (release order); the anime and the film are
// optional detours that retell games already on the route. The 2016 Spirit of
// Justice prologue OVA is excluded (a short teaser, not a season). Character
// art is AniList's (from the two anime seasons) wherever a character appears
// there; none needed fandom fallback. Ids and dates from Steam, AniList,
// TMDB and Wikipedia. All verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const ACE_ATTORNEY: FranchiseCfg = {
  id: 'ace-attorney',
  name: 'Ace Attorney',
  short: 'Ace Attorney',
  color: '#2e5cb8',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/787480/library_hero.jpg',
  studio: 'Capcom (Shu Takumi)',
  tagline: 'Objection! Courtroom mysteries, one pointed finger at a time.',
  trivia: [
    {
      title: 'A trial-and-error genre',
      body: 'Shu Takumi designed the first game for the Game Boy Advance, wanting a mystery game about defense rather than detection — you already know your client is innocent, and the puzzle is catching the real culprit in their own contradictions on the stand. Series protagonist Phoenix Wright is Ryuichi Naruhodo in the original Japanese; nearly every name is a pun (Mia and Maya Fey are Chihiro and Mayoi Ayasato, Miles Edgeworth is Reiji Mitsurugi), and localization kept the wordplay rather than the literal names.'
    },
    {
      title: 'A century-old family business',
      body: 'The Great Ace Attorney duology, set in 1890s Japan and London, stars Ryunosuke Naruhodo — established as Phoenix Wright\'s ancestor — alongside the great detective Herlock Sholmes (Sherlock Holmes in Japan). Shu Takumi returned to write and direct it after leaving the main series with Apollo Justice.'
    },
    {
      title: 'Objection, asked and answered',
      body: 'The courtroom shout-and-point animations and the "Objection!"/"Hold It!"/"Take That!" voice clips are so recognizable that the series is often cited as a reference point whenever another game or show tries courtroom drama as comedy. The 2016 anime and the Takashi Miike film both adapt the original trilogy rather than any later game.'
    }
  ],
  entries: [
    {
      id: 'aa-1',
      title: 'Phoenix Wright: Ace Attorney',
      externalIds: [{ source: 'steam', id: '787480' }],
      year: 2001,
      releaseDate: '2001-10-12',
      route: 1,
      note: 'Phoenix\'s first case and Mia Fey\'s murder'
    },
    {
      id: 'aa-2',
      title: 'Phoenix Wright: Ace Attorney – Justice for All',
      externalIds: [{ source: 'steam', id: '787480' }],
      year: 2002,
      releaseDate: '2002-10-18',
      route: 2,
      note: 'Franziska von Karma prosecutes, and the assassin Shelly de Killer forces Phoenix\'s hand'
    },
    {
      id: 'aa-3',
      title: 'Phoenix Wright: Ace Attorney – Trials and Tribulations',
      externalIds: [{ source: 'steam', id: '787480' }],
      year: 2004,
      releaseDate: '2004-01-23',
      route: 3,
      note: 'Mia\'s own backstory and the duel with the mysterious Godot'
    },
    {
      id: 'aa-4',
      title: 'Apollo Justice: Ace Attorney',
      externalIds: [{ source: 'steam', id: '2187220' }],
      year: 2007,
      releaseDate: '2007-04-12',
      route: 4,
      note: 'A new attorney, Apollo Justice, as Phoenix is disbarred'
    },
    {
      id: 'aa-aai1',
      title: 'Ace Attorney Investigations: Miles Edgeworth',
      externalIds: [{ source: 'steam', id: '2401970' }],
      year: 2009,
      releaseDate: '2009-05-28',
      route: 5,
      note: 'Plays as the prosecutor, investigating crime scenes directly'
    },
    {
      id: 'aa-aai2',
      title: 'Ace Attorney Investigations 2: Prosecutor\'s Gambit',
      externalIds: [{ source: 'steam', id: '2401970' }],
      year: 2011,
      releaseDate: '2011-02-03',
      route: 6,
      note: 'Edgeworth\'s second investigation, unreleased in English until the 2024 Investigations Collection'
    },
    {
      id: 'aa-film',
      title: 'Ace Attorney',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '91694' }],
      year: 2012,
      releaseDate: '2012-02-11',
      route: 7,
      optional: true,
      adaptation: true,
      note: 'Takashi Miike\'s live-action retelling of the first game'
    },
    {
      id: 'aa-dd',
      title: 'Phoenix Wright: Ace Attorney – Dual Destinies',
      externalIds: [{ source: 'steam', id: '2187220' }],
      year: 2013,
      releaseDate: '2013-07-25',
      route: 8,
      note: 'Phoenix is reinstated; Athena Cykes and her mood-reading Widget join'
    },
    {
      id: 'aa-gaa1',
      title: 'The Great Ace Attorney: Adventures',
      externalIds: [{ source: 'steam', id: '1158850' }],
      year: 2015,
      releaseDate: '2015-07-09',
      route: 9,
      note: 'Meiji Japan and Victorian London: Ryunosuke Naruhodo and Herlock Sholmes'
    },
    {
      id: 'aa-anime-s1',
      title: 'Ace Attorney',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21360' }],
      year: 2016,
      releaseDate: '2016-04-02',
      route: 10,
      optional: true,
      adaptation: true,
      note: 'Adapts the first two games'
    },
    {
      id: 'aa-soj',
      title: 'Phoenix Wright: Ace Attorney – Spirit of Justice',
      externalIds: [{ source: 'steam', id: '2187220' }],
      year: 2016,
      releaseDate: '2016-06-09',
      route: 11,
      note: 'Trial by jury and spirit-channeling in the kingdom of Khura\'in'
    },
    {
      id: 'aa-gaa2',
      title: 'The Great Ace Attorney 2: Resolve',
      externalIds: [{ source: 'steam', id: '1158850' }],
      year: 2017,
      releaseDate: '2017-08-03',
      route: 12,
      note: 'Concludes Ryunosuke\'s time in London and the truth behind the Professor murders'
    },
    {
      id: 'aa-anime-s2',
      title: 'Ace Attorney Season 2',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '101313' }],
      year: 2018,
      releaseDate: '2018-10-06',
      route: 13,
      optional: true,
      adaptation: true,
      note: 'Adapts Trials and Tribulations'
    }
  ],
  characters: [
    {
      id: 'aa-phoenix',
      name: 'Phoenix Wright',
      role: 'Defense attorney, protagonist',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b9879-u5LeRqqo84lt.png',
      appearsIn: ['aa-1', 'aa-2', 'aa-3', 'aa-4', 'aa-film', 'aa-anime-s1', 'aa-anime-s2', 'aa-dd', 'aa-soj'],
      blurb: 'A rookie defense attorney thrown into his first trial the day he\'s hired, who spends the series proving reasonable doubt by provoking witnesses into contradicting themselves on the stand.'
    },
    {
      id: 'aa-maya',
      name: 'Maya Fey',
      role: 'Spirit medium, Phoenix\'s assistant',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b9878-ZcgNgiMfOdfR.png',
      appearsIn: ['aa-1', 'aa-2', 'aa-3', 'aa-film', 'aa-anime-s1', 'aa-anime-s2'],
      blurb: 'Mia\'s teenage sister and heir to the Fey spirit-channeling line, as likely to crack a burger joke as to channel a murder victim\'s ghost for testimony.'
    },
    {
      id: 'aa-edgeworth',
      name: 'Miles Edgeworth',
      role: 'Prosecutor, Phoenix\'s rival',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b8673-pqGfk6oxxXcx.png',
      appearsIn: ['aa-1', 'aa-2', 'aa-aai1', 'aa-aai2', 'aa-film', 'aa-anime-s1', 'aa-anime-s2'],
      blurb: 'Phoenix\'s childhood friend turned courtroom opponent, a "demon prosecutor" with a near-perfect conviction record and, underneath it, a genuine horror of ever convicting the wrong person.'
    },
    {
      id: 'aa-mia',
      name: 'Mia Fey',
      role: 'Phoenix\'s mentor',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b16109-BA7cG4tpPnAC.png',
      appearsIn: ['aa-1', 'aa-anime-s1', 'aa-anime-s2'],
      blurb: 'The attorney who trained Phoenix and is murdered in the first game\'s second case — and keeps shaping the story afterward through Maya\'s channeling and her own backstory in Trials and Tribulations.'
    },
    {
      id: 'aa-apollo',
      name: 'Apollo Justice',
      role: 'Defense attorney (Apollo Justice onward)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/45973.jpg',
      appearsIn: ['aa-4', 'aa-dd', 'aa-soj'],
      blurb: 'Takes over as lead defense attorney when Phoenix is disbarred, with a "bracelet" tic that flags a witness\'s nervous reactions the way Athena\'s Widget later reads their emotions.'
    },
    {
      id: 'aa-godot',
      name: 'Godot',
      role: 'Prosecutor (Trials and Tribulations)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b17464-zg8GlmnqUr5N.png',
      appearsIn: ['aa-3', 'aa-anime-s2'],
      blurb: 'A masked, coffee-obsessed prosecutor whose grudge against Phoenix is personal long before the final case explains why.'
    },
    {
      id: 'aa-larry',
      name: 'Larry Butz',
      role: 'Phoenix\'s oldest friend',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b16110-JbxqALpR2MAe.jpg',
      appearsIn: ['aa-1', 'aa-2', 'aa-3', 'aa-anime-s1', 'aa-anime-s2'],
      blurb: 'Childhood friend of both Phoenix and Edgeworth, perpetually unemployed, perpetually heartbroken, and a running gag that somehow keeps turning out to be plot-relevant.'
    }
  ]
}
