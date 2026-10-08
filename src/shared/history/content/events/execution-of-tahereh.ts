import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'execution-of-tahereh',
  names: [
    { text: 'Execution of Ṭāhera (Qorrat-al-ʿAyn)', lang: 'en', role: 'primary' },
    { text: 'قتل طاهره قرةالعین', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1852' },
        cites: [
          {
            source: 'iranica-calmard-aziz-khan-mokri',
            loc: { section: 'ʿAZĪZ KHAN MOKRĪ', para: '4' }
          },
          {
            source: 'iranica-afary-feminist-movements',
            loc: { section: 'FEMINIST MOVEMENTS ii. In the Late Qajar period' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-calmard-aziz-khan-mokri',
          loc: { section: 'ʿAZĪZ KHAN MOKRĪ', para: '4' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:babi-attempt-on-naser-al-din-shah',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '9' }
        }
      ]
    },
    {
      ref: 'event:badasht-conference',
      rel: 'related',
      cites: [
        {
          source: 'iranica-afary-feminist-movements',
          loc: { section: 'FEMINIST MOVEMENTS ii. In the Late Qajar period' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:tahereh-qorrat-al-ayn',
      role: 'victim',
      cites: [
        {
          source: 'iranica-calmard-aziz-khan-mokri',
          loc: { section: 'ʿAZĪZ KHAN MOKRĪ', para: '4' }
        },
        {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '9' }
        }
      ]
    },
    {
      name: 'ʿAzīz Khan Mokrī',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-calmard-aziz-khan-mokri',
          loc: { section: 'ʿAZĪZ KHAN MOKRĪ', para: '4' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '9' }
        }
      ]
    },
    {
      ref: 'person:mirza-aqa-khan-nuri',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-smith-momen-martyrs-babi',
          loc: { section: 'MARTYRS, BABI', para: '9' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Edouard-Zier-Tahirih.webp',
    page: 'https://commons.wikimedia.org/wiki/File:Edouard-Zier-Tahirih.webp',
    credit: { institution: 'Le Journal des Voyages, 5 June 1892', creator: 'Édouard Zier' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1268/1852 ʿAzīz Khan personally organized the execution of the Babi Fāṭema Barajānī Qorrat-al-ʿayn in Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-aziz-khan-mokri',
            loc: { section: 'ʿAZĪZ KHAN MOKRĪ', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/aziz-khan-mokri-sardar-e-koll/'
          }
        },
        {
          id: 'q2',
          text: 'Some other Babis, who were certainly not involved in any conspiracy, such as the poetess Ṭāhera, were also killed at this time.',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'An early manifestation of feminism took place in June 1848 in Badašt, a village on the border of Māzandarān and Khorasan, where Qorrat-al-ʿAyn (1814-1852), the outspoken Babi woman leader, removed her veil before a bewildered audience.',
          lang: 'en',
          cite: {
            source: 'iranica-afary-feminist-movements',
            loc: { section: 'FEMINIST MOVEMENTS ii. In the Late Qajar period' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/feminist-movements-i-ii/'
          }
        },
        {
          id: 'q4',
          text: 'The first known killings of Babis followed the murder of the prominent Qazvini cleric Ḥāji Mollā Moḥammad-Taqi Baraḡāni, the uncle and father-in-law of the Babi leader Ṭāhera (Qorrat-al-ʿAyn), and a leading opponent of both the Shaikhis and the Babis (October 1847).',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'More Babis were killed in the aftermath of an unsuccessful attempt on the life of the shah by a small group of Babi radicals on August 15, 1852.',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
          }
        },
        {
          id: 'q6',
          text: 'The Shah ordered a general massacre (qatl-e ʿāmm) of the Babis',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
          }
        },
        {
          id: 'q7',
          text: 'Ṭāhera was executed, probably by being suffocated, and her body thrown down a well',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The readiness of many Babis to face torture and death for their religious beliefs undoubtedly had a major impact in a society where the Karbalā tradition was so strong.',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
          }
        },
        {
          id: 'q9',
          text: 'Another consequence of the killings of Babis and of their persecutions and of the Babi upheavals was to bring the attention of Westerners to the new religion, both through diplomatic dispatches and in newspaper accounts and other published material',
          lang: 'en',
          cite: {
            source: 'iranica-smith-momen-martyrs-babi',
            loc: { section: 'MARTYRS, BABI', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/martyrs-babi-babi/'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'ivanov-1939-babidskie-vosstaniia-v-irane', perspective: 'russian-soviet' },
    { source: 'bamdad-1968-zan-e-irani', perspective: 'iranian' }
  ]
})
