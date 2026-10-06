import { definePerson } from '../../schema'

export default definePerson({
  id: 'benito-juarez',
  names: [
    { text: 'Benito Juárez', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  regions: ['latin-america'],
  roles: ['politician', 'head-of-state'],
  offices: [
    {
      title: 'president',
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
  ]
})
