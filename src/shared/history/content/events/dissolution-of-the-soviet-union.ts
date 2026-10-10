import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'dissolution-of-the-soviet-union',
  names: [
    { text: 'Dissolution of the Soviet Union', lang: 'en', role: 'primary' },
    { text: 'Распад СССР', lang: 'ru', role: 'native' },
    {
      text: 'Collapse of the Soviet Union',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
          loc: { section: 'The Collapse of the Soviet Union', para: '0' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'dissolution',
  start: {
    alts: [
      {
        value: { d: '1991-12-25' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The August Coup and Its Aftermath', para: '5' }
          },
          {
            source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
            loc: { section: 'The Collapse of the Soviet Union', para: '12' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:moscow',
      cites: [
        {
          source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
          loc: { section: 'The Collapse of the Soviet Union', para: '12' }
        }
      ]
    },
    {
      ref: 'place:minsk',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The August Coup and Its Aftermath', para: '5' }
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
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
          loc: { section: 'The Collapse of the Soviet Union', para: '12' }
        }
      ]
    },
    {
      ref: 'person:boris-yeltsin',
      role: 'leader',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The August Coup and Its Aftermath', para: '5' }
        }
      ]
    },
    {
      name: 'Gennadiy Yanayev',
      role: 'organizer',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The August Coup and Its Aftermath', para: '1' }
        }
      ]
    },
    {
      name: 'Vladimir Kryuchkov',
      role: 'organizer',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The August Coup and Its Aftermath', para: '1' }
        }
      ]
    },
    {
      ref: 'person:george-h-w-bush',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
          loc: { section: 'The Collapse of the Soviet Union', para: '11' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:perestroika-and-glasnost',
      rel: 'caused-by',
      cites: [
        {
          source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
          loc: { section: 'The Collapse of the Soviet Union', para: '5' }
        }
      ]
    },
    {
      ref: 'event:revolutions-of-1989',
      rel: 'preceded-by',
      cites: [
        {
          source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
          loc: { section: 'The Collapse of the Soviet Union', para: '3' }
        }
      ]
    },
    {
      ref: 'event:fall-of-the-berlin-wall',
      rel: 'preceded-by',
      cites: [
        {
          source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
          loc: { section: 'The Collapse of the Soviet Union', para: '3' }
        }
      ]
    },
    {
      ref: 'event:founding-of-the-soviet-union',
      rel: 'related',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The August Coup and Its Aftermath', para: '5' }
        }
      ]
    },
    {
      ref: 'event:first-chechen-war',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '11' }
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
          text: 'On December 25, 1991, the Soviet Union ceased to exist.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The August Coup and Its Aftermath', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/20.htm' }
        },
        {
          id: 'q2',
          text: 'On December 25, 1991, the Soviet hammer and sickle flag lowered for the last time over the Kremlin, thereafter replaced by the Russian tricolor.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
            loc: { section: 'The Collapse of the Soviet Union', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/collapse-soviet-union'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The issue Gorbachev understood least of all was that of the nationalities.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Nationality Ferment', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/19.htm' }
        },
        {
          id: 'q4',
          text: 'By 1987 the Baltic republics all had developed popular fronts and were calling for the restoration of their independence.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Nationality Ferment', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/19.htm' }
        },
        {
          id: 'q5',
          text: 'Gorbachev’s decision to allow elections with a multi-party system and create a presidency for the Soviet Union began a slow process of democratization that eventually destabilized Communist control and contributed to the collapse of the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
            loc: { section: 'The Collapse of the Soviet Union', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/collapse-soviet-union'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Large public demonstrations against the coup leaders took place in Moscow and Leningrad, and divided loyalties in the defense and security establishments prevented the armed forces from crushing the resistance that Yeltsin led from Russia\'s parliament building.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The August Coup and Its Aftermath', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/20.htm' }
        },
        {
          id: 'q7',
          text: 'The unsuccessful August 1991 coup against Gorbachev sealed the fate of the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
            loc: { section: 'The Collapse of the Soviet Union', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/collapse-soviet-union'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The coup\'s failure brought a series of collapses of all-union institutions.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The August Coup and Its Aftermath', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/20.htm' }
        },
        {
          id: 'q9',
          text: 'People all over the world watched in amazement at this relatively peaceful transition from former Communist monolith into multiple separate nations.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
            loc: { section: 'The Collapse of the Soviet Union', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/milestones/1989-1992/collapse-soviet-union'
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
            value: { d: '1990-06-11' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Nationality Ferment', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On June 11, 1990, Russia issued its declaration of sovereignty, the first republic to do so after the Baltic states.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Nationality Ferment', para: '11' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/19.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-03' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Nationality Ferment', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'With tensions increasing between the center and the constituent republics, Gorbachev scheduled a national referendum in March 1991.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Nationality Ferment', para: '13' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/19.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-08-19' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The August Coup and Its Aftermath', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On August 19, 1991, one day before Gorbachev and a group of republic leaders were due to sign the union treaty, a group calling itself the State Emergency Committee attempted to seize power in Moscow.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The August Coup and Its Aftermath', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/20.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-08-21' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The August Coup and Its Aftermath', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On August 21, the coup collapsed, and Gorbachev returned to Moscow.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The August Coup and Its Aftermath', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/20.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-09' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The August Coup and Its Aftermath', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Both the Soviet Union and the United States had recognized the independence of the Baltic republics in September.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The August Coup and Its Aftermath', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/20.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-12-08' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The August Coup and Its Aftermath', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On December 8, Yeltsin and the leaders of Belarus (which adopted that name in August 1991) and Ukraine met at Minsk, the capital of Belarus, where they created the Commonwealth of Independent States (CIS--see Glossary) and annulled the 1922 union treaty that had established the Soviet Union.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The August Coup and Its Aftermath', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/20.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-12-21' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The August Coup and Its Aftermath', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Another signing ceremony was held in Alma-Ata on December 21 to expand the CIS to include the five republics of Central Asia, Armenia, and Azerbaijan.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The August Coup and Its Aftermath', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/20.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1991-12-25' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The August Coup and Its Aftermath', para: '5' }
              },
              {
                source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
                loc: { section: 'The Collapse of the Soviet Union', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Earlier in the day, Mikhail Gorbachev resigned his post as president of the Soviet Union, leaving Boris Yeltsin as president of the newly independent Russian state.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-the-collapse-of-the-soviet-union',
          loc: { section: 'The Collapse of the Soviet Union', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://history.state.gov/milestones/1989-1992/collapse-soviet-union'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/RIAN_archive_848095_Signing_the_Agreement_to_eliminate_the_USSR_and_establish_the_Commonwealth_of_Independent_States.jpg/1280px-RIAN_archive_848095_Signing_the_Agreement_to_eliminate_the_USSR_and_establish_the_Commonwealth_of_Independent_States.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:RIAN_archive_848095_Signing_the_Agreement_to_eliminate_the_USSR_and_establish_the_Commonwealth_of_Independent_States.jpg',
    credit: { institution: 'RIA Novosti archive', creator: 'U. Ivanov' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
