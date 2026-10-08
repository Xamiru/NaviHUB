import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'death-of-mao-zedong',
  names: [
    { text: 'Death of Mao Zedong', lang: 'en', role: 'primary' },
    { text: '毛泽东逝世', lang: 'zh', role: 'native', translit: 'Máo Zédōng shìshì' },
    {
      text: 'Arrest of the Gang of Four',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '23' }
        }
      ]
    },
    { text: '粉碎四人帮', lang: 'zh', role: 'alternative', translit: 'Fěnsuì Sìrénbāng' }
  ],
  researched: '2026-10-09',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1976-09' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '20' }
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
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '23' }
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
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '20' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'radicals',
      name: 'Jiang Qing and the Gang of Four',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '23' }
        }
      ]
    },
    {
      key: 'hua',
      name: 'Hua Guofeng, Ye Jianying and their allies',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '23' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mao-zedong',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '20' }
        },
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '22' }
        }
      ]
    },
    {
      name: 'Hua Guofeng',
      role: 'leader',
      side: 'hua',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '21' }
        },
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '23' }
        }
      ]
    },
    {
      name: 'Ye Jianying',
      role: 'commander',
      side: 'hua',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '23' }
        }
      ]
    },
    {
      name: 'Jiang Qing',
      role: 'leader',
      side: 'radicals',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '23' }
        }
      ]
    },
    {
      ref: 'person:deng-xiaoping',
      role: 'victim',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '21' }
        }
      ]
    },
    {
      name: 'Zhou Enlai',
      role: 'participant',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '20' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Beijing-1978_Mao_Memorial_Hall_Paul_Burns.jpg/1280px-Beijing-1978_Mao_Memorial_Hall_Paul_Burns.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Beijing-1978_Mao_Memorial_Hall_Paul_Burns.jpg',
    credit: { institution: 'Paul Burns (August 1978 study tour photograph)', creator: 'Paul Burns' },
    license: { id: 'cc-by-sa', version: '4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The year 1976 saw the deaths of the three most senior officials in the CCP and the state apparatus: Zhou Enlai in January, Zhu De (then chairman of the Standing Committee of the National People\'s Congress and de jure head of state) in July, and Mao Zedong in September.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
        },
        {
          id: 'q2',
          text: 'In October, less than a month after Mao\'s death, Jiang Qing and her three principal associates-- denounced as the Gang of Four--were arrested with the assistance of two senior Political Bureau members, Minister of National Defense Ye Jianying (1897-1986) and Wang Dongxing, commander of the CCP\'s elite bodyguard.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Deng Xiaoping\'s position was solidified by his election as a vice chairman of the CCP and as a member of the Political Bureau and its Standing Committee. Deng also was installed as China\'s first civilian chief of PLA General Staff Department.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
        },
        {
          id: 'q4',
          text: 'Deng Xiaoping, the logical successor as premier, received a temporary setback after Zhou\'s death, when radicals launched a major counterassault against him.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '21' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
        },
        {
          id: 'q5',
          text: 'The political system had polarized in the years before Mao\'s death into increasingly bitter and irreconcilable factions. While Mao was alive--and playing these factions off against each other--the contending forces were held in check.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '22' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
        },
        {
          id: 'q6',
          text: 'These events, added to the deaths of the three Communist leaders, contributed to a popular sense that the "mandate of heaven" had been withdrawn from the ruling party. At best the nation was in a state of serious political uncertainty.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'Even though Mao Zedong\'s role in political life had been sporadic and shallow in his later years, it was crucial. Despite Mao\'s alleged lack of mental acuity, his influence in the months before his death remained such that his orders to dismiss Deng and appoint Hua Guofeng were accepted immediately by the Political Bureau.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '22' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
        },
        {
          id: 'q8',
          text: 'The radical clique most closely associated with Mao and the Cultural Revolution became vulnerable after Mao died, as Deng had been after Zhou Enlai\'s demise.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The jubilation following the incarceration of the Gang of Four and the popularity of the new ruling triumvirate (Hua Guofeng, Ye Jianying, and Li Xiannian, a temporary alliance of necessity) were succeeded by calls for the restoration to power of Deng Xiaoping and the elimination of leftist influence throughout the political system.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Post-Mao Period, 1976-78', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/29.htm' }
        },
        {
          id: 'q10',
          text: 'Hua was confirmed as party chairman, and Ye Jianying, Deng Xiaoping, Li Xiannian, and Wang Dongxing were elected vice chairmen. The congress proclaimed the formal end of the Cultural Revolution, blamed it entirely on the Gang of Four, and reiterated that "the fundamental task of the party in the new historical period is to build China into a modern, powerful socialist country by the end of the twentieth century."',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Post-Mao Period, 1976-78', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/29.htm' }
        },
        {
          id: 'q11',
          text: 'One of the more spectacular political events of modern Chinese history was the month-long trial of the Gang of Four and six of Lin Biao\'s closest associates.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        },
        {
          id: 'q12',
          text: 'The indictment came more than four years after the arrest of Jiang Qing and her associates and more than nine years after the arrests of the Lin Biao group. Beyond the trial of ten political pariahs, it appeared that the intimate involvement of Mao Zedong, current party chairman Hua Guofeng, and the CCP itself were on trial.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        },
        {
          id: 'q13',
          text: 'Jiang Qing, despite her spirited self-vindication and defense of her late husband, received a death sentence with a two-year suspension; later, Jiang Qing\'s death sentence was commuted to life imprisonment. So enduring was Mao\'s legacy that Jiang Qing appeared to be protected by it from execution. The same sentence was given to Zhang Chunqiao, while Wang Hongwen was given life and Yao Wenyuan twenty years.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1976-04' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Cultural Revolution, 1966-76', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In April of the same year, masses of demonstrators in Tiananmen Square in Beijing memorialized Zhou Enlai and criticized Mao\'s closest associates, Zhou\'s opponents.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '20' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1976-04' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Cultural Revolution, 1966-76', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In April 1976 Deng was once more removed from all his public posts, and a relative political unknown, Hua Guofeng, a Political Bureau member, vice premier, and minister of public security, was named acting premier and party first vice chairman.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '21' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1976-07' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Cultural Revolution, 1966-76', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'In July an earthquake devastated the city of Tangshan in Hebei Province.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '20' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
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
        id: 'q17',
        text: 'Within days it was formally announced that Hua Guofeng had assumed the positions of party chairman, chairman of the party\'s Central Military Commission, and premier.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '23' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1977-07' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Post-Mao Period, 1976-78', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'By July 1977, at no small risk to undercutting Hua Guofeng\'s legitimacy as Mao\'s successor and seeming to contradict Mao\'s apparent will, the Central Committee exonerated Deng Xiaoping from responsibility for the Tiananmen Square incident. Deng admitted some shortcomings in the events of 1975, and finally, at a party Central Committee session, he resumed all the posts from which he had been removed in 1976.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Post-Mao Period, 1976-78', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/29.htm' }
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
        id: 'q19',
        text: 'The post-Mao political order was given its first vote of confidence at the Eleventh National Party Congress, held August 12- 18, 1977.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Post-Mao Period, 1976-78', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/29.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-11' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Four Modernizations, 1979-82', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'A 35-judge special court was convened in November 1980 and issued a 20,000-word indictment against the defendants.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-01' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Four Modernizations, 1979-82', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'In January 1981 the court rendered guilty verdicts against the ten.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Four Modernizations, 1979-82', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
      }
    }
  ],
  polities: [
    {
      ref: 'polity:peoples-republic-of-china',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '20' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'macfarquhar-2006-mao-s-last-revolution', perspective: 'american' }
  ]
})
