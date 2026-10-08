import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'helsinki-accords',
  names: [
    { text: 'Helsinki Final Act', lang: 'en', role: 'primary' },
    { text: 'Helsinki Accords', lang: 'en', role: 'alternative' },
    {
      text: 'Хельсинкский заключительный акт',
      lang: 'ru',
      role: 'alternative',
      translit: 'Khel’sinkskiy zaklyuchitel’nyy akt'
    },
    {
      text: 'Final Act of the Conference on Security and Co-operation in Europe',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'csce-1975-helsinki-final-act',
          loc: { section: 'Final Act of the Conference on Security and Cooperation in Europe' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1975-08-01' },
        cites: [
          {
            source: 'state-dept-milestones-helsinki-final-act',
            loc: { section: 'Helsinki Final Act, 1975', para: '4' }
          },
          {
            source: 'csce-1975-helsinki-final-act',
            loc: { section: 'Final Act of the Conference on Security and Cooperation in Europe' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:helsinki',
      cites: [
        {
          source: 'state-dept-milestones-helsinki-final-act',
          loc: { section: 'Helsinki Final Act, 1975', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  participants: [
    {
      name: 'Gerald R. Ford',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-helsinki-final-act',
          loc: { section: 'Helsinki Final Act, 1975', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 35 },
            cites: [
              {
                source: 'state-dept-milestones-helsinki-final-act',
                loc: { section: 'Helsinki Final Act, 1975', para: '1' }
              }
            ]
          }
        ]
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/President_Gerald_R._Ford_and_Soviet_General_Secretary_Leonid_Brezhnev_Raise_Their_Glasses_in_a_Toast_Following_the_Signing_of_the_Final_Act_of_the_Conference_on_Security_and_Cooperation_in_Europe_%28CSCE%29%2C_in_Helsi%28...%29_-_NARA_-_23898499.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:President_Gerald_R._Ford_and_Soviet_General_Secretary_Leonid_Brezhnev_Raise_Their_Glasses_in_a_Toast_Following_the_Signing_of_the_Final_Act_of_the_Conference_on_Security_and_Cooperation_in_Europe_(CSCE),_in_Helsi(...)_-_NARA_-_23898499.jpg',
    credit: { institution: 'U.S. National Archives and Records Administration (NARA 23898499)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Helsinki Final Act was an agreement signed by 35 nations that concluded the Conference on Security and Cooperation in Europe, held in Helsinki, Finland. The multifaceted Act addressed a range of prominent global issues and in so doing had a far-reaching effect on the Cold War and U.S.-Soviet relations.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-helsinki-final-act',
            loc: { section: 'Helsinki Final Act, 1975', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/helsinki'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The Helsinki Conference had its origins in early Cold War discussions.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-helsinki-final-act',
            loc: { section: 'Helsinki Final Act, 1975', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/helsinki'
          }
        },
        {
          id: 'q3',
          text: 'However, the shift towards détente during the early 1970s encouraged Western leaders to reconsider the negotiations.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-helsinki-final-act',
            loc: { section: 'Helsinki Final Act, 1975', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/helsinki'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The Helsinki Final Act dealt with a variety of issues divided into four “baskets.” The first basket included ten principles covering political and military issues, territorial integrity, the definition of borders, peaceful settlement of disputes and the implementation of confidence building measures between opposing militaries. The second basket focused on economic issues like trade and scientific cooperation. The third basket emphasized human rights, including freedom of emigration and reunification of families divided by international borders, cultural exchanges and freedom of the press.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-helsinki-final-act',
            loc: { section: 'Helsinki Final Act, 1975', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/helsinki'
          }
        },
        {
          id: 'q5',
          text: 'The participating States regard as inviolable all one another\'s frontiers as well as the frontiers of all States in Europe and therefore they will refrain now and in the future from assaulting these frontiers.',
          lang: 'en',
          cite: {
            source: 'csce-1975-helsinki-final-act',
            loc: { section: 'Final Act of the Conference on Security and Cooperation in Europe' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/Helsinki_Final_Act'
          }
        },
        {
          id: 'q6',
          text: 'The participating States will respect human rights and fundamental freedoms, including the freedom of thought, conscience, religion or belief, for all without distinction as to race, sex, language or religion.',
          lang: 'en',
          cite: {
            source: 'csce-1975-helsinki-final-act',
            loc: { section: 'Final Act of the Conference on Security and Cooperation in Europe' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/Helsinki_Final_Act'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Although initially unpopular in the West, the Helsinki Final Act proved important at the end of the Cold War.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-helsinki-final-act',
            loc: { section: 'Helsinki Final Act, 1975', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/helsinki'
          }
        },
        {
          id: 'q8',
          text: 'The Helsinki Process, including the review meetings, led to greater cooperation between Eastern and Western Europe.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-helsinki-final-act',
            loc: { section: 'Helsinki Final Act, 1975', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/helsinki'
          }
        },
        {
          id: 'q9',
          text: 'These shifts helped bring an end to Soviet dominance in Eastern Europe and the end of the Cold War.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-helsinki-final-act',
            loc: { section: 'Helsinki Final Act, 1975', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/helsinki'
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
            value: { d: '1972' },
            cites: [
              {
                source: 'state-dept-milestones-helsinki-final-act',
                loc: { section: 'Helsinki Final Act, 1975', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Discussions started with the Helsinki Consultations in 1972 and continued until the opening of the formal Conference on Security and Cooperation in Europe (CSCE) in July of 1973.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-helsinki-final-act',
          loc: { section: 'Helsinki Final Act, 1975', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/helsinki'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-07-03' },
            cites: [
              {
                source: 'csce-1975-helsinki-final-act',
                loc: {
                  section: 'Final Act of the Conference on Security and Cooperation in Europe'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The Conference on Security and Co-operation in Europe, which opened at Helsinki on 3 July 1973 and continued at Geneva from 18 September 1973 to 21 July 1975, was concluded at Helsinki on 1 August 1975',
        lang: 'en',
        cite: {
          source: 'csce-1975-helsinki-final-act',
          loc: { section: 'Final Act of the Conference on Security and Cooperation in Europe' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://en.wikisource.org/wiki/Helsinki_Final_Act'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1975-08-01' },
            cites: [
              {
                source: 'state-dept-milestones-helsinki-final-act',
                loc: { section: 'Helsinki Final Act, 1975', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'From the summer of 1973 to the summer of 1975, intensive negotiations continued in Geneva, until the participants finally met again in Helsinki on August 1, 1975 to sign the Helsinki Final Act.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-helsinki-final-act',
          loc: { section: 'Helsinki Final Act, 1975', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/helsinki'
        }
      }
    }
  ],
  polities: [
    {
      ref: 'polity:soviet-union',
      cites: [
        {
          source: 'state-dept-milestones-helsinki-final-act',
          loc: { section: 'Helsinki Final Act, 1975', para: '3' }
        }
      ]
    },
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-helsinki-final-act',
          loc: { section: 'Helsinki Final Act, 1975', para: '4' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'morgan-2017-final-act', perspective: 'american' }
  ]
})
