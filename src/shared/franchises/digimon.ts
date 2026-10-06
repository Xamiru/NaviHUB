// Digimon — Bandai and Toei's Digital Monster franchise: the Japanese TV anime,
// the theatrical films and the main console RPGs. TV: Adventure, Adventure 02,
// Tamers, Frontier, Savers (Data Squad), the three Xros Wars (Fusion) series,
// Digimon Universe: App Monsters (Digimon-branded in its own title), Adventure
// (2020), Ghost Game and Beatbreak (premiered 2025-10-05). Films: the 1999-2002
// Toei shorts and features, X-Evolution, the Savers film, the six Adventure tri.
// chapters, Last Evolution Kizuna and Adventure 02: The Beginning. Games:
// Digimon World, the Story games Cyber Sleuth, Hacker's Memory and Time
// Stranger, Digimon World: Next Order and Digimon Survive. The Steam Complete
// Edition bundles Cyber Sleuth with Hacker's Memory; its single app id sits on
// Cyber Sleuth, and Hacker's Memory matches by title.
// No chrono column: the series run in separate continuities (Adventure / 02 /
// tri. / Kizuna / The Beginning are one line, Tamers, Frontier, Savers, Xros
// Wars, the 2020 Adventure reboot, Ghost Game, Beatbreak and each game are
// their own), so a single story order would be invented. A partial order for
// the Adventure line alone would also force invented slots onto every game row,
// since any chrono value requires one on each non-spin-off game.
// Excluded: the 2000 US compilation Digimon: The Movie (no AniList entry), the
// Digimon Grand Prix theme-park short, specials and ONAs (Savers special, 20th
// Memorial Story, Adventure BEYOND, game prologue/opening shorts), the 2027
// new series, handheld and spin-off games (Digimon World 2-4, Dawn/Dusk, Rumble
// Arena, the racing and card games, Digimon Masters Online), manga and the
// virtual pets.
// Ids from AniList and Steam appdetails; dates from AniList and Wikipedia;
// story facts from AniList descriptions and Wikipedia, checked 2026-10-05.

import type { FranchiseCfg } from './types'

