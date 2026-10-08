import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'china-post-mao-turning-point',
  about: ['event:reform-and-opening-up'],
  topic: 'significance',
  positions: [
    {
      id: 'ccp-third-plenum',
      category: 'official',
      holders: [
        { kind: 'party', name: 'Chinese Communist Party' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The Third Plenary Session of the Eleventh Central Committee in December 1978 marked a crucial turning point of far-reaching significance in the history of our Party since the birth of the People’s Republic. It put an end to the situation in which the Party had been advancing haltingly in its work since October 1976 and began to correct conscientiously and comprehensively the “Left” errors of the “cultural revolution” and earlier.',
          lang: 'en',
          cite: {
            source: 'cpc-1981-resolution-on-party-history',
            loc: { section: 'Great Turning Point in History' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.marxists.org/subject/china/documents/cpc/history/01.htm'
          }
        },
        {
          id: 'q2',
          text: 'It firmly discarded the slogan “Take class struggle as the key link,” which had become unsuitable in a socialist society, and made the strategic decision to shift the focus of work to socialist modernization.',
          lang: 'en',
          cite: {
            source: 'cpc-1981-resolution-on-party-history',
            loc: { section: 'Great Turning Point in History' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.marxists.org/subject/china/documents/cpc/history/01.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'The plenum also marked official acceptance of a new ideological line that called for "seeking truth from facts" and of other elements of Deng Xiaoping\'s thinking.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        }
      ]
    },
    {
      id: 'loc-resolution-on-mao',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'A major part of the document condemned the ten-year Cultural Revolution and assessed Mao Zedong\'s role in it. "Chief responsibility for the grave `Left\' error of the `cultural revolution,\' an error comprehensive in magnitude and protracted in duration, does indeed lie with Comrade Mao Zedong . . . . [and] far from making a correct analysis of many problems, he confused right and wrong and the people with the enemy. . . . Herein lies his tragedy." At the same time, Mao was praised for seeking to correct personal and party shortcomings throughout his life, for leading the effort that brought the demise of Lin Biao, and for having criticized Jiang Qing and her cohort.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        },
        {
          id: 'q4',
          text: 'Several days after the closing of the plenum, on the occasion of the sixtieth anniversary of the founding of the CCP, new party chairman Hu Yaobang declared that "although Comrade Mao Zedong made grave mistakes in his later years, it is clear that if we consider his life work, his contributions to the Chinese revolution far outweigh his errors. . . .',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
