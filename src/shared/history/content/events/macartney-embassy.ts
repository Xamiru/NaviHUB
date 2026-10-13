import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'macartney-embassy',
  names: [
    { text: 'Macartney Embassy', lang: 'en', role: 'primary' },
    {
      text: 'Macartney mission',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1793' },
        cites: [
          { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
        ]
      }
    ]
  },
  regions: ['east-asia', 'europe'],
  prominence: 3,
  places: [
    {
      ref: 'place:beijing',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:qing-empire',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    },
    {
      ref: 'polity:kingdom-of-great-britain',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  sides: [
    {
      key: 'britain',
      name: 'Great Britain',
      polity: 'polity:kingdom-of-great-britain',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    },
    {
      key: 'qing',
      name: 'China',
      polity: 'polity:qing-empire',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  participants: [
    {
      name: 'George Macartney',
      role: 'diplomat',
      side: 'britain',
      cites: [
        {
          source: 'britannica-1911-macartney-george-macartney-earl',
          loc: { section: 'Macartney, George Macartney, Earl', para: '1' }
        }
      ]
    },
    {
      ref: 'person:qianlong-emperor',
      role: 'head-of-state',
      side: 'qing',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'To obtain some redress the British government at length sent an embassy to Peking (1793) and Lord Macartney was chosen to represent George III. on the occasion.',
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
          text: 'After being created Earl Macartney in the Irish peerage (1792), he was appointed the first envoy of Britain to China.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-macartney-george-macartney-earl',
            loc: { section: 'Macartney, George Macartney, Earl', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Macartney,_George_Macartney,_Earl'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'During the reign of Kʽien-lung commerce between Europe and Canton—the only Chinese port then open to foreign trade—had attained important dimensions.',
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The mission was treated as showing that Great Britain was a state tributary to China, and Lord Macartney was received with every courtesy.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        },
        {
          id: 'q6',
          text: 'But the concessions he sought were not accorded, and in this sense his mission was a failure.',
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
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/The_reception_of_the_diplomatique_%26_his_suite%2C_at_the_court_of_Pekin_%28BM_1868%2C0808.6228%29.jpg/1280px-The_reception_of_the_diplomatique_%26_his_suite%2C_at_the_court_of_Pekin_%28BM_1868%2C0808.6228%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_reception_of_the_diplomatique_%26_his_suite,_at_the_court_of_Pekin_(BM_1868,0808.6228).jpg',
    credit: { institution: 'British Museum', creator: 'James Gillray' },
    license: { id: 'public-domain' }
  }
})
