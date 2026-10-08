import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'hungarian-revolution-of-1956',
  names: [
    { text: 'Hungarian Revolution of 1956', lang: 'en', role: 'primary' },
    { text: '1956-os forradalom', lang: 'hu', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1956-10-23' },
        cites: [
          {
            source: 'enrs-scieranska-hungarian-revolution-1956',
            loc: { section: 'The Hungarian Revolution 1956', para: '1' }
          },
          {
            source: 'enrs-scieranska-hungarian-revolution-1956',
            loc: { section: 'The Hungarian Revolution 1956', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1956-11-10' },
        cites: [
          {
            source: 'enrs-scieranska-hungarian-revolution-1956',
            loc: { section: 'The Hungarian Revolution 1956', para: '1' }
          }
        ]
      },
      {
        value: { d: '1956-11-11' },
        cites: [
          {
            source: 'enrs-scieranska-hungarian-revolution-1956',
            loc: { section: 'The Hungarian Revolution 1956', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:budapest',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'Revolution of 1956', para: '1' }
        },
        {
          source: 'enrs-scieranska-hungarian-revolution-1956',
          loc: { section: 'The Hungarian Revolution 1956', para: '3' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  sides: [
    {
      key: 'insurgents',
      name: 'insurgents',
      cites: [
        {
          source: 'enrs-scieranska-hungarian-revolution-1956',
          loc: { section: 'The Hungarian Revolution 1956', para: '5' }
        }
      ]
    },
    {
      key: 'soviet',
      name: 'Soviets',
      polity: 'polity:soviet-union',
      cites: [
        {
          source: 'enrs-scieranska-hungarian-revolution-1956',
          loc: { section: 'The Hungarian Revolution 1956', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:imre-nagy',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'Revolution of 1956', para: '1' }
        },
        {
          source: 'enrs-scieranska-hungarian-revolution-1956',
          loc: { section: 'The Hungarian Revolution 1956', para: '4' }
        }
      ]
    },
    {
      name: 'János Kádár',
      role: 'leader',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'Revolution of 1956', para: '4' }
        }
      ]
    },
    {
      name: 'Ernő Gerő',
      role: 'leader',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'Revolution of 1956', para: '1' }
        },
        {
          source: 'enrs-scieranska-hungarian-revolution-1956',
          loc: { section: 'The Hungarian Revolution 1956', para: '3' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 200000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-hungary-country-study-1989',
                loc: { section: 'Revolution of 1956', para: '4' }
              },
              {
                source: 'enrs-scieranska-hungarian-revolution-1956',
                loc: { section: 'The Hungarian Revolution 1956', para: '6' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'executed',
      value: {
        alts: [
          {
            value: { min: 2000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-hungary-country-study-1989',
                loc: { section: 'Revolution of 1956', para: '5' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'prisoners',
      value: {
        alts: [
          {
            value: { min: 25000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-hungary-country-study-1989',
                loc: { section: 'Revolution of 1956', para: '5' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'insurgents',
      value: {
        alts: [
          {
            value: { min: 2500, qualifier: 'over' },
            cites: [
              {
                source: 'enrs-scieranska-hungarian-revolution-1956',
                loc: { section: 'The Hungarian Revolution 1956', para: '5' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      side: 'insurgents',
      value: {
        alts: [
          {
            value: { min: 20000 },
            cites: [
              {
                source: 'enrs-scieranska-hungarian-revolution-1956',
                loc: { section: 'The Hungarian Revolution 1956', para: '5' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'civilian-deaths',
      value: {
        alts: [
          {
            value: { min: 1569 },
            cites: [
              {
                source: 'enrs-scieranska-hungarian-revolution-1956',
                loc: { section: 'The Hungarian Revolution 1956', para: '5' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'soviet',
      value: {
        alts: [
          {
            value: { min: 699 },
            cites: [
              {
                source: 'enrs-scieranska-hungarian-revolution-1956',
                loc: { section: 'The Hungarian Revolution 1956', para: '5' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      side: 'soviet',
      value: {
        alts: [
          {
            value: { min: 1450 },
            cites: [
              {
                source: 'enrs-scieranska-hungarian-revolution-1956',
                loc: { section: 'The Hungarian Revolution 1956', para: '5' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:khrushchevs-secret-speech', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Hungarian Revolution, a nationwide uprising against the Soviet ruled communist system and the government of the Hungarian People’s Republic, broke out on 23 October 1956. The revolt lasted until 10 November and, despite its failure, is considered one of the most significant and tragic events in post-war Hungarian history and was the first crack in the Iron Curtain that divided the World into two hostile camps.',
          lang: 'en',
          cite: {
            source: 'enrs-scieranska-hungarian-revolution-1956',
            loc: { section: 'The Hungarian Revolution 1956', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://enrs.eu/article/the-hungarian-revolution-1956'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'After Khrushchev’s famous \'se-cret speech\' of February 1956, in which he attacked the period under Stalin\'s rule, frustration with Soviet domination was primarily expressed by the Poles. In June 1956, the demonstra-tion of steelworkers in Poznan was roughly put down by the government. However, in Octo-ber 1956, the reverberation of these events in Poznan inspired a period of change and mod-erate liberalisation, known as the "October thaw". The Polish experience encouraged many Hungarians to hope for similar concessions for Hungary.',
          lang: 'en',
          cite: {
            source: 'enrs-scieranska-hungarian-revolution-1956',
            loc: { section: 'The Hungarian Revolution 1956', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://enrs.eu/article/the-hungarian-revolution-1956'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The revolt began in Budapest as a peaceful demonstration of students. On the afternoon of 23 October 1956, a crowd of approximately 20,000 young people gathered by the statue of Józef Bem, a Hungarian-Polish hero of the 1848 Revolution. A list of sixteen demands which included a declaration of independence, the demand for the withdrawal of Soviet troops and that Hungary join the United Nations was prepared and read out. By the evening, the manifestation numbered more than 200,000 participants. Rejected by First Secretary of the Hungarian Communist Party Ernő Gerő, who expressly condemned the manifestation, the angered protesters decided to topple a 30-foot-high bronze statue of Stalin. The crowd surrounded the headquarters of the state radio station, hoping to broadcast their demands to the nation. At this time, the first shots were fired and the Hungarian revolution began.',
          lang: 'en',
          cite: {
            source: 'enrs-scieranska-hungarian-revolution-1956',
            loc: { section: 'The Hungarian Revolution 1956', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://enrs.eu/article/the-hungarian-revolution-1956'
          }
        },
        {
          id: 'q4',
          text: 'Nagy enjoyed vast support. He formed a new government consisting of both communists and noncommunists, dissolved the state security police, abolished the one-party system, and promised free elections and an end to collectivization, all with Kadar\'s support.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'Revolution of 1956', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/hungary/38.htm' }
        },
        {
          id: 'q5',
          text: 'In response, on November 1 Nagy announced Hungary\'s decision to withdraw from the Warsaw Pact and to declare Hungary neutral. He then appealed to the United Nations and Western governments for protection of Hungary\'s neutrality. The Western powers, which were involved in the Suez crisis and were without contingency plans to deal with a revolution in Eastern Europe, did not respond.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'Revolution of 1956', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/hungary/38.htm' }
        },
        {
          id: 'q6',
          text: 'The Soviet military responded to Hungarian events with a quick strike. On November 3, Soviet troops surrounded Budapest and closed the country\'s borders. Overnight they entered the capital and occupied the National Assembly building.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'Revolution of 1956', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/hungary/38.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'The insurgents put up disorganised yet formidable resistance that lasted until 11 November, when the forces of the Hungarian Army finally capitulated to the Soviets. Total casualties among the insurgents amounted to at least 2,500 killed and 20,000 wounded. In Budapest, 1,569 civilians were killed. The Soviets lost 699 soldiers and 1,450 men were wounded.',
          lang: 'en',
          cite: {
            source: 'enrs-scieranska-hungarian-revolution-1956',
            loc: { section: 'The Hungarian Revolution 1956', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://enrs.eu/article/the-hungarian-revolution-1956'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'With Soviet support, Kadar struck almost immediately against participants in the revolution. Over the next five years, about 2,000 individuals were executed and about 25,000 imprisoned. Kadar also reneged on a guarantee of safe conduct granted to Nagy, who was arrested on November 23 and deported to Romania. In June 1958, the Hungarian government announced that Nagy and other government officials who had played key roles in the revolution had been secretly tried and executed.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'Revolution of 1956', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/hungary/38.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q9',
          text: 'Despite the fact that the revolt was crushed, its consequences were long-lasting and significant for further decades – the Hungarian revolution proved that the Cold War was in deadlock and the Iron Curtain was about to fall. The Republic of Hungary was declared on the 33rd anniversary of the Revolution. 23 October is now celebrated as a national holiday in Hungary.',
          lang: 'en',
          cite: {
            source: 'enrs-scieranska-hungarian-revolution-1956',
            loc: { section: 'The Hungarian Revolution 1956', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://enrs.eu/article/the-hungarian-revolution-1956'
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
            value: { d: '1956-10-24' },
            cites: [
              {
                source: 'enrs-scieranska-hungarian-revolution-1956',
                loc: { section: 'The Hungarian Revolution 1956', para: '4' }
              }
            ]
          },
          {
            value: { d: '1956-10-25' },
            cites: [
              {
                source: 'loc-hungary-country-study-1989',
                loc: { section: 'Revolution of 1956', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On 24 October, Imre Nagy was selected as Prime Minister to satisfy the Hungarian protestors’ demands and to placate them with limited concessions. Nagy called for an end to the violence and promised reforms.',
        lang: 'en',
        cite: {
          source: 'enrs-scieranska-hungarian-revolution-1956',
          loc: { section: 'The Hungarian Revolution 1956', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://enrs.eu/article/the-hungarian-revolution-1956'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1956-11-04' },
            cites: [
              {
                source: 'enrs-scieranska-hungarian-revolution-1956',
                loc: { section: 'The Hungarian Revolution 1956', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The happiness and hope didn’t last long – on the morning of 4 November, Soviet tanks entered the capital, beginning the ‘Operation Whirlwind’ intervention led by Marshal Ivan Konev.',
        lang: 'en',
        cite: {
          source: 'enrs-scieranska-hungarian-revolution-1956',
          loc: { section: 'The Hungarian Revolution 1956', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://enrs.eu/article/the-hungarian-revolution-1956'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Budapest%2C_1956%2C_barik%C3%A1d_Verpel%C3%A9ti_%C3%BAt%2C_M%C3%B3ricz_Zsigmond_k%C3%B6rt%C3%A9r%2C_Fortepan_40039.jpg/1280px-Budapest%2C_1956%2C_barik%C3%A1d_Verpel%C3%A9ti_%C3%BAt%2C_M%C3%B3ricz_Zsigmond_k%C3%B6rt%C3%A9r%2C_Fortepan_40039.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Budapest,_1956,_barik%C3%A1d_Verpel%C3%A9ti_%C3%BAt,_M%C3%B3ricz_Zsigmond_k%C3%B6rt%C3%A9r,_Fortepan_40039.jpg',
    credit: { institution: 'Fortepan', creator: 'Nagy Gyula' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  },
  archive: [
    {
      id: 'selected-newsreel-scenes-hungarian-revolt-1956',
      mediaKind: 'video',
      title: 'Selected Newsreel Scenes On The Hungarian Revolt, Budapest, Hungary',
      date: { d: '1956' },
      url: 'https://archive.org/download/TheHungarianRevolt/Selected%20Newsreel%20Scenes%20on%20the%20Hungarian%20Revolt%20Budapest%20Hungary%20ca1956.mp4',
      page: 'https://archive.org/details/TheHungarianRevolt',
      credit: { institution: 'Internet Archive', creator: 'United States. Department of Defense' },
      license: { id: 'public-domain', url: 'https://creativecommons.org/publicdomain/mark/1.0/' },
      bytes: 111083441,
      durationSec: 410
    }
  ]
})
