import { definePerson } from '../../schema'

export default definePerson({
  id: 'jahan-shah',
  names: [
    { text: 'Jahan Shah', lang: 'en', role: 'primary' },
    { text: 'جهانشاه', lang: 'fa', role: 'native', translit: 'Jahānšāh' },
    {
      text: 'Jahānšāh',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '10' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  died: {
    alts: [
      {
        value: { d: '1467' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '11' }
          },
          { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '4' } },
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '28' }
          }
        ]
      },
      {
        value: { d: '1468' },
        cites: [
          {
            source: 'iranica-courts-and-courtiers-v',
            loc: {
              section: 'COURTS AND COURTIERS v. Under the Timurid and Turkman dynasties',
              para: '16'
            }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Monika Gronke', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Ruler of the Qara Qoyunlu',
      polity: 'polity:qara-qoyunlu',
      start: {
        alts: [
          {
            value: { d: '1434' },
            cites: [
              {
                source: 'iranica-yarshater-iranian-history-islamic-period-3',
                loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '28' }
              },
              { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '4' } }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' },
              { kind: 'scholar', name: 'Kathryn Babayan', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1438' },
            cites: [
              {
                source: 'iranica-bosworth-azarbaijan-iv',
                loc: { section: 'Azarbaijan iv. Islamic History to 1941', para: '20' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Clifford Edmund Bosworth', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1439' },
            cites: [
              {
                source: 'iranica-tabriz-x-monuments',
                loc: { section: 'TABRIZ x. MONUMENTS (1) The Blue Mosque', para: '2' }
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
            value: { d: '1467' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '11' }
              },
              {
                source: 'iranica-yarshater-iranian-history-islamic-period-3',
                loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '28' }
              },
              { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '4' } }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '28' }
        },
        { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '4' } },
        {
          source: 'iranica-bosworth-azarbaijan-iv',
          loc: { section: 'Azarbaijan iv. Islamic History to 1941', para: '20' }
        },
        {
          source: 'iranica-tabriz-x-monuments',
          loc: { section: 'TABRIZ x. MONUMENTS (1) The Blue Mosque', para: '2' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Portrait_of_the_Qara_Qoyunlu_ruler_Jahan_Shah_by_Abu%27l-Hasan_Mostawfi_Ghaffari%2C_dated_1780_or_1795.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_the_Qara_Qoyunlu_ruler_Jahan_Shah_by_Abu%27l-Hasan_Mostawfi_Ghaffari,_dated_1780_or_1795.jpg',
    credit: { creator: 'Abu\'l-Hasan Mostawfi Ghaffari', institution: 'Musée du Louvre' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The sovereignty of the Qarā Qoyunlu ruler Jahānšāh b. Qarā Yusof (r. 1434-67), whose dominion extended over the territories of Azarbaijan, ʿErāq-e ʿAjam, ʿErāq-e ʿArab, Fārs, and Kermān, was threatened by his Āq Qoyunlu rival Uzun Ḥasan (r. 1457-78), who dwelled further west in Diārbakr',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Jahānšāh backed Jaʿfar’s claim over both the spiritual and administrative directorship of the Ṣafaviya order and denied Jonayd’s contest for the order’s headship.',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
          }
        }
      ]
    }
  ]
})
