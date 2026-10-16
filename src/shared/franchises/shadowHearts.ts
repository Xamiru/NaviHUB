// Shadow Hearts — curated canon: Sacnoth's Koudelka and the three Shadow
// Hearts games that grew out of it, one occult early-twentieth-century world.
// Koudelka is the prequel (1898, Wales); Shadow Hearts (1913), Covenant (1915)
// and From the New World (1929) follow it. No story order: the story runs in
// release order, so it would only repeat the Year column (the Mother rule).
// Shadow Hearts II: Director's Cut (2005, Japan only) is an alias of Covenant.
// No game was ever sold on Steam; the RAWG ids come from the local games
// catalog's cross-references (lb_xref, method 'exact'), and catalog-imported
// rows match by title. Dates are first Japanese releases; Metacritic values are
// the catalog's.
// Art (curl-verified 2026-10-17): AniList, Fandom and IGDB were unreachable, so
// the hero and most portraits are the LaunchBox box scans the games catalog
// links to, each checked for subject: Koudelka's own face on her Japanese
// cover, Yuri on the Japanese Covenant cover, Karin on the North American
// Covenant cover (also the hero, 1510 px wide), Johnny on the From the New
// World cover. Alice is Bangumi's character art.

import type { FranchiseCfg } from './types'

const LB = 'https://images.launchbox-app.com'

export const SHADOW_HEARTS: FranchiseCfg = {
  id: 'shadow-hearts',
  name: 'Shadow Hearts',
  short: 'Shadow Hearts',
  color: '#a3283a',
  heroUrl: `${LB}/ac7ac505-3420-4843-a0dd-5251c87d46f8.jpg`,
  studio: 'Sacnoth / Nautilus (Aruze)',
  tagline: 'Fusions, the Judgement Ring and an occult world on the edge of the Great War.',
  trivia: [
    {
      title: 'From a haunted monastery',
      body: 'Sacnoth was founded in 1997 by former Square staff around composer Hiroki Kikuta, and its first game, Koudelka (1999), was a gothic horror RPG set in a Welsh monastery in 1898. Kikuta left after it, and the studio turned its world into something larger: Shadow Hearts (2001) moves the story fifteen years on and across Asia and Europe, and keeps Koudelka’s family, the immortal Roger Bacon and the occult history she uncovered.\n\nThe series’ Western publishers changed with it: Infogrames brought Koudelka over, Midway the first two Shadow Hearts games, and XSEED the last.'
    },
    {
      title: 'The Judgement Ring',
      body: 'Every Shadow Hearts battle runs through the Judgement Ring, a spinning wheel with coloured hit zones: an attack, a spell or an item lands only if the player stops the needle in time. Each character’s Sanity points also tick down every turn in battle, and anyone who runs out loses control.\n\nYuri fights by fusing with the monsters whose souls he has absorbed, which is what “Harmonixer” means in the series; each fusion is earned in his own graveyard of souls.'
    },
    {
      title: 'The bad ending is canon',
      body: 'Shadow Hearts has two endings, and Covenant follows the bad one: the story picks up in 1915 with Yuri mourning Alice, fighting in a Europe at war. From the New World (2005) then crosses to 1929 America with a new cast and a lighter tone, sharing the world, the Judgement Ring and a few old faces.\n\nIt was the last game in the series; no sequel followed.'
    }
  ],
  entries: [
    {
      id: 'shh-koudelka',
      title: 'Koudelka',
      aliases: ['クーデルカ'],
      externalIds: [{ source: 'rawg', id: '53085' }],
      year: 1999,
      releaseDate: '1999-12-16',
      note: 'The prequel: 1898, a Welsh monastery full of the dead'
    },
    {
      id: 'shh-1',
      title: 'Shadow Hearts',
      aliases: ['シャドウハーツ'],
      externalIds: [{ source: 'rawg', id: '292851' }],
      year: 2001,
      releaseDate: '2001-06-28',
      mc: 73,
      note: '1913: Yuri, a Harmonixer, and the girl he pulls off a train in Manchuria'
    },
    {
      id: 'shh-covenant',
      title: 'Shadow Hearts: Covenant',
      aliases: ['Shadow Hearts II', 'シャドウハーツII', 'Shadow Hearts II: Director\'s Cut'],
      externalIds: [{ source: 'rawg', id: '249949' }],
      year: 2004,
      releaseDate: '2004-02-19',
      mc: 85,
      note: '1915: the Great War, a German lieutenant, and the bad ending made canon'
    },
    {
      id: 'shh-new-world',
      title: 'Shadow Hearts: From the New World',
      aliases: ['シャドウハーツ・フロム・ザ・ニューワールド'],
      externalIds: [{ source: 'rawg', id: '359141' }],
      year: 2005,
      releaseDate: '2005-07-21',
      mc: 76,
      note: '1929 America: a teenage detective, a new cast, the same world'
    }
  ],
  characters: [
    {
      id: 'shh-char-koudelka',
      name: 'Koudelka Iasant',
      role: 'Protagonist (Koudelka)',
      portraitUrl: `${LB}/711683f1-536e-44ee-b331-c81e8be47511.jpg`,
      appearsIn: ['shh-koudelka'],
      blurb: 'A Romani medium drawn to Nemeton Monastery by the voice of a dead girl, who spends one long night there with two strangers and every ghost the place has made. Her son Halley joins Yuri in the next game.'
    },
    {
      id: 'shh-char-yuri',
      name: 'Yuri Hyuga',
      role: 'Harmonixer (Shadow Hearts, Covenant)',
      portraitUrl: `${LB}/r2_d8710bf4-c50f-4e03-94e5-9d2a1ff11675.jpg`,
      appearsIn: ['shh-1', 'shh-covenant'],
      blurb: 'A brash wanderer who can fuse with the monsters he kills, led by a voice in his head to a girl the whole occult world is hunting. By Covenant he is grieving, cursed and still joking.'
    },
    {
      id: 'shh-char-alice',
      name: 'Alice Elliot',
      role: 'Exorcist (Shadow Hearts)',
      portraitUrl: 'https://lain.bgm.tv/pic/crt/l/68/02/113610_crt_BliGx.jpg?r=1658126979',
      appearsIn: ['shh-1'],
      blurb: 'A London clergyman’s daughter with an exorcist’s gift, kidnapped for it and rescued by Yuri. She keeps him human as much as he keeps her alive.'
    },
    {
      id: 'shh-char-karin',
      name: 'Karin Koenig',
      role: 'German lieutenant (Covenant)',
      portraitUrl: `${LB}/ac7ac505-3420-4843-a0dd-5251c87d46f8.jpg`,
      appearsIn: ['shh-covenant'],
      blurb: 'A young German Army officer sent to take a French village and left by its demon defender with a war she no longer believes in. She deserts to follow him, and Covenant is half her story.'
    },
    {
      id: 'shh-char-johnny',
      name: 'Johnny Garland',
      role: 'Detective (From the New World)',
      portraitUrl: `${LB}/ad58a6e5-56d9-47d5-a961-dffaaa7f53d5.jpg`,
      appearsIn: ['shh-new-world'],
      blurb: 'A sixteen-year-old private detective in 1929 New York whose first big case pulls him into a chase across the Americas beside Shania, a Native American woman who fuses with spirits.'
    }
  ]
}
