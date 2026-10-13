import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'assassination-of-nader-shah-causes',
  about: ['event:assassination-of-nader-shah'],
  topic: 'causes',
  positions: [
    {
      id: 'tyranny',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ernest Tucker', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Marvi reported that Nāder began to manifest signs of physical deterioration and mental instability.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '27' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q2',
          text: 'Finally, the shah was forced to reinstate taxes due to insufficient funds, and the heavy levies sparked numerous rebellions.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '27' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      id: 'taxation',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Although Nader Shah achieved political unity, his military campaigns and extortionate taxation proved a terrible drain on a country already ravaged and depopulated by war and disorder, and in 1747 he was murdered by chiefs of his own Afshar tribe.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        }
      ]
    },
    {
      id: 'repression',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'During his last year, when Nāder toured Iran savagely punishing those in revolt (or allegedly so), at least 100 of the officials and notables of Mašhad were executed.',
          lang: 'en',
          cite: { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afsharids'
          }
        }
      ]
    },
    {
      id: 'plot',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Such a state of things could not last, and certain proscribed persons plotted the destruction of the half-demented tyrant.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1100' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
