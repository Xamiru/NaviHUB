import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'second-opium-war',
  names: [
    { text: 'Second Opium War', lang: 'en', role: 'primary' },
    { text: '第二次鴉片戰爭', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1856' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '17' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1860' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '17' }
          }
        ]
      },
      {
        value: { d: '1861' },
        cites: [
          {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '12' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Jean Calmard' }
        ]
      }
    ]
  },
  regions: ['east-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:guangzhou',
      cites: [
        {
          source: 'state-dept-milestones-opening-to-china-2',
          loc: {
            section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
            para: '1'
          }
        }
      ]
    },
    {
      ref: 'place:tianjin',
      cites: [
        {
          source: 'state-dept-milestones-opening-to-china-2',
          loc: {
            section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
            para: '1'
          }
        }
      ]
    },
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'state-dept-milestones-opening-to-china-2',
          loc: {
            section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
            para: '4'
          }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'allies',
      name: 'the British',
      cites: [
        {
          source: 'state-dept-milestones-opening-to-china-2',
          loc: {
            section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
            para: '1'
          }
        }
      ]
    },
    {
      key: 'china',
      name: 'the Chinese Government',
      cites: [
        {
          source: 'state-dept-milestones-opening-to-china-2',
          loc: {
            section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
            para: '4'
          }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'John Ward',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-opening-to-china-2',
          loc: {
            section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
            para: '5'
          }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Following the First Opium War in the 1840s, the Western powers concluded a series of treaties with China in an effort to open its lucrative markets to Western trade. In the 1850s, the United States and the European powers grew increasingly dissatisfied with both the terms of their treaties with China and the Qing Government’s failure to adhere to them.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-china-2',
            loc: {
              section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/china-2'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'The British forced the issue by attacking the Chinese port cities of Guangzhou and Tianjin in the Second Opium War.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-china-2',
            loc: {
              section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/china-2'
          }
        },
        {
          id: 'q3',
          text: 'As a result, France, Russia, and the United States all signed treaties with China at Tianjin in quick succession in 1858.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-china-2',
            loc: {
              section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/china-2'
          }
        },
        {
          id: 'q4',
          text: 'Although the Chinese signed the treaties in 1858, it took two more years of fighting before the Chinese Government was disposed to ratify them and accept the terms.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-china-2',
            loc: {
              section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/china-2'
          }
        },
        {
          id: 'q5',
          text: 'Joined by French forces, the British entered the city and burned the Summer Palace in the northwestern periphery, but spared the Forbidden City, home of the Chinese emperor.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-china-2',
            loc: {
              section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/china-2'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The agreements reached between the Western powers and China following the Opium Wars came to be known as the “unequal treaties” because in practice they gave foreigners privileged status and extracted concessions from the Chinese.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-china-2',
            loc: {
              section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/china-2'
          }
        },
        {
          id: 'q7',
          text: 'Although the unequal treaties and the use of the most-favored-nation clause were effective in creating and maintaining open trade with China, both were also important factors in building animosity and resentment toward Western imperialism.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-china-2',
            loc: {
              section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/china-2'
          }
        },
        {
          id: 'q8',
          text: 'In 1860 Russian diplomats secured the secession of all of Manchuria north of the Heilong Jiang and east of the Wusuli Jiang (Ussuri River).',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Self-Strengthening Movement', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/17.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1858' },
            cites: [
              {
                source: 'state-dept-milestones-opening-to-china-2',
                loc: {
                  section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The number of treaty ports increased, with new ports opened to Western trade along the Chinese coast, on the islands of Taiwan and Hainan, and along the Yangtze River in the interior. With the opening of the Yangtze River, foreigners also gained full access to the interior, and were free to travel and conduct business or missions anywhere in China.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-opening-to-china-2',
          loc: {
            section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
            para: '3'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1830-1860/china-2'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1858' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Under the Treaty of Aigun in 1858 and the Treaty of Beijing in 1860, China ceded to Russia extensive trading rights and regions adjacent to the Amur and Ussuri rivers and allowed Russia to begin building a port and naval base at Vladivostok.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '17' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1859' },
            cites: [
              {
                source: 'state-dept-milestones-opening-to-china-2',
                loc: {
                  section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
                  para: '4'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Although the Chinese repulsed an attack on the Dagu forts in 1859, that one victory was not enough to stop the British forces from making their way north to Beijing.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-opening-to-china-2',
          loc: {
            section: 'The Opening to China Part II: the Second Opium War, the United States, and the Treaty of Tianjin, 1857–1859',
            para: '4'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1830-1860/china-2'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/The_Second_Opium_War%2C_1856-1860_Q69841.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Second_Opium_War,_1856-1860_Q69841.jpg',
    credit: { institution: 'Imperial War Museums', creator: 'Felice Beato' },
    license: { id: 'public-domain' }
  }
})
