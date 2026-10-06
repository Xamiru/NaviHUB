// Sonic the Hedgehog — mainline platformers from the 1991 original through
// Sonic X Shadow Generations, plus the three live-action/CG hybrid films and
// the Knuckles streaming series. Sonic 3 & Knuckles is one row (the lock-on
// cartridge era): its title and date are Sonic the Hedgehog 3's original
// February 1994 release, with both "Sonic the Hedgehog 3" and "Sonic &
// Knuckles" (the October 1994 add-on half) folded in as aliases. Sonic
// Origins (2022, bundling 1, 2, CD and 3 & Knuckles) sits on the first
// game's row as the thematic "origins" namesake, the one-Steam-id-per-bundle
// approach used elsewhere on this page. Sonic Heroes, Sonic the Hedgehog
// (2006) and Sonic Unleashed never released on PC/Steam and carry no
// externalId. A fourth film is announced but releases 2027-03-11, after this
// page's 2026-10-05 cutoff, and is excluded.
// Per the task's disambiguation rule, the 1991 and 2006 games share a plain
// name with the 2020 film, so the two games are titled "Sonic the Hedgehog
// (1991)" and "Sonic the Hedgehog (2006)"; the films keep their plain names
// since they are a different media type and cannot collide with the games
// in library matching.
// No chrono: the mainline series has no fixed in-universe timeline the way
// Mega Man or Castlevania do — most entries are each other's direct
// continuation with no reordering puzzle to curate.
// Dates verified against Wikipedia infoboxes, 2026-10-05; Steam ids via the
// Steam store API and TMDB ids via TMDB the same day. Hero art is the Sonic
// Frontiers Steam library hero; character portraits are Wikipedia/Wikimedia
// fair-use renders.

import type { FranchiseCfg } from './types'

