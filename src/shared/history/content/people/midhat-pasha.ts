import { definePerson } from '../../schema'

export default definePerson({
  id: 'midhat-pasha',
  names: [
    { text: 'Midhat Pasha', lang: 'en', role: 'primary' },
    { text: 'Mithat Paşa', lang: 'tr', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1822' },
        cites: [
          {
            source: 'britannica-1911-midhat-pasha',
            loc: { section: 'MIDHAT PASHA', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1884-05-08' },
        cites: [
          {
            source: 'britannica-1911-midhat-pasha',
            loc: { section: 'MIDHAT PASHA', para: '2' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:istanbul',
    cites: [
      { source: 'britannica-1911-midhat-pasha', loc: { section: 'MIDHAT PASHA', para: '1' } }
    ]
  },
  regions: ['mena', 'europe'],
  roles: ['politician'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'In 1876 the hapless sultan was deposed by a fetva (legal opinion) obtained by Midhat Pasha, a reformist minister sympathetic to the aims of the Young Ottomans.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q2',
          text: 'Midhat was dismissed in February 1877 and was later murdered.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Midah_Pacha_%28i.e._Midhat-Pacha%29_-_btv1b531377226.jpg/1280px-Midah_Pacha_%28i.e._Midhat-Pacha%29_-_btv1b531377226.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Midah_Pacha_(i.e._Midhat-Pacha)_-_btv1b531377226.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Atelier Nadar' },
    license: { id: 'public-domain' }
  }
})
