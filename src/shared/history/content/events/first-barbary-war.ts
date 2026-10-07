import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-barbary-war',
  names: [
    { text: 'First Barbary War', lang: 'en', role: 'primary' },
    { text: 'Tripolitan War', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-07',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1801' },
        cites: [
          {
            source: 'state-dept-milestones-barbary-wars',
            loc: { section: 'Barbary Wars, 1801–1805 and 1815–1816', para: '8' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1805' },
        cites: [
          {
            source: 'state-dept-milestones-barbary-wars',
            loc: { section: 'Barbary Wars, 1801–1805 and 1815–1816', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'north-america'],
  prominence: 3,
  participants: [
    {
      name: 'Yusuf Qaramanli',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-barbary-wars',
          loc: { section: 'Barbary Wars, 1801–1805 and 1815–1816', para: '8' }
        }
      ]
    },
    {
      ref: 'person:thomas-jefferson',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-barbary-wars',
          loc: { section: 'Barbary Wars, 1801–1805 and 1815–1816', para: '8' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The Barbary States were a collection of North African states, many of which practiced state-supported piracy in order to exact tribute from weaker Atlantic powers.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-barbary-wars',
            loc: { section: 'Barbary Wars, 1801–1805 and 1815–1816', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/barbary-wars'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'In 1801, the Pasha of Tripoli, Yusuf Qaramanli, citing late payments of tribute, demanded additional tribute and declared war on the United States. The United States successfully defeated Qaramanli’s forces with a combined naval and land assault by the United States Marine Corps. The U.S. treaty with Tripoli concluded in 1805 included a ransom for American prisoners in Tripoli, but no provisions for tribute.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-barbary-wars',
            loc: { section: 'Barbary Wars, 1801–1805 and 1815–1816', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/barbary-wars'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/EnterpriseTripoli.jpg/1280px-EnterpriseTripoli.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:EnterpriseTripoli.jpg',
    credit: { institution: 'U.S. National Archives', creator: 'William Bainbridge Hoff' },
    license: { id: 'public-domain' }
  }
})
