import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'indonesian-national-revolution',
  names: [
    { text: 'Indonesian National Revolution', lang: 'en', role: 'primary' },
    { text: 'Revolusi Nasional Indonesia', lang: 'id', role: 'native' },
    {
      text: 'National Revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1945-08-17' },
        cites: [
          {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The National Revolution, 1945-50', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1949-12-27' },
        cites: [
          {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The National Revolution, 1945-50', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:jakarta',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '3' }
        }
      ]
    },
    {
      ref: 'place:surabaya',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '7' }
        }
      ]
    },
    {
      ref: 'place:yogyakarta',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '13' }
        }
      ]
    },
    {
      ref: 'place:the-hague',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '13' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'republic',
      name: 'Republic of Indonesia',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '4' }
        }
      ]
    },
    {
      key: 'netherlands',
      name: 'The Dutch',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:sukarno',
      role: 'leader',
      side: 'republic',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '3' }
        }
      ]
    },
    {
      name: 'Mohammad Hatta',
      role: 'leader',
      side: 'republic',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '3' }
        }
      ]
    },
    {
      name: 'Sutan Syahrir',
      role: 'head-of-government',
      side: 'republic',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '8' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:second-world-war',
      rel: 'caused-by',
      cites: [
        {
          source: 'state-dept-milestones-decolonization-of-asia-and-africa',
          loc: { section: 'Decolonization of Asia and Africa, 1945–1960', para: '5' }
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
          text: 'Sukarno and Hatta formally declared the nation\'s independence on August 17 at the former\'s residence in Jakarta, raised the red and white national flag, and sang the new nation\'s national anthem, Indonesia Raya (Greater Indonesia).',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The National Revolution, 1945-50', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/16.htm' }
        },
        {
          id: 'q2',
          text: 'After the Japanese surrender in 1945, local nationalist movements in the former Asian colonies campaigned for independence rather than a return to European colonial rule.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-decolonization-of-asia-and-africa',
            loc: { section: 'Decolonization of Asia and Africa, 1945–1960', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/asia-and-africa'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The Dutch, determined to reoccupy their colony, castigated Sukarno and Hatta as collaborators with the Japanese and the Republic of Indonesia as a creation of Japanese fascism.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The National Revolution, 1945-50', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/16.htm' }
        },
        {
          id: 'q4',
          text: 'The Battle of Surabaya (November 10-24) cost thousands of lives and was the bloodiest single engagement of the struggle for independence.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The National Revolution, 1945-50', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/16.htm' }
        },
        {
          id: 'q5',
          text: 'On July 21, 1947, the Dutch, claiming violations of the Linggajati Agreement, launched what was euphemistically called a "police action" against the republic.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The National Revolution, 1945-50', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/16.htm' }
        },
        {
          id: 'q6',
          text: 'An important international implication of the Madiun insurrection was that the United States now saw the republicans as anticommunist--rather than "red" as the Dutch claimed--and began to pressure the Netherlands to accommodate independence demands.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The National Revolution, 1945-50', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/16.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'Sovereignty was formally transferred on December 27, 1949.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The National Revolution, 1945-50', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/16.htm' }
        },
        {
          id: 'q8',
          text: 'Although Indonesia was finally independent and (with the exceptions of Dutch-ruled West New Guinea and Portuguese-ruled East Timor) formally unified, the society remained deeply divided by ethnic, regional, class, and religious differences.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'INDEPENDENCE, 1950-65', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/17.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1946-11-12' },
            cites: [
              {
                source: 'loc-indonesia-country-study-1993',
                loc: { section: 'The National Revolution, 1945-50', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The negotiations resulted in the British-brokered Linggajati Agreement, initialled on November 12, 1946.',
        lang: 'en',
        cite: {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/16.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1948-01-17' },
            cites: [
              {
                source: 'loc-indonesia-country-study-1993',
                loc: { section: 'The National Revolution, 1945-50', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'This action led to the Renville Agreement (named for the United States Navy ship on which the negotiations were held), which was ratified by both sides on January 17, 1948.',
        lang: 'en',
        cite: {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '10' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/16.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1948-12-19' },
            cites: [
              {
                source: 'loc-indonesia-country-study-1993',
                loc: { section: 'The National Revolution, 1945-50', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Immediately following the Madiun Affair, the Dutch launched a second "police action" that captured Yogyakarta on December 19, 1948.',
        lang: 'en',
        cite: {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '13' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/16.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1949-08-23' },
            cites: [
              {
                source: 'loc-indonesia-country-study-1993',
                loc: { section: 'The National Revolution, 1945-50', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The Round Table Conference was held in The Hague from August 23 to November 2, 1949 to determine the means by which the transfer could be accomplished.',
        lang: 'en',
        cite: {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The National Revolution, 1945-50', para: '13' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/16.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Indonesia_declaration_of_independence_17_August_1945.jpg/1280px-Indonesia_declaration_of_independence_17_August_1945.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Indonesia_declaration_of_independence_17_August_1945.jpg',
    credit: { institution: 'Indonesian Department of Information', creator: 'Frans Mendur' },
    license: { id: 'public-domain' }
  }
})
