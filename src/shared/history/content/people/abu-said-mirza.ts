import { definePerson } from '../../schema'

export default definePerson({
  id: 'abu-said-mirza',
  names: [
    { text: 'Abu Said Mirza', lang: 'en', role: 'primary' },
    {
      text: 'Solṭān-Abu Saʿid',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
        }
      ]
    },
    { text: 'ابوسعید میرزا', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-16',
  died: {
    alts: [
      {
        value: { d: '1469-02-05' },
        cites: [
          {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '6' }
          }
        ]
      },
      {
        value: { d: '1468' },
        cites: [
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Timurid ruler of Herat',
      polity: 'polity:timurid-empire',
      start: {
        alts: [
          {
            value: { d: '1451' },
            cites: [
              {
                source: 'iranica-szuppe-herat-iii',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
              },
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '12' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1469' },
            cites: [
              {
                source: 'iranica-szuppe-herat-iii',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
              },
              {
                source: 'iranica-manz-gowhar-sad-aga',
                loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '6' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
        },
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Solṭān-Abu Saʿid repeatedly had to face internal challengers, and in the end he was unable to maintain the unity of the early Timurid state.',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'After him Abu Saʽid, grandson of Miran Shah, and once governor of Fars, became a candidate for empire, and allied himself with the Uzbeg Tatars, seized Bokhara, entered Khorasan, and waged war upon the Turkoman tribe aforesaid, which, since the invasion of Azerbaijan, had, under Jahan Shah, overrun Irak, Fars and Kermān, and pillaged Herat.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q4',
          text: 'Under his rule, in 1458, Herat suffered a brief occupation by the armies of Jahānšāh Qarā Qoyunlu, ruler of the western Persia and Azarbaijan',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'After his death, both the territories to the west of Khorasan and Transoxiana were lost to the control of the Herat ruler.',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        }
      ]
    }
  ]
})
