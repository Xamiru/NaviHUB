import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'perestroika-and-glasnost',
  names: [
    { text: 'Perestroika and glasnost', lang: 'en', role: 'primary' },
    { text: 'Перестройка и гласность', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1985-03' },
        cites: [
          {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '26' }
          },
          {
            source: 'state-dept-milestones-us-soviet-relations-1981-1991',
            loc: { section: 'U.S.-Soviet Relations, 1981–1991', para: '7' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1991-12-25' },
        cites: [
          {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '31' }
          },
          {
            source: 'state-dept-milestones-us-soviet-relations-1981-1991',
            loc: { section: 'U.S.-Soviet Relations, 1981–1991', para: '11' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:moscow',
      cites: [
        {
          source: 'state-dept-milestones-us-soviet-relations-1981-1991',
          loc: { section: 'U.S.-Soviet Relations, 1981–1991', para: '7' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:soviet-union' }
  ],
  participants: [
    {
      ref: 'person:mikhail-gorbachev',
      role: 'leader',
      cites: [
        {
          source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
          loc: { section: 'Mikhail Gorbachev', para: '27' }
        }
      ]
    },
    {
      name: 'Eduard Shevardnadze',
      role: 'participant',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Gorbachev Era', para: '3' }
        }
      ]
    },
    {
      name: 'Aleksandr Yakovlev',
      role: 'participant',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '19' }
        }
      ]
    },
    {
      ref: 'person:boris-yeltsin',
      role: 'participant',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Gorbachev Era', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:chernobyl-disaster',
      rel: 'related',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '20' }
        }
      ]
    },
    {
      ref: 'event:inf-treaty',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-us-soviet-relations-1981-1991',
          loc: { section: 'U.S.-Soviet Relations, 1981–1991', para: '7' }
        }
      ]
    },
    {
      ref: 'event:revolutions-of-1989',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '5' }
        }
      ]
    },
    {
      ref: 'event:soviet-withdrawal-from-afghanistan',
      rel: 'related',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '3' }
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
          text: 'Gorbachev initiated the process of change in the Soviet Union - what was later called perestroika (1985-1991). Glasnost and openness became perestroika’s driving force.',
          lang: 'en',
          cite: {
            source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
            loc: { section: 'Mikhail Gorbachev', para: '27' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
        },
        {
          id: 'q2',
          text: 'Mikhail Gorbachev’s policies of perestroika (restructuring) and glasnost (transparency) further legitimized popular calls for reform from within.',
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
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In contrast to the uncertain handling of leadership vacancies in 1982 and 1984, upon the death of Chernenko the Politburo acted within hours to choose unanimously the healthy and relatively youthful Gorbachev as general secretary.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Gorbachev Era', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/16.htm' }
        },
        {
          id: 'q4',
          text: 'Over the course of Soviet rule, society in the Soviet Union had grown more urbanized, better educated, and more complex. Old methods of exhortation and coercion were inappropriate, yet Brezhnev\'s government had denied change rather than mastered it. Despite Andropov\'s efforts to reintroduce some measure of discipline, the communist superpower remained stagnant.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Gorbachev quickly changed the composition of the highest CPSU and government bodies, eliminating Brezhnev-era appointees and promoting allies. Among the major changes in the July 1985 Central Committee plenum, Gorbachev promoted Georgian party first secretary Eduard Shevardnadze to full membership in the Politburo and nominated him as minister of foreign affairs, while Boris N. Yeltsin made his national political debut as one of two members added to the CPSU Secretariat. In December Yeltsin advanced again, this time as first secretary of the Moscow city committee of the party.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Gorbachev Era', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/16.htm' }
        },
        {
          id: 'q6',
          text: 'Throughout the early years of his rule, Gorbachev spoke of perestroika , but only in early 1987 did the slogan become a full-scale campaign and yield practical results.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
        },
        {
          id: 'q7',
          text: 'To mobilize the populace in support of perestroika , Gorbachev and his aide Aleksandr Yakovlev introduced glasnost , a policy of liberalized information flow aimed at publicizing the corruption and inefficiency of Brezhnev\'s policies and colleagues--qualities that the Russian public long had recognized and accepted in its leadership but that had never been acknowledged by the Kremlin.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
        },
        {
          id: 'q8',
          text: 'The officially controlled phase of glasnost began the examination of "blank pages" in Soviet history.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '22' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
        },
        {
          id: 'q9',
          text: 'By 1987 Gorbachev had concluded that introducing his reforms required more than discrediting the old guard. He changed his strategy from trying to work through the CPSU as it existed and instead embraced a degree of political liberalization. In January 1987, he appealed over the heads of the party to the people and called for demokratizatsiya , the infusion of "democratic" elements into the Soviet Union\'s sterile, monolithic political process. For Gorbachev, demokratizatsiya meant the introduction of multicandidate--not multiparty--elections for local party and soviet offices. In this way, he hoped to rejuvenate the party with progressive personnel who would carry out his institutional and policy reforms. The CPSU would retain sole custody of the ballot box.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '24' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'As the government printed more money, products fetched higher prices outside the official economy. Thus, goods usually sold in state stores at fixed prices quickly disappeared as speculators snatched them up or producers ceased making deliveries. By September 1988, many staple products could not be found even in Moscow. During 1988-89 Gorbachev also issued orders to the oblast party committees to cease interfering in the economy, and he cut the staffs of state committees and ministries involved in the economy in order to prevent them from further tampering with it. Without the state and the party to hold it together and guide it, the economy went into free-fall',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/russia/17.htm' }
        },
        {
          id: 'q11',
          text: 'By revealing communist party crimes against the Soviet peoples, and the peasants in particular, glasnost further undermined Soviet federalism and contributed to the breakup of the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '22' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
        },
        {
          id: 'q12',
          text: 'As Gorbachev’s economic reforms foundered and his political base crumbled in 1991, the Bush administration increasingly engaged Russian President Boris Yeltsin. Yeltsin turned back a coup against Gorbachev in August 1991, but in subsequent months consolidated authority over political and military institutions, and increasingly supported Russian independence and dissolution of the Soviet Union. On the evening of December 25, after speaking to Gorbachev on the telephone, Bush addressed the nation from the Oval Office to announce that the Soviet Union had ceased to exist.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-us-soviet-relations-1981-1991',
            loc: { section: 'U.S.-Soviet Relations, 1981–1991', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/u.s.-soviet-relations'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q13',
          text: 'Gorbachev\'s foreign policy won him much praise and admiration. For his efforts to reduce superpower tensions around the world, he was awarded the Nobel Prize for Peace in 1990. Ironically, as a result of frequent rumors of a conservative coup, the leader of the Soviet empire, whose previous rulers had kept opposition figures Lech Walesa and Andrey Sakharov from collecting their Nobel prizes, was unable to collect his own until June 1991.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1985-03' },
            cites: [
              {
                source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
                loc: { section: 'Mikhail Gorbachev', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In March 1985 Gorbachev was elected General Secretary of the CPSU Central Committee.',
        lang: 'en',
        cite: {
          source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
          loc: { section: 'Mikhail Gorbachev', para: '26' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-02' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The Gorbachev Era', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'At the Twenty-Seventh Party Congress in February 1986, Gorbachev reaffirmed much of the existing CPSU doctrine and policies, giving little indication of future reforms.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Gorbachev Era', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/16.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1987-01' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'At a plenum of the CPSU Central Committee in January 1987, Gorbachev explicitly applied the label to his program to devolve economic and political control.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '14' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-01' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Results were disappointing, however, because workers demanded steep wage increases.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'New Thinking: Foreign Policy under Gorbachev', para: '15' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/17.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1990-03-15' },
            cites: [
              {
                source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
                loc: { section: 'Mikhail Gorbachev', para: '27' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'the Congress of People’s Deputies elected Gorbachev President of the USSR on March 15, 1990.',
        lang: 'en',
        cite: {
          source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
          loc: { section: 'Mikhail Gorbachev', para: '27' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-12-25' },
            cites: [
              {
                source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
                loc: { section: 'Mikhail Gorbachev', para: '31' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'On December 25, 1991, Gorbachev stepped down as Head of State.',
        lang: 'en',
        cite: {
          source: 'gorbachev-foundation-biography-of-mikhail-gorbachev',
          loc: { section: 'Mikhail Gorbachev', para: '31' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://www.gorby.ru/en/gorbachev/biography' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/The_Soviet_Union_1988_CPA_5941_stamp_%28Perestroika_%28reformation%29._Workers_and_slogans_Speeding_Up%2C_Democratization._and_Glasnost_against_Kremlin_Palace._Cruiser_Aurora_and_revolutionary_soldiers%29.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Soviet_Union_1988_CPA_5941_stamp_(Perestroika_(reformation)._Workers_and_slogans_Speeding_Up,_Democratization._and_Glasnost_against_Kremlin_Palace._Cruiser_Aurora_and_revolutionary_soldiers).jpg',
    credit: { institution: 'USSR Post (postage stamp of 1988)' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'matlock-2004-reagan-and-gorbachev', perspective: 'american' }
  ]
})
