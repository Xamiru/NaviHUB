import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'algerian-war',
  names: [
    { text: 'Algerian War', lang: 'en', role: 'primary' },
    { text: 'حرب التحرير الجزائرية', lang: 'ar', role: 'native' },
    {
      text: 'War of Independence',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'loc-algeria-country-study-1994', loc: { section: 'War of Independence' } }
      ]
    },
    {
      text: 'guerre d’Algérie',
      lang: 'fr',
      role: 'official',
      cites: [
        {
          source: 'legifrance-loi-99-882-guerre-dalgerie',
          loc: { section: 'Loi n° 99-882 du 18 octobre 1999' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1954-11-01' },
        cites: [
          {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'War of Independence', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1962' },
        cites: [
          {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'The Generals\' Putsch', para: '4' }
          },
          {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'The Generals\' Putsch', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:algiers',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Conduct of the War', para: '5' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:french-fifth-republic' }
  ],
  sides: [
    {
      key: 'fln',
      name: 'FLN',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'War of Independence', para: '1' }
        }
      ]
    },
    {
      key: 'france',
      name: 'French army',
      polity: 'polity:french-fourth-republic',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Conduct of the War', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Pierre Mendès-France',
      role: 'head-of-government',
      side: 'france',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'War of Independence', para: '1' }
        }
      ]
    },
    {
      name: 'Jacques Massu',
      role: 'commander',
      side: 'france',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Conduct of the War', para: '5' }
        }
      ]
    },
    {
      name: 'Raoul Salan',
      role: 'commander',
      side: 'france',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Conduct of the War', para: '8' }
        }
      ]
    },
    {
      name: 'Maurice Challe',
      role: 'commander',
      side: 'france',
      cites: [
        {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Conduct of the War', para: '10' }
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
            value: { min: 300000 },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'The Generals\' Putsch', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'FLN' }
            ]
          },
          {
            value: { min: 1500000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'The Generals\' Putsch', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Algeria' }
            ]
          },
          {
            value: { min: 350000 },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'The Generals\' Putsch', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'France' }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 18000, qualifier: 'nearly' },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'The Generals\' Putsch', para: '5' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 400000, qualifier: 'over' },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'Conduct of the War', para: '6' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'fln',
      value: {
        alts: [
          {
            value: { min: 40000, qualifier: 'nearly' },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'Conduct of the War', para: '1' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 2000000, qualifier: 'over' },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'Conduct of the War', para: '9' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In the early morning hours of All Saints\' Day, November 1, 1954, FLN maquisards (guerrillas) launched attacks in various parts of Algeria against military installations, police posts, warehouses, communications facilities, and public utilities.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'War of Independence', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/28.htm' }
        },
        {
          id: 'q2',
          text: 'By 1956 France had committed more than 400,000 troops to Algeria.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'Conduct of the War', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/31.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'From Cairo, the FLN broadcast a proclamation calling on Muslims in Algeria to join in a national struggle for the "restoration of the Algerian state, sovereign, democratic, and social, within the framework of the principles of Islam."',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'War of Independence', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/28.htm' }
        },
        {
          id: 'q4',
          text: 'On November 12, he declared in the National Assembly: "One does not compromise when it comes to defending the internal peace of the nation, the unity and integrity of the Republic. The Algerian departments are part of the French Republic. They have been French for a long time, and they are irrevocably French . . . . Between them and metropolitan France there can be no conceivable secession."',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'War of Independence', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/28.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'During 1956 and 1957, the ALN successfully applied hit-and- run tactics according to the classic canons of guerrilla warfare.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'Conduct of the War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/31.htm' }
        },
        {
          id: 'q6',
          text: 'The most notable manifestation of the new urban campaign was the Battle of Algiers, which began on September 30, 1956, when three women placed bombs at three sites including the downtown office of Air France.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'Conduct of the War', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/31.htm' }
        },
        {
          id: 'q7',
          text: 'Moreover, the publicity given the brutal methods used by the army to win the Battle of Algiers, including the widespread use of torture, cast doubt in France about its role in Algeria.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'Conduct of the War', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/31.htm' }
        },
        {
          id: 'q8',
          text: 'In the three years (1957-60) during which the regroupement program was followed, more than 2 million Algerians were removed from their villages, mostly in the mountainous areas, and resettled in the plains',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'Conduct of the War', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/31.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q9',
          text: 'The FLN estimated in 1962 that nearly eight years of revolution had cost 300,000 dead from war-related causes. Algerian sources later put the figure at approximately 1.5 million dead, while French officials estimated it at 350,000. French military authorities listed their losses at nearly 18,000 dead (6,000 from noncombat-related causes) and 65,000 wounded.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'The Generals\' Putsch', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/34.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q10',
          text: 'De Gaulle pronounced Algeria an independent country on July 3. The Provisional Executive, however, proclaimed July 5, the 132d anniversary of the French entry into Algeria, as the day of national independence.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'The Generals\' Putsch', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/34.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1955' },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'Conduct of the War', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The French army resumed an important role in local Algerian administration through the Special Administration Section (Section Administrative Spécialisée--SAS), created in 1955.',
        lang: 'en',
        cite: {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'Conduct of the War', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/31.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1962-03-19' },
            cites: [
              {
                source: 'loc-algeria-country-study-1994',
                loc: { section: 'The Generals\' Putsch', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Talks with the FLN reopened at Evian in May 1961; after several false starts, the French government decreed that a cease-fire would take effect on March 19, 1962.',
        lang: 'en',
        cite: {
          source: 'loc-algeria-country-study-1994',
          loc: { section: 'The Generals\' Putsch', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/34.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Women_in_Algerian_War.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Women_in_Algerian_War.jpg',
    credit: { institution: 'Ech Chaâb' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'harbi-1985-le-fln-mirage-et-realite', perspective: 'arab' }
  ]
})
