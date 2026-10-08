import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iranian-cultural-revolution',
  names: [
    { text: 'Cultural Revolution in Iran', lang: 'en', role: 'primary' },
    { text: 'انقلاب فرهنگی', lang: 'fa', role: 'native' },
    { text: 'ستاد انقلاب فرهنگی', lang: 'fa', role: 'alternative' },
    { text: 'Iranian Cultural Revolution', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1980-04' },
        cites: [
          { source: 'loc-iran-country-study-1987', loc: { section: 'EDUCATION', para: '9' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1981-10' },
        cites: [
          {
            source: 'iranica-ashraf-education-general-survey',
            loc: { section: 'EDUCATION vii. GENERAL SURVEY OF MODERN EDUCATION', para: '26' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ahmad Ashraf' }
        ]
      },
      {
        value: { d: '1983' },
        cites: [
          { source: 'loc-iran-country-study-1987', loc: { section: 'EDUCATION', para: '9' } },
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1983' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Federal Research Division, Library of Congress' },
          { kind: 'scholar', name: 'Ehsan Yarshater' }
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
        { source: 'loc-iran-country-study-1987', loc: { section: 'EDUCATION', para: '9' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-ashraf-education-general-survey',
          loc: { section: 'EDUCATION vii. GENERAL SURVEY OF MODERN EDUCATION', para: '26' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      cites: [
        {
          source: 'sccr-history',
          loc: { section: 'Supreme Council of the Cultural Revolution (SCCR)', para: '3' }
        }
      ]
    },
    {
      ref: 'person:ali-khamenei',
      role: 'participant',
      cites: [
        {
          source: 'sccr-history',
          loc: { section: 'Supreme Council of the Cultural Revolution (SCCR)', para: '11' }
        }
      ]
    },
    {
      ref: 'person:akbar-hashemi-rafsanjani',
      role: 'participant',
      cites: [
        {
          source: 'sccr-history',
          loc: { section: 'Supreme Council of the Cultural Revolution (SCCR)', para: '13' }
        }
      ]
    },
    {
      name: 'Reza Davari',
      role: 'participant',
      cites: [
        {
          source: 'sccr-history',
          loc: { section: 'Supreme Council of the Cultural Revolution (SCCR)', para: '13' }
        }
      ]
    },
    {
      name: 'Nasrollah Pourjavadi',
      role: 'participant',
      cites: [
        {
          source: 'sccr-history',
          loc: { section: 'Supreme Council of the Cultural Revolution (SCCR)', para: '13' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:iranian-revolution', rel: 'followed-by' },
    {
      ref: 'event:impeachment-of-abolhassan-banisadr',
      rel: 'related',
      cites: [
        {
          source: 'merip-1981-bani-sadr-interview',
          loc: { section: '“I Defeated the Ideology of the Regime”', para: '4' }
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
          text: 'The major event in Persian higher education in the 1980s was the cultural revolution (enqelāb-e farhangī); a little over a year after the revolution the government closed all universities and appointed a committee, Headquarters of the Cultural Revolution (Setād-e enqelāb-e farhangī), to prepare a program of reforms in accordance with “Islamic values.”',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-education-general-survey',
            loc: { section: 'EDUCATION vii. GENERAL SURVEY OF MODERN EDUCATION', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/education-vii-general-survey-of-modern-education'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Another concern that for long had disturbed Khomeini was the cultural alienation he discerned to be underway in Iranian universities.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '77' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q3',
          text: 'The leaders of the revolution called it a “cultural and ideological revolution,” “a revolution in values,” aimed at replacing secular and Western aspects of Persian life with a new and independent religious and political order.',
          lang: 'en',
          cite: {
            source: 'iranica-mehran-education-postrevolutionary',
            loc: {
              section: 'EDUCATION xxiv. EDUCATION IN POSTREVOLUTIONARY PERSIA, 1979-95',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/education-xxiv-education-in-postrevolutionary-persia-1979-95/'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q4',
          text: 'The call for a reform of higher education did not mean that only the religious sciences be taught in the universities, nor that sciences such as physics and mathematics have two sectors, Islamic and non-Islamic. The purpose was rather to foster Islamic morality in universities and make them independent of the West and the East.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '77' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q5',
          text: 'The university campuses became centers of conflict between students who supported a thorough desecularization of administrations, faculties, and curricula and students who wanted to retain a secular system.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'EDUCATION', para: '9' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/61.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Following disputes between University Jehād and the Ministry of Culture and Higher Education, the Supreme Council of the Cultural Revolution (Šūrā-ye ʿālī-e enqelāb-e farhangī) was founded in 1984 to supervise reconstruction of the universities',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-education-general-survey',
            loc: { section: 'EDUCATION vii. GENERAL SURVEY OF MODERN EDUCATION', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/education-vii-general-survey-of-modern-education'
          }
        },
        {
          id: 'q8',
          text: 'It resulted in the closure of Iranian universities for approximately two years and the dismissal of many professors and instructors. At the same time, with a view to lessening the dichotomy between universities and the ḥawza, university personnel were dispatched to Qom to acquaint the religious scholars with subjects little known to them before.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '77' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q10',
          text: 'Major changes included establishment of a number of new universities in provincial towns, in order to improve regional access to higher education. Dānešgāh-e tarbīat-e modarres (Teachers’-Training University) was established in 1982 in order to train instructors for colleges and universities (Dānešgāh-e enqelāb, Mehr 1363 Š./October 1984, pp. 54-57; see xix, below). Furthermore, in order to meet increasing demands for health-care workers, in 1985 medical schools were detached from universities and incorporated into the Ministry of Health',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-education-general-survey',
            loc: { section: 'EDUCATION vii. GENERAL SURVEY OF MODERN EDUCATION', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/education-vii-general-survey-of-modern-education'
          }
        },
        {
          id: 'q11',
          text: 'When the colleges resumed classes, they enrolled only a fraction of the 1979 to 1980 student body. At the University of Tehran, Iran\'s largest, student enrollment was reduced from 17,000 to 4,500; similarly large declines were registered at other institutions. The decline in the number of female students was even more dramatic: whereas on the eve of the revolution women had constituted about 40 percent of the total number of students in higher education, after 1983 they formed only 10 percent.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'EDUCATION', para: '9' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/61.htm' }
        },
        {
          id: 'q7',
          text: 'They were responsible for purging approximately 8,000 professors, about half the total university faculty members in Persia',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-education-general-survey',
            loc: { section: 'EDUCATION vii. GENERAL SURVEY OF MODERN EDUCATION', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/education-vii-general-survey-of-modern-education'
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
            value: { d: '1980-04-18' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '77' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In an address to university students on 18 April 1980, he lamented the infatuation of many professors and the students they teach with the West, and the failure of Iranian universities in their fifty years of existence to help the nation attain self-sufficiency in any of the subjects they teach.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '77' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-04' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'EDUCATION', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'There were violent clashes at several universities in the 1979-1980 school year; as a result the government closed all 200 institutes of higher learning in April 1980.',
        lang: 'en',
        cite: { source: 'loc-iran-country-study-1987', loc: { section: 'EDUCATION', para: '9' } },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/61.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-06-12' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '77' }
              },
              {
                source: 'sccr-history',
                loc: { section: 'Supreme Council of the Cultural Revolution (SCCR)', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Accordingly, in a decree issued on 12 June, Khomeini established the Cultural Revolution Headquarters (Setād-e enqelāb-e farhangi)',
        lang: 'en',
        cite: {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '77' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-10' },
            cites: [
              {
                source: 'iranica-ashraf-education-general-survey',
                loc: { section: 'EDUCATION vii. GENERAL SURVEY OF MODERN EDUCATION', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The universities reopened in October 1981, with University Jehād (Jehād-e dānešgāhī) and other Islamic groups in control of university affairs.',
        lang: 'en',
        cite: {
          source: 'iranica-ashraf-education-general-survey',
          loc: { section: 'EDUCATION vii. GENERAL SURVEY OF MODERN EDUCATION', para: '26' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/education-vii-general-survey-of-modern-education'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1983' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1983' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Universities are reopened for first time since 1980 under the strict supervision of Islamic authorities.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1983' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1984-12-09' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '77' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Hamid Algar' }
            ]
          },
          {
            value: { d: '1984-11' },
            cites: [
              {
                source: 'sccr-history',
                loc: { section: 'Supreme Council of the Cultural Revolution (SCCR)', para: '12' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Supreme Council of the Cultural Revolution' }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'It was renamed Council of the Cultural Revolution (Šurā-ye ʿāli-e enqelāb-e farhangi) on 9 December 1984.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '77' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/72/UTEH_gates.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:UTEH_gates.jpg',
    credit: { institution: 'Wikimedia Commons', creator: 'Zereshk' },
    license: { id: 'cc-by', version: '3.0', url: 'https://creativecommons.org/licenses/by/3.0' }
  },
  furtherReading: [
    { source: 'sccr-2005-bist-sal-talash-enqelab-farhangi', perspective: 'iranian' }
  ]
})
