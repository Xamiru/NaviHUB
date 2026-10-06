import { definePerson } from '../../schema'

export default definePerson({
  id: 'paul-bogle',
  names: [
    { text: 'Paul Bogle', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1822', approx: true },
        cites: [
          { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1865-10-24' },
        cites: [
          { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:morant-bay',
    cites: [
      { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } }
    ]
  },
  regions: ['latin-america'],
  roles: ['cleric', 'activist'],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'It was believed that Paul Bogle was born free about 1822. He was a firm political adherent of George William Gordon who made him a Deacon. Bogle lived in Stony Gut but also had another house in Spring Garden. He was not a poor man; he also had 500 acres at Dunrobin.',
          lang: 'en',
          cite: { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://nlj.gov.jm/qcontentnational-heroes/' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Gordon had appointed Bogle the leader of the group he had chosen to take their complaints to the Governor.',
          lang: 'en',
          cite: { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://nlj.gov.jm/qcontentnational-heroes/' }
        },
        {
          id: 'q3',
          text: 'Bogle, with the support of his brother Moses, was holding private meetings without Gordon’s knowledge.',
          lang: 'en',
          cite: { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://nlj.gov.jm/qcontentnational-heroes/' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'Bogle’s trial was short. He was found guilty and sentence to death. He and his brother Moses were hanged from the burnt out Court House on October 24, 1865.',
          lang: 'en',
          cite: { source: 'nlj-national-heroes', loc: { section: 'National Heroes' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://nlj.gov.jm/qcontentnational-heroes/' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: '(In 1965 the Jamaican government--an independent and representative entity--declared the two to be its first "national heroes.")',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'POLITICAL TRADITIONS', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://countrystudies.us/caribbean-islands/10.htm'
          }
        }
      ]
    }
  ]
})
