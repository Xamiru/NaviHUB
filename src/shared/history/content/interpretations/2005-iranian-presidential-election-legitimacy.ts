import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '2005-iranian-presidential-election-legitimacy',
  about: ['event:2005-iranian-presidential-election', 'event:2004-iranian-legislative-election'],
  topic: 'legitimacy',
  positions: [
    {
      id: 'guardian-council-vetting-is-a-rational-decision',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Guardian Council of the Islamic Republic of Iran' },
        { kind: 'participant', name: 'Mohammad Jahromi' },
        { kind: 'participant', name: 'Gholamhussein Ilham' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In defense of its policies, Mohammad Jahromi, the spokesperson for the central Supervision Committee, said that “this method is not an Inquisition, but a rational decision on who is qualified to be trusted with important tasks.”',
          lang: 'en',
          cite: {
            source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-rights',
            loc: { section: 'Access Denied: III. Human Rights Violations', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran0605/3.htm'
          }
        },
        {
          id: 'q2',
          text: 'In practice, the Guardian Council has interpreted rejal to refer solely to male candidates. The Council’s spokesman, Gholamhussein Ilham, on October 23, 2004, stated this interpretation publicly.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-rights',
            loc: { section: 'Access Denied: III. Human Rights Violations', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran0605/3.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q3',
          text: '“These elections are neither free nor fair,” Stork said.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-06-11-iran-clerical-leaders-foreclose-free-elections',
            loc: { section: 'Iran: Clerical Leaders Foreclose Free Elections', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2005/06/11/iran-clerical-leaders-foreclose-free-elections'
          }
        },
        {
          id: 'q4',
          text: 'The Guardian Council’s vetting process effectively renders Iranian elections into a two-stage process.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-summary',
            loc: { section: 'Access Denied: I. Summary and Recommendations', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran0605/1.htm'
          }
        }
      ]
    },
    {
      id: 'mehrangiz-kar-a-modern-inquisition',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Mehrangiz Kar' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Mehrangiz Kar compared the Guardian Council’s disqualification of candidates to a modern Inquisition.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-06-access-denied-irans-exclusionary-elections-rights',
            loc: { section: 'Access Denied: III. Human Rights Violations', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran0605/3.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
