import { definePolity } from '../../schema'

export default definePolity({
  id: 'khanate-of-bukhara',
  names: [
    { text: 'Khanate of Bukhara', lang: 'en', role: 'primary' },
    {
      text: 'Abu’l-Khayrids',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  polityType: 'khanate',
  start: {
    alts: [
      {
        value: { d: '1500' },
        cites: [
          {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Yuri Bregel', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 3,
  capitals: [
    {
      ref: 'place:bukhara',
      start: {
        alts: [
          {
            value: { d: '1583' },
            cites: [
              {
                source: 'iranica-bregel-abul-khayrids',
                loc: { section: 'ABU’L-KHAYRIDS', para: '6' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '6' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 577668 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Abu’l-Khayrid empire emerged as a result of the Özbek conquests of the Timurid territories in Central Asia.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        },
        {
          id: 'q2',
          text: 'After the death of his father in 991/1583, ʿAbd-Allāh became khan (r. 991-1006/1583-98), and from that time on Bukhara became the capital of the newly emerging empire, which can rightly be called the Khanate of Bukhara.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'By the time of Šïbāni Khan’s death in the battle with the Persians at Merv in 916/1510, the territories that he had conquered included Transoxania, Farḡāna, Khwarazm, and a part of Khorasan.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        },
        {
          id: 'q4',
          text: 'There was no permanent capital: the sultan who would be elected as a khan would remain in the capital of his appanage which was his powerbase.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        },
        {
          id: 'q5',
          text: 'The Khorasan campaign began with the conquest of Herat in 996/1588.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The Abu’l-Khayrid dynasty in Bukhara was extinguished and replaced by a new dynasty of the Ashtarkhanids, or Janids, in 1007/1599.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        },
        {
          id: 'q7',
          text: 'The conquests of Šïbāni Khan and the establishment of the Abu’l-Khayrid dynasty (as well as its Arabshahid rivals in Khwarazm) brought about important ethnic, political, and cultural changes in the life of Central Asia.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Abdullah_Khan_Uzbek_II_slicing_melons.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Abdullah_Khan_Uzbek_II_slicing_melons.jpg',
    credit: { institution: 'British Museum' },
    license: { id: 'public-domain' }
  }
})
