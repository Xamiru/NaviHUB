import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'french-conquest-of-cochinchina',
  names: [
    { text: 'French conquest of Cochinchina', lang: 'en', role: 'primary' },
    { text: 'Pháp chiếm Nam Kỳ', lang: 'vi', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1858' },
        cites: [
          {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1867-06' },
        cites: [
          {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:da-nang',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'UNDER FRENCH RULE', para: '1' }
        }
      ]
    },
    {
      ref: 'place:ho-chi-minh-city',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'UNDER FRENCH RULE', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:second-french-empire' }
  ],
  related: [
    {
      ref: 'event:sino-french-war',
      rel: 'related',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'UNDER FRENCH RULE', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:napoleon-iii',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'UNDER FRENCH RULE', para: '1' }
        }
      ]
    },
    {
      name: 'Tu Duc',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'UNDER FRENCH RULE', para: '1' }
        }
      ]
    },
    {
      name: 'Admiral de la Grandiere',
      role: 'commander',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'UNDER FRENCH RULE', para: '3' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/Prise_de_Saigon_18_Fevrier_1859_Antoine_Morel-Fatio.jpg/1280px-Prise_de_Saigon_18_Fevrier_1859_Antoine_Morel-Fatio.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Prise_de_Saigon_18_Fevrier_1859_Antoine_Morel-Fatio.jpg',
    credit: { institution: 'Musée national de la Marine', creator: 'Antoine Léon Morel-Fatio' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'By 1857 Louis-Napoleon had been persuaded that invasion was the best course of action, and French warships were instructed to take Tourane without any further efforts to negotiate with the Vietnamese.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/15.htm' }
        },
        {
          id: 'q2',
          text: 'The French navy was in the forefront of the conquest of Indochina.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/15.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The most serious foreign policy problem for the Nguyen rulers, however, was dealing with France through the French traders, missionaries, diplomats, and naval personnel who came in increasing numbers to Vietnam.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'The Nguyen Dynasty and Expanding French Influence', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/14.htm' }
        },
        {
          id: 'q4',
          text: 'In 1847 two French warships bombarded Tourane (Da Nang), destroying five Vietnamese ships and killing an estimated 10,000 Vietnamese.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'The Nguyen Dynasty and Expanding French Influence', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/14.htm' }
        },
        {
          id: 'q5',
          text: 'While the missionaries stepped up pressure on the government of Louis Napoleon (later Napoleon III), which was sympathetic to their cause, a Commission on Cochinchina made the convincing argument that France risked becoming a second-class power by not intervening.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'The Nguyen Dynasty and Expanding French Influence', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/14.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q6',
          text: 'Also current in Paris at that time was the rationalization that France had a civilizing mission--a duty to bring the benefits of its superior culture to the less fortunate lands of Asia and Africa.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/15.htm' }
        },
        {
          id: 'q7',
          text: 'The missionaries, however, had served only as an initial excuse for French intervention in Vietnam; military and economic interests soon became the primary reasons for remaining there.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/15.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'Even the French were surprised by the ease with which the Vietnamese agreed to the humiliating treaty.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/15.htm' }
        },
        {
          id: 'q9',
          text: 'Aside from the seriousness of the loss of Saigon and the possible overestimation of French strength, it appears that the isolation of the monarchy from the people created by decades of repression prevented Tu Duc and his court from attempting to rally the necessary popular support to drive out the French.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/15.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'From this period the history of Cochin-China follows that of Annam (q.v.) till 1867, when it was entirely occupied by the French and became a French colony.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cochin-china',
            loc: { section: 'COCHIN-CHINA', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cochin-China'
          }
        },
        {
          id: 'q11',
          text: 'With Cochinchina secured, French naval and mercantile interests turned to Tonkin (as the French referred to Bac Bo).',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/15.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1858' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'UNDER FRENCH RULE', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Tourane was captured in late 1858 and Gia Dinh (Saigon and later Ho Chi Minh City) in early 1859.',
        lang: 'en',
        cite: {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'UNDER FRENCH RULE', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/15.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1860' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'UNDER FRENCH RULE', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Vietnamese resistance and outbreaks of cholera and typhoid forced the French to abandon Tourane in early 1860.',
        lang: 'en',
        cite: {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'UNDER FRENCH RULE', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/15.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1861' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'UNDER FRENCH RULE', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Thus in early 1861, a French fleet of 70 ships and 3,500 men reinforced Gia Dinh and, in a series of bloody battles, gained control of the surrounding provinces.',
        lang: 'en',
        cite: {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'UNDER FRENCH RULE', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/15.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1862-06' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'UNDER FRENCH RULE', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In June 1862, Emperor Tu Duc, signed the Treaty of Saigon agreeing to French demands for the cession of three provinces around Gia Dinh (which the French had renamed Saigon) and Poulo Condore, as well as for the opening of three ports to trade, free passage of French warships up the Mekong to Cambodia, freedom of action for the missionaries, and payment of a large indemnity to France for its losses in attacking Vietnam.',
        lang: 'en',
        cite: {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'UNDER FRENCH RULE', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/15.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1863' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'UNDER FRENCH RULE', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'In 1863 Admiral de la Grandiere, the governor of Cochinchina (as the French renamed Nam Bo), forced the Cambodian king to accept a French protectorate over that country, claiming that the Treaty of Saigon had made France heir to Vietnamese claims in Cambodia.',
        lang: 'en',
        cite: {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'UNDER FRENCH RULE', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/15.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1867-06' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'UNDER FRENCH RULE', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'In June 1867, the admiral completed the annexation of Cochinchina by seizing the remaining three western provinces.',
        lang: 'en',
        cite: {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'UNDER FRENCH RULE', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/vietnam/15.htm' }
      }
    }
  ],
  furtherReading: [
    {
      source: 'brocheux-hemery-1995-indochine-la-colonisation-ambigue',
      perspective: 'european'
    }
  ]
})
