import { definePerson } from '../../schema'

export default definePerson({
  id: 'zheng-he',
  names: [
    { text: 'Zheng He', lang: 'en', role: 'primary' },
    {
      text: 'Ma He',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '5' }
        }
      ]
    },
    {
      text: 'San Bao',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '25' }
        }
      ]
    },
    {
      text: 'Ma Sanbao',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-name-authority-zheng-he',
          loc: { section: 'MARC field 400: variant headings' }
        }
      ]
    },
    { text: '郑和', lang: 'zh', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1371' },
        cites: [
          {
            source: 'loc-name-authority-zheng-he',
            loc: { section: 'MARC field 046: birth and death dates' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1435' },
        cites: [
          {
            source: 'loc-name-authority-zheng-he',
            loc: { section: 'MARC field 046: birth and death dates' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress name authority file' }
        ]
      },
      {
        value: { d: '1433' },
        cites: [
          {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '20' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Asia for Educators, Columbia University' }
        ]
      }
    ]
  },
  regions: ['east-asia', 'southeast-asia'],
  roles: ['military', 'diplomat'],
  offices: [
    {
      title: 'Commander of the Ming treasure voyages',
      polity: 'polity:ming-dynasty',
      start: {
        alts: [
          {
            value: { d: '1405' },
            cites: [
              {
                source: 'afe-columbia-ming-voyages',
                loc: { section: 'The Ming Voyages', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1433' },
            cites: [
              {
                source: 'afe-columbia-ming-voyages',
                loc: { section: 'The Ming Voyages', para: '20' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '1' }
        },
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '20' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Expo_2010_Indonesia_Pavilion_32_%28Statue_of_Chinese_Admiral_Zheng_He%29.jpg/1280px-Expo_2010_Indonesia_Pavilion_32_%28Statue_of_Chinese_Admiral_Zheng_He%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Expo_2010_Indonesia_Pavilion_32_(Statue_of_Chinese_Admiral_Zheng_He).jpg',
    credit: { creator: 'Gary Lee Todd' },
    license: { id: 'cc0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Zheng He was born Ma He to a Muslim family in the far southwest, in today\'s Yunnan province.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '5' }
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
          id: 'q2',
          text: 'At ten years old he was captured by soldiers sent there by the first Ming emperor intent on subduing the south.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q3',
          text: 'He received both literary and military training, then made his way up the military ladder with ease, making important allies at court in the process.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '5' }
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
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'When the emperor needed a trustworthy ambassador familiar with Islam and the ways of the south to head his splendid armada to the "Western Oceans," he naturally picked the talented court eunuch, Ma He, whom he renamed Zheng.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q5',
          text: 'For this special purpose, he chose one of his most trusted generals, a man he had known since he was young, Zheng He.',
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
          id: 'q6',
          text: 'The main chronicler of the voyages, the twenty-five year old Muslim translator Ma Huan, joined Zheng He on this trip.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q7',
          text: 'It was on the return trip in 1433 that Zheng He died and was buried at sea, although his official grave still stands in Nanjing, China.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '20' }
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
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'Nearly forgotten in China until recently, he was immortalized among Chinese communities abroad, particularly in Southeast Asia where to this day he is celebrated and revered as a god.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        }
      ]
    }
  ]
})
