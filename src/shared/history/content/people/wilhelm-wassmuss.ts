import { definePerson } from '../../schema'

export default definePerson({
  id: 'wilhelm-wassmuss',
  names: [
    { text: 'Wilhelm Wassmuss', lang: 'en', role: 'primary' },
    { text: 'ویلهلم واسموس', lang: 'fa', role: 'native' },
    {
      text: 'The Lawrence of Persia',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'The Battle for Control over the Oil Supply', para: '7' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1880' },
        cites: [
          {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'The Battle for Control over the Oil Supply', para: '7' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1931' },
        cites: [
          {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'The Battle for Control over the Oil Supply', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  roles: ['diplomat'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Wilhelm Wassmuss (1880-1931), initially the German Acting Consul at Bushehr, later nicknamed “The Lawrence of Persia”, became the most cel­ebrat­ed of these secret agents, partly because of his dashing and adventurous lifestyle.',
          lang: 'en',
          cite: {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'The Battle for Control over the Oil Supply', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        },
        {
          id: 'q2',
          text: 'By the spring of 1916, the allied forces, advancing from the north and the south, had managed to wipe out all the German positions in the provinces. Only a few agents, notably Wassmuss, were still holding out in the country.',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        }
      ]
    }
  ]
})
