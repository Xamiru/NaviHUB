import { definePerson } from '../../schema'

export default definePerson({
  id: 'jafar-sharif-emami',
  names: [
    { text: 'Jafar Sharif-Emami', lang: 'en', role: 'primary' },
    { text: 'جعفر شریف‌امامی', lang: 'fa', role: 'native', translit: 'Jaʿfar Šarif-Emāmi' }
  ],
  researched: '2026-10-09',
  died: {
    alts: [
      {
        value: { d: '1998', notAfter: '1999' },
        cites: [
          {
            source: 'lc-names-no2002044972',
            loc: { section: '670: Rijāl-i ʻaṣr-i Pahlavī, 1999- (Iranian CIP data: d. 1377 [1998 or 1999])' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1978-08-27' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1978-11-05' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Coming of the Revolution', para: '11' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater' },
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          },
          {
            value: { d: '1978-11-06' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '54' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Hamid Algar' }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '9' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Jafar_Sharif-Emami_portrait.jpg/1280px-Jafar_Sharif-Emami_portrait.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jafar_Sharif-Emami_portrait.jpg',
    credit: {
      institution: 'National Library and Archives of the Islamic Republic of Iran (dl.nlai.ir)'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Following serious urban riots in Mashad, Isfahan, and Shiraz in July and August, Jaʿfar Šarif-Emāmi, former speaker of the Senate, prime minister, and head of the Pahlavi Foundation, whose father was a cleric, is appointed prime minister of a reconciliation government.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1978' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Sharif-Emami, a former minister and prime minister and a trusted royalist, had for many years served as president of the Senate. The new prime minister adopted a policy of conciliation. He eased press controls and permitted more open debate in the Majlis. He released a number of imprisoned clerics, revoked the imperial calendar, closed gambling casinos, and obtained from the shah the dismissal from court and public office of members of the Bahai religion, a sect to which the clerics strongly objected.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        },
        {
          id: 'q3',
          text: 'Following several riots throughout Tehran as demonstrators ransack and burn government buildings, banks, and stores, Šarif-Emāmi and his civilian Cabinet resign and are replaced by a military government headed by General Ḡolām-Reżā Azhāri, the armed forces Chief of Staff; martial law and censorship of the press are imposed by the new military government.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1978' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    }
  ],
  born: {
    alts: [
      {
        value: { d: '1910' },
        cites: [
          { source: 'lc-names-no2002044972', loc: { section: 'Sharīf Imāmī, Jaʻfar, 1910-' } }
        ]
      }
    ]
  }
})
