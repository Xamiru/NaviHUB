import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-abbas-i',
  names: [
    { text: 'Reign of Abbas I', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1588-10-01' },
        cites: [
          { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '4' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Roger M. Savory', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1587' },
        cites: [
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '30' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1629-01-19' },
        cites: [
          { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '1' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  parent: 'polity:safavid-iran',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Safavid state reached its apogee during the reign of Shah Abbas (1587-1629).',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q2',
          text: 'His reign also marks a crucial phase in the evolution of Safavid Persia from a steppe formation to a (quasi-) bureaucratic state.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Shah ʿAbbās was first and foremost an outstanding strategist, keen to regain the territories that had been lost to enemy forces or to internal sedition.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q4',
          text: 'Regaining Persia and securing its borders was intimately linked to Shah ʿAbbās’ main objective, that of maximizing personal control and centralizing power.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q5',
          text: 'Shah ʿAbbās was a great builder.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q6',
          text: 'Shah ʿAbbās was the first Safavid ruler to attempt to establish control over the Persian Gulf coast, an area with strong connections to the Indian Ocean that had rarely been an integral part of Persia and that had long been ruled by independent, mostly Arab dynasties.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '40' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q7',
          text: 'Mixing commercial with strategic concerns, Shah ʿAbbās opened Persia to the wider world in unprecedented ways.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'The administrative reforms of Shah ʿAbbās gave the Safavid state new strength and vigor.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q9',
          text: 'The reign of Shah ʿAbbās marks a high point in that remarkable final flowering of Persian classical arts which occurred in Safavid times.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Portraits_of_Shah_Abbas_I_by_Bishandas_%281615-1620%29.jpg/1280px-Portraits_of_Shah_Abbas_I_by_Bishandas_%281615-1620%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portraits_of_Shah_Abbas_I_by_Bishandas_(1615-1620).jpg',
    credit: { creator: 'Bishandas' },
    license: { id: 'public-domain' }
  }
})
