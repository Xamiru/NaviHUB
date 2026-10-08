import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-hassan-ali-mansur',
  names: [
    { text: 'Assassination of Hassan Ali Mansur', lang: 'en', role: 'primary' },
    { text: 'ترور حسنعلی منصور', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1965-01-21' },
        cites: [
          {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '38'
            }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '7' }
          },
          {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '17' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ali Rahnema' },
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' },
          { kind: 'scholar', name: 'Abbas Milani' }
        ]
      },
      {
        value: { d: '1964' },
        cites: [
          {
            source: 'iranica-ashraf-islamic-political-movements',
            loc: {
              section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
              para: '19'
            }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ahmad Ashraf' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
          loc: {
            section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
            para: '38'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:hassan-ali-mansur',
      role: 'victim',
      cites: [
        {
          source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
          loc: {
            section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
            para: '38'
          }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'State and Society, 1964-74', para: '7' }
        }
      ]
    },
    {
      name: 'Mohammad Bokharai',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
          loc: {
            section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
            para: '38'
          }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1965' }
        }
      ]
    },
    {
      name: 'Islamic Coalition of Mourning Groups',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
          loc: {
            section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
            para: '34'
          }
        },
        {
          source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
          loc: {
            section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
            para: '35'
          }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:exile-of-ruhollah-khomeini',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-milani-hoveyda',
          loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '17' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Hassan_Ali_Mansur_2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Hassan_Ali_Mansur_2.jpg',
    credit: { institution: 'Political Studies and Research Institute (ir-psri.com)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'At around ten in the morning of 21 January 1965 Ḥassan-ʿAli Manṣur, the Prime Minister was shot twice at very close range as he got out of his car in front of the Majles by Moḥammad Boḵrāʾi who was immediately arrested;',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '38'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260407183707/https://www.iranicaonline.org/articles/jamiyat-e-motalefa-i/'
          }
        },
        {
          id: 'q2',
          text: 'Assasination of prime minister Ḥasan-ʿAli Manṣur (b. 1923) by Moḥmmad Boḵārāʾi, a member of the pro-Khomeini fundamentalist group, Jamʿiyathā-ye Moʾtalefa-ye Eslāmi.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1965' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Originally, the Armed Branch assessed the possibility of assassinating the Shah, the prime minister Manṣur, two ex-prime ministers and Shah’s confidants, Amir Assad-Allāh ʿAlam and Manučehr Eqbāl (q.v.), the police chief, General Neʿmat-Allāh Naṣiri, and General ʿAbd-al-Karim Ayādi, the Shah’s special physician who was also known to be a Bahai (ʿErāqi, p. 209; Moqaddam, p. 366). Even though there seems to have been a consensus on the assassination of the Shah, the Armed Branch reached the conclusion that in view of the Coalition’s organizational weakness and un-preparedness to take power, such an act may either lead to anarchy or enable other more disciplined and structured organizations to benefit from the situation. Afraid of the consequences of eliminating the Shah, it was therefore decided not to assassinate the Shah and focus on Manṣur (ʿErāqi, pp. 209-10).',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '34'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260407183707/https://www.iranicaonline.org/articles/jamiyat-e-motalefa-i/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'On 27 April 1965, the trial of 13 defendants accused of “attempting to overthrow the regime, murder of Ḥasan-ʿAli Manṣur, possession and sale of illegal arms and hiding the culprits” started in a military tribunal and was over on May 16, 1965.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '39'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260407183707/https://www.iranicaonline.org/articles/jamiyat-e-motalefa-i/'
          }
        },
        {
          id: 'q5',
          text: 'The operational team of Boḵrāʾi, Niknežād and Ṣaffār Harandi, in addition to the Amāni brothers and ʿErāqi were sentenced to death and the remaining seven, including Anwāri were given prison terms. On 15 June ʿErāqi and Hāšem Amāni’s death sentences were commuted to life imprisonment, while the other four were executed on 16 June 1965 (Moqaddam, p. 384-85).',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '39'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260407183707/https://www.iranicaonline.org/articles/jamiyat-e-motalefa-i/'
          }
        },
        {
          id: 'q6',
          text: 'The shah appointed Hoveyda to lead the cabinet, while Manṣur was undergoing treatment. He was certainly an odd choice; he had little experience in government; he had not been close to the shah or any member of the royal family; but all of this mattered little, since the appointment was generally assumed to be only for a few days. When on 26 January Manṣur died as the result of post-surgical complications, Hoveyda was, this time officially, appointed by the shah to form a new cabinet.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20261002185029/https://www.iranicaonline.org/articles/hoveyda-amir-abbas/'
          }
        }
      ]
    }
  ]
})
