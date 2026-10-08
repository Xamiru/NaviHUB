import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'lewis-and-clark-expedition',
  names: [
    { text: 'Lewis and Clark Expedition', lang: 'en', role: 'primary' },
    {
      text: 'Corps of Discovery',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'nps-missouri-national-recreational-river-lewis-and-clark',
          loc: { section: 'The Lewis and Clark Expedition', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1804-05-14' },
        cites: [
          {
            source: 'nps-missouri-national-recreational-river-lewis-and-clark',
            loc: { section: 'The Lewis and Clark Expedition', para: '5' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1806-09-23' },
        cites: [
          {
            source: 'nps-missouri-national-recreational-river-lewis-and-clark',
            loc: { section: 'The Lewis and Clark Expedition', para: '12' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:st-louis',
      cites: [
        {
          source: 'nps-missouri-national-recreational-river-lewis-and-clark',
          loc: { section: 'The Lewis and Clark Expedition', para: '12' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Meriwether Lewis',
      role: 'leader',
      cites: [
        {
          source: 'nps-missouri-national-recreational-river-lewis-and-clark',
          loc: { section: 'The Lewis and Clark Expedition', para: '1' }
        }
      ]
    },
    {
      name: 'William Clark',
      role: 'leader',
      cites: [
        {
          source: 'nps-missouri-national-recreational-river-lewis-and-clark',
          loc: { section: 'The Lewis and Clark Expedition', para: '1' }
        }
      ]
    },
    {
      ref: 'person:thomas-jefferson',
      role: 'organizer',
      cites: [
        {
          source: 'nps-missouri-national-recreational-river-lewis-and-clark',
          loc: { section: 'The Lewis and Clark Expedition', para: '1' }
        }
      ]
    },
    {
      name: 'Sacagawea',
      role: 'participant',
      cites: [
        {
          source: 'nps-missouri-national-recreational-river-lewis-and-clark',
          loc: { section: 'The Lewis and Clark Expedition', para: '12' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'No document proved more important for the exploration of the American West than the letter of instructions Jefferson prepared for Lewis.',
          lang: 'en',
          cite: {
            source: 'loc-exhibition-rivers-edens-empires-lewis-and-clark',
            loc: {
              section: 'Rivers, Edens, Empires: Lewis & Clark and the Revealing of America, Lewis & Clark',
              para: '24'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.loc.gov/exhibits/lewisandclark/lewis-landc.html'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Thomas Jefferson was elected to the presidency in 1800. Two years later, he decided to organize an official, government-sponsored expedition to explore the upper reaches of the Missouri River and by so doing to find the elusive Northwest Passage to the Pacific Ocean. He chose Meriwether Lewis, his personal secretary, to lead the expedition.',
          lang: 'en',
          cite: {
            source: 'nps-missouri-national-recreational-river-lewis-and-clark',
            loc: { section: 'The Lewis and Clark Expedition', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nps.gov/mnrr/learn/historyculture/the-lewis-and-clark-expedition.htm'
          }
        },
        {
          id: 'q3',
          text: 'The expedition was meant to prepare the way for the extension of the American fur trade and to advance geographical knowledge.',
          lang: 'en',
          cite: {
            source: 'nps-missouri-national-recreational-river-lewis-and-clark',
            loc: { section: 'The Lewis and Clark Expedition', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/mnrr/learn/historyculture/the-lewis-and-clark-expedition.htm'
          }
        },
        {
          id: 'q4',
          text: 'One of Lewis and Clark\'s missions was to open diplomatic relations between the United States and the Indian nations of the West.',
          lang: 'en',
          cite: {
            source: 'loc-exhibition-rivers-edens-empires-lewis-and-clark',
            loc: {
              section: 'Rivers, Edens, Empires: Lewis & Clark and the Revealing of America, Lewis & Clark',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.loc.gov/exhibits/lewisandclark/lewis-landc.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The results and accomplishments of the Lewis and Clark Expedition were extensive. It altered the imperial struggle for control of North America, particularly in the Pacific Northwest, by strengthening the U.S. claim to the areas now including the states of Oregon and Washington.',
          lang: 'en',
          cite: {
            source: 'nps-missouri-national-recreational-river-lewis-and-clark',
            loc: { section: 'The Lewis and Clark Expedition', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.nps.gov/mnrr/learn/historyculture/the-lewis-and-clark-expedition.htm'
          }
        },
        {
          id: 'q6',
          text: 'They forever destroyed the dream of a Northwest Passage, but proved the success of overland travel to the Pacific.',
          lang: 'en',
          cite: {
            source: 'nps-missouri-national-recreational-river-lewis-and-clark',
            loc: { section: 'The Lewis and Clark Expedition', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/mnrr/learn/historyculture/the-lewis-and-clark-expedition.htm'
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
            value: { d: '1804-05-14' },
            cites: [
              {
                source: 'nps-missouri-national-recreational-river-lewis-and-clark',
                loc: { section: 'The Lewis and Clark Expedition', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On May 14, 1804, the Corps of Discovery left Camp Wood. The party numbered 45, and included 27 young, unmarried soldiers, a French-Indian interpreter, Clark’s slave, York, and Lewis’s Newfoundland dog, Seaman.',
        lang: 'en',
        cite: {
          source: 'nps-missouri-national-recreational-river-lewis-and-clark',
          loc: { section: 'The Lewis and Clark Expedition', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/mnrr/learn/historyculture/the-lewis-and-clark-expedition.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1805-04-07' },
            cites: [
              {
                source: 'nps-missouri-national-recreational-river-lewis-and-clark',
                loc: { section: 'The Lewis and Clark Expedition', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On April 7, 1805, Lewis and Clark sent the keelboat back to St. Louis with an extensive collection of zoological, botanical, and ethnological specimens as well as letters, reports, dispatches, and maps, and resumed their westward journey in two pirogues and six dugout canoes.',
        lang: 'en',
        cite: {
          source: 'nps-missouri-national-recreational-river-lewis-and-clark',
          loc: { section: 'The Lewis and Clark Expedition', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/mnrr/learn/historyculture/the-lewis-and-clark-expedition.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1806-03-23' },
            cites: [
              {
                source: 'nps-missouri-national-recreational-river-lewis-and-clark',
                loc: { section: 'The Lewis and Clark Expedition', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The return trip began on March 23, 1806.',
        lang: 'en',
        cite: {
          source: 'nps-missouri-national-recreational-river-lewis-and-clark',
          loc: { section: 'The Lewis and Clark Expedition', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/mnrr/learn/historyculture/the-lewis-and-clark-expedition.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1806-09-23' },
            cites: [
              {
                source: 'nps-missouri-national-recreational-river-lewis-and-clark',
                loc: { section: 'The Lewis and Clark Expedition', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'They left Charbonneau and Sacagawea at the Mandan villages, continued down the Missouri River, and returned to St. Louis on September 23, 1806.',
        lang: 'en',
        cite: {
          source: 'nps-missouri-national-recreational-river-lewis-and-clark',
          loc: { section: 'The Lewis and Clark Expedition', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/mnrr/learn/historyculture/the-lewis-and-clark-expedition.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Lewis_and_clark-expedition.jpg/1280px-Lewis_and_clark-expedition.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lewis_and_clark-expedition.jpg',
    credit: { creator: 'Charles Marion Russell' },
    license: { id: 'public-domain' }
  }
})
