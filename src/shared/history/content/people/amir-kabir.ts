import { definePerson } from '../../schema'

export default definePerson({
  id: 'amir-kabir',
  names: [
    { text: 'Amir Kabir', lang: 'en', role: 'primary' },
    { text: 'امیرکبیر', lang: 'fa', role: 'native' },
    { text: 'Mirza Taqi Khan Farahani', lang: 'en', role: 'alternative' },
    {
      text: 'Amir-e Nezam',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1807' },
        cites: [
          {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1852-01-10' },
        cites: [
          {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Hamid Algar' }
        ]
      },
      {
        value: { d: '1851' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '4' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:kashan',
    cites: [
      {
        source: 'iranica-algar-amir-kabir',
        loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'chief minister (šaḵṣ-e awwal-e Īrān)',
      start: {
        alts: [
          {
            value: { d: '1848-10' },
            cites: [
              {
                source: 'iranica-algar-amir-kabir',
                loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '3' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1851-11-16' },
            cites: [
              {
                source: 'iranica-algar-amir-kabir',
                loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '3' }
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
          text: 'AMĪR(-E) KABĪR, MĪRZĀ TAQĪ KHAN (1222-68/1807-52), also known by the titles of Atābak and Amīr-e Neẓām; chief minister to Nāṣer-al-dīn Shah for the first four years of his reign and one of the most capable and innovative figures to appear in the whole Qajar period.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'He was born into a lowly household at Hazāva in the Farāhān district.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'More significant were the almost four years that he spent in Erzurum, participating in the work of a commission to delineate the Ottoman-Iranian frontier and settle certain other differences between the two states.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q4',
          text: 'Amīr Kabīr returned to Tabrīz in 1263/1847.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q5',
          text: 'After arriving in Tehran, he also appointed him chief minister (šaḵṣ-e awwal-e Īrān), with the supplementary titles of amīr-e kabīr and atābak (Ḏu’l-qaʿda, 1264/October, 1848).',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q6',
          text: 'Yet in office, Amir Kabir tilted towards an independent course of foreign policy, especially after the departure of his supporter, the British charge d’affaires Colonel Francis Farrant (Amanat, 1997, pp. 38-39, 105-114).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '13'
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
          id: 'q7',
          text: 'The fruitful career of Amīr Kabīr came to a sudden end on 20 Moḥarram 1268/16 November 1851, when Nāṣer-al-dīn Shah dismissed him from the position of chief minister.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q8',
          text: 'Soon after he was sent under armed escort to Kāšān, and after a period of forty days’ confinement was put to death in the bathhouse at Fīn, outside Kāšān, by the slashing of his wrists (17 Rabīʿ I 1268/10 January 1852).',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q9',
          text: 'He was dismissed and put to death in 1851, a fate shared by earlier powerful prime ministers.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Portrait_of_Amir_Kabir_by_Sani_al-Molk%2C_Islamic_Art_Museum%2C_Tehran_%281%29_%2845334166754%29.jpg/1280px-Portrait_of_Amir_Kabir_by_Sani_al-Molk%2C_Islamic_Art_Museum%2C_Tehran_%281%29_%2845334166754%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Amir_Kabir_by_Sani_al-Molk,_Islamic_Art_Museum,_Tehran_(1)_(45334166754).jpg',
    credit: {
      institution: 'Islamic Art Museum, Tehran',
      creator: 'Mirza Abolhassan Khan Ghaffari (Sani al-Molk)'
    },
    license: { id: 'public-domain' }
  }
})
