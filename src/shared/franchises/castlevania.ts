// Castlevania — the classic-era core titles the task scope calls out:
// Castlevania through Order of Ecclesia (Circle of the Moon and Harmony of
// Dissonance are deliberately skipped, matching the brief), the Lords of
// Shadow reboot duology as its own spin-off continuity, and the two Netflix
// series. Steam ids are attached to whichever single entry in each
// multi-game compilation is the best-known namesake, since one Steam appid
// can only usefully back one row: Castlevania Anniversary Collection (also
// bundles II, III and Super IV) sits on the first game; Castlevania Advance
// Collection (also bundles Circle of the Moon, Harmony of Dissonance and the
// SNES Dracula X, none of them in scope here) sits on Aria of Sorrow;
// Castlevania Dominus Collection (also bundles Portrait of Ruin and Order of
// Ecclesia) sits on Dawn of Sorrow. Rondo of Blood and Symphony of the Night
// have never been sold on Steam under any bundle and carry no externalId.
// Chrono follows Konami's own published in-universe years rather than
// release order: Dracula's Curse (1476), the original Castlevania and Super
// Castlevania IV as the same retold story (1691), Simon's Quest (1698),
// Rondo of Blood (1792), Symphony of the Night (1797, five years later),
// Order of Ecclesia (1821), Portrait of Ruin (1944), Aria of Sorrow (2035)
// and Dawn of Sorrow (2036). Lords of Shadow/2 are an explicit reboot
// continuity and the two Netflix series are their own separate adaptations
// — all four carry no chrono, per the task brief.
// Dates verified against Wikipedia infoboxes, 2026-10-05; Steam ids via the
// Steam store API and TMDB ids via TMDB the same day. Hero art is the
// Castlevania Dominus Collection's Steam library hero (Simon Belmont's own
// solo games have no Steam listing of their own); character portraits are
// Wikipedia/Wikimedia. Castlevania has very little individual fair-use
// character art on Wikipedia outside Simon Belmont, Alucard and Dracula —
// Soma Cruz and Shanoa use their games' own box art, the only reliable,
// non-Fandom source found for them (castlevania.fandom.com and its
// static.wikia.nocookie.net images both returned 403 without a Referer
// header during verification, so Fandom is not used anywhere in this file).

import type { FranchiseCfg } from './types'

