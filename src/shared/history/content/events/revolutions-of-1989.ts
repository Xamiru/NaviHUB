import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'revolutions-of-1989',
  names: [
    { text: 'Revolutions of 1989', lang: 'en', role: 'primary' },
    {
      text: 'Fall of Communism in Eastern Europe, 1989',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '0' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1989-02-06' },
        cites: [
          {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1989-12-25' },
        cites: [
          {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:warsaw',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '6' }
        }
      ]
    },
    {
      ref: 'place:budapest',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '7' }
        }
      ]
    },
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '8' }
        }
      ]
    },
    {
      ref: 'place:prague',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '9' }
        }
      ]
    },
    {
      ref: 'place:bucharest',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '10' }
        }
      ]
    },
    {
      ref: 'place:timisoara',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '10' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:soviet-union' },
    { ref: 'polity:german-democratic-republic' }
  ],
  participants: [
    {
      ref: 'person:mikhail-gorbachev',
      role: 'leader',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '5' }
        }
      ]
    },
    {
      ref: 'person:lech-walesa',
      role: 'leader',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '6' }
        }
      ]
    },
    {
      ref: 'person:imre-nagy',
      role: 'participant',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '7' }
        }
      ]
    },
    {
      ref: 'person:alexander-dubcek',
      role: 'participant',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '9' }
        }
      ]
    },
    {
      name: 'Vaclav Havel',
      role: 'leader',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '9' }
        }
      ]
    },
    {
      name: 'Nicolae Ceausescu',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '10' }
        }
      ]
    },
    {
      name: 'Erich Honecker',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '8' }
        }
      ]
    },
    {
      name: 'Todor Zhivkov',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '9' }
        }
      ]
    },
    {
      name: 'Tadeusz Mazowiecki',
      role: 'head-of-government',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '6' }
        }
      ]
    },
    {
      ref: 'person:george-h-w-bush',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:solidarity',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '6' }
        }
      ]
    },
    {
      ref: 'event:fall-of-the-berlin-wall',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '8' }
        }
      ]
    },
    {
      ref: 'event:tiananmen-square-protests-of-1989',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '6' }
        }
      ]
    },
    {
      ref: 'event:prague-spring',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '9' }
        }
      ]
    },
    {
      ref: 'event:hungarian-revolution-of-1956',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '7' }
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
          text: 'By the summer of 1990, all of the former communist regimes of Eastern Europe were replaced by democratically elected governments.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        },
        {
          id: 'q2',
          text: 'By 1990, the former communist leaders were out of power, free elections were held, and Germany was whole again.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The peaceful collapse of the regimes was by no means pre-ordained. Soviet tanks crushed demonstrators in East Berlin in June 1953, in Hungary in 1956, and again in Czechoslovakia in 1968. Soviet military planners were intimately involved in the Polish planning for martial law in 1980, and Soviet troops remained stationed throughout Eastern Europe, as much a guarantee for Soviet security as an ominous reminder to Eastern European peoples of Soviet dominance over their countries.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        },
        {
          id: 'q4',
          text: 'Mikhail Gorbachev’s policies of perestroika (restructuring) and glasnost (transparency) further legitimized popular calls for reform from within. Gorbachev also made clear—at first secretly to the Eastern European leaders, then increasingly more public—that the Soviet Union had abandoned the policy of military intervention in support of communist regimes (the Brezhnev Doctrine).',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        },
        {
          id: 'q5',
          text: 'Soviet relations with Europe improved markedly during the Gorbachev period, mainly because of the INF Treaty and Soviet acquiescence to the collapse of communist rule in Eastern Europe during 1989-90.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The results of the “Round Table Talks,” signed by government and Solidarity representatives on April 4, included free elections for 35% of the Parliament (Sejm), free elections for the newly created Senate, a new office of the President, and the recognition of Solidarity as a political party.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        },
        {
          id: 'q7',
          text: 'In Hungary, drastic changes were also under way. The government, already the most liberal of the communist governments, allowed free association and assembly and ordered opening of the country’s border with the West. In doing so, it provided an avenue to escape for an ever-increasing number of East Germans. The Hungarian Party removed its long-time leader, Janos Kadar, agreed to its own version of the Round Table talks with the opposition',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        },
        {
          id: 'q8',
          text: 'Visiting Berlin in early October, Gorbachev cautioned the East German leadership of the need to reform, and confided in his advisors that East German leader Erich Honecker had to be replaced. Two weeks later, Honecker was forced to resign, while hundreds of thousands marched in protest throughout major East German cities.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        },
        {
          id: 'q9',
          text: 'As the Wall came down and the fears of a Soviet reaction receded, the dominoes started falling at a quickened pace. In October, riot police arrested hundreds in Prague after an unsanctioned demonstration; only weeks later, hundreds of thousands gathered in Prague to protest the government. Alexander Dubcek, the reformist communist who led the Prague Spring in 1968, made his first public appearance in over two decades.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        },
        {
          id: 'q10',
          text: 'Only in Romania did the events turn violent. Nicolae Ceausescu, an increasingly idiosyncratic relic of Stalinist times, refused any reforms.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q11',
          text: 'In Poland, Hungary, East Germany and Czechoslovakia, newly formed center-right parties took power for the first time since the end of World War II.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        },
        {
          id: 'q12',
          text: 'Throughout 1990 and 1991, Soviet-controlled institutions in Eastern Europe were dismantled. At the January 1990 Council for Mutual Economic Assistance (Comecon--see Glossary) summit, several East European states called for disbanding that fundamental economic organization of the Soviet empire, and the summit participants agreed to recast their multilateral ties. At the next summit, in January 1991, Comecon dissolved itself. In March 1990, Gorbachev called for converting the Warsaw Pact to a political organization, but instead the body officially disbanded in July 1991. Soviet troops were withdrawn from Central Europe over the next four years--from Czechoslovakia and Hungary by mid-1991 and from Poland in 1993.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
        },
        {
          id: 'q13',
          text: 'As a precondition for German unity, the Two-Plus-Four Talks among the two German governments and the four victorious powers of World War II began on May 5. Held in four sessions, the last of which was on September 12, the talks culminated in the signing of the Treaty on the Final Settlement with Respect to Germany',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/73.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q14',
          text: 'Meeting in Malta on December 2, Bush and Gorbachev “buried the Cold War at the bottom of the Mediterranean',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
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
            value: { d: '1989-02-06' },
            cites: [
              {
                source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
                loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On February 6, 1989, negotiations between the Polish Government and members of the underground labor union Solidarity opened officially in Warsaw.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-06-16' },
            cites: [
              {
                source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
                loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The Hungarian Party removed its long-time leader, Janos Kadar, agreed to its own version of the Round Table talks with the opposition, and, on June 16, ceremoniously re-interred Imre Nagy, the reformist communist leader of the 1956 Hungarian Revolution',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-10-23' },
            cites: [
              {
                source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
                loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'By October 23, ten months after political reforms began, Hungary adopted a new constitution allowing a multi-party system and competitive elections.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-11-09' },
            cites: [
              {
                source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
                loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On November 9, as the world watched on television, the East German Government announced the opening of all East German borders.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-12-05' },
            cites: [
              {
                source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
                loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'A new, non-communist government took the country’s reins on December 5',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-12-17' },
            cites: [
              {
                source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
                loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'On December 17 in Timisoara, the army and police fired into crowds protesting government policies, killing dozens.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-12-25' },
            cites: [
              {
                source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
                loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'The interim government, led by a reformist communist Ion Iliescu, held a quick mock trial and Ceausescu and his wife were executed on December 25.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-12-29' },
            cites: [
              {
                source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
                loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'Vaclav Havel, the famed playwright and dissident, was elected President.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Bundesarchiv_Bild_183-1989-1023-022%2C_Leipzig%2C_Montagsdemonstration.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-1989-1023-022,_Leipzig,_Montagsdemonstration.jpg',
    credit: {
      institution: 'Bundesarchiv (German Federal Archives), Bild 183-1989-1023-022',
      creator: 'Friedrich Gahlbeck'
    },
    license: {
      id: 'cc-by-sa',
      version: '3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    }
  },
  furtherReading: [
    { source: 'garton-ash-1985-the-polish-revolution', perspective: 'european' }
  ]
})
