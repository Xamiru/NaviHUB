import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'coronation-of-agha-mohammad-khan-qajar',
  names: [
    { text: 'Coronation of Agha Mohammad Khan Qajar', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1796-03' },
        cites: [
          {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:mughan-steppe',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:qajar-iran',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:agha-mohammad-khan-qajar',
      role: 'leader',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:sack-of-tbilisi-1795',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    },
    {
      ref: 'event:nader-shahs-coronation-1736',
      rel: 'related',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
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
          text: 'Satisfied for the time being, the Qajar leader returned via the Moḡān steppe, the scene of Nāder Shah’s coronation. Here in Ramażān, 1210/ March, 1796, he was officially crowned shah of Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'At Karim Khan\'s death, another struggle for power among the Zands, Qajars, and other tribal groups once again plunged the country into disorder and disrupted economic life.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q3',
          text: 'Loṭf-ʿAlī Khan was betrayed to the Qajars by the governor of Bam and tortured and mutilated before being sent to Tehran for execution.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Šāhroḵ capitulated before the new ruler of Iran; he was tortured to reveal the whereabouts of his remaining jewels and sent with his younger children to Māzandarān, where he shortly died.',
          lang: 'en',
          cite: { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afsharids'
          }
        },
        {
          id: 'q5',
          text: 'The aging Šāhroḵ Shah, a puppet in the hands of the tribal leaders and his son Nāder Mīrzā (who fled to Afghanistan), was deposed',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q6',
          text: 'At the end of the 18th century, with the rapid consolidation of British leverage in the Indian subcontinent and the Persian Gulf, the emergence of a new Qajar dynasty in Persia, the shifting European balance of power throughout the region, and Persia’s growing importance as a buf-fer state between British India and Russia, among numerous other developments, Indo-Persian relations underwent fundamental transformations.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
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
            value: { d: '1796-03' },
            cites: [
              {
                source: 'iranica-perry-aga-mohammad-khan-qajar',
                loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'At Ardabīl he girded on the ceremonial sword of the Safavid shahs, leaving no doubts as to his ambitions.',
        lang: 'en',
        cite: {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/A_portrait_of_Agha_Muhammad_Khan%2C_Persia%2C_Qajar%2C_dated_1795.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_portrait_of_Agha_Muhammad_Khan,_Persia,_Qajar,_dated_1795.jpg',
    credit: { institution: 'Sotheby\'s' },
    license: { id: 'public-domain' }
  }
})
