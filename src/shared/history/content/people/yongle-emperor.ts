import { definePerson } from '../../schema'

export default definePerson({
  id: 'yongle-emperor',
  names: [
    { text: 'Yongle Emperor', lang: 'en', role: 'primary' },
    {
      text: 'Zhu Di',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '3' }
        }
      ]
    },
    {
      text: 'Yung-lo',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    },
    {
      text: 'Ming Chengzu',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-name-authority-ming-chengzu',
          loc: { section: 'MARC field 100 $d: heading dates' }
        }
      ]
    },
    { text: '朱棣', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1360' },
        cites: [
          {
            source: 'loc-name-authority-ming-chengzu',
            loc: { section: 'MARC field 100 $d: heading dates' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1424' },
        cites: [
          {
            source: 'loc-name-authority-ming-chengzu',
            loc: { section: 'MARC field 100 $d: heading dates' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress name authority file' }
        ]
      },
      {
        value: { d: '1425' },
        cites: [
          { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Emperor of the Ming dynasty',
      polity: 'polity:ming-dynasty',
      start: {
        alts: [
          {
            value: { d: '1403' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1425' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
        { source: 'britannica-1911-peking', loc: { section: 'Peking', para: '1' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Portrait_assis_de_l%27empereur_Ming_Chengzu.jpg/1280px-Portrait_assis_de_l%27empereur_Ming_Chengzu.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_assis_de_l%27empereur_Ming_Chengzu.jpg',
    credit: { institution: 'National Palace Museum, Taipei' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The third emperor of the Ming Dynasty, Zhu Di or the Yongle Emperor, was particularly aggressive and personally led major campaigns against Mongolian tribes to the north and west.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q2',
          text: 'Because the Yongle emperor realized that the major threats to China in this period were from the north, particularly the Mongols, he saved many of those military excursions for himself.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Zhu Di is Ming Taizu’s eldest surviving son, at the time of Ming Taizu’s death, but he is not the son of his primary wife; he is the son of a Mongolian consort of the emperor.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages-teaching-guide',
            loc: { section: 'Teaching Guide' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://video.afe.easia.columbia.edu/teaching-guides/the-ming-maritime-expedititons-zheng-he-teaching-guide'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Zhu Di is the governor of the area around Beijing (the northern capital) in the north; he attacks the court at Nanjing (the southern capital) and usurps the throne from his nephew',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages-teaching-guide',
            loc: { section: 'Teaching Guide' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://video.afe.easia.columbia.edu/teaching-guides/the-ming-maritime-expedititons-zheng-he-teaching-guide'
          }
        },
        {
          id: 'q5',
          text: 'At home Yung-lo devoted himself to the encouragement of literature and the fine arts, and, possibly from a knowledge that Kien-wên was among the Buddhist priests, he renewed the law prohibiting Buddhism.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        },
        {
          id: 'q6',
          text: 'He died in 1425, and was succeeded by his son Hung-hi.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        }
      ]
    }
  ]
})
