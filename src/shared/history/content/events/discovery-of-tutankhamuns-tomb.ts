import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'discovery-of-tutankhamuns-tomb',
  names: [
    { text: 'Discovery of Tutankhamun’s tomb', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'discovery',
  start: {
    alts: [
      {
        value: { d: '1922-11-04' },
        cites: [
          { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '196' } }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:valley-of-the-kings',
      cites: [
        { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '197' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Howard Carter',
      role: 'leader',
      cites: [
        { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '197' } },
        {
          source: 'nara-unwritten-record-discovery-of-king-tutankhamun-2023',
          loc: { section: 'Spotlight: The Discovery of King Tutankhamun', para: '1' }
        }
      ]
    },
    {
      name: 'Lord Carnarvon',
      role: 'participant',
      cites: [
        {
          source: 'carter-mace-tomb-of-tut-ankh-amen-vol-1',
          loc: { section: 'The Finding of the Tomb' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'The tomb was discovered in November 1922 by English archaeologist Howard Carter and his team, who had been searching for it for five years. The tomb, located in Thebes, Egypt, was found virtually intact after 3,000 years.',
          lang: 'en',
          cite: {
            source: 'nara-unwritten-record-discovery-of-king-tutankhamun-2023',
            loc: { section: 'Spotlight: The Discovery of King Tutankhamun', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://unwritten-record.blogs.archives.gov/2023/02/16/spotlight-the-discovery-of-king-tutankhamun/'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q2',
          text: 'Hardly had I arrived on the work next morning (November 4th) than the unusual silence, due to the stoppage of the work, made me realize that something out of the ordinary had happened, and I was greeted by the announcement that a step cut in the rock had been discovered underneath the very first hut to be attacked.',
          lang: 'en',
          cite: {
            source: 'carter-mace-tomb-of-tut-ankh-amen-vol-1',
            loc: { section: 'The Finding of the Tomb' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/in.ernet.dli.2015.77344/2015.77344.The-Tomb-Of-Tut-Ankh-Amen-Vjol-I_djvu.txt'
          }
        },
        {
          id: 'q3',
          text: 'The manner of cutting was that of the sunken stairway entrance so common in The Valley, and I almost dared to hope that we had found our tomb at last.',
          lang: 'en',
          cite: {
            source: 'carter-mace-tomb-of-tut-ankh-amen-vol-1',
            loc: { section: 'The Finding of the Tomb' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/in.ernet.dli.2015.77344/2015.77344.The-Tomb-Of-Tut-Ankh-Amen-Vjol-I_djvu.txt'
          }
        },
        {
          id: 'q4',
          text: 'The day following (November 26th) was the day of days, the most wonderful that I have ever lived through, and certainly one whose like I can never hope to see again.',
          lang: 'en',
          cite: {
            source: 'carter-mace-tomb-of-tut-ankh-amen-vol-1',
            loc: { section: 'The Finding of the Tomb' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/in.ernet.dli.2015.77344/2015.77344.The-Tomb-Of-Tut-Ankh-Amen-Vjol-I_djvu.txt'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The tomb’s contents were cataloged and displayed at the Egyptian Museum in Cairo, Egypt where they are still on display today.',
          lang: 'en',
          cite: {
            source: 'nara-unwritten-record-discovery-of-king-tutankhamun-2023',
            loc: { section: 'Spotlight: The Discovery of King Tutankhamun', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://unwritten-record.blogs.archives.gov/2023/02/16/spotlight-the-discovery-of-king-tutankhamun/'
          }
        },
        {
          id: 'q8',
          text: 'The artifacts from King Tut’s tomb were exhibited outside of Egypt starting in the 1960s. A popular traveling exhibit titled Treasures of Tutankhamun made its way to the United States in 1976. The exhibit traveled to Washington, D.C., Chicago, New Orleans, Los Angeles, Seattle, New York City, and San Francisco and attracted more than eight million people.',
          lang: 'en',
          cite: {
            source: 'nara-unwritten-record-discovery-of-king-tutankhamun-2023',
            loc: { section: 'Spotlight: The Discovery of King Tutankhamun', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://unwritten-record.blogs.archives.gov/2023/02/16/spotlight-the-discovery-of-king-tutankhamun/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Burton_Tutankhamun_tomb_photographs_1_015.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Burton_Tutankhamun_tomb_photographs_1_015.jpg',
    credit: { creator: 'Harry Burton' },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1923-02-16' },
            cites: [
              {
                source: 'nara-unwritten-record-discovery-of-king-tutankhamun-2023',
                loc: { section: 'Spotlight: The Discovery of King Tutankhamun', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'On February 16, 1923, Carter and his team entered the last chamber in the tomb, where they located a sarcophagus with three coffins inside one another. The last coffin, made of solid gold, contained the mummified body of King Tutankhamun.',
        lang: 'en',
        cite: {
          source: 'nara-unwritten-record-discovery-of-king-tutankhamun-2023',
          loc: { section: 'Spotlight: The Discovery of King Tutankhamun', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://unwritten-record.blogs.archives.gov/2023/02/16/spotlight-the-discovery-of-king-tutankhamun/'
        }
      }
    }
  ]
})
