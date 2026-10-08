import { definePerson } from '../../schema'

export default definePerson({
  id: 'nematollah-nassiri',
  names: [
    { text: 'Nematollah Nassiri', lang: 'en', role: 'primary' },
    { text: 'نعمت‌الله نصیری', lang: 'fa', role: 'native', translit: 'Neʿmat-Allāh Naṣiri' }
  ],
  researched: '2026-10-09',
  died: {
    alts: [
      {
        value: { d: '1979-02-16' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1979' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE REVOLUTION', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['military'],
  offices: [
    {
      title: 'head of SAVAK',
      polity: 'polity:pahlavi-iran',
      end: {
        alts: [
          {
            value: { d: '1978-06' },
            cites: [
              {
                source: 'pahlavi-1980-answer-to-history',
                loc: { section: 'The Unholy Alliance of Red and Black' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        },
        {
          source: 'pahlavi-1980-answer-to-history',
          loc: { section: 'The Unholy Alliance of Red and Black' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Nematulah_e-_Nasiri.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nematulah_e-_Nasiri.jpg',
    credit: { institution: 'Imperial Iranian Armed Forces' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'February 16: General Neʿmat-Allāh Naṣiri, former head of SAVAK, along with three other high-ranking generals, are executed.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1979' }
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
      kind: 'death',
      quotes: [
        {
          id: 'q3',
          text: 'The Tehran court passed death sentences on four of the shah\'s generals on February 16, 1979; all four were executed by firing squad on the roof of the building housing Khomeini\'s headquarters.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE REVOLUTION', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/23.htm' }
        }
      ]
    }
  ],
  born: {
    alts: [
      {
        value: { d: '1911' },
        cites: [
          {
            source: 'lc-names-n2006067810',
            loc: { section: 'Naṣīrī, Niʻmat Allāh, 1911-1979' }
          }
        ]
      }
    ]
  }
})
