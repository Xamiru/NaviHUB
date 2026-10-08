import { definePerson } from '../../schema'

export default definePerson({
  id: 'mohammad-ali-foroughi',
  names: [
    { text: 'Mohammad-Ali Foroughi', lang: 'en', role: 'primary' },
    { text: 'محمدعلی فروغی', lang: 'fa', role: 'native' },
    { text: 'Moḥammad-ʿAlī Forūḡī Ḏokāʾ-al-Molk', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1877-07' },
        cites: [
          {
            source: 'iranica-azimi-afshar-forughi-mohammad-ali',
            loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '1' }
          }
        ]
      },
      {
        value: { d: '1876' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1942' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1942-11-26' },
        cites: [
          {
            source: 'iranica-azimi-afshar-forughi-mohammad-ali',
            loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '1' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:tehran',
    cites: [
      {
        source: 'iranica-azimi-afshar-forughi-mohammad-ali',
        loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '5' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician', 'scholar', 'diplomat'],
  offices: [
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      end: {
        alts: [
          {
            value: { d: '1926-06' },
            cites: [
              {
                source: 'iranica-azimi-afshar-forughi-mohammad-ali',
                loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '9' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-azimi-afshar-forughi-mohammad-ali',
          loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '9' }
        }
      ]
    },
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1933-09' },
            cites: [
              {
                source: 'iranica-azimi-afshar-forughi-mohammad-ali',
                loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '11' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1935-12' },
            cites: [
              {
                source: 'iranica-azimi-afshar-forughi-mohammad-ali',
                loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '11' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-azimi-afshar-forughi-mohammad-ali',
          loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '11' }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1933' }
        }
      ]
    },
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1941-08' },
            cites: [
              {
                source: 'iranica-azimi-afshar-forughi-mohammad-ali',
                loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '12' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-azimi-afshar-forughi-mohammad-ali',
          loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '12' }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1941' }
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
          text: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK, statesman, scholar, and man of letters (b. Jomādā II 1294 /July1877; d. 5 Āḏar 1321 Š./26 November 1942',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-afshar-forughi-mohammad-ali',
            loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/forugi-mohammad-ali/'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Born in Tehran into a family of Isfahani merchant origin, Forūḡī was the oldest child of Moḥammad-Ḥosayn Khan Ḏokāʾ-al-Molk (Forūḡī), a Qajar writer, poet, translator and official.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-afshar-forughi-mohammad-ali',
            loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/forugi-mohammad-ali/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'At the age of 32 he was elected a deputy for Tehran in the second Majles (1909-11), and was soon chosen as speaker.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-afshar-forughi-mohammad-ali',
            loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/forugi-mohammad-ali/'
          }
        },
        {
          id: 'q4',
          text: 'Soon after, Reżā Shah appointed Forūḡī as his first prime minister; he served in this capacity until Tīr 1305 Š./June 1926.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-afshar-forughi-mohammad-ali',
            loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/forugi-mohammad-ali/'
          }
        },
        {
          id: 'q5',
          text: 'In Šahrīvar 1307 Š./September 1928, while ambassador in Turkey, he was appointed the first Persian representative at the League of Nations and served as president of the League’s Council, a rotating post among member countries',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-afshar-forughi-mohammad-ali',
            loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/forugi-mohammad-ali/'
          }
        },
        {
          id: 'q6',
          text: '1935 The Academy of Persian Language (Farhangestān) opens with Moḥammad-ʿAli Foruḡi as its Chair.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1935' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q7',
          text: 'In Šahrīvar 1320 Š./August 1941, the Anglo-Soviet invasion of Persia forced Reżā Shah, reluctantly and on the insistence of his ministers, to call upon Forūḡī to assume the premiership',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-afshar-forughi-mohammad-ali',
            loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/forugi-mohammad-ali/'
          }
        },
        {
          id: 'q8',
          text: 'On the other hand, Forūḡī played a significant role in the smooth and speedy transfer of the throne to the crown prince, Moḥammad-Reẓā, whom he envisaged acting as a constitutional monarch.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-afshar-forughi-mohammad-ali',
            loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/forugi-mohammad-ali/'
          }
        },
        {
          id: 'q9',
          text: 'As prime minister Forūḡī sponsored the approval by the Persian parliament of the treaty of alliance between Persia, Britain and the Soviet Union',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-afshar-forughi-mohammad-ali',
            loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/forugi-mohammad-ali/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q10',
          text: 'Forūḡī turned down this offer, however, as the conditions proved unacceptable (Enteẓām, pp. 186-87). Shortly afterwards, he died of heart failure',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-afshar-forughi-mohammad-ali',
            loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/forugi-mohammad-ali/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q11',
          text: 'As a statesman, Forūḡī’s personal integrity and honesty have rarely been disputed, even by his critics (Moṣaddeq, p. 100; Sanjābī pp. 57-61). Others have, however, blamed him for helping to bring about Reżā Shah’s regime and continuing to serve it despite its blatant misdeeds',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-afshar-forughi-mohammad-ali',
            loc: { section: 'FORŪGĪ, MOḤAMMAD-ʿALĪ ḎOKĀʾ-AL-MOLK', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/forugi-mohammad-ali/'
          }
        }
      ]
    }
  ]
})
