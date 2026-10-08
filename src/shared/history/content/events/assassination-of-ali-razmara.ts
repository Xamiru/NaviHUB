import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-ali-razmara',
  names: [
    { text: 'Assassination of Ali Razmara', lang: 'en', role: 'primary' },
    { text: 'ترور حاجعلی رزم‌آرا', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1951-03-07' },
        cites: [
          {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '8' }
          },
          {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '43' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  participants: [
    {
      ref: 'person:ali-razmara',
      role: 'victim',
      cites: [
        {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '8' }
        }
      ]
    },
    {
      name: 'Khalil Tahmasebi',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '8' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '2' }
        }
      ]
    },
    {
      ref: 'person:abol-ghasem-kashani',
      role: 'participant',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '43' }
        },
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '44' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:nationalization-of-the-iranian-oil-industry',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '44' }
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
          text: 'The Fedāʾīān’s most daring assassination occurred on 7 March 1951 when Prime Minister Ḥājj ʿAlī Razmārā was gunned down by Ḵalīl Ṭahmāsbī at the Šāh Mosque.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
          }
        },
        {
          id: 'q2',
          text: 'Razmara advised against nationalization on technical grounds and was assassinated in March 1951 by Khalil Tahmasebi, a member of the militant Fadayan-e Islam.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/17.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Razmārā had been involved in intense negotiations with the British for a new oil agreement. But the proposed agreement was opposed by major segments of society, including the newly formed National Front under the leadership of Moṣaddeq, which was supported by Ayatollah Kāšānī.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
          }
        },
        {
          id: 'q4',
          text: 'Throughout Razmārā’s ten-month premiership, Kāšāni and his allies escalated their criticism of him and his administration. The Kāšāni-Moṣaddeq axis confronted Razmārā on three simultaneous fronts: the parliament, the press, and the streets.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        },
        {
          id: 'q5',
          text: 'In parliament and on the streets, however, the anti-Razmārā and pro-nationalization current prompted by the Kāšāni-Moṣaddeq axis rapidly gained momentum. In rallies ranging from a few thousand to about 60,000 participants, at which various organizations associated with Kāšāni were present, Razmārā was denounced as a traitor and a foreign puppet, as Hažir was before him.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '41' }
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
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Sometime in early January of that year, Navvāb Ṣafavi and Kāšāni met at Ḥājj Abu’l-Qāsem Rafiʿi’s house to discuss Razmārā’s fate. Kāšāni is reported to have presented Navvāb Ṣafavi with a list of seven politicians, at the top of which was Razmārā’s name, who should be assassinated to pave the way for religious and national progress (ʿArāqi, pp. 76-77).',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '43' }
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
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'After the assassination of Razmārā, Kāšāni sent word to the Fedāʾiān-e Eslām: “you have severed Britain’s artery; I do not think it is necessary to kill anyone else” (Nabard-e mellat as Navā-ye mellat, 23 January 1951). Kāšāni publicly announced that the murder of the prime minister was in the interest of Iran and Ṭahmāsbi’s bullet was the best and most useful blow against colonialism and the enemies of Iran (Šāhed, 18 March 1951).',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '44' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        },
        {
          id: 'q8',
          text: 'After spending a relatively short time in jail, the assassin was greeted upon his release as a hero by Ayatollah Kāšānī and others (Amīnī, pp. 135-37).',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
          }
        },
        {
          id: 'q9',
          text: 'On 19 January 1956 the alienated and saddened Kāšāni was once again humiliated. In connection with Razmārā’s old assassination case, the 79-year-old Ayatollah was again arrested by those whom he had helped bring to power',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '71' }
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Razmārā’s assassination placed the Fedāʾīān at the center of the oil nationalization issue with all its profound pathos and deeply felt sentiments. Through this daring act, the organization had become a direct participant and an important force in a critical national issue.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Iran_Over_Volcano_-_Razmara%2C_the_Prime_Minister.png/1280px-Iran_Over_Volcano_-_Razmara%2C_the_Prime_Minister.png',
    page: 'https://commons.wikimedia.org/wiki/File:Iran_Over_Volcano_-_Razmara,_the_Prime_Minister.png',
    credit: { institution: 'Akhbar al-Yawm' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'makki-1983-ketab-e-siyah', perspective: 'iranian' },
    { source: 'rouhani-1973-tarikh-e-melli-shodan-e-sanat-e-naft', perspective: 'iranian' }
  ]
})