export const CASTLEVANIA: FranchiseCfg = {
  id: 'castlevania',
  name: 'Castlevania',
  short: 'Castlevania',
  color: '#5a1e8a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2369900/library_hero.jpg',
  studio: 'Konami',
  tagline: 'Whip in hand, Belmont after Belmont marches on Dracula\'s castle.',
  trivia: [
    {
      title: 'A castle that only opens once a century',
      body: 'Castlevania (1986) set the template that held for a decade: a side-scrolling whip-and-subweapon assault on Castle Dracula, timed to the vampire\'s habit of returning every hundred years. Simon\'s Quest (1987) broke from it almost immediately with an open, RPG-flavored overworld — a swing fans were still arguing about when Symphony of the Night tried it again a decade later.'
    },
    {
      title: 'The game that invented "Metroidvania"',
      body: 'Castlevania: Symphony of the Night (1997) dropped the stage-select structure for one continuous, backtrack-rewarding castle (and its inverted mirror image), borrowing Metroid\'s structure so directly that the genre eventually took both names. It underperformed on release and became a cult classic only after import and used-game word of mouth, then defined the series\' handheld era that followed on Game Boy Advance and DS.'
    },
    {
      title: 'One family name, two separate universes',
      body: 'Every classic-era hero carries Belmont blood — Simon, Trevor, Richter, Julius — but Konami has twice sent the name elsewhere: the 2010 Lords of Shadow reboot gave the whip to an entirely new Gabriel Belmont in a different continuity, and Netflix\'s animated adaptations (2017, 2023) are their own separate readings of the mythology rather than screen versions of any specific game\'s plot.'
    }
  ],
  entries: [
    {
      id: 'cv-1',
      title: 'Castlevania',
      aliases: ['Castlevania Anniversary Collection', 'Akumajo Dracula'],
      externalIds: [{ source: 'steam', id: '1018010' }],
      year: 1986,
      releaseDate: '1986-09-26',
      chrono: 2,
      note: 'Simon Belmont storms Dracula\'s castle (the Anniversary Collection also bundles II, III and Super IV)'
    },
    {
      id: 'cv-2',
      title: 'Castlevania II: Simon\'s Quest',
      year: 1987,
      releaseDate: '1987-08-28',
      chrono: 3,
      note: 'An open, town-and-overworld sequel: Simon seeks Dracula\'s remains to lift his own curse'
    },
    {
      id: 'cv-3',
      title: 'Castlevania III: Dracula\'s Curse',
      year: 1989,
      releaseDate: '1989-12-22',
      chrono: 1,
      note: 'Prequel: Trevor Belmont\'s original hunt, with three recruitable allies along the way'
    },
    {
      id: 'cv-4',
      title: 'Super Castlevania IV',
      year: 1991,
      releaseDate: '1991-10-31',
      chrono: 2,
      note: 'SNES reimagining of the original game\'s story with a newly fluid, multi-directional whip'
    },
    {
      id: 'cv-rondo',
      title: 'Castlevania: Rondo of Blood',
      aliases: ['Akumajo Dracula X: Chi no Rondo'],
      year: 1993,
      releaseDate: '1993-10-29',
      chrono: 4,
      note: 'Richter Belmont rescues Maria Renard and others from Dracula\'s resurrection, PC Engine CD'
    },
    {
      id: 'cv-sotn',
      title: 'Castlevania: Symphony of the Night',
      year: 1997,
      releaseDate: '1997-03-20',
      chrono: 5,
      note: 'Alucard explores his father\'s castle to learn why Richter vanished — the genre-defining entry'
    },
    {
      id: 'cv-aria',
      title: 'Castlevania: Aria of Sorrow',
      aliases: ['Castlevania Advance Collection'],
      externalIds: [{ source: 'steam', id: '1552550' }],
      year: 2003,
      releaseDate: '2003-05-06',
      chrono: 8,
      note: 'Soma Cruz, able to absorb enemy souls, is pulled into Dracula\'s castle, sealed inside a 2035 solar eclipse (the Advance Collection also bundles Circle of the Moon, Harmony of Dissonance and Dracula X)'
    },
    {
      id: 'cv-dawn',
      title: 'Castlevania: Dawn of Sorrow',
      aliases: ['Castlevania Dominus Collection'],
      externalIds: [{ source: 'steam', id: '2369900' }],
      year: 2005,
      releaseDate: '2005-08-25',
      chrono: 9,
      note: 'A cult tries to resurrect Dracula through Soma a year later (the Dominus Collection also bundles Portrait of Ruin and Order of Ecclesia)'
    },
    {
      id: 'cv-portrait',
      title: 'Castlevania: Portrait of Ruin',
      year: 2006,
      releaseDate: '2006-11-16',
      chrono: 7,
      note: 'Jonathan Morris and Charlotte Aulin explore paintings inside Dracula\'s World War II-era castle'
    },
    {
      id: 'cv-ecclesia',
      title: 'Castlevania: Order of Ecclesia',
      year: 2008,
      releaseDate: '2008-10-21',
      chrono: 6,
      note: 'Shanoa of the Order of Ecclesia hunts the stolen Dominus glyph and learns why her order wants Dracula back'
    },
    {
      id: 'cv-los',
      title: 'Castlevania: Lords of Shadow',
      aliases: ['Castlevania: Lords of Shadow – Ultimate Edition'],
      externalIds: [{ source: 'steam', id: '234080' }],
      year: 2010,
      releaseDate: '2010-10-05',
      spinOff: true,
      note: 'Reboot continuity: Gabriel Belmont hunts the Lords of Shadow to bring his wife back from death'
    },
    {
      id: 'cv-los2',
      title: 'Castlevania: Lords of Shadow 2',
      externalIds: [{ source: 'steam', id: '239250' }],
      year: 2014,
      releaseDate: '2014-02-25',
      spinOff: true,
      note: 'Gabriel, now Dracula, wakes in a modern city to stop Satan\'s return'
    },
    {
      id: 'cv-netflix',
      title: 'Castlevania',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '71024' }],
      year: 2017,
      releaseDate: '2017-07-07',
      adaptation: true,
      note: 'Netflix animated series loosely built from Dracula\'s Curse: Trevor, Sypha and Alucard against Dracula\'s war on Wallachia'
    },
    {
      id: 'cv-nocturne',
      title: 'Castlevania: Nocturne',
      mediaType: 'tv',
      externalIds: [{ source: 'tmdb', id: '123548' }],
      year: 2023,
      releaseDate: '2023-09-28',
      adaptation: true,
      note: 'Spiritual sequel series set in the French Revolution, following a new Belmont descendant'
    }
  ],
  characters: [
    {
      id: 'cv-simon',
      name: 'Simon Belmont',
      role: 'Vampire hunter of the Belmont clan',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7d/CVGoS_Simon_Belmont.png',
      appearsIn: ['cv-1', 'cv-2', 'cv-4'],
      blurb: 'The original whip-wielding hero who stormed Dracula\'s castle, then had to do it again after a curse from the first fight nearly killed him.'
    },
    {
      id: 'cv-alucard',
      name: 'Alucard',
      role: 'Dracula\'s dhampir son',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Alucard-sotn.png',
      appearsIn: ['cv-sotn', 'cv-netflix'],
      blurb: 'Half-human, half-vampire, and perpetually caught between the two sides of his bloodline. Symphony of the Night\'s playable lead and the series\' most enduring non-Belmont protagonist.'
    },
    {
      id: 'cv-dracula',
      name: 'Dracula',
      role: 'Lord of the castle',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Dracula-sotn.png',
      appearsIn: ['cv-1', 'cv-2', 'cv-3', 'cv-4', 'cv-rondo', 'cv-sotn', 'cv-portrait', 'cv-ecclesia', 'cv-netflix'],
      blurb: 'Vlad Tepes, resurrected again and again by grief, cultists or his own castle, and cut down by a different Belmont (or their allies) nearly every time.'
    },
    {
      id: 'cv-soma',
      name: 'Soma Cruz',
      role: 'Human vessel for Dracula\'s reincarnation',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ab/AriaofSorrowCover.jpg',
      appearsIn: ['cv-aria', 'cv-dawn'],
      blurb: 'A Japanese exchange student who discovers he can absorb the souls of defeated enemies — and that he may be Dracula\'s reincarnation, not a Belmont at all.'
    },
    {
      id: 'cv-shanoa',
      name: 'Shanoa',
      role: 'Order of Ecclesia agent',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/1/18/Castlevania_ooe_front_cover.jpg',
      appearsIn: ['cv-ecclesia'],
      blurb: 'Stripped of her memories and most of her emotions after a ritual goes wrong, Shanoa carries the Dominus glyphs meant to destroy Dracula for good.'
    }
  ]
}
