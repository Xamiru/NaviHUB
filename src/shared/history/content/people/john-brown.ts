import { definePerson } from '../../schema'

export default definePerson({
  id: 'john-brown',
  names: [
    { text: 'John Brown', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1800-05-09' },
        cites: [
          { source: 'nps-people-john-brown', loc: { section: 'John Brown' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1859-12-02' },
        cites: [
          { source: 'nps-people-john-brown', loc: { section: 'John Brown' } }
        ]
      }
    ]
  },
  regions: ['north-america'],
  roles: ['activist'],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'As a youth he saw an enslaved boy, with whom he had become friends, badly beaten and harshly treated. This and his religious belief that slavery was a sin against God influenced his thoughts and actions throughout his life.',
          lang: 'en',
          cite: { source: 'nps-people-john-brown', loc: { section: 'John Brown' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nps.gov/people/john-brown.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Several members of his family were settling in the territory and they were in desperate need of assistance. The Kansas-Nebraska Act had created a battleground over the spread of slavery. Brown went there to help his family and strike a blow for freedom.',
          lang: 'en',
          cite: { source: 'nps-people-john-brown', loc: { section: 'John Brown' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nps.gov/people/john-brown.htm' }
        },
        {
          id: 'q3',
          text: 'His participation in the violence and bloodshed in Kansas resulted in the second most controversial period of his life.',
          lang: 'en',
          cite: { source: 'nps-people-john-brown', loc: { section: 'John Brown' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nps.gov/people/john-brown.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q4',
          text: '“I, John Brown, am now quite certain that the crimes of this guilty land will never be purged away but with blood. I had, as I now think, vainly flattered myself that without very much blood shed it might be done.”',
          lang: 'en',
          cite: { source: 'nps-people-john-brown', loc: { section: 'John Brown' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nps.gov/people/john-brown.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/John_Brown_by_Augustus_Washington%2C_1846-47.png',
    page: 'https://commons.wikimedia.org/wiki/File:John_Brown_by_Augustus_Washington,_1846-47.png',
    credit: { creator: 'Augustus Washington' },
    license: { id: 'public-domain' }
  }
})
