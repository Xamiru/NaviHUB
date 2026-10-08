import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'saadabad-pact',
  names: [
    { text: 'Saadabad Pact', lang: 'en', role: 'primary' },
    { text: 'پیمان سعدآباد', lang: 'fa', role: 'native' },
    { text: 'Saʿdābād Pact', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1937-07-08' },
        cites: [
          {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '18' }
          },
          {
            source: 'iranica-schofield-boundaries-turkey',
            loc: { section: 'BOUNDARIES v. With Turkey' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-schofield-boundaries-turkey',
          loc: { section: 'BOUNDARIES v. With Turkey' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-reza-shah' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' },
    { ref: 'polity:republic-of-turkey' },
    { ref: 'polity:kingdom-of-iraq' },
    { ref: 'polity:kingdom-of-afghanistan' }
  ],
  participants: [
    {
      name: 'Iran',
      role: 'signatory',
      cites: [
        {
          source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
          loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '18' }
        }
      ]
    },
    {
      name: 'Afghanistan',
      role: 'signatory',
      cites: [
        {
          source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
          loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '18' }
        }
      ]
    },
    {
      name: 'Iraq',
      role: 'signatory',
      cites: [
        {
          source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
          loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '18' }
        }
      ]
    },
    {
      name: 'Turkey',
      role: 'signatory',
      cites: [
        {
          source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
          loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '18' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iran-iraq-boundary-treaty-of-1937',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-ramazani-arab-iranian-relations-modern-times',
          loc: { section: 'ʿARAB v. Arab-Iranian Relations in Modern Times', para: '1' }
        }
      ]
    },
    { ref: 'event:baghdad-pact', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'This in turn removed a main obstacle in the way of finalizing a more general and broader non-aggression agreement on 8 July 1937, known is the Saʿdābād Pact, between Iran, Afghanistan, Iraq, and Turkey.',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The military coup of Reżā Khan (1921) and his accession to the throne (1925) resulted in sufficient governmental capacity to conduct foreign affairs effectively. Reżā Shah’s good-neighbor policy addressed three major problems with Iraq',
          lang: 'en',
          cite: {
            source: 'iranica-ramazani-arab-iranian-relations-modern-times',
            loc: { section: 'ʿARAB v. Arab-Iranian Relations in Modern Times', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/arab-v/'
          }
        },
        {
          id: 'q3',
          text: 'In the area of foreign policy, he devised a “good-neighbor” policy, signing goodwill treaties with Russia and Afghanistan in 1921, and then with Turkey in 1926.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The Second Article of the Saadabad (Saʿdābād) Pact, signed in Tehran between Persia, Turkey, Iraq, and Afghanistan on 17 Tīr 1316 Š./8 July 1937, stipulated that the inviolability of Persian frontiers must be respected',
          lang: 'en',
          cite: {
            source: 'iranica-schofield-boundaries-turkey',
            loc: { section: 'BOUNDARIES v. With Turkey' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/boundaries-v/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Four days later, Iran and Iraq joined with Afghanistan and Turkey in the Saʿdābād Pact, which was probably intended to deter the perceived threat of Italy to the Middle East; if there were similar designs to resist pressures from Moscow, the alliance had no effect, since the Soviet Union invaded Iran in 1941.',
          lang: 'en',
          cite: {
            source: 'iranica-ramazani-arab-iranian-relations-modern-times',
            loc: { section: 'ʿARAB v. Arab-Iranian Relations in Modern Times', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/arab-v/'
          }
        },
        {
          id: 'q6',
          text: 'During this time, the two pro-Western monarchies signed a boundary treaty, in 1937, and participated in two non-aggression and security pacts.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
          }
        }
      ]
    }
  ]
})
