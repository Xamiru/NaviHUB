import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'execution-of-louis-xvi',
  names: [
    { text: 'Execution of Louis XVI', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1793-01-21' },
        cites: [
          {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '53' }
          },
          {
            source: 'state-dept-milestones-french-revolution',
            loc: { section: 'The United States and the French Revolution, 1789–1799', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 3,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '53' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:french-revolution' }
  ],
  polities: [
    {
      ref: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '53' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:louis-xvi',
      role: 'victim',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '53' }
        }
      ]
    },
    {
      ref: 'person:maximilien-robespierre',
      role: 'participant',
      cites: [
        {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '52' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:french-revolution',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-french-revolution',
          loc: { section: 'The United States and the French Revolution, 1789–1799', para: '4' }
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
          text: 'After French King Louis XVI was tried and executed on January 21, 1793, war between France and monarchal nations Great Britain and Spain was inevitable.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-revolution',
            loc: { section: 'The United States and the French Revolution, 1789–1799', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1784-1800/french-rev'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'For a time the question how to dispose of the king diverted the thoughts of all parties.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q3',
          text: 'At this critical moment the discovery of the famous iron chest, containing papers which showed that many public men had intrigued with the court, was disastrous for Louis.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'On the question whether Louis was guilty none ventured to give a negative vote.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '53' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q5',
          text: 'The motion for an appeal to the people was rejected by 424 votes to 283.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '53' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q6',
          text: 'The penalty of death was adopted by 361 votes against 360 in favour of other penalties or of postponing at least the execution of the sentence.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '53' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'France declared war against England and Holland on the 1st of February and soon afterwards against Spain.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '55' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
          }
        },
        {
          id: 'q8',
          text: 'In the course of the year 1793 the Empire, the kings of Portugal and Naples and the grand-duke of Tuscany declared war against France.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-french-revolution',
            loc: { section: 'French Revolution, The', para: '55' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
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
            value: { d: '1792-09-21' },
            cites: [
              {
                source: 'britannica-1911-louis-xvi-of-france',
                loc: { section: 'Louis XVI. of France', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On the 21st of September 1792 the Convention declared royalty abolished, and in January it tried the king for his treason against the nation, and condemned him to death.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-louis-xvi-of-france',
          loc: { section: 'Louis XVI. of France', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Louis_XVI._of_France'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1793-01-21' },
            cites: [
              {
                source: 'britannica-1911-french-revolution',
                loc: { section: 'French Revolution, The', para: '53' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On the 21st of January 1793 Louis was beheaded in the Place de la Révolution, now the Place de la Concorde.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-french-revolution',
          loc: { section: 'French Revolution, The', para: '53' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/French_Revolution'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Garneray_-_Louis_XVI_au_Temple_-_P2813_-_Mus%C3%A9e_Carnavalet.jpg/1280px-Garneray_-_Louis_XVI_au_Temple_-_P2813_-_Mus%C3%A9e_Carnavalet.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Garneray_-_Louis_XVI_au_Temple_-_P2813_-_Mus%C3%A9e_Carnavalet.jpg',
    credit: { institution: 'Musée Carnavalet (Paris Musées)', creator: 'Jean-François Garneray' },
    license: { id: 'cc0' }
  }
})
