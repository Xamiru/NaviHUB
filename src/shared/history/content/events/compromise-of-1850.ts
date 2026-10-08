import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'compromise-of-1850',
  names: [
    { text: 'Compromise of 1850', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1850-09' },
        cites: [
          {
            source: 'nara-milestone-compromise-of-1850',
            loc: { section: 'Compromise of 1850 (1850)', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      name: 'Henry Clay',
      role: 'organizer',
      cites: [
        {
          source: 'nara-milestone-compromise-of-1850',
          loc: { section: 'Compromise of 1850 (1850)', para: '3' }
        }
      ]
    },
    {
      name: 'Stephen A. Douglas',
      role: 'organizer',
      cites: [
        {
          source: 'nara-milestone-compromise-of-1850',
          loc: { section: 'Compromise of 1850 (1850)', para: '4' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:kansas-nebraska-act', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'By 1850 sectional disagreements related to slavery were straining the bonds of union between the North and South.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-compromise-of-1850',
            loc: { section: 'Compromise of 1850 (1850)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/compromise-of-1850'
          }
        },
        {
          id: 'q2',
          text: 'In 1849, California requested permission to enter the Union as a "free state" – meaning one where slavery was banned. Adding more "free state" senators to Congress would destroy the balance between "slave" and "free" states that had existed since the Missouri Compromise of 1820.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-compromise-of-1850',
            loc: { section: 'Compromise of 1850 (1850)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/compromise-of-1850'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'The Compromise of 1850 is composed of five statutes enacted in September of 1850.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-compromise-of-1850',
            loc: { section: 'Compromise of 1850 (1850)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/compromise-of-1850'
          }
        },
        {
          id: 'q3',
          text: 'The Compromise was actually a series of bills passed mainly to address issues related to slavery.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-compromise-of-1850',
            loc: { section: 'Compromise of 1850 (1850)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/compromise-of-1850'
          }
        },
        {
          id: 'q4',
          text: 'In one of the most famous congressional debates in American history, the Senate discussed Clay’s solution for seven months. It initially voted down his legislative package, but Senator Stephen A. Douglas of Illinois stepped forward with substitute bills, which passed both Houses.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-compromise-of-1850',
            loc: { section: 'Compromise of 1850 (1850)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/compromise-of-1850'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'With the Compromise of 1850, Congress had addressed the immediate crisis created by the recent territorial expansion.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-compromise-of-1850',
            loc: { section: 'Compromise of 1850 (1850)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.archives.gov/milestone-documents/compromise-of-1850'
          }
        },
        {
          id: 'q6',
          text: 'But one aspect of the compromise – a strengthened fugitive slave act – soon began to threaten sectional peace.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-compromise-of-1850',
            loc: { section: 'Compromise of 1850 (1850)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.archives.gov/milestone-documents/compromise-of-1850'
          }
        },
        {
          id: 'q7',
          text: 'The enforcement of these strict requirements angered many in the North.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-compromise-of-1850',
            loc: { section: 'Compromise of 1850 (1850)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/compromise-of-1850'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/Henry_Clay_Senate3.jpg/1280px-Henry_Clay_Senate3.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Henry_Clay_Senate3.jpg',
    credit: { creator: 'Peter F. Rothermel' },
    license: { id: 'public-domain' }
  }
})
