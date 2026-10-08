import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'league-of-nations-american-membership',
  about: ['event:founding-of-the-league-of-nations'],
  topic: 'outcome',
  researched: '2026-10-08',
  positions: [
    {
      id: 'wilson-league-as-remedy',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Woodrow Wilson', ref: 'person:woodrow-wilson' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'XIV. A general association of nations must be formed under specific covenants for the purpose of affording mutual guarantees of political independence and territorial integrity to great and small states alike.',
          lang: 'en',
          cite: { source: 'avalon-wilson-fourteen-points-1918', loc: { section: 'Point XIV' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://avalon.law.yale.edu/20th_century/wilson14.asp'
          }
        },
        {
          id: 'q8',
          text: 'Unless you get the united, concerted purpose and power of the great Governments of the world behind this settlement, it will fall down like a house of cards.',
          lang: 'en',
          cite: { source: 'wilson-1919-pueblo-league-of-nations-address', loc: { para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/League_of_Nations_Address'
          }
        },
        {
          id: 'q9',
          text: 'The arrangements of justice do not stand of themselves, my fellow citizens. the arrangements of this treaty are just, but they need the support of the combined power of the great nations of the world.',
          lang: 'en',
          cite: { source: 'wilson-1919-pueblo-league-of-nations-address', loc: { para: '19' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/League_of_Nations_Address'
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
          id: 'q10',
          text: 'But I am certain that we can do it best by not putting ourselves in leading strings, or subjecting our policies and our sovereignty to other nations.',
          lang: 'en',
          cite: { source: 'lodge-1919-league-of-nations', loc: { para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/League_of_Nations_(Lodge)'
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
