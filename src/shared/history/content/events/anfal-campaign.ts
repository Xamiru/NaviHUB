import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anfal-campaign',
  names: [
    { text: 'Anfal campaign', lang: 'en', role: 'primary' },
    {
      text: 'Al-Anfal',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Prelude to Anfal' }
        }
      ]
    },
    { text: 'الأنفال', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-10',
  type: 'genocide',
  start: {
    alts: [
      {
        value: { d: '1988-02-23' },
        cites: [
          {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Introduction' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1988-09-06' },
        cites: [
          {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Introduction' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:iraqi-kurdistan',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Introduction' }
        }
      ]
    },
    {
      ref: 'place:halabja',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Ba\'athis and Kurds' }
        }
      ]
    },
    {
      ref: 'place:kirkuk',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Prelude to Anfal' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:republic-of-iraq',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Introduction' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'iraq',
      name: 'Iraqi regime',
      polity: 'polity:republic-of-iraq',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Introduction' }
        }
      ]
    },
    {
      key: 'kurds',
      name: 'Iraqi Kurds',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Introduction' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:saddam-hussein',
      role: 'leader',
      side: 'iraq',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Introduction' }
        }
      ]
    },
    {
      name: 'Ali Hassan al-Majid',
      role: 'commander',
      side: 'iraq',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Introduction' }
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
            value: { min: 182000 },
            cites: [
              {
                source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
                loc: {
                  section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
                  para: '41'
                }
              }
            ],
            heldBy: [
              { kind: 'party', name: 'Kurdish sources' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:iran-iraq-war',
      rel: 'related',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Introduction' }
        }
      ]
    },
    {
      ref: 'event:halabja-chemical-attack',
      rel: 'related',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Introduction' }
        }
      ]
    },
    {
      ref: 'event:1991-uprisings-in-iraq',
      rel: 'led-to',
      cites: [
        {
          source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
          loc: {
            section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
            para: '41'
          }
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
          text: '"Anfal" was the name given to a concerted series of military offensives, eight in all, conducted in six distinct geographical areas between late February and early September, 1988.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Prelude to Anfal' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL2.htm'
          }
        },
        {
          id: 'q2',
          text: 'Anfal--"the Spoils"--is the name of the eighth sura of the Koran.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFALINT.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The campaigns of 1987-1989 are rooted deep in the history of the Iraqi Kurds.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFALINT.htm'
          }
        },
        {
          id: 'q4',
          text: 'While it is impossible to understand the Anfal campaign without reference to the final phase of the 1980-1988 Iran-Iraq War, Anfal was not merely a function of that war. Rather, the winding-up of the conflict on Iraq\'s terms was the immediate historical circumstance that gave Baghdad the opportunity to bring to a climax its longstanding efforts to bring the Kurds to heel. For the Iraqi regime\'s anti-Kurdish drive dated back some fifteen years or more, well before the outbreak of hostilities between Iran and Iraq.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFALINT.htm'
          }
        },
        {
          id: 'q5',
          text: 'But the logic of Ali Hassan al-Majid\'s campaign against the Kurds went far beyond the six-month long military campaign. From a human-rights perspective, the machinery of genocide was set in motion by al-Majid\'s appointment in March 1987 and its wheels continued to turn until April 1989.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Prelude to Anfal' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL2.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Anfal was also the most vivid expression of the "special powers" granted to Ali Hassan al-Majid, a cousin of President Saddam Hussein and secretary general of the Northern Bureau of Iraq\'s Ba\'ath Arab Socialist Party.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFALINT.htm'
          }
        },
        {
          id: 'q7',
          text: 'Al-Majid\'s appointment was highly significant for a number of reasons.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Prelude to Anfal' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL2.htm'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q8',
          text: 'The refugees interviewed for this report provided ample testimony about past abuses. It was difficult to find a Kurd who had not lost one or more relatives during the Anfal.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '42'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q9',
          text: 'Like Nazi Germany, the Iraqi regime concealed its actions in euphemisms.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFALINT.htm'
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
            value: { d: '1987-03-29' },
            cites: [
              {
                source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
                loc: { section: 'Introduction' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'From March 29, 1987 until April 23, 1989, al-Majid was granted power that was equivalent, in Northern Iraq, to that of the President himself, with authority over all agencies of the state.',
        lang: 'en',
        cite: {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Introduction' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFALINT.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-02-23' },
            cites: [
              {
                source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
                loc: { section: 'Introduction' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'It is also the name given by the Iraqis to a series of military actions which lasted from February 23 until September 6, 1988.',
        lang: 'en',
        cite: {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Introduction' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFALINT.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-03-16' },
            cites: [
              {
                source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
                loc: { section: 'Ba\'athis and Kurds' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In the first, the March 16 poison gas attack on the Kurdish city of Halabja, near the border with Iran, the Iranian authorities made it their business to show off the site to the international press within a few days of the bombing.',
        lang: 'en',
        cite: {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Ba\'athis and Kurds' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL1.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-08' },
            cites: [
              {
                source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
                loc: { section: 'Ba\'athis and Kurds' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The second well-publicized event was the mass exodus of at least 65,000, and perhaps as many as 80,000, Iraqi Kurdish refugees from the northern mountains of the Badinan area into the Turkish borderlands, during the final days of August.',
        lang: 'en',
        cite: {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Ba\'athis and Kurds' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL1.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Halabja_chemical_attack_monument.jpg/1280px-Halabja_chemical_attack_monument.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Halabja_chemical_attack_monument.jpg',
    credit: { creator: 'Aya sh.yusuf' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
