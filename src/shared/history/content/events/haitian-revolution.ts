import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'haitian-revolution',
  names: [
    { text: 'Haitian Revolution', lang: 'en', role: 'primary' },
    {
      text: 'Saint-Domingue slave rebellion',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'The Haitian Revolution', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1791-08-22' },
        cites: [
          {
            source: 'state-dept-milestones-haitian-revolution',
            loc: { section: 'The United States and the Haitian Revolution, 1791–1804', para: '4' }
          },
          {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'The Haitian Revolution', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1804-01-01' },
        cites: [
          {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Independent Haiti', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:saint-domingue',
      cites: [
        {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Colonial Society', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Colonial Society', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:toussaint-louverture',
      role: 'leader',
      cites: [
        {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '5' }
        }
      ]
    },
    {
      ref: 'person:jean-jacques-dessalines',
      role: 'leader',
      cites: [
        {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Independent Haiti', para: '2' }
        }
      ]
    },
    {
      ref: 'person:napoleon-bonaparte',
      role: 'commander',
      cites: [
        {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '12' }
        }
      ]
    },
    {
      name: 'Charles Victor Emmanuel Leclerc',
      role: 'commander',
      cites: [
        {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '12' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:haitian-independence',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Independent Haiti', para: '1' }
        }
      ]
    },
    {
      ref: 'event:french-revolution',
      rel: 'caused-by',
      cites: [
        {
          source: 'state-dept-milestones-haitian-revolution',
          loc: { section: 'The United States and the Haitian Revolution, 1791–1804', para: '4' }
        }
      ]
    },
    {
      ref: 'event:louisiana-purchase',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-haitian-revolution',
          loc: { section: 'The United States and the Haitian Revolution, 1791–1804', para: '9' }
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
          text: 'The Haitian Revolution created the second independent country in the Americas after the United States became independent in 1783.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-haitian-revolution',
            loc: { section: 'The United States and the Haitian Revolution, 1791–1804', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/haitian-rev'
          }
        },
        {
          id: 'q2',
          text: 'A slave rebellion of 1791 finally toppled the colony.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'The Haitian Revolution', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/haiti/9.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'By the mid-eighteenth century, a territory largely neglected under Spanish rule had become the richest and most coveted colony in the Western Hemisphere.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Colonial Society', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/haiti/8.htm' }
        },
        {
          id: 'q4',
          text: 'The slaveholding system in Saint-Domingue was particularly cruel and abusive, and few slaves (especially males) lived long enough to reproduce.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Colonial Society', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/haiti/8.htm' }
        },
        {
          id: 'q5',
          text: 'The French Revolution had a great impact on the colony.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-haitian-revolution',
            loc: { section: 'The United States and the Haitian Revolution, 1791–1804', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/haitian-rev'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Through this action, it became the second independent state in the Western Hemisphere and the first free black republic in the world.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Independent Haiti', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/haiti/11.htm' }
        },
        {
          id: 'q7',
          text: 'Although France recognized Haitian independence in 1825, Haitians would have to wait until 1862 for the United States to recognize Haiti’s status as a sovereign, independent nation.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-haitian-revolution',
            loc: { section: 'The United States and the Haitian Revolution, 1791–1804', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/haitian-rev'
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
            value: { d: '1790' },
            cites: [
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'The Haitian Revolution', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The rebellion, led by Vincent Ogé in 1790, failed when the white militia reinforced itself with a corps of black volunteers.',
        lang: 'en',
        cite: {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'The Haitian Revolution', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/haiti/9.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1791-08-22' },
            cites: [
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'The Haitian Revolution', para: '6' }
              },
              {
                source: 'state-dept-milestones-haitian-revolution',
                loc: {
                  section: 'The United States and the Haitian Revolution, 1791–1804',
                  para: '4'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On August 22, a little more than a week after the ceremony, the uprising of their black followers began.',
        lang: 'en',
        cite: {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'The Haitian Revolution', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/haiti/9.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1793-08' },
            cites: [
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'Toussaint Louverture', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Indeed, in August Commissioner Léger-Félicité Sonthonax abolished slavery in the colony.',
        lang: 'en',
        cite: {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/haiti/10.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1794-02-04' },
            cites: [
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'Toussaint Louverture', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Confirmation of the National Assembly\'s decision on February 4, 1794, to abolish slavery appears to have been the strongest influence over Toussaint\'s actions.',
        lang: 'en',
        cite: {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/haiti/10.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1794-05-06' },
            cites: [
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'Toussaint Louverture', para: '5' }
              },
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'Toussaint Louverture', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'After arranging for his family to flee from the city of Santo Domingo, Toussaint pledged his support to France.',
        lang: 'en',
        cite: {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/haiti/10.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1791-08' },
            cites: [
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'The Haitian Revolution', para: '6' }
              },
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'The Haitian Revolution', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The rebellion left an estimated 10,000 blacks and 2,000 whites dead and more than 1,000 plantations sacked and razed.',
        lang: 'en',
        cite: {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'The Haitian Revolution', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/haiti/9.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1802-01' },
            cites: [
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'Toussaint Louverture', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Taking advantage of a temporary halt in the wars in Europe, Bonaparte dispatched to Saint-Domingue forces led by his brother-in-law, General Charles Victor Emmanuel Leclerc.',
        lang: 'en',
        cite: {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '12' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/haiti/10.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1802-05-05' },
            cites: [
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'Toussaint Louverture', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Recognizing his weak position, Toussaint surrendered to Leclerc on May 5, 1802.',
        lang: 'en',
        cite: {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Toussaint Louverture', para: '12' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/haiti/10.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1804-01-01' },
            cites: [
              {
                source: 'loc-haiti-country-study-1989',
                loc: { section: 'Independent Haiti', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'On January 1, 1804, Haiti proclaimed its independence.',
        lang: 'en',
        cite: {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Independent Haiti', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/haiti/11.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Portrait_de_Toussaint_Louverture%2C_%C3%A0_cheval1.jpg/1280px-Portrait_de_Toussaint_Louverture%2C_%C3%A0_cheval1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_de_Toussaint_Louverture,_%C3%A0_cheval1.jpg',
    credit: { institution: 'Bibliothèque nationale de France (Gallica)' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'james-1963-the-black-jacobins', perspective: 'caribbean' }
  ]
})
