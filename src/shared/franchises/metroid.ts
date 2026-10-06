// Metroid — the mainline Samus Aran series: the original trilogy, the Prime
// sub-series (now a tetralogy), and the 2D continuation from Fusion through
// Dread. Metroid Prime Hunters, Metroid Prime Pinball and Metroid Prime:
// Federation Force are excluded (handheld/multiplayer spin-offs with no
// story weight). Remakes (Zero Mission over the original Metroid, Samus
// Returns over Metroid II) are separate rows that share their original's
// chrono slot, the Resident Evil rule; Metroid Prime Remastered has no
// gameplay or story changes, so it is folded into Metroid Prime as an alias
// instead.
// Chrono follows Nintendo's official timeline: the original Metroid/Zero
// Mission, then the Prime sub-series (Prime 4 placed after Corruption), then
// Metroid II/Samus Returns, Super Metroid, Other M, Fusion and finally Dread. Other M is a direct interquel between Super
// Metroid and Fusion, not a numbered entry, which is why it sits out of
// release order in the Story view.
// None of this franchise is on Steam or in any importer the app has
// (Nintendo-exclusive, no anime adaptation exists), so no entry carries an
// externalId. Several entries released in North America before Japan —
// Metroid II, Metroid Prime, Metroid Fusion and Other M all shipped in NA
// first, in two cases (Metroid II, Fusion) in a different calendar year from
// the Japanese release — so this page uses the first worldwide release date
// for every entry rather than forcing a Japan-first date that would misstate
// the year. Metroid Prime and Metroid Fusion share their exact release date
// (November 18, 2002, a deliberate simultaneous GameCube/GBA launch).
// Dates verified against Wikipedia infoboxes, 2026-10-05. Hero art is the
// official Nintendo asset CDN; character portraits are Metroid Wiki
// (metroidwiki.org, served from cdn.wikimg.net — an independent wiki, not
// Fandom, so no Referer gate). Every URL curl-verified the same day.

import type { FranchiseCfg } from './types'

const MKW = 'https://cdn.wikimg.net/en/metroidwiki/images'

