import { definePerson } from '../../schema'

export default definePerson({
  id: 'deng-xiaoping',
  names: [
    { text: 'Deng Xiaoping', lang: 'en', role: 'primary' },
    { text: '邓小平', lang: 'zh', role: 'native', translit: 'Dèng Xiǎopíng' },
    {
      text: 'Teng Hsiao-p’ing',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '73' } }
      ]
    }
  ],
  researched: '2026-10-09',
  regions: ['east-asia'],
  roles: ['politician'],
  offices: [
    {
      title: 'vice premier of the State Council',
      polity: 'polity:peoples-republic-of-china',
      start: {
        alts: [
          {
            value: { d: '1973-04' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Cultural Revolution, 1966-76', para: '18' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Cultural Revolution, 1966-76', para: '18' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Deng_Xiaoping_and_Jimmy_Carter_at_the_arrival_ceremony_for_the_Vice_Premier_of_China._-_NARA_-_183157.tif/lossy-page1-1280px-Deng_Xiaoping_and_Jimmy_Carter_at_the_arrival_ceremony_for_the_Vice_Premier_of_China._-_NARA_-_183157.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Deng_Xiaoping_and_Jimmy_Carter_at_the_arrival_ceremony_for_the_Vice_Premier_of_China._-_NARA_-_183157.tif',
    credit: { institution: 'U.S. National Archives and Records Administration' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Deng Xiaoping (Teng Hsiao-p’ing), PRC Deputy Premier from 1952 until 1967; Vice Premier of State Council from 1973 until 1974; Vice Premier until 1983',
          lang: 'en',
          cite: { source: 'frus-1977-80-v13-persons', loc: { section: 'Persons', para: '73' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v13/persons'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Deng Xiaoping, who was reinstated as a vice premier in April 1973, ostensibly under the aegis of Premier Zhou Enlai but certainly with the concurrence of Mao Zedong.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '18' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
        },
        {
          id: 'q3',
          text: 'In April 1976 Deng was once more removed from all his public posts, and a relative political unknown, Hua Guofeng, a Political Bureau member, vice premier, and minister of public security, was named acting premier and party first vice chairman.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '21' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
        },
        {
          id: 'q4',
          text: 'By July 1977, at no small risk to undercutting Hua Guofeng\'s legitimacy as Mao\'s successor and seeming to contradict Mao\'s apparent will, the Central Committee exonerated Deng Xiaoping from responsibility for the Tiananmen Square incident. Deng admitted some shortcomings in the events of 1975, and finally, at a party Central Committee session, he resumed all the posts from which he had been removed in 1976.',
          lang: 'en',
          cite: { source: 'loc-china-country-study-1987', loc: { section: 'Post-Mao', para: '1' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/29.htm' }
        },
        {
          id: 'q5',
          text: 'The culmination of Deng Xiaoping\'s re-ascent to power and the start in earnest of political, economic, social, and cultural reforms were achieved at the Third Plenum of the Eleventh National Party Congress Central Committee in December 1978.',
          lang: 'en',
          cite: { source: 'loc-china-country-study-1987', loc: { section: 'Reform', para: '1' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'deng-1993-deng-xiaoping-wenxuan', perspective: 'chinese' }
  ],
  born: {
    alts: [
      {
        value: { d: '1904' },
        cites: [
          { source: 'lc-names-n81021998', loc: { section: 'Deng, Xiaoping, 1904-1997' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1997-02-19' },
        cites: [
          { source: 'lc-names-n81021998', loc: { section: 'Deng, Xiaoping, 1904-1997' } }
        ]
      }
    ]
  }
})
