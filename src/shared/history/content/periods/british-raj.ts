import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'british-raj',
  names: [
    { text: 'British Raj', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1858' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '1' }
          },
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1947' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The British Raj, 1858-1947' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'At the same time, they abolished the British East India Company and replaced it with direct rule under the British crown.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/18.htm' }
        },
        {
          id: 'q2',
          text: 'In proclaiming the new direct-rule policy to "the Princes, Chiefs, and Peoples of India," Queen Victoria (who was given the title Empress of India in 1877) promised equal treatment under British law, but Indian mistrust of British rule had become a legacy of the 1857 rebellion.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/18.htm' }
        },
        {
          id: 'q3',
          text: 'The viceroy announced in 1858 that the government would honor former treaties with princely states and renounced the "doctrine of lapse," whereby the East India Company had annexed territories of rulers who died without male heirs.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/18.htm' }
        },
        {
          id: 'q4',
          text: 'About 40 percent of Indian territory and between 20 and 25 percent of the population remained under the control of 562 princes notable for their religious (Islamic, Sikh, Hindu, and other) and ethnic diversity.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/18.htm' }
        }
      ]
    }
  ]
})