export const METROID: FranchiseCfg = {
  id: 'metroid',
  name: 'Metroid',
  short: 'Metroid',
  color: '#e8792a',
  heroUrl:
    'https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/store/software/switch/70010000042924/4f2c683f0196210ec212a2ab8bf6952223c0b88e827b820953407a2ba61c9cb2',
  studio: 'Nintendo EPD / Retro Studios / MercurySteam',
  tagline: 'One bounty hunter, one hostile planet, total isolation.',
  trivia: [
    {
      title: 'The genre it named',
      body: 'Metroid (1986) combined Castlevania-style action with a Zelda-style interconnected map players had to backtrack through as new abilities opened new paths — fuse that structure with Castlevania\'s name and you get "Metroidvania," a genre label the series never asked for but has defined ever since. The reveal that armored bounty hunter Samus Aran is a woman under the Power Suit, visible only if the game was finished fast enough, was nearly unheard of for 1986.'
    },
    {
      title: 'Going first-person without becoming a shooter',
      body: 'Retro Studios\' Metroid Prime (2002) moved the series to first-person for the GameCube and insisted, against considerable internal and press skepticism, that it stay an exploration game rather than become a corridor shooter — the scan visor rewards reading the environment over simply reacting to it. It remains one of the most studied transitions from 2D to 3D that a long-running franchise has made.'
    },
    {
      title: 'A timeline told out of release order',
      body: 'Nintendo has published an official chronology that bears little resemblance to release order: the whole Prime sub-series sits between the original Metroid and Metroid II, and Metroid: Other M (2010) is wedged between Super Metroid (1994) and Metroid Fusion (2002) as an interquel released sixteen years later. Metroid Dread, released in 2021, closes a story arc that the series had been building toward since Fusion.'
    }
  ],
  entries: [
    {
      id: 'metroid-1',
      title: 'Metroid',
      year: 1986,
      releaseDate: '1986-08-06',
      chrono: 1,
      note: 'Planet Zebes, the Chozo ruins, and the reveal that Samus is a woman'
    },
    {
      id: 'metroid-2',
      title: 'Metroid II: Return of Samus',
      year: 1991,
      chrono: 6,
      note: 'Samus is sent to SR388 to exterminate every Metroid at the source'
    },
    {
      id: 'metroid-super',
      title: 'Super Metroid',
      year: 1994,
      releaseDate: '1994-03-19',
      chrono: 7,
      note: 'Zebes again, and the baby Metroid hatchling that imprints on Samus'
    },
    {
      id: 'metroid-prime',
      title: 'Metroid Prime',
      aliases: ['Metroid Prime Remastered'],
      year: 2002,
      releaseDate: '2002-11-18',
      chrono: 2,
      note: 'First-person debut: Tallon IV, the Chozo ruins, and Meta Ridley'
    },
    {
      id: 'metroid-fusion',
      title: 'Metroid Fusion',
      year: 2002,
      releaseDate: '2002-11-18',
      chrono: 9,
      note: 'Infected with the X parasite, Samus is shadowed by her own cloned double, SA-X'
    },
    {
      id: 'metroid-zero-mission',
      title: 'Metroid: Zero Mission',
      year: 2004,
      releaseDate: '2004-02-09',
      chrono: 1,
      remake: true,
      note: 'Full remake of the original Metroid, with a stealth section added after the "ending"'
    },
    {
      id: 'metroid-prime-2',
      title: 'Metroid Prime 2: Echoes',
      year: 2004,
      releaseDate: '2004-11-15',
      chrono: 3,
      note: 'A planet split into Light and Dark Aether, and Samus\'s first doppelganger, Dark Samus'
    },
    {
      id: 'metroid-prime-3',
      title: 'Metroid Prime 3: Corruption',
      year: 2007,
      releaseDate: '2007-08-27',
      chrono: 4,
      note: 'Samus is deputized alongside three other Hunters against a Phazon-corrupted Space Pirate armada'
    },
    {
      id: 'metroid-other-m',
      title: 'Metroid: Other M',
      year: 2010,
      releaseDate: '2010-08-31',
      chrono: 8,
      note: 'Set just after Super Metroid: Samus reports to her old commanding officer, Adam Malkovich'
    },
    {
      id: 'metroid-samus-returns',
      title: 'Metroid: Samus Returns',
      year: 2017,
      releaseDate: '2017-09-15',
      chrono: 6,
      remake: true,
      note: 'Full remake of Metroid II, adding the melee counter and the Aeion abilities'
    },
    {
      id: 'metroid-dread',
      title: 'Metroid Dread',
      year: 2021,
      releaseDate: '2021-10-08',
      chrono: 10,
      note: 'Hunted across ZDR by the relentless E.M.M.I. robots and the Chozo warlord Raven Beak'
    },
    {
      id: 'metroid-prime-4',
      title: 'Metroid Prime 4: Beyond',
      year: 2025,
      releaseDate: '2025-12-04',
      chrono: 5,
      note: 'Fourth Prime entry, eighteen years after Corruption'
    }
  ],
  characters: [
    {
      id: 'metroid-samus',
      name: 'Samus Aran',
      role: 'Bounty hunter in Chozo power armor',
      portraitUrl: `${MKW}/4/47/Samus_sm_Artwork.png`,
      appearsIn: [
        'metroid-1', 'metroid-2', 'metroid-super', 'metroid-prime', 'metroid-fusion',
        'metroid-zero-mission', 'metroid-prime-2', 'metroid-prime-3', 'metroid-other-m',
        'metroid-samus-returns', 'metroid-dread', 'metroid-prime-4'
      ],
      blurb: 'Raised by the bird-like Chozo after the Space Pirates killed her parents, and given their technology as living armor. Nearly silent through most of the series, which is much of why the mystery under the suit became the series\' founding image.'
    },
    {
      id: 'metroid-ridley',
      name: 'Ridley',
      role: 'Space Pirate commander',
      portraitUrl: `${MKW}/thumb/7/77/MP1_Ridley_Model.png/1200px-MP1_Ridley_Model.png`,
      appearsIn: ['metroid-1', 'metroid-zero-mission', 'metroid-super', 'metroid-prime', 'metroid-other-m', 'metroid-prime-3'],
      blurb: 'The dragon-like Space Pirate who killed Samus\'s parents on K-2L, and the one villain who has died at her hands more times than any boss roster should allow.'
    },
    {
      id: 'metroid-mother-brain',
      name: 'Mother Brain',
      role: 'Ruler of the Space Pirates on Zebes',
      portraitUrl: `${MKW}/e/e3/Mother_Brain_zm_Screenshot_4.png`,
      appearsIn: ['metroid-1', 'metroid-zero-mission', 'metroid-super'],
      blurb: 'A brain in a jar commanding Zebes, until Super Metroid gives her a towering cybernetic body for the fight that turns the baby Metroid hatchling into the series\' most quoted moment.'
    },
    {
      id: 'metroid-kraid',
      name: 'Kraid',
      role: 'Space Pirate sub-boss',
      portraitUrl: `${MKW}/f/f5/Kraid_zm_Artwork.png`,
      appearsIn: ['metroid-1', 'metroid-zero-mission', 'metroid-super'],
      blurb: 'A reptilian sub-boss guarding Zebes\'s depths, one of the two names (with Ridley) that recur across the original trilogy\'s key art for forty years.'
    },
    {
      id: 'metroid-dark-samus',
      name: 'Dark Samus',
      role: 'Phazon-corrupted doppelganger',
      portraitUrl: `${MKW}/thumb/b/b0/Dark_Samus_mp3_Artwork.png/1200px-Dark_Samus_mp3_Artwork.png`,
      appearsIn: ['metroid-prime-2', 'metroid-prime-3'],
      blurb: 'Reconstituted from the destroyed Metroid Prime\'s Phazon remains and Samus\'s own scanned combat data — a mirror match that drives the entire Prime trilogy\'s back half.'
    },
    {
      id: 'metroid-adam',
      name: 'Adam Malkovich',
      role: 'Samus\'s former commanding officer',
      portraitUrl: `${MKW}/d/d3/Adam_Malkovich_om_Screenshot_2.png`,
      appearsIn: ['metroid-fusion', 'metroid-other-m'],
      blurb: 'The by-the-book officer Samus served under in the Galactic Federation. He dies during Other M, and his uploaded mind returns as the ship computer guiding her through Fusion.'
    },
    {
      id: 'metroid-raven-beak',
      name: 'Raven Beak',
      role: 'Chozo warlord',
      portraitUrl: `${MKW}/thumb/9/90/M5_art_Raven_Beak_01.png/1200px-M5_art_Raven_Beak_01.png`,
      appearsIn: ['metroid-dread'],
      blurb: 'Leader of the warlike Mawkin Chozo, who lures Samus to planet ZDR to exploit the Chozo DNA and Metroid power she carries. Dread\'s final confrontation.'
    }
  ]
}
