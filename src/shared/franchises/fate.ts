// Fate — Type-Moon's Fate/stay night visual novel and its direct adaptations
// and side stories, plus the standalone Fate anime built on the wider
// setting. No chrono: Apocrypha, Extra/Extella and the Grand Order side
// stories (Babylonia, Camelot, Strange Fake) are explicitly parallel or
// alternate worlds rather than one timeline, the same reason Ghost in the
// Shell omits chrono. Route is centred on Fate/stay night's three visual
// novel routes: the VN itself, then its most faithful screen adaptations of
// each route in turn (Unlimited Blade Works' TV series, then the Heaven's
// Feel film trilogy), with the 2006 TV series, the 2010 UBW film, Fate/Zero
// and hollow ataraxia as optional detours around that spine, and every
// standalone Fate anime placed after as optional, spinOff branches in
// release order. Excluded: the kaleid liner Prisma Illya franchise and
// Carnival Phantasm (gag/crossover spinoffs), Today's Menu for the Emiya
// Family (a cooking-focused spinoff), the Fate/EXTRA and Fate/EXTELLA games
// and their manga, and promotional/clip specials (Grand Order Memorial
// Movie 2023, Grand Carnival) with no story of their own.
// Ids and years from AniList/VNDB, art from AniList, curl-verified
// 2026-10-05.

import type { FranchiseCfg } from './types'

const AL = 'https://s4.anilist.co/file/anilistcdn'

