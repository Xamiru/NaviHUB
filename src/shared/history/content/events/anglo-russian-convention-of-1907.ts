import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anglo-russian-convention-of-1907',
  names: [
    { text: 'Anglo-Russian Convention of 1907', lang: 'en', role: 'primary' },
    { text: 'Anglo-Russian Agreement of 1907', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1907-08-31' },
        cites: [
          {
            source: 'iranica-kazemzadeh-anglo-russian-convention',
            loc: { section: 'ANGLO-RUSSIAN CONVENTION OF 1907', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia', 'south-asia', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:saint-petersburg',
      cites: [
        {
          source: 'iranica-kazemzadeh-anglo-russian-convention',
          loc: { section: 'ANGLO-RUSSIAN CONVENTION OF 1907', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:russo-japanese-war',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-kazemzadeh-anglo-russian-convention',
          loc: { section: 'ANGLO-RUSSIAN CONVENTION OF 1907', para: '1' }
        }
      ]
    },
    {
      ref: 'event:russian-revolution-of-1905',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-kazemzadeh-anglo-russian-convention',
          loc: { section: 'ANGLO-RUSSIAN CONVENTION OF 1907', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Sir Edward Grey',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-kazemzadeh-anglo-russian-convention',
          loc: { section: 'ANGLO-RUSSIAN CONVENTION OF 1907', para: '3' }
        }
      ]
    },
    {
      name: 'Sir Arthur Nicolson',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-kazemzadeh-anglo-russian-convention',
          loc: { section: 'ANGLO-RUSSIAN CONVENTION OF 1907', para: '3' }
        }
      ]
    },
    {
      name: 'Aleksandr Izvol\'skiy',
      role: 'diplomat',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The Last Years of the Autocracy', para: '14' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ANGLO-RUSSIAN CONVENTION OF 1907, an agreement relating to Persia, Afghanistan, and Tibet. Signed on 31 August in St. Petersburg, it formalized political changes that had occurred in the Far East, the Middle East and Europe as a result of the Russo-Japanese war and the Russian revolution of 1905.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-russian-convention',
            loc: { section: 'ANGLO-RUSSIAN CONVENTION OF 1907', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-russian-convention-of-1907'
          }
        },
        {
          id: 'q2',
          text: 'The heart of the convention was its first section, concerning Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-russian-convention',
            loc: { section: 'ANGLO-RUSSIAN CONVENTION OF 1907', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-russian-convention-of-1907'
          }
        },
        {
          id: 'q3',
          text: 'Most serious of all, the hope that the Constitutional Revolution would inaugurate a new era of independence from the great powers ended when, under the Anglo-Russian Agreement of 1907, Britain and Russia agreed to divide Iran into spheres of influence. The Russians were to enjoy exclusive right to pursue their interests in the northern sphere, the British in the south and east; both powers would be free to compete for economic and political advantage in a neutral sphere in the center.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/13.htm' }
        },
        {
          id: 'q4',
          text: 'At no time during more than a year of negotiations did the British or the Russians inform Persia, Afghanistan, or Tibet of the decisions being made about them or at their expense.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-russian-convention',
            loc: { section: 'ANGLO-RUSSIAN CONVENTION OF 1907', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-russian-convention-of-1907'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The convention aroused great bitterness among the Iranians and the Afghans. It remained in force, with revisions made in 1915, until it was repudiated by the Soviet government in 1918, although both its letter and its spirit were repeatedly violated by Russia almost from the moment it was signed.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-russian-convention',
            loc: { section: 'ANGLO-RUSSIAN CONVENTION OF 1907', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-russian-convention-of-1907'
          }
        },
        {
          id: 'q6',
          text: 'The Anglo-Russian Agreement, detested by nationalists, designates the north and south of Persia as spheres of influence of the Russians and British, respectively, leaving only central Persia independent.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1907' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    }
  ]
})
