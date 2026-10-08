import { definePerson } from '../../schema'

export default definePerson({
  id: 'lin-zexu',
  names: [
    { text: 'Lin Zexu', lang: 'en', role: 'primary' },
    { text: '林則徐', lang: 'zh', role: 'native' },
    {
      text: 'Commissioner Lin',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'lin-zexu-1839-letter-to-queen-victoria',
          loc: { section: 'Commissioner Lin: Letter to Queen Victoria, 1839', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1785-08-30' },
        cites: [
          {
            source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
            loc: { section: 'LIN Tsê-hsü', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1850-11-22' },
        cites: [
          {
            source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
            loc: { section: 'LIN Tsê-hsü', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['politician'],
  offices: [
    {
      title: 'governor of Kiangsu',
      polity: 'polity:qing-empire',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1832' },
            cites: [
              {
                source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
                loc: { section: 'LIN Tsê-hsü', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1837' },
            cites: [
              {
                source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
                loc: { section: 'LIN Tsê-hsü', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
          loc: { section: 'LIN Tsê-hsü', para: '1' }
        }
      ]
    },
    {
      title: 'imperial commissioner at Guangzhou',
      polity: 'polity:qing-empire',
      start: {
        alts: [
          {
            value: { d: '1838-12-31' },
            cites: [
              {
                source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
                loc: { section: 'LIN Tsê-hsü', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Opium War, 1839-42', para: '2' }
        },
        {
          source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
          loc: { section: 'LIN Tsê-hsü', para: '2' }
        }
      ]
    },
    {
      title: 'governor-general of Kwangtung and Kwangsi',
      polity: 'polity:qing-empire',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1840' },
            cites: [
              {
                source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
                loc: { section: 'LIN Tsê-hsü', para: '5' }
              }
            ]
          }
        ]
      },
      end: {
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
      cites: [
        {
          source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
          loc: { section: 'LIN Tsê-hsü', para: '5' }
        }
      ]
    },
    {
      title: 'governor-general of Yunnan and Kweichow',
      polity: 'polity:qing-empire',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1847' },
            cites: [
              {
                source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
                loc: { section: 'LIN Tsê-hsü', para: '7' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
          loc: { section: 'LIN Tsê-hsü', para: '7' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'On July 10 Lin Tsê-hsü memorialized the throne on the subject with the result that his name was thereafter inseparably associated with opium suppression.',
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
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q5',
          text: 'Lin Tsê-hsü became a chü-jên in 1804 and was engaged as a secretary for several years by Chang Shih-ch\'êng (see under Liang Chang-chü), governor of Fukien (1806–14).',
          lang: 'en',
          cite: {
            source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
            loc: { section: 'LIN Tsê-hsü', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Lin_Ts%C3%AA-hs%C3%BC'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q6',
          text: 'Early in 1832 he became governor of Kiangsu, a post he held until 1837.',
          lang: 'en',
          cite: {
            source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
            loc: { section: 'LIN Tsê-hsü', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Lin_Ts%C3%AA-hs%C3%BC'
          }
        },
        {
          id: 'q1',
          text: 'The emperor dispatched a commissioner, Lin Zexu (1785- 1850), to Guangzhou to suppress illicit opium traffic.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/15.htm' }
        },
        {
          id: 'q7',
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
        },
        {
          id: 'q8',
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
        },
        {
          id: 'q9',
          text: 'Early in 1840 Lin was made governor-general of Kwangtung and Kwangsi.',
          lang: 'en',
          cite: {
            source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
            loc: { section: 'LIN Tsê-hsü', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Lin_Ts%C3%AA-hs%C3%BC'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q2',
          text: 'Suppose the subject of another country were to come to England to trade, he would certainly be required to comply with the laws of England, then how much more does this apply to us of the celestial empire!',
          lang: 'en',
          cite: {
            source: 'lin-zexu-1839-letter-to-queen-victoria',
            loc: { section: 'Commissioner Lin: Letter to Queen Victoria, 1839', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://sourcebooks.fordham.edu/mod/1839lin2.asp'
          }
        },
        {
          id: 'q3',
          text: 'Our celestial empire rules over ten thousand kingdoms!',
          lang: 'en',
          cite: {
            source: 'lin-zexu-1839-letter-to-queen-victoria',
            loc: { section: 'Commissioner Lin: Letter to Queen Victoria, 1839', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://sourcebooks.fordham.edu/mod/1839lin2.asp'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q10',
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
        },
        {
          id: 'q11',
          text: 'In the following year (1846) he became governor of Shensi, and in 1847 was appointed governor-general of Yunnan and Kweichow.',
          lang: 'en',
          cite: {
            source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
            loc: { section: 'LIN Tsê-hsü', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Lin_Ts%C3%AA-hs%C3%BC'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q12',
          text: 'Lin Tsê-hsü was now at the zenith of his power, and the objective he set for himself, namely the destruction of the opium traffic, seemed to have been achieved. His purpose was laudable, and his long letter addressed to Queen Victoria on the subject (written in August 1839) is full of righteous indignation. But he showed little appreciation of the real grievances under which all trade had long been conducted.',
          lang: 'en',
          cite: {
            source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
            loc: { section: 'LIN Tsê-hsü', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Lin_Ts%C3%AA-hs%C3%BC'
          }
        },
        {
          id: 'q13',
          text: 'In 1929 the Chinese Government set up a memorial to him at the Bogue, and designated June 3 (the day when he began the destruction of opium) as a national Opium Prohibition Day.',
          lang: 'en',
          cite: {
            source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
            loc: { section: 'LIN Tsê-hsü', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/Eminent_Chinese_of_the_Ch%27ing_Period/Lin_Ts%C3%AA-hs%C3%BC'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Portrait_of_Lin_Zexu.jpeg/1280px-Portrait_of_Lin_Zexu.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Lin_Zexu.jpeg',
    credit: { institution: 'Google Arts & Culture', creator: 'Lam Qua' },
    license: { id: 'public-domain' }
  },
  bornIn: {
    ref: 'place:fuzhou',
    cites: [
      {
        source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
        loc: { section: 'LIN Tsê-hsü', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:chaozhou',
    cites: [
      {
        source: 'hummel-1943-eminent-chinese-lin-tse-hsu',
        loc: { section: 'LIN Tsê-hsü', para: '7' }
      }
    ]
  }
})
