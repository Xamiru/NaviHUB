import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-nader-shah',
  names: [
    { text: 'Reign of Nader Shah', lang: 'en', role: 'primary' },
    { text: 'Nader Shah’s Iran', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1736-03-08' },
        cites: [
          { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '14' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1747-06-20' },
        cites: [
          { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '4' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1747-06-09' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Daniel Balland', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  parent: 'polity:afsharid-iran',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The decade of Nāder’s own tumultuous reign was marked by conflict, chaos, and oppressive rule.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q2',
          text: 'Nāder’s domestic policies introduced major economic, military, and social changes.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q3',
          text: 'Like Tīmūr, Nāder was a restless conqueror who neglected to lay firm administrative foundations for his far-flung ambitions.',
          lang: 'en',
          cite: { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afsharids'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'After his ascension to the throne Nāder’s main military task was the ultimate defeat of the remaining Afghan forces that had ended Safavid rule.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '22' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q5',
          text: 'After a successful offensive that culminated in the final defeat of the Mughal forces at the battle of Karnāl near Delhi in February 1739, Nāder made the Mughal emperor Moḥammad Šāh (r. 1719-48) his vassal and divested him of a large part of his fabulous riches, including the Peacock Throne and the Koh-i-Noor diamond.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '24' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q6',
          text: 'Nāder soon had to leave Iraq to suppress several domestic rebellions.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '29' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'Although Nader Shah achieved political unity, his military campaigns and extortionate taxation proved a terrible drain on a country already ravaged and depopulated by war and disorder, and in 1747 he was murdered by chiefs of his own Afshar tribe.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q8',
          text: 'Moreover, actual power was exercised for most of this sixty years not by the nominal ruler but by military leaders or other court factions, and for a brief time by Solaymān II, whose reign was an attempted Safavid restoration.',
          lang: 'en',
          cite: { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afsharids'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Nadir_Shah%2C_Victoria_%26_Albert.jpg/1280px-Nadir_Shah%2C_Victoria_%26_Albert.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nadir_Shah,_Victoria_%26_Albert.jpg',
    credit: { institution: 'Victoria and Albert Museum', creator: 'Muhammad Pana' },
    license: { id: 'public-domain' }
  }
})
