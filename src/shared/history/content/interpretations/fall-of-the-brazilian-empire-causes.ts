import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'fall-of-the-brazilian-empire-causes',
  about: ['event:proclamation-of-the-republic-in-brazil', 'person:pedro-ii-of-brazil'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'emperor-inattention-and-discontent',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (1911)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'For a long period few thrones appeared more secure, and his prosperous and beneficent rule might have endured throughout his life but for his want of energy and inattention to the signs of the times. The rising generation had become honeycombed with republicanism, the prospects of the imperial succession were justly regarded as unsatisfactory, the higher classes had been estranged by the emancipation of the slaves, and all these causes of discontent found expression in a military revolt, which in November 1889 overthrew the seemingly solid edifice of the Brazilian Empire in a few hours.',
          lang: 'en',
          cite: { source: 'britannica-1911-pedro-ii', loc: { section: 'PEDRO II.', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pedro_II.'
          }
        }
      ]
    },
    {
      id: 'three-pillars-in-crisis',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The 1870s and 1880s saw a crisis in each of the three pillars of the imperial regime--the church, the military, and the slaveholding system.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q3',
          text: 'In the end, the empire fell because the elites did not need it to protect their interests.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '24' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        }
      ]
    },
    {
      id: 'accidental-republic',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'In addition, the republic was born rather accidentally: Deodoro had intended only to replace the cabinet, but the republicans manipulated him into fathering a republic.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Old or First Republic, 1889-1930', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/15.htm' }
        }
      ]
    }
  ]
})
