import { definePolity } from '../../schema'

export default definePolity({
  id: 'empire-of-japan',
  names: [
    { text: 'Empire of Japan', lang: 'en', role: 'primary' },
    { text: '大日本帝國', lang: 'ja', role: 'native', translit: 'Dai Nippon Teikoku' },
    {
      text: 'Japan',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-japan', loc: { section: 'JAPAN', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1868' },
        cites: [
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1947-05-03' },
        cites: [
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:tokyo',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '3' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 188712 },
    { set: 'world', code: 740, to: 1947.34 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/%E5%BA%8A%E6%AC%A1%E6%AD%A3%E7%B2%BE_%E7%99%BA%E5%B8%83%E5%BC%8F%E4%B9%8B%E5%9B%B3.png/1280px-%E5%BA%8A%E6%AC%A1%E6%AD%A3%E7%B2%BE_%E7%99%BA%E5%B8%83%E5%BC%8F%E4%B9%8B%E5%9B%B3.png',
    page: 'https://commons.wikimedia.org/wiki/File:%E5%BA%8A%E6%AC%A1%E6%AD%A3%E7%B2%BE_%E7%99%BA%E5%B8%83%E5%BC%8F%E4%B9%8B%E5%9B%B3.png',
    credit: {
      institution: 'Imperial Household Agency, Miyauchi Archives',
      creator: 'Tokonami Masayoshi'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'JAPAN, an empire of eastern Asia, and one of the great powers of the world.',
          lang: 'en',
          cite: { source: 'britannica-1911-japan', loc: { section: 'JAPAN', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Japan'
          }
        },
        {
          id: 'q2',
          text: 'The emperor emerged as a national symbol of unity in the midst of reforms that were much more radical than had been envisioned.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/japan/22.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'To further dramatize the new order, the capital was relocated from Kyoto, where it had been situated since 794, to Tokyo (Eastern Capital), the new name for Edo.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/japan/22.htm' }
        },
        {
          id: 'q4',
          text: 'The new constitution specified a form of government that was still authoritarian in character, with the emperor holding the ultimate power and only minimal concessions made to popular rights and parliamentary mechanisms.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/japan/25.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'State Shinto was disestablished, and on January 1, 1946, Emperor Hirohito repudiated his divinity.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/japan/33.htm' }
        },
        {
          id: 'q6',
          text: 'MacArthur pushed the government to amend the 1889 Meiji Constitution, and on May 3, 1947, the new Japanese constitution (often called the "MacArthur Constitution") came into force',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/japan/33.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q7',
          text: 'Article I.—The Empire of Japan shall be reigned over and governed by a line of Emperors unbroken for ages eternal.',
          lang: 'en',
          cite: {
            source: 'constitution-of-japan-1889-official-translation',
            loc: { section: 'The Constitution of Japan' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/The_Constitution_of_Japan:_With_the_Laws_Appertaining_Thereto,_and_the_Imperial_Oath_and_Speech/Part_1'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'toyama-imai-fujiwara-1959-showashi', perspective: 'japanese' },
    { source: 'inoue-1968-nihon-teikokushugi-no-keisei', perspective: 'japanese' }
  ]
})
