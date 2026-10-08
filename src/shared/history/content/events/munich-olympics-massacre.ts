import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'munich-olympics-massacre',
  names: [
    { text: 'Munich massacre', lang: 'en', role: 'primary' },
    { text: 'Olympia-Attentat', lang: 'de', role: 'native' },
    { text: 'טבח מינכן', lang: 'he', role: 'alternative', translit: 'Tevach Minkhen' },
    {
      text: 'Munich Olympic massacre',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'frus1969-76ve01-ch1sub4',
          loc: {
            section: 'The Olympic Attack and the Anti-Terrorism Initiatives, September−December 1972'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1972-09-05' },
        cites: [
          { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1972-09-06' },
        cites: [
          { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:munich',
      cites: [
        { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } }
      ]
    }
  ],
  sides: [
    {
      key: 'black-september',
      name: 'Black September Organization',
      cites: [
        { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } }
      ]
    },
    {
      key: 'israel',
      name: 'Israeli Olympic team',
      cites: [
        { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Black September Organization',
      role: 'perpetrator',
      side: 'black-september',
      cites: [
        { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } }
      ]
    },
    {
      name: 'Israeli Olympic team',
      role: 'victim',
      side: 'israel',
      cites: [
        { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } }
      ]
    },
    {
      ref: 'person:richard-nixon',
      role: 'head-of-state',
      cites: [
        {
          source: 'frus1969-76ve01-ch1sub4',
          loc: {
            section: 'The Olympic Attack and the Anti-Terrorism Initiatives, September−December 1972'
          }
        }
      ]
    },
    {
      ref: 'person:henry-kissinger',
      role: 'diplomat',
      cites: [
        {
          source: 'frus1969-76ve01-ch1sub4',
          loc: {
            section: 'The Olympic Attack and the Anti-Terrorism Initiatives, September−December 1972'
          }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 11 },
            cites: [
              {
                source: 'frus1969-76ve01-ch1sub4',
                loc: {
                  section: 'The Olympic Attack and the Anti-Terrorism Initiatives, September−December 1972'
                }
              }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Office of the Historian, U.S. Department of State'
              }
            ]
          }
        ]
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Bundesarchiv_B_145_Bild-F037753-0006%2C_M%C3%BCnchen%2C_Olympische_Spiele%2C_Trauerfeier.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_B_145_Bild-F037753-0006,_M%C3%BCnchen,_Olympische_Spiele,_Trauerfeier.jpg',
    credit: { institution: 'Bundesarchiv, B 145 Bild-F037753-0006', creator: 'Ludwig Wegmann' },
    license: { id: 'cc-by-sa', version: '3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Armed with automatic rifles, members of the Black September Organization (named after Jordan’s suppression of the fedayeen uprising two years earlier) invaded the Olympic Village at the Munich games and broke into the quarters of the Israeli team early in the morning on September 5.',
          lang: 'en',
          cite: { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76v23/d307'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: 'German authorities spent hours negotiating with the guerrillas, who demanded the release of 200 Arab commandos imprisoned in Israel, before eventually providing them with helicopters to take them and their Israeli captives to an airport at Furstenfeldbruck, where a Boeing 707 airplane bound for Cairo was awaiting their arrival. The 23-hour affair ended at 1 a.m. on September 6.',
          lang: 'en',
          cite: { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76v23/d307'
          }
        },
        {
          id: 'q3',
          text: 'In an attempt to rescue the hostages, hidden German sharpshooters exchanged fire with two of the guerrillas as they moved between the helicopter and the plane. All nine of the remaining Israeli athletes as well as four of their captors died.',
          lang: 'en',
          cite: { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76v23/d307'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q4',
          text: 'The President, his Assistant for National Security Affairs Kissinger, Secretary of State Rogers, and Haig discussed how to respond to the deaths of 11 Israeli athletes in Munich.',
          lang: 'en',
          cite: {
            source: 'frus1969-76ve01-ch1sub4',
            loc: {
              section: 'The Olympic Attack and the Anti-Terrorism Initiatives, September−December 1972'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve01/ch1sub4'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The President described the membership of the Cabinet Committee to Combat Terrorism and set the scope of its activities.',
          lang: 'en',
          cite: {
            source: 'frus1969-76ve01-ch1sub4',
            loc: {
              section: 'The Olympic Attack and the Anti-Terrorism Initiatives, September−December 1972'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve01/ch1sub4'
          }
        },
        {
          id: 'q6',
          text: 'Stevenson described the new draft convention for prevention of terrorism to be circulated by the United States at the United Nations.',
          lang: 'en',
          cite: {
            source: 'frus1969-76ve01-ch1sub4',
            loc: {
              section: 'The Olympic Attack and the Anti-Terrorism Initiatives, September−December 1972'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve01/ch1sub4'
          }
        },
        {
          id: 'q7',
          text: 'De Palma and Sisco briefed Rogers on the Department’s scenario for handling the terrorism item at the UN General Assembly.',
          lang: 'en',
          cite: {
            source: 'frus1969-76ve01-ch1sub4',
            loc: {
              section: 'The Olympic Attack and the Anti-Terrorism Initiatives, September−December 1972'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve01/ch1sub4'
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
            value: { d: '1972-09-05' },
            cites: [
              { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Two of the Israeli athletes were killed immediately, and nine others were taken hostage.',
        lang: 'en',
        cite: { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/historicaldocuments/frus1969-76v23/d307'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1972-09-25' },
            cites: [
              {
                source: 'frus1969-76ve01-ch1sub4',
                loc: {
                  section: 'The Olympic Attack and the Anti-Terrorism Initiatives, September−December 1972'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The President directed the establishment of a Cabinet Committee to Combat Terrorism to be chaired by Secretary of State Rogers.',
        lang: 'en',
        cite: {
          source: 'frus1969-76ve01-ch1sub4',
          loc: {
            section: 'The Olympic Attack and the Anti-Terrorism Initiatives, September−December 1972'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/historicaldocuments/frus1969-76ve01/ch1sub4'
        }
      }
    }
  ],
  polities: [
    {
      ref: 'polity:federal-republic-of-germany',
      cites: [
        { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } }
      ]
    },
    {
      ref: 'polity:state-of-israel',
      cites: [
        { source: 'frus1969-76v23-doc-307', loc: { section: 'Document 307' } }
      ]
    },
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'frus1969-76ve01-ch1sub4',
          loc: {
            section: 'The Olympic Attack and the Anti-Terrorism Initiatives, September−December 1972'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'reeve-2011-one-day-in-september', perspective: 'european' }
  ]
})
