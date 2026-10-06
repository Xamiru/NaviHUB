import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'league-of-nations-american-membership',
  about: ['event:founding-of-the-league-of-nations'],
  topic: 'outcome',
  researched: '2026-10-06',
  positions: [
    {
      id: 'wilson-league-as-remedy',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Woodrow Wilson', ref: 'person:woodrow-wilson' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'An effective League, he believed, would mitigate any inequities in the peace terms.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-league-of-nations',
            loc: { section: 'The League of Nations, 1920', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/league'
          }
        },
        {
          id: 'q2',
          text: 'Speaking before the U.S. Congress on January 8, 1918, President Woodrow Wilson enumerated the last of his Fourteen Points, which called for a “general association of nations…formed under specific covenants for the purpose of affording mutual guarantees of political independence and territorial integrity to great and small states alike.”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-league-of-nations',
            loc: { section: 'The League of Nations, 1920', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/league'
          }
        }
      ]
    },
    {
      id: 'lodge-entanglement',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Henry Cabot Lodge' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Motivated by Republican concerns that the League would commit the United States to an expensive organization that would reduce the United States’ ability to defend its own interests, Lodge led the opposition to joining the League.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-league-of-nations',
            loc: { section: 'The League of Nations, 1920', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/league'
          }
        },
        {
          id: 'q4',
          text: 'They adhered to a vision of the United States returning to its traditional aversion to commitments outside the Western Hemisphere.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-league-of-nations',
            loc: { section: 'The League of Nations, 1920', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/league'
          }
        }
      ]
    },
    {
      id: 'weaker-without-us',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Most historians hold that the League operated much less effectively without U.S. participation than it would have otherwise.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-league-of-nations',
            loc: { section: 'The League of Nations, 1920', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/league'
          }
        },
        {
          id: 'q6',
          text: 'Wilson’s insistence that the Covenant be linked to the Treaty was a blunder;',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-league-of-nations',
            loc: { section: 'The League of Nations, 1920', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1914-1920/league'
          }
        }
      ]
    }
  ]
})
