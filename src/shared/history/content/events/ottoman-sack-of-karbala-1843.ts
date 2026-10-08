import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ottoman-sack-of-karbala-1843',
  names: [
    { text: 'Ottoman sack of Karbala (1843)', lang: 'en', role: 'primary' },
    { text: 'کشتار کربلا به دست نجیب پاشا', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1843' },
        cites: [
          { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } }
        ]
      }
    ]
  },
  regions: ['mena', 'iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:karbala',
      cites: [
        { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:edict-of-gulhane',
      rel: 'related',
      cites: [
        { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } }
      ]
    },
    { ref: 'event:wahhabi-sack-of-karbala', rel: 'related' }
  ],
  polities: [
    { ref: 'polity:ottoman-empire' }
  ],
  participants: [
    {
      name: 'Najib Pāšā',
      role: 'commander',
      cites: [
        { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } }
      ]
    },
    {
      name: 'Sayyed Kāẓem Rašti',
      role: 'negotiator',
      cites: [
        { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } }
      ]
    },
    {
      name: 'Ebrāhim Qazvini',
      role: 'participant',
      cites: [
        { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 5000, qualifier: 'about' },
            cites: [
              { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1843, the new Ottoman governor, Najib Pāšā, was determined to subdue Karbala as part of the centralizing reform (ṭanẓimāt) policy.',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        },
        {
          id: 'q2',
          text: 'When the gangs refused to accept an Ottoman garrison, Najib Pāšā took the city by force after a harsh siege, killing about 5,000 people and desecrating the shrines.',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'With weakening Mamluk rule during the second decade of the 19th century, local notables, primarily the naqib-al-ašrāf (head of the descendants of the Prophet), and the functionaries of the Shrines held the real power in Karbala, allied with and assisted by urban brigands.',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '18' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        },
        {
          id: 'q4',
          text: 'Dāʾud Pāšā subdued Ḥella but was forced to accept a compromise mediated by the ulama, under which Karbala paid a lower tax but retained its semi-independent status until 1843.',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '18' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        },
        {
          id: 'q5',
          text: 'In 1842 there were 14 gangs in Karbala, amounting to 2,000-2,500 men, which extracted protection money from residents and pilgrims.',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '18' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The senior ulama did not participate in rebellion.',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        },
        {
          id: 'q7',
          text: 'While Sayyed Kāẓem Rašti sought to mediate between the gangs and the Ottomans, the leading Oṣuli mojtahed, Ebrāhim Qazvini (d. 1262/1846), left town to join the Ottoman side.',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'Iran protested against the massacre but refrained from taking action',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Karbala was made the center of an administrative unit (sanjaq) with a permanent gendarmerie garrison.',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        },
        {
          id: 'q10',
          text: 'New laws forced Iranian subjects to accept Ottoman nationality if they wished to hold real-estate property.',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        },
        {
          id: 'q11',
          text: 'The siege and massacre led many Iranian students and teachers to prefer Najaf, which emerged as the dominant center of learning and religious leadership in the Shiʿite world.',
          lang: 'en',
          cite: { source: 'iranica-litvak-karbala', loc: { section: 'KARBALA', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/karbala/'
          }
        }
      ]
    }
  ]
})
