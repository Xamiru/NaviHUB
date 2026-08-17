// The Legend of Heroes: Trails — curated canon: the whole Kiseki line from
// Sky FC through Trails beyond the Horizon plus the Sky 1st Chapter remake.
// The pre-Trails Legend of Heroes games (Dragon Slayer, the Gagharv trilogy)
// are excluded — different worlds, different era. Story order = in-universe
// year on Zemuria (S.1202 -> S.1209): Sky FC/SC/3rd -> Zero -> Azure -> Cold
// Steel I-IV (Zero/Azure and CS I/II run concurrently; the arc-internal order
// used here is the fan-standard one) -> Reverie -> Daybreak I/II -> Horizon.
// All art URLs curl-verified 2026-08-15.

import type { FranchiseCfg } from './types'

export const TRAILS: FranchiseCfg = {
  id: 'trails',
  name: 'The Legend of Heroes: Trails',
  short: 'Trails',
  color: '#d98d3a',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3375780/library_hero.jpg',
  studio: 'Nihon Falcom',
  tagline: 'One continent, one continuous story, twenty years and counting.',
  trivia: [
    {
      title: 'One world, told in arcs',
      body: 'Every Trails game is set on the continent of Zemuria and shares one timeline: the Liberl arc (Sky), the Crossbell arc (Zero/Azure), the Erebonia arc (Cold Steel), the Calvard arc (Daybreak) — with Reverie and Horizon as the crossovers. Characters from a 2004 game walk into a 2024 one; NPCs remember what you did three arcs ago.\n\nFalcom says the whole series is roughly two-thirds told.'
    },
    {
      title: 'The slow West',
      body: 'Sky FC reached English in 2011, seven years late; SC took another four because its script was over three million characters. Crossbell\'s two games were officially untranslated for over a decade — fan patches carried the community until XSEED and NIS America caught up in 2022-23.'
    },
    {
      title: 'Bracers, Enforcers, Ouroboros',
      body: 'The Bracer Guild (Estelle), the Special Support Section (Lloyd), Class VII (Rean) and Arkride Solutions (Van) are the arcs\' protagonists; the secret society Ouroboros and its Enforcers are the through-line villain, and its actual goal is still unrevealed after fourteen games.'
    }
  ],
  entries: [
    { id: 'trails-sky-fc', title: 'The Legend of Heroes: Trails in the Sky', aliases: ['The Legend of Heroes: Trails in the Sky FC', 'Trails in the Sky'], externalIds: [{ source: 'steam', id: '251150' }], year: 2004, chrono: 1, mc: 79, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/251150/library_hero.jpg', note: 'Liberl — Estelle and Joshua begin' },
    { id: 'trails-sky-sc', title: 'The Legend of Heroes: Trails in the Sky SC', aliases: ['Trails in the Sky SC', 'Trails in the Sky Second Chapter'], externalIds: [{ source: 'steam', id: '251290' }], year: 2006, chrono: 2, mc: 82, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/251290/library_hero.jpg', note: 'Liberl — the payoff' },
    { id: 'trails-sky-3rd', title: 'The Legend of Heroes: Trails in the Sky the 3rd', aliases: ['Trails in the Sky the 3rd'], externalIds: [{ source: 'steam', id: '436670' }], year: 2007, chrono: 3, mc: 79, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/436670/library_hero.jpg', note: 'Liberl — Kevin, and the doors' },
    { id: 'trails-zero', title: 'The Legend of Heroes: Trails from Zero', aliases: ['Trails from Zero'], externalIds: [{ source: 'steam', id: '1668510' }], year: 2010, chrono: 4, mc: 84, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1668510/library_hero.jpg', note: 'Crossbell — Lloyd and the SSS' },
    { id: 'trails-azure', title: 'The Legend of Heroes: Trails to Azure', aliases: ['Trails to Azure'], externalIds: [{ source: 'steam', id: '1668520' }], year: 2011, chrono: 5, mc: 82, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1668520/library_hero.jpg', note: 'Crossbell — the fan-favourite ending' },
    { id: 'trails-cs1', title: 'The Legend of Heroes: Trails of Cold Steel', aliases: ['Trails of Cold Steel'], externalIds: [{ source: 'steam', id: '538680' }], year: 2013, chrono: 6, mc: 82, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/538680/library_hero.jpg', note: 'Erebonia — Rean and Class VII' },
    { id: 'trails-cs2', title: 'The Legend of Heroes: Trails of Cold Steel II', aliases: ['Trails of Cold Steel II'], externalIds: [{ source: 'steam', id: '748490' }], year: 2014, chrono: 7, mc: 82, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/748490/library_hero.jpg', note: 'Erebonia — the civil war' },
    { id: 'trails-cs3', title: 'The Legend of Heroes: Trails of Cold Steel III', aliases: ['Trails of Cold Steel III'], externalIds: [{ source: 'steam', id: '991270' }], year: 2017, chrono: 8, mc: 82, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/991270/library_hero.jpg', note: 'Erebonia — the new Class VII' },
    { id: 'trails-cs4', title: 'The Legend of Heroes: Trails of Cold Steel IV', aliases: ['Trails of Cold Steel IV'], externalIds: [{ source: 'steam', id: '1198090' }], year: 2018, chrono: 9, mc: 82, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1198090/library_hero.jpg', note: 'Erebonia — every playable character ever' },
    { id: 'trails-reverie', title: 'The Legend of Heroes: Trails into Reverie', aliases: ['Trails into Reverie'], externalIds: [{ source: 'steam', id: '1668540' }], year: 2020, chrono: 10, mc: 84, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1668540/library_hero.jpg', note: 'Three routes — Rean, Lloyd, and C' },
    { id: 'trails-daybreak', title: 'The Legend of Heroes: Trails through Daybreak', aliases: ['Trails through Daybreak'], externalIds: [{ source: 'steam', id: '2138610' }], year: 2021, chrono: 11, mc: 82, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2138610/library_hero.jpg', note: 'Calvard — Van Arkride, spriggan' },
    { id: 'trails-daybreak-2', title: 'The Legend of Heroes: Trails through Daybreak II', aliases: ['Trails through Daybreak II'], externalIds: [{ source: 'steam', id: '2668430' }], year: 2022, chrono: 12, mc: 78, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2668430/library_hero.jpg', note: 'Calvard — the crimson beast' },
    { id: 'trails-horizon', title: 'The Legend of Heroes: Trails beyond the Horizon', aliases: ['Trails beyond the Horizon', 'Kai no Kiseki', 'The Legend of Heroes: Kai no Kiseki -Farewell, O Zemuria-'], externalIds: [{ source: 'steam', id: '3316940' }, { source: 'steam', id: '3319980' }], year: 2024, chrono: 13, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3316940/library_hero.jpg', note: 'Van meets Rean — the arcs converge (West: Jan 2026)' },
    { id: 'trails-sky-1st', title: 'The Legend of Heroes: Trails in the Sky 1st Chapter', aliases: ['Trails in the Sky 1st Chapter'], externalIds: [{ source: 'steam', id: '3375780' }], year: 2025, chrono: 14, remake: true, bgUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3375780/library_hero.jpg', note: 'Full 3D remake of Sky FC' }
  ],
  characters: [
    { id: 'trails-estelle', name: 'Estelle Bright', role: 'Bracer (Liberl arc)', portraitUrl: 'https://static.wikia.nocookie.net/kiseki/images/4/4f/Estelle_Bright_%28Hajimari%29.png/revision/latest/scale-to-width-down/627?cb=20210412170152', appearsIn: ['trails-sky-fc', 'trails-sky-sc', 'trails-sky-3rd', 'trails-zero', 'trails-azure', 'trails-reverie', 'trails-sky-1st'], blurb: 'The staff-swinging junior bracer whose sheer stubborn warmth is the series\' emotional baseline. Every later cast gets measured against her.' },
    { id: 'trails-joshua', name: 'Joshua Bright', role: 'Bracer, ex-Enforcer', portraitUrl: 'https://static.wikia.nocookie.net/kiseki/images/8/85/Joshua_Bright_%28Hajimari%29.png/revision/latest/scale-to-width-down/619?cb=20210709194510', appearsIn: ['trails-sky-fc', 'trails-sky-sc', 'trails-sky-3rd', 'trails-zero', 'trails-azure', 'trails-reverie', 'trails-sky-1st'], blurb: 'Estelle\'s adopted brother, quiet and perfect and hiding the reason why. Sky FC\'s ending is his.' },
    { id: 'trails-lloyd', name: 'Lloyd Bannings', role: 'Special Support Section (Crossbell arc)', portraitUrl: 'https://static.wikia.nocookie.net/kiseki/images/5/51/Lloyd_Bannings_%28Hajimari%29.png/revision/latest/scale-to-width-down/638?cb=20200206072331', appearsIn: ['trails-zero', 'trails-azure', 'trails-cs3', 'trails-cs4', 'trails-reverie'], blurb: 'The rookie detective who takes on a whole city-state\'s corruption with four people and a tonfa. Crossbell\'s conscience.' },
    { id: 'trails-rean', name: 'Rean Schwarzer', role: 'Class VII (Erebonia arc)', portraitUrl: 'https://static.wikia.nocookie.net/kiseki/images/6/6b/Rean_Schwarzer_%28Kai%29.webp/revision/latest/scale-to-width-down/711?cb=20240711071212', appearsIn: ['trails-cs1', 'trails-cs2', 'trails-cs3', 'trails-cs4', 'trails-reverie', 'trails-horizon'], blurb: 'The Ashen Chevalier — student, then teacher, then a national symbol he never asked to be, across the four longest games in the series.' },
    { id: 'trails-van', name: 'Van Arkride', role: 'Spriggan (Calvard arc)', portraitUrl: 'https://static.wikia.nocookie.net/kiseki/images/5/57/Van_Arkride_%28Kai%29.webp/revision/latest/scale-to-width-down/702?cb=20240425070440', appearsIn: ['trails-daybreak', 'trails-daybreak-2', 'trails-horizon'], blurb: 'A fixer who works the grey between the law and the underworld — the series\' first adult protagonist, and its most morally flexible.' },
    { id: 'trails-olivier', name: 'Olivier Lenheim', role: 'Wandering bard, secretly more', portraitUrl: 'https://static.wikia.nocookie.net/kiseki/images/2/21/Olivert_Reise_Arnor_Key_Visual_%28Hajimari%29.png/revision/latest?cb=20210709193911', appearsIn: ['trails-sky-fc', 'trails-sky-sc', 'trails-sky-3rd', 'trails-cs1', 'trails-cs2', 'trails-cs3', 'trails-cs4', 'trails-reverie', 'trails-sky-1st'], blurb: 'The lute-playing flirt who turns out to be the most important political figure on the continent. Comic relief with a throne.' },
    { id: 'trails-renne', name: 'Renne', role: 'The Angel of Slaughter, then a daughter', portraitUrl: 'https://static.wikia.nocookie.net/kiseki/images/6/6b/Renne_Bright_%28Kuro_II%29.webp/revision/latest/scale-to-width-down/800?cb=20220717011852', appearsIn: ['trails-sky-sc', 'trails-sky-3rd', 'trails-zero', 'trails-azure', 'trails-cs4', 'trails-reverie', 'trails-daybreak-2', 'trails-horizon'], blurb: 'Introduced as an Enforcer aged twelve; her arc from Ouroboros to the Bright family is the longest redemption the series has written.' },
    { id: 'trails-agnes', name: 'Agnès Claudel', role: 'Client, then partner (Calvard arc)', portraitUrl: 'https://static.wikia.nocookie.net/kiseki/images/b/be/Agnes_Claudel_%28Kai%29.webp/revision/latest?cb=20240425070309', appearsIn: ['trails-daybreak', 'trails-daybreak-2', 'trails-horizon'], blurb: 'The student who hires Van to recover her great-grandfather\'s Oct-Genesis devices and never leaves. Daybreak\'s heart.' }
  ]
}
