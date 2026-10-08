import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russian-bombardment-of-the-imam-reza-shrine',
  names: [
    { text: 'Russian bombardment of the Imam Reza shrine', lang: 'en', role: 'primary' },
    { text: 'توپ‌باران حرم امام رضا', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1912-03-29' },
        cites: [
          {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '24' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Yousef Motavalli Haghighi' }
        ]
      },
      {
        value: { d: '1912-03-30' },
        cites: [
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '47'
            }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Elena Andreeva' }
        ]
      },
      {
        value: { d: '1911' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1911' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ehsan Yarshater' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:mashhad',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '47'
          }
        },
        {
          source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
          loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '24' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-ahmad-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:russian-empire' }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 39, qualifier: 'over' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '47'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Elena Andreeva' }
            ]
          },
          {
            value: { min: 40, max: 800 },
            cites: [
              {
                source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
                loc: {
                  section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods',
                  para: '24'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Yousef Motavalli Haghighi' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:shuster-mission', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'After the former shah finally left Iran aboard a Russian ship, his followers in Mashad took refuge in the shrine of Imam Reżā.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '47'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q2',
          text: 'However, the Russians, once it was clear that the effort to restore Moḥammad-ʿAli Shah had failed, took matters into their own hands and withdrew their support for Yusof Khan and his forces and decided to remove them from the Gowhar-šād mosque and the Rażawi shrine.',
          lang: 'en',
          cite: {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khorasan-xi-history-in-the-qajar-and-pahlavi-periods'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'On 29 March 1912, the Russians directed a volley of hundreds of artillery shells and bullets at the Rażawi shrine (Adib Heravi, pp. 211-12; Sykes, II, p. 426; Matthee; Figure 2).',
          lang: 'en',
          cite: {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khorasan-xi-history-in-the-qajar-and-pahlavi-periods'
          }
        },
        {
          id: 'q4',
          text: 'On 30 March 912, after they refused several times to leave their sanctuary, Russian troops surrounded the shrine, shelled and stormed it. At least thirty-nine Iranians were killed (Kulagina, pp. 182-86).',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '47'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q5',
          text: '1911 Russian forces invade Khorasan and bombard the shrine of Imam Reżā in Mashad.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1911' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q6',
          text: 'In addition to damaging the dome of the Rażawi shrine, and despite Yusof Khan Herāti and his confederates having left the shrine and its surrounding structures, the Russians brutally occupied the courtyard with their cavalry and infantry, killing many innocent pilgrims. Estimates of the number of people who died in this incident vary greatly, from 40 to 800 (Motavalli Ḥaqiqi, 2013, I, pp. 145-47).',
          lang: 'en',
          cite: {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khorasan-xi-history-in-the-qajar-and-pahlavi-periods'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Persia, which had hoped to use Germany to counterbalance the steadily increasing influence of Russia and Britain, was made painfully aware of what the agreement meant for those expectations when German diplomacy remained distressingly passive in face of the harsh measures of coercion taken by Russia against Persia in December 1911 (e.g, the ultimatum leading to the dismissal of the American financial advisor Morgan W. Shuster, the occupation of parts of Azarbaijan and Khorasan, and the bombardment of the shrine of Imam Reżā in Mašhad; see Martin, pp. 194-96).',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Imam_Reza_shrine_and_Goharshad_Mosque%2C_view_from_Tehran_st_-_1935.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Imam_Reza_shrine_and_Goharshad_Mosque,_view_from_Tehran_st_-_1935.jpg',
    credit: { institution: 'Astan Quds Razavi photo archive' },
    license: { id: 'public-domain' }
  }
})
