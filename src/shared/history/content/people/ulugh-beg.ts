import { definePerson } from '../../schema'

export default definePerson({
  id: 'ulugh-beg',
  names: [
    { text: 'Ulugh Beg', lang: 'en', role: 'primary' },
    {
      text: 'Oloḡ Beg',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-pingree-astronomy-in-iran-i',
          loc: {
            section: 'ASTROLOGY AND ASTRONOMY IN IRAN i. History of astronomy in Iran',
            para: '29'
          }
        }
      ]
    },
    { text: 'الغ‌بیگ', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1394' },
        cites: [
          {
            source: 'loc-name-authority-ulugh-beg',
            loc: { section: 'MARC field 100 $d: heading dates' }
          },
          {
            source: 'iranica-pingree-astronomy-in-iran-i',
            loc: {
              section: 'ASTROLOGY AND ASTRONOMY IN IRAN i. History of astronomy in Iran',
              para: '29'
            }
          },
          { source: 'britannica-1911-ulugh-beg', loc: { section: 'ULUGH BEG', para: '1' } }
        ]
      },
      {
        value: { d: '1393' },
        cites: [
          {
            source: 'iranica-roemer-baysongor',
            loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Hans R. Roemer', discipline: 'historian' }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1449' },
        cites: [
          {
            source: 'loc-name-authority-ulugh-beg',
            loc: { section: 'MARC field 100 $d: heading dates' }
          },
          {
            source: 'iranica-pingree-astronomy-in-iran-i',
            loc: {
              section: 'ASTROLOGY AND ASTRONOMY IN IRAN i. History of astronomy in Iran',
              para: '29'
            }
          },
          { source: 'britannica-1911-ulugh-beg', loc: { section: 'ULUGH BEG', para: '1' } },
          {
            source: 'iranica-roemer-baysongor',
            loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  roles: ['monarch', 'scientist'],
  offices: [
    {
      title: 'Governor of Transoxiana',
      polity: 'polity:timurid-empire',
      start: {
        alts: [
          {
            value: { d: '1409' },
            cites: [
              {
                source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
                loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1447' },
            cites: [
              {
                source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
                loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
        }
      ]
    },
    {
      title: 'Prince of Samarkand',
      polity: 'polity:timurid-empire',
      start: {
        alts: [
          {
            value: { d: '1447' },
            cites: [
              { source: 'britannica-1911-ulugh-beg', loc: { section: 'ULUGH BEG', para: '1' } }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica (11th edition, 1911), article Ulugh Beg'
              }
            ]
          },
          {
            value: { d: '1446' },
            cites: [
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica (11th edition, 1911), article Persia'
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1449' },
            cites: [
              { source: 'britannica-1911-ulugh-beg', loc: { section: 'ULUGH BEG', para: '1' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-ulugh-beg', loc: { section: 'ULUGH BEG', para: '1' } },
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Ulugh_Beg_dispensing_justice_in_Khurasan._Rawzat_al-Safa%2C_1599_%28British_Library%2C_Or._5736%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ulugh_Beg_dispensing_justice_in_Khurasan._Rawzat_al-Safa,_1599_(British_Library,_Or._5736).jpg',
    credit: { institution: 'British Library', creator: '1599 artist' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In the early fifteenth century Sultan Oloḡ Beg (1394-1449) built an observatory at Samarkand and gathered together a group of scientists whose task it was to assist him in revising the accepted astronomical parameters of the Zīǰ-e īl-ḵānī.',
          lang: 'en',
          cite: {
            source: 'iranica-pingree-astronomy-in-iran-i',
            loc: {
              section: 'ASTROLOGY AND ASTRONOMY IN IRAN i. History of astronomy in Iran',
              para: '29'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/astrology-and-astronomy-in-iran/astrology-and-astronomy-in-iran-i-history-of-astronomy-in-iran/'
          }
        },
        {
          id: 'q2',
          text: 'ULUGH BEG, MIRZA MAHOMMED BEN SHAH ROK (1394–1449), Persian astronomer, son of the shah Rok and grandson of Timur, succeeded his father as prince of Samarkand in 1447, after having for years taken part in the government, and was murdered in 1449 by his eldest son.',
          lang: 'en',
          cite: { source: 'britannica-1911-ulugh-beg', loc: { section: 'ULUGH BEG', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ulugh_Beg'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'On the death of the Shah Rukh in 1446 he was succeeded by his son Ulugh Bey, whose scientific tastes are demonstrated in the astronomical tables bearing his name, quoted by European writers when determining the latitude of places in Persia.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q5',
          text: 'He appointed his son Uluḡ Beg, an astronomer and a lover and patron of sciences, as the governor of Transoxiana (1409-47).',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        },
        {
          id: 'q6',
          text: 'It was by his order that the foremost astronomers of the time organized the zij or astronomical tables known as Uluḡ Beg’s Zij, which remained in use for many centuries.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
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
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'Ulugh Bey was put to death by his son Abd ul-Latif, who, six months later, was slain by his own soldiers.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    }
  ]
})
