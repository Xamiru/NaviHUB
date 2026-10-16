import { definePerson } from '../../schema'

export default definePerson({
  id: 'isabella-i-of-castile',
  names: [
    { text: 'Isabella I of Castile', lang: 'en', role: 'primary' },
    {
      text: 'Isabella the Catholic',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-isabella-of-castile',
          loc: { section: 'Isabella of Castile', para: '1' }
        }
      ]
    },
    {
      text: 'Isabel',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-1492-christopher-columbus',
          loc: { section: 'Christopher Columbus: Man and Myth', para: '2' }
        }
      ]
    },
    { text: 'Isabel I de Castilla', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1451-04-22' },
        cites: [
          {
            source: 'britannica-1911-isabella-of-castile',
            loc: { section: 'Isabella of Castile', para: '1' }
          },
          {
            source: 'loc-name-authority-isabella-i-queen-of-spain',
            loc: { section: 'MARC field 046: birth and death dates' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1504-11-26' },
        cites: [
          {
            source: 'loc-name-authority-isabella-i-queen-of-spain',
            loc: { section: 'MARC field 046: birth and death dates' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Queen of Castile',
      start: {
        alts: [
          {
            value: { d: '1474-12-13' },
            cites: [
              {
                source: 'britannica-1911-isabella-of-castile',
                loc: { section: 'Isabella of Castile', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1504' },
            cites: [
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'THE GOLDEN AGE', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-isabella-of-castile',
          loc: { section: 'Isabella of Castile', para: '1' }
        },
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '2' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Spanish_School%2C_15th_century_-_Queen_Isabella_I_of_Spain%2C_Queen_of_Castille_%281451-1504%29_-_RCIN_403445_-_Royal_Collection.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Spanish_School,_15th_century_-_Queen_Isabella_I_of_Spain,_Queen_of_Castille_(1451-1504)_-_RCIN_403445_-_Royal_Collection.jpg',
    credit: { institution: 'Royal Collection Trust' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Unification of the Christian kingdoms of Aragon, Navarre, and Castile began in 1469 when Princess Isabel of Castile married Prince Fernando of Aragon.',
          lang: 'en',
          cite: {
            source: 'loc-1492-mediterranean-world',
            loc: { section: 'The Mediterranean World', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/mediterr.html'
          }
        },
        {
          id: 'q2',
          text: 'ISABELLA (1451–1504), surnamed la Catolica, “the Catholic,” queen of Castile, was the second child and only daughter of John II. of Castile by his second wife Isabella, granddaughter of John I. of Portugal (thus being through both parents a descendant of John of Gaunt), and was born at Madrigal on the 22nd of April 1451.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-isabella-of-castile',
            loc: { section: 'Isabella of Castile', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Isabella_of_Castile'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'In her thirteenth year her brother promised her in marriage to Alphonso of Portugal, but she firmly refused to consent; her resistance seemed less likely to be effectual in the case of Pedro Giron, grand master of the order of Calatrava and brother of the marquis of Villena, to whom she was next affianced, when she was delivered from her fears by the sudden death of the bridegroom while on his way to the nuptials in 1466.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-isabella-of-castile',
            loc: { section: 'Isabella of Castile', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Isabella_of_Castile'
          }
        },
        {
          id: 'q4',
          text: 'After an offer of the crown of Castile, made by the revolutionary leaders in the civil war, had been declined by her, she was in 1468 formally recognized by her brother as lawful heir, after himself, to the united crowns of Castile and Leon.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-isabella-of-castile',
            loc: { section: 'Isabella of Castile', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Isabella_of_Castile'
          }
        },
        {
          id: 'q5',
          text: 'Finally however, in face of very great difficulties, she was married to Ferdinand of Aragon at Valladolid on the 19th of October 1469.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-isabella-of-castile',
            loc: { section: 'Isabella of Castile', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Isabella_of_Castile'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q6',
          text: 'For some time they held a humble court at Dueñas, and afterwards they resided at Segovia, where, on the death of Henry, she was proclaimed queen of Castile and Leon (December 13, 1474).',
          lang: 'en',
          cite: {
            source: 'britannica-1911-isabella-of-castile',
            loc: { section: 'Isabella of Castile', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Isabella_of_Castile'
          }
        },
        {
          id: 'q7',
          text: 'But the most characteristic part of their ecclesiastical policy was the establishment of the Spanish Inquisition',
          lang: 'en',
          cite: { source: 'britannica-1911-spain', loc: { section: 'SPAIN', para: '669' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spain'
          }
        },
        {
          id: 'q8',
          text: 'But not even the briefest sketch of her life can omit to notice that happy instinct or intuition which led her, when all others had heard with incredulity the scheme of Columbus, to recall the wanderer to her presence with the words, “I will assume the undertaking for my own crown of Castile, and am ready to pawn my jewels to defray the expenses of it, if the funds in the treasury should be found inadequate.”',
          lang: 'en',
          cite: {
            source: 'britannica-1911-isabella-of-castile',
            loc: { section: 'Isabella of Castile', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Isabella_of_Castile'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q9',
          text: 'Even with the personal union of the Castilian and the Aragonese crowns, Castile, Aragon, Catalonia, and Valencia remained constitutionally distinct political entities, and they retained separate councils of state and parliaments.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        },
        {
          id: 'q10',
          text: 'Both Isabella and Ferdinand understood the importance of unity; together they effected institutional reform in Castile and left Spain one of the best administered countries in Europe.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        }
      ]
    }
  ]
})
