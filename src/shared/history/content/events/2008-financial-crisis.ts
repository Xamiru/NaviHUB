import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2008-financial-crisis',
  names: [
    { text: '2008 financial crisis', lang: 'en', role: 'primary' },
    {
      text: 'Global financial crisis',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'european-union-history-of-the-european-union-2000-09',
          loc: { section: 'History of the European Union 2000-09', para: '19' }
        }
      ]
    },
    {
      text: 'Financial Crisis of 2008',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-domestic-affairs',
          loc: { section: 'George W. Bush: Domestic Affairs', para: '35' }
        }
      ]
    }
  ],
  researched: '2026-10-12',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '2007' },
        cites: [
          {
            source: 'millercenter-gregg-gw-bush-domestic-affairs',
            loc: { section: 'George W. Bush: Domestic Affairs', para: '36' }
          }
        ]
      }
    ]
  },
  regions: ['global', 'north-america'],
  prominence: 1,
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-domestic-affairs',
          loc: { section: 'George W. Bush: Domestic Affairs', para: '38' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:george-w-bush',
      role: 'head-of-state',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-domestic-affairs',
          loc: { section: 'George W. Bush: Domestic Affairs', para: '38' }
        }
      ]
    },
    {
      ref: 'person:barack-obama',
      role: 'head-of-state',
      cites: [
        {
          source: 'millercenter-nelson-obama-domestic-affairs',
          loc: { section: 'Barack Obama: Domestic Affairs', para: '11' }
        }
      ]
    },
    {
      name: 'Henry Paulson',
      role: 'negotiator',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-domestic-affairs',
          loc: { section: 'George W. Bush: Domestic Affairs', para: '38' }
        }
      ]
    },
    {
      name: 'Ben Bernanke',
      role: 'participant',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-domestic-affairs',
          loc: { section: 'George W. Bush: Domestic Affairs', para: '37' }
        }
      ]
    },
    {
      name: 'Alan Greenspan',
      role: 'participant',
      cites: [
        {
          source: 'millercenter-gregg-gw-bush-domestic-affairs',
          loc: { section: 'George W. Bush: Domestic Affairs', para: '37' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:2008-united-states-presidential-election',
      rel: 'related',
      cites: [
        {
          source: 'millercenter-nelson-obama-domestic-affairs',
          loc: { section: 'Barack Obama: Domestic Affairs', para: '11' }
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
          text: 'A major financial crisis hits the world economy.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-2000-09',
            loc: { section: 'History of the European Union 2000-09', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/2000-09_en'
          }
        },
        {
          id: 'q2',
          text: 'Economic concerns drove the Federal Reserve to lower the Federal Funds Interest Rate, which it did seven times.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-domestic-affairs',
            loc: { section: 'George W. Bush: Domestic Affairs', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/domestic-affairs'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'The root of the problem was a bubble in the housing market, which made the sale of mortgages extremely profitable.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-domestic-affairs',
            loc: { section: 'George W. Bush: Domestic Affairs', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/domestic-affairs'
          }
        },
        {
          id: 'q4',
          text: 'Large deregulated banks bundled mortgages into supposedly low-risk collateralized debt obligations and sold them to investors and to other large institutions.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-domestic-affairs',
            loc: { section: 'George W. Bush: Domestic Affairs', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/domestic-affairs'
          }
        },
        {
          id: 'q5',
          text: 'The problems start with mortgage loans in the United States.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-2000-09',
            loc: { section: 'History of the European Union 2000-09', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/2000-09_en'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'The federal government took over the mortgage giants, Fannie Mae and Freddie Mac, to prevent the two companies from failing.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-domestic-affairs',
            loc: { section: 'George W. Bush: Domestic Affairs', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/domestic-affairs'
          }
        },
        {
          id: 'q7',
          text: 'TARP worked: The auto companies, which had to reform their corporate operations in return for funding, survived, as did all of the major banks.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-domestic-affairs',
            loc: { section: 'Barack Obama: Domestic Affairs', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/domestic-affairs'
          }
        },
        {
          id: 'q8',
          text: 'The policies averted a possible, even probable, free fall into another Great Depression.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-domestic-affairs',
            loc: { section: 'Barack Obama: Domestic Affairs', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/domestic-affairs'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Along with the tax cuts and the wars in Afghanistan and Iraq, the financial crisis caused the federal deficit to skyrocket.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-domestic-affairs',
            loc: { section: 'George W. Bush: Domestic Affairs', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/domestic-affairs'
          }
        },
        {
          id: 'q10',
          text: 'The crisis leads to closer economic cooperation between EU countries.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-2000-09',
            loc: { section: 'History of the European Union 2000-09', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/2000-09_en'
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
            value: { d: '2007' },
            cites: [
              {
                source: 'millercenter-gregg-gw-bush-domestic-affairs',
                loc: { section: 'George W. Bush: Domestic Affairs', para: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The U.S. economy began to decline in late 2007.',
        lang: 'en',
        cite: {
          source: 'millercenter-gregg-gw-bush-domestic-affairs',
          loc: { section: 'George W. Bush: Domestic Affairs', para: '36' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/gwbush/domestic-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008-09' },
            cites: [
              {
                source: 'millercenter-gregg-gw-bush-domestic-affairs',
                loc: { section: 'George W. Bush: Domestic Affairs', para: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In September 2008, the financial giant, Lehman Brothers, declared bankruptcy.',
        lang: 'en',
        cite: {
          source: 'millercenter-gregg-gw-bush-domestic-affairs',
          loc: { section: 'George W. Bush: Domestic Affairs', para: '36' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/gwbush/domestic-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008-09' },
            cites: [
              {
                source: 'european-union-history-of-the-european-union-2000-09',
                loc: { section: 'History of the European Union 2000-09', para: '19' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Several European banks also experience difficulties.',
        lang: 'en',
        cite: {
          source: 'european-union-history-of-the-european-union-2000-09',
          loc: { section: 'History of the European Union 2000-09', para: '20' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://european-union.europa.eu/principles-countries-history/history-eu/2000-09_en'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008-10' },
            cites: [
              {
                source: 'millercenter-gregg-gw-bush-domestic-affairs',
                loc: { section: 'George W. Bush: Domestic Affairs', para: '38' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In October, President Bush signed the Emergency Economic Stabilization Act, which established the Troubled Assets Relief Program (TARP).',
        lang: 'en',
        cite: {
          source: 'millercenter-gregg-gw-bush-domestic-affairs',
          loc: { section: 'George W. Bush: Domestic Affairs', para: '38' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/gwbush/domestic-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2009-02-17' },
            cites: [
              {
                source: 'millercenter-nelson-obama-domestic-affairs',
                loc: { section: 'Barack Obama: Domestic Affairs', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Obama\'s first major new recommendation to Congress was for an $800-billion economic stimulus package: the American Recovery and Reinvestment Act. About one-third of the money involved grants to state governments to keep them from laying off public employees or reducing unemployment compensation; about one-third was for middle-class tax cuts; and about a third went for bridges, highways, sewage treatment facilities, and other infrastructure projects. The latter category included tens of billions of dollars to spur research and development of renewable sources of energy, especially wind and solar. These sectors flourished in the years that followed and came to occupy a rapidly growing share of the nation’s overall energy usage. Although Obama hoped to pass the Recovery Act with bipartisan support, not a single Republican House member and only three Republican senators voted for it. Democratic control of Congress was strong enough to secure its passage, however, and President Obama signed the act into law on February 17, 2009.',
        lang: 'en',
        cite: {
          source: 'millercenter-nelson-obama-domestic-affairs',
          loc: { section: 'Barack Obama: Domestic Affairs', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/obama/domestic-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2010' },
            cites: [
              {
                source: 'millercenter-nelson-obama-domestic-affairs',
                loc: { section: 'Barack Obama: Domestic Affairs', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'In 2010, Obama persuaded Congress to enact financial reform legislation, the Dodd-Frank Wall Street Reform and Consumer Protection Act, designed to prevent economic meltdowns like the one he inherited when he took office.',
        lang: 'en',
        cite: {
          source: 'millercenter-nelson-obama-domestic-affairs',
          loc: { section: 'Barack Obama: Domestic Affairs', para: '28' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/obama/domestic-affairs'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Lehman_Brothers-NYC-20080915.jpg/1280px-Lehman_Brothers-NYC-20080915.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lehman_Brothers-NYC-20080915.jpg',
    credit: { creator: 'Robert Scoble' },
    license: { id: 'cc-by', version: '2.0', url: 'https://creativecommons.org/licenses/by/2.0' }
  }
})
