import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'arab-revolt-nature',
  about: ['event:arab-revolt', 'person:hussein-bin-ali'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'arab-awakening',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'George Antonius' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'George Antonius (1891-1942), a prominent early scholar of the movement, furthered this notion that the revolt was a revolutionary struggle for emancipation inspired by a process of the Arabs awakening to their unique identity.',
          lang: 'en',
          cite: { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Legacy', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
          }
        }
      ]
    },
    {
      id: 'dynastic-ambition-and-british-strategy',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Alia El Bakri' },
        { kind: 'scholar', name: 'Tariq Tell' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'More recent scholarship on the revolt and the origins of Arab nationalism generally agree there is little historic evidence that Husayn was a nationalist leader motivated to rise up for the sake of the Arab nation. These works maintain that the revolt was less about true popular aspirations and more the result of Sharifian dynastic ambitions converging with British strategic interests.',
          lang: 'en',
          cite: { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Legacy', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
          }
        },
        {
          id: 'q3',
          text: 'His revolt took the form of a traditional Arabian “chieftaincy” rather than that of a modern nationalist movement.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-husayn-ibn-ali',
            loc: { section: 'Husayn and the Great Arab Revolt', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/husayn-ibn-ali-king-of-hejaz/'
          }
        }
      ]
    },
    {
      id: 'founding-myth',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Hashemite Kingdom of Jordan' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Nonetheless, the Arab Revolt has remained what Peter Wien called “the founding myth of Arab nationalism,”7 representing the Arab revolutionary spirit and the movement’s ideals of heroism and sacrifice. The events of the revolt are still glorified in official history textbooks taught in schools across much of the Arab world today.',
          lang: 'en',
          cite: { source: 'eo1418-el-bakri-arab-revolt', loc: { section: 'Legacy', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-and-rebellions-arab-revolt-ottoman-empiremiddle-east/'
          }
        }
      ]
    },
    {
      id: 'reactionary-affair',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'A later generation of Arabs' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'A later generation of Arabs came to condemn the movement he launched as a reactionary affair that had, in practice, delivered the Fertile Crescent to colonial rule.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-husayn-ibn-ali',
            loc: { section: 'The Fate of Husayn’s Revolt', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/husayn-ibn-ali-king-of-hejaz/'
          }
        }
      ]
    }
  ]
})
