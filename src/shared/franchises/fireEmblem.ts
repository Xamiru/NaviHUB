// Fire Emblem — curated canon: every mainline entry 1990-2023 including the
// DS remakes and Echoes; Warriors, Heroes (mobile) and Tokyo Mirage Sessions
// excluded. No `chrono`: each continent is its own world (Archanea, Valentia,
// Jugdral, Elibe, Magvel, Tellius, Ylisse, Fateslandia, Fódlan, Elyos) — the
// only true story links (Blazing before Binding, Thracia inside Genealogy,
// Radiant Dawn after Path of Radiance, Awakening millennia after Archanea)
// ride in the notes. Nintendo-only, so matching is title/alias-only.
// All art URLs curl-verified 2026-08-15.

import type { FranchiseCfg } from './types'

export const FIRE_EMBLEM: FranchiseCfg = {
  id: 'fire-emblem',
  name: 'Fire Emblem',
  short: 'Fire Emblem',
  color: '#3d7fd8',
  heroUrl: 'https://cdn.fireemblemwiki.org/c/cf/FETH_box_artwork.png',
  studio: 'Intelligent Systems (Nintendo)',
  tagline: 'Chess with a cast you will mourn — permadeath as storytelling.',
  trivia: [
    {
      title: 'Kaga\'s gamble',
      body: 'Shouzou Kaga\'s 1990 Famicom original fused strategy with a named, mortal cast: lose a unit and they stayed dead, and their friends noticed. Kaga left after Thracia 776 to make the near-clone Tear Ring Saga, and Nintendo sued him for it.\n\nFor thirteen years the series was Japan-only; Marth and Roy appearing in Super Smash Bros. Melee (2001) is the sole reason the West got Fire Emblem (2003).'
    },
    {
      title: 'Awakening or nothing',
      body: 'Nintendo told Intelligent Systems that Awakening (2012) would be the last game if it missed 250,000 sales. Casual Mode (no permadeath), a marriage/child system and Lucina made it the series\' best-seller to date, and every entry since inherits its shape.'
    },
    {
      title: 'Two ways to play',
      body: 'Classic vs Casual, plus the "Maddening" tier added by Three Houses, means the same map serves a player who reloads at every death and one who never does. Three Houses (2019) sold more than any other entry by making the calendar between battles half the game.'
    }
  ],
  entries: [
    { id: 'fe-1', title: 'Fire Emblem: Shadow Dragon and the Blade of Light', aliases: ['Fire Emblem: Shadow Dragon & the Blade of Light'], year: 1990, bgUrl: 'https://cdn.fireemblemwiki.org/7/7a/FEARHT_Cover_Art.png', note: 'Famicom — Marth\'s first war (Archanea)' },
    { id: 'fe-gaiden', title: 'Fire Emblem Gaiden', year: 1992, bgUrl: 'https://cdn.fireemblemwiki.org/5/59/FEG_Valentia_Map_02.png', note: 'Valentia — the odd one, remade as Echoes' },
    { id: 'fe-mystery', title: 'Fire Emblem: Mystery of the Emblem', year: 1994, bgUrl: 'https://cdn.fireemblemwiki.org/e/e6/FEMN_Battle.png', note: 'Super Famicom — Book 1 remakes the first, Book 2 continues it' },
    { id: 'fe-genealogy', title: 'Fire Emblem: Genealogy of the Holy War', year: 1996, bgUrl: 'https://cdn.fireemblemwiki.org/d/de/FESK_Tyrfing_03.png', note: 'Jugdral — two generations, the darkest script' },
    { id: 'fe-thracia', title: 'Fire Emblem: Thracia 776', year: 1999, bgUrl: 'https://cdn.fireemblemwiki.org/2/20/FE776_Thracia_776.jpg', note: 'Jugdral — set inside Genealogy; the hardest one' },
    { id: 'fe-binding-blade', title: 'Fire Emblem: The Binding Blade', aliases: ['Fire Emblem: Fuuin no Tsurugi'], year: 2002, bgUrl: 'https://cdn.fireemblemwiki.org/0/06/FEFT_box_art.jpg', note: 'GBA — Roy; sequel to Blazing Blade' },
    { id: 'fe-blazing-blade', title: 'Fire Emblem', aliases: ['Fire Emblem: The Blazing Blade', 'Fire Emblem: Rekka no Ken'], year: 2003, mc: 88, bgUrl: 'https://cdn.fireemblemwiki.org/9/93/FERK_cover_art.png', note: 'GBA — the first Western release; prequel to Binding Blade' },
    { id: 'fe-sacred-stones', title: 'Fire Emblem: The Sacred Stones', year: 2004, mc: 85, bgUrl: 'https://cdn.fireemblemwiki.org/b/b9/FESS_art02.jpg', note: 'GBA — Magvel, the standalone one' },
    { id: 'fe-path-of-radiance', title: 'Fire Emblem: Path of Radiance', year: 2005, mc: 85, bgUrl: 'https://cdn.fireemblemwiki.org/d/d6/FEPR_cover_art.jpg', note: 'GameCube — Ike, Tellius' },
    { id: 'fe-radiant-dawn', title: 'Fire Emblem: Radiant Dawn', year: 2007, mc: 78, bgUrl: 'https://cdn.fireemblemwiki.org/5/5b/FERD_Dawn_Brigade_wallpaper.jpg', note: 'Wii — direct sequel to Path of Radiance' },
    { id: 'fe-shadow-dragon', title: 'Fire Emblem: Shadow Dragon', year: 2008, mc: 81, remake: true, bgUrl: 'https://cdn.fireemblemwiki.org/d/df/FESD_Battle.jpg', note: 'DS remake of the 1990 original' },
    { id: 'fe-new-mystery', title: 'Fire Emblem: New Mystery of the Emblem', aliases: ['Fire Emblem: Shin Monshou no Nazo'], year: 2010, remake: true, bgUrl: 'https://cdn.fireemblemwiki.org/3/3d/FESMN_Army.jpg', note: 'DS remake of Mystery — Japan only' },
    { id: 'fe-awakening', title: 'Fire Emblem Awakening', year: 2012, mc: 92, bgUrl: 'https://cdn.fireemblemwiki.org/6/62/FEA_Shepherds_Nintendo_Today.png', note: '3DS — the one that saved the series' },
    { id: 'fe-fates', title: 'Fire Emblem Fates', aliases: ['Fire Emblem Fates: Birthright', 'Fire Emblem Fates: Conquest', 'Fire Emblem Fates: Revelation'], year: 2015, mc: 88, bgUrl: 'https://cdn.fireemblemwiki.org/3/32/FEF_Official_Site_Character_Collage.png', note: '3DS — Birthright / Conquest / Revelation, one entry' },
    { id: 'fe-echoes', title: 'Fire Emblem Echoes: Shadows of Valentia', year: 2017, mc: 81, remake: true, bgUrl: 'https://cdn.fireemblemwiki.org/b/be/FESoV_Boxart.jpg', note: '3DS remake of Gaiden' },
    { id: 'fe-three-houses', title: 'Fire Emblem: Three Houses', year: 2019, mc: 89, bgUrl: 'https://cdn.fireemblemwiki.org/c/cf/FETH_box_artwork.png', note: 'Switch — Fódlan, the academy, the best-seller' },
    { id: 'fe-engage', title: 'Fire Emblem Engage', year: 2023, mc: 80, bgUrl: 'https://cdn.fireemblemwiki.org/d/db/FEE_key_art_02.jpg', note: 'Switch — Elyos, the greatest-hits one' }
  ],
  characters: [
    { id: 'fe-marth', name: 'Marth', role: 'Hero-King of Archanea', portraitUrl: 'https://cdn.fireemblemwiki.org/f/f1/FEE_Marth_portrait.png', appearsIn: ['fe-1', 'fe-mystery', 'fe-shadow-dragon', 'fe-new-mystery', 'fe-awakening'], blurb: 'The prince of Altea, the series\' first lord, and — via Smash Bros. — the reason anyone outside Japan ever played it.' },
    { id: 'fe-roy', name: 'Roy', role: 'Lord of Pherae (Binding Blade)', portraitUrl: 'https://cdn.fireemblemwiki.org/1/1d/FEE_Roy_portrait.png', appearsIn: ['fe-binding-blade', 'fe-blazing-blade'], blurb: 'Playable in Smash before his own game came out. Fifteen, earnest, and stuck with a sword that only turns good in the last chapter.' },
    { id: 'fe-lyn', name: 'Lyn', role: 'Lord of the Lorca (Blazing Blade)', portraitUrl: 'https://cdn.fireemblemwiki.org/5/56/FEE_Lyn_portrait.png', appearsIn: ['fe-blazing-blade'], blurb: 'The plains swordswoman who taught every Western player the game in 2003 — and stole the cover from the two other lords doing it.' },
    { id: 'fe-ike', name: 'Ike', role: 'Radiant Hero (Tellius)', portraitUrl: 'https://cdn.fireemblemwiki.org/b/b4/FEE_Ike_portrait.png', appearsIn: ['fe-path-of-radiance', 'fe-radiant-dawn'], blurb: 'The first lord who is not a noble: a mercenary who fights for his friends. Two games, one continent, no crown.' },
    { id: 'fe-chrom', name: 'Chrom', role: 'Prince of Ylisse (Awakening)', portraitUrl: 'https://cdn.fireemblemwiki.org/8/8c/FEE_Chrom_portrait.png', appearsIn: ['fe-awakening'], blurb: 'Marth\'s distant descendant, leader of the Shepherds, and half of the friendship that anchors the game that saved the franchise.' },
    { id: 'fe-lucina', name: 'Lucina', role: 'The girl from the future (Awakening)', portraitUrl: 'https://cdn.fireemblemwiki.org/9/9a/FEE_Lucina_portrait.png', appearsIn: ['fe-awakening'], blurb: 'Chrom\'s daughter, back from a ruined future wearing Marth\'s face and name. The reveal that made Awakening a phenomenon.' },
    { id: 'fe-byleth', name: 'Byleth', role: 'The professor (Three Houses)', portraitUrl: 'https://cdn.fireemblemwiki.org/8/8e/FEE_Byleth_portrait.png', appearsIn: ['fe-three-houses'], blurb: 'The silent mercenary turned teacher whose choice of house decides which of three wars you fight — and against whom.' },
    { id: 'fe-edelgard', name: 'Edelgard von Hresvelg', role: 'Emperor of Adrestia (Three Houses)', portraitUrl: 'https://cdn.fireemblemwiki.org/d/de/FETH_Edelgard_04.png', appearsIn: ['fe-three-houses'], blurb: 'The house leader who declares war on the church and the continent\'s whole order. Villain or revolutionary depending on which route you took — the series\' most argued-over character.' }
  ]
}
