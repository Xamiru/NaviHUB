import { definePerson } from '../../schema'

export default definePerson({
  id: 'benito-juarez',
  names: [
    { text: 'Benito Juárez', lang: 'en', role: 'primary' },
    { text: 'Benito Juárez', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1806-03-21' },
        cites: [
          {
            source: 'britannica-1911-juarez-benito-pablo',
            loc: { section: 'JUAREZ, BENITO PABLO', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1872-07-18' },
        cites: [
          {
            source: 'britannica-1911-juarez-benito-pablo',
            loc: { section: 'JUAREZ, BENITO PABLO', para: '1' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:mexico-city',
    cites: [
      {
        source: 'britannica-1911-juarez-benito-pablo',
        loc: { section: 'JUAREZ, BENITO PABLO', para: '1' }
      }
    ]
  },
  regions: ['latin-america'],
  roles: ['politician', 'head-of-state'],
  offices: [
    {
      title: 'president',
      polity: 'polity:mexico',
      start: {
        alts: [
          {
            value: { d: '1861-03' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Civil War and the French Intervention', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Civil War and the French Intervention', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'JUAREZ, BENITO PABLO (1806–1872), president of Mexico, was born near Ixtlan, in the state of Oajaca, Mexico, on the 21st of March 1806, of full Indian blood.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-juarez-benito-pablo',
            loc: { section: 'JUAREZ, BENITO PABLO', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Juarez,_Benito_Pablo'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'The most outstanding member of the group was Benito Juárez, a Zapotec lawyer and politician.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Revolution of Ayutla and the Reform Laws', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/20.htm' }
        },
        {
          id: 'q2',
          text: 'Juárez and his cohorts went into exile in Louisiana, where they drew up the Plan of Ayutla in 1854 for the overthrow of Santa Anna.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Revolution of Ayutla and the Reform Laws', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/20.htm' }
        },
        {
          id: 'q3',
          text: 'In March 1861, Juárez won the presidential election, but the war left the treasury depleted.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Benito_Juarez.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Benito_Juarez.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
