import { defineEvent } from '../../schema'

export default defineEvent({
  id: '1997-asian-financial-crisis',
  names: [
    { text: '1997 Asian financial crisis', lang: 'en', role: 'primary' },
    {
      text: 'East Asian financial crisis',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'radelet-sachs-1998-the-onset-of-the-east-asian-financial-crisis',
          loc: { section: 'The Onset of the East Asian Financial Crisis', para: '1' }
        }
      ]
    },
    { text: 'วิกฤตต้มยำกุ้ง', lang: 'th', role: 'native', translit: 'Wikrit Tom Yam Kung' }
  ],
  researched: '2026-10-10',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1997-07-02' },
        cites: [
          {
            source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
            loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'east-asia', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:thailand',
      cites: [
        {
          source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
          loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '4' }
        }
      ]
    },
    {
      ref: 'place:indonesia',
      cites: [
        {
          source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
          loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '4' }
        }
      ]
    },
    {
      ref: 'place:south-korea',
      cites: [
        {
          source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
          loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'International Monetary Fund',
      role: 'negotiator',
      cites: [
        {
          source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
          loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '13' }
        }
      ]
    },
    {
      name: 'Suharto',
      role: 'head-of-state',
      cites: [
        {
          source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
          loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '31' }
        }
      ]
    },
    {
      name: 'Mahathir Mohamad',
      role: 'head-of-government',
      cites: [
        {
          source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
          loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '31' }
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
          text: 'Like dominoes tumbling, what started in Thailand in July 1997 soon spread to the other so-called Asian tigers—the fast-growing countries of East Asia.',
          lang: 'en',
          cite: {
            source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
            loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
          }
        },
        {
          id: 'q2',
          text: 'By mid-1998, the crisis was threatening to envelop countries in Latin America and Eastern Europe—most notably Brazil and Russia.',
          lang: 'en',
          cite: {
            source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
            loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The crisis in Asia caught nearly everyone by surprise.',
          lang: 'en',
          cite: {
            source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
            loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
          }
        },
        {
          id: 'q4',
          text: 'After all, this was a region that had accounted for more than half of the world\'s economic growth in the 1990s.',
          lang: 'en',
          cite: {
            source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
            loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
          }
        },
        {
          id: 'q5',
          text: 'First, none of the fundamentals that drive "first-generation" crisis models seems to have been present in any of the afflicted Asian economies.',
          lang: 'en',
          cite: {
            source: 'krugman-1998-what-happened-to-asia',
            loc: { section: 'What Happened to Asia?', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://web.mit.edu/krugman/www/DISINTER.html' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q6',
          text: 'Even more ominous were structural problems in the region\'s financial sectors—especially banking—which left them ill-equipped to manage the sheer volume of investment flows.',
          lang: 'en',
          cite: {
            source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
            loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
          }
        },
        {
          id: 'q7',
          text: 'But, as in the prior two crises, there were warning signs that all of the confidence in Asia may have been misplaced.',
          lang: 'en',
          cite: {
            source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
            loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
          }
        },
        {
          id: 'q8',
          text: 'Finally, in all of the countries financial intermediaries seem to have been central players.',
          lang: 'en',
          cite: {
            source: 'krugman-1998-what-happened-to-asia',
            loc: { section: 'What Happened to Asia?', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://web.mit.edu/krugman/www/DISINTER.html' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q9',
          text: 'Within the next several months, the currencies of neighboring Indonesia, Malaysia and the Philippines came under pressure, too, leading to depreciations against the dollar ranging from 25 to 33 percent.',
          lang: 'en',
          cite: {
            source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
            loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
          }
        },
        {
          id: 'q10',
          text: 'Korea, which had been one of the great success stories in the developing world, suffered the ignominious distinction of having its debt fall to below investment grade, or "junk bond" status—one of the largest downgradings in recent history.',
          lang: 'en',
          cite: {
            source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
            loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
          }
        },
        {
          id: 'q11',
          text: 'In some countries, especially Indonesia, severe political unrest accompanied and exacerbated the economic turmoil.',
          lang: 'en',
          cite: {
            source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
            loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q12',
          text: 'Austerity programs instituted by the IMF as a condition of financial assistance seemingly exacerbated the crisis.',
          lang: 'en',
          cite: {
            source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
            loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
          }
        },
        {
          id: 'q13',
          text: 'Regardless of the cause of the crisis and its consequent spillover to other countries, all analysts agree that the fallout in Asia and other emerging market nations has been severe.',
          lang: 'en',
          cite: {
            source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
            loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
          }
        },
        {
          id: 'q14',
          text: 'Leaders like former Indonesian president Suharto—who was eventually forced to resign—and Malaysian president Mahathir Mohamad were extremely reluctant to enact the needed reforms and clashed with both their governments and political opponents, creating credibility problems abroad and political unrest at home.',
          lang: 'en',
          cite: {
            source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
            loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
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
            value: { d: '1997-07-02' },
            cites: [
              {
                source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
                loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'This placid scenario changed dramatically, however, on July 2, 1997, when Thailand devalued its currency, the baht.',
        lang: 'en',
        cite: {
          source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
          loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1998-01' },
            cites: [
              {
                source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
                loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'By January 1998, the currencies hit rock bottom.',
        lang: 'en',
        cite: {
          source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
          loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1998-11' },
            cites: [
              {
                source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
                loc: {
                  section: 'Paper Tigers? How the Asian Economies Lost Their Bite',
                  para: '33'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'In mid-November 1998, Brazil agreed to a $42 billion IMF-led program to stabilize its economy and soothe the still jittery international investment community.',
        lang: 'en',
        cite: {
          source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
          loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '33' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Sathorn_Unique_Tower_%28I%29.jpg/1280px-Sathorn_Unique_Tower_%28I%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sathorn_Unique_Tower_(I).jpg',
    credit: { creator: 'Supanut Arunoprayote' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  }
})
