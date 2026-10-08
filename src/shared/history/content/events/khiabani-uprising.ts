import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'khiabani-uprising',
  names: [
    { text: 'Khiabani uprising', lang: 'en', role: 'primary' },
    { text: 'قیام شیخ محمد خیابانی', lang: 'fa', role: 'native' },
    {
      text: 'Ᾱzādisetān autonomous government',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bonakdarian-khiabani',
          loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '17' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1920-04-07' },
        cites: [
          {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '17' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1920-09-13' },
        cites: [
          {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '17' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-bonakdarian-khiabani',
          loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '17' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:mohammad-khiabani',
      role: 'leader',
      cites: [
        {
          source: 'iranica-bonakdarian-khiabani',
          loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '1' }
        }
      ]
    },
    {
      name: 'Moḥammad-Taqi Rafʿat',
      role: 'ideologue',
      cites: [
        {
          source: 'iranica-bonakdarian-khiabani',
          loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '22' }
        }
      ]
    },
    {
      name: 'Mehdiqoli Khan Moḵber-al-Salṭana Hedāyat',
      role: 'commander',
      cites: [
        {
          source: 'iranica-bonakdarian-khiabani',
          loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '29' }
        },
        {
          source: 'iranica-bonakdarian-khiabani',
          loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '30' }
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
          text: 'Shaikh Moḥammad Ḵiābāni (b. 1879), a rebellious political leader of the Democrat Party, forms a semi-independent government in Tabriz.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1920' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q2',
          text: 'The manifesto stated that the new authorities in Tabriz sought to ensure public safety and the full implementation of a constitutional system of government.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/%E1%B8%B5iabani-shaikh-mo%E1%B8%A5ammad/'
          }
        },
        {
          id: 'q3',
          text: 'The autonomous government was adamant on its provisional nature, its continued existence as an integral part of Persia, and its commitment to a national government in consultation with the Majles and within the parameters of the country’s existing constitutional laws, albeit, evidently in a loosely centralized and federated arrangement.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/%E1%B8%B5iabani-shaikh-mo%E1%B8%A5ammad/'
          }
        },
        {
          id: 'q4',
          text: 'The party adopted the recommendation of Esmāʿil Amirḵizi (q.v.), a close associate of Ḵiābāni and a veteran of the Constitutional Revolution, to change the name of the province from Azarbaijan to Ᾱzādisetān (“freedom-attaining”).',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/%E1%B8%B5iabani-shaikh-mo%E1%B8%A5ammad/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'During its short existence, the autonomous government officially recognized 1 May as International Workers’ Day, founded a number of schools with modern curricula across the province, including free schools for seniors, funded new hospital facilities and an orphanage, encouraged the development of manufacturing, initiated a number of municipal reforms, oversaw the availability of basic food necessities with price ceilings imposed on them, established a new police-training academy, and was planning to distribute agricultural land among the peasantry by extending loans for the purchase of private lands, as well as the allotment of state-owned ḵāleṣa land to peasants',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/%E1%B8%B5iabani-shaikh-mo%E1%B8%A5ammad/'
          }
        },
        {
          id: 'q6',
          text: 'While promoting principles of democracy, the new authorities were far from democratic.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/%E1%B8%B5iabani-shaikh-mo%E1%B8%A5ammad/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'The next day, the Cossack forces entered the city, meeting with only sporadic resistance that was quickly quashed.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-khiabani',
            loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/%E1%B8%B5iabani-shaikh-mo%E1%B8%A5ammad/'
          }
        },
        {
          id: 'q8',
          text: 'Moḥammad Ḵiābāni is killed by Cossack forces.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1920' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
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
            value: { d: '1920-04-09' },
            cites: [
              {
                source: 'iranica-bonakdarian-khiabani',
                loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'By 9 April, the bazaar had closed in support of the revolt, and larger crowds, including students, joined Ḵiābāni’s supporters.',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-khiabani',
          loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '21' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/%E1%B8%B5iabani-shaikh-mo%E1%B8%A5ammad/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1920-09-02' },
            cites: [
              {
                source: 'iranica-bonakdarian-khiabani',
                loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '29' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Within a short time after his arrival in Tabriz on 2 September, the Ᾱzādisetān government came to a surprisingly speedy end',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-khiabani',
          loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '29' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/%E1%B8%B5iabani-shaikh-mo%E1%B8%A5ammad/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1920-09-12' },
            cites: [
              {
                source: 'iranica-bonakdarian-khiabani',
                loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '30' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'With the main body of gendarme forces loyal to the autonomous government away from Tabriz at the time and engaged in operations against Amir Aršad in Qarādāḡ, on 12 September Hedāyat initiated his scheme for overthrowing the provincial government.',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-khiabani',
          loc: { section: 'ḴIĀBĀNI, SHAIKH MOḤAMMAD', para: '30' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/%E1%B8%B5iabani-shaikh-mo%E1%B8%A5ammad/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/89/MohammadKhiabaniAndOthers.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:MohammadKhiabaniAndOthers.jpg',
    credit: { institution: 'Digital Library of India (Internet Archive)' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'azari-1951-qiyam-e-sheikh-mohammad-khiabani', perspective: 'iranian' }
  ]
})
