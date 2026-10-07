import { defineEvent } from '../../schema'

export default defineEvent({
  id: '1959-tibetan-uprising',
  names: [
    { text: '1959 Tibetan uprising', lang: 'en', role: 'primary' },
    {
      text: 'armed rebellion',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'state', name: 'People’s Republic of China' }
      ],
      cites: [
        {
          source: 'prc-white-paper-2009-fifty-years-of-democratic-reform-in-tibet',
          loc: { section: 'Fifty Years of Democratic Reform in Tibet' }
        }
      ]
    },
    {
      text: 'Tibetan National Uprising',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'participant', name: 'Tenzin Gyatso, the 14th Dalai Lama' }
      ],
      cites: [
        {
          source: 'dalai-lama-2009-03-10-statement-50th-anniversary-uprising',
          loc: {
            section: 'Statement on the Fiftieth Anniversary of the Tibetan National Uprising Day'
          }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1959-03-10' },
        cites: [
          {
            source: 'prc-white-paper-2009-fifty-years-of-democratic-reform-in-tibet',
            loc: { section: 'Fifty Years of Democratic Reform in Tibet' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia', 'south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:lhasa',
      cites: [
        {
          source: 'prc-white-paper-2009-fifty-years-of-democratic-reform-in-tibet',
          loc: { section: 'Fifty Years of Democratic Reform in Tibet' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'rebels',
      name: 'rebels',
      cites: [
        {
          source: 'prc-white-paper-2009-fifty-years-of-democratic-reform-in-tibet',
          loc: { section: 'Fifty Years of Democratic Reform in Tibet' }
        }
      ]
    },
    {
      key: 'pla',
      name: 'PLA',
      cites: [
        {
          source: 'prc-white-paper-2009-fifty-years-of-democratic-reform-in-tibet',
          loc: { section: 'Fifty Years of Democratic Reform in Tibet' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Tenzin Gyatso, the 14th Dalai Lama',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Great Leap Forward, 1958-60', para: '6' }
        }
      ]
    },
    {
      name: 'Tan Guansan',
      role: 'diplomat',
      cites: [
        {
          source: 'prc-white-paper-2009-fifty-years-of-democratic-reform-in-tibet',
          loc: { section: 'Fifty Years of Democratic Reform in Tibet' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'rebels',
      value: {
        alts: [
          {
            value: { min: 7000, qualifier: 'about' },
            cites: [
              {
                source: 'prc-white-paper-2009-fifty-years-of-democratic-reform-in-tibet',
                loc: { section: 'Fifty Years of Democratic Reform in Tibet' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'People’s Republic of China' }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'pla',
      value: {
        alts: [
          {
            value: { min: 1000, qualifier: 'over' },
            cites: [
              {
                source: 'prc-white-paper-2009-fifty-years-of-democratic-reform-in-tibet',
                loc: { section: 'Fifty Years of Democratic Reform in Tibet' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'People’s Republic of China' }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Chinese control over Xizang had been reasserted in 1950. The socialist revolution that took place thereafter increasingly became a process of sinicization for the Tibetans. Tension culminated in a revolt in 1958-59 and the flight to India by the Dalai Lama, the Tibetans\' spiritual and de facto temporal leader.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/26.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q2',
          text: 'Relations with India--where sympathy for the rebels was aroused--deteriorated as thousands of Tibetan refugees crossed the Indian border.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Great Leap Forward, 1958-60', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/china/26.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/The_Potala_Palace_2007.JPG/1280px-The_Potala_Palace_2007.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:The_Potala_Palace_2007.JPG',
    credit: { creator: 'Aneta Ribarska' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
