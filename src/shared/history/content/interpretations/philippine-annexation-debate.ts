import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'philippine-annexation-debate',
  about: ['event:philippine-american-war'],
  topic: 'legitimacy',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'The decision by U.S. policymakers to annex the Philippines was not without domestic controversy.',
    lang: 'en',
    cite: {
      source: 'state-dept-milestones-philippine-american-war',
      loc: { section: 'The Philippine-American War, 1899–1902', para: '4' }
    },
    provenance: { via: 'web', at: '2026-10-06', url: 'https://history.state.gov/milestones/1899-1913/war' }
  },
  positions: [
    {
      id: 'annexationists',
      category: 'contemporary',
      holders: [
        { kind: 'public', name: 'Americans who advocated annexation' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Americans who advocated annexation evinced a variety of motivations: desire for commercial opportunities in Asia, concern that the Filipinos were incapable of self-rule, and fear that if the United States did not take control of the islands, another power (such as Germany or Japan) might do so.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-philippine-american-war',
            loc: { section: 'The Philippine-American War, 1899–1902', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/war'
          }
        }
      ]
    },
    {
      id: 'opponents',
      category: 'contemporary',
      holders: [
        { kind: 'public', name: 'American opponents of U.S. colonial rule' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Meanwhile, American opposition to U.S. colonial rule of the Philippines came in many forms, ranging from those who thought it morally wrong for the United States to be engaged in colonialism, to those who feared that annexation might eventually permit the non-white Filipinos to have a role in American national government. Others were wholly unconcerned about the moral or racial implications of imperialism and sought only to oppose the policies of President William McKinley’s administration.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-philippine-american-war',
            loc: { section: 'The Philippine-American War, 1899–1902', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/war'
          }
        }
      ]
    }
  ]
})
