import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'carnation-revolution',
  names: [
    { text: 'Carnation Revolution', lang: 'en', role: 'primary' },
    { text: 'Revolução dos Cravos', lang: 'pt', role: 'native' },
    {
      text: 'Revolution of 1974',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'THE REVOLUTION OF 1974', para: '-1' }
        }
      ]
    },
    { text: '25 de Abril', lang: 'pt', role: 'alternative' }
  ],
  researched: '2026-10-09',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1974-04-25' },
        cites: [
          {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Spínola and Revolution', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:lisbon',
      cites: [
        {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'mfa',
      name: 'Armed Forces Movement (MFA)',
      cites: [
        {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '2' }
        }
      ]
    },
    {
      key: 'regime',
      name: 'Caetano regime (Estado Novo)',
      cites: [
        {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '2' }
        },
        {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'THE REVOLUTION OF 1974', para: '8' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Marcelo Caetano',
      role: 'head-of-government',
      side: 'regime',
      cites: [
        {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'THE REVOLUTION OF 1974', para: '8' }
        },
        {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '2' }
        }
      ]
    },
    {
      name: 'António de Spínola',
      role: 'leader',
      cites: [
        {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '1' }
        },
        {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '3' }
        }
      ]
    },
    {
      name: 'Otelo Saraiva de Carvalho',
      role: 'commander',
      side: 'mfa',
      cites: [
        {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '7' }
        }
      ]
    },
    {
      name: 'Mário Soares',
      role: 'participant',
      cites: [
        {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '4' }
        }
      ]
    },
    {
      name: 'Álvaro Cunhal',
      role: 'participant',
      cites: [
        {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '4' }
        }
      ]
    },
    {
      name: 'Vasco Gonçalves',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '8' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Revolu%C3%A7%C3%A3o_dos_Cravos_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Revolu%C3%A7%C3%A3o_dos_Cravos_(cropped).jpg',
    credit: { institution: 'Centro de Documentação 25 de Abril' },
    license: { id: 'cc-by', version: '4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On April 25, 1974, a group of younger officers belonging to an underground organization, the Armed Forces Movement (Movimento das Forças Armadas--MFA), overthrew the Caetano regime, and Spínola emerged as at least the titular head of the new government. The coup succeeded in hours with virtually no bloodshed.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Spínola and Revolution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/73.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The 1960s, however, were crisis years for Portugal. Guerrilla movements emerged in the Portuguese African colonies of Angola, Mozambique, and Guinea-Bissau (formerly Portuguese Guinea) that aimed at liberating those territories from "the last colonial empire." Fighting three guerrilla movements for more than a decade proved to be enormously draining for a small, poor country in terms of labor and financial resources.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'THE REVOLUTION OF 1974', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/72.htm' }
        },
        {
          id: 'q3',
          text: 'When Salazar was incapacitated in an accident in 1968, the Council of State, a high-level advisory body created by the constitution of 1933, chose Marcello Caetano (1968-74) to succeed him. Caetano, though a Salazar protégé, tried to modernize and liberalize the old Salazar system.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'THE REVOLUTION OF 1974', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/72.htm' }
        },
        {
          id: 'q4',
          text: 'The continuing economic drain caused by the military campaigns in Africa was exacerbated by the first great oil "shock" of 1973.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'THE REVOLUTION OF 1974', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/72.htm' }
        },
        {
          id: 'q5',
          text: 'A key catalytic event in the process toward revolution was the publication in 1973 General António de Spínola\'s book, Portugal and the Future, which criticized the conduct of the war and offered a far-ranging program for Portugal\'s recovery. The general\'s work sent shock waves through the political establishment in Lisbon.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Spínola and Revolution', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/73.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Spínola regarded the military\'s action as a simple military coup d\'état aimed at reorganizing the political structure with himself as the head, a renovação (renovation) in his words. Within days, however, it became clear that the coup had released long pent-up frustrations when thousands, and then tens of thousands of Portuguese poured into the streets celebrating the downfall of the regime and demanding further change.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Spínola and Revolution', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/73.htm' }
        },
        {
          id: 'q7',
          text: 'The coercive apparatus of the dictatorship--secret police, Republican Guard, official party, censorship--was overwhelmed and abolished. Workers began taking over shops from owners, peasants seized private lands, low-level employees took over hospitals from doctors and administrators, and government offices were occupied by workers who sacked the old management and demanded a thorough housecleaning.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Spínola and Revolution', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/73.htm' }
        },
        {
          id: 'q8',
          text: 'Gradually, however, the MFA emerged as the most powerful single group in Portugal as it overruled Spínola in several major decisions.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Spínola and Revolution', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/73.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Spínola\'s position further weakened when he was obliged to consent to the independence of Portugal\'s African colonies, rather than achieving the federal solution he had outlined in his book. Guinea-Bissau gained independence in early September, and talks were underway on the liberation of the other colonies.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Spínola and Revolution', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/73.htm' }
        },
        {
          id: 'q10',
          text: 'The new government began a wave of nationalizations of banks and large businesses.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Spínola and Revolution', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/73.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1974-04-25' },
            cites: [
              {
                source: 'loc-portugal-country-study-1993',
                loc: { section: 'Spínola and Revolution', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Caetano and other high-ranking officials of the old regime were arrested and exiled, many to Brazil. The military seized control of all important installations.',
        lang: 'en',
        cite: {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/73.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1974-05' },
            cites: [
              {
                source: 'loc-portugal-country-study-1993',
                loc: { section: 'Spínola and Revolution', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Spínola became the first interim president of the new regime in May 1974, and he chose the first of six provisional governments that were to govern the country until two years later when the first constitutional government was formed.',
        lang: 'en',
        cite: {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/73.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1974-07' },
            cites: [
              {
                source: 'loc-portugal-country-study-1993',
                loc: { section: 'Spínola and Revolution', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Spínola formed a second provisional government in mid-July with army Colonel (later General) Vasco Gonçalves as prime minister and eight military officers along with members of the PS, PCP, and PPD.',
        lang: 'en',
        cite: {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/73.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1974-09' },
            cites: [
              {
                source: 'loc-portugal-country-study-1993',
                loc: { section: 'Spínola and Revolution', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Spínola attempted to seize full power in late September but was blocked by COPCON and resigned from office. His replacement was the moderate General Francisco de Costa Gomes.',
        lang: 'en',
        cite: {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/73.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1975-03' },
            cites: [
              {
                source: 'loc-portugal-country-study-1993',
                loc: { section: 'Spínola and Revolution', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'An attempted coup by Spínola in early March 1975 failed, and he fled the country. In response to this attack from the right, radical elements of the military abolished the Junta of National Salvation and formed the Council of the Revolution as the country\'s most powerful governing body.',
        lang: 'en',
        cite: {
          source: 'loc-portugal-country-study-1993',
          loc: { section: 'Spínola and Revolution', para: '10' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/portugal/73.htm' }
      }
    }
  ],
  furtherReading: [
    { source: 'maxwell-1995-the-making-of-portuguese-democracy', perspective: 'european' }
  ]
})
