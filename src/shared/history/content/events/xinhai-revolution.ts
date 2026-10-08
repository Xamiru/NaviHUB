import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'xinhai-revolution',
  names: [
    { text: 'Xinhai Revolution', lang: 'en', role: 'primary' },
    { text: '辛亥革命', lang: 'zh', role: 'native', translit: 'Xīnhài Gémìng' },
    {
      text: 'Republican Revolution of 1911',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '2' }
        }
      ]
    },
    {
      text: 'Chinese Revolution of 1911',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-chinese-revolution-of-1911',
          loc: { section: 'The Chinese Revolution of 1911', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1911-10-10' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Republican Revolution of 1911', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1912-02-12' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Republican Revolution of 1911', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:wuchang',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '2' }
        }
      ]
    },
    {
      ref: 'place:nanjing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '2' }
        }
      ]
    },
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '2' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:qing-empire' },
    { ref: 'polity:republic-of-china' }
  ],
  participants: [
    {
      ref: 'person:sun-yat-sen',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '1' }
        },
        {
          source: 'state-dept-milestones-chinese-revolution-of-1911',
          loc: { section: 'The Chinese Revolution of 1911', para: '6' }
        }
      ]
    },
    {
      ref: 'person:yuan-shikai',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '2' }
        }
      ]
    },
    {
      name: 'Puyi',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '2' }
        }
      ]
    },
    {
      name: 'Huang Xing',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:boxer-uprising', rel: 'preceded-by' },
    { ref: 'event:may-fourth-movement', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In October of 1911, a group of revolutionaries in southern China led a successful revolt against the Qing Dynasty, establishing in its place the Republic of China and ending the imperial system.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-revolution-of-1911',
            loc: { section: 'The Chinese Revolution of 1911', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/chinese-rev'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q2',
          text: 'Failure of reform from the top and the fiasco of the Boxer Uprising convinced many Chinese that the only real solution lay in outright revolution, in sweeping away the old order and erecting a new one patterned preferably after the example of Japan.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Republican Revolution of 1911', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/19.htm' }
        },
        {
          id: 'q3',
          text: 'The combination of increasing imperialist demands (from both Japan and the West), frustration with the foreign Manchu Government embodied by the Qing court, and the desire to see a unified China less parochial in outlook fed a growing nationalism that spurred on revolutionary ideas.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-revolution-of-1911',
            loc: { section: 'The Chinese Revolution of 1911', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/chinese-rev'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The revolt quickly spread to neighboring cities, and Tongmeng Hui members throughout the country rose in immediate support of the Wuchang revolutionary forces. By late November, fifteen of the twenty-four provinces had declared their independence of the Qing empire.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Republican Revolution of 1911', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/19.htm' }
        },
        {
          id: 'q5',
          text: 'To prevent civil war and possible foreign intervention from undermining the infant republic, Sun agreed to Yuan\'s demand that China be united under a Beijing government headed by Yuan.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Republican Revolution of 1911', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/19.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The 1911 revolution was only the first steps in a process that would require the 1949 revolution to complete. Though the new government created the Republic of China and established the seat of government in Nanjing, it failed to unify the country under its control. The Qing withdrawal led to a power vacuum in certain regions, resulting in the rise of warlords.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-revolution-of-1911',
            loc: { section: 'The Chinese Revolution of 1911', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/chinese-rev'
          }
        },
        {
          id: 'q7',
          text: 'With opposition at every quarter and the nation breaking up into warlord factions, Yuan Shikai died of natural causes in June 1916, deserted by his lieutenants.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'REPUBLICAN CHINA', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/20.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1911-10-10' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Republican Revolution of 1911', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The republican revolution broke out on October 10, 1911, in Wuchang, the capital of Hubei Province, among discontented modernized army units whose anti-Qing plot had been uncovered.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/19.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1912-01-01' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Republican Revolution of 1911', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On January 1, 1912, Sun was inaugurated in Nanjing as the provisional president of the new Chinese republic.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/19.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1912-02-12' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Republican Revolution of 1911', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On February 12, 1912, the last Manchu emperor, the child Puyi, abdicated.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/19.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1912-03-10' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Republican Revolution of 1911', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On March 10, in Beijing, Yuan Shikai was sworn in as provisional president of the Republic of China.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/19.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Marshal_Li_recovering_Nanjing_during_the_Xinhai_Revolution_of_1911_LCCN2008661174.jpg/1280px-Marshal_Li_recovering_Nanjing_during_the_Xinhai_Revolution_of_1911_LCCN2008661174.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Marshal_Li_recovering_Nanjing_during_the_Xinhai_Revolution_of_1911_LCCN2008661174.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'jin-hu-1980-xinhai-geming-shigao', perspective: 'chinese' },
    { source: 'zhang-lin-1980-xinhai-geming-shi', perspective: 'chinese' }
  ]
})
