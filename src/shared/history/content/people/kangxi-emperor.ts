import { definePerson } from '../../schema'

export default definePerson({
  id: 'kangxi-emperor',
  names: [
    { text: 'Kangxi Emperor', lang: 'en', role: 'primary' },
    { text: '康熙帝', lang: 'zh', role: 'native' },
    {
      text: 'Kʽang-hi',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1654' },
        cites: [
          {
            source: 'loc-name-authority-kangxi-emperor-of-china',
            loc: { section: 'MARC field 046: birth date' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1722' },
        cites: [
          {
            source: 'loc-name-authority-kangxi-emperor-of-china',
            loc: { section: 'MARC field 046: death date' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress Name Authority File' }
        ]
      },
      {
        value: { d: '1721' },
        cites: [
          { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
        ],
        heldBy: [
          {
            kind: 'organization',
            name: 'Encyclopædia Britannica, 11th edition (article on China)'
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Emperor of China',
      polity: 'polity:qing-empire',
      start: {
        alts: [
          {
            value: { d: '1661' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
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
                source: 'loc-name-authority-kangxi-emperor-of-china',
                loc: { section: 'MARC field 046: death date' }
              }
            ]
          },
          {
            value: { d: '1721' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Portrait_of_the_Kangxi_Emperor_in_Court_Dress.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_the_Kangxi_Emperor_in_Court_Dress.jpg',
    credit: { creator: 'Anonymous Qing court painter' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Kʽang-hi was indefatigable in administering the affairs of the empire, and he devoted much of his time to literary and scientific studies under the guidance of the Jesuits.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        },
        {
          id: 'q2',
          text: 'Under his rule Tibet was added to the empire, which extended from the Siberian frontier to Cochin-China, and from the China Sea to Turkestan.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'He came into collision with the Russians, who had reached the Amur regions about 1640 and had built a fort on the upper Amur; but by the Treaty of Nerchinsk, concluded in 1689 (the first treaty made between China and a European power), the dispute was settled, the Amur being taken as the frontier.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        },
        {
          id: 'q4',
          text: 'The dictionary of the Chinese language, published under his superintendence, proves him to have been as great a scholar as his conquests over the Eleuths show him to have been famous as a general.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        },
        {
          id: 'q5',
          text: 'After China Proper had been subdued, the Manchus conquered Outer Mongolia (now the Mongolian People\'s Republic) in the late seventeenth century.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Rise of the Manchus', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/china/12.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'During one of his hunting expeditions to Mongolia he caught a fatal cold, and he died in 1721.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        }
      ]
    }
  ]
})
