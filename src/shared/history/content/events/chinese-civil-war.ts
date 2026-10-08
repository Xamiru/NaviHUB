import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'chinese-civil-war',
  names: [
    { text: 'Chinese Civil War', lang: 'en', role: 'primary' },
    { text: '国共内战', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1927-04' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1949-12' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Return to Civil War', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:nanjing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '6' }
        }
      ]
    },
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Return to Civil War', para: '4' }
        }
      ]
    },
    {
      ref: 'place:yanan',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '15' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:republic-of-china' },
    { ref: 'polity:peoples-republic-of-china' }
  ],
  sides: [
    {
      key: 'ccp',
      name: 'Chinese Communist Party (CCP)',
      cites: [
        {
          source: 'state-dept-milestones-chinese-revolution-of-1949',
          loc: { section: 'The Chinese Revolution of 1949', para: '1' }
        }
      ]
    },
    {
      key: 'kmt',
      name: 'Nationalist Party, or Kuomintang (KMT)',
      cites: [
        {
          source: 'state-dept-milestones-chinese-revolution-of-1949',
          loc: { section: 'The Chinese Revolution of 1949', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mao-zedong',
      role: 'leader',
      side: 'ccp',
      cites: [
        {
          source: 'state-dept-milestones-chinese-revolution-of-1949',
          loc: { section: 'The Chinese Revolution of 1949', para: '1' }
        }
      ]
    },
    {
      ref: 'person:chiang-kai-shek',
      role: 'leader',
      side: 'kmt',
      cites: [
        {
          source: 'state-dept-milestones-chinese-revolution-of-1949',
          loc: { section: 'The Chinese Revolution of 1949', para: '4' }
        }
      ]
    },
    {
      name: 'George Marshall',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-chinese-revolution-of-1949',
          loc: { section: 'The Chinese Revolution of 1949', para: '8' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:long-march', rel: 'related' },
    {
      ref: 'event:founding-of-the-peoples-republic-of-china',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-chinese-revolution-of-1949',
          loc: { section: 'The Chinese Revolution of 1949', para: '1' }
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
          text: 'The announcement ended the costly full-scale civil war between the Chinese Communist Party (CCP) and the Nationalist Party, or Kuomintang (KMT), which broke out immediately following World War II and had been preceded by on and off conflict between the two sides since the 1920’s.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-revolution-of-1949',
            loc: { section: 'The Chinese Revolution of 1949', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1945-1952/chinese-rev'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The Chinese Communist Party, founded in 1921 in Shanghai, originally existed as a study group working within the confines of the First United Front with the Nationalist Party. Chinese Communists joined with the Nationalist Army in the Northern Expedition of 1926–27 to rid the nation of the warlords that prevented the formation of a strong central government. This collaboration lasted until the “White Terror” of 1927, when the Nationalists turned on the Communists, killing them or purging them from the party.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-revolution-of-1949',
            loc: { section: 'The Chinese Revolution of 1949', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1945-1952/chinese-rev'
          }
        },
        {
          id: 'q3',
          text: 'But Chiang, whose Northern Expedition was proving successful, set his forces to destroying the Shanghai CCP apparatus and established an anti-Communist government at Nanjing in April 1927.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Nationalism and Communism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/21.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Frustrated by the focus of the Nationalist leader Chiang Kai-shek on internal threats instead of the Japanese assault, a group of generals abducted Chiang in 1937 and forced him to reconsider cooperation with the Communist army.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-revolution-of-1949',
            loc: { section: 'The Chinese Revolution of 1949', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1945-1952/chinese-rev'
          }
        },
        {
          id: 'q5',
          text: 'Through the mediatory influence of the United States a military truce was arranged in January 1946, but battles between Nationalists and Communists soon resumed.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Return to Civil War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/23.htm' }
        },
        {
          id: 'q6',
          text: 'Battles raged not only for territories but also for the allegiance of cross sections of the population.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Return to Civil War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/23.htm' }
        },
        {
          id: 'q7',
          text: 'Years of corruption and mismanagement had eroded popular support for the Nationalist Government.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-revolution-of-1949',
            loc: { section: 'The Chinese Revolution of 1949', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1945-1952/chinese-rev'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'After Chiang Kai-shek and a few hundred thousand Nationalist troops fled from the mainland to the island of Taiwan, there remained only isolated pockets of resistance. In December 1949 Chiang proclaimed Taipei, Taiwan, the temporary capital of China.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Return to Civil War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/23.htm' }
        },
        {
          id: 'q9',
          text: 'For more than twenty years after the Chinese revolution of 1949, there were few contacts, limited trade and no diplomatic ties between the two countries.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-revolution-of-1949',
            loc: { section: 'The Chinese Revolution of 1949', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1945-1952/chinese-rev'
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
            value: { d: '1934-10' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'Nationalism and Communism', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The epic Long March of his Red Army and its supporters, which began in October 1934, would ensure his place in history.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Nationalism and Communism', para: '15' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1946-01' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'Return to Civil War', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Realizing that American efforts short of large-scale armed intervention could not stop the war, the United States withdrew the American mission, headed by General George C. Marshall, in early 1947.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Return to Civil War', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/23.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1949-01' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'Return to Civil War', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In January 1949 Beiping was taken by the Communists without a fight, and its name changed back to Beijing. Between April and November, major cities passed from Guomindang to Communist control with minimal resistance.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Return to Civil War', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/23.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1949-10-01' },
            cites: [
              {
                source: 'state-dept-milestones-chinese-revolution-of-1949',
                loc: { section: 'The Chinese Revolution of 1949', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On October 1, 1949, Chinese Communist leader Mao Zedong declared the creation of the People’s Republic of China (PRC).',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-chinese-revolution-of-1949',
          loc: { section: 'The Chinese Revolution of 1949', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/milestones/1945-1952/chinese-rev'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Shangtang.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shangtang.jpg',
    credit: { institution: 'Academia Historica' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'jin-2002-zhuanzhe-niandai', perspective: 'chinese' }
  ]
})
