import { definePerson } from '../../schema'

export default definePerson({
  id: 'ahmad-shah-qajar',
  names: [
    { text: 'Ahmad Shah Qajar', lang: 'en', role: 'primary' },
    { text: 'احمدشاه قاجار', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  regions: ['iran'],
  roles: ['monarch'],
  offices: [
    {
      title: 'shah of Iran',
      start: {
        alts: [
          {
            value: { d: '1909-07-16' },
            cites: [
              {
                source: 'iranica-sheikh-ol-islami-ahmad-shah',
                loc: { section: 'AḤMAD SHAH QĀJĀR', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1925' },
            cites: [
              {
                source: 'iranica-sheikh-ol-islami-ahmad-shah',
                loc: { section: 'AḤMAD SHAH QĀJĀR', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'AḤMAD SHAH QĀJĀR (1909-1925), the seventh and last ruler of the Qajar dynasty.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        },
        {
          id: 'q2',
          text: 'Aḥmad Shah was only twelve years of age when he succeeded his father.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        },
        {
          id: 'q3',
          text: 'The shah was inexperienced, lacked a strong personality, and was too fond of spending time in Europe.',
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
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Portrait_of_Ahmad_Shah_Qajar_by_Gholamreza_Akkas.jpg/1280px-Portrait_of_Ahmad_Shah_Qajar_by_Gholamreza_Akkas.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Ahmad_Shah_Qajar_by_Gholamreza_Akkas.jpg',
    credit: {
      institution: 'Library, Museum and Document Center of the Iranian Parliament',
      creator: 'Gholamreza Akkas'
    },
    license: { id: 'public-domain' }
  }
})
