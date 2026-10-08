import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'southern-tribal-revolt-of-1946',
  names: [
    { text: 'Southern tribal revolt of 1946', lang: 'en', role: 'primary' },
    { text: 'نهضت جنوب', lang: 'fa', role: 'native' },
    { text: 'South Resistance Movement', lang: 'en', role: 'alternative' },
    { text: 'Nahżat-e moqāwamat-e janūb', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1946-09-18' },
        cites: [
          {
            source: 'iranica-ashraf-fars-qajar-pahlavi',
            loc: { section: 'FĀRS iv. History in the Qajar and Pahlavi Periods', para: '42' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1946-10-15' },
        cites: [
          {
            source: 'iranica-ashraf-fars-qajar-pahlavi',
            loc: { section: 'FĀRS iv. History in the Qajar and Pahlavi Periods', para: '42' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:shiraz',
      cites: [
        {
          source: 'iranica-oberling-qashqai-history',
          loc: { section: 'QAŠQĀʾI TRIBAL CONFEDERACY i. History', para: '24' }
        }
      ]
    },
    {
      ref: 'place:kazerun',
      cites: [
        {
          source: 'iranica-oberling-qashqai-history',
          loc: { section: 'QAŠQĀʾI TRIBAL CONFEDERACY i. History', para: '24' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  sides: [
    {
      key: 'tribes',
      name: 'tribal warriors',
      cites: [
        {
          source: 'iranica-ashraf-fars-qajar-pahlavi',
          loc: { section: 'FĀRS iv. History in the Qajar and Pahlavi Periods', para: '42' }
        }
      ]
    },
    {
      key: 'government',
      name: 'government',
      polity: 'polity:pahlavi-iran',
      cites: [
        {
          source: 'iranica-ashraf-fars-qajar-pahlavi',
          loc: { section: 'FĀRS iv. History in the Qajar and Pahlavi Periods', para: '42' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Moḥammad-Nāṣer Khan Qašqāʾī',
      role: 'leader',
      side: 'tribes',
      cites: [
        {
          source: 'iranica-ashraf-fars-qajar-pahlavi',
          loc: { section: 'FĀRS iv. History in the Qajar and Pahlavi Periods', para: '42' }
        }
      ]
    },
    {
      name: 'Mortażāqolī Khan Baḵtīārī',
      role: 'leader',
      side: 'tribes',
      cites: [
        {
          source: 'iranica-digard-bakhtiari-mortazaqoli-khan',
          loc: { section: 'BAḴTĪĀRĪ ix. Mortażāqolī Khan', para: '1' }
        }
      ]
    },
    {
      ref: 'person:ahmad-qavam',
      role: 'head-of-government',
      side: 'government',
      cites: [
        {
          source: 'iranica-ashraf-fars-qajar-pahlavi',
          loc: { section: 'FĀRS iv. History in the Qajar and Pahlavi Periods', para: '42' }
        }
      ]
    },
    {
      ref: 'person:fazlollah-zahedi',
      role: 'negotiator',
      side: 'government',
      cites: [
        {
          source: 'iranica-ashraf-fars-qajar-pahlavi',
          loc: { section: 'FĀRS iv. History in the Qajar and Pahlavi Periods', para: '42' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:iran-crisis-of-1946', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The next major event of this period was an anti-Communist tribal rebellion which began on the 18th of September 1946, when Moḥammad-Nāṣer Khan called a conference of leading tribal khans and religious leaders of the province to announce the creation of the South Resistance Movement (Nahżat-e moqāwamat-e janūb).',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-fars-qajar-pahlavi',
            loc: { section: 'FĀRS iv. History in the Qajar and Pahlavi Periods', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/fars-iv/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The prime minister, Aḥmad Qawām, who was under great pressure by the Soviet Union to accept a Soviet oil concession in Northern Persia, had already been coerced into accepting three Communist Tudeh Party members in his cabinet. He felt that a widespread anti-Soviet uprising in Southern Persia would act as a counterweight to that pressure.',
          lang: 'en',
          cite: {
            source: 'iranica-oberling-qashqai-history',
            loc: { section: 'QAŠQĀʾI TRIBAL CONFEDERACY i. History', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/qasqai-tribal-confederacy-i/'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'He sent an ultimatum to the then prime minister Aḥmad Qawām (Qawām-al-Salṭana), demanding, inter alia, the formation of a provincial council similar to that in Azarbaijan, the resignation of the Tudeh (Tūda) party members of the cabinet, and more representatives for Fārs in the Majles.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-fars-qajar-pahlavi',
            loc: { section: 'FĀRS iv. History in the Qajar and Pahlavi Periods', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/fars-iv/'
          }
        },
        {
          id: 'q4',
          text: 'But Nāṣer Khan also wanted to improve living conditions in Fars. Therefore, in September 1946, he called a conference of the major tribal and religious leaders of the province at Čenār Rāhdār and a “national” movement called “Saʿdun” (“The Happy Ones”) was created which demanded, among other things, the resignation of the entire cabinet, except for Premier Qawām, the allocation of two-thirds of Fars’s taxes to the province, the immediate formation of provincial councils and more representatives from Fars in the Majles.',
          lang: 'en',
          cite: {
            source: 'iranica-oberling-qashqai-history',
            loc: { section: 'QAŠQĀʾI TRIBAL CONFEDERACY i. History', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/qasqai-tribal-confederacy-i/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'When Qawām rejected the ultimatum, tribal warriors occupied several army garrisons and acquired a considerable amount of booty. To pacify the region, Qawām sent a mission to Shiraz under Major General Fażl-Allāh Zāhedī.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-fars-qajar-pahlavi',
            loc: { section: 'FĀRS iv. History in the Qajar and Pahlavi Periods', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/fars-iv/'
          }
        },
        {
          id: 'q6',
          text: 'When these demands were rejected, tribes from Ḵuzestān to Kermān rose en masse. The Qašqāʾi seized the towns of Kazerun and Ābāda, and broke through the outer defenses of Shiraz.',
          lang: 'en',
          cite: {
            source: 'iranica-oberling-qashqai-history',
            loc: { section: 'QAŠQĀʾI TRIBAL CONFEDERACY i. History', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/qasqai-tribal-confederacy-i/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Premier Qawām’s scheme worked to perfection, for, in October, he was able to form a new cabinet without any Tudeh Party members.',
          lang: 'en',
          cite: {
            source: 'iranica-oberling-qashqai-history',
            loc: { section: 'QAŠQĀʾI TRIBAL CONFEDERACY i. History', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/qasqai-tribal-confederacy-i/'
          }
        },
        {
          id: 'q8',
          text: 'Moreover, a few months later, Ḵosrow Khan was elected as a member of Qawām’s Demokrāt-e Iran party to represent the Qašqāʾi in the Fifteenth Majles, which rejected the Soviet concession.',
          lang: 'en',
          cite: {
            source: 'iranica-oberling-qashqai-history',
            loc: { section: 'QAŠQĀʾI TRIBAL CONFEDERACY i. History', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/qasqai-tribal-confederacy-i/'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1946-10-15' },
            cites: [
              {
                source: 'iranica-ashraf-fars-qajar-pahlavi',
                loc: { section: 'FĀRS iv. History in the Qajar and Pahlavi Periods', para: '42' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On 15 October 1946, General Zāhedī and Moḥammad-Nāṣer Khan reached a settlement, with the government acceding to the demands of the movement',
        lang: 'en',
        cite: {
          source: 'iranica-ashraf-fars-qajar-pahlavi',
          loc: { section: 'FĀRS iv. History in the Qajar and Pahlavi Periods', para: '42' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/fars-iv/'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'showkat-2007-dar-tirras-e-hadeseh', perspective: 'iranian' }
  ]
})
