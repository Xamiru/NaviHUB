import { definePerson } from '../../schema'

export default definePerson({
  id: 'claude-mathieu-de-gardane',
  names: [
    { text: 'Claude-Mathieu de Gardane', lang: 'en', role: 'primary' },
    {
      text: 'Gardanne',
      lang: 'fr',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1766' },
        cites: [
          {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '4' }
          },
          {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '10' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1818' },
        cites: [
          {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '4' }
          },
          {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'iran'],
  roles: ['military', 'diplomat'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Claude Mathieu (or Mathieu Claude) de Gardane (wrongly spelled Gardanne, even in official documents; b. Marseilles, 1766, d. 1818), was the great son of Ange de Gardane, Louis XIV’s envoy to the court of Shah Solṭān Ḥosayn.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gardane-mission'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q2',
          text: 'Despite Gardane’s failure, Napoleon maintained his dotation in Westphalia, granted in March 1808, and promoted him to “Comte d’Empire” in August 1809. However, after his misconduct during the retreat in Portugal (1811), he fell in complete disgrace.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gardane-mission'
          }
        }
      ]
    }
  ]
})
