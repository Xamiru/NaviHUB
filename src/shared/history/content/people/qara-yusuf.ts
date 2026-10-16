import { definePerson } from '../../schema'

export default definePerson({
  id: 'qara-yusuf',
  names: [
    { text: 'Qara Yusuf', lang: 'en', role: 'primary' },
    { text: 'قره یوسف', lang: 'fa', role: 'native' },
    {
      text: 'Qara Yūsof',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '7' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  died: {
    alts: [
      {
        value: { d: '1420', notAfter: '1421' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Leader of the Qara Qoyunlu',
      polity: 'polity:qara-qoyunlu',
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
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1420' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '7' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Rosemarie Quiring-Zoche', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1411' },
            cites: [
              {
                source: 'iranica-yarshater-iranian-history-islamic-period-3',
                loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '28' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '7' }
        },
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '28' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Qara_Yusuf_Qaraqoyunlu%2C_leading_the_Qara_Qoyunlu_army_in_battle_in_1407.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Qara_Yusuf_Qaraqoyunlu,_leading_the_Qara_Qoyunlu_army_in_battle_in_1407.jpg',
    credit: { institution: 'British Library' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Under Qara Yūsof, their leader from 792/1390 to 823/1420, they expelled Tīmūr’s grandson Abū Bakr and killed the latter’s father, Mīrānšāh, the governor of Azarbaijan; they then defeated the Jalayerids to gain control of Baghdad and ʿErāq-e ʿArab (Mesopotamia), conquered parts of Georgia, and penetrated deeper into Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    }
  ]
})
