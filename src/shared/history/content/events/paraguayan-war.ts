import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'paraguayan-war',
  names: [
    {
      text: 'Paraguayan War',
      lang: 'en',
      role: 'primary',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Second Empire, 1840-89', para: '16' }
        }
      ]
    },
    {
      text: 'War of the Triple Alliance',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-paraguay-country-study-1988',
          loc: { section: 'Francisco Solano Lopez', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1864-11' },
        cites: [
          {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'The War of the Triple Alliance', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1870' },
        cites: [
          {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'The War of the Triple Alliance', para: '7' }
          },
          {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '16' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:asuncion',
      cites: [
        {
          source: 'loc-paraguay-country-study-1988',
          loc: { section: 'The War of the Triple Alliance', para: '7' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'paraguay',
      name: 'Paraguay',
      cites: [
        {
          source: 'loc-paraguay-country-study-1988',
          loc: { section: 'The War of the Triple Alliance', para: '1' }
        }
      ]
    },
    {
      key: 'allies',
      name: 'Argentina, Brazil, and Uruguay',
      cites: [
        {
          source: 'loc-paraguay-country-study-1988',
          loc: { section: 'The War of the Triple Alliance', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:francisco-solano-lopez',
      role: 'leader',
      side: 'paraguay',
      cites: [
        {
          source: 'loc-paraguay-country-study-1988',
          loc: { section: 'The War of the Triple Alliance', para: '1' }
        }
      ]
    },
    {
      name: 'Bartolomé Mitre',
      role: 'head-of-state',
      side: 'allies',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Second Empire, 1840-89', para: '10' }
        }
      ]
    },
    {
      name: 'Lima e Silva, Duke of Caxias',
      role: 'commander',
      side: 'allies',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Second Empire, 1840-89', para: '10' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'paraguay',
      value: {
        alts: [
          {
            value: { min: 30000 },
            cites: [
              {
                source: 'loc-paraguay-country-study-1988',
                loc: { section: 'The War of the Triple Alliance', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Paraguay: A Country Study (Library of Congress)' }
            ]
          },
          {
            value: { min: 64000 },
            cites: [
              {
                source: 'loc-brazil-country-study-1997',
                loc: { section: 'The Second Empire, 1840-89', para: '9' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Brazil: A Country Study (Library of Congress)' }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q19',
          text: 'Solano López, mistakenly expecting help from anti-Buenos Aires caudillos, sent his forces into Corrientes to get at Rio Grande do Sul and Uruguay and found himself at war with both Argentina and Brazil.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q2',
          text: 'In May 1865, those two countries and Colorado-led Uruguay signed an alliance that aimed to transfer contested Paraguayan territory to the larger countries, to open Paraguayan rivers to international trade, and to remove Solano López.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q1',
          text: 'Apart from some Paraguayan victories on the northern front, the war was a disaster for Solano López.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'The War of the Triple Alliance', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In terms of size, Solano López\'s 30,000-man army was the most powerful in Latin America.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'The War of the Triple Alliance', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
        },
        {
          id: 'q4',
          text: 'A small landlocked country, Paraguay had the largest army in the region: 64,000 soldiers compared with Brazil\'s standing army of 18,000.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q5',
          text: 'Paraguay\'s population was only about 450,000 in 1865--a figure lower than the number of people in the Brazilian National Guard--and amounted to less than one-twentieth of the combined allied population of 11 million.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'The War of the Triple Alliance', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'By 1867 Paraguay had lost 60,000 men to casualties, disease, or capture, and another 60,000 soldiers were called to duty.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'The War of the Triple Alliance', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
        },
        {
          id: 'q7',
          text: 'The war dragged on for several reasons.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q8',
          text: 'Imagining himself surrounded by a vast conspiracy, he ordered thousands of executions in the military.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'The War of the Triple Alliance', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The year 1870 marked the lowest point in Paraguayan history.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'The War of the Triple Alliance', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
        },
        {
          id: 'q10',
          text: 'Hundreds of thousands of Paraguayans had died.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'The War of the Triple Alliance', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
        },
        {
          id: 'q11',
          text: 'Destitute and practically destroyed, Paraguay had to endure a lengthy occupation by foreign troops and cede large patches of territory to Brazil and Argentina.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'The War of the Triple Alliance', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
        },
        {
          id: 'q12',
          text: 'They then occupied Paraguay until 1878.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q13',
          text: 'After the Paraguayan War (1864-70), the monarchy was indifferent to the army, which the civilian elite did not perceive as a threat.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1864-11' },
            cites: [
              {
                source: 'loc-paraguay-country-study-1988',
                loc: { section: 'The War of the Triple Alliance', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'When Argentina failed to react to Brazil\'s invasion of Uruguay, Solano López seized a Brazilian warship in November 1864.',
        lang: 'en',
        cite: {
          source: 'loc-paraguay-country-study-1988',
          loc: { section: 'The War of the Triple Alliance', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1865-03' },
            cites: [
              {
                source: 'loc-paraguay-country-study-1988',
                loc: { section: 'The War of the Triple Alliance', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'He quickly followed this move with an invasion of Mato Grosso, Brazil, in March 1865, an action that proved to be one of Paraguay\'s few successes during the war.',
        lang: 'en',
        cite: {
          source: 'loc-paraguay-country-study-1988',
          loc: { section: 'The War of the Triple Alliance', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1865-05' },
            cites: [
              {
                source: 'loc-paraguay-country-study-1988',
                loc: { section: 'The War of the Triple Alliance', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Instead, the action set the stage for the May 1865 signing by Argentina, Brazil, and Uruguay (now reduced to puppet status) of the Treaty of the Triple Alliance.',
        lang: 'en',
        cite: {
          source: 'loc-paraguay-country-study-1988',
          loc: { section: 'The War of the Triple Alliance', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1866-09' },
            cites: [
              {
                source: 'loc-brazil-country-study-1997',
                loc: { section: 'The Second Empire, 1840-89', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Fiercely defending their homeland, the Guaraní-speaking Paraguayans defeated the allies at Curupaití in September 1866.',
        lang: 'en',
        cite: {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Second Empire, 1840-89', para: '10' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1869-01' },
            cites: [
              {
                source: 'loc-paraguay-country-study-1988',
                loc: { section: 'The War of the Triple Alliance', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'Allied troops entered Asunción in January 1869, but Solano López held out in the northern jungles for another fourteen months until he finally died in battle.',
        lang: 'en',
        cite: {
          source: 'loc-paraguay-country-study-1988',
          loc: { section: 'The War of the Triple Alliance', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Legion_Paraguaya.jpg/1280px-Legion_Paraguaya.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Legion_Paraguaya.jpg',
    credit: { institution: 'Biblioteca Nacional de Uruguay' },
    license: { id: 'public-domain' }
  }
})
