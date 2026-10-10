import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'tanker-war',
  names: [
    { text: 'Tanker War', lang: 'en', role: 'primary' },
    { text: 'جنگ نفتکش‌ها', lang: 'fa', role: 'native' },
    { text: 'حرب الناقلات', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-10',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1984-03' },
        cites: [
          {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'The Tanker War, 1984-87', para: '1' }
          },
          {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '36' }
          }
        ]
      },
      {
        value: { d: '1983' },
        cites: [
          {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '35' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Saskia M. Gieling' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1988-08-20' },
        cites: [
          {
            source: 'iranica-kechichian-boundaries-iraq',
            loc: { section: 'BOUNDARIES iv. With Iraq', para: '3' }
          }
        ]
      },
      {
        value: { d: '1988-09-20' },
        cites: [
          {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '46' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:persian-gulf',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '35' }
        }
      ]
    },
    {
      ref: 'place:kharg-island',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Tanker War, 1984-87', para: '1' }
        }
      ]
    },
    {
      ref: 'place:strait-of-hormuz',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '36' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'event:iran-iraq-war',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '35' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Tanker War, 1984-87', para: '3' }
        }
      ]
    },
    {
      ref: 'polity:soviet-union',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Tanker War, 1984-87', para: '3' }
        }
      ]
    },
    {
      ref: 'polity:french-fifth-republic',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '35' }
        }
      ]
    },
    {
      ref: 'polity:saudi-arabia',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Tanker War, 1984-87', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'iran',
      name: 'Iran',
      polity: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Tanker War, 1984-87', para: '1' }
        }
      ]
    },
    {
      key: 'iraq',
      name: 'Iraq',
      polity: 'polity:republic-of-iraq',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Tanker War, 1984-87', para: '1' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'military-deaths',
      value: {
        alts: [
          {
            value: { min: 37 },
            cites: [
              {
                source: 'loc-iraq-country-study-1988',
                loc: { section: 'The Tanker War, 1984-87', para: '3' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:iran-air-flight-655',
      rel: 'related',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
        }
      ]
    },
    {
      ref: 'event:ceasefire-of-the-iran-iraq-war',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '45' }
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
          text: 'Until 1983 the war had taken place on land, but in 1983 it was expanded to the Persian Gulf by Iraq.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q2',
          text: 'In March 1984, Iraq initiated sustained naval operations in its self-declared 1,126-kilometer maritime exclusion zone, extending from the mouth of the Shatt al Arab to Iran\'s port of Bushehr.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'The Tanker War, 1984-87', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iraq/105.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Naval operations came to a halt, presumably because Iraq and Iran had lost many of their ships, by early 1981; the lull in the fighting lasted for two years.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'The Tanker War, 1984-87', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iraq/105.htm' }
        },
        {
          id: 'q4',
          text: 'By destroying Iranian oil installations, Iraq tried to undermine Iran’s economy and by obstructing the flow of oil export give a warning to the West in order to force the Iranian leadership to engage in negotiations.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Neutral merchant ships became favorite targets, and the long-range Super-Etendards flew sorties farther south.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'The Tanker War, 1984-87', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iraq/105.htm' }
        },
        {
          id: 'q6',
          text: 'Instead, in May 1984, Iran followed Iraq’s lead in attacking tankers',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q7',
          text: 'Iraq began ignoring the moratorium soon after it went into effect and stepped up its air raids on tankers serving Iran and Iranian oil-exporting facilities in 1986 and 1987, attacking even vessels that belonged to the conservative Arab states of the Persian Gulf.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'The Tanker War, 1984-87', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iraq/105.htm' }
        },
        {
          id: 'q8',
          text: 'As Kuwaiti vessels made up a large portion of the targets in these retaliatory raids, the Kuwaiti government sought protection from the international community in the fall of 1986.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'The Tanker War, 1984-87', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iraq/105.htm' }
        },
        {
          id: 'q9',
          text: 'The Soviet Union responded first, agreeing to charter several Soviet tankers to Kuwait in early 1987. Washington, which has been approached first by Kuwait and which had postponed its decision, eventually followed Moscow\'s lead.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'The Tanker War, 1984-87', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iraq/105.htm' }
        },
        {
          id: 'q10',
          text: 'A new crisis developed in June after the discovery of mines in the Persian Gulf; it was suspected that Iran was responsible. Several tankers and ships were damaged by the mines.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '40' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'In early 1988, the Gulf was a crowded theater of operations.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'The Tanker War, 1984-87', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iraq/105.htm' }
        },
        {
          id: 'q12',
          text: 'These sustained attacks cut Iranian oil exports in half, reduced shipping in the Gulf by 25 percent, led Lloyd\'s of London to increase its insurance rates on tankers, and slowed Gulf oil supplies to the rest of the world; moreover, the Saudi decision in 1984 to shoot down an Iranian Phantom jet intruding in Saudi territorial waters played an important role in ending both belligerents\' attempts to internationalize the tanker war.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'The Tanker War, 1984-87', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iraq/105.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1984-03' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In March 1984, Iraq for the first time used the Super Etendards in an attack on a Greek tanker in the Persian Gulf.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '36' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1984-06-01' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On 1 June, the Security Council accepted Resolution 552, in which attacks on ships en route to and from ports in Saudi Arabia and Kuwait were condemned.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '36' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1987-05-17' },
            cites: [
              {
                source: 'loc-iraq-country-study-1988',
                loc: { section: 'The Tanker War, 1984-87', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'United States involvement was sealed by the May 17, 1987, Iraqi missile attack on the USS Stark',
        lang: 'en',
        cite: {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'The Tanker War, 1984-87', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iraq/105.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1987-09-21' },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '40' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'On 21 September, the U.S. Navy attacked an Iranian landing-vessel, killing three people.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '40' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Damaged_USS_Stark_%28FFG-31%29_at_Bahrain_with_USS_La_Salle_%28AGF-3%29_in_May_1987.jpeg/1280px-Damaged_USS_Stark_%28FFG-31%29_at_Bahrain_with_USS_La_Salle_%28AGF-3%29_in_May_1987.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:Damaged_USS_Stark_(FFG-31)_at_Bahrain_with_USS_La_Salle_(AGF-3)_in_May_1987.jpeg',
    credit: { institution: 'U.S. Navy' },
    license: { id: 'public-domain' }
  }
})
