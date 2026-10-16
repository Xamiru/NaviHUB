import { definePerson } from '../../schema'

export default definePerson({
  id: 'sultan-husayn-bayqara',
  names: [
    { text: 'Sultan Husayn Bayqara', lang: 'en', role: 'primary' },
    {
      text: 'سلطان حسین بایقرا',
      lang: 'fa',
      role: 'native',
      translit: 'Solṭān Ḥosayn Bāyqarā'
    },
    {
      text: 'Ḥosayn Bāyqarā',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '1' }
        }
      ]
    },
    {
      text: 'Ḥosayni',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '7' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1438-05', notAfter: '1438-06' },
        cites: [
          {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1506-05-04' },
        cites: [
          {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '1' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:herat',
    cites: [
      {
        source: 'iranica-roemer-hosayn-bayqara',
        loc: { section: 'ḤOSAYN BĀYQARĀ', para: '1' }
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  roles: ['monarch', 'writer'],
  offices: [
    {
      title: 'Timurid ruler of Herat and Khorasan',
      polity: 'polity:timurid-empire',
      start: {
        alts: [
          {
            value: { d: '1469-03-24' },
            cites: [
              {
                source: 'iranica-roemer-hosayn-bayqara',
                loc: { section: 'ḤOSAYN BĀYQARĀ', para: '4' }
              }
            ]
          },
          {
            value: { d: '1470' },
            cites: [
              {
                source: 'iranica-herat-iii-history-medieval-period',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '20' }
              },
              {
                source: 'iranica-central-asia-v',
                loc: { section: 'CENTRAL ASIA v. In the Mongol and Timurid Periods', para: '19' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Maria Szuppe', discipline: 'historian' },
              { kind: 'scholar', name: 'Bertold Spuler', discipline: 'historian' }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1506-05-04' },
            cites: [
              {
                source: 'iranica-roemer-hosayn-bayqara',
                loc: { section: 'ḤOSAYN BĀYQARĀ', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '1' }
        },
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '4' }
        },
        {
          source: 'iranica-herat-iii-history-medieval-period',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '20' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Portrait_of_Sultan_Husayn_Mirza_Bayqara_at_the_age_of_about_50_years._1500%E2%80%9325_copy_from_Behz%C4%81d%27s_original_of_about_1490.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Sultan_Husayn_Mirza_Bayqara_at_the_age_of_about_50_years._1500%E2%80%9325_copy_from_Behz%C4%81d%27s_original_of_about_1490.jpg',
    credit: { creator: 'Kamāl ud-Dīn Behzād', institution: 'Harvard Art Museums' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'During this period of struggle the last important Timurid ruler, Ḥosayn Bāyqarā (875-912/1470-1506), controlled large portions of eastern Persia and Central Asia from his capital at Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-central-asia-v',
            loc: { section: 'CENTRAL ASIA v. In the Mongol and Timurid Periods', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/central-asia-v'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Sultan Ḥosayn apparently abandoned the idea of expanding his territory; in fact, he went out of his way to avoid conflict, even when action on his part would have seemed necessary or reasonable.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hosayn-bayqara'
          }
        },
        {
          id: 'q3',
          text: 'During the long reign of Solṭān-Ḥosayn Bāyqarā, Herat underwent substantial development, and its countryside prospered.',
          lang: 'en',
          cite: {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '21' }
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
      kind: 'ideas',
      quotes: [
        {
          id: 'q4',
          text: 'Sultan Ḥosayn respected and supported the Sufis, especially those belonging to the Naqšbandiya order; the ideas current among them were in accordance with Timurid religious policy, and Timur’s personal sympathies with this group were also well known.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hosayn-bayqara'
          }
        },
        {
          id: 'q5',
          text: 'Ḥosayn Bāyqarā showed little concern for administrative reforms.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hosayn-bayqara'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q6',
          text: 'Clues to his personality can be found in his own works, written under the pseudonym Ḥosayni, such as his collection of poems (divān) in Chaghatay Turkish',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hosayn-bayqara'
          }
        }
      ]
    }
  ]
})
