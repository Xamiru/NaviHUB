import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'declaration-of-bahaullah',
  names: [
    { text: 'Declaration of Baháʼu\'lláh', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'religious',
  start: {
    alts: [
      {
        value: { d: '1863-04' },
        cites: [
          { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '13' } }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 1,
  places: [
    {
      ref: 'place:baghdad',
      cites: [
        { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '13' } },
        {
          source: 'iranica-cole-bahaism-i',
          loc: { section: 'BAHAISM i. The Faith', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:babi-movement' }
  ],
  related: [
    {
      ref: 'event:babi-bahai-schism',
      rel: 'led-to',
      cites: [
        { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '14' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:bahaullah',
      role: 'leader',
      cites: [
        { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '13' } }
      ]
    },
    {
      ref: 'person:mirza-hosayn-khan-moshir-al-dowla',
      role: 'diplomat',
      cites: [
        { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '13' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In late April, 1863, Bahāʾ-Allāh declared himself, to a handful of close followers, the promised one foretold by the Bāb.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'From 1856 to 1863 Bahāʾ-Allāh lived in Baghdad, building up an increasingly loyal following in Iran through his elegant mystical aphorisms and crisp doctrinal treatises in Persian or Arabic such as the Kalemāt-e maknūna (Hidden words), Haft wādī (Seven valleys), and Ketāb-e īqān (Book of certitude).',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q4',
          text: 'He took very seriously a widely believed Muslim prophecy that the Mahdī or Jesus Christ would appear in 1280/1863-64, and put off making any public announcement until then, though evidence abounds that he kept a “messianic secret” for years before',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Perhaps because the year 1280 had not yet begun, he delayed any written declaration for almost a year.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'Although the Bahais date the inception of their religion from Bahāʾ-Allāh’s 1863 private declaration in Baghdad, the Bahai community only gradually came into being in the late 1860s, and most Babis did not become Bahais in earnest until after 1867, though many may have been partisans of Bahāʾ-Allāh earlier',
          lang: 'en',
          cite: {
            source: 'iranica-cole-bahaism-i',
            loc: { section: 'BAHAISM i. The Faith', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bahaism-index/bahaism-i'
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
            value: { d: '1863' },
            cites: [
              {
                source: 'iranica-cole-baha-allah',
                loc: { section: 'BAHĀʾ-ALLĀH', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The Ottomans complied, calling Bahāʾ-Allāh to Istanbul in the spring of 1863.',
        lang: 'en',
        cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '13' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/baha-allah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1863-04' },
            cites: [
              {
                source: 'iranica-cole-baha-allah',
                loc: { section: 'BAHĀʾ-ALLĀH', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Before he left Baghdad, Bahāʾ-Allāh camped for twelve days at the Garden of Necip Paşa, where a large number of friends came to bid him farewell. During these days, to intimates, “he would speak of the Bāb’s Cause and declare his own”',
        lang: 'en',
        cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '13' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/baha-allah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1864' },
            cites: [
              {
                source: 'iranica-cole-baha-allah',
                loc: { section: 'BAHĀʾ-ALLĀH', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In the winter and spring of 1864/1280, Bahāʾ-Allāh gradually began announcing himself to friends in Iran.',
        lang: 'en',
        cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '14' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/baha-allah'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Unloading_boats_at_river_in_Baghdad_LOC_matpc.13209.jpg/1280px-Unloading_boats_at_river_in_Baghdad_LOC_matpc.13209.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Unloading_boats_at_river_in_Baghdad_LOC_matpc.13209.jpg',
    credit: { institution: 'Library of Congress, Matson Collection' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    {
      source: 'vahman-2010-yeksad-o-shast-sal-mobarezeh-ba-diyanat-e-bahai',
      perspective: 'iranian'
    }
  ]
})
