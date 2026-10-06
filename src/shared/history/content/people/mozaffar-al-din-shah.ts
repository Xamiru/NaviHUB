import { definePerson } from '../../schema'

export default definePerson({
  id: 'mozaffar-al-din-shah',
  names: [
    { text: 'Mozaffar al-Din Shah', lang: 'en', role: 'primary' },
    { text: 'مظفرالدین شاه', lang: 'fa', role: 'native' },
    { text: 'Muzaffar ad Din', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  died: {
    alts: [
      {
        value: { d: '1907-01-08' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1907' }
          }
        ]
      },
      {
        value: { d: '1907-01-09' },
        cites: [
          {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '34' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The next Qajar king, Moẓaffar-al-Din Shah (r. 1896-1907) was a weak, pleasure-loving, simple-minded, and considerate king.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        },
        {
          id: 'q2',
          text: 'Royal extravagance and the absence of incoming revenues exacerbated financial problems. The shah quickly spent two large loans from Russia, partly on trips to Europe.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/13.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Antoin_Sevruguin_51_14_SI.jpg/1280px-Antoin_Sevruguin_51_14_SI.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Antoin_Sevruguin_51_14_SI.jpg',
    title: 'Studio Portrait of Muzaffar Al-Din Shah after Coronation',
    credit: {
      institution: 'Freer Gallery of Art and Arthur M. Sackler Gallery Archives, Smithsonian Institution',
      creator: 'Antoin Sevruguin'
    },
    license: { id: 'public-domain' }
  }
})
