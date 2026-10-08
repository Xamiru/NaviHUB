import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'goharshad-mosque-uprising',
  names: [
    { text: 'Goharshad Mosque rebellion', lang: 'en', role: 'primary' },
    { text: 'قیام مسجد گوهرشاد', lang: 'fa', role: 'native' },
    {
      text: 'Gowhar-šād uprising',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
          loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '37' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1935-07-12' },
        cites: [
          {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '37' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1935-07-13' },
        cites: [
          {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '37' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:mashhad',
      cites: [
        {
          source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
          loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '37' }
        },
        {
          source: 'iranica-saidi-sirjani-clothing-pahlavi',
          loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '6' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-reza-shah' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      name: 'Moḥammad-Taqi Gonābādi (Bohlul)',
      role: 'leader',
      cites: [
        {
          source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
          loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '37' }
        },
        {
          source: 'iranica-saidi-sirjani-clothing-pahlavi',
          loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '6' }
        }
      ]
    },
    {
      name: 'Sayyed Ḥosayn Ṭabāṭabāʾi Qomi',
      role: 'participant',
      cites: [
        {
          source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
          loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '37' }
        }
      ]
    },
    {
      name: 'Fatḥ-Allāh Pākravān',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
          loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '37' }
        },
        {
          source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
          loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '38' }
        }
      ]
    },
    {
      name: 'Moḥammad-Wali Asadi',
      role: 'participant',
      cites: [
        {
          source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
          loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '38' }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1935' }
        }
      ]
    },
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-saidi-sirjani-clothing-pahlavi',
          loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '6' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:kashf-e-hijab',
      rel: 'related',
      cites: [
        {
          source: 'iranica-saidi-sirjani-clothing-pahlavi',
          loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '8' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The government orders the adoption of Western-style uniform dress (lebās-e mottaḥed al-šekl) and Western hat (chapeau), forbidding all individuals from wearing the ʿabā (sleeveless cloak) and the turban without prior approval by the authorities.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1935' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q2',
          text: 'On 16 Tīr 1314 Š/8 July 1935 a cabinet decree made wearing of this hat obligatory for all men, thus replacing the Pahlavi cap.',
          lang: 'en',
          cite: {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/clothing-xi/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'One of the most important events in the modern history of Khorasan, the Gowhar-šād uprising, also regarded as the most significant anti-government movement in the early Pahlavi era, occurred during the governorship of Fatḥ-Allāh Pākravān (1934-41). In the absence of Ayatollah Sayyed Ḥosayn Ṭabāṭabāʾi Qomi, who had traveled to Tehran to protest the shah’s new policy requiring men to use the chapeau (western-style hats, see CLOTHING xi; KOLĀH-E PAHLAVI) as headgear and was confined there, groups of Mashhad residents and other Khorasanis assembled at the Gowhar-šād Mosque under the influence of speeches by a firebrand religious student, Moḥammad-Taqi Gonābādi, known as Bohlul, and denounced Reżā Shah’s secularizing policies. Government forces attacked, killed, and wounded a number of the protesters at the Gowhar-šād Mosque over two days, on the mornings of 20 and 21 Tir 1314/12 and 13 July 1935',
          lang: 'en',
          cite: {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '37' }
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
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'Asadi’s disagreement and rivalry with Pākravān, the governor-general of Khorasan, then led Pākravān to take advantage of Asadi’s opposition to the chapeau policy as a means of discrediting him in the eyes of the shah and putting the blame on him for the uprising at the Gowhar-šād Mosque. This resulted in Asadi’s dismissal, trial, and execution in 1935',
          lang: 'en',
          cite: {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khorasan-xi-history-in-the-qajar-and-pahlavi-periods'
          }
        },
        {
          id: 'q5',
          text: 'Such resistance only increased the shah’s resolve',
          lang: 'en',
          cite: {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/clothing-xi/'
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
  },
  furtherReading: [
    { source: 'makki-1983-tarikh-e-bist-saleh-ye-iran', perspective: 'iranian' }
  ]
})
