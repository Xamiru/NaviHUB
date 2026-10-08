import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'great-leap-forward-responsibility',
  about: ['event:great-leap-forward'],
  topic: 'responsibility',
  positions: [
    {
      id: 'errors-and-natural-calamities',
      category: 'official',
      holders: [
        { kind: 'party', name: 'Communist Party of China' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'More important, it was due to the fact that Comrade Mao Zedong and many leading comrades, both at the centre and in the localities, had become smug about their successes, were impatient for quick results and overestimated the role of man’s subjective will and efforts.',
          lang: 'en',
          cite: {
            source: 'cpc-1981-resolution-on-party-history',
            loc: { section: 'Ten Years of Initially Building Socialism in All Spheres' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.marxists.org/subject/china/documents/cpc/history/01.htm'
          }
        },
        {
          id: 'q2',
          text: 'It was mainly due to the errors of the Great Leap Forward and of the struggle against “Right opportunism” together with a succession of natural calamities and the perfidious scrapping of contracts by the Soviet Government that our economy encountered serious difficulties between 1959 and 1961, which caused serious losses to our country and people.',
          lang: 'en',
          cite: {
            source: 'cpc-1981-resolution-on-party-history',
            loc: { section: 'Ten Years of Initially Building Socialism in All Spheres' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.marxists.org/subject/china/documents/cpc/history/01.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'The ironically titled Great Leap Forward was supposed to be the spectacular culmination of Mao Zedong\'s program for transforming China into a Communist paradise.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-china-1950-to-the-present',
            loc: { section: 'Cultural Revolution (1966-1976)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://afe.easia.columbia.edu/tps/1950_cn.htm'
          }
        }
      ]
    },
    {
      id: 'mao-bore-the-chief-responsibility',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Federal Research Division, Library of Congress' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In April 1959 Mao, who bore the chief responsibility for the Great Leap Forward fiasco, stepped down from his position as chairman of the People\'s Republic.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/26.htm' }
        },
        {
          id: 'q4',
          text: 'In 1959, 1960, and 1961, however, adverse weather conditions, improperly constructed water control projects, and other misallocations of resources that had occurred during the overly centralized communization movement resulted in disastrous declines in agricultural output.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/88.htm' }
        }
      ]
    },
    {
      id: 'a-preventable-disaster',
      category: 'scholarly',
      holders: [
        { kind: 'media', name: 'Education About Asia' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Most tragically, this disaster was largely preventable.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-china-1950-to-the-present',
            loc: { section: 'Land Reform, Socialized Agriculture, The Great Leap Forward' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://afe.easia.columbia.edu/tps/1950_cn.htm'
          }
        },
        {
          id: 'q6',
          text: 'But the fanatical push to meet unrealistic goals led to widespread fraud and intimidation, culminating not in record-breaking output but the starvation of approximately one in twenty Chinese.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-china-1950-to-the-present',
            loc: { section: 'Land Reform, Socialized Agriculture, The Great Leap Forward' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://afe.easia.columbia.edu/tps/1950_cn.htm'
          }
        }
      ]
    },
    {
      id: 'worked-starved-beaten-to-death',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Frank Dikötter' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'And the key point is also that at the end of the Great Leap Forward, by 1962, tens of millions of people had been worked, starved, beaten to death, and it didn\'t really matter all that much.',
          lang: 'en',
          cite: {
            source: 'hoover-2025-goodfellows-dikotter-caveman-marxists',
            loc: { section: 'Caveman Marxists' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.hoover.org/research/caveman-marxists-frank-dikotter-whether-china-fiery-dragon-or-paper-tiger'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
