import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'salar-revolt',
  names: [
    { text: 'Salar revolt', lang: 'en', role: 'primary' },
    {
      text: 'revolt in Khorasan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '23' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1846' },
        cites: [
          {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Hamid Algar' }
        ]
      },
      {
        value: { d: '1847' },
        cites: [
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '23' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Jean Calmard' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1850' },
        cites: [
          {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
          },
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '23' }
          },
          {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '14' }
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
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      name: 'Moḥammad-Ḥasan Khan Sālār',
      role: 'leader',
      cites: [
        {
          source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
          loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '13' }
        },
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '23' }
        }
      ]
    },
    {
      name: 'Allāh-Yār Khan Āṣaf-al-Dawla',
      role: 'participant',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '23' }
        }
      ]
    },
    {
      name: 'Ḥamza Mīrzā Hešmat-al-dawla',
      role: 'participant',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
        }
      ]
    },
    {
      name: 'Solṭān Morād Mīrzā',
      role: 'commander',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
        }
      ]
    },
    {
      ref: 'person:amir-kabir',
      role: 'leader',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
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
          text: 'In the last years of Moḥammad Shah’s reign, Moḥammad-Ḥasan Khan Sālār (d. 1850), the son of Allāh-Yār Āṣaf-al-Dawla, started a revolt in Khorasan, along with a group of khans in the region, against the central government (Bāmdād, I, p. 158; Noelle-Karimi, pp. 228-30) that continued until the early years of the reign of Nāṣer-al-Din Shah (r. 1848-96).',
          lang: 'en',
          cite: {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '13' }
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
      kind: 'causes',
      quotes: [
        {
          id: 'q2',
          text: 'Recalled from Khorasan, Āṣaf-al-Dawla was exiled to the ʿAtabāt.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q3',
          text: 'This triggered a revolt in Khorasan in 1847, led by his son Mo ḥammad-Ḥasan Khan Sālār.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Toward the end of the reign of Moḥammad Shah, Ḥamza Mīrzā Hešmat-al-dawla had been appointed governor of Khorasan, but he found his authority disputed by Ḥasan Khan Sālār, who, with the help of some local chieftains, had rebelled against the central government (1262/1846).',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q5',
          text: 'Ḥamza Mīrzā abandoned Mašhad to Ḥasan Khan and fled to Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q6',
          text: 'Amīr Kabīr sent two armies against Ḥasan Khan, the second of which, commanded by Solṭān Morād Mīrzā, defeated his forces and captured him.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q7',
          text: 'He first sent Solṭān Morād Mirzā Ḥosām-al-Salṭana to suppress the revolt of Sālār, who surrendered and was executed in 1850, and then he addressed the problem of regaining control of Herat with a plan of his own (Motavalli Ḥaqiqi, 2004, pp. 235-44; Noelle-Karimi, pp. 231-32).',
          lang: 'en',
          cite: {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '14' }
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
          id: 'q8',
          text: 'Amīr Kabīr had him executed (1266/1850), together with one of his sons and one of his brothers, a punishment of unprecedented severity for such provincial resistance to central authority, and a clear sign of Amīr Kabīr’s intention to assert the prerogatives of the state (ibid., pp. 232-41).',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q9',
          text: 'This secessionist insurrection was bloodily repressed by Amir Kabir in 1850 (Amanat, 1997, pp. 50 ff., 114 ff.; Ādamiyat, pp. 233 ff.).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    }
  ]
})
