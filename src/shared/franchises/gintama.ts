// Gintama — Hideaki Sorachi's manga and Sunrise's anime: every TV season and
// split cour (Gintama, Gintama', Enchousen, Gintama°, Gintama., the Slip and
// Silver Soul arcs), the three original films (the Benizakura film, Be
// Forever Yorozuya and THE VERY FINAL), the Love Incense OVA and THE
// SEMI-FINAL specials, the 2025 Mr. Ginpachi's Zany Class spin-off, the 2026
// Yoshiwara in Flames film and the two live-action films. NO chrono: the
// series is largely episodic between its story arcs and the films are side
// stories or retellings, so release order is the reading order. Route runs
// through the TV series and films in broadcast order, with the OVA, specials,
// spin-off, 2026 film and live-action films as optional detours; the manga
// sits outside the route as the source. Excluded: the Jump Festa specials,
// the Gintama on Theater 2D compilation films (re-releases of TV episodes),
// the light novels and the games.
// Anime/manga ids, dates and scores from AniList; live-action ids, earliest
// release dates and user scores from TMDB (en-US). Art from AniList,
// curl-verified 2026-10-14.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const GINTAMA: FranchiseCfg = {
  id: 'gintama',
  name: 'Gintama',
  short: 'Gintama',
  color: '#8fa3b8',
  heroUrl: `${AL}/media/anime/banner/918-bljqHE1PFArH.jpg`,
  studio: 'Shueisha / Sunrise / Bandai Namco Pictures',
  tagline: 'Aliens took over Edo and banned the sword; one silver-haired samurai still carries a wooden one and takes any odd job that pays.',
  trivia: [
    {
      title: 'An Edo with spaceships',
      body: 'Sorachi’s premise is an alternate late-Edo Japan in which alien invaders, the Amanto, forced the shogunate to open the country and outlawed swords. The result lets the series be a samurai drama, a science-fiction story and a nonstop parody of Weekly Shonen Jump and Japanese pop culture at the same time.'
    },
    {
      title: 'The ending that kept not ending',
      body: 'Gintama has a running joke about its own finale. The 2013 film was titled The Final Chapter: Be Forever Yorozuya, and the manga itself left Weekly Shonen Jump in 2018 only to continue in Jump GIGA and then on the Gintama app before finally concluding in 2019. The anime’s closing film, released in 2021, was titled THE FINAL in Japan and THE VERY FINAL in English.'
    },
    {
      title: 'Comedy until it isn’t',
      body: 'The anime alternates between standalone gag episodes and long serious arcs, and the later seasons lean increasingly into the latter: the Silver Soul arc that closes the TV run is an extended war story. Fans often recommend the series as one whose comedy earns the weight of its dramatic arcs, rather than the other way around.'
    }
  ],
  entries: [
    {
      id: 'gintama-manga',
      title: 'Gin Tama',
      mediaType: 'manga',
      aliases: ['Gintama'],
      externalIds: [{ source: 'anilist', id: '30044' }],
      year: 2003,
      releaseDate: '2003-12-08',
      mc: 86,
      note: 'Sorachi’s manga, 2003-2019: Gintoki’s Odd Jobs, the Shinsengumi and a war that never quite ended'
    },
    {
      id: 'gintama-s1',
      title: 'Gintama',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '918' }],
      year: 2006,
      releaseDate: '2006-04-04',
      route: 1,
      adaptation: true,
      mc: 85,
      note: '201 episodes: Gintoki, Shinpachi and Kagura take odd jobs across an alien-occupied Edo'
    },
    {
      id: 'gintama-benizakura',
      title: 'Gintama - The Movie',
      mediaType: 'anime',
      aliases: ['Gintama: Shinyaku Benizakura-hen'],
      externalIds: [{ source: 'anilist', id: '7472' }],
      year: 2010,
      releaseDate: '2010-04-24',
      route: 2,
      optional: true,
      adaptation: true,
      mc: 83,
      note: 'Theatrical retelling of the Benizakura arc, Gintoki’s first confrontation with Takasugi'
    },
    {
      id: 'gintama-s2',
      title: 'Gintama Season 2',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '9969' }],
      year: 2011,
      releaseDate: '2011-04-04',
      route: 3,
      adaptation: true,
      mc: 89,
      note: 'Gintama’: the series returns after a year off the air'
    },
    {
      id: 'gintama-enchousen',
      title: 'Gintama Season 2 Part 2',
      mediaType: 'anime',
      aliases: ['Gintama’: Enchousen'],
      externalIds: [{ source: 'anilist', id: '15417' }],
      year: 2012,
      releaseDate: '2012-10-04',
      route: 4,
      adaptation: true,
      mc: 89,
      note: 'Gintama’: Enchousen, the 13-episode extension'
    },
    {
      id: 'gintama-be-forever',
      title: 'Gintama: The Final Chapter - Be Forever Yorozuya',
      mediaType: 'anime',
      aliases: ['Gintama: Kanketsu-hen - Yorozuya yo Eien Nare'],
      externalIds: [{ source: 'anilist', id: '15335' }],
      year: 2013,
      releaseDate: '2013-07-06',
      route: 5,
      mc: 87,
      note: 'Original story film: Gintoki is thrown into a future where the Odd Jobs have broken up'
    },
    {
      id: 'gintama-s3',
      title: 'Gintama Season 3',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '20996' }],
      year: 2015,
      releaseDate: '2015-04-08',
      route: 6,
      adaptation: true,
      mc: 90,
      note: 'Gintama°: includes the Shogun Assassination and Farewell Shinsengumi arcs'
    },
    {
      id: 'gintama-love-incense',
      title: 'Gintama: Love Incense Arc',
      mediaType: 'anime',
      aliases: ['Gintama°: Aizome Kaori-hen'],
      externalIds: [{ source: 'anilist', id: '21588' }],
      year: 2016,
      releaseDate: '2016-08-04',
      route: 7,
      optional: true,
      adaptation: true,
      mc: 80,
      note: 'Two-episode OVA adapting a comedy arc the TV series skipped'
    },
    {
      id: 'gintama-s4',
      title: 'Gintama Season 4',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '97889' }],
      year: 2017,
      releaseDate: '2017-01-09',
      route: 8,
      adaptation: true,
      mc: 89,
      note: 'Gintama.: the Rakuyou arc, where the Joui war’s survivors finally meet again'
    },
    {
      id: 'gintama-live-action',
      title: 'Gintama',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '432985' }],
      year: 2017,
      releaseDate: '2017-07-14',
      route: 13,
      optional: true,
      adaptation: true,
      mc: 68,
      note: 'Live-action film by Yuichi Fukuda, with Shun Oguri as Gintoki, adapting the Benizakura arc'
    },
    {
      id: 'gintama-slip',
      title: 'Gintama.: Slip Arc',
      mediaType: 'anime',
      aliases: ['Gintama.: Porori-hen'],
      externalIds: [{ source: 'anilist', id: '99714' }],
      year: 2017,
      releaseDate: '2017-10-02',
      route: 9,
      adaptation: true,
      mc: 82,
      note: 'A comedy cour before the final war'
    },
    {
      id: 'gintama-silver-soul',
      title: 'Gintama.: Silver Soul Arc',
      mediaType: 'anime',
      aliases: ['Gintama.: Shirogane no Tamashii-hen'],
      externalIds: [{ source: 'anilist', id: '100784' }],
      year: 2018,
      releaseDate: '2018-01-08',
      route: 10,
      adaptation: true,
      mc: 86,
      note: 'The final arc begins: Edo becomes the battlefield'
    },
    {
      id: 'gintama-silver-soul-2',
      title: 'Gintama.: Silver Soul Arc - Second Half War',
      mediaType: 'anime',
      aliases: ['Gintama.: Shirogane no Tamashii-hen - Kouhan-sen'],
      externalIds: [{ source: 'anilist', id: '101925' }],
      year: 2018,
      releaseDate: '2018-07-09',
      route: 11,
      adaptation: true,
      mc: 87,
      note: 'The second half of the final arc, ending the TV series'
    },
    {
      id: 'gintama-live-action-2',
      title: 'Gintama 2: Rules Are Made to Be Broken',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '519176' }],
      year: 2018,
      releaseDate: '2018-08-04',
      route: 14,
      optional: true,
      adaptation: true,
      mc: 71,
      note: 'Live-action sequel adapting the Shinsengumi Crisis arc'
    },
    {
      id: 'gintama-very-final',
      title: 'Gintama: THE VERY FINAL',
      mediaType: 'anime',
      aliases: ['Gintama: THE FINAL'],
      externalIds: [{ source: 'anilist', id: '114129' }],
      year: 2021,
      releaseDate: '2021-01-08',
      route: 12,
      adaptation: true,
      mc: 90,
      note: 'The closing film, adapting the manga’s last chapters'
    },
    {
      id: 'gintama-semi-final',
      title: 'Gintama: THE SEMI-FINAL',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '126819' }],
      year: 2021,
      releaseDate: '2021-01-15',
      route: 15,
      optional: true,
      mc: 83,
      note: 'Two streaming specials released alongside the final film'
    },
    {
      id: 'gintama-ginpachi',
      title: 'GINTAMA - Mr. Ginpachi’s Zany Class',
      mediaType: 'anime',
      aliases: ['3-nen Z-gumi Ginpachi-sensei', 'Mr. Ginpachi’s Zany Class'],
      externalIds: [{ source: 'anilist', id: '162890' }],
      year: 2025,
      releaseDate: '2025-10-07',
      route: 16,
      optional: true,
      spinOff: true,
      mc: 75,
      note: 'School parody spin-off: Gintoki as a high-school homeroom teacher and the cast as his students'
    },
    {
      id: 'gintama-yoshiwara-2026',
      title: 'Gintama the Movie 2026: Yoshiwara in Flames',
      mediaType: 'anime',
      aliases: ['Shin Gintama Movie: Yoshiwara Daienjou'],
      externalIds: [{ source: 'anilist', id: '197474' }],
      year: 2026,
      releaseDate: '2026-02-13',
      route: 17,
      optional: true,
      adaptation: true,
      mc: 87,
      note: 'Theatrical film of the Yoshiwara in Flames arc'
    }
  ],
  characters: [
    {
      id: 'gintama-gintoki',
      name: 'Gintoki Sakata',
      role: 'Protagonist, Odd Jobs Gin',
      portraitUrl: `${AL}/character/large/b672-cP5VPriN67xJ.png`,
      appearsIn: ['gintama-manga', 'gintama-s1', 'gintama-benizakura', 'gintama-s2', 'gintama-enchousen', 'gintama-be-forever', 'gintama-s3', 'gintama-love-incense', 'gintama-s4', 'gintama-live-action', 'gintama-slip', 'gintama-silver-soul', 'gintama-silver-soul-2', 'gintama-live-action-2', 'gintama-very-final', 'gintama-semi-final', 'gintama-ginpachi', 'gintama-yoshiwara-2026'],
      blurb: 'A lazy, sweets-addicted odd-jobber who was once a legendary rebel samurai, and who still draws his wooden sword for anyone he decides to protect.'
    },
    {
      id: 'gintama-shinpachi',
      name: 'Shinpachi Shimura',
      role: 'Odd Jobs member',
      portraitUrl: `${AL}/character/large/b673-nScArSMt85kd.jpg`,
      appearsIn: ['gintama-manga', 'gintama-s1', 'gintama-benizakura', 'gintama-s2', 'gintama-enchousen', 'gintama-be-forever', 'gintama-s3', 'gintama-love-incense', 'gintama-s4', 'gintama-live-action', 'gintama-slip', 'gintama-silver-soul', 'gintama-silver-soul-2', 'gintama-live-action-2', 'gintama-very-final', 'gintama-semi-final', 'gintama-ginpachi', 'gintama-yoshiwara-2026'],
      blurb: 'The heir to a failing sword dojo, who joins Gintoki to learn what a samurai is and spends most of his time as the story’s straight man.'
    },
    {
      id: 'gintama-kagura',
      name: 'Kagura',
      role: 'Odd Jobs member',
      portraitUrl: `${AL}/character/large/b674-w8wCh0A5Qa8R.png`,
      appearsIn: ['gintama-manga', 'gintama-s1', 'gintama-benizakura', 'gintama-s2', 'gintama-enchousen', 'gintama-be-forever', 'gintama-s3', 'gintama-love-incense', 'gintama-s4', 'gintama-live-action', 'gintama-slip', 'gintama-silver-soul', 'gintama-silver-soul-2', 'gintama-live-action-2', 'gintama-very-final', 'gintama-semi-final', 'gintama-ginpachi', 'gintama-yoshiwara-2026'],
      blurb: 'A girl from the Yato, a near-extinct warrior race, who carries a parasol gun, eats enough for ten and lives in Gintoki’s closet.'
    },
    {
      id: 'gintama-hijikata',
      name: 'Toshiro Hijikata',
      role: 'Vice-Commander of the Shinsengumi',
      portraitUrl: `${AL}/character/large/b2650-zgkj5l8mIOnn.png`,
      appearsIn: ['gintama-manga', 'gintama-s1', 'gintama-s2', 'gintama-enchousen', 'gintama-be-forever', 'gintama-s3', 'gintama-s4', 'gintama-live-action', 'gintama-slip', 'gintama-silver-soul', 'gintama-silver-soul-2', 'gintama-live-action-2', 'gintama-very-final'],
      blurb: 'The Shinsengumi’s strict, chain-smoking enforcer, who puts mayonnaise on everything and is Gintoki’s rival in almost every way.'
    },
    {
      id: 'gintama-okita',
      name: 'Sogo Okita',
      role: 'Shinsengumi captain',
      portraitUrl: `${AL}/character/large/b2282-X0uYqwmwxiPo.png`,
      appearsIn: ['gintama-manga', 'gintama-s1', 'gintama-s2', 'gintama-enchousen', 'gintama-be-forever', 'gintama-s3', 'gintama-s4', 'gintama-live-action', 'gintama-slip', 'gintama-silver-soul', 'gintama-silver-soul-2', 'gintama-live-action-2', 'gintama-very-final'],
      blurb: 'The Shinsengumi’s best swordsman and a cheerful sadist who wants Hijikata’s job and keeps trying to kill him for it.'
    },
    {
      id: 'gintama-katsura',
      name: 'Kotaro Katsura',
      role: 'Rebel leader',
      portraitUrl: `${AL}/character/large/b1533-tSqUrj2DOK5p.png`,
      appearsIn: ['gintama-manga', 'gintama-s1', 'gintama-benizakura', 'gintama-s2', 'gintama-enchousen', 'gintama-be-forever', 'gintama-s3', 'gintama-s4', 'gintama-live-action', 'gintama-slip', 'gintama-silver-soul', 'gintama-silver-soul-2', 'gintama-live-action-2', 'gintama-very-final'],
      blurb: 'Gintoki’s old comrade from the war, now a wanted revolutionary who escapes the Shinsengumi in absurd disguises alongside his companion Elizabeth.'
    },
    {
      id: 'gintama-takasugi',
      name: 'Shinsuke Takasugi',
      role: 'Leader of the Kiheitai',
      portraitUrl: `${AL}/character/large/b2948-Er1xnL05k1oU.png`,
      appearsIn: ['gintama-manga', 'gintama-s1', 'gintama-benizakura', 'gintama-s3', 'gintama-s4', 'gintama-live-action', 'gintama-silver-soul', 'gintama-silver-soul-2', 'gintama-very-final'],
      blurb: 'The third of Gintoki’s wartime comrades, who never stopped fighting and wants to destroy the world that took their teacher from them.'
    }
  ]
}
