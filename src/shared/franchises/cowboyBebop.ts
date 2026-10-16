// Cowboy Bebop — Shinichiro Watanabe's 1998 Sunrise series, its 2001 film
// (Knockin' on Heaven's Door), the two manga adaptations (Cain Kuga's
// Shooting Star Bebop and Yutaka Nanten's Cowboy Bebop) and Netflix's 2021
// live-action series. The film is one anime row under its AniList record: the
// library holds it as an anime and the TMDB movie row is not a separate entry.
// No chrono: nothing here is a game and the film's slot in the 2071 timeline
// (between episodes 22 and 23) does not reorder anything.
// Excluded: the AniList special Ein's Summer Vacation and the other bonus
// episodes, the Yoseatsume Blues recap special, soundtrack releases and the
// Bebop-related games.
// Ids, dates and scores from AniList and TMDB (en-US), all checked 2026-10-14.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'
const TM = 'https://image.tmdb.org/t/p'

export const COWBOY_BEBOP: FranchiseCfg = {
  id: 'cowboy-bebop',
  name: 'Cowboy Bebop',
  short: 'Cowboy Bebop',
  color: '#2f6fb3',
  heroUrl: `${AL}/media/anime/banner/1-OquNCNB6srGe.jpg`,
  studio: 'Sunrise / Bones / Netflix',
  tagline: 'A crew of bounty hunters and a dog, chasing debts and pasts across a solar system after the Gate accident.',
  trivia: [
    {
      title: 'A band behind the series',
      body: 'Shinichiro Watanabe directed the 26-episode series, which blends western, noir and jazz; Yoko Kanno\'s score was recorded with her band the Seatbelts. Episodes are called "sessions", and the title is a pun on bebop, the jazz style.'
    },
    {
      title: 'Broadcast out of order',
      body: 'The series was first shown on TV Tokyo in April 1998, but only part of it, and the full run followed on WOWOW from October 1998 to April 1999. The film Knockin\' on Heaven\'s Door arrived in 2001 and sits between episodes 22 and 23.'
    },
    {
      title: 'Short life on Netflix',
      body: 'Netflix\'s ten-episode live-action series premiered on November 19, 2021, with John Cho as Spike Spiegel, Mustafa Shakir as Jet Black and Daniella Pineda as Faye Valentine. It was cancelled in December 2021.'
    }
  ],
  entries: [
    {
      id: 'bebop-anime',
      title: 'Cowboy Bebop',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '1' }],
      year: 1998,
      releaseDate: '1998-04-03',
      mc: 86,
      note: 'Spike, Jet, Faye and Ed hunt bounties across the solar system in 2071'
    },
    {
      id: 'bebop-manga-shooting-star',
      title: 'Shooting Star Bebop: Cowboy Bebop',
      mediaType: 'manga',
      aliases: ['Cowboy Bebop Shooting Star'],
      externalIds: [{ source: 'anilist', id: '30174' }],
      year: 1998,
      releaseDate: '1998-05-01',
      mc: 59,
      adaptation: true,
      note: 'Cain Kuga\'s two-volume manga, with story credit to Shinichiro Watanabe'
    },
    {
      id: 'bebop-manga',
      title: 'Cowboy Bebop',
      mediaType: 'manga',
      externalIds: [{ source: 'anilist', id: '30173' }],
      year: 1999,
      releaseDate: '1999-04-01',
      mc: 67,
      adaptation: true,
      note: 'Yutaka Nanten\'s three-volume manga'
    },
    {
      id: 'bebop-film',
      title: 'Cowboy Bebop: The Movie - Knockin\' on Heaven\'s Door',
      mediaType: 'anime',
      aliases: ['Cowboy Bebop: The Movie', 'Cowboy Bebop: Tengoku no Tobira'],
      externalIds: [{ source: 'anilist', id: '5' }],
      year: 2001,
      releaseDate: '2001-09-01',
      mc: 82,
      note: 'Feature film in which the crew chases a bioterrorist on Mars'
    },
    {
      id: 'bebop-netflix',
      title: 'Cowboy Bebop',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '84469' }],
      year: 2021,
      releaseDate: '2021-11-19',
      mc: 65,
      adaptation: true,
      note: 'Netflix live-action series with John Cho as Spike; one season'
    }
  ],
  characters: [
    {
      id: 'bebop-spike',
      name: 'Spike Spiegel',
      role: 'Bounty hunter',
      portraitUrl: `${AL}/character/large/b1-ChxaldmieFlQ.png`,
      appearsIn: ['bebop-anime', 'bebop-manga-shooting-star', 'bebop-manga', 'bebop-film', 'bebop-netflix'],
      blurb: 'A former syndicate enforcer and martial artist who drifts through bounty work; John Cho plays him on Netflix.'
    },
    {
      id: 'bebop-jet',
      name: 'Jet Black',
      role: 'Ship owner and ex-cop',
      portraitUrl: `${AL}/character/large/b3-JjH9Si9UM1NZ.png`,
      appearsIn: ['bebop-anime', 'bebop-manga-shooting-star', 'bebop-manga', 'bebop-film', 'bebop-netflix'],
      blurb: 'The older, steadier partner who owns the Bebop and tends its bonsai; Mustafa Shakir plays him on Netflix.'
    },
    {
      id: 'bebop-faye',
      name: 'Faye Valentine',
      role: 'Bounty hunter',
      portraitUrl: `${AL}/character/large/b2-0Iszg6Izgt4p.png`,
      appearsIn: ['bebop-anime', 'bebop-manga-shooting-star', 'bebop-manga', 'bebop-film', 'bebop-netflix'],
      blurb: 'A gambler, deep in debt and with no memory of her past, who joins the Bebop; Daniella Pineda plays her on Netflix.'
    },
    {
      id: 'bebop-ed',
      name: 'Edward',
      role: 'Hacker',
      portraitUrl: `${AL}/character/large/b16-80wd87nl1Rue.png`,
      appearsIn: ['bebop-anime', 'bebop-film'],
      blurb: 'Radical Edward: a barefoot, thirteen-year-old hacking genius who invites herself aboard the Bebop, names herself, and is the only crew member who ever looks happy.'
    },
    {
      id: 'bebop-ein',
      name: 'Ein',
      role: 'Data dog',
      portraitUrl: `${AL}/character/large/4.jpg`,
      appearsIn: ['bebop-anime', 'bebop-film', 'bebop-netflix'],
      blurb: 'A Welsh Corgi bred in a lab as a “data dog”, smarter than everyone aboard and only ever understood by Ed.'
    },
    {
      id: 'bebop-vicious',
      name: 'Vicious',
      role: 'Syndicate killer',
      portraitUrl: `${AL}/character/large/b2734-aglO8RKNVxnn.jpg`,
      appearsIn: ['bebop-anime', 'bebop-netflix'],
      blurb: 'Spike’s former partner in the Red Dragon Syndicate, with a katana, a cormorant and a grudge; he wants the syndicate’s throne as much as he wants Spike dead.'
    },
    {
      id: 'bebop-julia',
      name: 'Julia',
      role: 'Spike\'s past',
      portraitUrl: `${AL}/character/large/b2735-0NRiXHK4PSWs.png`,
      appearsIn: ['bebop-anime', 'bebop-netflix'],
      blurb: 'The woman Spike once planned to run away with, who belonged to Vicious first. The whole series is Spike’s past catching up with him through her.'
    }
  ]
}
