import { definePerson } from '../../schema'

export default definePerson({
  id: 'james-k-polk',
  names: [
    { text: 'James K. Polk', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1795-11-02' },
        cites: [
          {
            source: 'britannica-1911-polk-james-knox',
            loc: { section: 'POLK, JAMES KNOX', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1849-06-15' },
        cites: [
          {
            source: 'britannica-1911-polk-james-knox',
            loc: { section: 'POLK, JAMES KNOX', para: '4' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:nashville',
    cites: [
      {
        source: 'britannica-1911-polk-james-knox',
        loc: { section: 'POLK, JAMES KNOX', para: '4' }
      }
    ]
  },
  regions: ['north-america'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'President of the United States',
      polity: 'polity:united-states',
      end: {
        alts: [
          {
            value: { d: '1849-03-04' },
            cites: [
              {
                source: 'britannica-1911-polk-james-knox',
                loc: { section: 'POLK, JAMES KNOX', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-polk-james-knox',
          loc: { section: 'POLK, JAMES KNOX', para: '1' }
        },
        {
          source: 'britannica-1911-polk-james-knox',
          loc: { section: 'POLK, JAMES KNOX', para: '2' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/JamesKnoxPolk.jpg/1280px-JamesKnoxPolk.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:JamesKnoxPolk.jpg',
    credit: {
      institution: 'National Portrait Gallery, Smithsonian Institution',
      creator: 'George Peter Alexander Healy'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'POLK, JAMES KNOX (1795–1849), eleventh president of the United States, was born in Mecklenburg county, North Carolina, on the 2nd of November 1795.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-polk-james-knox',
            loc: { section: 'POLK, JAMES KNOX', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Polk,_James_Knox'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'The four chief events of President Polk’s administration were the final establishment of the independent treasury system, the reduction of the tariff by the Walker Bill of 1846, the adjustment of the Oregon boundary dispute with Great Britain by the treaty concluded on the 15th of June 1846, and the war with Mexico and the consequent acquisition of territory in the south-west and west.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-polk-james-knox',
            loc: { section: 'POLK, JAMES KNOX', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Polk,_James_Knox'
          }
        },
        {
          id: 'q3',
          text: 'The one overshadowing issue of the time, however, was territorial expansion.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-polk-james-knox',
            loc: { section: 'POLK, JAMES KNOX', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Polk,_James_Knox'
          }
        },
        {
          id: 'q4',
          text: 'Polk was an ardent expansionist, but the old idea that his policy was determined entirely by a desire to advance the interests of slavery is no longer accepted.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-polk-james-knox',
            loc: { section: 'POLK, JAMES KNOX', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Polk,_James_Knox'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'At the close of his term (March 4, 1849) Polk retired to his home in Nashville, Tennessee, where he died on the 15th of the following June.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-polk-james-knox',
            loc: { section: 'POLK, JAMES KNOX', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Polk,_James_Knox'
          }
        }
      ]
    }
  ]
})
