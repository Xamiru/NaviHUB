import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'solidarity',
  names: [
    { text: 'Solidarity', lang: 'en', role: 'primary' },
    { text: 'Solidarność', lang: 'pl', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'movement',
  start: {
    alts: [
      {
        value: { d: '1980-08-14' },
        cites: [
          {
            source: 'ecs-how-did-solidarnosc-come-to-be',
            loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:gdansk',
      cites: [
        {
          source: 'ecs-how-did-solidarnosc-come-to-be',
          loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '7' }
        },
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Birth of Solidarity', para: '1' }
        }
      ]
    },
    {
      ref: 'place:warsaw',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '6' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  sides: [
    {
      key: 'solidarity',
      name: 'Solidarity',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Birth of Solidarity', para: '2' }
        }
      ]
    },
    {
      key: 'government',
      name: 'Polish government',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Birth of Solidarity', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:lech-walesa',
      role: 'leader',
      side: 'solidarity',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Birth of Solidarity', para: '1' }
        },
        {
          source: 'ecs-how-did-solidarnosc-come-to-be',
          loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '39' }
        }
      ]
    },
    {
      name: 'Anna Walentynowicz',
      role: 'participant',
      side: 'solidarity',
      cites: [
        {
          source: 'ecs-how-did-solidarnosc-come-to-be',
          loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '7' }
        }
      ]
    },
    {
      name: 'Bogdan Borusewicz',
      role: 'participant',
      side: 'solidarity',
      cites: [
        {
          source: 'ecs-how-did-solidarnosc-come-to-be',
          loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '19' }
        }
      ]
    },
    {
      name: 'Mieczysław Jagielski',
      role: 'negotiator',
      side: 'government',
      cites: [
        {
          source: 'ecs-how-did-solidarnosc-come-to-be',
          loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '29' }
        }
      ]
    },
    {
      name: 'Wojciech Jaruzelski',
      role: 'head-of-government',
      side: 'government',
      cites: [
        { source: 'loc-poland-country-study-1992', loc: { section: 'Jaruzelski', para: '3' } }
      ]
    },
    {
      name: 'Tadeusz Mazowiecki',
      role: 'head-of-government',
      side: 'solidarity',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The 1989 Elections', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      side: 'solidarity',
      value: {
        alts: [
          {
            value: { min: 10000000 },
            cites: [
              {
                source: 'loc-poland-country-study-1992',
                loc: { section: 'The Birth of Solidarity', para: '2' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:revolutions-of-1989',
      rel: 'led-to',
      cites: [
        { source: 'loc-poland-country-study-1992', loc: { section: 'Jaruzelski', para: '9' } }
      ]
    },
    {
      ref: 'event:perestroika-and-glasnost',
      rel: 'related',
      cites: [
        { source: 'loc-poland-country-study-1992', loc: { section: 'Jaruzelski', para: '11' } }
      ]
    },
    {
      ref: 'event:prague-spring',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-fall-of-communism-in-eastern-europe',
          loc: { section: 'Fall of Communism in Eastern Europe, 1989', para: '4' }
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
          text: 'Solidarity, the free national trade union that arose from the nucleus of the Lenin Shipyard strike was unlike anything in the previous experience of Comecon nations.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The Birth of Solidarity', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/poland/19.htm' }
        },
        {
          id: 'q2',
          text: 'On 31 August 1980, the signing of the Gdańsk Agreements marked the beginning of the first independent trade union in the communist bloc, an unprecedented act of courage that gave millions of Poles hope for dignity, justice, and freedom.',
          lang: 'en',
          cite: {
            source: 'ipn-the-anniversary-of-solidarity',
            loc: { section: 'The Anniversary of Solidarity: A Legacy of Freedom', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://eng.ipn.gov.pl/en/news/11979,The-Anniversary-of-Solidarity-A-Legacy-of-Freedom.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The increase in food prices introduced by the communist authorities on 1 July 1980 triggered a wave of short, spontaneous strikes, some of which lasted only a few hours. In July they were concentrated in the Lublin region. The authorities met the local workers’ demands, but the protests spread onto other centers. The Gdańsk Shipyard workers went on strike in mid-August.',
          lang: 'en',
          cite: {
            source: 'ipn-the-anniversary-of-solidarity',
            loc: { section: 'The Anniversary of Solidarity: A Legacy of Freedom', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://eng.ipn.gov.pl/en/news/11979,The-Anniversary-of-Solidarity-A-Legacy-of-Freedom.html'
          }
        },
        {
          id: 'q4',
          text: 'On 7 August 1980, Anna Walentynowicz, a gantry crane operator at the Gdańsk Lenin Shipyard, was summarily dismissed just months before she was due to retire. She was not the first to suffer harassment and reprisals. In January, Andrzej Kołodziej had been dismissed from the Gdańsk Shipyard; in February, Lech Wałęsa was removed from Elektromontaż (he had been handed a notice of termination from the Gdańsk Shipyard back in 1976); in March, several more workers were sacked from the Northern Shipyard. But Walentynowicz was different: she was well known, respected and active in the Free Trade Unions of the Coast (WZZ). Her dismissal was clearly a punishment for her opposition work.',
          lang: 'en',
          cite: {
            source: 'ecs-how-did-solidarnosc-come-to-be',
            loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://ecs.gda.pl/en/how-did-solidarnosc-solidarity-come-to-be/'
          }
        },
        {
          id: 'q5',
          text: 'When the government enacted new food price increases in the summer of 1980, a wave of labor unrest swept the country. Partly moved by local grievances, the workers of the Lenin Shipyard in Gdansk went on strike in mid-August. Led by electrician and veteran strike leader Lech Walesa, the strikers occupied the shipyard and issued far-reaching demands for labor reform and greater civil rights. The workers\' top priority was establishment of a trade union independent of communist party control and possessing the legal right to strike.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The Birth of Solidarity', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/poland/19.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Opposition activists decided to hold a strike in defence of the persecuted activist.',
          lang: 'en',
          cite: {
            source: 'ecs-how-did-solidarnosc-come-to-be',
            loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://ecs.gda.pl/en/how-did-solidarnosc-solidarity-come-to-be/'
          }
        },
        {
          id: 'q7',
          text: 'Despite this, on the night of 16–17 August, the Inter-Enterprise Strike Committee (MKS) was established, led by Lech Wałęsa, to coordinate the demands and strike action.',
          lang: 'en',
          cite: {
            source: 'ecs-how-did-solidarnosc-come-to-be',
            loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://ecs.gda.pl/en/how-did-solidarnosc-solidarity-come-to-be/'
          }
        },
        {
          id: 'q8',
          text: 'The final shape of the 21 Demands owed the most to Bogdan Borusewicz, who grouped and ranked them in order of priority. At the forefront were the political demands: the right to form independent trade unions, the abolition of censorship, guarantees of safety for strikers and the release of political prisoners.',
          lang: 'en',
          cite: {
            source: 'ecs-how-did-solidarnosc-come-to-be',
            loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://ecs.gda.pl/en/how-did-solidarnosc-solidarity-come-to-be/'
          }
        },
        {
          id: 'q9',
          text: 'Yet one point of contention remained: safety guarantees for the strikers. Andrzej Gwiazda, whose demands Lech Wałęsa presented to Jagielski’s Commission, insisted on such guarantees, threatening that the strike would continue unless the opposition activists were released. On that day, according to the Ministry of Internal Affairs’ statistics, the number of protesters exceeded 700,000, with more than 750 plants taking part in the August strike.',
          lang: 'en',
          cite: {
            source: 'ecs-how-did-solidarnosc-come-to-be',
            loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://ecs.gda.pl/en/how-did-solidarnosc-solidarity-come-to-be/'
          }
        },
        {
          id: 'q10',
          text: 'The release of those arrested paved the way for the signing of the Gdańsk Agreement at the Gdańsk Shipyard. The day was 31 August 1980.',
          lang: 'en',
          cite: {
            source: 'ecs-how-did-solidarnosc-come-to-be',
            loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://ecs.gda.pl/en/how-did-solidarnosc-solidarity-come-to-be/'
          }
        },
        {
          id: 'q11',
          text: 'A decisive moment for the organisation of the new trade unions came on 17 September 1980, at the Gdańsk congress of representatives of the Inter-Enterprise [trade union] Founding Committees, which had grown out of the MKS.',
          lang: 'en',
          cite: {
            source: 'ecs-how-did-solidarnosc-come-to-be',
            loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://ecs.gda.pl/en/how-did-solidarnosc-solidarity-come-to-be/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q12',
          text: 'In the sixteen months following its initial strike, Solidarity waged a difficult campaign to realize the letter and spirit of the Gdansk Agreement. This struggle fostered an openness unprecedented in a communist East European society. Although the PZPR ousted Gierek as first secretary and proclaimed its willingness to cooperate with the fledgling union, the ruling party still sought to frustrate its rival and curtail its autonomy in every possible way.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The Birth of Solidarity', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/poland/19.htm' }
        },
        {
          id: 'q13',
          text: 'In December 1981, Wojciech Jaruzelski suddenly declared martial law, ordering the army and special police units to seize control of the country, apprehend Solidarity\'s leaders, and prevent all further union activity.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'Jaruzelski', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/poland/20.htm' }
        },
        {
          id: 'q14',
          text: 'Under martial law, Jaruzelski\'s regime applied draconian restrictions on civil liberties, closed the universities, and imprisoned thousands of Solidarity activists, including Walesa.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'Jaruzelski', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/poland/20.htm' }
        },
        {
          id: 'q15',
          text: 'Time proved that Jaruzelski\'s coup had staggered Solidarity but not killed it. Adherents of the union operated underground or from jail cells, advocating a waiting game to preserve the principles of the Gdansk Agreement. Walesa in particular refused to fade into obscurity; he gained added luster by his receipt of the Nobel Prize for Peace in 1983.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'Jaruzelski', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/poland/20.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q16',
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
          id: 'q17',
          text: 'After months of haggling, the round table talks yielded a historic compromise in early 1989: Solidarity would regain legal status and the right to post candidates in parliamentary elections (with the outcome guaranteed to leave the communists a majority of seats). Although to many observers the guarantee seemed a foolish concession by Solidarity at the time, the election of June 1989 swept communists from nearly all the contested seats, demonstrating that the PZPR\'s presumed advantages in organization and funding could not overcome society\'s disapproval of its ineptitude and oppression.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The 1989 Elections', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/poland/21.htm' }
        },
        {
          id: 'q18',
          text: 'The birth of Solidarity proved to be a precursor of forces of change across all of Eastern Europe and the Soviet Union. Once again Poland was in the midst of cataclysmic European events, but in this case Poland had a decisive influence on events in neighboring countries. Beginning with the liberalization programs of Mikhail S. Gorbachev in the Soviet Union and continuing with the unforeseen and sudden demise of Poland\'s communist regime, decades of tension had been released throughout the region by the end of 1989.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'Jaruzelski', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/poland/20.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1980-08-14' },
            cites: [
              {
                source: 'ecs-how-did-solidarnosc-come-to-be',
                loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'The start date was set for 14 August.',
        lang: 'en',
        cite: {
          source: 'ecs-how-did-solidarnosc-come-to-be',
          loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://ecs.gda.pl/en/how-did-solidarnosc-solidarity-come-to-be/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-08-16' },
            cites: [
              {
                source: 'ipn-the-anniversary-of-solidarity',
                loc: { section: 'The Anniversary of Solidarity: A Legacy of Freedom', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'The Inter-Enterprise Strike Committee, established on 16 August 1980, announced 21 demands, including the right to form free trade unions, which were supported by hundreds of enterprises across Poland.',
        lang: 'en',
        cite: {
          source: 'ipn-the-anniversary-of-solidarity',
          loc: { section: 'The Anniversary of Solidarity: A Legacy of Freedom', para: '20' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://eng.ipn.gov.pl/en/news/11979,The-Anniversary-of-Solidarity-A-Legacy-of-Freedom.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-08-31' },
            cites: [
              {
                source: 'ecs-how-did-solidarnosc-come-to-be',
                loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '35' }
              },
              {
                source: 'ipn-the-anniversary-of-solidarity',
                loc: { section: 'The Anniversary of Solidarity: A Legacy of Freedom', para: '1' }
              },
              {
                source: 'loc-poland-country-study-1992',
                loc: { section: 'The Birth of Solidarity', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'With an oversized pen featuring the image of Pope John Paul II, Lech Wałęsa was the first among the members of the Inter-Enterprise Strike Committee (MKS) to sign the Gdańsk Agreement.',
        lang: 'en',
        cite: {
          source: 'ecs-how-did-solidarnosc-come-to-be',
          loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '37' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://ecs.gda.pl/en/how-did-solidarnosc-solidarity-come-to-be/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-09-17' },
            cites: [
              {
                source: 'ecs-how-did-solidarnosc-come-to-be',
                loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '39' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'Put forward by Karol Modzelewski, the organisation’s name, Solidarność (Solidarity), was also accepted, with its full form: Independent Self-Governing Trade Union ‘Solidarność.’ A provisional governing body was formed: the National Coordinating Commission (KKP), with Lech Wałęsa as its chair.',
        lang: 'en',
        cite: {
          source: 'ecs-how-did-solidarnosc-come-to-be',
          loc: { section: 'How Did Solidarność (Solidarity) Come To Be?', para: '39' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://ecs.gda.pl/en/how-did-solidarnosc-solidarity-come-to-be/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-12' },
            cites: [
              {
                source: 'loc-poland-country-study-1992',
                loc: { section: 'Jaruzelski', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'In effect, Jaruzelski executed a carefully planned and efficient military coup on behalf of the beleaguered and paralyzed the PZPR.',
        lang: 'en',
        cite: { source: 'loc-poland-country-study-1992', loc: { section: 'Jaruzelski', para: '3' } },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/poland/20.htm' }
      }
    },
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
        id: 'q24',
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
            value: { d: '1989-06-04' },
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
        id: 'q25',
        text: 'On June 4, as Chinese tanks crushed student-led protests in Beijing, Solidarity delivered a crushing electoral victory.',
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
            value: { d: '1989-08-24' },
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
        id: 'q26',
        text: 'In August 1989, the Catholic intellectual Tadeusz Mazowiecki became prime minister of a government committed to dismantling the communist system and replacing it with a Western-style democracy and a free-market economy.',
        lang: 'en',
        cite: {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The 1989 Elections', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/poland/21.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Solidarity_August_1980_gate_of_Gda%C5%84sk_Shipyard.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Solidarity_August_1980_gate_of_Gda%C5%84sk_Shipyard.jpg',
    credit: { institution: 'Znak (Polish magazine), August–September 1980 issue' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'garton-ash-1985-the-polish-revolution', perspective: 'european' }
  ]
})
