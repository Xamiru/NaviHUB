import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'mao-gang-of-four-and-1981-verdict',
  about: ['event:death-of-mao-zedong'],
  topic: 'responsibility',
  positions: [
    {
      id: 'ccp-1981-resolution',
      category: 'official',
      holders: [
        { kind: 'party', name: 'Chinese Communist Party' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'As soon as Comrade Mao Zedong passed away in September 1976, the counterrevolutionary Jiang Qing clique stepped up its plot to seize supreme Party and state leadership. Early in October of the same year, the Political Bureau of the Central Committee, executing the will of the Party and the people, resolutely smashed the clique and brought the catastrophic “cultural revolution” to an end.',
          lang: 'en',
          cite: {
            source: 'cpc-1981-resolution-on-party-history',
            loc: { section: 'The Decade of the “Cultural Revolution"' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.marxists.org/subject/china/documents/cpc/history/01.htm'
          }
        },
        {
          id: 'q2',
          text: 'Chief responsibility for the grave “Left” error of the “cultural revolution", an error comprehensive in magnitude and protracted in duration, does indeed lie with Comrade Mao Zedong. But after all it was the error of a great proletarian revolutionary.',
          lang: 'en',
          cite: {
            source: 'cpc-1981-resolution-on-party-history',
            loc: { section: 'The Decade of the “Cultural Revolution"' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.marxists.org/subject/china/documents/cpc/history/01.htm'
          }
        },
        {
          id: 'q3',
          text: 'The victory won in overthrowing the counterrevolutionary Jiang Qing clique in October 1976 saved the Party and the revolution from disaster and enabled our country to enter a new historical period of development.',
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
          id: 'q6',
          text: 'Although Mao was not specifically blamed, there was no doubt about his share of responsibility.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        },
        {
          id: 'q7',
          text: 'Thus the new party hierarchy sought to assess, and thus close the books on, the Maoist era and move on to the era of the Four Modernizations.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        }
      ]
    },
    {
      id: 'loc-trial-assessment',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Beyond the trial of ten political pariahs, it appeared that the intimate involvement of Mao Zedong, current party chairman Hua Guofeng, and the CCP itself were on trial. The prosecution wisely separated political errors from actual crimes.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        },
        {
          id: 'q5',
          text: 'The net effect of the trial was a further erosion of Mao\'s prestige and the system he created.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Four Modernizations, 1979-82', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/30.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
