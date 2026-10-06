import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-dar-al-fonun',
  names: [
    { text: 'Founding of the Dar al-Fonun', lang: 'en', role: 'primary' },
    { text: 'دارالفنون', lang: 'fa', role: 'native' },
    {
      text: 'Dar ol Fonun',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE QAJARS, 1795-1925', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1851-12-29' },
        cites: [
          {
            source: 'iranica-gurney-nabavi-dar-al-fonun',
            loc: { section: 'DĀR AL-FONŪN', para: '5' }
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
          source: 'iranica-gurney-nabavi-dar-al-fonun',
          loc: { section: 'DĀR AL-FONŪN', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:amir-kabir',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-gurney-nabavi-dar-al-fonun',
          loc: { section: 'DĀR AL-FONŪN', para: '1' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-gurney-nabavi-dar-al-fonun',
          loc: { section: 'DĀR AL-FONŪN', para: '5' }
        }
      ]
    },
    {
      name: 'Jān Dāwūd',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-gurney-nabavi-dar-al-fonun',
          loc: { section: 'DĀR AL-FONŪN', para: '4' }
        }
      ]
    },
    {
      name: 'Jacob Eduard Polak',
      role: 'participant',
      cites: [
        {
          source: 'iranica-gurney-nabavi-dar-al-fonun',
          loc: { section: 'DĀR AL-FONŪN', para: '4' }
        }
      ]
    },
    {
      ref: 'person:malkom-khan',
      role: 'participant',
      cites: [
        {
          source: 'iranica-gurney-nabavi-dar-al-fonun',
          loc: { section: 'DĀR AL-FONŪN', para: '8' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:reforms-of-amir-kabir', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'DĀR AL-FONŪN (lit., “polytechnic college”), a college founded in Tehran in 1268/1851 by Mīrzā Ṭāqī Khan Amīr-e Kabīr, which marked the begin­ning of modern education in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-gurney-nabavi-dar-al-fonun',
            loc: { section: 'DĀR AL-FONŪN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dar-al-fonun-lit'
          }
        },
        {
          id: 'q2',
          text: 'Among the various measures enacted by Amīr Kabīr, the foundation of the Dār al-Fonūn in Tehran was possibly the most lasting in its effects.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q3',
          text: 'He established a new school, the Dar ol Fonun, to educate members of the elite in the new sciences and in foreign languages.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Foreign observers also considered the school to be part of his far-reaching military reforms (U.K. Foreign Office, Public Record Office, 248/141, 16 September 1850), primarily intended to improve the cadre of officers, who were held generally responsible for the inefficiency of the Persian army.',
          lang: 'en',
          cite: {
            source: 'iranica-gurney-nabavi-dar-al-fonun',
            loc: { section: 'DĀR AL-FONŪN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dar-al-fonun-lit'
          }
        },
        {
          id: 'q5',
          text: 'It was believed that only the creation of an academy in Persia itself would permit training of sufficient numbers of men in the latest military techniques.',
          lang: 'en',
          cite: {
            source: 'iranica-gurney-nabavi-dar-al-fonun',
            loc: { section: 'DĀR AL-FONŪN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dar-al-fonun-lit'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The Austrian instructors initially knew no Persian, so interpreters had to be employed to assist in the teaching; but some among them soon learned Persian well enough to compose textbooks in the language on various natural sciences. These were to influence the evolution of a more simple and effective prose style in Persian than had previously existed.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
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
            value: { d: '1851-08-10' },
            cites: [
              {
                source: 'iranica-gurney-nabavi-dar-al-fonun',
                loc: { section: 'DĀR AL-FONŪN', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'It took further in­structions, specifying wider needs and different terms of service (12 Ramażān 1267/11 July 1851), before contracts were signed, on 12 Šawwāl 1267/10 August 1851.',
        lang: 'en',
        cite: {
          source: 'iranica-gurney-nabavi-dar-al-fonun',
          loc: { section: 'DĀR AL-FONŪN', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/dar-al-fonun-lit'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1851-11-24' },
            cites: [
              {
                source: 'iranica-gurney-nabavi-dar-al-fonun',
                loc: { section: 'DĀR AL-FONŪN', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On 29 Moḥarram 1268/24 November 1851 the group arrived in Tehran, only to learn that Amīr Kabīr had been dismissed two days earlier.',
        lang: 'en',
        cite: {
          source: 'iranica-gurney-nabavi-dar-al-fonun',
          loc: { section: 'DĀR AL-FONŪN', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/dar-al-fonun-lit'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1851-12-29' },
            cites: [
              {
                source: 'iranica-gurney-nabavi-dar-al-fonun',
                loc: { section: 'DĀR AL-FONŪN', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Responsibility for reception of the instructors and official inauguration of the new college, on 5 Rabīʿ I 1268/29 December 1851, fell to the minister of foreign affairs, Mīrzā Moḥammad-ʿAlī Khan Šīrāzī.',
        lang: 'en',
        cite: {
          source: 'iranica-gurney-nabavi-dar-al-fonun',
          loc: { section: 'DĀR AL-FONŪN', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/dar-al-fonun-lit'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Dar_ul-Funun%2C_Tehran%2C_Iran.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Dar_ul-Funun,_Tehran,_Iran.jpg',
    credit: { creator: 'Armin Abbasi' },
    license: { id: 'cc-by-sa', version: '4.0' }
  }
})
