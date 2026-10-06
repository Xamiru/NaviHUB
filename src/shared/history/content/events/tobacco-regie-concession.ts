import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'tobacco-regie-concession',
  names: [
    { text: 'Tobacco Régie concession', lang: 'en', role: 'primary' },
    { text: 'امتیاز رژی', lang: 'fa', role: 'native' },
    {
      text: 'Tobacco Régie',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '6' }
        }
      ]
    },
    {
      text: 'Imperial Tobacco Corporation of Persia',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1890' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1890-03-08' },
        cites: [
          { source: 'browne-1910-persian-revolution', loc: { page: '19' } },
          { source: 'browne-1910-persian-revolution', loc: { page: '31' } },
          {
            source: 'iranica-gilbar-qajar-big-merchants',
            loc: {
              section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
              para: '21'
            }
          },
          {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '6' }
          },
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1890' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '5' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Edward Granville Browne' },
          { kind: 'scholar', name: 'Gad G. Gilbar' },
          { kind: 'scholar', name: 'Jean Calmard' },
          { kind: 'scholar', name: 'Ehsan Yarshater' },
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      },
      {
        value: { d: '1889' },
        cites: [
          {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '34'
            }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Abbas Amanat' }
        ]
      },
      {
        value: { d: '1872' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ehsan Yarshater' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1892-01-05' },
        cites: [
          { source: 'browne-1910-persian-revolution', loc: { page: '51' } },
          {
            source: 'iranica-gilbar-qajar-big-merchants',
            loc: {
              section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
              para: '21'
            }
          },
          {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '7' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Edward Granville Browne' },
          { kind: 'scholar', name: 'Gad G. Gilbar' },
          { kind: 'scholar', name: 'Jean Calmard' }
        ]
      },
      {
        value: { d: '1891-12' },
        cites: [
          {
            source: 'iranica-farmayan-amin-al-dawla',
            loc: { section: 'AMĪN-AL-DAWLA, MĪRZĀ ʿALĪ KHAN', para: '3' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Hafez Farmayan' }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 2,
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-gilbar-qajar-big-merchants',
          loc: {
            section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
            para: '21'
          }
        }
      ]
    },
    {
      name: 'Gerald F. Talbot',
      role: 'participant',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1890' }
        },
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '6' }
        }
      ]
    },
    {
      ref: 'person:amin-al-soltan',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '6' }
        }
      ]
    },
    {
      name: 'Sir Henry Drummond Wolff',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '34'
          }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:tobacco-protest',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '6' }
        }
      ]
    },
    { ref: 'event:reuter-concession', rel: 'related' },
    { ref: 'event:imperial-bank-of-persia', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'During the latter half of the 1880s, the British and Russian governments, together with private European companies, intensified pressure on Tehran to open the Iranian economy to foreign investment. These efforts did not yield very much until October 1888 when Nāṣer-al-Din Shah succumbed to British pressure and permitted “commercial steamers of all nations” to navigate the Kārun river (Gilbar, 2008, p. 608; Kazemzadeh, p.195; Amanat, pp. 420-21; see KARUN iii). At that point, the door to granting concessions to foreign investors opened wide.',
          lang: 'en',
          cite: {
            source: 'iranica-gilbar-qajar-big-merchants',
            loc: {
              section: 'QAJAR DYNASTY viii. “Big Merchants” in the Late Qajar Period',
              para: '21'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qajar-big-merchants'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: '1890 The granting of a tobacco concession by Nāṣer al-Din Shah to a British citizen, Major Gerald F. Talbot, to buy, sell, and manufacture tobacco throughout Persia for 50 years; formation of the Imperial Tobacco Corporation of Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1890' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q3',
          text: 'The most important of these concessions was the granting of a fifty year monopoly of the production, sale, and export of Iran’s entire tobacco crop to Major G. F. Talbot (March, 1890). Generally known as the “Tobacco Régie,” this concession—obtained through Wolff’s policy and Amīn-al-solṭān’s support—resulted in the first successful uprising against Qajar rule.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        },
        {
          id: 'q4',
          text: 'Despite the success of the Imperial Bank, the granting of the Imperial Tobacco Regie to Major Talbot in 1889 during the shah’s third European tour (later ratified in 1890) proved to be a major fiasco leading to a near revolution and the government’s public disgrace.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '34'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'At the outset it was Wolff who pushed for the granting of Tobacco concession while the shah was in England.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '34'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q6',
          text: 'Later the representatives of the Regie in Tehran bribed not only the shah and his premier but a number of influential princes and officials including Ẓell-al-Solṭān and his brother, Kāmrān Mirzā Nāʾeb-al-Salṭana.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '34'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q7',
          text: 'The Tobacco Concession was granted on March 8, 1890, and registered at the British Legation on May 9 of the same year.',
          lang: 'en',
          cite: { source: 'browne-1910-persian-revolution', loc: { page: '19' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'However, they also remained adamant on the Persian payment of a huge 500,000 Pounds Sterling cancellation penalty claimed by the Regie to be financed in 1892 through a loan from the Imperial Bank of Persia. As collateral the Bank secured the revenue from the customs of the Persian Gulf ports, the first of such revenues to be held as security for payment of foreign loans in the forthcoming decades.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '34'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q9',
          text: 'This first foreign debt rendered Iran more dependent on great powers.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        }
      ]
    }
  ]
})
