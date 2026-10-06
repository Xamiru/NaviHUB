import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'naser-al-din-shahs-third-european-journey',
  names: [
    { text: 'Naser al-Din Shah’s third European journey', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1889' },
        cites: [
          {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '4' }
          },
          { source: 'britannica-1911-nasr-ed-din', loc: { section: 'NASR-ED-DIN', para: '1' } }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'iranica-bast-germany-diplomatic-relations',
          loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '13' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' }
  ],
  related: [
    { ref: 'event:naser-al-din-shahs-second-european-journey', rel: 'preceded-by' }
  ],
  participants: [
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        { source: 'britannica-1911-nasr-ed-din', loc: { section: 'NASR-ED-DIN', para: '1' } }
      ]
    },
    {
      ref: 'person:amin-al-soltan',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '4' }
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
          text: 'In 1873, and again in 1889, he visited England in the course of his three sumptuous journeys to Europe, 1873, 1878, 1889.',
          lang: 'en',
          cite: { source: 'britannica-1911-nasr-ed-din', loc: { section: 'NASR-ED-DIN', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Nasr-ed-Din'
          }
        },
        {
          id: 'q2',
          text: 'Encouraged by his chief minister, Mirzā Ḥosayn Khan Sepahsālār, the shah made a trip to Europe followed by two further trips, accompanied by a number of his courtiers.',
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
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'During the 1873 and 1889 royal tours of England, with the help of the British government, influential Jewish figures such as Sir Moses Montefiore, Baron Lionel de Rothschild, and Sir Albert Sassoon urged Nāṣer-al-Din Shah to improve the condition of the Persian Jewry.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '24'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q4',
          text: 'Despite the success of the Imperial Bank, the granting of the Imperial Tobacco Regie to Major Talbot in 1889 during the shah’s third European tour (later ratified in 1890) proved to be a major fiasco leading to a near revolution and the government’s public disgrace.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '34'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q5',
          text: 'At the outset it was Wolff who pushed for the granting of Tobacco concession while the shah was in England.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '34'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The only results of his contact with Western. civilization appear to have been the proclamation of religious toleration, the institution of a postal service, accession to the postal union and the establishment of a bank.',
          lang: 'en',
          cite: { source: 'britannica-1911-nasr-ed-din', loc: { section: 'NASR-ED-DIN', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Nasr-ed-Din'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1889-06-05' },
            cites: [
              {
                source: 'iranica-bast-germany-diplomatic-relations',
                loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Bismarck, who significantly enough had stayed away from Berlin during the second state visit of Nāṣer-al-Dīn Shah (5-13 June 1889), also constantly rejected British offers for joint German-British ventures in Persia (e.g., in late 1885 or in June 1888; Martin, pp. 33-37).',
        lang: 'en',
        cite: {
          source: 'iranica-bast-germany-diplomatic-relations',
          loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/germany-i'
        }
      }
    }
  ]
})
