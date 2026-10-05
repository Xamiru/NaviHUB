// Ghost in the Shell — Masamune Shirow's manga and the several, largely
// independent anime/film continuities built on it: Mamoru Oshii's two films,
// Kenji Kamiyama's Stand Alone Complex TV continuity and its compilation
// movies, the Arise tetralogy reboot, the 2017 Hollywood live-action film,
// the Netflix CG continuation SAC_2045, and the 2026 Science SARU TV series.
// No chrono — these are parallel retellings of the same premise rather than
// one timeline, so an in-universe order would misrepresent the franchise.
// Route follows Oshii's own two films (the most direct line, both built as
// one story) as the non-optional core, with every other continuity marked as
// an optional, independent way into the same premise, in release order.
// Excluded: the Arise bonus OVA "Another Mission" and the four-episode
// "Arise Specials" (disc extras, not story), the ONA "EPISODE:[.jp]"
// (a short tie-in with no English release), and "Arise: Alternative
// Architecture" (a TV recut of the four Border films with new footage,
// kept out to avoid representing the same story twice at full-entry weight).
// Ids and years from AniList; the 2017 film's TMDB id and dates confirmed by
// web search. Art from AniList/TMDB, curl-verified 2026-10-05.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const GHOST_IN_THE_SHELL: FranchiseCfg = {
  id: 'ghost-in-the-shell',
  name: 'Ghost in the Shell',
  short: 'Ghost in the Shell',
  color: '#3a5a73',
  heroUrl: `${AL}/media/anime/banner/43-uDbk1jrG9yod.jpg`,
  studio: 'Production I.G',
  tagline: 'A full-cyborg special-ops major keeps asking what is left of her that counts as human.',
  trivia: [
    {
      title: 'One premise, several separate continuities',
      body: 'Unlike most long-running franchises, Ghost in the Shell has never settled on one canon: Mamoru Oshii’s 1995 film and its 2004 sequel Innocence form one self-contained two-film story; Kenji Kamiyama’s Stand Alone Complex reimagines Public Security Section 9 for TV with its own continuity and villains; Arise (2013-2014) is a prequel reboot with redesigned characters; and the 2017 Hollywood film, Netflix’s SAC_2045 and the 2026 Science SARU series are each their own retelling again. All of them adapt the same Shirow manga premise rather than continuing one another.'
    },
    {
      title: 'The 1995 film’s influence',
      body: 'Oshii’s film — Motoko Kusanagi’s hunt for a hacker called the Puppet Master, and her creeping sense that a mind can exist without a body — is widely cited as a direct influence on The Matrix, and its hacking-and-philosophy mix of corporate conspiracy and consciousness questions set the template nearly every later version of the story returns to.'
    },
    {
      title: 'Thirty years of returning to Section 9',
      body: 'The franchise has now run from Shirow’s 1989 manga through four distinct decades of adaptation, most recently with a new TV series from Science SARU that premiered in July 2026 — proof the Puppet Master question still has new ways to be asked.'
    }
  ],
  entries: [
    {
      id: 'gits-manga',
      title: 'The Ghost in the Shell',
      mediaType: 'manga',
      aliases: ['Koukaku Kidoutai', 'Ghost in the Shell'],
      externalIds: [{ source: 'anilist', id: '31023' }],
      year: 1989,
      releaseDate: '1989-05-06',
      mc: 74,
      note: 'Shirow’s original manga: Section 9’s cyberbrain-hacking cases, denser and more technical than any adaptation'
    },
    {
      id: 'gits-1995',
      title: 'Ghost in the Shell',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '43' }],
      year: 1995,
      releaseDate: '1995-11-18',
      route: 1,
      adaptation: true,
      mc: 80,
      note: 'Oshii’s film: Major Motoko Kusanagi tracks a hacker called the Puppet Master through Section 9’s cases'
    },
    {
      id: 'gits-sac1',
      title: 'Ghost in the Shell: Stand Alone Complex',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '467' }],
      year: 2002,
      releaseDate: '2002-10-01',
      route: 3,
      optional: true,
      adaptation: true,
      mc: 82,
      note: 'Kamiyama’s TV continuity: Section 9 investigates the Laughing Man, a hacker nobody can identify or photograph'
    },
    {
      id: 'gits-sac2',
      title: 'Ghost in the Shell: Stand Alone Complex 2nd GIG',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '801' }],
      year: 2004,
      releaseDate: '2004-01-01',
      route: 4,
      optional: true,
      adaptation: true,
      mc: 84,
      note: 'Refugee unrest and an individual-terrorism plot called Individual Eleven draw in a rival task force'
    },
    {
      id: 'gits-innocence',
      title: 'Ghost in the Shell 2: Innocence',
      mediaType: 'anime',
      aliases: ['Innocence'],
      externalIds: [{ source: 'anilist', id: '468' }],
      year: 2004,
      releaseDate: '2004-03-06',
      route: 2,
      mc: 75,
      note: 'Batou and Togusa investigate gynoids that murder their owners, with Kusanagi gone but not absent'
    },
    {
      id: 'gits-laughing-man',
      title: 'Ghost in the Shell: Stand Alone Complex - The Laughing Man',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '2449' }],
      year: 2005,
      releaseDate: '2005-09-23',
      optional: true,
      adaptation: true,
      mc: 76,
      note: 'Compilation re-edit of the first season’s Laughing Man case into a single film'
    },
    {
      id: 'gits-individual-eleven',
      title: 'Ghost in the Shell: S.A.C. 2nd GIG - Individual Eleven',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '2448' }],
      year: 2006,
      releaseDate: '2006-01-27',
      optional: true,
      adaptation: true,
      mc: 75,
      note: 'Compilation re-edit of 2nd GIG’s Individual Eleven case into a single film'
    },
    {
      id: 'gits-sss',
      title: 'Ghost in the Shell: Stand Alone Complex - Solid State Society',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '1566' }],
      year: 2006,
      releaseDate: '2006-09-01',
      route: 5,
      optional: true,
      adaptation: true,
      mc: 78,
      note: 'TV-movie finale to the SAC continuity: a wave of elderly suicides tied to a mysterious Puppeteer'
    },
    {
      id: 'gits-2-0',
      title: 'Ghost in the Shell 2.0',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '4672' }],
      year: 2008,
      releaseDate: '2008-07-12',
      optional: true,
      adaptation: true,
      remake: true,
      mc: 76,
      note: 'Partial CG remaster and re-score of the 1995 film for its anniversary, with some redubbed scenes'
    },
    {
      id: 'gits-arise-b1',
      title: 'Ghost in the Shell: Arise - Border:1 Ghost Pain',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '17187' }],
      year: 2013,
      releaseDate: '2013-06-22',
      route: 6,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 70,
      note: 'Opens the Arise prequel reboot: a redesigned, younger Motoko investigates a bombing before Section 9 exists'
    },
    {
      id: 'gits-arise-b2',
      title: 'Ghost in the Shell: Arise - Border:2 Ghost Whispers',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '19191' }],
      year: 2013,
      releaseDate: '2013-11-30',
      route: 7,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 71,
      note: 'Motoko and Batou meet while chasing an arms deal gone wrong'
    },
    {
      id: 'gits-arise-b3',
      title: 'Ghost in the Shell: Arise - Border:3 Ghost Tears',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '19193' }],
      year: 2014,
      releaseDate: '2014-06-28',
      route: 8,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 69,
      note: 'A rogue AI research project forces the future Section 9 team together'
    },
    {
      id: 'gits-arise-b4',
      title: 'Ghost in the Shell: Arise - Border:4 Ghost Stands Alone',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '19195' }],
      year: 2014,
      releaseDate: '2014-09-06',
      route: 9,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 70,
      note: 'Section 9 is formally founded under Aramaki, closing the Arise tetralogy'
    },
    {
      id: 'gits-live-action',
      title: 'Ghost in the Shell (2017)',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '315837' }],
      year: 2017,
      releaseDate: '2017-03-31',
      route: 10,
      optional: true,
      adaptation: true,
      remake: true,
      note: 'Hollywood live-action retelling of the 1995 film’s plot, with Scarlett Johansson as the Major'
    },
    {
      id: 'gits-sac2045-s1',
      title: 'Ghost in the Shell: SAC_2045',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '106154' }],
      year: 2020,
      releaseDate: '2020-04-23',
      route: 11,
      optional: true,
      adaptation: true,
      mc: 62,
      note: 'Netflix CG continuation: a post-collapse world and a sudden epidemic of "posthumans"'
    },
    {
      id: 'gits-sac2045-movie',
      title: 'Ghost in the Shell: SAC_2045 Sustainable War',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '138899' }],
      year: 2021,
      releaseDate: '2021-11-12',
      optional: true,
      adaptation: true,
      mc: 59,
      note: 'Compilation film bridging SAC_2045’s two seasons'
    },
    {
      id: 'gits-sac2045-s2',
      title: 'Ghost in the Shell: SAC_2045 Season 2',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '117756' }],
      year: 2022,
      releaseDate: '2022-05-23',
      route: 12,
      optional: true,
      adaptation: true,
      mc: 66,
      note: 'Concludes the SAC_2045 posthuman arc'
    },
    {
      id: 'gits-sac2045-last-human',
      title: 'Ghost in the Shell: SAC_2045 - The Last Human',
      mediaType: 'anime',
      aliases: ['Koukaku Kidoutai: SAC_2045 - Saigo no Ningen'],
      externalIds: [{ source: 'anilist', id: '163143' }],
      year: 2023,
      releaseDate: '2023-11-23',
      optional: true,
      adaptation: true,
      mc: 51,
      note: 'Compilation film re-cutting SAC_2045 with a new ending'
    },
    {
      id: 'gits-2026',
      title: 'THE GHOST IN THE SHELL',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '177699' }],
      year: 2026,
      releaseDate: '2026-07-07',
      route: 13,
      optional: true,
      adaptation: true,
      remake: true,
      mc: 77,
      note: 'Science SARU’s new TV series, streaming worldwide on Prime Video from July 2026'
    }
  ],
  characters: [
    {
      id: 'gits-motoko',
      name: 'Motoko Kusanagi',
      role: 'Section 9 field commander',
      portraitUrl: `${AL}/character/large/b1795-vKakY5aXVyCl.jpg`,
      appearsIn: ['gits-1995', 'gits-sac1', 'gits-sac2', 'gits-innocence', 'gits-laughing-man', 'gits-individual-eleven', 'gits-sss', 'gits-2-0', 'gits-arise-b1', 'gits-arise-b2', 'gits-arise-b3', 'gits-arise-b4', 'gits-live-action', 'gits-sac2045-s1', 'gits-sac2045-movie', 'gits-sac2045-s2', 'gits-sac2045-last-human', 'gits-2026'],
      blurb: 'A full-body cyborg who leads Section 9’s field team and keeps questioning, out loud and to herself, what in her is still human.'
    },
    {
      id: 'gits-batou',
      name: 'Batou',
      role: 'Section 9 field agent',
      portraitUrl: `${AL}/character/large/2653.jpg`,
      appearsIn: ['gits-1995', 'gits-sac1', 'gits-sac2', 'gits-innocence', 'gits-laughing-man', 'gits-individual-eleven', 'gits-sss', 'gits-arise-b2', 'gits-arise-b3', 'gits-arise-b4'],
      blurb: 'Kusanagi’s closest ally on the team, built like a tank and more sentimental about his dog than about most people.'
    },
    {
      id: 'gits-togusa',
      name: 'Togusa',
      role: 'Section 9 field agent',
      portraitUrl: `${AL}/character/large/2654.jpg`,
      appearsIn: ['gits-1995', 'gits-sac1', 'gits-sac2', 'gits-innocence', 'gits-laughing-man', 'gits-individual-eleven', 'gits-sss'],
      blurb: 'The team’s one mostly-human member, recruited for a perspective full cyborgs no longer have.'
    },
    {
      id: 'gits-aramaki',
      name: 'Daisuke Aramaki',
      role: 'Section 9 chief',
      portraitUrl: `${AL}/character/large/n2677-lPWyWsFWTJhp.png`,
      appearsIn: ['gits-1995', 'gits-sac1', 'gits-sac2', 'gits-laughing-man', 'gits-individual-eleven', 'gits-sss', 'gits-arise-b4'],
      blurb: 'Runs Section 9 and shields it from the political pressure its cases keep attracting.'
    },
    {
      id: 'gits-puppet-master',
      name: 'Project 2501',
      role: 'The Puppet Master',
      portraitUrl: `${AL}/character/large/b18516-0jVQdvyC4i1j.png`,
      appearsIn: ['gits-1995'],
      blurb: 'A government-made hacking program that became self-aware in the net and now wants recognition as a living being.'
    },
    {
      id: 'gits-tachikoma',
      name: 'Tachikoma',
      role: 'Section 9 think tanks',
      portraitUrl: `${AL}/character/large/b4808-iHecJsS0FXK2.png`,
      appearsIn: ['gits-sac1', 'gits-sac2'],
      blurb: 'Childlike AI spider tanks that chatter constantly and slowly develop something close to individual personalities.'
    }
  ]
}
