import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'egyptian-revolution-of-1952',
  names: [
    { text: 'Egyptian revolution of 1952', lang: 'en', role: 'primary' },
    { text: 'ثورة 23 يوليو', lang: 'ar', role: 'native' },
    {
      text: '23 July 1952 Revolution',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'cairo-governorate-2022-07-23-sisi-marks-70th-anniversary-of-july-1952-revolution',
          loc: {
            section: 'Egypt’s president marks 70th anniversary of July 1952 Revolution',
            para: '3'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'coup',
  start: {
    alts: [
      {
        value: { d: '1952-07-23' },
        cites: [
          {
            source: 'cairo-governorate-2022-07-23-sisi-marks-70th-anniversary-of-july-1952-revolution',
            loc: {
              section: 'Egypt’s president marks 70th anniversary of July 1952 Revolution',
              para: '3'
            }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:cairo',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'On the Threshold of Revolution, 1945-52', para: '10' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:kingdom-of-egypt' }
  ],
  participants: [
    {
      ref: 'person:gamal-abdel-nasser',
      role: 'leader',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'On the Threshold of Revolution, 1945-52', para: '6' }
        }
      ]
    },
    {
      name: 'Muhammad Naguib',
      role: 'leader',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '3'
          }
        }
      ]
    },
    {
      ref: 'person:anwar-sadat',
      role: 'participant',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '1'
          }
        }
      ]
    },
    {
      name: 'King Faruk',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'On the Threshold of Revolution, 1945-52', para: '12' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:suez-crisis', rel: 'related' },
    { ref: 'event:egyptian-revolution-of-1919', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The nine men who had constituted themselves as the Committee of the Free Officers\' Movement and led the 1952 Revolution were Lieutenant Colonel Gamal Abdul Nasser, Major Abd al Hakim Amir, Lieutenant Colonel Anwar as Sadat, Major Salah Salim, Major Kamal ad Din Husayn, Wing Commander Gamal Salim, Squadron Leader Hasan Ibrahim, Major Khalid Muhi ad Din, and Wing Commander Abd al Latif al Baghdadi.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '1'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Nasser was dismayed by the inefficiency and lack of preparation of the army.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'On the Threshold of Revolution, 1945-52', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/31.htm' }
        },
        {
          id: 'q3',
          text: 'Nasser organized a clandestine group inside the army called the Free Officers. After the war against Israel, the Free Officers began to plan for a revolutionary overthrow of the government. In 1949 nine of the Free Officers formed the Committee of the Free Officers\' Movement; in 1950 Nasser was elected chairman.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'On the Threshold of Revolution, 1945-52', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/31.htm' }
        },
        {
          id: 'q4',
          text: 'The January incident led directly to "Black Saturday," January 26, 1952, which began with a mutiny by police in Cairo in protest against the death of their colleagues. Concurrently, groups of people in Cairo went on a rampage. British property and other symbols of the Western presence were attacked. By the end of the day, 750 establishments valued at £50 million had been burned or destroyed. Thirty persons were killed, including eleven British and other foreigners; hundreds were injured.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'On the Threshold of Revolution, 1945-52', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/31.htm' }
        },
        {
          id: 'q5',
          text: 'It became clear that the Egyptian ruling class had become unable to rule, and none of the radical nationalist groups was strong enough to take power. This power vacuum gave the Free Officers their opportunity.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'On the Threshold of Revolution, 1945-52', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/31.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'On July 22, the Free Officers realized that the king might be preparing to move against them. They decided to strike and seize power the next morning.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'On the Threshold of Revolution, 1945-52', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/31.htm' }
        },
        {
          id: 'q7',
          text: 'On July 26, King Faruk, forced to abdicate in favor of his infant son, sailed into exile on the same yacht on which his grandfather, Ismail, had left for exile about seventy years earlier.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'On the Threshold of Revolution, 1945-52', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/31.htm' }
        },
        {
          id: 'q8',
          text: 'After the coup, the Free Officers asked Ali Mahir, a previous prime minister, to head the government. The Free Officers formed the Revolutionary Command Council (RCC), which dictated policy to the civilian cabinet, abolished all civil titles such as pasha and bey, and ordered all political parties to purify their ranks and reconstitute their executive committees.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '2'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'That same month, the RCC passed its first major domestic measure, the Agrarian Reform Law of 1952.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '8'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
        },
        {
          id: 'q10',
          text: 'On June 18, Egypt was declared a republic, and the monarchy was abolished, ending the rule of Muhammad Ali\'s dynasty.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '10'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
        },
        {
          id: 'q11',
          text: 'By October 1954, Nasser signed an agreement providing for the withdrawal of all British troops from the base within twenty months',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '15'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1952-09-07' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: {
                  section: 'The Revolution and the Early Years of the New Government: 1952-56',
                  para: '8'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On September 7, Ali Mahir resigned, and Naguib became prime minister, minister of war, commander in chief, and president of the RCC.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '8'
          }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1953-01-17' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: {
                  section: 'The Revolution and the Early Years of the New Government: 1952-56',
                  para: '10'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On January 17, 1953, all political parties were dissolved and banned.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '10'
          }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1954-02-23' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: {
                  section: 'The Revolution and the Early Years of the New Government: 1952-56',
                  para: '11'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The conflicts came to a head on February 23, 1954 when Naguib resigned.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '11'
          }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Nasser_and_Naguib%2C_1954.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nasser_and_Naguib,_1954.jpg',
    credit: { institution: 'Bibliotheca Alexandrina' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'rafii-1989-thawrat-23-yuliyah', perspective: 'arab' },
    { source: 'nasser-1966-falsafat-al-thawrah', perspective: 'arab' }
  ]
})
