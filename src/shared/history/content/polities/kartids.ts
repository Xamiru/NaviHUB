import { definePolity } from '../../schema'

export default definePolity({
  id: 'kartids',
  names: [
    { text: 'Kartids', lang: 'en', role: 'primary' },
    {
      text: 'Kart dynasty',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '1' } }
      ]
    },
    {
      text: 'Āl-e Kart',
      lang: 'fa',
      role: 'alternative',
      cites: [
        { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-16',
  polityType: 'sultanate',
  start: {
    alts: [
      {
        value: { d: '1245' },
        cites: [
          { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '1' } },
          { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '2' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1389' },
        cites: [
          { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '1' } },
          { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '9' } },
          {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 3,
  capitals: [
    {
      ref: 'place:herat',
      cites: [
        { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '1' } }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 1734616 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ĀL-E KART, or perhaps ĀL-E KORT, an east Iranian dynasty (643-791/1245-1389).',
          lang: 'en',
          cite: { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/al-e-kart'
          }
        },
        {
          id: 'q2',
          text: 'Their capital was at Herat, and their realm initially comprised Sabzavār (now Šendand), Ḡūr, Sīstān, Balḵ, and Kabol.',
          lang: 'en',
          cite: { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/al-e-kart'
          }
        },
        {
          id: 'q3',
          text: 'The Karts ruled first as Il-khanid governors, supporting them in several tight situations',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Around the year 643/1245, Šams-al-dīn made a successful sortie from Ḵayṣar and occupied Herat.',
          lang: 'en',
          cite: { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/al-e-kart'
          }
        },
        {
          id: 'q5',
          text: 'The later Kart period was that of independent rulers.',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        },
        {
          id: 'q6',
          text: 'The Il-khanid empire’s disintegration after 736/1335 enabled him to assert his independence.',
          lang: 'en',
          cite: { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/al-e-kart'
          }
        },
        {
          id: 'q7',
          text: 'It was not until 791/1389 that Tīmūr eliminated the last prince of the Kart dynasty.',
          lang: 'en',
          cite: { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/al-e-kart'
          }
        },
        {
          id: 'q8',
          text: 'The last ruler, Ḡiāṯ al-Din II Pir-ʿAli, was eliminated by Mirānšāh in 1389',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q9',
          text: 'The conduct of the Kart princes gave a period of internal autonomy to much of what is now Afghanistan and some eastern border districts of Iran and, generally speaking, strengthened that territory’s capacity for self subsistence.',
          lang: 'en',
          cite: { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/al-e-kart'
          }
        },
        {
          id: 'q10',
          text: 'Their long survival was not due to military exploits so much as to skillful diplomacy.',
          lang: 'en',
          cite: { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/al-e-kart'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Herat_Friday_Mosque%2C_Courtyard_view_of_sanctuary_iwan_to_the_northwest%2C_with_Kart_cauldron.jpg/1280px-Herat_Friday_Mosque%2C_Courtyard_view_of_sanctuary_iwan_to_the_northwest%2C_with_Kart_cauldron.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Herat_Friday_Mosque,_Courtyard_view_of_sanctuary_iwan_to_the_northwest,_with_Kart_cauldron.jpg',
    credit: { creator: 'Oskar Ritter von Niedermayer' },
    license: { id: 'public-domain' }
  }
})
