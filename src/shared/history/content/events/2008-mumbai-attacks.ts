import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2008-mumbai-attacks',
  names: [
    { text: '2008 Mumbai attacks', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-12',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '2008-11-25' },
        cites: [
          {
            source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
            loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2008-11-28' },
        cites: [
          {
            source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
            loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:mumbai',
      cites: [
        {
          source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
          loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '2' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:india',
      cites: [
        {
          source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
          loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '4' }
        }
      ]
    },
    {
      ref: 'polity:pakistan',
      cites: [
        {
          source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
          loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '5' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'lashkar-e-taiba',
      name: 'Lashkar-e-Taiba',
      cites: [
        {
          source: 'hrw-2010-world-report-india',
          loc: { section: 'World Report 2010: India', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 175 },
            cites: [
              {
                source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
                loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch (December 2008)' }
            ]
          },
          {
            value: { min: 171 },
            cites: [
              {
                source: 'hrw-2010-world-report-india',
                loc: { section: 'World Report 2010: India', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch (World Report 2010)' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:war-in-afghanistan-2001',
      rel: 'related',
      cites: [
        {
          source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
          loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '7' }
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
          text: 'Beginning on November 25, 2008, at least 10 unidentified gunmen attacked two large hotels, a hospital, a Jewish center, a railway station, and other sites in Mumbai.',
          lang: 'en',
          cite: {
            source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
            loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240201015724/https://www.hrw.org/news/2008/12/03/india-respect-rights-hunt-mumbai-conspirators'
          }
        },
        {
          id: 'q2',
          text: 'While it is unclear who organized the attacks, preliminary evidence suggests that Pakistan-based groups may have been involved.',
          lang: 'en',
          cite: {
            source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
            loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240201015724/https://www.hrw.org/news/2008/12/03/india-respect-rights-hunt-mumbai-conspirators'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q3',
          text: 'A spate of indiscriminate bombings in various Indian cities, culminating in the seaborne-based attack in Mumbai in November 2008, which killed at least 171, and injured over 300 people, led to continued tensions with Pakistan.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-india',
            loc: { section: 'World Report 2010: India', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240217171001/https://www.hrw.org/world-report/2010/country-chapters/india'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'Human Rights Watch called for the Indian government to take action to deter such attacks in the future.',
          lang: 'en',
          cite: {
            source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
            loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240201015724/https://www.hrw.org/news/2008/12/03/india-respect-rights-hunt-mumbai-conspirators'
          }
        },
        {
          id: 'q5',
          text: 'After previous terror incidents there have been widespread allegations that Indian security forces have committed arbitrary arrests and torture.',
          lang: 'en',
          cite: {
            source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
            loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240201015724/https://www.hrw.org/news/2008/12/03/india-respect-rights-hunt-mumbai-conspirators'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Pakistan has denied any role in the attacks, but has said that it will investigate any evidence provided by India to determine if any group in Pakistan was responsible.',
          lang: 'en',
          cite: {
            source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
            loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240201015724/https://www.hrw.org/news/2008/12/03/india-respect-rights-hunt-mumbai-conspirators'
          }
        },
        {
          id: 'q7',
          text: 'There are concerns in India and elsewhere about the commitment of the Pakistani state to shut down militant groups who carry out terror attacks.',
          lang: 'en',
          cite: {
            source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
            loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240201015724/https://www.hrw.org/news/2008/12/03/india-respect-rights-hunt-mumbai-conspirators'
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
            value: { d: '2008-11-25' },
            cites: [
              {
                source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
                loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The attacks in Mumbai are the latest in a string of bombings and other violent attacks in India in 2008, in which hundreds of people have been killed.',
        lang: 'en',
        cite: {
          source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
          loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240201015724/https://www.hrw.org/news/2008/12/03/india-respect-rights-hunt-mumbai-conspirators'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008-11-28' },
            cites: [
              {
                source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
                loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The siege ended on November 28.',
        lang: 'en',
        cite: {
          source: 'hrw-2008-12-03-india-respect-rights-in-hunt-for-mumbai-conspirators',
          loc: { section: 'India: Respect Rights in Hunt for Mumbai Conspirators', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240201015724/https://www.hrw.org/news/2008/12/03/india-respect-rights-hunt-mumbai-conspirators'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/IAshishTripathi_Mumbai_26Nov2008_CST-Memorial.jpg/1280px-IAshishTripathi_Mumbai_26Nov2008_CST-Memorial.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:IAshishTripathi_Mumbai_26Nov2008_CST-Memorial.jpg',
    credit: { creator: 'IAshishTripathi' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
