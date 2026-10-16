import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'reign-of-shahrukh-and-herat-as-capital',
  names: [
    { text: 'Shahrukh’s reign and Herat as the Timurid capital', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1409' },
        cites: [
          {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '1' }
          }
        ]
      },
      {
        value: { d: '1405' },
        cites: [
          {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1447' },
        cites: [
          {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '1' }
          },
          {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
          },
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '10' }
          }
        ]
      },
      {
        value: { d: '1446' },
        cites: [
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
        }
      ]
    },
    {
      ref: 'place:mashhad',
      cites: [
        {
          source: 'iranica-manz-gowhar-sad-aga',
          loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '2' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:shahrukh',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
        }
      ]
    },
    {
      ref: 'person:gawhar-shad',
      role: 'participant',
      cites: [
        {
          source: 'iranica-manz-gowhar-sad-aga',
          loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '2' }
        }
      ]
    },
    {
      ref: 'person:baysunghur',
      role: 'participant',
      cites: [
        {
          source: 'iranica-roemer-baysongor',
          loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '3' }
        }
      ]
    },
    {
      ref: 'person:ulugh-beg',
      role: 'participant',
      cites: [
        {
          source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:timurid-succession-war', rel: 'preceded-by' },
    { ref: 'event:death-of-shahrukh-and-the-timurid-crisis', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Under the Timurids, Herat assumed the role of the main capital of an empire that extended in the West as far as central Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        },
        {
          id: 'q3',
          text: 'He removed his capital from Samarkand to Herat, of which place he rebuilt the citadel, restoring and improving the town.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q11',
          text: 'The reign of Šāhroḵ in Herat was marked by intense royal patronage, building activities, and promotion of manufacturing and trade, especially through the restoration and enlargement of the Herat’s bāzār.',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
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
            value: { d: '1397' },
            cites: [
              {
                source: 'iranica-szuppe-herat-iii',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On the whole, the period was one of relative stability, prosperity, and development of economy and cultural activities. It began with the nomination of Šāhroḵ, the youngest son of Timur, as governor of Herat in 1397.',
        lang: 'en',
        cite: {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/herat-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1420' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The Timurid sultan Šāhroḵ was obliged to launch three campaigns (823-24/1420-21, 832/1429, and 838-39/1434-35) to check their expansion and reimpose his suzerainty.',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1427' },
            cites: [
              {
                source: 'iranica-szuppe-herat-iii',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In 1427, he escaped a spectacular assassination attempt in the Great Mosque',
        lang: 'en',
        cite: {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/herat-iii'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Musalla_Complex_and_Minarets_-_Herat%2C_Afghanistan_%284111447243%29.jpg/1280px-Musalla_Complex_and_Minarets_-_Herat%2C_Afghanistan_%284111447243%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Musalla_Complex_and_Minarets_-_Herat,_Afghanistan_(4111447243).jpg',
    credit: { creator: 'Marius Arnesen' },
    license: { id: 'cc-by-sa', version: '2.0', url: 'https://creativecommons.org/licenses/by-sa/2.0' }
  }
})
