import { definePolity } from '../../schema'

export default definePolity({
  id: 'khanate-of-khiva',
  names: [
    { text: 'Khanate of Khiva', lang: 'en', role: 'primary' },
    {
      text: 'Khorezm',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '4' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'khanate',
  start: {
    alts: [
      {
        value: { d: '1510', approx: true },
        cites: [
          {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'The Uzbek Period', para: '1' }
          },
          { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '12' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1920-04' },
        cites: [
          { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '25' } }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 3,
  capitals: [
    {
      ref: 'place:khiva',
      cites: [
        { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '3' } }
      ]
    }
  ],
  partOf: [
    {
      ref: 'polity:russian-empire',
      start: {
        alts: [
          {
            value: { d: '1873-08-24', julian: true },
            cites: [
              { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '19' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1917-03-12', julian: true },
            cites: [
              { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '23' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '19' } }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 491106 },
    { set: 'world', code: 7030, to: 1920.08 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Isfandiyar_Jurji_Bahadur.png/1280px-Isfandiyar_Jurji_Bahadur.png',
    page: 'https://commons.wikimedia.org/wiki/File:Isfandiyar_Jurji_Bahadur.png',
    credit: { institution: 'Library of Congress', creator: 'Sergei Prokudin-Gorskii' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Of the two Uzbek states that were established in Central Asia after the Shibanid conquest in the early 16th century, the khanates of Bukhara and Khiva, that of Khiva was much smaller.',
          lang: 'en',
          cite: { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '12' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.iranicaonline.org/articles/khiva' }
        },
        {
          id: 'q2',
          text: 'The most recurrent designation for the country and its ruling state was always “Khorezm” (velāyat-e Ḵᵛārazm). In Russian and Western scholarly literature, however, the expression “Khanate of Khiva” gained currency, most probably under the influence of Tsarist chancellery practices.',
          lang: 'en',
          cite: { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '4' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.iranicaonline.org/articles/khiva' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Eltüzer Ināq was proclaimed khan, with the support of Uzbek tribal nobility, in 1219/1804.',
          lang: 'en',
          cite: { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '5' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.iranicaonline.org/articles/khiva' }
        },
        {
          id: 'q4',
          text: 'On 12 August 1873, Kaufman signed a peace treaty with the khan called the Treaty of Gandemian, in which the Qonghrat ruler declared himself an “obedient servant” of the Russian emperor; the territory of the khanate on the right bank of the Āmu Daryā was annexed to Russia, and the khanate had to pay a large war indemnity.',
          lang: 'en',
          cite: { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '19' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.iranicaonline.org/articles/khiva' }
        },
        {
          id: 'q5',
          text: 'The main feature of the Russian Empire’s relationship with this protectorate was a fundamental ambivalence.',
          lang: 'en',
          cite: { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '21' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.iranicaonline.org/articles/khiva' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'ʿAbd-Allāh Khan was forced to abdicate in favor of a revolutionary committee, composed of two Young Khivans, two Turkmen chiefs, and one cleric.',
          lang: 'en',
          cite: { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '25' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.iranicaonline.org/articles/khiva' }
        },
        {
          id: 'q7',
          text: 'The elections were held under Tashkent supervision, and at the end of April the first All-Khorezmian congress of soviets met, abolished the khanate, and proclaimed an independent Khorezmian People’s Soviet Republic, adopted a constitution and sent a delegation to Moscow to conclude treaties of alliance and assistance.',
          lang: 'en',
          cite: { source: 'iranica-sartori-bregel-khiva', loc: { section: 'KHIVA', para: '25' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.iranicaonline.org/articles/khiva' }
        }
      ]
    }
  ]
})
