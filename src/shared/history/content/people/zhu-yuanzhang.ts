import { definePerson } from '../../schema'

export default definePerson({
  id: 'zhu-yuanzhang',
  names: [
    { text: 'Zhu Yuanzhang', lang: 'en', role: 'primary' },
    {
      text: 'Hongwu',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'afe-columbia-china-timeline', loc: { section: 'Timelines: China' } }
      ]
    },
    {
      text: 'Hung-wu',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    },
    {
      text: 'Ming Taizu',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-name-authority-ming-taizu',
          loc: { section: 'MARC field 100 $d: heading dates' }
        }
      ]
    },
    {
      text: 'Zhu Chongba',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-name-authority-ming-taizu',
          loc: { section: 'MARC field 400: variant headings' }
        }
      ]
    },
    { text: '朱元璋', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1328' },
        cites: [
          {
            source: 'loc-name-authority-ming-taizu',
            loc: { section: 'MARC field 100 $d: heading dates' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1398' },
        cites: [
          {
            source: 'loc-name-authority-ming-taizu',
            loc: { section: 'MARC field 100 $d: heading dates' }
          },
          { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
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
            value: { d: '1368' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1398' },
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
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/A_Seated_Portrait_of_Ming_Emperor_Taizu.jpg/1280px-A_Seated_Portrait_of_Ming_Emperor_Taizu.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_Seated_Portrait_of_Ming_Emperor_Taizu.jpg',
    credit: { institution: 'National Palace Museum, Taipei' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The first Ming emperor, Hongwu, laid the basis of an authoritarian political culture.',
          lang: 'en',
          cite: { source: 'afe-columbia-china-timeline', loc: { section: 'Timelines: China' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/timelines/china_timeline.htm'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Revolts broke out, and finally this descendant of Jenghiz Khan was compelled to fly before Chu Yüen-chang, the son of a Chinese labouring man.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
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
          text: 'Chu Yüen-chang met with little opposition, more especially as his first care on becoming possessed of a district was to suppress lawlessness and to establish a settled government.',
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
