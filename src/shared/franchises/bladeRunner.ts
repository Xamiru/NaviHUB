// Blade Runner — Philip K. Dick's 1968 novel Do Androids Dream of Electric
// Sheep?, Ridley Scott's 1982 film (the Final Cut and other cuts are the same
// TMDB row), Westwood's 1997 adventure game (Blade Runner: Enhanced Edition is
// the Steam row, matched by id; the title is the original game's), the three
// prequel shorts that lead into Blade Runner 2049 (2036: Nexus Dawn and 2048:
// Nowhere to Run on TMDB as movies; Black Out 2022 is the anime short, held by
// AniList), Blade Runner 2049, and the Adult Swim/Crunchyroll series Black
// Lotus. TMDB also lists Black Out 2022 as a movie; it is kept once, as anime,
// because the library imports it from AniList.
// Chrono is in-universe: the 1982 film and the 1997 game (which runs alongside
// it in the same 2019 Los Angeles) share slot 1, then Black Out 2022, Black
// Lotus (2032), Nexus Dawn (2036), Nowhere to Run (2048) and Blade Runner 2049.
// The novel is a separate continuity (the film changes its names, setting and
// ending) and has no slot, so it sinks below the story order.
// Excluded: Blade Runner 2099 (not released by 2026-10-14), comics, soundtrack
// releases and the Final Cut as a separate row.
// Ids from TMDB (en-US), AniList, Steam appdetails and Open Library; story
// facts from Wikipedia, all checked 2026-10-14. Release dates are original
// ones (US theatrical or first release); Steam's 2022 date is the Enhanced
// Edition re-release.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'
const TM = 'https://image.tmdb.org/t/p'