export const FATE: FranchiseCfg = {
  id: 'fate',
  name: 'Fate',
  short: 'Fate',
  color: '#3d4f91',
  heroUrl: `${AL}/media/anime/banner/19603.jpg`,
  studio: 'Type-Moon / ufotable',
  tagline: 'Seven mages summon seven legendary Heroic Spirits to fight to the death for a wish-granting Grail.',
  trivia: [
    {
      title: 'One visual novel, three routes, three very different stories',
      body: 'Fate/stay night (2004) tells three largely separate stories through its Fate, Unlimited Blade Works and Heaven’s Feel routes, sharing a cast and opening but diverging sharply in tone and focus — which is why the franchise has been adapted three separate times rather than once, each attempt aimed at a different route.'
    },
    {
      title: 'Why ufotable became the "definitive" studio',
      body: 'Studio Deen’s 2006 TV series and 2010 film adapted the Fate and Unlimited Blade Works routes on a tight budget and schedule; ufotable’s Fate/Zero (2011-2012), Unlimited Blade Works (2014-2015) and Heaven’s Feel trilogy (2017-2020) are generally considered the versions that match the source material’s ambition, and cemented ufotable as the franchise’s main animation studio from then on.'
    },
    {
      title: 'A shared setting, many separate stories',
      body: 'Beyond Fate/stay night itself, Type-Moon has used the same Holy Grail War concept and Nasuverse mythology for largely independent stories: Fate/Apocrypha’s two-faction war, Fate/EXTRA’s virtual-world tournament, and Fate/Grand Order’s time-traveling Chaldea setting (Babylonia, Camelot, Lord El-Melloi II’s mysteries, and Fate/strange Fake’s false Grail War) each build their own cast and rules on the same premise.'
    }
  ],
  entries: [
    {
      id: 'fate-sn-vn',
      title: 'Fate/stay night',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '11' }],
      year: 2004,
      releaseDate: '2004-01-30',
      route: 1,
      mc: 86,
      note: 'The source novel: Shirou Emiya is dragged into the fifth Holy Grail War and bonds with his Servant, Saber'
    },
    {
      id: 'fate-ha-vn',
      title: 'Fate/hollow ataraxia',
      mediaType: 'visual_novel',
      externalIds: [{ source: 'vndb', id: '50' }],
      year: 2005,
      releaseDate: '2005-10-28',
      route: 12,
      optional: true,
      spinOff: true,
      mc: 81,
      note: 'Fan-disc sequel: a time loop traps Shirou’s group in a Grail War that already ended'
    },
    {
      id: 'fate-sn-2006',
      title: 'Fate/stay night',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '356' }],
      year: 2006,
      releaseDate: '2006-01-07',
      route: 4,
      optional: true,
      adaptation: true,
      mc: 68,
      note: 'Studio Deen’s first adaptation, covering the Fate route on a tight budget'
    },
    {
      id: 'fate-ubw-movie',
      title: 'Fate/stay night: Unlimited Blade Works (Movie)',
      mediaType: 'anime',
      aliases: ['Fate/stay night Movie: Unlimited Blade Works'],
      externalIds: [{ source: 'anilist', id: '6922' }],
      year: 2010,
      releaseDate: '2010-01-23',
      route: 5,
      optional: true,
      adaptation: true,
      mc: 70,
      note: 'A single film attempt at the Unlimited Blade Works route, later redone by ufotable as a full TV series'
    },
    {
      id: 'fate-zero-1',
      title: 'Fate/Zero',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '10087' }],
      year: 2011,
      releaseDate: '2011-10-02',
      route: 2,
      optional: true,
      mc: 81,
      note: 'Prequel novel adaptation: the fourth Holy Grail War, fought by Shirou’s adoptive father Kiritsugu a decade earlier'
    },
    {
      id: 'fate-zero-2',
      title: 'Fate/Zero Season 2',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '11741' }],
      year: 2012,
      releaseDate: '2012-04-08',
      route: 3,
      optional: true,
      mc: 84,
      note: 'Concludes the fourth war, and the choice that shapes who Kiritsugu becomes by the time Shirou knows him'
    },
    {
      id: 'fate-ubw-tv1',
      title: 'Fate/stay night: Unlimited Blade Works',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '19603' }],
      year: 2014,
      releaseDate: '2014-10-05',
      route: 6,
      adaptation: true,
      mc: 80,
      note: 'ufotable’s adaptation of the second route: Shirou allies with Rin Tohsaka and keeps clashing with her Servant, Archer'
    },
    {
      id: 'fate-ubw-tv2',
      title: 'Fate/stay night: Unlimited Blade Works 2nd Season',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '20792' }],
      year: 2015,
      releaseDate: '2015-04-05',
      route: 7,
      adaptation: true,
      mc: 82,
      note: 'Concludes the Unlimited Blade Works route and Archer’s reason for existing at all'
    },
    {
      id: 'fate-ubw-sunny-day',
      title: 'Fate/stay night: Unlimited Blade Works 2nd Season - sunny day',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21318' }],
      year: 2015,
      releaseDate: '2015-10-07',
      route: 8,
      optional: true,
      spinOff: true,
      mc: 73,
      note: 'Bundled epilogue short following the Unlimited Blade Works finale'
    },
    {
      id: 'fate-apocrypha',
      title: 'Fate/Apocrypha',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '98035' }],
      year: 2017,
      releaseDate: '2017-07-02',
      route: 13,
      optional: true,
      spinOff: true,
      mc: 70,
      note: 'A separate Great Holy Grail War fought between two full factions of Servants, outside the main novel’s cast'
    },
    {
      id: 'fate-hf-1',
      title: 'Fate/stay night [Heaven’s Feel] I. presage flower',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '20791' }],
      year: 2017,
      releaseDate: '2017-10-14',
      route: 9,
      adaptation: true,
      mc: 80,
      note: 'Opens the third route: Shirou’s path with Sakura Matou, and the shadow war already closing in on her'
    },
    {
      id: 'fate-extra-le',
      title: 'Fate/EXTRA Last Encore',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21717' }],
      year: 2018,
      releaseDate: '2018-01-28',
      route: 14,
      optional: true,
      spinOff: true,
      mc: 61,
      note: 'Adapts the Fate/EXTRA game’s virtual-world Grail War tournament'
    },
    {
      id: 'fate-elmelloi-pre',
      title: 'Lord El-Melloi II’s Case Files {Rail Zeppelin} Grace note - A Grave Keeper, a Cat, and a Mage',
      mediaType: 'anime',
      aliases: ['Lord El-Melloi II-sei no Jikenbo: Rail Zeppelin Grace note - Hakamori to Neko to Majutsu-shi'],
      externalIds: [{ source: 'anilist', id: '106862' }],
      year: 2018,
      releaseDate: '2018-12-31',
      route: 15,
      optional: true,
      spinOff: true,
      mc: 70,
      note: 'Prologue special introducing Waver Velvet, now a detective-mage lecturer, ahead of the TV series'
    },
    {
      id: 'fate-hf-2',
      title: 'Fate/stay night [Heaven’s Feel] II. lost butterfly',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21718' }],
      year: 2019,
      releaseDate: '2019-01-12',
      route: 10,
      adaptation: true,
      mc: 84,
      note: 'Shirou’s choices start costing him the support of everyone he has relied on so far'
    },
    {
      id: 'fate-elmelloi-tv',
      title: 'Lord El-Melloi II’s Case Files {Rail Zeppelin} Grace note',
      mediaType: 'anime',
      aliases: ['Lord El-Melloi II-sei no Jikenbo: Rail Zeppelin Grace note'],
      externalIds: [{ source: 'anilist', id: '106918' }],
      year: 2019,
      releaseDate: '2019-07-07',
      route: 16,
      optional: true,
      spinOff: true,
      mc: 73,
      note: 'Waver Velvet investigates a murder aboard a train of mages, years after Fate/Zero'
    },
    {
      id: 'fate-babylonia',
      title: 'Fate/Grand Order Absolute Demonic Front: Babylonia',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '103275' }],
      year: 2019,
      releaseDate: '2019-10-05',
      route: 17,
      optional: true,
      spinOff: true,
      mc: 78,
      note: 'The Grand Order mobile game’s Babylonia singularity: Gilgamesh’s Uruk against a demonic beast siege'
    },
    {
      id: 'fate-hf-3',
      title: 'Fate/stay night [Heaven’s Feel] III. spring song',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '21719' }],
      year: 2020,
      releaseDate: '2020-08-15',
      route: 11,
      adaptation: true,
      mc: 85,
      note: 'Closes the Heaven’s Feel route and the Fate/stay night story'
    },
    {
      id: 'fate-camelot-1',
      title: 'Fate/Grand Order Divine Realm of the Round Table: Camelot - Wandering; Agateram',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '103276' }],
      year: 2020,
      releaseDate: '2020-12-05',
      route: 18,
      optional: true,
      spinOff: true,
      mc: 68,
      note: 'First of two films adapting Grand Order’s Camelot singularity against an altered King Arthur'
    },
    {
      id: 'fate-camelot-2',
      title: 'Fate/Grand Order Divine Realm of the Round Table: Camelot - Paladin; Agateram',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '103277' }],
      year: 2021,
      releaseDate: '2021-05-15',
      route: 19,
      optional: true,
      spinOff: true,
      mc: 76,
      note: 'Concludes the Camelot singularity'
    },
    {
      id: 'fate-elmelloi-post',
      title: 'Lord El-Melloi II’s Case Files {Rail Zeppelin} Grace note -Special Episode-',
      mediaType: 'anime',
      aliases: ['Lord El-Melloi II-sei no Jikenbo: Rail Zeppelin Grace note Tokubetsu-hen'],
      externalIds: [{ source: 'anilist', id: '136344' }],
      year: 2021,
      releaseDate: '2021-12-31',
      route: 20,
      optional: true,
      spinOff: true,
      mc: 74,
      note: 'Epilogue special following the Rail Zeppelin case'
    },
    {
      id: 'fate-strange-fake-prologue',
      title: 'Fate/strange Fake -Whispers of Dawn-',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '154966' }],
      year: 2023,
      releaseDate: '2023-07-02',
      route: 21,
      optional: true,
      spinOff: true,
      mc: 81,
      note: 'Prologue OVA for Fate/strange Fake, introducing its false, mismatched Holy Grail War'
    },
    {
      id: 'fate-strange-fake-tv',
      title: 'Fate/strange Fake',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '166617' }],
      year: 2026,
      releaseDate: '2026-01-03',
      route: 22,
      optional: true,
      spinOff: true,
      mc: 82,
      note: 'Full TV adaptation: a counterfeit Grail War in a fake Snowfield, fought with the wrong rules entirely'
    }
  ],
  characters: [
    {
      id: 'fate-shirou',
      name: 'Shirou Emiya',
      role: 'Protagonist',
      portraitUrl: `${AL}/character/large/b496-GI0waavDjyk3.png`,
      appearsIn: ['fate-sn-vn', 'fate-ha-vn', 'fate-sn-2006', 'fate-ubw-movie', 'fate-ubw-tv1', 'fate-ubw-tv2', 'fate-ubw-sunny-day', 'fate-hf-1', 'fate-hf-2', 'fate-hf-3'],
      blurb: 'A survivor of a fire that killed his birth family, who grew up determined to save everyone and finds out across every route how much that costs him.'
    },
    {
      id: 'fate-saber',
      name: 'Artoria Pendragon',
      role: 'Saber, Shirou’s Servant',
      portraitUrl: `${AL}/character/large/b497-Yg5pNmC8kxzs.png`,
      appearsIn: ['fate-sn-vn', 'fate-ha-vn', 'fate-sn-2006', 'fate-ubw-movie', 'fate-zero-1', 'fate-zero-2', 'fate-ubw-tv1', 'fate-ubw-tv2', 'fate-ubw-sunny-day'],
      blurb: 'King Arthur, summoned as Shirou’s Servant and still carrying the weight of a reign she believes she failed.'
    },
    {
      id: 'fate-rin',
      name: 'Rin Tohsaka',
      role: 'Mage, Shirou’s classmate',
      portraitUrl: `${AL}/character/large/b498-lwawtSpLyATL.png`,
      appearsIn: ['fate-sn-vn', 'fate-ha-vn', 'fate-sn-2006', 'fate-ubw-movie', 'fate-ubw-tv1', 'fate-ubw-tv2', 'fate-ubw-sunny-day', 'fate-hf-1', 'fate-hf-2', 'fate-hf-3'],
      blurb: 'A talented mage from a prestigious family, pulled into an uneasy alliance with Shirou that turns into something more across several routes.'
    },
    {
      id: 'fate-archer',
      name: 'Archer',
      role: 'Rin’s Servant',
      portraitUrl: `${AL}/character/large/b2087-l5WP4W4vmfJJ.png`,
      appearsIn: ['fate-sn-vn', 'fate-sn-2006', 'fate-ubw-movie', 'fate-ubw-tv1', 'fate-ubw-tv2', 'fate-hf-1'],
      blurb: 'A cynical, sword-summoning Servant whose identity is the Unlimited Blade Works route’s central reveal.'
    },
    {
      id: 'fate-kiritsugu',
      name: 'Kiritsugu Emiya',
      role: 'Shirou’s adoptive father',
      portraitUrl: `${AL}/character/large/b10010-fNspzan5MzNk.png`,
      appearsIn: ['fate-zero-1', 'fate-zero-2'],
      blurb: 'A professional mage-killer who fights the fourth Grail War hoping to win a wish worth every compromise he has already made.'
    },
    {
      id: 'fate-gilgamesh',
      name: 'Gilgamesh',
      role: 'Recurring Servant, Archer class',
      portraitUrl: `${AL}/character/large/b2514-hnE6LEdqm7Su.png`,
      appearsIn: ['fate-zero-1', 'fate-zero-2', 'fate-sn-2006', 'fate-ubw-movie', 'fate-ubw-tv1', 'fate-ubw-tv2', 'fate-hf-1', 'fate-hf-2', 'fate-babylonia'],
      blurb: 'The world’s first king and oldest Heroic Spirit, who treats nearly everyone else in every war as beneath his notice.'
    },
    {
      id: 'fate-illya',
      name: 'Illyasviel von Einzbern',
      role: 'A rival master',
      portraitUrl: `${AL}/character/large/b503-SmS87yq6l2tD.png`,
      appearsIn: ['fate-sn-vn', 'fate-sn-2006', 'fate-ubw-movie', 'fate-ubw-tv1', 'fate-ubw-tv2', 'fate-hf-1', 'fate-hf-2', 'fate-hf-3'],
      blurb: 'Shirou’s estranged half-sister through Kiritsugu, raised by the Einzbern family to fight in the war as a weapon.'
    },
    {
      id: 'fate-waver',
      name: 'Waver Velvet',
      role: 'A master, later a lecturer and detective',
      portraitUrl: `${AL}/character/large/b16023-gfwOgU1743ff.png`,
      appearsIn: ['fate-zero-1', 'fate-zero-2', 'fate-elmelloi-pre', 'fate-elmelloi-tv', 'fate-elmelloi-post'],
      blurb: 'Enters the fourth war an underestimated student and leaves it transformed enough to become Lord El-Melloi II by the time his own case files start.'
    }
  ]
}
