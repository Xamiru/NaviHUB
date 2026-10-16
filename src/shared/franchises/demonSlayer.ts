// Demon Slayer: Kimetsu no Yaiba — Koyoharu Gotouge's manga and ufotable's
// anime: the first season, the Mugen Train film and its expanded TV retelling,
// the Entertainment District, Swordsmith Village and Hashira Training arcs,
// and the first Infinity Castle film. Chrono follows the story's arcs; the
// manga covers the whole story and sits at slot 1, and the Mugen Train film
// and TV arc share a slot as two tellings of one arc. Route follows the
// anime, with the Mugen Train TV arc (the film re-cut into episodes plus one
// original episode) as an optional detour. Excluded: the Infinity Castle
// parts 2 and 3 (unreleased), the compilation films of TV arcs, the Kimetsu
// Academy parody shorts and manga, and the spin-off manga and light novels.
// The two Hinokami Chronicles games (added 2026-10-17, Steam ids via the Steam
// store API) are optional adaptation rows in the slot of the arc each opens.
// Ids, dates and scores from AniList; art from AniList, curl-verified
// 2026-10-14.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const DEMON_SLAYER: FranchiseCfg = {
  id: 'demon-slayer',
  name: 'Demon Slayer: Kimetsu no Yaiba',
  short: 'Demon Slayer',
  color: '#2e8b57',
  heroUrl: `${AL}/media/anime/banner/101922-33MtJGsUSxga.jpg`,
  studio: 'Shueisha / ufotable',
  tagline: 'A boy whose family was slaughtered by a demon joins the corps that hunts them, carrying his demon sister on his back.',
  trivia: [
    {
      title: 'A short Jump run, a long shadow',
      body: 'Gotouge’s manga ran in Weekly Shonen Jump from 2016 to 2020 and ended after 23 volumes, a compact length for a Jump hit. Sales climbed sharply after ufotable’s 2019 anime adaptation began airing, and the series became one of the best-selling manga of its era.'
    },
    {
      title: 'Mugen Train, twice',
      body: 'The Mugen Train arc was released first as a theatrical film in October 2020, which went on to become the highest-grossing film ever released in Japan. A year later it was broadcast again as a seven-episode TV arc, re-cut from the film with an added original first episode that follows Rengoku before he boards the train.'
    },
    {
      title: 'The finale as a film trilogy',
      body: 'Rather than a TV season, the final Infinity Castle arc is being adapted as a trilogy of films. The first, released in July 2025, opens the corps’ assault on Muzan’s fortress; two more films complete the arc.'
    }
  ],
  entries: [
    {
      id: 'kny-manga',
      title: 'Demon Slayer: Kimetsu no Yaiba',
      mediaType: 'manga',
      aliases: ['Kimetsu no Yaiba'],
      externalIds: [{ source: 'anilist', id: '87216' }],
      year: 2016,
      releaseDate: '2016-02-15',
      chrono: 1,
      mc: 79,
      note: 'Gotouge’s manga, 2016-2020: the complete story, from Tanjiro’s first day to the last battle'
    },
    {
      id: 'kny-s1',
      title: 'Demon Slayer: Kimetsu no Yaiba',
      mediaType: 'anime',
      aliases: ['Kimetsu no Yaiba'],
      externalIds: [{ source: 'anilist', id: '101922' }],
      year: 2019,
      releaseDate: '2019-04-06',
      chrono: 1,
      route: 1,
      adaptation: true,
      mc: 82,
      note: 'Tanjiro trains, passes Final Selection and takes his first missions with Nezuko, Zenitsu and Inosuke'
    },
    {
      id: 'kny-mugen-train-movie',
      title: 'Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train',
      mediaType: 'anime',
      aliases: ['Kimetsu no Yaiba: Mugen Ressha-hen'],
      externalIds: [{ source: 'anilist', id: '112151' }],
      year: 2020,
      releaseDate: '2020-10-16',
      chrono: 2,
      route: 2,
      adaptation: true,
      mc: 84,
      note: 'Tanjiro’s group joins the Flame Hashira, Rengoku, aboard a train where passengers keep vanishing'
    },
    {
      id: 'kny-mugen-train-tv',
      title: 'Demon Slayer: Kimetsu no Yaiba Mugen Train Arc',
      mediaType: 'anime',
      aliases: ['Kimetsu no Yaiba: Mugen Ressha-hen (TV)'],
      externalIds: [{ source: 'anilist', id: '129874' }],
      year: 2021,
      releaseDate: '2021-10-10',
      chrono: 2,
      route: 3,
      optional: true,
      adaptation: true,
      mc: 82,
      note: 'The film re-cut as TV episodes, plus an original episode following Rengoku before the train'
    },
    {
      id: 'kny-hinokami',
      title: 'Demon Slayer -Kimetsu no Yaiba- The Hinokami Chronicles',
      aliases: ['Demon Slayer: The Hinokami Chronicles'],
      externalIds: [{ source: 'steam', id: '1490890' }],
      year: 2021,
      releaseDate: '2021-10-14',
      chrono: 1,
      route: 8,
      optional: true,
      adaptation: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1490890/library_hero.jpg',
      note: 'CyberConnect2 arena fighter retelling the first season through Mugen Train'
    },
    {
      id: 'kny-entertainment-district',
      title: 'Demon Slayer: Kimetsu no Yaiba Entertainment District Arc',
      mediaType: 'anime',
      aliases: ['Kimetsu no Yaiba: Yuukaku-hen'],
      externalIds: [{ source: 'anilist', id: '142329' }],
      year: 2021,
      releaseDate: '2021-12-05',
      chrono: 3,
      route: 4,
      adaptation: true,
      mc: 86,
      note: 'The Sound Hashira, Tengen Uzui, takes the boys undercover in the pleasure district to find an Upper Moon'
    },
    {
      id: 'kny-swordsmith-village',
      title: 'Demon Slayer: Kimetsu no Yaiba Swordsmith Village Arc',
      mediaType: 'anime',
      aliases: ['Kimetsu no Yaiba: Katanakaji no Sato-hen'],
      externalIds: [{ source: 'anilist', id: '145139' }],
      year: 2023,
      releaseDate: '2023-04-09',
      chrono: 4,
      route: 5,
      adaptation: true,
      mc: 80,
      note: 'Two Upper Moons attack the hidden village where the corps’ swords are forged'
    },
    {
      id: 'kny-hashira-training',
      title: 'Demon Slayer: Kimetsu no Yaiba Hashira Training Arc',
      mediaType: 'anime',
      aliases: ['Kimetsu no Yaiba: Hashira Geiko-hen'],
      externalIds: [{ source: 'anilist', id: '166240' }],
      year: 2024,
      releaseDate: '2024-05-12',
      chrono: 5,
      route: 6,
      adaptation: true,
      mc: 79,
      note: 'The whole corps trains under the Hashira for the battle everyone knows is coming'
    },
    {
      id: 'kny-infinity-castle-1',
      title: 'Demon Slayer: Kimetsu no Yaiba Infinity Castle',
      mediaType: 'anime',
      aliases: ['Kimetsu no Yaiba: Mugenjou-hen Movie 1 - Akaza Sairai'],
      externalIds: [{ source: 'anilist', id: '178788' }],
      year: 2025,
      releaseDate: '2025-07-18',
      chrono: 6,
      route: 7,
      adaptation: true,
      mc: 86,
      note: 'Film trilogy part 1: the corps is pulled into Muzan’s shifting fortress, and Akaza returns'
    },
    {
      id: 'kny-hinokami-2',
      title: 'Demon Slayer -Kimetsu no Yaiba- The Hinokami Chronicles 2',
      aliases: ['Demon Slayer: The Hinokami Chronicles 2'],
      externalIds: [{ source: 'steam', id: '2928600' }],
      year: 2025,
      releaseDate: '2025-08-05',
      chrono: 3,
      route: 9,
      optional: true,
      adaptation: true,
      bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2928600/library_hero.jpg',
      note: 'Picks up at the Entertainment District and runs to Hashira Training'
    }
  ],
  characters: [
    {
      id: 'kny-tanjiro',
      name: 'Tanjiro Kamado',
      role: 'Protagonist',
      portraitUrl: `${AL}/character/large/b126071-BTNEc1nRIv68.png`,
      appearsIn: ['kny-manga', 'kny-s1', 'kny-mugen-train-movie', 'kny-mugen-train-tv', 'kny-entertainment-district', 'kny-swordsmith-village', 'kny-hashira-training', 'kny-infinity-castle-1'],
      blurb: 'A charcoal seller’s son with an extraordinary sense of smell, who becomes a demon slayer to find a cure for his sister and never stops pitying the demons he kills.'
    },
    {
      id: 'kny-nezuko',
      name: 'Nezuko Kamado',
      role: 'Tanjiro’s sister',
      portraitUrl: `${AL}/character/large/b127518-NRlq1CQ1v1ro.png`,
      appearsIn: ['kny-manga', 'kny-s1', 'kny-mugen-train-movie', 'kny-mugen-train-tv', 'kny-entertainment-district', 'kny-swordsmith-village', 'kny-hashira-training'],
      blurb: 'Turned into a demon the night her family died, she refuses to eat humans and fights at her brother’s side from inside a wooden box.'
    },
    {
      id: 'kny-zenitsu',
      name: 'Zenitsu Agatsuma',
      role: 'Thunder Breathing swordsman',
      portraitUrl: `${AL}/character/large/b129131-FZrQ7lSlxmEr.png`,
      appearsIn: ['kny-manga', 'kny-s1', 'kny-mugen-train-movie', 'kny-mugen-train-tv', 'kny-entertainment-district', 'kny-hashira-training', 'kny-infinity-castle-1'],
      blurb: 'A coward who panics at every demon and then, asleep or fainted, cuts it down with a single lightning-fast technique.'
    },
    {
      id: 'kny-inosuke',
      name: 'Inosuke Hashibira',
      role: 'Beast Breathing swordsman',
      portraitUrl: `${AL}/character/large/n129130-SJC0Kn1DU39E.jpg`,
      appearsIn: ['kny-manga', 'kny-s1', 'kny-mugen-train-movie', 'kny-mugen-train-tv', 'kny-entertainment-district', 'kny-hashira-training', 'kny-infinity-castle-1'],
      blurb: 'Raised by boars in the mountains, he wears a boar’s head, fights with two jagged swords and treats everyone as a rival.'
    },
    {
      id: 'kny-giyu',
      name: 'Giyu Tomioka',
      role: 'Water Hashira',
      portraitUrl: `${AL}/character/large/b130050-qsLThJs5VIbz.png`,
      appearsIn: ['kny-manga', 'kny-s1', 'kny-hashira-training', 'kny-infinity-castle-1'],
      blurb: 'The first demon slayer Tanjiro meets, who spares Nezuko and sends Tanjiro to his own teacher, and who considers himself unworthy of his rank.'
    },
    {
      id: 'kny-rengoku',
      name: 'Kyojuro Rengoku',
      role: 'Flame Hashira',
      portraitUrl: `${AL}/character/large/b129133-VlTPowwt68rJ.png`,
      appearsIn: ['kny-manga', 'kny-s1', 'kny-mugen-train-movie', 'kny-mugen-train-tv'],
      blurb: 'A booming, wholehearted Hashira who takes the boys under his wing on the Mugen Train and sets the example they measure themselves against afterward.'
    },
    {
      id: 'kny-muzan',
      name: 'Muzan Kibutsuji',
      role: 'The progenitor of all demons',
      portraitUrl: `${AL}/character/large/b129132-4nIZakUZ1o8W.jpg`,
      appearsIn: ['kny-manga', 'kny-s1', 'kny-mugen-train-movie', 'kny-mugen-train-tv', 'kny-swordsmith-village', 'kny-hashira-training', 'kny-infinity-castle-1'],
      blurb: 'The first demon, a thousand years old, who turned Nezuko and rules every other demon through his blood and their fear of him.'
    }
  ]
}
