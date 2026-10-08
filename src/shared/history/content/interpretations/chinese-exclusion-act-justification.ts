import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'chinese-exclusion-act-justification',
  about: ['event:chinese-exclusion-act'],
  topic: 'legitimacy',
  researched: '2026-10-09',
  positions: [
    {
      id: 'good-order-of-localities',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States Congress (1882)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Whereas in the opinion of the Government of the United States the coming of Chinese laborers to this country endangers the good order of certain localities within the territory thereof: Therefore,',
          lang: 'en',
          cite: {
            source: 'nara-milestone-chinese-exclusion-act',
            loc: { section: 'Chinese Exclusion Act (1882)', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/chinese-exclusion-act'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'For American presidents and Congressmen addressing the question of Chinese exclusion, the challenge was to balance domestic attitudes and politics, which dictated an anti-Chinese policy, while maintaining good diplomatic relations with China',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-immigration',
            loc: { section: 'Chinese Immigration and the Chinese Exclusion Acts', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1866-1898/chinese-immigration'
          }
        }
      ]
    },
    {
      id: 'economic-cultural-and-ethnic',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'American objections to Chinese immigration took many forms, and generally stemmed from economic and cultural tensions, as well as ethnic discrimination.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-immigration',
            loc: { section: 'Chinese Immigration and the Chinese Exclusion Acts', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/chinese-immigration'
          }
        },
        {
          id: 'q3',
          text: 'The domestic factors ultimately trumped international concerns.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-immigration',
            loc: { section: 'Chinese Immigration and the Chinese Exclusion Acts', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/chinese-immigration'
          }
        }
      ]
    },
    {
      id: 'condemned',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'National Archives and Records Administration' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'In 2011-2012, Congress condemned the Chinese Exclusion Act and affirmed a commitment to preserve civil rights and constitutional protections for all people:',
          lang: 'en',
          cite: {
            source: 'nara-milestone-chinese-exclusion-act',
            loc: { section: 'Chinese Exclusion Act (1882)', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/chinese-exclusion-act'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'The Chinese Exclusion Acts were not repealed until 1943, and then only in the interests of aiding the morale of a wartime ally during World War II.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-immigration',
            loc: { section: 'Chinese Immigration and the Chinese Exclusion Acts', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1866-1898/chinese-immigration'
          }
        }
      ]
    }
  ]
})
