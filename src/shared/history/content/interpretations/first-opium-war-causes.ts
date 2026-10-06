import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'first-opium-war-causes',
  about: ['event:first-opium-war'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'poison-trade',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Qing government' },
        { kind: 'participant', name: 'Lin Zexu', ref: 'person:lin-zexu' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'But, during the commercial intercourse which has existed so long, among the numerous foreign merchants resorting hither, are wheat and tares, good and bad; and of these latter are some, who, by means of introducing opium by stealth, have seduced our Chinese people, and caused every province of the land to overflow with that poison.',
          lang: 'en',
          cite: {
            source: 'lin-zexu-1839-letter-to-queen-victoria',
            loc: { section: 'Commissioner Lin: Letter to Queen Victoria, 1839', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://sourcebooks.fordham.edu/mod/1839lin2.asp'
          }
        },
        {
          id: 'q2',
          text: 'We have heard that in your own country opium is prohibited with the utmost strictness and severity:---this is a strong proof that you know full well how hurtful it is to mankind.',
          lang: 'en',
          cite: {
            source: 'lin-zexu-1839-letter-to-queen-victoria',
            loc: { section: 'Commissioner Lin: Letter to Queen Victoria, 1839', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://sourcebooks.fordham.edu/mod/1839lin2.asp'
          }
        }
      ]
    },
    {
      id: 'trade-imbalance',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Beyond the health problems related to opium addiction, the increasing opium trade with the Western powers meant that for the first time, China imported more goods than it exported.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-china-1',
            loc: {
              section: 'The Opening to China Part I: the First Opium War, the United States, and the Treaty of Wangxia, 1839–1844',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/china-1'
          }
        },
        {
          id: 'q4',
          text: 'The Opium War and these treaties were emblematic of an era in which Western powers tried to gain unfettered access to Chinese products and markets for European and U.S. trade.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-china-1',
            loc: {
              section: 'The Opening to China Part I: the First Opium War, the United States, and the Treaty of Wangxia, 1839–1844',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/china-1'
          }
        }
      ]
    },
    {
      id: 'balance-of-trade-and-corruption',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'But China, still in its preindustrial stage, wanted little that the West had to offer, causing the Westerners, mostly British, to incur an unfavorable balance of trade.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/15.htm' }
        },
        {
          id: 'q6',
          text: 'The opium traffic was made possible through the connivance of profit-seeking merchants and a corrupt bureaucracy.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Opium War, 1839-42', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/15.htm' }
        }
      ]
    }
  ]
})
