import { definePerson } from '../../schema'

export default definePerson({
  id: 'hosayn-ali-mirza-farmanfarma',
  names: [
    { text: 'Hosayn-Ali Mirza Farmanfarma', lang: 'en', role: 'primary' },
    { text: 'حسینعلی میرزا فرمانفرما', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1789-09-02' },
        cites: [
          {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1835-07-22' },
        cites: [
          {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '1' }
          },
          {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '8' }
          },
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '8' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:tehran',
    cites: [
      {
        source: 'iranica-hambly-farmanfarma',
        loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '1' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'governor of Fārs',
      start: {
        alts: [
          {
            value: { d: '1799' },
            cites: [
              {
                source: 'iranica-amanat-fath-ali-shah',
                loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '9' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1834' },
            cites: [
              {
                source: 'iranica-amanat-fath-ali-shah',
                loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '9' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '9' }
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
          text: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ (b. Lārījān, 12 Ḏu’l-ḥejja 1203/2 Sept. 1789; d. Tehran, 26 Rabīʿ I 1251/22 July 1835), the fifth son of Fatḥ-ʿAlī Shah (r. 1212-50/1797-1834), long-time governor of Fārs, and briefly the self-styled king of Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/farmanfarma-hosayn-ali-mirza'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Ḥosayn-ʿAlī seems, however, to have been a lethargic ruler, very different from his older brothers, Moḥammad-ʿAlī Mīrzā Dawlatšāh (q.v.) in Kermānšāh and ʿAbbās Mīrzā in Azarbaijan.',
          lang: 'en',
          cite: {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/farmanfarma-hosayn-ali-mirza'
          }
        },
        {
          id: 'q3',
          text: 'Ḥosayn-ʿAlī seems to have viewed his subjects primarily as sources of revenue.',
          lang: 'en',
          cite: {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/farmanfarma-hosayn-ali-mirza'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q4',
          text: 'It may have been at the time of ʿAbbās Mīrzā’s death in 1249/1833, when Fatḥ-ʿAlī Shah designated ʿAbbās Mīrzā’s son, Moḥammad Mīrzā, as heir-apparent, that Ḥosayn-ʿAlī determined to make his bid for the throne.',
          lang: 'en',
          cite: {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/farmanfarma-hosayn-ali-mirza'
          }
        },
        {
          id: 'q5',
          text: 'As soon as Moʿtamad-al-Dawla’s forces approached Shiraz, Ḥosayn-ʿAlī’s former adherents hurried to make their submission, and Ḥosayn-ʿAlī was easily captured and sent to Tehran together with his brother.',
          lang: 'en',
          cite: {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/farmanfarma-hosayn-ali-mirza'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q6',
          text: 'Ḥosayn-ʿAlī built in 1225/1810 in the northeast section of Shiraz an “extensive, beautiful,” terraced garden, called Bāḡ-e Now, with cascades and water spouts along a descending canal that was fed by the Roknābād stream.',
          lang: 'en',
          cite: {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/farmanfarma-hosayn-ali-mirza'
          }
        }
      ]
    }
  ],
  archive: [
    {
      id: 'fraser-1838',
      mediaKind: 'document',
      title: 'Narrative of the residence of the Persian princes in London, in 1835 and 1836. With an account of their journey from Persia, and subsequent adventures',
      date: { d: '1838' },
      url: 'https://archive.org/download/narrativereside01frasgoog/narrativereside01frasgoog.pdf',
      page: 'https://archive.org/details/narrativereside01frasgoog',
      credit: {
        institution: 'New York Public Library (Internet Archive)',
        creator: 'James Baillie Fraser'
      },
      license: { id: 'public-domain' },
      bytes: 6254002
    }
  ]
})
