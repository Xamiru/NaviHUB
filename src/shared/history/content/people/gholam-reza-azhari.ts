import { definePerson } from '../../schema'

export default definePerson({
  id: 'gholam-reza-azhari',
  names: [
    { text: 'Gholam-Reza Azhari', lang: 'en', role: 'primary' },
    { text: 'غلامرضا ازهاری', lang: 'fa', role: 'native', translit: 'Ḡolām-Reżā Azhāri' }
  ],
  researched: '2026-10-09',
  regions: ['iran'],
  roles: ['military', 'politician'],
  offices: [
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      start: {
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
          loc: { section: 'The Coming of the Revolution', para: '11' }
        }
      ]
    },
    {
      title: 'chief of staff of the armed forces',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        }
      ]
    },
    {
      title: 'commander of the Imperial Guard',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '11' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Gholam_Reza_Azhari_portrait.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Gholam_Reza_Azhari_portrait.jpg',
    credit: { institution: 'Center for Historical Documents Review (historydocuments.ir)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'On November 5, 1978, after violent demonstrations in Tehran, the shah replaced Sharif-Emami with General Gholam-Reza Azhari, commander of the Imperial Guard.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        },
        {
          id: 'q1',
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
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'The Azhari government did not, as expected, use coercion to bring striking government workers back to work. The strikes resumed, virtually shutting down the government, and clashes between demonstrators and troops became a daily occurrence.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    }
  ],
  born: {
    alts: [
      {
        value: { d: '1912' },
        cites: [
          {
            source: 'lc-names-n2022210643',
            loc: { section: 'Azhārī, Ghulām Riz̤ā, 1912-2001' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2001' },
        cites: [
          {
            source: 'lc-names-n2022210643',
            loc: { section: 'Azhārī, Ghulām Riz̤ā, 1912-2001' }
          }
        ]
      }
    ]
  }
})
