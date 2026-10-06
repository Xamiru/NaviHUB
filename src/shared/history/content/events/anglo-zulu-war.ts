import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anglo-zulu-war',
  names: [
    { text: 'Anglo-Zulu War', lang: 'en', role: 'primary' },
    {
      text: 'Zulu War',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '0' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1879-01' },
        cites: [
          { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '9' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1879' },
        cites: [
          { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '1' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:isandlwana',
      cites: [
        { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '30' } }
      ]
    }
  ],
  sides: [
    {
      key: 'britain',
      name: 'the British',
      cites: [
        { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '1' } }
      ]
    },
    {
      key: 'zulu',
      name: 'the Zulu Kingdom',
      cites: [
        { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:cetshwayo',
      role: 'head-of-state',
      side: 'zulu',
      cites: [
        { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '8' } }
      ]
    },
    {
      name: 'Ntshingwayo kaMahole',
      role: 'commander',
      side: 'zulu',
      cites: [
        { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '36' } }
      ]
    },
    {
      name: 'Lord Chelmsford',
      role: 'commander',
      side: 'britain',
      cites: [
        { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '9' } }
      ]
    },
    {
      name: 'Sir Bartle Frere',
      role: 'organizer',
      side: 'britain',
      cites: [
        { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '7' } }
      ]
    },
    {
      name: 'Lord Carnarvon',
      role: 'organizer',
      side: 'britain',
      cites: [
        { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '7' } }
      ]
    },
    {
      name: 'Sir Garnet Wolseley',
      role: 'commander',
      side: 'britain',
      cites: [
        { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '65' } }
      ]
    },
    {
      name: 'Louis-Napoléon, the French Prince Imperial',
      role: 'combatant',
      side: 'britain',
      cites: [
        { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '68' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1879, the British fought a war against the Zulu Kingdom in southern Africa. The Zulus resisted bravely and were only defeated after a series of particularly bloody battles that have gone down in the annals of colonial warfare.',
          lang: 'en',
          cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '1' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
        },
        {
          id: 'q2',
          text: 'Most Zulus entered battle armed only with shields and spears. However, they still proved formidable opponents. They were courageous under fire, manoeuvred with great skill and were adept in hand-to-hand combat.',
          lang: 'en',
          cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '24' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'After the Battle of Ulundi, King Cetshwayo was hunted down and captured. The Zulu monarchy was suppressed and Zululand divided into autonomous areas.',
          lang: 'en',
          cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '83' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
        },
        {
          id: 'q4',
          text: 'In 1887, Zululand was declared British territory and finally annexed to Natal ten years later.',
          lang: 'en',
          cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '86' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1879-01' },
            cites: [
              { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '9' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'In January 1879, war began when a force led by Lieutenant-General Lord Chelmsford invaded Zululand to enforce Britain\'s demands.',
        lang: 'en',
        cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '9' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1879-01-22' },
            cites: [
              { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '30' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Over 20,000 Zulus, the main part of Cetshwayo\'s army, then launched a surprise attack on Chelmsford\'s poorly fortified camp. Fighting in an over-extended line, and too far from their ammunition, the British were swamped by sheer weight of numbers. The majority of their 1,700 troops were killed.',
        lang: 'en',
        cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '31' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1879-01-22', notAfter: '1879-01-23' },
            cites: [
              { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '39' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'After their victory at Isandlwana, around 4,000 Zulus pressed on to Rorke’s Drift, where a small British garrison held them back for 12 hours.',
        lang: 'en',
        cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '41' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1879-06-01' },
            cites: [
              { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '70' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'He was ambushed and killed near Ulundi on 1 June 1879, after setting out on a patrol without his full escort.',
        lang: 'en',
        cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '70' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1879-07-04' },
            cites: [
              { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '76' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Around 6,000 Zulus had been slain for the loss of 10 men killed and 87 wounded.',
        lang: 'en',
        cite: { source: 'nam-zulu-war', loc: { section: 'Zulu War', para: '77' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.nam.ac.uk/explore/zulu-war' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Charles_Edwin_Fripp_%281854-1906%29_-_The_Battle_of_Isandlwana%2C_22_January_1879_-_NAM._1960-11-182_-_National_Army_Museum.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Charles_Edwin_Fripp_(1854-1906)_-_The_Battle_of_Isandlwana,_22_January_1879_-_NAM._1960-11-182_-_National_Army_Museum.jpg',
    credit: { institution: 'National Army Museum', creator: 'Charles Edwin Fripp' },
    license: { id: 'public-domain' }
  }
})
