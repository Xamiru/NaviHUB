import { definePerson } from '../../schema'

export default definePerson({
  id: 'amin-al-soltan',
  names: [
    { text: 'Amin al-Soltan', lang: 'en', role: 'primary' },
    { text: 'میرزا علی‌اصغرخان امین‌السلطان', lang: 'fa', role: 'native' },
    {
      text: 'Mīrzā ʿAlī-Aṣḡar Khan Amīn-al-solṭān',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '1' }
        }
      ]
    },
    {
      text: 'Atābak-e Aʿẓam',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1858-01-06' },
        cites: [
          {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1907-08-31' },
        cites: [
          {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '30' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:tehran',
    cites: [
      {
        source: 'iranica-calmard-atabak-e-azam',
        loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '2' }
      }
    ]
  },
  diedIn: {
    ref: 'place:tehran',
    cites: [
      {
        source: 'iranica-calmard-atabak-e-azam',
        loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '30' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'de facto grand vizier',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1883-09' },
            cites: [
              {
                source: 'iranica-calmard-atabak-e-azam',
                loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '3' }
        }
      ]
    },
    {
      title: 'ṣadr-e aʿẓam',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1893-01-25' },
            cites: [
              {
                source: 'iranica-calmard-atabak-e-azam',
                loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-calmard-atabak-e-azam',
          loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '4' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ATĀBAK-E AʿẒAM, MĪRZĀ ʿALĪ-AṢḠAR KHAN AMĪN-AL-SOLṬĀN, grand vizier under the last three Qajar kings.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Mīrzā ʿAlī-Aṣgār Khan Amīn-al-solṭān, the second son of Āqā Moḥammad-Ebrāhīm Amīn-al-solṭān and known as Āqā ʿAlī-Aṣḡar before his rise to power, was born in Tehran on 20 Jomādā 1274/6 January 1858.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        },
        {
          id: 'q3',
          text: 'Upon his father’s death (1300/1883), he inherited his laqab Amīn-al-solṭān and most of his functions',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Upon Āqā Ebrāhīm’s death, ʿAlī Khan Amīn al-dawla and Moḥammad-Ḥasan Eʿtemād-al-salṭana expected to succeed him, but, to their disappointment, the shah’s choice fell on Mīrzā ʿAlī-Aṣḡar Khan, who was then barely twenty-five',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        },
        {
          id: 'q5',
          text: 'From the outset of Amīn-al solṭān’s tenure three factions, headed by Amīn-al solṭān, Prince Masʿūd Mīrzā Ẓell-al-solṭān, and Prince Kāmrān Mīrzā Nāyeb-al-salṭana, were competing for power.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        },
        {
          id: 'q6',
          text: 'He accompanied him on his third European trip (1306/1889) with the title of wazīr-e aʿẓam and full governmental powers',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        },
        {
          id: 'q7',
          text: 'Amīn-al-solṭān’s tenure coincides with the apex of Russo-British rivalry in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        },
        {
          id: 'q8',
          text: 'At the earlier stages of his premiership, beginning in 1886, he cultivated an Anglophile reputation, no doubt as a counterbalance to Yaḥyā Khan Mošir-al-Dawla’s Russophile reputation. He especially drew favor with the British by persuading the shah to open up the long resisted navigation on the river Kārun and the more important concession for the establishment of the Imperial Bank of Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '28'
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
      kind: 'death',
      quotes: [
        {
          id: 'q9',
          text: 'About two hours after sunset, as the Atābak and Behbahānī were leaving the Bahārestan, a beggar retained Behbahānī some steps behind Atābak, who proceeded alone towards his carriage. Suddenly saw and tobacco dust and ashes were thrown into the air and pistol shots were heard. The Atābak was hit by several bullets and died shortly afterwards.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Portrait_of_Mirza_%27Ali_Asghar_Khan_%28Amin_al-Mulk%2C_Amin_al-Sultan%2C_Atabeg-i_Azam%29.jpg/1280px-Portrait_of_Mirza_%27Ali_Asghar_Khan_%28Amin_al-Mulk%2C_Amin_al-Sultan%2C_Atabeg-i_Azam%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Mirza_%27Ali_Asghar_Khan_(Amin_al-Mulk,_Amin_al-Sultan,_Atabeg-i_Azam).jpg',
    credit: { institution: 'Metropolitan Museum of Art', creator: 'Isma\'il Jalayir' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'sheikholeslami-1988-qatl-e-atabak', perspective: 'iranian' },
    { source: 'bamdad-1968-sharh-e-hal-e-rejal-e-iran', perspective: 'iranian' }
  ]
})
