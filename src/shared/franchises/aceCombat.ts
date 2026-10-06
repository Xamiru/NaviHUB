// Ace Combat — the full numbered line from the 1995 original through Ace
// Combat 7, plus Joint Assault, Assault Horizon and Infinity, each of which
// Namco/Bandai Namco has explicitly stated is set in the real world rather
// than the series' main fictional setting (and in three DIFFERENT real-world
// continuities from one another) — all three are spinOff rows with no
// chrono. Ace Combat X: Skies of Deception and Ace Combat: Assault Horizon
// Legacy (the 3DS remake of Ace Combat 2) are not in the task's scope and
// are excluded. Ace Combat 8: Wings of the Empire exists on Steam dated
// October 1, 2026 (verified via the Steam store API and corroborated by Ace
// Combat Zero's own infobox, which lists a bundled PS5/Windows/Xbox
// Series re-release alongside it on October 2, 2026) — inside this page's
// cutoff by a few days, but it is not named anywhere in this franchise's
// task brief (which stops explicitly at 7), so it is deliberately left out
// rather than silently expanding scope; flagging this rather than guessing
// the author's intent.
// Steam ids exist only for Ace Combat 7 — none of the earlier games,
// Assault Horizon, Joint Assault or Infinity were ever sold on Steam.
// Chrono follows the series' official "Strangereal" in-universe years for
// the five games this is well documented for: Ace Combat Zero: The Belkan
// War is an explicit 1995 prequel to Shattered Skies (2004 in-universe) and
// The Unsung War (2010), which precede Fires of Liberation (2015) and Skies
// Unknown (2019-2020) — released out of story order, re-ordered here. Air
// Combat's year is never stated, so it opens the order; Ace Combat 2 is set
// in 1998, after Zero; Electrosphere's 2040 setting puts it last.
// Dates verified against Wikipedia infoboxes, 2026-10-05; the Ace Combat 7
// Steam id via the Steam store API the same day. Hero art is the Ace Combat
// 7 Steam library hero (the only entry on Steam); because Ace Combat's
// player-pilots are near-anonymous callsigns rarely shown on screen, "main
// characters" here use each of their games' own box art — the only reliable
// way to represent them — rather than invented or Fandom-sourced portraits.

import type { FranchiseCfg } from './types'

