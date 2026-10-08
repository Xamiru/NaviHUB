import { definePolity } from '../../schema'

export default definePolity({
  id: 'republic-of-brazil',
  names: [
    { text: 'Republic of Brazil', lang: 'en', role: 'primary' },
    { text: 'República Federativa do Brasil', lang: 'pt', role: 'native' },
    {
      text: 'United States of Brazil',
      lang: 'en',
      role: 'official',
      cites: [
        { source: 'britannica-1911-brazil', loc: { section: 'BRAZIL', para: '386' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1889-11-15' },
        cites: [
          { source: 'britannica-1911-brazil', loc: { section: 'BRAZIL', para: '386' } }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:rio-de-janeiro',
      end: {
        alts: [
          {
            value: { d: '1960' },
            cites: [
              {
                source: 'cshapes-2-dataset',
                loc: { section: 'Brazil (code 140), 1909–1960, capital Rio de Janeiro' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Brazil (code 140), capital Rio de Janeiro' }
        }
      ]
    },
    {
      ref: 'place:brasilia',
      start: {
        alts: [
          {
            value: { d: '1960' },
            cites: [
              {
                source: 'cshapes-2-dataset',
                loc: { section: 'Brazil (code 140), 1960–2019, capital Brasilia' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Brazil (code 140), 1960–2019, capital Brasilia' }
        }
      ]
    }
  ],
  predecessors: [
    { ref: 'polity:empire-of-brazil' }
  ],
  cshapes: [
    { set: 'world', code: 140, from: 1889.87 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Proclama%C3%A7%C3%A3o_da_Rep%C3%BAblica_by_Benedito_Calixto_1893.jpg/1280px-Proclama%C3%A7%C3%A3o_da_Rep%C3%BAblica_by_Benedito_Calixto_1893.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Proclama%C3%A7%C3%A3o_da_Rep%C3%BAblica_by_Benedito_Calixto_1893.jpg',
    credit: { institution: 'Pinacoteca do Estado de São Paulo', creator: 'Benedito Calixto' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The overthrow of the monarchy by a military revolt in Rio de Janeiro on 15th November 1889, resulted in the creation of a federal republic under the name of United States of Brazil (Estados Unidos do Brazil).',
          lang: 'en',
          cite: { source: 'britannica-1911-brazil', loc: { section: 'BRAZIL', para: '386' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Brazil'
          }
        },
        {
          id: 'q2',
          text: 'The history of the republic has been a search for a viable form of government to replace the monarchy. That search has lurched back and forth between state autonomy and centralization.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Republican Era, 1889-1985', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/brazil/14.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The founders of the Brazilian republic faced a serious question of legitimacy. How could an illegal, treasonous act establish a legal political order? The officers who joined Field Marshal Deodoro da Fonseca in ending the empire were violating solemn oaths to uphold emperor and empire. The officer corps would eventually resolve the contradiction by linking its duty and destiny to Brazil, the motherland, rather than to transitory governments. In addition, the republic was born rather accidentally: Deodoro had intended only to replace the cabinet, but the republicans manipulated him into fathering a republic.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Old or First Republic, 1889-1930', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/brazil/15.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The Brazilian republic was not a spiritual offspring of the republics born of the French or American revolutions, even though the Brazilian regime would attempt to associate itself with both. The republic did not have enough popular support to risk open elections. It was a regime born of a coup d\'état that maintained itself by force.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Old or First Republic, 1889-1930', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/brazil/15.htm' }
        },
        {
          id: 'q5',
          text: 'The republic\'s first decade was one of turmoil.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Republican Era, 1889-1985', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/brazil/14.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'fausto-1994-historia-do-brasil', perspective: 'latin-american' },
    { source: 'carvalho-1987-os-bestializados', perspective: 'latin-american' }
  ]
})
