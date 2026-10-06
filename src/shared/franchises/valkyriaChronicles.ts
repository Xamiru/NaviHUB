// Valkyria Chronicles — Sega's watercolor-painted tactical RPG series, set on
// the fictional continent of Europa during the Second Europan War. Chrono
// follows in-universe placement rather than release order: Valkyria
// Chronicles 3 explicitly runs parallel to the first game (a prequel to
// Valkyria Chronicles II), and Valkyria Chronicles 4 follows a different
// army's campaign during that same war, so 1, 3 and 4 share chrono 1 as
// ties; Valkyria Chronicles II is set two years into the war, after that
// shared period, at chrono 2. Valkyria Revolution is marked spinOff and left
// out of the chrono column entirely — Sega set it in a separate fictional
// universe with no Europan War. No "Valkyria Elysion" title exists as of
// this file's verification date; none of the available sources (Wikipedia,
// Steam, AniList) show any such game released, announced or in development,
// so it is not included. Ids from Steam/AniList, years and plot facts from
// Wikipedia, all verified 2026-10-05.

import type { FranchiseCfg } from './types'

export const VALKYRIA_CHRONICLES: FranchiseCfg = {
  id: 'valkyria-chronicles',
  name: 'Valkyria Chronicles',
  short: 'Valkyria Chronicles',
  color: '#c76e3c',
  heroUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/294860/library_hero.jpg',
  studio: 'Sega',
  tagline: 'Watercolor war on the continent of Europa.',
  trivia: [
    {
      title: 'Ragnite and the Second Europan War',
      body: 'Europa, Valkyria Chronicles\' answer to 1930s Europe, is split between the eastern Imperial Empire and the western Federation, both fighting over ragnite — a resource that fuels everything from weapons to medicine. The series opens when the Empire invades the neutral, ragnite-rich nation of Gallia, and Squad 7, led by Welkin Gunther with scout Alicia Melchiott and tank engineer Isara Gunther, forms the Gallian militia\'s resistance.'
    },
    {
      title: 'Different squads, same war',
      body: 'Valkyria Chronicles II moves the story two years after the war to a military academy, where cadets put down an internal rebellion. Valkyria Chronicles 3 goes back to the first game\'s timeframe to follow the "Nameless," a penal military unit running black ops for Gallia — it was never officially localized, reaching English-speaking players only through a 2014 fan translation. Valkyria Chronicles 4 returns to the same war from the opposite side, following the Federation\'s Squad E and Claude Wallace through Operation Northern Cross.'
    },
    {
      title: 'The one that left Europa',
      body: 'Valkyria Revolution (2017) swapped Europa for an entirely separate fictional setting and steampunk-flavored technology, and met a mixed critical reception.'
    }
  ],
  entries: [
    {
      id: 'vc-1',
      title: 'Valkyria Chronicles',
      aliases: ['Senjou no Valkyria'],
      externalIds: [{ source: 'steam', id: '294860' }],
      year: 2008,
      releaseDate: '2008-04-24',
      chrono: 1,
      note: 'Squad 7 defends the neutral nation of Gallia after an Imperial invasion, with Welkin Gunther commanding the tank Edelweiss'
    },
    {
      id: 'vc-anime',
      title: 'Valkyria Chronicles',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '5507' }],
      year: 2009,
      releaseDate: '2009-04-05',
      chrono: 1,
      adaptation: true,
      note: 'A 26-episode adaptation of Squad 7\'s fight to reclaim their homes from the Imperial invasion'
    },
    {
      id: 'vc-2',
      title: 'Valkyria Chronicles II',
      year: 2010,
      releaseDate: '2010-01-21',
      chrono: 2,
      note: 'Two years after the war, cadets at a Gallian military academy are pulled into putting down an internal rebellion'
    },
    {
      id: 'vc-3',
      title: 'Valkyria Chronicles 3',
      aliases: ['Senjou no Valkyria 3', 'Valkyria Chronicles 3: Unrecorded Chronicles'],
      year: 2011,
      releaseDate: '2011-01-27',
      chrono: 1,
      note: 'The penal unit "Nameless" runs black ops for Gallia during the same war, hiding a dangerous secret about its own members'
    },
    {
      id: 'vc-3-ova',
      title: 'Senjou no Valkyria 3: Tagatame no Juusou',
      mediaType: 'anime',
      externalIds: [{ source: 'anilist', id: '9793' }],
      year: 2011,
      releaseDate: '2011-04-13',
      chrono: 1,
      adaptation: true,
      note: 'A two-episode OVA following the Nameless unit\'s Kurt Irving, Riela Marcellis and Imca'
    },
    {
      id: 'vc-revolution',
      title: 'Valkyria Revolution',
      year: 2017,
      releaseDate: '2017-01-19',
      spinOff: true,
      note: 'A separate story in its own fictional world, trading Europa\'s war for a different nation\'s revolution'
    },
    {
      id: 'vc-4',
      title: 'Valkyria Chronicles 4',
      aliases: ['Valkyria Chronicles 4 Complete Edition'],
      externalIds: [{ source: 'steam', id: '790820' }],
      year: 2018,
      releaseDate: '2018-03-21',
      chrono: 1,
      note: 'The Federation\'s Squad E, led by Claude Wallace, pushes toward the Imperial capital in Operation Northern Cross'
    }
  ],
  characters: [
    {
      id: 'vc-welkin',
      name: 'Welkin Gunther',
      role: 'Squad 7 commander (VC1)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/17079.jpg',
      appearsIn: ['vc-1', 'vc-anime'],
      blurb: 'The son of a former war hero, commanding Squad 7 and the tank Edelweiss as Gallia\'s militia fights back the Imperial invasion.'
    },
    {
      id: 'vc-alicia',
      name: 'Alicia Melchiott',
      role: 'Scout (VC1)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b17080-JJc3Idlczqz4.png',
      appearsIn: ['vc-1', 'vc-anime'],
      blurb: 'A member of the Bruhl town watch who becomes one of Squad 7\'s core scouts, fighting to protect her hometown.'
    },
    {
      id: 'vc-isara',
      name: 'Isara Gunther',
      role: 'Tank pilot (VC1)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/17081.jpg',
      appearsIn: ['vc-1', 'vc-anime'],
      blurb: 'Welkin\'s adoptive Darcsen sister, who pilots and maintains the tank Edelweiss for Squad 7.'
    },
    {
      id: 'vc-selvaria',
      name: 'Selvaria Bles',
      role: 'Imperial Valkyria (VC1)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/17092.jpg',
      appearsIn: ['vc-1', 'vc-anime', 'vc-3-ova'],
      blurb: 'An Imperial commander and one of the rare Valkyria warriors, whose devotion to her prince drives much of the first game\'s back half.'
    },
    {
      id: 'vc-kurt',
      name: 'Kurt Irving',
      role: 'Nameless commander (VC3)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/38149.jpg',
      appearsIn: ['vc-3', 'vc-3-ova'],
      blurb: 'A disgraced officer demoted to lead the penal unit Nameless on Gallia\'s dirtiest missions.'
    },
    {
      id: 'vc-riela',
      name: 'Riela Marcellis',
      role: 'Nameless recruit (VC3)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/38150.jpg',
      appearsIn: ['vc-3', 'vc-3-ova'],
      blurb: 'A new recruit to the Nameless hiding a secret about her own nature that the unit\'s missions slowly uncover.'
    },
    {
      id: 'vc-imca',
      name: 'Imca',
      role: 'Nameless soldier (VC3)',
      portraitUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b38151-N1D0uWFsIYgq.jpg',
      appearsIn: ['vc-3', 'vc-3-ova'],
      blurb: 'A Darcsen soldier with an oversized custom weapon, fighting to avenge the village a Valkyria destroyed.'
    }
  ]
}
