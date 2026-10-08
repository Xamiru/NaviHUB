import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'perry-expedition-motives',
  about: ['event:perry-expedition-to-japan'],
  topic: 'motives',
  researched: '2026-10-09',
  positions: [
    {
      id: 'peace-and-amity',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'state', name: 'Empire of Japan' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The United States of American and the empire of Japan, desiring to establish firm, lasting and sincere friendship between the two nations, have resolved to fix, in a manner clear and positive by means of a treaty or general convention of peace and amity, the rules which shall in future be mutually observed in the intercourse of their respective countries;',
          lang: 'en',
          cite: {
            source: 'avalon-treaty-of-kanagawa',
            loc: { section: 'Treaty of Kanagawa; March 31, 1854', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/japan002.asp'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'In the final years of the Tokugawa, foreign contacts increased as more concessions were granted. The new treaty with the United States in 1859 allowed more ports to be opened to diplomatic representatives, unsupervised trade at four additional ports, and foreign residences in Osaka and Edo. It also embodied the concept of extraterritoriality',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/japan/21.htm' }
        },
        {
          id: 'q11',
          text: 'Foreign intrusions helped to precipitate a complex political struggle between the bakufu and a coalition of its critics.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/japan/21.htm' }
        }
      ]
    },
    {
      id: 'trade-coal-and-shipwrecks',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Then, as American traders in the Pacific replaced sailing ships with steam ships, they needed to secure coaling stations, where they could stop to take on provisions and fuel while making the long trip from the United States to China.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-japan',
            loc: { section: 'The United States and the Opening to Japan, 1853', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/opening-to-japan'
          }
        },
        {
          id: 'q3',
          text: 'The combination of its advantageous geographic position and rumors that Japan held vast deposits of coal increased the appeal of establishing commercial and diplomatic contacts with the Japanese.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-japan',
            loc: { section: 'The United States and the Opening to Japan, 1853', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/opening-to-japan'
          }
        }
      ]
    },
    {
      id: 'manifest-destiny',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The same combination of economic considerations and belief in Manifest Destiny that motivated U.S. expansion across the North American continent also drove American merchants and missionaries to journey across the Pacific.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-japan',
            loc: { section: 'The United States and the Opening to Japan, 1853', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/opening-to-japan'
          }
        },
        {
          id: 'q5',
          text: 'At the time, many Americans believed that they had a special responsibility to modernize and civilize the Chinese and Japanese.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-japan',
            loc: { section: 'The United States and the Opening to Japan, 1853', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/opening-to-japan'
          }
        }
      ]
    },
    {
      id: 'display-of-force',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Perry arrived in Japanese waters with a small squadron of U.S. Navy ships, because he and others believed the only way to convince the Japanese to accept western trade was to display a willingness to use its advanced firepower.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-japan',
            loc: { section: 'The United States and the Opening to Japan, 1853', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/opening-to-japan'
          }
        }
      ]
    },
    {
      id: 'bound-by-ancestral-laws',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Tokugawa shogunate (the Japanese commissioners at Kanagawa)' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Moreover, his Majesty the new Emperor, at the succession to the throne, promised to the princes and high officers of the Empire to observe the laws. It is therefore evident that he cannot now bring about any alteration in the ancient laws.',
          lang: 'en',
          cite: {
            source: 'hawks-1856-narrative-of-the-expedition-vol-1',
            loc: {
              section: 'Translation of answer to the letter of the President to the Emperor of Japan',
              page: '350'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/narrativeofexped01perr/narrativeofexped01perr_djvu.txt'
          }
        },
        {
          id: 'q8',
          text: 'Having no precedent with respect to coal, we request your excellency to furnish us with an estimate, and upon due consideration this will be complied with, if not in opposition to our laws.',
          lang: 'en',
          cite: {
            source: 'hawks-1856-narrative-of-the-expedition-vol-1',
            loc: {
              section: 'Translation of answer to the letter of the President to the Emperor of Japan',
              page: '350'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/narrativeofexped01perr/narrativeofexped01perr_djvu.txt'
          }
        }
      ],
      reception: [
        {
          id: 'q10',
          text: 'The shogun\'s advisers pushed for a return to the martial spirit, more restrictions on foreign trade and contacts, suppression of Rangaku, censorship of literature, and elimination of "luxury" in the government and samurai class.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/japan/21.htm' }
        },
        {
          id: 'q12',
          text: 'Although the Japanese made some minor concessions and allowed some landings, they largely attempted to keep all foreigners out, sometimes using force.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/japan/21.htm' }
        }
      ]
    }
  ]
})
