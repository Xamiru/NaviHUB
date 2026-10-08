import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'cultural-revolution',
  names: [
    { text: 'Cultural Revolution', lang: 'en', role: 'primary' },
    {
      text: 'Great Proletarian Cultural Revolution',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '5' }
        }
      ]
    },
    { text: '无产阶级文化大革命', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'movement',
  start: {
    alts: [
      {
        value: { d: '1966-05' },
        cites: [
          {
            source: 'cpc-1981-resolution-on-party-history',
            loc: { section: 'The Decade of the “Cultural Revolution"' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1976-10' },
        cites: [
          {
            source: 'cpc-1981-resolution-on-party-history',
            loc: { section: 'The Decade of the “Cultural Revolution"' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '7' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:peoples-republic-of-china' }
  ],
  participants: [
    {
      ref: 'person:mao-zedong',
      role: 'leader',
      cites: [
        {
          source: 'cpc-1981-resolution-on-party-history',
          loc: { section: 'The Decade of the “Cultural Revolution"' }
        },
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '5' }
        }
      ]
    },
    {
      name: 'Lin Biao',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '5' }
        }
      ]
    },
    {
      name: 'Jiang Qing',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '5' }
        }
      ]
    },
    {
      name: 'Liu Shaoqi',
      role: 'victim',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '5' }
        }
      ]
    },
    {
      name: 'Deng Xiaoping',
      role: 'victim',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '9' }
        }
      ]
    },
    {
      name: 'Zhou Enlai',
      role: 'participant',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '6' }
        }
      ]
    },
    {
      name: 'Hua Guofeng',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '21' }
        }
      ]
    },
    {
      name: 'Gang of Four',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '23' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:sino-soviet-split',
      rel: 'related',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '10' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/1967-03_1966%E5%B9%B412%E6%9C%8826%E6%97%A5%E6%B1%9F%E9%9D%92%E5%91%A8%E6%81%A9%E6%9D%A5%E5%BA%B7%E7%94%9F%E6%8E%A5%E8%A7%81%E7%BA%A2%E5%8D%AB%E5%85%B5.jpg/1280px-1967-03_1966%E5%B9%B412%E6%9C%8826%E6%97%A5%E6%B1%9F%E9%9D%92%E5%91%A8%E6%81%A9%E6%9D%A5%E5%BA%B7%E7%94%9F%E6%8E%A5%E8%A7%81%E7%BA%A2%E5%8D%AB%E5%85%B5.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:1967-03_1966%E5%B9%B412%E6%9C%8826%E6%97%A5%E6%B1%9F%E9%9D%92%E5%91%A8%E6%81%A9%E6%9D%A5%E5%BA%B7%E7%94%9F%E6%8E%A5%E8%A7%81%E7%BA%A2%E5%8D%AB%E5%85%B5.jpg',
    credit: { institution: 'Renmin Huabao (China Pictorial), March 1967 issue' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The \'Great Proletarian Cultural Revolution,\' usually known simply as the Cultural Revolution (or the Great Cultural Revolution), was a \'complex social upheaval that began as a struggle between Mao Zedong and other top party leaders for dominance of the Chinese Communist Party (CCP) and went on to affect all of China with its call for \'continuing revolution.\' This social upheaval lasted from 1966 to 1976 and left deep scars upon Chinese society.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-china-1950-to-the-present',
            loc: { section: 'Cultural Revolution (1966-1976)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://afe.easia.columbia.edu/tps/1950_cn.htm'
          }
        },
        {
          id: 'q3',
          text: 'By mid-1966 Mao\'s campaign had erupted into what came to be known as the Great Proletarian Cultural Revolution, the first mass action to have emerged against the CCP apparatus itself.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/28.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'In the early 1960s, Mao was on the political sidelines and in semiseclusion. By 1962, however, he began an offensive to purify the party, having grown increasingly uneasy about what he believed were the creeping "capitalist" and antisocialist tendencies in the country.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/28.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Maoists also turned to middle-school students for political demonstrations on their behalf. These students, joined also by some university students, came to be known as the Red Guards. Millions of Red Guards were encouraged by the Cultural Revolution group to become a "shock force" and to "bombard" with criticism both the regular party headquarters in Beijing and those at the regional and provincial levels.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/28.htm' }
        },
        {
          id: 'q6',
          text: 'The result of the unfettered criticism of established organs of control by China\'s exuberant youth was massive civil disorder, punctuated also by clashes among rival Red Guard gangs and between the gangs and local security authorities. The party organization was shattered from top to bottom.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/28.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q18',
          text: 'These were also accompanied by the rehabilitation of those persons who had been persecuted or fallen into disgrace in 1966-68.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/28.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'Chief responsibility for the grave “Left” error of the “cultural revolution", an error comprehensive in magnitude and protracted in duration, does indeed lie with Comrade Mao Zedong. But after all it was the error of a great proletarian revolutionary.',
          lang: 'en',
          cite: {
            source: 'cpc-1981-resolution-on-party-history',
            loc: { section: 'The Decade of the “Cultural Revolution"' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.marxists.org/subject/china/documents/cpc/history/01.htm'
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
            value: { d: '1965' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Cultural Revolution, 1966-76', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In late 1965 a leading member of Mao\'s "Shanghai Mafia," Yao Wenyuan, wrote a thinly veiled attack on the deputy mayor of Beijing, Wu Han.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1967' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Cultural Revolution, 1966-76', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The PLA also was responsible for the appearance in early 1967 of the revolutionary committees, a new form of local control that replaced local party committees and administrative bodies. The revolutionary committees were staffed with Cultural Revolution activists, trusted cadres, and military commanders, the latter frequently holding the greatest power.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1967' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Cultural Revolution, 1966-76', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Liu Shaoqi, Deng Xiaoping, and their fellow "revisionists" and "capitalist roaders" had been purged from public life by early 1967, and the Maoist group had since been in full command of the political scene.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1969-04' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Cultural Revolution, 1966-76', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The activist phase of the Cultural Revolution--considered to be the first in a series of cultural revolutions--was brought to an end in April 1969. This end was formally signaled at the CCP\'s Ninth National Party Congress, which convened under the dominance of the Maoist group. Mao was confirmed as the supreme leader.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '12' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1971-09' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Cultural Revolution, 1966-76', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Without question, the turning point in the decade of the Cultural Revolution was Lin Biao\'s abortive coup attempt and his subsequent death in a plane crash as he fled China in September 1971.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '16' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1976-10' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Cultural Revolution, 1966-76', para: '23' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In October, less than a month after Mao\'s death, Jiang Qing and her three principal associates-- denounced as the Gang of Four--were arrested with the assistance of two senior Political Bureau members, Minister of National Defense Ye Jianying (1897-1986) and Wang Dongxing, commander of the CCP\'s elite bodyguard.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '23' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1977-08-12' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Post-Mao Period, 1976-78', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The post-Mao political order was given its first vote of confidence at the Eleventh National Party Congress, held August 12- 18, 1977. Hua was confirmed as party chairman, and Ye Jianying, Deng Xiaoping, Li Xiannian, and Wang Dongxing were elected vice chairmen. The congress proclaimed the formal end of the Cultural Revolution, blamed it entirely on the Gang of Four, and reiterated that "the fundamental task of the party in the new historical period is to build China into a modern, powerful socialist country by the end of the twentieth century."',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Post-Mao Period, 1976-78', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/29.htm' }
      }
    }
  ],
  furtherReading: [
    { source: 'ccp-1985-guanyu-jianguo-yilai-jueyi-zhushiben', perspective: 'chinese' },
    { source: 'wang-1988-da-dongluan-de-niandai', perspective: 'chinese' },
    { source: 'gao-yan-1986-wenhua-dageming-shinian-shi', perspective: 'chinese' }
  ]
})
