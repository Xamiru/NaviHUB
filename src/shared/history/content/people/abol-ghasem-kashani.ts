import { definePerson } from '../../schema'

export default definePerson({
  id: 'abol-ghasem-kashani',
  names: [
    { text: 'Abol-Ghasem Kashani', lang: 'en', role: 'primary' },
    { text: 'سید ابوالقاسم کاشانی', lang: 'fa', role: 'native' },
    { text: 'Sayyed Abu’l-Qāsem Kāšāni', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1877' },
        cites: [
          {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1962-03-12' },
        cites: [
          {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '1' }
          }
        ]
      },
      {
        value: { d: '1962-03-17' },
        cites: [
          {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '72' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:tehran',
    cites: [
      {
        source: 'iranica-rahnema-kashani',
        loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:tehran',
    cites: [
      {
        source: 'iranica-rahnema-kashani',
        loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '1' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['cleric', 'politician'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Abol-Ghasem_Kashani_visits_Mohammad_Taqi_Khansari%2C_a_hospital_in_Tehran_-_1951.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Abol-Ghasem_Kashani_visits_Mohammad_Taqi_Khansari,_a_hospital_in_Tehran_-_1951.jpg',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM (b. Tehran, 1877; d. Tehran, 12 March 1962; Figure 1), the leading political cleric during the critical period of 1941-53.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Following his primary and secondary education, Sayyed Abu’l-Qāsem left Tehran at the age of 15 or 16 and accompanied his father to Najaf, where he continued his religious studies.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        },
        {
          id: 'q3',
          text: 'Kāšāni’s staunch anti-British stance, maintained throughout his life, must be understood in the context of his experience of the British occupation of Basra in November 1914 and Karbalā and Najaf in late 1917.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Moṣaddeq’s premiership implied Kāšāni’s rise to power. The Ayatollah was in an exceptional position. He had immeasurable political power and extensive authority as Moṣaddeq’s unofficial political partner, yet he had no official responsibilities.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '49' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        },
        {
          id: 'q5',
          text: 'The fall of Qavām represents the apex of Kāšāni’s political cooperation with Moṣaddeq. Out of natural self-preservation and interest, Kāšāni stood by Moṣaddeq. The aftermath of this pinnacle of solidarity was a rapid fracture and demise.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '56' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        },
        {
          id: 'q6',
          text: 'The conspiracy of the “9th of Esfand” (27 February 1953) was the beginning of a decisive phase in Kāšāni’s political career. The Ayatollah decided to oppose, remove, and replace Moṣaddeq. At this point, Kāšāni was convinced that it was more important to neutralize Moṣaddeq’s “threat” than to keep his alliance in the face of dangers threatening the oil nationalization movement.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '61' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q7',
          text: 'Kāšāni, who had passionately supported Moṣaddeq’s fall, lost his original social base without managing to acquire a new one.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '70' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'Until his death on 17 March 1962, Kāšāni remained an affable, politically concerned, and restless political cleric.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '72' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        }
      ]
    }
  ]
})
