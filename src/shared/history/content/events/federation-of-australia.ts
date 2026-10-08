import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'federation-of-australia',
  names: [
    { text: 'Federation of Australia', lang: 'en', role: 'primary' },
    {
      text: 'Commonwealth of Australia',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'peo-the-federation-of-australia',
          loc: { section: 'The Federation of Australia' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1901-01-01' },
        cites: [
          { source: 'peo-creation-of-australia', loc: { section: 'Creation of Australia' } },
          {
            source: 'peo-the-federation-of-australia',
            loc: { section: 'The Federation of Australia' }
          }
        ]
      }
    ]
  },
  regions: ['oceania'],
  prominence: 2,
  places: [
    {
      ref: 'place:sydney',
      cites: [
        { source: 'peo-creation-of-australia', loc: { section: 'Creation of Australia' } }
      ]
    },
    {
      ref: 'place:melbourne',
      cites: [
        {
          source: 'peo-the-federation-of-australia',
          loc: { section: 'The Federation of Australia' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:british-empire' }
  ],
  participants: [
    {
      name: 'Edmund Barton',
      role: 'head-of-government',
      cites: [
        { source: 'peo-creation-of-australia', loc: { section: 'Creation of Australia' } }
      ]
    },
    {
      name: 'Lord Hopetoun',
      role: 'head-of-state',
      cites: [
        { source: 'peo-creation-of-australia', loc: { section: 'Creation of Australia' } }
      ]
    },
    {
      name: 'Sir Henry Parkes',
      role: 'ideologue',
      cites: [
        {
          source: 'peo-the-federation-of-australia',
          loc: { section: 'The Federation of Australia' }
        }
      ]
    },
    {
      name: 'Sir Samuel Griffith',
      role: 'participant',
      cites: [
        {
          source: 'peo-the-federation-of-australia',
          loc: { section: 'The Federation of Australia' }
        }
      ]
    },
    {
      name: 'Andrew Inglis Clark',
      role: 'participant',
      cites: [
        {
          source: 'peo-the-federation-of-australia',
          loc: { section: 'The Federation of Australia' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 100000, qualifier: 'about' },
            cites: [
              {
                source: 'peo-creation-of-australia',
                loc: { section: 'Creation of Australia' }
              }
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
          id: 'q1',
          text: 'Australia became a nation on 1 January 1901 when 6 British colonies – New South Wales, Victoria, Queensland, South Australia, Western Australia and Tasmania – united to form the Commonwealth of Australia. This process is known as Federation.',
          lang: 'en',
          cite: {
            source: 'peo-the-federation-of-australia',
            loc: { section: 'The Federation of Australia' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/federation/the-federation-of-australia'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The colonies were almost like 6 separate countries. For example, each had its own government and laws, its own defence force, issued its own stamps and collected tariffs – taxes – on goods that crossed its borders.',
          lang: 'en',
          cite: {
            source: 'peo-the-federation-of-australia',
            loc: { section: 'The Federation of Australia' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/federation/the-federation-of-australia'
          }
        },
        {
          id: 'q3',
          text: 'By the 1880s the inefficiency of this system, a growing unity among colonists and a belief that a national government was needed to deal with issues such as trade, defence and immigration saw popular support for Federation grow.',
          lang: 'en',
          cite: {
            source: 'peo-the-federation-of-australia',
            loc: { section: 'The Federation of Australia' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/federation/the-federation-of-australia'
          }
        },
        {
          id: 'q4',
          text: 'It was felt a national government would be in a better position than the colonies to control immigration.',
          lang: 'en',
          cite: {
            source: 'peo-the-federation-of-australia',
            loc: { section: 'The Federation of Australia' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/federation/the-federation-of-australia'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The convention spent 5 weeks discussing and writing a draft constitution, which became the basis for the constitution we have today.',
          lang: 'en',
          cite: {
            source: 'peo-the-federation-of-australia',
            loc: { section: 'The Federation of Australia' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/federation/the-federation-of-australia'
          }
        },
        {
          id: 'q6',
          text: 'Australia was the first nation to take a proposed constitution to the people for approval.',
          lang: 'en',
          cite: {
            source: 'peo-the-federation-of-australia',
            loc: { section: 'The Federation of Australia' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/federation/the-federation-of-australia'
          }
        },
        {
          id: 'q7',
          text: 'About 100 000 spectators watched as Queen Victoria’s proclamation was read and the first Governor-General of Australia, Lord Hopetoun, was sworn-in. The first ministry, led by Prime Minister Sir Edmund Barton, was also sworn-in after a 21-gun salute.',
          lang: 'en',
          cite: { source: 'peo-creation-of-australia', loc: { section: 'Creation of Australia' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/history-milestones/australian-parliament-history-timeline/events/creation-of-australia'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Although there was widespread support for Federation, not everyone was able to take part in the process. The voices of some Australians were absent. Women in the colonies (with the exception of South Australia and Western Australia) were not able to vote. Aboriginal and Torres Strait Islander peoples were mostly excluded from all the proceedings and celebrations.',
          lang: 'en',
          cite: {
            source: 'peo-the-federation-of-australia',
            loc: { section: 'The Federation of Australia' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/federation/the-federation-of-australia'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q9',
          text: 'Australia’s most eventful day has passed into history, and the Commonwealth, once a dream, then a purpose, is at last a reality. All Australians … are now, and ever more will be, fellow citizens. With the opening of the century we enter upon national unity.',
          lang: 'en',
          cite: { source: 'peo-creation-of-australia', loc: { section: 'Creation of Australia' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/history-milestones/australian-parliament-history-timeline/events/creation-of-australia'
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
            value: { d: '1889' },
            cites: [
              {
                source: 'peo-the-federation-of-australia',
                loc: { section: 'The Federation of Australia' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Convinced the colonies would be stronger if they united, Sir Henry Parkes gave a rousing address at Tenterfield, New South Wales in 1889 calling for \'a great national government for all Australians\'.',
        lang: 'en',
        cite: {
          source: 'peo-the-federation-of-australia',
          loc: { section: 'The Federation of Australia' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/federation/the-federation-of-australia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1890-02-06' },
            cites: [
              {
                source: 'peo-the-federation-of-australia',
                loc: { section: 'The Federation of Australia' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On 6 February 1890 delegates from each of the colonial parliaments and the New Zealand Parliament met at the Australasian Federation Conference in Melbourne.',
        lang: 'en',
        cite: {
          source: 'peo-the-federation-of-australia',
          loc: { section: 'The Federation of Australia' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/federation/the-federation-of-australia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-03-16' },
            cites: [
              {
                source: 'peo-the-federation-of-australia',
                loc: { section: 'The Federation of Australia' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On 16 March 1898 the convention agreed to the draft constitution.',
        lang: 'en',
        cite: {
          source: 'peo-the-federation-of-australia',
          loc: { section: 'The Federation of Australia' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/federation/the-federation-of-australia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1900-07-09' },
            cites: [
              {
                source: 'peo-the-federation-of-australia',
                loc: { section: 'The Federation of Australia' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The Commonwealth of Australia Constitution Act 1900 was passed by the British Parliament on 5 July 1900. Queen Victoria signed the Act on 9 July 1900.',
        lang: 'en',
        cite: {
          source: 'peo-the-federation-of-australia',
          loc: { section: 'The Federation of Australia' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/federation/the-federation-of-australia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1901-05-09' },
            cites: [
              {
                source: 'peo-the-federation-of-australia',
                loc: { section: 'The Federation of Australia' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The first Parliament of the Commonwealth of Australia was opened at noon on 9 May 1901 by the Duke of Cornwall and York (later King George V).',
        lang: 'en',
        cite: {
          source: 'peo-the-federation-of-australia',
          loc: { section: 'The Federation of Australia' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://peo.gov.au/understand-our-parliament/history-of-parliament/federation/the-federation-of-australia'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Swearing-in_Pavilion%2C_Centennial_Park.png',
    page: 'https://commons.wikimedia.org/wiki/File:Swearing-in_Pavilion,_Centennial_Park.png',
    credit: { institution: 'Parliament of Australia', creator: 'Joseph Perry' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
