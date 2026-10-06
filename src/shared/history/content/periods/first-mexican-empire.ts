import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'first-mexican-empire',
  names: [
    { text: 'First Mexican Empire', lang: 'en', role: 'primary' },
    { text: 'Primer Imperio Mexicano', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1821' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Empire and Early Republic, 1821-55', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1823-02' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Empire and Early Republic, 1821-55', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 3,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: '"Long live Agustín I, Emperor of Mexico!" was the acclamation, at which Iturbide pretended surprise.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Empire and Early Republic, 1821-55', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/14.htm' }
        },
        {
          id: 'q2',
          text: 'The following day, congress named Iturbide as the constitutional emperor of Mexico.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Empire and Early Republic, 1821-55', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/14.htm' }
        },
        {
          id: 'q3',
          text: 'The new empire faced serious economic problems.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Empire and Early Republic, 1821-55', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/14.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'By midmonth, Iturbide, realizing the failure of his efforts, abdicated the throne.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Empire and Early Republic, 1821-55', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/14.htm' }
        },
        {
          id: 'q5',
          text: 'The experience of an empire had failed, and the idea of a monarchical system for Mexico would be dismissed for four decades.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Empire and Early Republic, 1821-55', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/14.htm' }
        }
      ]
    }
  ]
})
