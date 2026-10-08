import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'nixons-visit-to-china',
  names: [
    { text: 'Nixon’s visit to China', lang: 'en', role: 'primary' },
    {
      text: 'Rapprochement with China, 1972',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '0' }
        }
      ]
    },
    { text: '尼克松访华', lang: 'zh', role: 'native', translit: 'Níkèsōng fǎnghuá' },
    {
      text: 'Shanghai Communiqué',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '7' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'conference',
  start: {
    alts: [
      {
        value: { d: '1972-02-21' },
        cites: [
          {
            source: 'state-dept-milestones-rapprochement-with-china',
            loc: { section: 'Rapprochement with China, 1972', para: '7' }
          },
          {
            source: 'frus-1969-76-v17-d203-joint-statement-prc-us-1972',
            loc: {
              section: '203. Joint Statement Following Discussions With Leaders of the People’s Republic of China',
              para: '1'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1972-02-28' },
        cites: [
          {
            source: 'state-dept-milestones-rapprochement-with-china',
            loc: { section: 'Rapprochement with China, 1972', para: '7' }
          },
          {
            source: 'frus-1969-76-v17-d203-joint-statement-prc-us-1972',
            loc: {
              section: '203. Joint Statement Following Discussions With Leaders of the People’s Republic of China',
              para: '1'
            }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'frus-1969-76-v17-d203-joint-statement-prc-us-1972',
          loc: {
            section: '203. Joint Statement Following Discussions With Leaders of the People’s Republic of China',
            para: '1'
          }
        }
      ]
    },
    {
      ref: 'place:shanghai',
      cites: [
        {
          source: 'frus-1969-76-v17-d203-joint-statement-prc-us-1972',
          loc: {
            section: '203. Joint Statement Following Discussions With Leaders of the People’s Republic of China',
            para: '1'
          }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'usa',
      name: 'United States',
      cites: [
        {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '1' }
        }
      ],
      polity: 'polity:united-states'
    },
    {
      key: 'prc',
      name: 'People’s Republic of China',
      cites: [
        {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '1' }
        }
      ],
      polity: 'polity:peoples-republic-of-china'
    }
  ],
  participants: [
    {
      ref: 'person:richard-nixon',
      role: 'head-of-state',
      side: 'usa',
      cites: [
        {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '1' }
        }
      ]
    },
    {
      ref: 'person:henry-kissinger',
      role: 'negotiator',
      side: 'usa',
      cites: [
        {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '6' }
        }
      ]
    },
    {
      ref: 'person:mao-zedong',
      role: 'leader',
      side: 'prc',
      cites: [
        {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '1' }
        }
      ]
    },
    {
      name: 'Zhou Enlai',
      role: 'head-of-government',
      side: 'prc',
      cites: [
        {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:founding-of-the-peoples-republic-of-china',
      rel: 'preceded-by',
      cites: [
        {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '3' }
        }
      ]
    },
    {
      ref: 'event:sino-soviet-split',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '4' }
        }
      ]
    },
    {
      ref: 'event:vietnam-war',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '4' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:republic-of-china',
      cites: [
        {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '3' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Nixon_and_Zhou_toast.jpg/1280px-Nixon_and_Zhou_toast.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nixon_and_Zhou_toast.jpg',
    credit: {
      institution: 'Richard Nixon Presidential Library and Museum',
      creator: 'White House Photographer'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'In 1972, U.S. President Richard Nixon traveled to the People’s Republic of China (PRC) and met with Mao Zedong, the Chairman of the Central Committee of the Chinese Communist Party, and Zhou Enlai, the PRC Premier. Over the course of this visit, the two governments negotiated the Shanghai Communiqué, an important step toward improving relations between the United States and the PRC after many years of hostility.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-rapprochement-with-china',
            loc: { section: 'Rapprochement with China, 1972', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/rapprochement-china'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q5',
          text: 'Diplomatic estrangement between the two countries went back to the 1940s. After the Chinese civil war ended in 1949, the Communists established the People’s Republic of China on the Chinese mainland while many soldiers and officials of the defeated Republic of China (ROC) evacuated to the island of Taiwan. For the 30 years that followed, the United States recognized the Republic of China as the legitimate government of China and had no official diplomatic relations with Communist China.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-rapprochement-with-china',
            loc: { section: 'Rapprochement with China, 1972', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/rapprochement-china'
          }
        },
        {
          id: 'q6',
          text: 'Of greater significance, Nixon established a secret channel to the PRC’s leadership through Pakistani President Yahya Khan.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-rapprochement-with-china',
            loc: { section: 'Rapprochement with China, 1972', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/rapprochement-china'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'Nixon travelled to Communist China February 21–28, 1972, becoming the first U.S. President to visit mainland China while in office. Near the end of the trip, the two governments issued the Shanghai Communiqué, in which each articulated its position on a crucial obstacle to normalization, the Taiwan issue.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-rapprochement-with-china',
            loc: { section: 'Rapprochement with China, 1972', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/rapprochement-china'
          }
        },
        {
          id: 'q8',
          text: 'President Richard Nixon of the United States of America visited the People’s Republic of China at the invitation of Premier Chou Enlai of the People’s Republic of China from February 21 to February 28, 1972.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-v17-d203-joint-statement-prc-us-1972',
            loc: {
              section: '203. Joint Statement Following Discussions With Leaders of the People’s Republic of China',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76v17/d203'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The principles established in the Shanghai Communiqué provided the basis for the establishment of formal diplomatic relations [Carter normalization milestone] between the two countries in 1979. On a global scale, rapprochement fundamentally altered the context of the Cold War and influenced the subsequent movement towards détente between the United States and the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-rapprochement-with-china',
            loc: { section: 'Rapprochement with China, 1972', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/rapprochement-china'
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
            value: { d: '1971-04' },
            cites: [
              {
                source: 'state-dept-milestones-rapprochement-with-china',
                loc: { section: 'Rapprochement with China, 1972', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q1',
        text: 'Following well-publicized fraternization between U.S. and PRC table tennis players during an international competition in Japan, the PRC issued an invitation in April 1971 for the U.S. ping pong team to play a match in Communist China.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/rapprochement-china'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1971-10' },
            cites: [
              {
                source: 'state-dept-milestones-rapprochement-with-china',
                loc: { section: 'Rapprochement with China, 1972', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q2',
        text: 'Kissinger’s second trip to the PRC, in October 1971, coincided with a vote on Chinese representation in the United Nations.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-rapprochement-with-china',
          loc: { section: 'Rapprochement with China, 1972', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/rapprochement-china'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1972-02-21' },
            cites: [
              {
                source: 'state-dept-milestones-rapprochement-with-china',
                loc: { section: 'Rapprochement with China, 1972', para: '7' }
              },
              {
                source: 'frus-1969-76-v17-d203-joint-statement-prc-us-1972',
                loc: {
                  section: '203. Joint Statement Following Discussions With Leaders of the People’s Republic of China',
                  para: '2'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q3',
        text: 'President Nixon met with Chairman Mao Tse-tung of the Communist Party of China on February 21.',
        lang: 'en',
        cite: {
          source: 'frus-1969-76-v17-d203-joint-statement-prc-us-1972',
          loc: {
            section: '203. Joint Statement Following Discussions With Leaders of the People’s Republic of China',
            para: '2'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/historicaldocuments/frus1969-76v17/d203'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'chen-2000-maos-china-and-the-cold-war', perspective: 'chinese' }
  ]
})