export const ACE_COMBAT: FranchiseCfg = {
  id: 'ace-combat',
  name: 'Ace Combat',
  short: 'Ace Combat',
  color: '#2b4a7a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/502500/library_hero.jpg',
  studio: 'Bandai Namco (Project Aces)',
  tagline: 'Call sign, cockpit, and a war that always needs one more ace.',
  trivia: [
    {
      title: 'Arcade dogfighting, not a flight sim',
      body: 'Air Combat (1995) and its sequels deliberately favor arcade-style handling over true flight simulation — planes turn tighter and recover from stalls more forgivingly than reality allows, in service of keeping dogfights fast and readable. That design choice is why the series has stayed approachable across thirty years while actual sim franchises stayed niche.'
    },
    {
      title: 'Strangereal, an Earth that almost matches ours',
      body: 'Most entries take place in "Strangereal," a fictional Earth with different nations and history but the same real aircraft, running on a timeline reshaped by a 1999 asteroid impact event. Ace Combat 04 (2001) is usually credited as the game that actually built this setting out, after the looser backdrops of the earlier games.'
    },
    {
      title: 'A prequel that explains everything, backwards',
      body: 'Ace Combat Zero: The Belkan War (2006) came out two years after The Unsung War but tells the earlier story its characters keep referencing — the 1995 Belkan War that defined mercenary pilot "Cipher" and shaped how Osea, Yuktobania and Erusea all think about air power by the time 04, 5, 6 and 7 happen.'
    }
  ],
  entries: [
    {
      id: 'acm-air-combat',
      title: 'Air Combat',
      aliases: ['Ace Combat'],
      year: 1995,
      releaseDate: '1995-06-30',
      chrono: 1,
      note: 'Series debut: a mercenary squadron retakes the Skully Islands from a terrorist force'
    },
    {
      id: 'acm-2',
      title: 'Ace Combat 2',
      year: 1997,
      releaseDate: '1997-05-30',
      chrono: 3,
      note: 'Scarface Squadron defends the continent of Usea from a coup d\'etat'
    },
    {
      id: 'acm-3',
      title: 'Ace Combat 3: Electrosphere',
      year: 1999,
      releaseDate: '1999-05-27',
      chrono: 8,
      note: 'Science-fiction detour: megacorporations Neucom and General Resource fight for control of Electrosphere'
    },
    {
      id: 'acm-04',
      title: 'Ace Combat 04: Shattered Skies',
      aliases: ['Ace Combat: Distant Thunder'],
      year: 2001,
      releaseDate: '2001-09-13',
      chrono: 4,
      note: 'Mobius 1 becomes a legend stopping Erusea\'s continent-wide war against Usea'
    },
    {
      id: 'acm-5',
      title: 'Ace Combat 5: The Unsung War',
      aliases: ['Ace Combat: Squadron Leader'],
      year: 2004,
      releaseDate: '2004-10-21',
      chrono: 5,
      note: 'Wardog Squadron uncovers the conspiracy behind the Osean-Yuktobanian War'
    },
    {
      id: 'acm-zero',
      title: 'Ace Combat Zero: The Belkan War',
      year: 2006,
      releaseDate: '2006-03-23',
      chrono: 2,
      note: 'Prequel: mercenaries Cipher and Pixy defend Ustio during Belka\'s 1995 invasion'
    },
    {
      id: 'acm-6',
      title: 'Ace Combat 6: Fires of Liberation',
      year: 2007,
      releaseDate: '2007-10-23',
      chrono: 6,
      note: 'Garuda Team leads Emmeria\'s counter-invasion against occupying Estovakian forces'
    },
    {
      id: 'acm-joint-assault',
      title: 'Ace Combat: Joint Assault',
      year: 2010,
      releaseDate: '2010-08-26',
      spinOff: true,
      note: 'Set in the real world (its own continuity): Martinez Security battles a global terrorist force'
    },
    {
      id: 'acm-assault-horizon',
      title: 'Ace Combat: Assault Horizon',
      year: 2011,
      releaseDate: '2011-10-11',
      spinOff: true,
      note: 'A separate real-world continuity from Joint Assault: a joint US-Russian task force versus global insurgencies'
    },
    {
      id: 'acm-infinity',
      title: 'Ace Combat Infinity',
      year: 2014,
      releaseDate: '2014-05-20',
      spinOff: true,
      note: 'Free-to-play, in a third distinct real-world continuity, built around a real-world version of the Ulysses asteroid event'
    },
    {
      id: 'acm-7',
      title: 'Ace Combat 7: Skies Unknown',
      externalIds: [{ source: 'steam', id: '502500' }],
      year: 2019,
      releaseDate: '2019-01-18',
      chrono: 7,
      note: 'Trigger clears his name flying for Osea against Erusea\'s drone-heavy war effort'
    }
  ],
  characters: [
    {
      id: 'acm-mobius1',
      name: 'Mobius 1',
      role: 'Legendary ace, Usean Continental War',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/5/51/Ac04box.jpg',
      appearsIn: ['acm-04'],
      blurb: 'An unnamed, nearly unbeatable fighter pilot whose solo exploits over Usea turn him into the kind of legend other pilots are measured against for the rest of the series.'
    },
    {
      id: 'acm-cipher',
      name: 'Cipher',
      role: 'Galm Team mercenary, Belkan War',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/d/df/USAbox-acz.jpg',
      appearsIn: ['acm-zero'],
      blurb: 'A mercenary pilot hired to defend Ustio from Belka in 1995, whose wartime choices and rivalry with wingman Pixy are referenced throughout the later, "modern" Strangereal games.'
    },
    {
      id: 'acm-blaze',
      name: 'Blaze',
      role: 'Wardog/Razgriz Squadron pilot',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Ace_Combat_5_The_Unsung_War_Game_Cover.png',
      appearsIn: ['acm-5'],
      blurb: 'A member of Wardog Squadron who uncovers the conspiracy fueling the Osean-Yuktobanian War, flying under the ominous call sign "Razgriz."'
    },
    {
      id: 'acm-shamrock',
      name: 'Shamrock',
      role: 'Garuda Team pilot',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/1/16/Ace_Combat_6_Fires_of_Liberation_Game_Cover.jpg',
      appearsIn: ['acm-6'],
      blurb: 'Part of Garuda Team, flying to liberate Emmeria\'s capital from Estovakian occupation.'
    },
    {
      id: 'acm-trigger',
      name: 'Trigger',
      role: 'Osean pilot, falsely accused',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/2/22/Ace_Combat_7_Skies_Unknown_game_cover.jpg',
      appearsIn: ['acm-7'],
      blurb: 'Framed for the death of former Osean president Harling, Trigger is sent to a penal squadron before his skill in the air clears a path back to the front lines.'
    }
  ]
}
