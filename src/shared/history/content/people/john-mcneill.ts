import { definePerson } from '../../schema'

export default definePerson({
  id: 'john-mcneill',
  names: [
    { text: 'John McNeill', lang: 'en', role: 'primary' },
    {
      text: 'John MacNeill',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '18'
          }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['iran', 'europe'],
  roles: ['diplomat', 'other'],
  offices: [
    {
      title: 'British minister in Tehran',
      start: {
        alts: [
          {
            value: { d: '1836' },
            cites: [
              {
                source: 'iranica-amanat-great-britain-ii',
                loc: {
                  section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
                  para: '18'
                }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '18'
          }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Dr. John MacNeill, who was appointed as the British minister in Tehran in 1836, built his career in part on developing a network of contacts and informers among the Qajar ruling house and officials.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '18'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q1',
          text: 'The crown prince was constantly treated by his personal physicians, the Englishman MacNeill and Cormick; in 1238/1822-23 a Persian doctor, Moḥammad Mīrzā Eṣfahānī, was also consulted.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q3',
          text: 'Dr. John McNeill, who had earlier dissuaded ʿAbbās Mirzā from capturing Herat, this time warned Moḥammad Shah of British retaliation, even though he could offer for his threat little sound legal grounds',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q4',
          text: 'Soon after John McNeill’s return to Tehran as minister, a commercial treaty was signed on 28 October 1841 (Lambton, 1988, pp. 127-28).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'In the wake of his disastrous defeat, the crown prince ʿAbbās Mirzā and his Tabriz administration had to rely even more heavily on the British envoy, John Macdonald Kinneir, for financial and diplomatic assistance. This led to a great enhancement of the British status and later prompted British envoys, John McNeill and Justin Sheil, to adopt a condescending attitude toward Persia at a time when Persian confidence was at its nadir (Watson, pp. 234-35; Yapp, pp. 110-12).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Sir_John_McNeill_Wellcome_L0024699.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sir_John_McNeill_Wellcome_L0024699.jpg',
    credit: { institution: 'Wellcome Collection' },
    license: { id: 'cc-by', version: '4.0' }
  },
  archive: [
    {
      id: 'mcneill-1838',
      mediaKind: 'document',
      title: 'Progress and present position of Russia in the East',
      date: { d: '1838' },
      url: 'https://archive.org/download/progresspresentp00macn/progresspresentp00macn.pdf',
      page: 'https://archive.org/details/progresspresentp00macn',
      credit: {
        institution: 'University of Toronto, Robarts Library (Internet Archive)',
        creator: 'John McNeill'
      },
      license: { id: 'public-domain' },
      bytes: 10144418
    }
  ]
})
