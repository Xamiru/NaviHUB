import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'nazi-germany',
  names: [
    { text: 'Nazi Germany', lang: 'en', role: 'primary' },
    { text: 'Third Reich', lang: 'en', role: 'alternative' },
    { text: 'Drittes Reich', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1933' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich, 1933-45' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1945' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich, 1933-45' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Hitler rapidly transformed the Weimar Republic into a dictatorship.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich, 1933-45: The Consolidation of Power', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/39.htm' }
        },
        {
          id: 'q2',
          text: 'Once the regime was established, terror was the principal means used to maintain its control of Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich, 1933-45: The Consolidation of Power', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/39.htm' }
        },
        {
          id: 'q3',
          text: 'Many Germans supported it, some out of opportunism, some because they liked certain aspects of it such as full employment, which was quickly achieved. The regime also brought social order, something many Germans welcomed after fifteen years of political and economic chaos.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich, 1933-45: The Consolidation of Power', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/39.htm' }
        },
        {
          id: 'q4',
          text: 'Anti-Semitism was one of the Third Reich\'s most faithfully executed policies.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/42.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Once his regime was consolidated, Hitler took little interest in domestic policy, his sole concern being that Germany become sufficiently strong to realize his long-term geopolitical goal of creating a German empire that would dominate western Europe and extend deep into Russia.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich: Foreign Policy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/40.htm' }
        },
        {
          id: 'q6',
          text: 'Large weapons contracts with industrial firms soon had the economy running at top speed, and full employment was reached by 1937.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich: Foreign Policy', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/40.htm' }
        }
      ]
    }
  ]
})
