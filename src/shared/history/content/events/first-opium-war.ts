import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-opium-war',
  names: [
    { text: 'First Opium War', lang: 'en', role: 'primary' },
    { text: '第一次鴉片戰爭', lang: 'zh', role: 'native' },
    {
      text: 'first Anglo-Chinese war',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Opium War, 1839-42', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1839' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '2' }
          },
          {
            source: 'state-dept-milestones-opening-to-china-1',
            loc: {
              section: 'The Opening to China Part I: the First Opium War, the United States, and the Treaty of Wangxia, 1839–1844',
              para: '4'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1842' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '2' }
          },
          {
            source: 'state-dept-milestones-opening-to-china-1',
            loc: {
              section: 'The Opening to China Part I: the First Opium War, the United States, and the Treaty of Wangxia, 1839–1844',
              para: '4'
            }
          }
        ]
      }
    ]
  },
  regions: ['east-asia', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:guangzhou',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Opium War, 1839-42', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'britain',
      name: 'the British',
      polity: 'polity:united-kingdom',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Opium War, 1839-42', para: '2' }
        }
      ]
    },
    {
      key: 'china',
      name: 'the Qing government',
      polity: 'polity:qing-empire',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Opium War, 1839-42', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:lin-zexu',
      role: 'leader',
      side: 'china',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Opium War, 1839-42', para: '2' }
        }
      ]
    },
    {
      name: 'Elliot',
      role: 'diplomat',
      side: 'britain',
      cites: [
        {
          source: 'lin-zexu-1839-letter-to-queen-victoria',
          loc: { section: 'Commissioner Lin: Letter to Queen Victoria, 1839', para: '4' }
        }
      ]
    },
    {
      name: 'Sir Hugh Gough',
      role: 'commander',
      side: 'britain',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    },
    {
      name: 'Sir Henry Pottinger',
      role: 'negotiator',
      side: 'britain',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'In 1839 the Qing government, after a decade of unsuccessful anti-opium campaigns, adopted drastic prohibitory laws against the opium trade. The emperor dispatched a commissioner, Lin Zexu (1785- 1850), to Guangzhou to suppress illicit opium traffic. Lin seized illegal stocks of opium owned by Chinese dealers and then detained the entire foreign community and confiscated and destroyed some 20,000 chests of illicit British opium. The British retaliated with a punitive expedition, thus initiating the first Anglo-Chinese war, better known as the Opium War (1839-42).',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/15.htm' }
        },
        {
          id: 'q7',
          text: 'Unprepared for war and grossly underestimating the capabilities of the enemy, the Chinese were disastrously defeated, and their image of their own imperial power was tarnished beyond repair.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/15.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'During the eighteenth century, the market in Europe and America for tea, a new drink in the West, expanded greatly.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/15.htm' }
        },
        {
          id: 'q2',
          text: 'By the early nineteenth century, raw cotton and opium from India had become the staple British imports into China, in spite of the fact that opium was prohibited entry by imperial decree.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/15.htm' }
        },
        {
          id: 'q3',
          text: 'The British had already discovered a great market in southern China for smuggled opium, and American traders soon also turned to opium to supplement their exports to China.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-china-1',
            loc: {
              section: 'The Opening to China Part I: the First Opium War, the United States, and the Treaty of Wangxia, 1839–1844',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/china-1'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Under the Treaty of Nanjing, China ceded the island of Hong Kong (Xianggang in pinyin) to the British; abolished the licensed monopoly system of trade; opened 5 ports to British residence and foreign trade; limited the tariff on trade to 5 percent ad valorem; granted British nationals extraterritoriality (exemption from Chinese laws); and paid a large indemnity.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/15.htm' }
        },
        {
          id: 'q9',
          text: 'The agreements reached between the Western powers and China following the Opium Wars came to be known as the “unequal treaties” because in practice they gave foreigners privileged status and extracted concessions from the Chinese.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-china-1',
            loc: {
              section: 'The Opening to China Part I: the First Opium War, the United States, and the Treaty of Wangxia, 1839–1844',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/china-1'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q10',
          text: 'The Treaty of Nanjing set the scope and character of an unequal relationship for the ensuing century of what the Chinese would call "national humiliations."',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/15.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1838' },
            cites: [
              {
                source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
                loc: { section: 'LIN Tsê-hsü', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Stirred by his memorials and inspired by his achievements, the government summoned Lin to Peking (late in 1838).',
        lang: 'en',
        cite: {
          source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
          loc: { section: 'LIN Tsê-hsü', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Lin_Ts%C3%AA-hs%C3%BC'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1839-01-08' },
            cites: [
              {
                source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
                loc: { section: 'LIN Tsê-hsü', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Leaving Peking on January 8, 1839, he arrived at Canton on March 10 at a time when both Chinese and foreigners were anxiously speculating on what new measures would be put into effect.',
        lang: 'en',
        cite: {
          source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
          loc: { section: 'LIN Tsê-hsü', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Lin_Ts%C3%AA-hs%C3%BC'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1839-03-18' },
            cites: [
              {
                source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
                loc: { section: 'LIN Tsê-hsü', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On March 18, 1839 Lin issued an order to the Hong merchants warning them of serious consequences if the traffic were not suppressed.',
        lang: 'en',
        cite: {
          source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
          loc: { section: 'LIN Tsê-hsü', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Lin_Ts%C3%AA-hs%C3%BC'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1839-04-03' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On the 3rd of April 20,283 chests of opium were handed over to the mandarins and were by them destroyed.',
        lang: 'en',
        cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1840-09-28' },
            cites: [
              {
                source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
                loc: { section: 'LIN Tsê-hsü', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'On September 28, 1840 Lin Tsê-hsü was dismissed from office and was ordered to go to Peking to await punishment. He served for a time in Chekiang in military headquarters, and then was sentenced to exile in Ili.',
        lang: 'en',
        cite: {
          source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
          loc: { section: 'LIN Tsê-hsü', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Lin_Ts%C3%AA-hs%C3%BC'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1841' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Before the new commissioner reached his post Canton had fallen into the hands of Sir Hugh Gough, and shortly afterwards Amoy, Ning-po, Tinghai in Chusan, Chapu, Shanghai and Chin-kiang Fu shared the same fate.',
        lang: 'en',
        cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1842' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Opium War, 1839-42', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The Treaty of Nanjing (1842), signed on board a British warship by two Manchu imperial commissioners and the British plenipotentiary, was the first of a series of agreements with the Western trading nations later called by the Chinese the "unequal treaties."',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Opium War, 1839-42', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/15.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/The_Hon._E.I._Co._Iron_Steam_Ship_Nemesis%2C_..._with_boats_of_Sulphur%2C_Calliope%2C_Larne_and_Starling%2C_destroying_the_Chinese_War_Junks%2C_in_Anson%27s_Bay%2C_Jany_7th_1841_PAH8893.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Hon._E.I._Co._Iron_Steam_Ship_Nemesis,_..._with_boats_of_Sulphur,_Calliope,_Larne_and_Starling,_destroying_the_Chinese_War_Junks,_in_Anson%27s_Bay,_Jany_7th_1841_PAH8893.jpg',
    credit: { institution: 'Royal Museums Greenwich', creator: 'Edward Duncan' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'mao-1995-tianchao-de-bengkui', perspective: 'chinese' },
    { source: 'qi-lin-shou-1954-yapian-zhanzheng', perspective: 'chinese' },
    { source: 'inoue-2004-shindai-ahen-seisakushi-no-kenkyu', perspective: 'japanese' }
  ]
})
