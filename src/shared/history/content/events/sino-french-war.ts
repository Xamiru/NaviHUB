import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sino-french-war',
  names: [
    { text: 'Sino-French War', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1884' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Self-Strengthening Movement', para: '5' }
          },
          { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '28' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1885-06-09' },
        cites: [
          { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '27' } },
          { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '28' } }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'east-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:tianjin',
      cites: [
        { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '28' } }
      ]
    }
  ],
  sides: [
    {
      key: 'china',
      name: 'China',
      polity: 'polity:qing-empire',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Self-Strengthening Movement', para: '5' }
        }
      ]
    },
    {
      key: 'france',
      name: 'France',
      polity: 'polity:french-third-republic',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Self-Strengthening Movement', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q11',
          text: 'During 1884 the French made themselves masters of the lower delta. Throughout the campaign Chinese regulars fought against the French, who thus found themselves involved in war with China.',
          lang: 'en',
          cite: { source: 'britannica-1911-tongking', loc: { section: 'TONGKING', para: '31' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tongking'
          }
        },
        {
          id: 'q1',
          text: 'Following a victorious war against China in 1884-85, France also took Annam.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Self-Strengthening Movement', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/17.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'In April 1882, a French force again stormed the citadel of Hanoi, under the leadership of naval officer Henri Riviere.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/vietnam/15.htm' }
        },
        {
          id: 'q3',
          text: 'A Treaty of Protectorate, signed at the August 1883 Harmand Convention, established a French protectorate over North and Central Vietnam and formally ended Vietnam\'s independence.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/vietnam/15.htm' }
        },
        {
          id: 'q4',
          text: 'At this time the foreign powers also took over the peripheral states that had acknowledged Chinese suzerainty and given tribute to the emperor.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Self-Strengthening Movement', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/17.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q12',
          text: 'A misunderstanding arose between the French and the Chinese as to the exact date for the evacuation of their posts by the Chinese, and in June General Millot, then commander-in-chief of the French forces, dispatched Colonel Dugenne at the head of a strong force to occupy Lang-Son. The expedition was badly arranged; the baggage train was far too unwieldy; and the pace at which the men were made to march was too quick for that scorching time of the year. They advanced, however, to Bac-Le, within 25 m. of Lang-Son, when they suddenly came upon a Chinese camp. An irregular engagement began, and, in the pitched battle which ensued, the Chinese broke the French lines, and drove them away in headlong flight.',
          lang: 'en',
          cite: { source: 'britannica-1911-tongking', loc: { section: 'TONGKING', para: '31' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tongking'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'A rebellion known as the Can Vuong (Loyalty to the King) movement formed in 1885 around the deposed Emperor Ham Nghi and attracted support from both scholars and peasants. The rebellion was essentially subdued with the capture and exile of Ham Nghi in 1888. Scholar and patriot Phan Dinh Phung continued to lead the resistance until his death in 1895. Although unsuccessful in driving out the French, the Can Vuong movement, with its heroes and patriots, laid important groundwork for future Vietnamese independence movements.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'UNDER FRENCH RULE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/vietnam/15.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1883-08-25' },
            cites: [
              { source: 'lemo-chronik-1883', loc: { section: 'Chronik 1883', para: '33' } },
              { source: 'lemo-chronik-1883', loc: { section: 'Chronik 1883', para: '34' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'They found that, though King Tu Duc was dead, his policy of resistance was maintained, and therefore stormed the city. After a feeble defence it was taken, and Harmand concluded a treaty with the king (August 1883) in which the French protectorate was fully recognized, the king further binding himself to recall the Annamese troops serving in Tongking, and to construct a road from Saigon to Hanoi.',
        lang: 'en',
        cite: { source: 'britannica-1911-tongking', loc: { section: 'TONGKING', para: '29' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tongking'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1884-05-11' },
            cites: [
              { source: 'lemo-chronik-1884', loc: { section: 'Chronik 1884', para: '19' } },
              { source: 'lemo-chronik-1884', loc: { section: 'Chronik 1884', para: '20' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'While hostilities were in progress M. Fournier, the French consul at Tientsin, had been negotiating for peace, so far as China was concerned, with Li Hung-chang, and in May 1884 had signed and sealed a memorandum by which the Chinese plenipotentiary agreed that the Chinese troops should evacuate the northern provinces of Tongking “immédiatement.”',
        lang: 'en',
        cite: { source: 'britannica-1911-tongking', loc: { section: 'TONGKING', para: '31' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tongking'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1885-06-09' },
            cites: [
              { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '27' } },
              { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '28' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Shortly afterwards Sir Robert Hart succeeded in negotiating peace with China. By the terms agreed on at Tientsin (June, 1885), it was stipulated that France was to take Tongking and Annam under its protection and to evacuate Formosa and the Pescadores.',
        lang: 'en',
        cite: { source: 'britannica-1911-tongking', loc: { section: 'TONGKING', para: '33' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tongking'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/The_Graphic%2C_Aug._30%2C_1884%2C_P239.jpg/1280px-The_Graphic%2C_Aug._30%2C_1884%2C_P239.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Graphic,_Aug._30,_1884,_P239.jpg',
    credit: { creator: 'Charles William Wyllie' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'liao-2002-zhongfa-zhanzheng-shi', perspective: 'chinese' },
    { source: 'long-1996-yuenan-yu-zhongfa-zhanzheng', perspective: 'chinese' },
    {
      source: 'brocheux-hemery-1995-indochine-la-colonisation-ambigue',
      perspective: 'european'
    }
  ]
})
