import { definePolity } from '../../schema'

export default definePolity({
  id: 'safavid-iran',
  names: [
    { text: 'Safavid Iran', lang: 'en', role: 'primary' },
    {
      text: 'Safavid Empire',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE SAFAVIDS, 1501-1722', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1501' },
        cites: [
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '1' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1722' },
        cites: [
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '1' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '7' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1736' },
        cites: [
          { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '1' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:isfahan',
      start: {
        alts: [
          {
            value: { d: '1590', notAfter: '1599' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '32' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '32' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 161205 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Originating from a mystical order at the turn of the 14th century, the Safavids ruled Persia from 1501 to 1722.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q2',
          text: 'The Safavids, who came to power in 1501, were leaders of a militant Sufi order.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q3',
          text: 'The rise of the Safavids marks the reemergence in Iran of a powerful central authority within geographical boundaries attained by former Iranian empires.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Although there was a recovery with the reign of Shah Abbas II (1642- 66), in general the Safavid Empire declined after the death of Shah Abbas.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q5',
          text: 'The decline resulted from weak rulers, interference by the women of the harem in politics, the reemergence of qizilbash rivalries, maladministration of state lands, excessive taxation, the decline of trade, and the weakening of Safavid military organization.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q6',
          text: 'The last decade of Solṭān Ḥosayn’s rule saw a spiraling welter of urban unrest, tribal revolt, and foreign aggression.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q7',
          text: 'Once again the eastern frontiers began to be breached, and in 1722 a small body of Afghan tribesmen won a series of easy victories before entering and taking the capital itself, ending Safavid rule.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Ašraf’s defeat marked the end of Afghan rule in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
          }
        },
        {
          id: 'q9',
          text: 'By the fall of the Safawid dynasty Persia lost her race of national monarchs, considered not only in respect of origin and birthplace but in essence and in spirit.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1089' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Naqsh-e_Jahan_Square_by_Pascal_Coste_1_Ver2.jpg/1280px-Naqsh-e_Jahan_Square_by_Pascal_Coste_1_Ver2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Naqsh-e_Jahan_Square_by_Pascal_Coste_1_Ver2.jpg',
    credit: { creator: 'Pascal Coste' },
    license: { id: 'public-domain' }
  }
})
