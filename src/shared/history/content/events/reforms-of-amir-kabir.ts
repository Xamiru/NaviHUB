import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'reforms-of-amir-kabir',
  names: [
    { text: 'Reforms of Amir Kabir', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'reform',
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
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '3' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' }
  ],
  participants: [
    {
      ref: 'person:amir-kabir',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '3' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
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
          text: 'With order reestablished in the provinces, Amīr Kabīr turned to a wide variety of administrative, cultural, and economic reforms that were the major achievement of his brief ministry.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q2',
          text: 'In his comprehensive concern for the strengthening of Iran, Amīr Kabīr displayed more interest in public works and the economy than all Iranian rulers put together had shown since the time of Shah ʿAbbās I.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '7' }
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
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Amīr Kabīr thereupon decided to reduce drastically the salaries of the civil service, often by half, and to eliminate a large number of stipends paid to pensioners who did little or no governmental work.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q4',
          text: 'Careful to avoid an increase in either British or Russian influence, he employed military instructors from Italy and Austria in continuation of the efforts of ʿAbbās Mīrzā for the formation of a well-equipped and disciplined standing army.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q5',
          text: 'Amīr Kabīr made a second indirect contribution to the elaboration of Persian as a modern medium with his foundation of the newspaper Rūz-nāma-ye waqāyeʿ-e ettefāqīya, which survived under different titles until the reign of Moẓaffar-al-dīn Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q6',
          text: 'Amīr Kabīr also sought to reduce clerical power by restricting the ability of the ʿolamāʾ to grant refuge (bast), in their residences and the mosques under their control, to criminals and others pursued by the state.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q7',
          text: 'He has been credited with originating the policy of “negative equilibrium,” i.e., refusing concessions to both of the rival powers pressing on Iran, Britain and Russia, and avoiding alignment with either of them.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q8',
          text: 'On issues such as the commercial privileges for British subjects and the protégé status, the slave trade in the Persian Gulf, the revolt in Khorasan and the dispute over Persia’s sovereignty in Herat, Amir Kabir resorted to a policy of brinkmanship that nearly always resulted in a successfully negotiated settlement (Ādamiyat, pp., 229-43, 508-45).',
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Among the various measures enacted by Amīr Kabīr, the foundation of the Dār al-Fonūn in Tehran was possibly the most lasting in its effects.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q10',
          text: 'The downfall and death of Amīr Kabīr are to be attributed primarily to the continuing intrigues of the same persons who had opposed him when he was first appointed chief minister: Āqā Khan Nūrī and the queen mother.',
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
          id: 'q11',
          text: 'The power he concentrated in his hands, however, aroused jealousy within the bureaucracy and fear in the king.',
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
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1849-03' },
            cites: [
              {
                source: 'iranica-algar-amir-kabir',
                loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The intrigues of his opponents resulted in a mutiny of a company of Azarbaijani troops garrisoned in Tehran, demanding his removal and execution (Rabīʿ II, 1265/March, 1849); but with the cooperation of Mīrzā Abu’l-Qāsem Emām-e Jomʿa of Tehran, who ordered the merchants of Tehran to close the bazaar and arm themselves, the mutiny was soon quelled, and Amīr Kabīr resumed his duties.',
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
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Portrait_of_Amir_Kabir_by_Sani_al-Molk%2C_Islamic_Art_Museum%2C_Tehran_%281%29_%2845334166754%29.jpg/1280px-Portrait_of_Amir_Kabir_by_Sani_al-Molk%2C_Islamic_Art_Museum%2C_Tehran_%281%29_%2845334166754%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Amir_Kabir_by_Sani_al-Molk,_Islamic_Art_Museum,_Tehran_(1)_(45334166754).jpg',
    credit: {
      institution: 'Islamic Art Museum, Tehran',
      creator: 'Mirza Abolhassan Khan Ghaffari (Sani al-Molk)'
    },
    license: { id: 'public-domain' }
  }
})
