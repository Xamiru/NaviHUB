import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'french-intervention-in-mexico',
  names: [
    { text: 'French intervention in Mexico', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1861-12-08' },
        cites: [
          {
            source: 'state-dept-milestones-french-intervention-in-mexico',
            loc: {
              section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
              para: '6'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1867-06-19' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:veracruz',
      cites: [
        {
          source: 'state-dept-milestones-french-intervention-in-mexico',
          loc: {
            section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
            para: '6'
          }
        }
      ]
    },
    {
      ref: 'place:puebla',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '3' }
        }
      ]
    },
    {
      ref: 'place:mexico-city',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '4' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'polity:second-french-empire' }
  ],
  polities: [
    { ref: 'polity:mexico' },
    { ref: 'polity:second-mexican-empire' }
  ],
  related: [
    { ref: 'event:reform-war', rel: 'preceded-by' }
  ],
  sides: [
    {
      key: 'france',
      name: 'French',
      polity: 'polity:second-french-empire',
      cites: [
        {
          source: 'state-dept-milestones-french-intervention-in-mexico',
          loc: {
            section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
            para: '6'
          }
        }
      ]
    },
    {
      key: 'conservatives',
      name: 'Conservatives',
      cites: [
        {
          source: 'state-dept-milestones-french-intervention-in-mexico',
          loc: {
            section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
            para: '6'
          }
        }
      ]
    },
    {
      key: 'liberals',
      name: 'Liberals',
      cites: [
        {
          source: 'state-dept-milestones-french-intervention-in-mexico',
          loc: {
            section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
            para: '6'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:napoleon-iii',
      role: 'head-of-state',
      side: 'france',
      cites: [
        {
          source: 'state-dept-milestones-french-intervention-in-mexico',
          loc: {
            section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
            para: '1'
          }
        }
      ]
    },
    {
      ref: 'person:maximilian-i-of-mexico',
      role: 'head-of-state',
      side: 'conservatives',
      cites: [
        {
          source: 'state-dept-milestones-french-intervention-in-mexico',
          loc: {
            section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
            para: '1'
          }
        }
      ]
    },
    {
      ref: 'person:benito-juarez',
      role: 'leader',
      side: 'liberals',
      cites: [
        {
          source: 'state-dept-milestones-french-intervention-in-mexico',
          loc: {
            section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
            para: '6'
          }
        }
      ]
    },
    {
      name: 'Ignacio Zaragoza',
      role: 'commander',
      side: 'liberals',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '3' }
        }
      ]
    },
    {
      name: 'William Henry Seward',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-french-intervention-in-mexico',
          loc: {
            section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
            para: '7'
          }
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
          text: 'In 1862, French Emperor Napoleon III maneuvered to establish a French client state in Mexico, and eventually installed Maximilian of Habsburg, Archduke of Austria, as Emperor of Mexico.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-intervention-in-mexico',
            loc: {
              section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/french-intervention'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q2',
          text: 'In March 1861, Juárez won the presidential election, but the war left the treasury depleted.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        },
        {
          id: 'q3',
          text: 'Juárez proceeded to declare a moratorium on all foreign debt repayments.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        },
        {
          id: 'q4',
          text: 'Spurred by dreams of reestablishing an empire in the New World, the French remained and, with the support of Mexican conservatives, embarked on an occupation of Mexico.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'In response to these actions, Secretary of State Seward issued statements of disapproval, but the U.S. Government was unable to intervene directly because of the American Civil War.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-intervention-in-mexico',
            loc: {
              section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/french-intervention'
          }
        },
        {
          id: 'q6',
          text: 'In 1865, Liberal military victories made Maximilian’s position increasingly difficult.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-intervention-in-mexico',
            loc: {
              section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/french-intervention'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'His capture by Mexican forces, court-martial, and sentence to be executed, marked the end of direct European intervention in Mexico.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-intervention-in-mexico',
            loc: {
              section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/french-intervention'
          }
        },
        {
          id: 'q8',
          text: 'At the same time, the joint Mexican expedition conducted with England and Spain, and later solely by France, turned into a fiasco.',
          lang: 'en',
          cite: {
            source: 'ehne-anceau-napoleon-iii-and-europe',
            loc: { section: 'Napoleon III and Europe' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/arbiters-and-arbitration-in-europe-beginning-modern-times/napoleon-iii-and-europe'
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
            value: { d: '1861-10-31' },
            cites: [
              {
                source: 'state-dept-milestones-french-intervention-in-mexico',
                loc: {
                  section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
                  para: '6'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In response, representatives from the Spanish, French, and British governments met in London, and on October 31, 1861, signed a tripartite agreement to intervene in Mexico to recover the unpaid debts.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-french-intervention-in-mexico',
          loc: {
            section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
            para: '6'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1861-1865/french-intervention'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1861-12-08' },
            cites: [
              {
                source: 'state-dept-milestones-french-intervention-in-mexico',
                loc: {
                  section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
                  para: '6'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'European forces landed at Veracruz on December 8.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-french-intervention-in-mexico',
          loc: {
            section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
            para: '6'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1861-1865/french-intervention'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1862-05-05' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Civil War and the French Intervention', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In Puebla, the French troops encountered strong resistance led by one of Juárez\'s trusted men, General Ignacio Zaragoza, who defeated the foreigners on May 5, 1862 (May 5 is celebrated today as one of Mexico\'s two national holidays).',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1866-01-31' },
            cites: [
              {
                source: 'state-dept-milestones-french-intervention-in-mexico',
                loc: {
                  section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
                  para: '9'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On January 31, 1866, Napoleon III ordered the withdrawal of French troops, to be conducted in three stages from November 1866 to November 1867.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-french-intervention-in-mexico',
          loc: {
            section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
            para: '9'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1861-1865/french-intervention'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1867-05-15' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Civil War and the French Intervention', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'United republican forces resumed their campaign on February 19, 1867, and on May 15, Maximilian surrendered. He was tried and, on Juárez\'s orders, was executed on June 19.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Manet%2C_Edouard_-_The_Execution_of_Emperor_Maximilian%2C_1867.jpg/1280px-Manet%2C_Edouard_-_The_Execution_of_Emperor_Maximilian%2C_1867.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Manet,_Edouard_-_The_Execution_of_Emperor_Maximilian,_1867.jpg',
    credit: { institution: 'Museum of Fine Arts, Boston', creator: 'Édouard Manet' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'pani-2001-para-mexicanizar-el-segundo-imperio', perspective: 'latin-american' },
    { source: 'avenel-1996-la-campagne-du-mexique', perspective: 'european' }
  ]
})
