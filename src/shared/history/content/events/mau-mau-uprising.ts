import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'mau-mau-uprising',
  names: [
    { text: 'Mau Mau uprising', lang: 'en', role: 'primary' },
    {
      text: 'Kenya Emergency',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1952-10' },
        cites: [
          { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } },
          {
            source: 'gov-uk-2013-06-06-hague-statement-on-settlement-of-mau-mau-claims',
            loc: { section: 'Statement to Parliament on settlement of Mau Mau claims' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1960' },
        cites: [
          { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  places: [
    {
      ref: 'place:nairobi',
      cites: [
        { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:british-empire' }
  ],
  sides: [
    {
      key: 'mau-mau',
      name: 'Mau Mau',
      cites: [
        { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } }
      ]
    },
    {
      key: 'britain',
      name: 'British and colonial security forces',
      cites: [
        { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Sir George Erskine',
      role: 'commander',
      side: 'britain',
      cites: [
        { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'mau-mau',
      value: {
        alts: [
          {
            value: { min: 25000, qualifier: 'up-to' },
            cites: [
              { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'mau-mau',
      value: {
        alts: [
          {
            value: { min: 10000, qualifier: 'over' },
            cites: [
              { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 600, qualifier: 'about' },
            cites: [
              { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } }
            ]
          }
        ]
      }
    },
    {
      key: 'civilian-deaths',
      value: {
        alts: [
          {
            value: { min: 2000, qualifier: 'nearly' },
            cites: [
              { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } }
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
          text: 'The Kenya Emergency (1952-60), or Mau Mau Revolt, was one of the British Army\'s bloodiest post-war conflicts. Although the rising was defeated, many Kenyans still regard it as a significant step on their country\'s road to independence.',
          lang: 'en',
          cite: { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nam.ac.uk/explore/kenya-emergency'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q2',
          text: 'Although it contained many elements of anti-colonialism, the rising was primarily about land ownership and who was to rule Kenya once the British withdrew. Many Kikuyu had lost land to white settlers during the previous decades.',
          lang: 'en',
          cite: { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nam.ac.uk/explore/kenya-emergency'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'A State of Emergency was declared in October 1952 after the Mau Mau murdered a loyal Kikuyu chief.',
          lang: 'en',
          cite: { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nam.ac.uk/explore/kenya-emergency'
          }
        },
        {
          id: 'q4',
          text: 'Although the Mau Mau murdered a number of white settlers, the vast majority of their victims were fellow Africans. By the end of the emergency, 32 European civilians had died at the hands of the Mau Mau, but so had over 1,800 Africans.',
          lang: 'en',
          cite: { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nam.ac.uk/explore/kenya-emergency'
          }
        },
        {
          id: 'q5',
          text: 'Maltreatment also included torture and summary executions. The most notorious incident occurring at the Hola camp, where 11 detainees were killed by their African prison warders.',
          lang: 'en',
          cite: { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nam.ac.uk/explore/kenya-emergency'
          }
        },
        {
          id: 'q6',
          text: 'By April 1955, the back of the rebellion had been broken.',
          lang: 'en',
          cite: { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nam.ac.uk/explore/kenya-emergency'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'Altogether, around 600 members of the security forces and nearly 2,000 civilians were killed during the Emergency, the vast majority of them African. Over 10,000 Mau Mau died.',
          lang: 'en',
          cite: { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nam.ac.uk/explore/kenya-emergency'
          }
        },
        {
          id: 'q8',
          text: 'However, unofficial figures suggest a much larger number were killed in the counter-insurgency campaign.',
          lang: 'en',
          cite: { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nam.ac.uk/explore/kenya-emergency'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q9',
          text: 'The agreement includes payment of a settlement sum in respect of 5,228 claimants, as well as a gross costs sum, to the total value of £19.9 million.',
          lang: 'en',
          cite: {
            source: 'gov-uk-2013-06-06-hague-statement-on-settlement-of-mau-mau-claims',
            loc: { section: 'Statement to Parliament on settlement of Mau Mau claims' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/news/statement-to-parliament-on-settlement-of-mau-mau-claims'
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
            value: { d: '1953-06' },
            cites: [
              { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In June 1953, Lieutenant-General Sir George Erskine was appointed Commander-in-Chief with powers over all security forces in Kenya.',
        lang: 'en',
        cite: { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://www.nam.ac.uk/explore/kenya-emergency' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1954-04' },
            cites: [
              { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In April 1954, the authorities launched Operation Anvil, a massive cordon and search operation in Nairobi. It destroyed Mau Mau strength in the capital and netted over 16,000 suspects.',
        lang: 'en',
        cite: { source: 'nam-kenya-emergency', loc: { section: 'Kenya Emergency' } },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://www.nam.ac.uk/explore/kenya-emergency' }
      }
    }
  ],
  furtherReading: [
    { source: 'maloba-1993-mau-mau-and-kenya', perspective: 'african' }
  ]
})
