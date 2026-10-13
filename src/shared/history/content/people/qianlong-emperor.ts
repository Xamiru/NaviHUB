import { definePerson } from '../../schema'

export default definePerson({
  id: 'qianlong-emperor',
  names: [
    { text: 'Qianlong Emperor', lang: 'en', role: 'primary' },
    { text: '乾隆帝', lang: 'zh', role: 'native' },
    { text: 'Qianlong', lang: 'zh-Latn', role: 'alternative' },
    {
      text: 'Kʽien-lung',
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
        value: { d: '1711-09-25' },
        cites: [
          {
            source: 'loc-name-authority-qianlong-emperor-of-china',
            loc: { section: 'MARC field 046: birth date' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1799-02-07' },
        cites: [
          {
            source: 'loc-name-authority-qianlong-emperor-of-china',
            loc: { section: 'MARC field 046: death date' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress Name Authority File' }
        ]
      },
      {
        value: { d: '1798' },
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
      title: 'emperor of the Qing dynasty',
      polity: 'polity:qing-empire',
      start: {
        alts: [
          {
            value: { d: '1735' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica, 11th edition (China: history of the dynasty)'
              }
            ]
          },
          {
            value: { d: '1736' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica, 11th edition (China: the imperial family)'
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1795' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/The_Qianlong_Emperor_in_Ceremonial_Armour_on_Horseback.jpg/1280px-The_Qianlong_Emperor_in_Ceremonial_Armour_on_Horseback.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Qianlong_Emperor_in_Ceremonial_Armour_on_Horseback.jpg',
    credit: { institution: 'Palace Museum, Beijing', creator: 'Giuseppe Castiglione' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Kʽien-lung wrote incessantly, both poetry and prose, collected libraries and republished works of value.',
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
          id: 'q2',
          text: 'He marched an army into Hi, which he converted into a Chinese province, and he afterwards added eastern Turkestan to the empire.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        },
        {
          id: 'q3',
          text: 'His generals marched 70,000 men into Nepal to within 60 miles of the British frontiers, and having subjugated the Gurkhas they received the submission of the Nepalese, and acquired an additional hold over Tibet (1792).',
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
          text: 'To obtain some redress the British government at length sent an embassy to Peking (1793) and Lord Macartney was chosen to represent George III. on the occasion.',
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
      kind: 'later-life',
      quotes: [
        {
          id: 'q5',
          text: 'In 1795, after a reign of sixty years, Kʽien-lung abdicated in favour of his fifteenth son, who adopted the title of Kia-kʽing as the style of his reign.',
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
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'Kʽien-lung died at the age of eighty-eight in 1798.',
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
