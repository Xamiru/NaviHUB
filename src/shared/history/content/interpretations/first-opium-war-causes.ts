import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'first-opium-war-causes',
  about: ['event:first-opium-war'],
  topic: 'causes',
  researched: '2026-10-09',
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
      ],
      reception: [
        {
          id: 'q10',
          text: 'Unlike Great Britain, the United States agreed that anyone involved in the opium trade or the smuggling of contraband would be prosecuted under Chinese law',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-china-1',
            loc: {
              section: 'The Opening to China Part I: the First Opium War, the United States, and the Treaty of Wangxia, 1839–1844',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1830-1860/china-1'
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
    },
    {
      id: 'protection-of-british-subjects',
      category: 'official',
      holders: [
        { kind: 'state', name: 'British government' },
        { kind: 'participant', name: 'Thomas Babington Macaulay' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'It would not have been worthy of us to take arms upon a small provocation, referring to rites and ceremonies merely; but every one in the scale of civilized nations should know that Englishmen were ever living under the protecting eye of their own country.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1840-04-07-war-with-china',
            loc: { section: 'HC Deb 07 April 1840 vol 53 cc669-748', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1840/apr/07/war-with-china'
          }
        }
      ],
      reception: [
        {
          id: 'q11',
          text: 'Settling this financial problem eventually led to the First Opium War between Great Britain and China, from 1839 to 1842.',
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
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1830-1860/china-1'
          }
        }
      ]
    },
    {
      id: 'unjust-war-for-opium',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'William Ewart Gladstone',
          ref: 'person:william-gladstone'
        }
      ],
      statements: [
        {
          id: 'q8',
          text: 'They gave you notice to abandon your contraband trade. When they found that you would not, they had a right to drive you from their coasts on account of your obstinacy in persisting in this infamous and atrocious traffic.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1840-04-08-war-with-china-adjourned-debate',
            loc: { section: 'HC Deb 08 April 1840 vol 53 cc749-837', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1840/apr/08/war-with-china-adjourned-debate'
          }
        },
        {
          id: 'q9',
          text: 'I am not competent to judge how long this war may last, or how protracted may be its operations, but this I can say, that a war more unjust in its origin, a war more calculated in its progress to cover this country with permanent disgrace, I do not know, and I have not read of.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1840-04-08-war-with-china-adjourned-debate',
            loc: { section: 'HC Deb 08 April 1840 vol 53 cc749-837', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1840/apr/08/war-with-china-adjourned-debate'
          }
        }
      ]
    }
  ]
})
