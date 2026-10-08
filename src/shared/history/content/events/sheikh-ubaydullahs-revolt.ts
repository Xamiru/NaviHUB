import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sheikh-ubaydullahs-revolt',
  names: [
    { text: 'Sheikh Ubaydullah’s revolt', lang: 'en', role: 'primary' },
    { text: 'شورش شیخ عبیدالله', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1880' },
        cites: [
          { source: 'britannica-1911-kurdistan', loc: { section: 'KŪRDISTĀN', para: '13' } },
          {
            source: 'iranica-hitchins-kurds-modern-history',
            loc: { section: 'KURDS. STUDIES OF MODERN KURDISH HISTORY', para: '10' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1881' },
        cites: [
          { source: 'britannica-1911-kurdistan', loc: { section: 'KŪRDISTĀN', para: '13' } }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 3,
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' },
    { ref: 'polity:ottoman-empire' }
  ],
  participants: [
    {
      name: 'Sheikh Obaidullah',
      role: 'leader',
      cites: [
        { source: 'britannica-1911-kurdistan', loc: { section: 'KŪRDISTĀN', para: '13' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Russo-Turkish War of 1877–78 was followed by the attempt of Sheikh Obaidullah, 1880–81, to found an independent Kūrd principality under the protection of Turkey.',
          lang: 'en',
          cite: { source: 'britannica-1911-kurdistan', loc: { section: 'KŪRDISTĀN', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/K%C5%ABrdist%C4%81n'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: 'The attempt, at first encouraged by the Porte, as a reply to the projected creation of an Armenian state under the suzerainty of Russia (see Armenia), collapsed after Obaidullah’s raid into Persia, when various circumstances led the central government to reassert its supreme authority.',
          lang: 'en',
          cite: { source: 'britannica-1911-kurdistan', loc: { section: 'KŪRDISTĀN', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/K%C5%ABrdist%C4%81n'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q3',
          text: 'He describes changes in the nature and evolution of Kurdish tribal society and the growing power of the sheikhs, notably of Ubaydullah (ʿObayd-Allāh), the leader of the great uprising of 1880.',
          lang: 'en',
          cite: {
            source: 'iranica-hitchins-kurds-modern-history',
            loc: { section: 'KURDS. STUDIES OF MODERN KURDISH HISTORY', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kurds-studies-of-modern-kurdish-history'
          }
        }
      ]
    }
  ]
})
