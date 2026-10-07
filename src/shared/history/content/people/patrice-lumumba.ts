import { definePerson } from '../../schema'

export default definePerson({
  id: 'patrice-lumumba',
  names: [
    { text: 'Patrice Lumumba', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  died: {
    alts: [
      {
        value: { d: '1961-01-17' },
        cites: [
          {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  roles: ['politician'],
  offices: [
    {
      title: 'prime minister',
      cites: [
        {
          source: 'state-dept-milestones-congo-decolonization',
          loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '3' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/PatriceLumumba1960.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:PatriceLumumba1960.jpg',
    credit: {
      institution: 'Nationaal Archief (Fotocollectie Anefo, access 2.24.01.05, item 910-9740)',
      creator: 'Harry Pot'
    },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In the months leading up to independence, the Congolese elected a president, Joseph Kasavubu, prime minister, Patrice Lumumba, a senate and assembly, and similar bodies in the Congo’s numerous provinces.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/congo-decolonization'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Lumumba was invited to visit Washington in late July, in the hopes that the United States could exert a moderating influence on the prime minister. The visit underscored the futility of that effort.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/congo-decolonization'
          }
        },
        {
          id: 'q3',
          text: 'On September 5, Kasavubu dismissed Lumumba from the government. Lumumba ignored the decree and dismissed Kasavubu. Lumumba’s supporters in the Congo and abroad were outraged and pledged to support his return to office.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/congo-decolonization'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'Lumumba, who was blamed for the plot, was arrested and ultimately killed on January 17, 1961.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-congo-decolonization',
            loc: { section: 'The Congo, Decolonization, and the Cold War, 1960–1965', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/congo-decolonization'
          }
        }
      ]
    }
  ]
})
