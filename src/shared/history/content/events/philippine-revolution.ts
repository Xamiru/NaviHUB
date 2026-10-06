import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'philippine-revolution',
  names: [
    { text: 'Philippine Revolution', lang: 'en', role: 'primary' },
    { text: 'Himagsikang Pilipino', lang: 'tl', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1896-08-29' },
        cites: [
          {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:manila',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Andrés Bonifacio',
      role: 'leader',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '2' }
        },
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '5' }
        }
      ]
    },
    {
      ref: 'person:emilio-aguinaldo',
      role: 'commander',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '3' }
        }
      ]
    },
    {
      ref: 'person:jose-rizal',
      role: 'victim',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '4' }
        }
      ]
    },
    {
      name: 'Apolinario Mabini',
      role: 'ideologue',
      cites: [
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'The Malolos Constitution and the Treaty of Paris', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:spanish-american-war', rel: 'related' },
    { ref: 'event:philippine-american-war', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'An attempt was made to reestablish the Liga Filipina, but the national movement had become split between ilustrado advocates of reform and peaceful evolution (the compromisarios, or compromisers) and a plebeian constituency that wanted revolution and national independence.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'José Rizal and the Propaganda Movement', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/10.htm' }
        },
        {
          id: 'q2',
          text: 'Because the Spanish refused to allow genuine reform, the initiative quickly passed from the former group to the latter.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'José Rizal and the Propaganda Movement', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/10.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'An informer had tipped off a Spanish friar about the society\'s existence, and Bonifacio, his hand forced, proclaimed the revolution, attacking Spanish military installations on August 29, 1896.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/12.htm' }
        },
        {
          id: 'q4',
          text: 'The rebels were poorly led and had few successes against colonial troops.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/12.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Rizal\'s death filled the rebels with new determination, but the Katipunan was becoming divided between supporters of Bonifacio, who revealed himself to be an increasingly ineffective leader, and its rising star, Aguinaldo.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/12.htm' }
        },
        {
          id: 'q6',
          text: 'Although Spanish troops were able to defeat insurgents on the battlefield, they could not suppress guerrilla activity.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/12.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'American observers traveling in Luzon commented that the areas controlled by the republic seemed peaceful and well governed.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The Malolos Constitution and the Treaty of Paris', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/14.htm' }
        },
        {
          id: 'q8',
          text: 'The accomplishments of the Filipino government, however, counted for little in the eyes of the great powers as the transfer of the islands from Spanish to United States rule was arranged in the closing months of 1898.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The Malolos Constitution and the Treaty of Paris', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/14.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1896-12-30' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'A brief trial was held on December 26 and--with little chance to defend himself--Rizal was found guilty and sentenced to death.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/12.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1897-05-10' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'After fighting broke out between Bonifacio\'s and Aguinaldo\'s troops, Bonifacio was arrested, tried, and on May 10, 1897, executed by order of Aguinaldo.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/12.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1897-12' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'By mid-December, an agreement was reached in which the governor would pay Aguinaldo the equivalent of US$800,000, and the rebel leader and his government would go into exile.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/12.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-05-19' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'Outbreak of War, 1898', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Arriving in Manila on May 19, Aguinaldo reassumed command of rebel forces.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'Outbreak of War, 1898', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/13.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-06-12' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'The Malolos Constitution and the Treaty of Paris', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On June 12, 1898, a declaration of independence, modeled on the American one, was proclaimed at his headquarters in Cavite.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'The Malolos Constitution and the Treaty of Paris', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/14.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1899-01-21' },
            cites: [
              {
                source: 'loc-philippines-country-study-1991',
                loc: { section: 'The Malolos Constitution and the Treaty of Paris', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Modeled on the constitutions of France, Belgium, and Latin American countries, it was promulgated at Malolos on January 21, 1899, and two days later Aguinaldo was inaugurated as president.',
        lang: 'en',
        cite: {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'The Malolos Constitution and the Treaty of Paris', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/14.htm' }
      }
    }
  ]
})