export const DIGIMON: FranchiseCfg = {
  id: 'digimon',
  name: 'Digimon',
  short: 'Digimon',
  color: '#f08a24',
  heroUrl: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/552-xAHaRMpoco2e.jpg',
  studio: 'Bandai / Toei Animation',
  tagline: 'Children, their partner monsters and the Digital World on the other side of the network.',
  trivia: [
    {
      title: 'A virtual pet for boys',
      body: 'Digimon began in June 1997 as Digital Monster, a line of virtual pets from WiZ and Bandai intended as a masculine counterpart to the Tamagotchi. Two devices could be linked so that players\' creatures could fight each other, an innovation at the time, and the pets were banned in some Asian schools as noisy and violent.\n\nDesigner Kenji Watanabe, influenced by American comics, gave the creatures a harder-edged, "cool" look. The original 1997 model sold 14 million units by March 2004, 13 million of them in Japan.'
    },
    {
      title: 'Separate worlds, one premise',
      body: 'Several Digimon series stand in their own continuity, but they share a setting and a starting point: a human child meets a Digimon, either by falling into the Digital World or because a Digimon has crossed into the human one, and gets a digivice, a device modelled on the original virtual pets, that lets the partner evolve.\n\nThe Adventure line is the exception that keeps returning: Adventure 02, the six tri. films, Last Evolution Kizuna and Adventure 02: The Beginning all follow the same children as they grow up.'
    },
    {
      title: 'Bigger in the 2020s',
      body: 'The franchise gained momentum with the PlayStation game Digimon World in January 1999 and generated over 500 million dollars in sales by 2000. Bandai has since said that game and card game sales made the 2020s the most successful period in the property\'s history, ahead of its original anime boom.\n\nDigimon Story: Time Stranger, released in October 2025, became the fastest-selling Digimon game and was the first Story entry with an English dub.'
    }
  ],
  entries: [
    {
      id: 'digimon-world',
      title: 'Digimon World',
      year: 1999,
      releaseDate: '1999-01-28',
      note: 'Raise a single partner from an egg to save File Island, where Digimon are losing their memories'
    },
    {
      id: 'digimon-adventure-film',
      title: 'Digimon Adventure (Movie)',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '2961' }],
      year: 1999,
      releaseDate: '1999-03-06',
      note: 'Short film: a brother and sister see a living creature come out of their family computer'
    },
    {
      id: 'digimon-adventure',
      title: 'Digimon Adventure',
      mediaType: 'anime',
      aliases: ['Digimon: Digital Monsters'],
      externalIds: [{ source: 'anilist', id: '552' }],
      year: 1999,
      releaseDate: '1999-03-07',
      note: 'Seven children are pulled into the Digital World and become the Chosen Children who protect it'
    },
    {
      id: 'digimon-war-game',
      title: 'Digimon Adventure: Our War Game!',
      mediaType: 'anime',
      aliases: ['Digimon: Our War Game', 'Digimon Adventure: Bokura no War Game!'],
      externalIds: [{ source: 'anilist', id: '2397' }],
      year: 2000,
      releaseDate: '2000-03-04',
      note: 'A Virus-type Digimon hatches on the internet and eats its way through Japan\'s computer systems'
    },
    {
      id: 'digimon-adventure-02',
      title: 'Digimon Adventure 02',
      mediaType: 'anime',
      aliases: ['Digimon: Digital Monsters 02'],
      externalIds: [{ source: 'anilist', id: '1313' }],
      year: 2000,
      releaseDate: '2000-04-02',
      note: 'A new group of Chosen Children fights the Digimon Emperor, who is enslaving the Digital World'
    },
    {
      id: 'digimon-hurricane-touchdown',
      title: 'Digimon: Hurricane Touchdown',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '2962' }],
      year: 2000,
      releaseDate: '2000-07-08',
      note: 'Two-part film: the original Chosen Children are kidnapped and the 02 group races to save them'
    },
    {
      id: 'digimon-revenge-diaboromon',
      title: 'Digimon Adventure 02: Revenge of Diaboromon',
      mediaType: 'anime',
      aliases: ['Digimon Adventure 02: Diablomon no Gyakushuu'],
      externalIds: [{ source: 'anilist', id: '2398' }],
      year: 2001,
      releaseDate: '2001-03-03',
      note: 'The virus Diaboromon returns across every screen in Japan, hunting Taichi and Yamato'
    },
    {
      id: 'digimon-tamers',
      title: 'Digimon Tamers',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '874' }],
      year: 2001,
      releaseDate: '2001-04-01',
      note: 'Card-game fans receive real Digimon partners as Digimon begin appearing across Japan'
    },
    {
      id: 'digimon-battle-adventurers',
      title: 'Digimon Tamers: Battle of Adventurers',
      mediaType: 'anime',
      aliases: ['Digimon Tamers: Boukensha-tachi no Tatakai'],
      externalIds: [{ source: 'anilist', id: '3032' }],
      year: 2001,
      releaseDate: '2001-07-14',
      note: 'On holiday in Okinawa, Takato meets a tamer linked to a virus spreading through a popular computer pet'
    },
    {
      id: 'digimon-runaway-locomon',
      title: 'Digimon Tamers: Runaway Locomon',
      mediaType: 'anime',
      aliases: ['Digimon Tamers: Bousou Digimon Tokkyuu'],
      externalIds: [{ source: 'anilist', id: '3033' }],
      year: 2002,
      releaseDate: '2002-03-02',
      note: 'The Tamers chase the train Digimon Locomon before it reaches the portal to the Digital World'
    },
    {
      id: 'digimon-frontier',
      title: 'Digimon Frontier',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '1132' }],
      year: 2002,
      releaseDate: '2002-04-07',
      note: 'Children who can turn into Digimon themselves fight Cherubimon for the Digital World\'s Fractal Code'
    },
    {
      id: 'digimon-island-lost',
      title: 'Digimon Frontier: Island of Lost Digimon',
      mediaType: 'anime',
      aliases: ['Digimon Frontier: Ornismon Fukkatsu!!'],
      externalIds: [{ source: 'anilist', id: '3031' }],
      year: 2002,
      releaseDate: '2002-07-20',
      note: 'The Frontier children try to end a feud between Beast and Human Digimon on an ancient island'
    },
    {
      id: 'digimon-x-evolution',
      title: 'Digimon X-Evolution',
      mediaType: 'anime',
      aliases: ['Digital Monster X-Evolution'],
      externalIds: [{ source: 'anilist', id: '2123' }],
      year: 2005,
      releaseDate: '2005-01-03',
      note: 'The host computer Yggdrasil develops the X Program to wipe out the old world\'s Digimon'
    },
    {
      id: 'digimon-savers',
      title: 'Digimon Data Squad',
      mediaType: 'anime',
      aliases: ['Digimon Savers'],
      externalIds: [{ source: 'anilist', id: '859' }],
      year: 2006,
      releaseDate: '2006-04-02',
      note: 'Street fighter Masaru teams up with Agumon and joins DATS, the agency that deals with Digimon'
    },
    {
      id: 'digimon-savers-movie',
      title: 'Digimon Savers THE MOVIE: Kyuukyoku Power! Burst Mode Hatsudou!!',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '2606' }],
      year: 2006,
      releaseDate: '2006-12-09',
      note: 'Argomon puts humanity to sleep, leaving Agumon, Gaomon and Lalamon unable to evolve'
    },
    {
      id: 'digimon-xros-wars',
      title: 'Digimon Xros Wars',
      mediaType: 'anime',
      aliases: ['Digimon Fusion'],
      externalIds: [{ source: 'anilist', id: '8624' }],
      year: 2010,
      releaseDate: '2010-07-06',
      note: 'Taiki and Shoutmon form Team Xros Heart to take down the Bagra Empire'
    },
    {
      id: 'digimon-xros-wars-generals',
      title: 'Digimon Xros Wars: The Evil Death Generals and the Seven Kingdoms',
      mediaType: 'anime',
      aliases: ['Digimon Xros Wars: Aku no Death General to Nanatsu no Oukoku'],
      externalIds: [{ source: 'anilist', id: '10444' }],
      year: 2011,
      releaseDate: '2011-04-03',
      note: 'The Bagra Army has reformatted the Digital World into seven kingdoms, each ruled by a general'
    },
    {
      id: 'digimon-xros-wars-hunters',
      title: 'Digimon Xros Wars: The Young Hunters Who Leapt Through Time',
      mediaType: 'anime',
      aliases: ['Digimon Xros Wars: Toki wo Kakeru Shounen Hunter-tachi'],
      externalIds: [{ source: 'anilist', id: '11385' }],
      year: 2011,
      releaseDate: '2011-10-02',
      note: 'Taiki returns beside new hunter Tagiru, with earlier series\' leads in guest roles'
    },
    {
      id: 'digimon-cyber-sleuth',
      title: 'Digimon Story: Cyber Sleuth',
      aliases: ['Digimon Story Cyber Sleuth: Complete Edition'],
      externalIds: [{ source: 'steam', id: '1042550' }],
      year: 2015,
      releaseDate: '2015-03-12',
      note: 'Turned half-digital in the cyberspace network EDEN, Aiba investigates the comas of EDEN Syndrome'
    },
    {
      id: 'digimon-tri-1',
      title: 'Digimon Adventure tri. Chapter 1: Reunion',
      mediaType: 'anime',
      aliases: ['Digimon Adventure tri. 1: Saikai'],
      externalIds: [{ source: 'anilist', id: '20802' }],
      year: 2015,
      releaseDate: '2015-11-21',
      note: 'Six years after their adventure, a rampaging Kuwagamon in Odaiba reunites the Chosen Children'
    },
    {
      id: 'digimon-tri-2',
      title: 'Digimon Adventure tri. Chapter 2: Determination',
      mediaType: 'anime',
      aliases: ['Digimon Adventure tri. 2: Ketsui'],
      externalIds: [{ source: 'anilist', id: '21500' }],
      year: 2016,
      releaseDate: '2016-03-12',
      note: 'An infected Ogremon attacks while Joe studies for exams and Mimi clashes with the group'
    },
    {
      id: 'digimon-next-order',
      title: 'Digimon World: Next Order',
      aliases: ['Digimon World: Next Order International Edition'],
      externalIds: [{ source: 'steam', id: '1530160' }],
      year: 2016,
      releaseDate: '2016-03-17',
      note: 'High schoolers Takuto and Shiki are pulled into the Digital World and raise two partners at once'
    },
    {
      id: 'digimon-tri-3',
      title: 'Digimon Adventure tri. Chapter 3: Confession',
      mediaType: 'anime',
      aliases: ['Digimon Adventure tri. 3: Kokuhaku'],
      externalIds: [{ source: 'anilist', id: '21596' }],
      year: 2016,
      releaseDate: '2016-09-24',
      note: 'After Meicoomon kills Leomon, the partners are isolated as signs of infection reach Patamon'
    },
    {
      id: 'digimon-appmon',
      title: 'Digimon Universe: App Monsters',
      mediaType: 'anime',
      aliases: ['Digimon Universe: Appli Monsters'],
      externalIds: [{ source: 'anilist', id: '21820' }],
      year: 2016,
      releaseDate: '2016-10-01',
      note: 'AI lifeforms living inside smartphone apps fight Leviathan, an AI that hijacks them with a virus'
    },
    {
      id: 'digimon-tri-4',
      title: 'Digimon Adventure tri. Chapter 4: Loss',
      mediaType: 'anime',
      aliases: ['Digimon Adventure tri. 4: Soushitsu'],
      externalIds: [{ source: 'anilist', id: '97734' }],
      year: 2017,
      releaseDate: '2017-02-25',
      note: 'Back in a rebooted Digital World, the Chosen Children are hunted by a new villain'
    },
    {
      id: 'digimon-tri-5',
      title: 'Digimon Adventure tri. Chapter 5: Coexistence',
      mediaType: 'anime',
      aliases: ['Digimon Adventure tri. 5: Kyousei', 'Digimon Adventure tri. Chapter 5: Coexistance'],
      externalIds: [{ source: 'anilist', id: '98402' }],
      year: 2017,
      releaseDate: '2017-09-30',
      note: 'Meicoomon rampages after Meiko is hurt and vanishes into a distorted real world'
    },
    {
      id: 'digimon-hackers-memory',
      title: 'Digimon Story: Cyber Sleuth – Hacker\'s Memory',
      year: 2017,
      releaseDate: '2017-12-14',
      note: 'Set during Cyber Sleuth: Keisuke joins the hacker group Hudie to find who stole his EDEN account'
    },
    {
      id: 'digimon-tri-6',
      title: 'Digimon Adventure tri. Chapter 6: Our Future',
      mediaType: 'anime',
      aliases: ['Digimon Adventure tri. 6: Bokura no Mirai'],
      externalIds: [{ source: 'anilist', id: '100181' }],
      year: 2018,
      releaseDate: '2018-05-05',
      note: 'The Chosen Children unite to stop the Digital World from swallowing the real world'
    },
    {
      id: 'digimon-kizuna',
      title: 'Digimon Adventure: Last Evolution Kizuna',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '108260' }],
      year: 2020,
      releaseDate: '2020-02-21',
      note: 'University student Taichi learns that growing up will end the Chosen Children\'s bond with their partners'
    },
    {
      id: 'digimon-adventure-2020',
      title: 'Digimon Adventure (2020)',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '114811' }],
      year: 2020,
      releaseDate: '2020-04-05',
      note: 'Reboot set in 2020: network failures around Tokyo lead fifth-grader Taichi to the Digital World'
    },
    {
      id: 'digimon-ghost-game',
      title: 'Digimon Ghost Game',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '137309' }],
      year: 2021,
      releaseDate: '2021-10-03',
      note: 'Middle schooler Hiro Amanokawa investigates the "Hologram Ghosts" haunting social media rumours'
    },
    {
      id: 'digimon-survive',
      title: 'Digimon Survive',
      externalIds: [{ source: 'steam', id: '871980' }],
      year: 2022,
      releaseDate: '2022-07-28',
      note: 'Visual novel with tactics: students on a school camp are lost in the fog-bound world of the Beast Gods'
    },
    {
      id: 'digimon-02-beginning',
      title: 'Digimon Adventure 02: The Beginning',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '137310' }],
      year: 2023,
      releaseDate: '2023-10-27',
      note: 'In 2012 a 20-year-old Daisuke meets Lui Ohwada, who claims to be the world\'s first Chosen Child'
    },
    {
      id: 'digimon-time-stranger',
      title: 'Digimon Story: Time Stranger',
      externalIds: [{ source: 'steam', id: '1984270' }],
      year: 2025,
      releaseDate: '2025-10-03',
      note: 'An ADAMAS agent is thrown eight years back in time after witnessing the Shinjuku Inferno'
    },
    {
      id: 'digimon-beatbreak',
      title: 'Digimon Beatbreak',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '188388' }],
      year: 2025,
      releaseDate: '2025-10-05',
      note: 'Digimon emerge from AI devices that run on human emotion, and Tomoro joins the secret team Glowing Dawn'
    }
  ],
  characters: [
    {
      id: 'digimon-taichi',
      name: 'Taichi Yagami',
      role: 'Chosen Child of Courage (Adventure)',
      portraitUrl:
        'https://s4.anilist.co/file/anilistcdn/character/large/b1907-ZWmX1dVGPfqn.png',
      appearsIn: [
        'digimon-adventure-film',
        'digimon-adventure',
        'digimon-war-game',
        'digimon-adventure-02',
        'digimon-hurricane-touchdown',
        'digimon-revenge-diaboromon',
        'digimon-xros-wars-hunters',
        'digimon-tri-1',
        'digimon-tri-2',
        'digimon-tri-3',
        'digimon-tri-4',
        'digimon-tri-5',
        'digimon-tri-6',
        'digimon-kizuna',
        'digimon-adventure-2020'
      ],
      blurb:
        'The impulsive, caring leader of the Adventure children, partnered with Agumon and bearer of the Crest of Courage; Hikari\'s older brother.'
    },
    {
      id: 'digimon-agumon',
      name: 'Agumon',
      role: 'Partner Digimon',
      portraitUrl:
        'https://s4.anilist.co/file/anilistcdn/character/large/b4950-7ABdx6j3jmdE.png',
      appearsIn: [
        'digimon-adventure-film',
        'digimon-adventure',
        'digimon-war-game',
        'digimon-adventure-02',
        'digimon-hurricane-touchdown',
        'digimon-revenge-diaboromon',
        'digimon-savers',
        'digimon-savers-movie',
        'digimon-tri-1',
        'digimon-tri-2',
        'digimon-tri-3',
        'digimon-tri-4',
        'digimon-tri-5',
        'digimon-tri-6',
        'digimon-kizuna',
        'digimon-adventure-2020',
        'digimon-next-order'
      ],
      blurb:
        'A small dinosaur-like Digimon, Taichi\'s brave partner who evolves into Greymon and WarGreymon, and in a taller redesign Masaru\'s partner in Savers.'
    },
    {
      id: 'digimon-daisuke',
      name: 'Daisuke Motomiya',
      role: 'Leader of the 02 Chosen Children',
      portraitUrl:
        'https://s4.anilist.co/file/anilistcdn/character/large/b1960-oYyird0GsbgC.png',
      appearsIn: [
        'digimon-adventure-02',
        'digimon-hurricane-touchdown',
        'digimon-revenge-diaboromon',
        'digimon-xros-wars-hunters',
        'digimon-kizuna',
        'digimon-02-beginning'
      ],
      blurb:
        'Takes over as team leader from Taichi, along with his goggles; he rushes in and makes mistakes, but never stops believing the group will make it through.'
    },
    {
      id: 'digimon-takato',
      name: 'Takato Matsuda',
      role: 'Tamer (Tamers)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/4168.jpg',
      appearsIn: [
        'digimon-tamers',
        'digimon-battle-adventurers',
        'digimon-runaway-locomon',
        'digimon-xros-wars-hunters'
      ],
      blurb:
        'A kind-hearted baker\'s son who loves drawing Digimon and playing the card game, and the only child who created his own partner.'
    },
    {
      id: 'digimon-guilmon',
      name: 'Guilmon',
      role: 'Takato\'s partner (Tamers)',
      portraitUrl:
        'https://s4.anilist.co/file/anilistcdn/character/large/b8762-uLokfCGNHXc7.png',
      appearsIn: ['digimon-tamers', 'digimon-battle-adventurers', 'digimon-runaway-locomon'],
      blurb:
        'Born from Takato\'s imagination and brought to life by the Blue Card; playful and naive at first, he calls his Tamer "Takatomon".'
    },
    {
      id: 'digimon-takuya',
      name: 'Takuya Kanbara',
      role: 'Warrior of Flame (Frontier)',
      portraitUrl:
        'https://s4.anilist.co/file/anilistcdn/character/large/b1888-i5bjRjKH4D5W.png',
      appearsIn: ['digimon-frontier', 'digimon-island-lost', 'digimon-xros-wars-hunters'],
      blurb:
        'A fifth-grader who follows a mysterious text message onto a train to the Digital World and leads the group as holder of the Spirits of Flame.'
    },
    {
      id: 'digimon-masaru',
      name: 'Masaru Daimon',
      role: 'DATS agent (Data Squad)',
      portraitUrl:
        'https://s4.anilist.co/file/anilistcdn/character/large/b3563-YpOF9wObxPth.png',
      appearsIn: ['digimon-savers', 'digimon-savers-movie', 'digimon-xros-wars-hunters'],
      blurb:
        'An undefeated junior-high street fighter whose brawl with Agumon ends in a draw and a partnership; the first lead to fight Digimon with his own fists.'
    },
    {
      id: 'digimon-taiki',
      name: 'Taiki Kudou',
      role: 'General of Xros Heart (Xros Wars)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/33096.jpg',
      appearsIn: [
        'digimon-xros-wars',
        'digimon-xros-wars-generals',
        'digimon-xros-wars-hunters'
      ],
      blurb:
        'An upbeat boy who can never leave someone in need, who leads the Digimon army Xros Heart against the Bagra Empire.'
    }
  ]
}
