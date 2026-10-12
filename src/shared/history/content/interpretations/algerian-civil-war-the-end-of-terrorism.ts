import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'algerian-civil-war-the-end-of-terrorism',
  about: ['event:algerian-civil-war'],
  topic: 'outcome',
  positions: [
    {
      id: 'algerian-authorities-terrorism-no-longer-a-serious-threat',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Algerian government' },
        { kind: 'participant', name: 'Mohamed Lamari' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In January Algerian authorities stated, “With the policy of civil concord which had accelerated the normalization of the security situation, terrorism – on the decline – today no longer constituted a serious threat to the country’s institutions and people.”',
          lang: 'en',
          cite: {
            source: 'hrw-2005-03-03-human-rights-in-algeria',
            loc: { section: 'Human Rights in Algeria', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2005/03/03/human-rights-algeria'
          }
        },
        {
          id: 'q2',
          text: 'As in previous years, officials claimed that Algeria\'s armed groups were on their last legs.',
          lang: 'en',
          cite: {
            source: 'hrw-2003-world-report-algeria',
            loc: { section: 'World Report 2003: Algeria', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/wr2k3/mideast1.html'
          }
        }
      ],
      reception: [
        {
          id: 'q3',
          text: 'The casualty level, although down from the mid-1990s, refuted official claims that the violence was "residual."',
          lang: 'en',
          cite: {
            source: 'hrw-2002-world-report-algeria',
            loc: { section: 'World Report 2002: Algeria', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://www.hrw.org/legacy/wr2k2/mena1.html' }
        }
      ]
    },
    {
      id: 'hrw-impunity-on-all-sides',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Sweeping impunity prevailed for the perpetrators of massive human rights violations on all sides of a conflict that has claimed well over 100,000 lives.',
          lang: 'en',
          cite: {
            source: 'hrw-2002-world-report-algeria',
            loc: { section: 'World Report 2002: Algeria', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://www.hrw.org/legacy/wr2k2/mena1.html' }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
