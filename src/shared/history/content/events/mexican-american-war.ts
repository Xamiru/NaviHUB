import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'mexican-american-war',
  names: [
    { text: 'Mexican–American War', lang: 'en', role: 'primary' },
    { text: 'Guerra de Estados Unidos-México', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1846-04-25' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Mexican-American War', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1848-02-02' },
        cites: [
          {
            source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
            loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'National Archives and Records Administration' }
        ]
      },
      {
        value: { d: '1847-09-13' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Mexican-American War', para: '7' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      }
    ]
  },
  regions: ['north-america', 'latin-america'],
  prominence: 1,
  places: [
    {
      ref: 'place:mexico-city',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Mexican-American War', para: '7' }
        }
      ]
    },
    {
      ref: 'place:veracruz',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Mexican-American War', para: '6' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:texas-revolution', rel: 'related' },
    { ref: 'period:republic-of-texas', rel: 'related' },
    {
      ref: 'event:treaty-of-guadalupe-hidalgo',
      rel: 'led-to',
      cites: [
        {
          source: 'nara-milestone-treaty-of-guadalupe-hidalgo',
          loc: { section: 'Treaty of Guadalupe Hidalgo (1848)', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'us',
      name: 'United States',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Mexican-American War', para: '4' }
        }
      ]
    },
    {
      key: 'mexico',
      name: 'Mexico',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Mexican-American War', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'James K. Polk',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'state-dept-milestones-texas-annexation',
          loc: {
            section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
            para: '1'
          }
        }
      ]
    },
    {
      name: 'Zachary Taylor',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Mexican-American War', para: '5' }
        }
      ]
    },
    {
      name: 'Winfield Scott',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Mexican-American War', para: '5' }
        }
      ]
    },
    {
      name: 'Stephen W. Kearney',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Mexican-American War', para: '5' }
        }
      ]
    },
    {
      name: 'Santa Anna',
      role: 'commander',
      side: 'mexico',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Mexican-American War', para: '4' }
        }
      ]
    },
    {
      name: 'José Joaquín Herrera',
      role: 'head-of-state',
      side: 'mexico',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Mexican-American War', para: '3' }
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
          text: 'During his tenure, U.S. President James K. Polk oversaw the greatest territorial expansion of the United States to date.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
          }
        },
        {
          id: 'q2',
          text: 'Hostilities between Mexico and the United States began on April 25, 1846, when several United States soldiers were killed in a cavalry skirmish with Mexican forces in the disputed territory.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Mexican-American War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/18.htm' }
        },
        {
          id: 'q3',
          text: 'The United States Army attacked on three fronts: one column, under General Stephen W. Kearney, occupied California and New Mexico; another column, under General Zachary Taylor, entered northern Mexico; and a third detachment, commanded by General Winfield Scott, landed at Veracruz and marched to Mexico City.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Mexican-American War', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/18.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'In early 1845, the United States Congress passed a resolution in favor of the annexation of Texas, which prompted Mexico to sever diplomatic relations with the United States.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Mexican-American War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/18.htm' }
        },
        {
          id: 'q5',
          text: 'With the support of President-elect Polk, Tyler managed to get the joint resolution passed on March 1, 1845, and Texas was admitted into the United States on December 29.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
          }
        },
        {
          id: 'q6',
          text: 'The Mexicans, however, argued that the border only extended to the Nueces River, north of the Rio Grande.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'California and New Mexico fell with little bloodshed.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Mexican-American War', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/18.htm' }
        },
        {
          id: 'q8',
          text: 'After several days of heavy naval bombardment that killed hundreds of civilians, Veracruz surrendered on March 27, 1847.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Mexican-American War', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/18.htm' }
        },
        {
          id: 'q9',
          text: 'During the battle, young cadets from the Mexican military academy, the Niños Héroes (or "boy heroes") leapt to their deaths rather than surrender.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Mexican-American War', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/18.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'These events brought within the control of the United States the future states of Texas, California, Nevada, New Mexico, Arizona, Utah, Washington, and Oregon, as well as portions of what would later become Oklahoma, Colorado, Kansas, Wyoming, and Montana.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
          }
        },
        {
          id: 'q11',
          text: 'The war had another significant outcome.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
          }
        },
        {
          id: 'q12',
          text: 'The question of whether slavery could expand throughout the United States continue to fester until the defeat of the Confederacy in 1865.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
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
            value: { d: '1846-05-13' },
            cites: [
              {
                source: 'state-dept-milestones-texas-annexation',
                loc: {
                  section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
                  para: '8'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On May 13, 1846, the United States declared war on Mexico.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-texas-annexation',
          loc: {
            section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
            para: '8'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1846-08-08' },
            cites: [
              {
                source: 'state-dept-milestones-texas-annexation',
                loc: {
                  section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
                  para: '13'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On August 8, 1846, Congressman David Wilmot introduced a rider to an appropriations bill that stipulated that “neither slavery nor involuntary servitude shall ever exist” in any territory acquired by the United States in the war against Mexico.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-texas-annexation',
          loc: {
            section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
            para: '13'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1847-03-09' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'The Mexican-American War', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The heaviest fighting was done by Scott\'s Army of Occupation, which landed at Veracruz on March 9, 1847.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Mexican-American War', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/18.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1847-09-13' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'The Mexican-American War', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'On August 20, 1847, the Army of Occupation asked for the surrender of Mexico City, but the battle continued until September 13, 1847, when the last bastion of Mexican resistance fell during the famous Battle of Chapultepec.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'The Mexican-American War', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/18.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/The_storming_of_Chapu%28ltepec%29_Sept._13th_%281847%29_LCCN2001701801.jpg/1280px-The_storming_of_Chapu%28ltepec%29_Sept._13th_%281847%29_LCCN2001701801.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_storming_of_Chapu(ltepec)_Sept._13th_(1847)_LCCN2001701801.jpg',
    credit: { institution: 'Library of Congress', creator: 'Sarony & Major' },
    license: { id: 'public-domain' }
  }
})