export const BLADE_RUNNER: FranchiseCfg = {
  id: 'blade-runner',
  name: 'Blade Runner',
  short: 'Blade Runner',
  color: '#e0782a',
  heroUrl: `${TM}/w1280/1tgTLComhU3wXWlStRmuXzUP68h.jpg`,
  studio: 'Philip K. Dick / Ridley Scott / Westwood Studios',
  tagline: 'In a rain-soaked future Los Angeles, a hunter of artificial humans starts to wonder what separates him from them.',
  trivia: [
    {
      title: 'A novel with a different title',
      body: 'The film is based on Philip K. Dick\'s 1968 novel Do Androids Dream of Electric Sheep?, but the title "Blade Runner" is borrowed from elsewhere: it comes from Alan E. Nourse\'s 1974 novel The Bladerunner and William S. Burroughs\'s 1979 film treatment of it, whose title Scott\'s production bought the rights to use. The novel keeps the hero\'s name, Rick Deckard, but its Deckard is a bounty hunter who tests androids for empathy in a world emptied by nuclear fallout.'
    },
    {
      title: 'Many cuts of one film',
      body: 'The 1982 film exists in several versions: the theatrical cut with a voice-over and a happy ending, the 1992 Director\'s Cut, and The Final Cut, restored in 2007 for the 25th anniversary. All of them are the same film and the same TMDB row, which is why this page lists the film once.'
    },
    {
      title: 'A game that runs beside the film',
      body: 'Westwood Studios\' 1997 Blade Runner is not a retelling: its hero, the replicant hunter Ray McCoy, works the same stretch of November 2019 as Deckard, and the game randomises which characters are replicants in each playthrough. The Enhanced Edition on Steam is a 2022 re-release of that game, so it shares a slot with the film in this page\'s story order.'
    }
  ],
  entries: [
    {
      id: 'br-novel',
      title: 'Do Androids Dream of Electric Sheep?',
      mediaType: 'book',
      externalIds: [{ source: 'openlibrary', id: 'OL2172356W' }],
      year: 1968,
      note: 'Dick\'s novel: Rick Deckard retires rogue androids to afford a real animal after a nuclear war'
    },
    {
      id: 'br-film',
      title: 'Blade Runner',
      mediaType: 'movie',
      aliases: ['Blade Runner: The Final Cut', 'Blade Runner: The Director\'s Cut'],
      externalIds: [{ source: 'tmdb', id: '78' }],
      year: 1982,
      releaseDate: '1982-06-25',
      chrono: 1,
      mc: 79,
      adaptation: true,
      note: 'Ridley Scott\'s adaptation: Deckard is pulled back to hunt four escaped replicants in 2019 Los Angeles'
    },
    {
      id: 'br-game',
      title: 'Blade Runner',
      aliases: ['Blade Runner: Enhanced Edition'],
      externalIds: [{ source: 'steam', id: '1678420' }],
      year: 1997,
      releaseDate: '1997-11-13',
      chrono: 1,
      note: 'Westwood adventure: the rookie Ray McCoy hunts replicants in the same 2019 as the film'
    },
    {
      id: 'br-2036',
      title: '2036: Nexus Dawn',
      mediaType: 'movie',
      aliases: ['Blade Runner 2036'],
      externalIds: [{ source: 'tmdb', id: '473072' }],
      year: 2017,
      releaseDate: '2017-08-30',
      chrono: 4,
      mc: 68,
      note: 'Prequel short with Jared Leto as Niander Wallace, set in the years before the sequel'
    },
    {
      id: 'br-2048',
      title: '2048: Nowhere to Run',
      mediaType: 'movie',
      aliases: ['Blade Runner 2048'],
      externalIds: [{ source: 'tmdb', id: '475759' }],
      year: 2017,
      releaseDate: '2017-09-14',
      chrono: 5,
      mc: 68,
      note: 'Prequel short: the replicant Sapper Morton protects a woman and her child from a gang'
    },
    {
      id: 'br-blackout',
      title: 'Blade Runner: Black Out 2022',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '100168' }],
      year: 2017,
      releaseDate: '2017-09-26',
      chrono: 2,
      mc: 67,
      note: 'Shinichiro Watanabe\'s anime short on the 2022 blackout that wiped out replicant records'
    },
    {
      id: 'br-2049',
      title: 'Blade Runner 2049',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '335984' }],
      year: 2017,
      releaseDate: '2017-10-06',
      chrono: 6,
      mc: 76,
      note: 'Denis Villeneuve\'s sequel: the replicant blade runner K uncovers a secret that could break the world apart'
    },
    {
      id: 'br-black-lotus',
      title: 'Blade Runner: Black Lotus',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '105931' }],
      year: 2021,
      releaseDate: '2021-11-13',
      chrono: 3,
      mc: 58,
      note: 'Adult Swim and Crunchyroll series: the amnesiac Elle fights through Los Angeles in 2032'
    }
  ],
  characters: [
    {
      id: 'br-deckard',
      name: 'Rick Deckard',
      role: 'Blade runner',
      portraitUrl: `${TM}/w300_and_h450_face/pjBMJVPpcZK23Vt1nzr1zEBTWrP.jpg`,
      appearsIn: ['br-novel', 'br-film', 'br-2049'],
      blurb:
        'A retired Los Angeles police officer who hunts rogue replicants; a bounty hunter in the novel and played by Harrison Ford in both films.'
    },
    {
      id: 'br-batty',
      name: 'Roy Batty',
      role: 'Replicant leader',
      portraitUrl: `${TM}/w300_and_h450_face/xyag0LbjocTwx2Ht7B3RofvCNMT.jpg`,
      appearsIn: ['br-novel', 'br-film'],
      blurb:
        'The leader of the escaped Nexus-6 replicants, played by Rutger Hauer, who returns to Earth to demand more life from his maker.'
    },
    {
      id: 'br-rachael',
      name: 'Rachael',
      role: 'Replicant',
      portraitUrl: `${TM}/w300_and_h450_face/yfJADYt6xYPpg1g7Z7TTW0bcL2s.jpg`,
      appearsIn: ['br-novel', 'br-film', 'br-2049'],
      blurb:
        'A Tyrell Corporation prototype who believes herself human; she becomes Deckard\'s companion in the film, played by Sean Young.'
    },
    {
      id: 'br-gaff',
      name: 'Gaff',
      role: 'Police officer',
      portraitUrl: `${TM}/w300_and_h450_face/yleTij2PUEgaMLw8xYbLAt7UqIo.jpg`,
      appearsIn: ['br-film', 'br-2049', 'br-blackout'],
      blurb:
        'A cryptic officer played by Edward James Olmos, who leaves origami figures behind and speaks the invented street language Cityspeak.'
    },
    {
      id: 'br-k',
      name: 'K',
      role: 'Replicant blade runner',
      portraitUrl: `${TM}/w300_and_h450_face/lyUyVARQKhGxaxy0FbPJCQRpiaW.jpg`,
      appearsIn: ['br-2049'],
      blurb:
        'A newer-model replicant who retires older ones for the Los Angeles police, played by Ryan Gosling; a case leads him to question his own origins.'
    },
    {
      id: 'br-wallace',
      name: 'Niander Wallace',
      role: 'Industrialist',
      portraitUrl: `${TM}/w300_and_h450_face/ca3x0OfIKbJppZh8S1Alx3GfUZO.jpg`,
      appearsIn: ['br-2036', 'br-2049'],
      blurb:
        'A blind maker of replicants who bought the Tyrell Corporation\'s assets; Jared Leto plays him in the sequel and in the short 2036: Nexus Dawn.'
    },
    {
      id: 'br-elle',
      name: 'Elle',
      role: 'Amnesiac fugitive',
      portraitUrl: `${AL}/character/large/b256091-92XKpjy4lnW7.png`,
      appearsIn: ['br-black-lotus'],
      blurb:
        'The anime series\' heroine, who wakes with no memory in 2032 and fights her way through the city looking for the truth about herself.'
    }
  ]
}
