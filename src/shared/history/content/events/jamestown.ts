import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'jamestown',
  names: [
    { text: 'Jamestown', lang: 'en', role: 'primary' },
    {
      text: 'Founding of Jamestown',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-jamestown-virginia',
          loc: { section: 'Jamestown (Virginia)', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1607-05' },
        cites: [
          { source: 'britannica-1911-virginia', loc: { section: 'Virginia', para: '35' } },
          {
            source: 'britannica-1911-jamestown-virginia',
            loc: { section: 'Jamestown (Virginia)', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:jamestown-virginia',
      cites: [
        {
          source: 'britannica-1911-jamestown-virginia',
          loc: { section: 'Jamestown (Virginia)', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:kingdom-of-england',
      cites: [
        {
          source: 'nps-historic-jamestowne-history-and-culture',
          loc: { section: 'History & Culture', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'John Smith',
      role: 'leader',
      cites: [
        { source: 'britannica-1911-virginia', loc: { section: 'Virginia', para: '35' } }
      ]
    },
    {
      name: 'London Company',
      role: 'organizer',
      cites: [
        { source: 'britannica-1911-virginia', loc: { section: 'Virginia', para: '35' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Twenty years later, in 1607, through a joint venture company known as the Virginia Company, England established her first permanent colony called Jamestown.',
          lang: 'en',
          cite: {
            source: 'nps-historic-jamestowne-history-and-culture',
            loc: { section: 'History & Culture', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.nps.gov/jame/learn/historyculture/index.htm'
          }
        },
        {
          id: 'q2',
          text: 'It was here that the first permanent English settlement in America was founded on the 13th of May 1607, that representative government was inaugurated on the American Continent in 1619, and that negro servitude was introduced into the original thirteen colonies, also in 1619.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-jamestown-virginia',
            loc: { section: 'Jamestown (Virginia)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Jamestown_(Virginia)'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Two colonizing associations were formed—the London Company for South Virginia and the Western Company for North Virginia.',
          lang: 'en',
          cite: { source: 'britannica-1911-smith-john', loc: { section: 'Smith, John', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Smith,_John'
          }
        },
        {
          id: 'q4',
          text: 'England was a late comer to the American scene.',
          lang: 'en',
          cite: {
            source: 'nps-historic-jamestowne-history-and-culture',
            loc: { section: 'History & Culture', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.nps.gov/jame/learn/historyculture/index.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The community had now become self-supporting, and the year that witnessed these changes witnessed also the first representative assembly in North America, the Virginia House of Burgesses, a meeting of planters sent from the plantations to assist the governor in reforming and remaking the laws of the colony.',
          lang: 'en',
          cite: { source: 'britannica-1911-virginia', loc: { section: 'Virginia', para: '37' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Virginia'
          }
        },
        {
          id: 'q6',
          text: 'Its population had never been large: it was about 490 in 1609, and 183 in 1623; the mortality was always very heavy.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-jamestown-virginia',
            loc: { section: 'Jamestown (Virginia)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Jamestown_(Virginia)'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q7',
          text: 'The United States is a very diverse country of many peoples and cultures.',
          lang: 'en',
          cite: {
            source: 'nps-historic-jamestowne-history-and-culture',
            loc: { section: 'History & Culture', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.nps.gov/jame/learn/historyculture/index.htm'
          }
        },
        {
          id: 'q8',
          text: 'America\'s history actually begins with the Native Americans.',
          lang: 'en',
          cite: {
            source: 'nps-historic-jamestowne-history-and-culture',
            loc: { section: 'History & Culture', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.nps.gov/jame/learn/historyculture/index.htm'
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
            value: { d: '1606' },
            cites: [
              { source: 'britannica-1911-virginia', loc: { section: 'Virginia', para: '35' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'But glowing accounts were brought back by the early adventurers, and in 1606 an expedition was sent out by the London Company, which was chartered with rights of trade and settlement between 34° and 41° N. lat.',
        lang: 'en',
        cite: { source: 'britannica-1911-virginia', loc: { section: 'Virginia', para: '35' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Virginia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1607-05' },
            cites: [
              { source: 'britannica-1911-virginia', loc: { section: 'Virginia', para: '35' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'It landed, at a place which was called Jamestown, on the 13th of May 1607, and resulted in the establishment of many plantations along the James river.',
        lang: 'en',
        cite: { source: 'britannica-1911-virginia', loc: { section: 'Virginia', para: '35' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Virginia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1608-09' },
            cites: [
              { source: 'britannica-1911-virginia', loc: { section: 'Virginia', para: '35' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'John Smith became the head of the government in September 1608, compelled the colonists to submit to law and order, built a church and prepared for more extensive agricultural and fishing operations.',
        lang: 'en',
        cite: { source: 'britannica-1911-virginia', loc: { section: 'Virginia', para: '35' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Virginia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1619' },
            cites: [
              {
                source: 'nps-historic-jamestowne-history-and-culture',
                loc: { section: 'History & Culture', para: '6' }
              },
              {
                source: 'britannica-1911-jamestown-virginia',
                loc: { section: 'Jamestown (Virginia)', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In 1619, onboard an English privateer ship, “20 and odd” Africans arrived and were traded to the English for “victuals,” or food stores.',
        lang: 'en',
        cite: {
          source: 'nps-historic-jamestowne-history-and-culture',
          loc: { section: 'History & Culture', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.nps.gov/jame/learn/historyculture/index.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/English_settlers_landing_in_Virginia_1607_Image_from_page_42_of_A_junior_class_history_of_the_United_States%3B_to_which_are_added_the_Declaration_of_independence%2C_and_the_Constitution_of_the_United_States_%281899%29.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:English_settlers_landing_in_Virginia_1607_Image_from_page_42_of_A_junior_class_history_of_the_United_States;_to_which_are_added_the_Declaration_of_independence,_and_the_Constitution_of_the_United_States_(1899).jpg',
    credit: { institution: 'Internet Archive Book Images', creator: 'Internet Archive Book Images' },
    license: { id: 'cc0' }
  }
})
