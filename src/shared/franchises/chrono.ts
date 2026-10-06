// Chrono — Square's time-travel RPG duology plus Radical Dreamers, the
// Satellaview visual novel that bridges them, and the 1996 short OVA. Both
// Radical Dreamers and Chrono Cross carry the same Steam id by design, per
// the task brief: Square Enix's 2022 "Chrono Cross: The Radical Dreamers
// Edition" is the only way either has ever been sold on Steam, bundling a
// playable version of Radical Dreamers alongside the remastered main game —
// there is no separate purchase for either half.
// Chrono order follows the task brief exactly (Trigger -> Radical Dreamers
// -> Cross), which also matches release order here: Radical Dreamers is a
// direct narrative bridge, telling a parallel side-story to Chrono Trigger's
// ending that sets up plot threads Chrono Cross resolves. The 1996 OVA
// adapts Chrono Trigger's story and shares its chrono slot.
// Dates verified against Wikipedia infoboxes, 2026-10-05; Steam ids via the
// Steam store API and the AniList id via AniList the same day. Hero art is
// the Chrono Trigger Steam library hero; character portraits are
// Wikipedia/Wikimedia fair-use renders. Marle and Magus have no individual
// fair-use art on Wikipedia (both redirect to a group cast image), which is
// why they are not among the five characters below; Serge and Kid, who have
// the same gap for Chrono Cross, use that game's own box art and its group
// cast image respectively — the only reliable sources found for them.

import type { FranchiseCfg } from './types'

export const CHRONO: FranchiseCfg = {
  id: 'chrono',
  name: 'Chrono',
  short: 'Chrono',
  color: '#3a7ca5',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/613830/library_hero.jpg',
  studio: 'Square (Square Enix)',
  tagline: 'A pendant, a time machine, and the fight to keep the world from ending in 1999 — then again in 2300 AD.',
  trivia: [
    {
      title: 'The "Dream Team" project',
      body: 'Chrono Trigger (1995) paired Dragon Quest\'s Yuji Horii, Final Fantasy\'s Hironobu Sakaguchi, and Dragon Ball artist Akira Toriyama on one project — contemporary press nicknamed them the "Dream Team." Its multiple endings (determined by when and how the final boss is challenged) and New Game Plus mode were unusually ambitious for a 16-bit RPG.'
    },
    {
      title: 'A side-story that became a sequel\'s seed',
      body: 'Radical Dreamers (1996) was a text-heavy visual novel released only in Japan through the short-lived Satellaview satellite download service, telling an alternate take on Chrono Trigger\'s ending with a new cast. Chrono Cross (1999) absorbed its characters and ideas into a full 3D sequel, which is why Radical Dreamers stayed obscure in the West for over two decades until its 2022 re-release finally brought it overseas.'
    },
    {
      title: 'Two worlds and forty-five allies',
      body: 'Chrono Cross moved the action to a tropical archipelago split into two parallel worlds — one where the hero Serge died as a child, one where he didn\'t — and is remembered for a cast of over forty recruitable characters and a soundtrack (Yasunori Mitsuda\'s second for the series) considered one of the best of its generation.'
    }
  ],
  entries: [
    {
      id: 'chrono-trigger',
      title: 'Chrono Trigger',
      externalIds: [{ source: 'steam', id: '613830' }],
      year: 1995,
      releaseDate: '1995-03-11',
      chrono: 1,
      note: 'Crono and friends chase Lavos across eras from 65,000,000 BC to 2300 AD'
    },
    {
      id: 'chrono-radical-dreamers',
      title: 'Radical Dreamers',
      aliases: ['Nusumenai Houseki'],
      externalIds: [{ source: 'steam', id: '1133760' }],
      year: 1996,
      releaseDate: '1996-02-03',
      chrono: 2,
      note: 'Satellaview visual novel bridging Trigger and Cross, starring a new thief named Serge'
    },
    {
      id: 'chrono-trigger-anime',
      title: 'Chrono Trigger: Nuumamonjaa',
      mediaType: 'anime',
      aliases: ['Jikuu Bouken Nuumamonjaa'],
      externalIds: [{ source: 'anilist', id: '1751' }],
      year: 1996,
      releaseDate: '1996-08-01',
      chrono: 1,
      adaptation: true,
      note: 'Short promotional OVA based on Chrono Trigger'
    },
    {
      id: 'chrono-cross',
      title: 'Chrono Cross',
      aliases: ['Chrono Cross: The Radical Dreamers Edition'],
      externalIds: [{ source: 'steam', id: '1133760' }],
      year: 1999,
      releaseDate: '1999-11-18',
      chrono: 3,
      note: 'Serge crosses into a parallel world where he died as a child, on an archipelago shaped by Lavos\'s fall'
    }
  ],
  characters: [
    {
      id: 'chrono-crono',
      name: 'Crono',
      role: 'Silent protagonist (Chrono Trigger)',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Chronotriggercronopicture.png',
      appearsIn: ['chrono-trigger', 'chrono-trigger-anime'],
      blurb: 'A red-haired swordsman who never speaks a line of dialogue, pulled into time travel after a fairground mishap sends Marle into the past.'
    },
    {
      id: 'chrono-lucca',
      name: 'Lucca Ashtear',
      role: 'Inventor of the time machine',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cf/Lucca_Ashtear.png',
      appearsIn: ['chrono-trigger', 'chrono-trigger-anime'],
      blurb: 'The brilliant engineer whose Telepod experiment opens the first rift in time, and whose guilt over a childhood accident drives much of her arc.'
    },
    {
      id: 'chrono-frog',
      name: 'Frog',
      role: 'Cursed knight (Chrono Trigger)',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/d/db/Frog_Chrono.png',
      appearsIn: ['chrono-trigger', 'chrono-trigger-anime'],
      blurb: 'A knight of 600 AD transformed into a frog by Magus, carrying guilt over a friend\'s death that only confronting Magus can resolve.'
    },
    {
      id: 'chrono-serge',
      name: 'Serge',
      role: 'Protagonist (Chrono Cross)',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Chronocrossbox.jpg',
      appearsIn: ['chrono-radical-dreamers', 'chrono-cross'],
      blurb: 'A fisherman\'s son who discovers he died as a child in a parallel version of his own world, and must untangle why he exists in both.'
    },
    {
      id: 'chrono-kid',
      name: 'Kid',
      role: 'Thief seeking the Frozen Flame',
      portraitUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Chrono_Cross_characters.jpg',
      appearsIn: ['chrono-cross'],
      blurb: 'A sharp-tongued orphan thief who recruits Serge into her search for the Frozen Flame, and whose own past turns out to be tangled up with his.'
    }
  ]
}
