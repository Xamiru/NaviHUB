import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'fall-of-the-berlin-wall',
  names: [
    { text: 'Fall of the Berlin Wall', lang: 'en', role: 'primary' },
    { text: 'Mauerfall', lang: 'de', role: 'native' },
    {
      text: 'Opening of the Berlin Wall',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '-1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1989-11-09' },
        cites: [
          {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '1' }
          },
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '1' }
        },
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Opening of the Berlin Wall and Unification', para: '1' }
        }
      ]
    },
    {
      ref: 'place:brandenburg-gate',
      cites: [
        {
          source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
          loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November, 10 November' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:german-democratic-republic' },
    { ref: 'polity:federal-republic-of-germany' },
    { ref: 'polity:soviet-union' },
    { ref: 'polity:united-states' }
  ],
  sides: [
    {
      key: 'gdr',
      name: 'German Democratic Republic',
      polity: 'polity:german-democratic-republic',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '8' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Egon Krenz',
      role: 'head-of-state',
      side: 'gdr',
      cites: [
        {
          source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
          loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November' }
        }
      ]
    },
    {
      name: 'Günter Schabowski',
      role: 'participant',
      side: 'gdr',
      cites: [
        {
          source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
          loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November' }
        }
      ]
    },
    {
      name: 'Erich Honecker',
      role: 'participant',
      side: 'gdr',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '8' }
        }
      ]
    },
    {
      ref: 'person:helmut-kohl',
      role: 'head-of-government',
      cites: [
        {
          source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
          loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November' }
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
    },
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
      ref: 'person:ronald-reagan',
      role: 'participant',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '3' }
        }
      ]
    }
  ],
  related: [
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
      ref: 'event:revolutions-of-1989',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '1' }
        }
      ]
    },
    {
      ref: 'event:perestroika-and-glasnost',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '5' }
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
          text: 'On November 9, 1989, thousands of jubilant Germans brought down the most visible symbol of division at the heart of Europe—the Berlin Wall.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
            loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1989-1992/fall-of-communism'
          }
        },
        {
          id: 'q2',
          text: 'November 9, 1989, will be remembered as one of the great moments of German history. On that day, the dreadful Berlin Wall, which for twenty-eight years had been the symbol of German division, cutting through the heart of the old capital city, was unexpectedly opened by GDR border police.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/73.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Alarmed by the continuous population drain, the East German Politburo ordered the erection of a wall along the border between West Berlin and East Berlin. On Sunday morning, August 13, 1961, workers began building a three-meter-high concrete wall along the border of the Soviet sector of the city. Within a few hours, public transportation lines were cut, and West Berlin was sealed off from East Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Berlin Wall', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/58.htm' }
        },
        {
          id: 'q4',
          text: 'The economic collapse of East Germany led increasing numbers of East Germans to seek to emigrate to the West. Thousands sought refuge in West German embassies in other communist countries, eventually forcing the government to allow them to emigrate via special trains.',
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
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Schabowski announces the new travel regulations. When asked by a journalist when the regulations are to go into force, Schabowski answers: "As of now; immediately!"',
          lang: 'en',
          cite: {
            source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
            loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November, 6.50 p.m.' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.chronik-der-mauer.de/en/chronicle/_year1989/_month11/?month=11&year=1989&opennid=182525&moc=1'
          }
        },
        {
          id: 'q6',
          text: 'Between 500 and 1,000 people have gathered at the Bornholmer Strasse border crossing point. The State Security Service decides on a "valve solution", i.e. to let people through the border gradually.',
          lang: 'en',
          cite: {
            source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
            loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November, 9.30 p.m.' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.chronik-der-mauer.de/en/chronicle/_year1989/_month11/?month=11&year=1989&opennid=182525&moc=1'
          }
        },
        {
          id: 'q7',
          text: 'Thousands of people are pushing towards the border crossing point. The "valve solution" has proved to be unwise. When some are allowed to leave the country, the others who have to wait push and shove even more.',
          lang: 'en',
          cite: {
            source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
            loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November, 11.00 p.m.' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.chronik-der-mauer.de/en/chronicle/_year1989/_month11/?month=11&year=1989&opennid=182525&moc=1'
          }
        },
        {
          id: 'q8',
          text: 'Between 1.00 and 2.00 a.m., thousands of West and East Berliners get through the Wall at the Brandenburg Gate and walk over Pariser Platz square and through the gate. People dance for joy on the Wall.',
          lang: 'en',
          cite: {
            source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
            loc: {
              section: 'Chronicle of the Berlin Wall 1989: 9 November, 10 November, 1.00 a.m.'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.chronik-der-mauer.de/en/chronicle/_year1989/_month11/?month=11&year=1989&opennid=182525&moc=1'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'East Germans immediately began pouring into West Germany. Within a few days, over 1 million persons per day had seized the chance to see their western neighbor firsthand.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/73.htm' }
        },
        {
          id: 'q10',
          text: 'On November 13, Hans Modrow was elected minister president of the GDR. After Chancellor Kohl had presented his Ten-Point Plan for the step-by-step unification of Germany to the Bundestag on November 28, the Volkskammer struck the leadership role of the SED from the constitution of the GDR on December 1 (see Unification, ch. 8). The SED Politburo resigned on December 3, and Krenz stepped down as chairman of the Council of State on December 6. One day later, the Round Table talks started among the SED, the GDR\'s other political parties, and the opposition. On December 22, the Brandenburg Gate in Berlin was opened for pedestrian traffic.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/73.htm' }
        },
        {
          id: 'q11',
          text: 'Before the end of the month, West German Chancellor Helmut Kohl unveiled a plan for reunification of the two Germanies.',
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
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q12',
          text: 'At midnight on October 3, the German Democratic Republic joined the Federal Republic of Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/73.htm' }
        },
        {
          id: 'q13',
          text: 'Writing in his journal on November 10, 1989, Anatoly Chernyaev, foreign policy advisor to Gorbachev noted that the fall of the wall represented “a shift in the world balance of forces” and the end of Yalta.',
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
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q14',
          text: 'Good evening, ladies and gentlemen. One should be cautious with superlatives; they tend to wear out fast. But this evening it is permissible to risk one: this ninth of November is a historic day: the GDR has announced that its borders are open to everyone as of now; the gates in the Wall are wide open.',
          lang: 'en',
          cite: {
            source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
            loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November, late evening' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.chronik-der-mauer.de/en/chronicle/_year1989/_month11/?month=11&year=1989&opennid=182525&moc=1'
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
            value: { d: '1989-11-09' },
            cites: [
              {
                source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
                loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November' }
              },
              {
                source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
                loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November, 7.05 p.m.' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The news agency AP issues the news flash: "GDR opens border"',
        lang: 'en',
        cite: {
          source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
          loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November, 7.05 p.m.' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.chronik-der-mauer.de/en/chronicle/_year1989/_month11/?month=11&year=1989&opennid=182525&moc=1'
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
                source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
                loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November' }
              },
              {
                source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
                loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November, evening' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'In Washington, US President George Bush and Secretary of State James Baker hold a press conference. They have heard about the events in Berlin from agency reports.',
        lang: 'en',
        cite: {
          source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
          loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November, evening' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.chronik-der-mauer.de/en/chronicle/_year1989/_month11/?month=11&year=1989&opennid=182525&moc=1'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-11-10' },
            cites: [
              {
                source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
                loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November, 10 November' }
              },
              {
                source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
                loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November, 10 November' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The political and military leaders of the GDR do not make any public appearances during the night. The Interior Ministry announces that, as a "temporary measure", the border can be crossed upon presentation of identity cards until the next morning at 8.00 a.m.',
        lang: 'en',
        cite: {
          source: 'chronik-der-mauer-chronicle-of-the-berlin-wall-1989',
          loc: { section: 'Chronicle of the Berlin Wall 1989: 9 November, 10 November' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.chronik-der-mauer.de/en/chronicle/_year1989/_month11/?month=11&year=1989&opennid=182525&moc=1'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-12-02' },
            cites: [
              {
                source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
                loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
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
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Bundesarchiv_Bild_183-1989-1110-036%2C_Berlin%2C_DDR-Besucher_in_Westberlin.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-1989-1110-036,_Berlin,_DDR-Besucher_in_Westberlin.jpg',
    credit: {
      institution: 'Bundesarchiv (German Federal Archives), Bild 183-1989-1110-036',
      creator: 'Bernd Settnik'
    },
    license: {
      id: 'cc-by-sa',
      version: '3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    }
  },
  furtherReading: [
    { source: 'hertle-1996-chronik-des-mauerfalls', perspective: 'european' }
  ]
})
