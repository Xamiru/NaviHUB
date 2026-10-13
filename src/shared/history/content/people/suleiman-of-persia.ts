import { definePerson } from '../../schema'

export default definePerson({
  id: 'suleiman-of-persia',
  names: [
    { text: 'Suleiman of Persia', lang: 'en', role: 'primary' },
    { text: 'شاه سلیمان', lang: 'fa', role: 'native', translit: 'Šāh Solaymān' },
    {
      text: 'Solaymān I',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-matthee-solayman-i', loc: { section: 'SOLAYMĀN I', para: '1' } }
      ]
    },
    {
      text: 'Ṣafi II',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-matthee-solayman-i', loc: { section: 'SOLAYMĀN I', para: '3' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1648-02', notAfter: '1648-03' },
        cites: [
          { source: 'iranica-matthee-solayman-i', loc: { section: 'SOLAYMĀN I', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1694-07-29' },
        cites: [
          { source: 'iranica-matthee-solayman-i', loc: { section: 'SOLAYMĀN I', para: '1' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Shah of Iran',
      polity: 'polity:safavid-iran',
      start: {
        alts: [
          {
            value: { d: '1666-10-01' },
            cites: [
              {
                source: 'iranica-matthee-solayman-i',
                loc: { section: 'SOLAYMĀN I', para: '3' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1694-07-29' },
            cites: [
              {
                source: 'iranica-matthee-solayman-i',
                loc: { section: 'SOLAYMĀN I', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-matthee-solayman-i', loc: { section: 'SOLAYMĀN I', para: '3' } },
        { source: 'iranica-matthee-solayman-i', loc: { section: 'SOLAYMĀN I', para: '1' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Portrait_of_Shah_Suleyman%2C_1660-1680_%282nd_half_of_the_17th_century%29%2C_Isfahan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Shah_Suleyman,_1660-1680_(2nd_half_of_the_17th_century),_Isfahan.jpg',
    credit: { institution: 'Musée du Louvre' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Shah Solaymān was born in 1648 to a Circassian slave woman named Nekḥat or Nākeḥa Ḵānom, as the oldest son of Shah ʿAbbās II',
          lang: 'en',
          cite: { source: 'iranica-matthee-solayman-i', loc: { section: 'SOLAYMĀN I', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/solayman'
          }
        },
        {
          id: 'q2',
          text: 'Solaymān seems to have been more religiously minded than his immediate predecessors.',
          lang: 'en',
          cite: { source: 'iranica-matthee-solayman-i', loc: { section: 'SOLAYMĀN I', para: '17' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/solayman'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Until his enthronement, he grew up secluded in the royal harem, cared for by a black eunuch named Āḡā Nāẓer, and known for his arrogance',
          lang: 'en',
          cite: { source: 'iranica-matthee-solayman-i', loc: { section: 'SOLAYMĀN I', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/solayman'
          }
        },
        {
          id: 'q4',
          text: 'The nineteen-year-old Sām Mirzā was enthroned under the name Ṣafi II the following day, on 1 Rabiʿ II 1077/1 October 1666',
          lang: 'en',
          cite: { source: 'iranica-matthee-solayman-i', loc: { section: 'SOLAYMĀN I', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/solayman'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'In terms of military matters, Solaymān’s reign was uneventful, mostly because the shah was scrupulous in observing the Treaty of Qaṣr-e Širin.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '56' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q6',
          text: 'Myriad signs of economic retrenchment, most strikingly reflected in a fall in agricultural output, growing numbers of bankruptcies among indigenous merchants, and a deteriorating currency, became paplapable during Solaymān’s rule.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '57' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'A famous story has it that Solaymān, when asked who should succeed him, answered that if people wanted a forceful and capable ruler, they should choose his younger son, ʿAbbās Mirzā, but if they wished to have peace and quiet, they should go for the older Solṭān-Ḥosayn.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '59' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q8',
          text: 'His last words had apparently been “Give me some wine”',
          lang: 'en',
          cite: { source: 'iranica-matthee-solayman-i', loc: { section: 'SOLAYMĀN I', para: '28' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/solayman'
          }
        }
      ]
    }
  ]
})
