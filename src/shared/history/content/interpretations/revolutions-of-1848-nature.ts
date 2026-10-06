import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'revolutions-of-1848-nature',
  about: ['event:revolutions-of-1848'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'simultaneous-events',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Frédéric Fogacci' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Similarly, the “springtime of the peoples” in 1848 can be interpreted less as a Europe-wide movement than as a set of simultaneous events which lacked a common aim but, paradoxically, fed off each other.',
          lang: 'en',
          cite: {
            source: 'ehne-fogacci-national-construction-and-european-issues',
            loc: { section: 'National Construction and European Issues', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/political-europe/national-construction-and-european-issues/national-construction-and-european-issues'
          }
        },
        {
          id: 'q2',
          text: 'In sum, the question of the circulation of ideas and models in the uprisings of 1848 remains problematic: in many cases, the revolutionary context favoured the reawakening of local particularisms that had previously been stifled.',
          lang: 'en',
          cite: {
            source: 'ehne-fogacci-national-construction-and-european-issues',
            loc: { section: 'National Construction and European Issues', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/political-europe/national-construction-and-european-issues/national-construction-and-european-issues'
          }
        }
      ]
    },
    {
      id: 'french-trigger',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' },
        { kind: 'scholar', name: 'Frédéric Fogacci' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The success of the revolution sparked revolts elsewhere in Europe.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Revolutions of 1848', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/25.htm' }
        },
        {
          id: 'q4',
          text: 'The French uprising in February, leading to the proclamation of the Second Republic, fuelled the revolutionary wave in Europe in that it served as a trigger, representing a decisive breach in the order of the Congress of Vienna, a breech into which an international group of outlaws and republican exiles such as Mazzini would step.',
          lang: 'en',
          cite: {
            source: 'ehne-fogacci-national-construction-and-european-issues',
            loc: { section: 'National Construction and European Issues', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/political-europe/national-construction-and-european-issues/national-construction-and-european-issues'
          }
        }
      ]
    }
  ]
})
