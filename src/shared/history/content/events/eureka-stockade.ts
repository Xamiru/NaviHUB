import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'eureka-stockade',
  names: [
    { text: 'Eureka Stockade', lang: 'en', role: 'primary' },
    {
      text: 'Eureka Rebellion',
      lang: 'en',
      role: 'contested',
      usedBy: [
        {
          kind: 'organization',
          name: 'Museum of Australian Democracy at Old Parliament House'
        }
      ],
      cites: [
        {
          source: 'moad-exploring-democracy-raffaello-carboni',
          loc: { section: 'Raffaello Carboni' }
        }
      ]
    },
    {
      text: 'Eureka massacre',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'participant', name: 'Raffaello Carboni' }
      ],
      cites: [
        { source: 'carboni-1855-eureka-stockade', loc: { section: 'The Eureka Stockade' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1854-12-03' },
        cites: [
          {
            source: 'moad-exploring-democracy-raffaello-carboni',
            loc: { section: 'Raffaello Carboni' }
          },
          { source: 'carboni-1855-eureka-stockade', loc: { section: 'The Eureka Stockade' } }
        ]
      }
    ]
  },
  regions: ['oceania'],
  prominence: 2,
  places: [
    {
      ref: 'place:ballarat',
      cites: [
        {
          source: 'moad-exploring-democracy-raffaello-carboni',
          loc: { section: 'Raffaello Carboni' }
        },
        {
          source: 'britannica-1911-victoria-australia',
          loc: { section: 'VICTORIA', para: '96' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:british-empire' }
  ],
  participants: [
    {
      name: 'Peter Lalor',
      role: 'leader',
      cites: [
        {
          source: 'moad-exploring-democracy-raffaello-carboni',
          loc: { section: 'Raffaello Carboni' }
        }
      ]
    },
    {
      name: 'JB Humffray',
      role: 'organizer',
      cites: [
        {
          source: 'moad-exploring-democracy-raffaello-carboni',
          loc: { section: 'Raffaello Carboni' }
        }
      ]
    },
    {
      name: 'Raffaello Carboni',
      role: 'witness',
      cites: [
        {
          source: 'moad-exploring-democracy-raffaello-carboni',
          loc: { section: 'Raffaello Carboni' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'prisoners',
      value: {
        alts: [
          {
            value: { min: 13 },
            cites: [
              {
                source: 'moad-exploring-democracy-raffaello-carboni',
                loc: { section: 'Raffaello Carboni' }
              }
            ]
          }
        ]
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Eureka_stockade_battle.jpg/1280px-Eureka_stockade_battle.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Eureka_stockade_battle.jpg',
    credit: { institution: 'State Library of New South Wales', creator: 'John Black Henderson' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On 3 December a group of miners led by Peter Lalor clash with government troops over the system of mining licences on the Ballarat goldfields in Victoria.',
          lang: 'en',
          cite: {
            source: 'moad-exploring-democracy-raffaello-carboni',
            loc: { section: 'Raffaello Carboni' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://explore.moadoph.gov.au/people/raffaello-carboni.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Gold was discovered a few weeks after the colony had entered upon its separate existence, and a large number of persons were attracted to the mines, first from the neighbouring colonies—some of which, such as South Australia, Van Diemen\'s Land and West Australia, were almost denuded of able-bodied men and women—and subsequently from Europe and America.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-victoria-australia',
            loc: { section: 'VICTORIA', para: '95' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Victoria_(Australia)'
          }
        },
        {
          id: 'q3',
          text: 'The administration of the gold-fields was not popular, and the miners were dissatisfied at the amount charged for permission to mine for gold, and at there being no representation for the gold-fields in the local Legislature.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-victoria-australia',
            loc: { section: 'VICTORIA', para: '96' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Victoria_(Australia)'
          }
        },
        {
          id: 'q4',
          text: 'Up to the middle of September, 1854, the search for licences happened once a month; at most twice: perhaps once a week on the Gravel Pits, owing to the near neighbourhood of the Camp.',
          lang: 'en',
          cite: { source: 'carboni-1855-eureka-stockade', loc: { section: 'The Eureka Stockade' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/The_Eureka_Stockade'
          }
        },
        {
          id: 'q5',
          text: 'Now, licence-hunting became the order of the day.',
          lang: 'en',
          cite: { source: 'carboni-1855-eureka-stockade', loc: { section: 'The Eureka Stockade' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/The_Eureka_Stockade'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q6',
          text: 'We swear by the Southern Cross to stand truly by each other, and fight to defend our rights and liberties.',
          lang: 'en',
          cite: { source: 'carboni-1855-eureka-stockade', loc: { section: 'The Eureka Stockade' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/The_Eureka_Stockade'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The 13 miners brought to trial for high treason are found not guilty by a jury.',
          lang: 'en',
          cite: {
            source: 'moad-exploring-democracy-raffaello-carboni',
            loc: { section: 'Raffaello Carboni' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://explore.moadoph.gov.au/people/raffaello-carboni.html'
          }
        },
        {
          id: 'q8',
          text: 'In the aftermath of the Rebellion, the government introduces a system of annual licensing called the Miner’s Right.',
          lang: 'en',
          cite: {
            source: 'moad-exploring-democracy-raffaello-carboni',
            loc: { section: 'Raffaello Carboni' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://explore.moadoph.gov.au/people/raffaello-carboni.html'
          }
        },
        {
          id: 'q9',
          text: 'Eventually, an export duty on gold was substituted for the licence fee, but every miner had to take out a right which enabled him to occupy a limited area of land for mining, and also for residence.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-victoria-australia',
            loc: { section: 'VICTORIA', para: '96' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Victoria_(Australia)'
          }
        },
        {
          id: 'q10',
          text: 'In the following year an eyewitness account of the Rebellion is published by Raffaello Carboni.',
          lang: 'en',
          cite: {
            source: 'moad-exploring-democracy-raffaello-carboni',
            loc: { section: 'Raffaello Carboni' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://explore.moadoph.gov.au/people/raffaello-carboni.html'
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
            value: { d: '1854-11-11' },
            cites: [
              {
                source: 'moad-exploring-democracy-raffaello-carboni',
                loc: { section: 'Raffaello Carboni' }
              },
              {
                source: 'moad-exploring-democracy-raffaello-carboni',
                loc: { section: 'Raffaello Carboni' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'A meeting of miners is held at Bakery Hill on the Ballarat goldfields, and the Ballarat Reform League is formed with a former British Chartist, JB Humffray, as secretary.',
        lang: 'en',
        cite: {
          source: 'moad-exploring-democracy-raffaello-carboni',
          loc: { section: 'Raffaello Carboni' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://explore.moadoph.gov.au/people/raffaello-carboni.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1854-11-29' },
            cites: [
              {
                source: 'carboni-1855-eureka-stockade',
                loc: { section: 'The Eureka Stockade' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'A regular volley of revolvers and other pistols now took place, and a good blazing up of gold-licences.',
        lang: 'en',
        cite: { source: 'carboni-1855-eureka-stockade', loc: { section: 'The Eureka Stockade' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/The_Eureka_Stockade'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1854-12-03' },
            cites: [
              {
                source: 'moad-exploring-democracy-raffaello-carboni',
                loc: { section: 'Raffaello Carboni' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'A discharge of musketry—then a round from the bugle—the command "forward"—and another discharge of musketry was sharply kept on the the red-coats (some 300 strong) advancing on the gully west of the stockade, for a couple of minutes.',
        lang: 'en',
        cite: { source: 'carboni-1855-eureka-stockade', loc: { section: 'The Eureka Stockade' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/The_Eureka_Stockade'
        }
      }
    }
  ]
})