export const SONIC: FranchiseCfg = {
  id: 'sonic',
  name: 'Sonic the Hedgehog',
  short: 'Sonic',
  color: '#1b5fd6',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237320/library_hero.jpg',
  studio: 'Sega / Sonic Team',
  tagline: 'Gotta go fast — thirty-five years of rings, loops and chili dogs.',
  trivia: [
    {
      title: 'Built to out-run Mario',
      body: 'Sega designed Sonic the Hedgehog (1991) as a direct answer to Super Mario: a mascot platformer built entirely around momentum and speed rather than precision jumping, with spin-dash physics letting a skilled player blast through a level almost without stopping. Sonic 2\'s launch ("Sonic 2sday," the first-ever simultaneous worldwide release for a major game) made the character Sega\'s answer to Nintendo\'s mascot wars of the early 1990s.'
    },
    {
      title: 'The jump to 3D nobody fully solved',
      body: 'Sonic Adventure (1998) took the hedgehog into full 3D on the Dreamcast and multiple playable characters, but the series spent the following decade chasing a 3D camera and physics feel as reliable as the 2D games\' — Sonic the Hedgehog (2006) became infamous as the low point of that search. Sonic Generations (2011), pairing Classic and Modern Sonic in remade stages from across the series, is widely seen as the moment the 3D games found solid ground again, echoed again in 2024\'s X Shadow Generations remaster.'
    },
    {
      title: 'From games to a shared cinematic universe',
      body: 'Paramount\'s Sonic the Hedgehog (2020) redesigned the character after a trailer backlash and became the highest-grossing video game film in North America at the time; its sequels and the spin-off Knuckles series have built a small connected franchise of their own, running in parallel to the games rather than adapting any specific one.'
    }
  ],
  entries: [
    {
      id: 'sonic-1',
      title: 'Sonic the Hedgehog (1991)',
      aliases: ['Sonic Origins'],
      externalIds: [{ source: 'steam', id: '1794960' }],
      year: 1991,
      note: 'The original Green Hill Zone run that started it all (Origins also bundles 2, CD and 3 & Knuckles)'
    },
    {
      id: 'sonic-2',
      title: 'Sonic the Hedgehog 2',
      year: 1992,
      releaseDate: '1992-11-21',
      note: 'Tails joins, the Spin Dash debuts, and Sega\'s first worldwide simultaneous release'
    },
    {
      id: 'sonic-cd',
      title: 'Sonic CD',
      year: 1993,
      releaseDate: '1993-09-23',
      note: 'Time travel between past, present and good/bad futures on Little Planet'
    },
    {
      id: 'sonic-3-knuckles',
      title: 'Sonic 3 & Knuckles',
      aliases: ['Sonic the Hedgehog 3', 'Sonic & Knuckles'],
      year: 1994,
      releaseDate: '1994-02-02',
      note: 'Knuckles debuts as a rival; the October 1994 lock-on cartridge Sonic & Knuckles combines with this game to form the full story'
    },
    {
      id: 'sonic-adventure',
      title: 'Sonic Adventure',
      aliases: ['Sonic Adventure DX', 'Sonic Adventure DX: Director\'s Cut'],
      externalIds: [{ source: 'steam', id: '71250' }],
      year: 1998,
      releaseDate: '1998-12-23',
      note: 'The jump to full 3D on the Dreamcast, with six playable characters'
    },
    {
      id: 'sonic-adventure-2',
      title: 'Sonic Adventure 2',
      externalIds: [{ source: 'steam', id: '213610' }],
      year: 2001,
      releaseDate: '2001-06-19',
      note: 'Hero and Dark story campaigns; Shadow the Hedgehog\'s debut'
    },
    {
      id: 'sonic-heroes',
      title: 'Sonic Heroes',
      year: 2003,
      releaseDate: '2003-12-30',
      note: 'Four three-character teams, each with a Speed/Flight/Power formation'
    },
    {
      id: 'sonic-2006',
      title: 'Sonic the Hedgehog (2006)',
      year: 2006,
      releaseDate: '2006-11-14',
      note: 'Infamous rushed launch; Elise, Mephiles and a widely mocked human/hedgehog romance subplot'
    },
    {
      id: 'sonic-unleashed',
      title: 'Sonic Unleashed',
      year: 2008,
      releaseDate: '2008-11-18',
      note: 'Day-time speed stages and night-time Werehog brawling after Eggman shatters the planet'
    },
    {
      id: 'sonic-colors',
      title: 'Sonic Colors',
      aliases: ['Sonic Colors: Ultimate'],
      externalIds: [{ source: 'steam', id: '2055290' }],
      year: 2010,
      releaseDate: '2010-11-11',
      note: 'Wisps grant temporary powers across Eggman\'s amusement-park space station'
    },
    {
      id: 'sonic-generations',
      title: 'Sonic Generations',
      externalIds: [{ source: 'steam', id: '71340' }],
      year: 2011,
      releaseDate: '2011-11-01',
      note: 'Classic and Modern Sonic team up across remade stages from the series\' history'
    },
    {
      id: 'sonic-lost-world',
      title: 'Sonic Lost World',
      externalIds: [{ source: 'steam', id: '329440' }],
      year: 2013,
      releaseDate: '2013-10-18',
      note: 'Parkour-style running on tube-shaped worlds against the Deadly Six'
    },
    {
      id: 'sonic-mania',
      title: 'Sonic Mania',
      externalIds: [{ source: 'steam', id: '584400' }],
      year: 2017,
      releaseDate: '2017-08-15',
      note: 'Fan-developer-led return to 16-bit-style 2D, remixing classic zones with new ones'
    },
    {
      id: 'sonic-forces',
      title: 'Sonic Forces',
      externalIds: [{ source: 'steam', id: '637100' }],
      year: 2017,
      releaseDate: '2017-11-07',
      note: 'A custom player-created Avatar joins the Resistance against an Eggman Empire-conquered world'
    },
    {
      id: 'sonic-film-2020',
      title: 'Sonic the Hedgehog',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '454626' }],
      year: 2020,
      releaseDate: '2020-02-12',
      adaptation: true,
      note: 'Live-action/CG hybrid: Sonic hides out with Tom Wachowski while evading Dr. Robotnik'
    },
    {
      id: 'sonic-film-2022',
      title: 'Sonic the Hedgehog 2',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '675353' }],
      year: 2022,
      releaseDate: '2022-03-30',
      adaptation: true,
      note: 'Knuckles and Tails join the story as Robotnik returns for the Master Emerald'
    },
    {
      id: 'sonic-frontiers',
      title: 'Sonic Frontiers',
      externalIds: [{ source: 'steam', id: '1237320' }],
      year: 2022,
      releaseDate: '2022-11-08',
      note: 'An open-zone "Starfall Islands" structure, the series\' biggest design departure since Adventure'
    },
    {
      id: 'sonic-superstars',
      title: 'Sonic Superstars',
      externalIds: [{ source: 'steam', id: '2022670' }],
      year: 2023,
      releaseDate: '2023-10-17',
      note: 'A return to 2D co-op platforming with new Chaos Emerald transformations'
    },
    {
      id: 'sonic-knuckles-tv',
      title: 'Knuckles',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '158300' }],
      year: 2024,
      releaseDate: '2024-04-26',
      adaptation: true,
      spinOff: true,
      note: 'Paramount+ spin-off series bridging the second and third films, with Knuckles training a new disciple'
    },
    {
      id: 'sonic-x-shadow-generations',
      title: 'Sonic X Shadow Generations',
      externalIds: [{ source: 'steam', id: '2513280' }],
      year: 2024,
      releaseDate: '2024-10-25',
      note: 'A remaster of Generations bundled with Shadow Generations, a new side story set parallel to it'
    },
    {
      id: 'sonic-film-2024',
      title: 'Sonic the Hedgehog 3',
      mediaType: 'movie',
      externalIds: [{ source: 'tmdb', id: '939243' }],
      year: 2024,
      releaseDate: '2024-12-19',
      adaptation: true,
      note: 'Shadow the Hedgehog\'s film debut, out for revenge against humanity'
    }
  ],
  characters: [
    {
      id: 'sonic-sonic',
      name: 'Sonic the Hedgehog',
      role: 'The fastest thing alive',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Sonic_modern_and_classic_designs.png',
      appearsIn: [
        'sonic-1', 'sonic-2', 'sonic-cd', 'sonic-3-knuckles', 'sonic-adventure', 'sonic-adventure-2',
        'sonic-heroes', 'sonic-2006', 'sonic-unleashed', 'sonic-colors', 'sonic-generations',
        'sonic-lost-world', 'sonic-mania', 'sonic-forces', 'sonic-film-2020', 'sonic-film-2022',
        'sonic-frontiers', 'sonic-superstars', 'sonic-x-shadow-generations', 'sonic-film-2024'
      ],
      blurb: 'A blue hedgehog who runs faster than sound and refuses to take Dr. Eggman\'s schemes, or much else, seriously.'
    },
    {
      id: 'sonic-tails',
      name: 'Tails',
      role: 'Sonic\'s best friend and mechanic',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1a/Miles_%22Tails%22_Prower_Sonic_and_All-Stars_Racing_Transformed.png',
      appearsIn: ['sonic-2', 'sonic-3-knuckles', 'sonic-adventure', 'sonic-heroes', 'sonic-colors', 'sonic-generations', 'sonic-film-2022'],
      blurb: 'A two-tailed fox genius who builds the Tornado biplane and nearly every gadget the cast relies on, and idolizes Sonic above everyone.'
    },
    {
      id: 'sonic-knuckles',
      name: 'Knuckles the Echidna',
      role: 'Guardian of the Master Emerald',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/0/06/Knuckles_the_Echidna.png',
      appearsIn: ['sonic-3-knuckles', 'sonic-adventure', 'sonic-heroes', 'sonic-film-2022', 'sonic-knuckles-tv'],
      blurb: 'Tricked by Eggman into fighting Sonic in his debut, Knuckles has spent every appearance since torn between solitary duty on Angel Island and reluctant teamwork.'
    },
    {
      id: 'sonic-eggman',
      name: 'Dr. Eggman',
      role: 'Mad scientist and series antagonist',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/7/72/Doctor_EggmanSDT.png',
      appearsIn: [
        'sonic-1', 'sonic-2', 'sonic-cd', 'sonic-3-knuckles', 'sonic-adventure', 'sonic-adventure-2',
        'sonic-heroes', 'sonic-2006', 'sonic-unleashed', 'sonic-colors', 'sonic-forces',
        'sonic-film-2020', 'sonic-film-2022', 'sonic-film-2024'
      ],
      blurb: 'Also known as Dr. Robotnik, a mustached genius who has tried to conquer the world with robot armies and stolen Chaos Emeralds in nearly every game since 1991.'
    },
    {
      id: 'sonic-shadow',
      name: 'Shadow the Hedgehog',
      role: 'The Ultimate Life Form',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/4/41/ShadowTheHedgehogSA2.png',
      appearsIn: ['sonic-adventure-2', 'sonic-heroes', 'sonic-forces', 'sonic-x-shadow-generations', 'sonic-film-2024'],
      blurb: 'Created aboard the Space Colony ARK fifty years before Adventure 2, carrying a promise to a dying girl that drives every one of his later appearances.'
    }
  ]
}
