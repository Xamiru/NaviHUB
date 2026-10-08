import { definePolity } from '../../schema'

export default definePolity({
  id: 'qing-empire',
  names: [
    { text: 'Qing Empire', lang: 'en', role: 'primary' },
    { text: '大清', lang: 'zh', role: 'native', translit: 'Da Qing' },
    {
      text: 'Chinese Empire',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1644' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1912-02-12' },
        cites: [
          { source: 'state-dept-countries-china', loc: { section: 'China', para: '18' } }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Chinese Regain Power', para: '3' }
        },
        { source: 'cshapes-2-dataset', loc: { section: 'China (code 710), capital Beijing' } }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 8733 },
    { set: 'world', code: 710, to: 1912.12 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Chinese_Empire_and_Japan_LOC_2006635011.jpg/1280px-Chinese_Empire_and_Japan_LOC_2006635011.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Chinese_Empire_and_Japan_LOC_2006635011.jpg',
    credit: { institution: 'Library of Congress', creator: 'George Philip & Son' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'CHINA, a country of eastern Asia, the principal division of the Chinese empire. In addition to China proper the Chinese Empire includes Manchuria, Mongolia, Tibet and Sin-kiang (East Turkestan, Kulja, Dzungaria, &c., i.e. all the Chinese dependencies lying between Mongolia on the north and Tibet on the south).',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        },
        {
          id: 'q2',
          text: 'In 1644 the Manchus took Beijing from the north and became masters of north China, establishing the last imperial dynasty, the Qing (1644- 1911).',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/11.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Realizing that to dominate the empire they would have to do things the Chinese way, the Manchus retained many institutions of Ming and earlier Chinese derivation.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Rise of the Manchus', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/12.htm' }
        },
        {
          id: 'q4',
          text: 'The Neo-Confucian philosophy, emphasizing the obedience of subject to ruler, was enforced as the state creed.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Rise of the Manchus', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/12.htm' }
        },
        {
          id: 'q5',
          text: 'In many government positions a system of dual appointments was used--the Chinese appointee was required to do the substantive work and the Manchu to ensure Han loyalty to Qing rule.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Rise of the Manchus', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/12.htm' }
        },
        {
          id: 'q6',
          text: 'By late November, fifteen of the twenty-four provinces had declared their independence of the Qing empire.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Republican Revolution of 1911', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/19.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'Diplomatic relations were interrupted on February 12, 1912, when, as a result of the Chinese Revolution, the Manchu Emperor abdicated his throne in favor of a provisional republican government.',
          lang: 'en',
          cite: { source: 'state-dept-countries-china', loc: { section: 'China', para: '18' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://history.state.gov/countries/china' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'dai-1980-jianming-qingshi', perspective: 'chinese' },
    { source: 'fan-1955-zhongguo-jindaishi', perspective: 'chinese' },
    { source: 'masui-1974-shin-teikoku', perspective: 'japanese' }
  ]
})
