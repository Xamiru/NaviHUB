import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'german-reunification',
  names: [
    { text: 'German reunification', lang: 'en', role: 'primary' },
    { text: 'Deutsche Wiedervereinigung', lang: 'de', role: 'native' },
    {
      text: 'Establishment of German unity',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'treaty-on-the-establishment-of-german-unity-1990',
          loc: { section: 'Treaty on the Establishment of German Unity' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1990-10-03' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '12' }
          },
          {
            source: 'bundeskanzler-de-helmut-kohl-1982-1998',
            loc: { section: 'Helmut Kohl’s era (1982–98)', para: '20' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'treaty-on-the-establishment-of-german-unity-1990',
          loc: { section: 'Treaty on the Establishment of German Unity' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:federal-republic-of-germany' },
    { ref: 'polity:german-democratic-republic' },
    { ref: 'polity:soviet-union' },
    { ref: 'polity:united-states' },
    { ref: 'polity:united-kingdom' }
  ],
  sides: [
    {
      key: 'frg',
      name: 'Federal Republic of Germany',
      polity: 'polity:federal-republic-of-germany',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '12' }
        }
      ]
    },
    {
      key: 'gdr',
      name: 'German Democratic Republic',
      polity: 'polity:german-democratic-republic',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '12' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:helmut-kohl',
      role: 'head-of-government',
      side: 'frg',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '2' }
        }
      ]
    },
    {
      ref: 'person:mikhail-gorbachev',
      role: 'negotiator',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '6' }
        }
      ]
    },
    {
      name: 'Lothar de Maizière',
      role: 'head-of-government',
      side: 'gdr',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '3' }
        }
      ]
    },
    {
      name: 'Hans Modrow',
      role: 'head-of-government',
      side: 'gdr',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '2' }
        }
      ]
    },
    {
      ref: 'person:george-h-w-bush',
      role: 'diplomat',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '11' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:fall-of-the-berlin-wall',
      rel: 'preceded-by',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '1' }
        }
      ]
    },
    {
      ref: 'event:revolutions-of-1989',
      rel: 'preceded-by',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '3' }
        }
      ]
    },
    {
      ref: 'event:construction-of-the-berlin-wall',
      rel: 'related',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '1' }
        }
      ]
    },
    {
      ref: 'event:dissolution-of-the-soviet-union',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
          loc: { section: 'The Collapse of the Soviet Union', para: '6' }
        }
      ]
    },
    {
      ref: 'event:maastricht-treaty',
      rel: 'led-to',
      cites: [
        {
          source: 'bundeskanzler-de-helmut-kohl-1982-1998',
          loc: { section: 'Helmut Kohl’s era (1982–98)', para: '15' }
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
          text: 'At midnight on October 3, the German Democratic Republic joined the Federal Republic of Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
        },
        {
          id: 'q2',
          text: 'The two parts of Germany were reunited on 3 October 1990.',
          lang: 'en',
          cite: {
            source: 'bundeskanzler-de-helmut-kohl-1982-1998',
            loc: { section: 'Helmut Kohl’s era (1982–98)', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.bundeskanzler.de/bk-en/federal-chancellery/federal-chancellors-since-1949/helmut-kohl'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The economic collapse of East Germany led increasing numbers of East Germans to seek to emigrate to the West.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        },
        {
          id: 'q4',
          text: 'November 9, 1989, will be remembered as one of the great moments of German history.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
        },
        {
          id: 'q5',
          text: 'Although lip service in support of future unification of Germany was common in the postwar era, no one dreamed of its eventual realization.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Statements voicing concerns and even fears of a reemergence of an aggressive unified Germany suddenly appeared in the international press and media, as well as in unofficial remarks made by political figures throughout Europe.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
        },
        {
          id: 'q7',
          text: 'These talks settled questions relating to the eastern border of Germany, the strength of Germany\'s military forces, and the schedule of Allied troop withdrawal from German soil.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
        },
        {
          id: 'q8',
          text: 'On the occasion of the first free elections in the GDR, Chancellor Kohl took the opportunity to publicly express his gratitude to the United States, which had been Germany\'s most reliable ally during the process of unification.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'With the withdrawal of Red Army troops from East Germany, Gorbachev agreed to German reunification and acquiesced when a newly reunited Germany joined NATO.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
            loc: { section: 'The Collapse of the Soviet Union', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/collapse-soviet-union'
          }
        },
        {
          id: 'q10',
          text: 'It was soon clear that the first massive aid package for the East German economy, comprising DM115 billion, was just the beginning of a long and expensive rebuilding of a country reduced to shambles by the SED.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
        },
        {
          id: 'q11',
          text: 'Through the “solidarity pact” the people of Germany have since been providing the funding to ensure that living conditions in the eastern German federal states are brought more and more into line with those in the western federal states.',
          lang: 'en',
          cite: {
            source: 'bundeskanzler-de-helmut-kohl-1982-1998',
            loc: { section: 'Helmut Kohl’s era (1982–98)', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.bundeskanzler.de/bk-en/federal-chancellery/federal-chancellors-since-1949/helmut-kohl'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q12',
          text: 'In the end, the Bush administration helped broker a compromise: Germany would be part of NATO but no NATO troops would be stationed in East Germany.',
          lang: 'en',
          cite: {
            source: 'millercenter-george-h-w-bush-foreign-affairs',
            loc: { section: 'George H. W. Bush: Foreign Affairs', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/foreign-affairs'
          }
        },
        {
          id: 'q13',
          text: 'It was on account of the fact that Germany was able to reunite after 40 years of division with the consent of all its foreign policy partners and allies in peace and freedom that Helmut Kohl has become known as the “Chancellor of Unity”.',
          lang: 'en',
          cite: {
            source: 'bundeskanzler-de-helmut-kohl-1982-1998',
            loc: { section: 'Helmut Kohl’s era (1982–98)', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.bundeskanzler.de/bk-en/federal-chancellery/federal-chancellors-since-1949/helmut-kohl'
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
            value: { d: '1989-11-28' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Opening of the Berlin Wall and Unification', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'After Chancellor Kohl had presented his Ten-Point Plan for the step-by-step unification of Germany to the Bundestag on November 28, the Volkskammer struck the leadership role of the SED from the constitution of the GDR on December 1 (see Unification, ch. 8).',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-03-18' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Opening of the Berlin Wall and Unification', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The elections on March 18 produced a clear majority for the Alliance for Germany.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-05-05' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Opening of the Berlin Wall and Unification', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'As a precondition for German unity, the Two-Plus-Four Talks among the two German governments and the four victorious powers of World War II began on May 5.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-07-01' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Opening of the Berlin Wall and Unification', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The first concrete step toward unification was the monetary, economic, and social union of West Germany and East Germany on July 1, as had been agreed in May in a treaty between the two German states.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-07-16' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Opening of the Berlin Wall and Unification', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'In a cordial meeting between Gorbachev and Chancellor Kohl on July 16, unified Germany\'s membership in NATO and its full sovereignty were conceded by the Soviet president.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-09-12' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Opening of the Berlin Wall and Unification', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'Held in four sessions, the last of which was on September 12, the talks culminated in the signing of the Treaty on the Final Settlement with Respect to Germany (the Two-Plus-Four Treaty).',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-09-20' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Opening of the Berlin Wall and Unification', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'The unification treaty, consisting of more than 1,000 pages, was approved by a large majority in the Bundestag and the Volkskammer on September 20, 1990.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '12' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-10-03' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Opening of the Berlin Wall and Unification', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'Persuaded by the mounting economic and social problems that unification was necessary, the Volkskammer finally agreed on October 3, 1990, as the date of German unification.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Germany_celebrates_reunification_%287452472%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Germany_celebrates_reunification_(7452472).jpg',
    credit: { institution: 'United States Army', creator: 'Jessica Abbas, U.S. Army USAGB' },
    license: { id: 'public-domain' }
  }
})
