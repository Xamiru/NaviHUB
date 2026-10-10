import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-anwar-sadat',
  names: [
    { text: 'Assassination of Anwar Sadat', lang: 'en', role: 'primary' },
    { text: 'اغتيال أنور السادات', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-10',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1981-10-06' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Aftermath of Camp David and the Assassination of Sadat',
              para: '5'
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
          loc: { section: 'The Aftermath of Camp David and the Assassination of Sadat', para: '5' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:republic-of-egypt',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'The Aftermath of Camp David and the Assassination of Sadat', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:anwar-sadat',
      role: 'victim',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'The Aftermath of Camp David and the Assassination of Sadat', para: '5' }
        }
      ]
    },
    {
      name: 'Khalid al Islambuli',
      role: 'perpetrator',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'The Aftermath of Camp David and the Assassination of Sadat', para: '5' }
        }
      ]
    },
    {
      name: 'Husni Mubarak',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Husni Mubarak', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:camp-david-accords',
      rel: 'response-to',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'The Aftermath of Camp David and the Assassination of Sadat', para: '1' }
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
          text: 'On October 6, while observing a military parade commemorating the eighth anniversary of the October 1973 War, Sadat was assassinated by members of Al Jihad movement, a group of religious extremists.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Aftermath of Camp David and the Assassination of Sadat',
              para: '5'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/egypt/45.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The Camp David Accords made Sadat a hero in Europe and the United States. The reaction in Egypt was generally favorable, but there was opposition from the left and from the Muslim Brotherhood. In the Arab world, Sadat was almost universally condemned. Only Sudan issued an ambivalent statement of support. The Arab states suspended all official aid and severed diplomatic relations. Egypt was expelled from the Arab League, which it was instrumental in founding, and from other Arab institutions.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Peace with Israel', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/egypt/44.htm' }
        },
        {
          id: 'q3',
          text: 'The Camp David Accords brought peace to Egypt but not prosperity.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Aftermath of Camp David and the Assassination of Sadat',
              para: '1'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/egypt/45.htm' }
        },
        {
          id: 'q4',
          text: 'In May 1980, an impressive, nonpartisan body of citizens charged Sadat with superseding his own constitution.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Aftermath of Camp David and the Assassination of Sadat',
              para: '3'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/egypt/45.htm' }
        },
        {
          id: 'q5',
          text: 'In September 1981, Sadat ordered the biggest roundup of his opponents since he came to power, at least 1,500 people according to the official figure but more according to unofficial reports.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Aftermath of Camp David and the Assassination of Sadat',
              para: '4'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/egypt/45.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Sadat\'s assassin was Lieutenant Colonel Khalid al Islambuli.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Aftermath of Camp David and the Assassination of Sadat',
              para: '5'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/egypt/45.htm' }
        },
        {
          id: 'q7',
          text: 'The conspirators were arrested and tried.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Aftermath of Camp David and the Assassination of Sadat',
              para: '5'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/egypt/45.htm' }
        },
        {
          id: 'q8',
          text: 'One of Sadat\'s most remarkable acts during this period was the so-called Law of Shame, which was drafted at Sadat\'s express instructions.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Aftermath of Camp David and the Assassination of Sadat',
              para: '2'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/egypt/45.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Sadat\'s handpicked successor, Husni Mubarak, was overwhelmingly approved in a national referendum on October 24, 1981.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Husni Mubarak', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/egypt/46.htm' }
        },
        {
          id: 'q10',
          text: 'Whereas a number of Western leaders, including three former United States presidents, attended Sadat\'s funeral, only one member of the Arab League was represented by a head of state, Sudan. Only two, Oman and Somalia, sent representatives.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Aftermath of Camp David and the Assassination of Sadat',
              para: '6'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/egypt/45.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1981-09' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: {
                  section: 'The Aftermath of Camp David and the Assassination of Sadat',
                  para: '4'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The Muslim Brotherhood bore the brunt of the arrests.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'The Aftermath of Camp David and the Assassination of Sadat', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/egypt/45.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-11' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'Husni Mubarak', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In a speech to the People\'s Assembly in November 1981, Mubarak outlined the principles of his government\'s policy and spoke about the future he wanted for Egypt.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Husni Mubarak', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/egypt/46.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1982-04' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: {
                  section: 'The Aftermath of Camp David and the Assassination of Sadat',
                  para: '5'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In April 1982, two of the conspirators were shot and three hanged.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'The Aftermath of Camp David and the Assassination of Sadat', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/egypt/45.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Reagan_and_Sadat_1981.jpg/1280px-Reagan_and_Sadat_1981.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Reagan_and_Sadat_1981.jpg',
    credit: { institution: 'Ronald Reagan Presidential Library' },
    license: { id: 'public-domain' }
  }
})
