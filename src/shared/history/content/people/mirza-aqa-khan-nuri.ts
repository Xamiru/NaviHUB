import { definePerson } from '../../schema'

export default definePerson({
  id: 'mirza-aqa-khan-nuri',
  names: [
    { text: 'Mirza Aqa Khan Nuri', lang: 'en', role: 'primary' },
    { text: 'میرزا آقاخان نوری', lang: 'fa', role: 'native' },
    {
      text: 'Mīrzā Āqā Khan Nūrī Eʿtemād-al-Dawla',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-hellot-bellier-france-relations',
          loc: { section: 'FRANCE iii. RELATIONS WITH PERSIA 1789-1918', para: '7' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'prime minister (ṣadr-e aʿẓam)',
      end: {
        alts: [
          {
            value: { d: '1858' },
            cites: [
              {
                source: 'iranica-amanat-great-britain-ii',
                loc: {
                  section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
                  para: '18'
                }
              },
              {
                source: 'iranica-shahvar-telegraph-i',
                loc: { section: 'TELEGRAPH i. FIRST TELEGRAPH LINES IN PERSIA', para: '2' }
              }
            ]
          },
          {
            value: { d: '1859-08-30' },
            cites: [
              {
                source: 'iranica-calmard-anglo-persian-war',
                loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '9' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Jean Calmard' }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '15' }
        },
        {
          source: 'iranica-calmard-anglo-persian-war',
          loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'In appointing Nuri, Nāṣer-al-Din Shah also hoped to regain the sympathy of the British in order to ward off the excessively haughty Russian minister in Tehran, Prince Dimitri Ivanovich Dolgoroukov.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '15'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q2',
          text: 'Once in office, Nuri, who had come to power with the blessing of the British, was obliged to adjust his orientation and shift to a more independent course of policy so as to accommodate the young Nāṣer-al-Din Shah’s aspirations for Persian sovereignty in Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q3',
          text: 'Yet he was not spared from their grudges largely because of his undeniable skills in political maneuvers and diplomatic juggling.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '15'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    }
  ]
})
