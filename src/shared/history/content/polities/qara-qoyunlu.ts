import { definePolity } from '../../schema'

export default definePolity({
  id: 'qara-qoyunlu',
  names: [
    { text: 'Qara Qoyunlu', lang: 'en', role: 'primary' },
    {
      text: 'Qara Qoyunlū',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '1' }
        }
      ]
    },
    {
      text: 'Black Sheep',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '28' }
        },
        {
          source: 'iranica-bosworth-azarbaijan-iv',
          loc: { section: 'Azarbaijan iv. Islamic History to 1941', para: '20' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  polityType: 'confederation',
  start: {
    alts: [
      {
        value: { d: '1390' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '7' }
          },
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '28' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rosemarie Quiring-Zoche', discipline: 'historian' },
          { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1351' },
        cites: [
          {
            source: 'iranica-tabriz-x-monuments',
            loc: { section: 'TABRIZ x. MONUMENTS (1) The Blue Mosque', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Sandra Aube', discipline: 'historian' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1468' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '11' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rosemarie Quiring-Zoche', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1469' },
        cites: [
          {
            source: 'iranica-tabriz-x-monuments',
            loc: { section: 'TABRIZ x. MONUMENTS (1) The Blue Mosque', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Sandra Aube', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 3,
  capitals: [
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-bosworth-azarbaijan-iv',
          loc: { section: 'Azarbaijan iv. Islamic History to 1941', para: '20' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 324470 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Qara Qoyunlu (Black Sheep) were settled originally to the north of Lake Van and northern Iraq, while the Āq Qoyunlu (White Sheep), who like the Qara Qoyunlu traced their descent to the Ḡozz tribes, were centered in eastern Anatolia.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        },
        {
          id: 'q2',
          text: 'Qara Yusof (r. 1390-1400, 1406-11) and Jahānšāh (r. 1434-67), the Qara Qoyunlu leaders, were warlike commanders, who for a time managed to bring under their control the regions of western Persia, Armenia, Georgia, Arrān, and Azarbaijan.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'With no leaders remaining, the Qara Qoyunlū confederation ceased to be politically operative, and Uzun Ḥasan was able to take over Azarbaijan in the summer of 873/1468.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q4',
          text: 'After the defeat and collapse of the Qara Qoyunlū confederation, many of its former constituent tribes joined the Āq Qoyunlū and so added to the strength of Uzun Ḥasan’s army.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'The Blue Mosque (Pers.',
          lang: 'en',
          cite: {
            source: 'iranica-tabriz-x-monuments',
            loc: { section: 'TABRIZ x. MONUMENTS (1) The Blue Mosque', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/tabriz-x-monuments'
          }
        },
        {
          id: 'q6',
          text: 'Some of the Qara Qoyunlu, like Jahānšāh, were also patrons of art.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Qara_Qoyunlu._Jahan_Shah._AH_837-872_%28AD_1434-1467%29_Wastan_mint.jpg/1280px-Qara_Qoyunlu._Jahan_Shah._AH_837-872_%28AD_1434-1467%29_Wastan_mint.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Qara_Qoyunlu._Jahan_Shah._AH_837-872_(AD_1434-1467)_Wastan_mint.jpg',
    credit: { institution: 'Classical Numismatic Group' },
    license: { id: 'cc-by-sa', version: '2.5', url: 'https://creativecommons.org/licenses/by-sa/2.5' }
  }
})
