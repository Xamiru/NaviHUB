import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'indian-rebellion-of-1857',
  names: [
    { text: 'Indian Rebellion of 1857', lang: 'en', role: 'primary' },
    {
      text: 'Sepoy Rebellion',
      lang: 'en',
      role: 'alternative',
      usedBy: [
        { kind: 'school', name: 'Historians' }
      ],
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
        }
      ]
    },
    {
      text: 'Great Mutiny',
      lang: 'en',
      role: 'alternative',
      usedBy: [
        { kind: 'school', name: 'Historians' }
      ],
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
        }
      ]
    },
    {
      text: 'Revolt of 1857',
      lang: 'en',
      role: 'alternative',
      usedBy: [
        { kind: 'school', name: 'Historians' }
      ],
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
        }
      ]
    },
    {
      text: 'India\'s first war of independence',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'public', name: 'Many people in South Asia' }
      ],
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1857-05-10' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Sepoy Rebellion, 1857-59', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1859-05-21' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:meerut',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Sepoy Rebellion, 1857-59', para: '1' }
        }
      ]
    },
    {
      ref: 'place:delhi',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Sepoy Rebellion, 1857-59', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:mughal-empire' }
  ],
  sides: [
    {
      key: 'rebels',
      name: 'the rebels',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Sepoy Rebellion, 1857-59', para: '1' }
        }
      ]
    },
    {
      key: 'british',
      name: 'the British',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Bahadur Shah II',
      role: 'head-of-state',
      side: 'rebels',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'After the Sepoy Rebellion', para: '1' }
        }
      ]
    },
    {
      name: 'Elisa Greathed',
      role: 'witness',
      cites: [
        {
          source: 'greathed-1858-opening-of-the-mutiny-at-meerut',
          loc: {
            section: 'An Account of the Opening of the Indian Mutiny at Meerut, 1857',
            para: '1'
          }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'polity:british-raj',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'After the Sepoy Rebellion', para: '1' }
        }
      ]
    },
    { ref: 'event:anglo-persian-war-1856-1857', rel: 'related' }
  ],
  sections: [
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q1',
          text: 'Until the rebellion, the British had succeeded in suppressing numerous riots and "tribal" wars or in accommodating them through concessions, but two events triggered the violent explosion of wrath in 1857.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/17.htm' }
        },
        {
          id: 'q2',
          text: 'First, was the annexation in 1856 of Oudh, a wealthy princely state that generated huge revenue and represented a vestige of Mughal authority. The second was the British blunder in using cartridges for the Lee-Enfield rifle that were allegedly greased with animal fat, which was offensive to the religious beliefs of Muslim and Hindu sepoys.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/17.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'On May 10, 1857, Indian soldiers of the British Indian Army, drawn mostly from Muslim units from Bengal, mutinied in Meerut, a cantonment eighty kilometers northeast of Delhi. The rebels marched to Delhi to offer their services to the Mughal emperor, and soon much of north and central India was plunged into a year-long insurrection against the British.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Sepoy Rebellion, 1857-59', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/17.htm' }
        },
        {
          id: 'q4',
          text: 'The rebellion soon engulfed much of North India, including Oudh and various areas once under the control of Maratha princes. Isolated mutinies also occurred at military posts in the center of the subcontinent. Initially, the rebels, although divided and uncoordinated, gained the upper hand, while the unprepared British were terrified, and even paralyzed, without replacements for the casualties. The civil war inflicted havoc on both Indians and British as each vented its fury on the other; each community suffered humiliation and triumph in battle as well, although the final outcome was victory for the British.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/17.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The civil war was a major turning point in the history of modern India.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/18.htm' }
        },
        {
          id: 'q6',
          text: 'In May 1858, the British exiled Emperor Bahadur Shah II (r. 1837-57) to Burma, thus formally liquidating the Mughal Empire.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/18.htm' }
        },
        {
          id: 'q7',
          text: 'Shocked by the extent of solidarity among Indian soldiers during the rebellion, the government separated the army into the three presidencies (see Company Armies, ch. 10).',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/18.htm' }
        },
        {
          id: 'q8',
          text: 'British attitudes toward Indians shifted from relative openness to insularity and xenophobia, even against those with comparable background and achievement as well as loyalty.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/18.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1857-05-10' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Sepoy Rebellion, 1857-59', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'We were on the point of going to the evening service, when the disturbance commenced on the Native Parade ground.',
        lang: 'en',
        cite: {
          source: 'greathed-1858-opening-of-the-mutiny-at-meerut',
          loc: {
            section: 'An Account of the Opening of the Indian Mutiny at Meerut, 1857',
            para: '1'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://sourcebooks.fordham.edu/halsall/mod/1857greathed.asp'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1858-06-21' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The last major sepoy rebels surrendered on June 21, 1858, at Gwalior (Madhya Pradesh), one of the principal centers of the revolt.',
        lang: 'en',
        cite: {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/17.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1859-05-21' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'A final battle was fought at Sirwa Pass on May 21, 1859, and the defeated rebels fled into Nepal.',
        lang: 'en',
        cite: {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/17.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/%22Capture_of_the_King_of_Delhi_by_Captain_Hodson%22.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%22Capture_of_the_King_of_Delhi_by_Captain_Hodson%22.jpg',
    credit: { creator: 'Robert Montgomery Martin' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'greathed-1858',
      mediaKind: 'document',
      title: 'Letters written during the siege of Delhi by H.H. Greathed, ed. by his widow [E.F. Greathed].',
      date: { d: '1858' },
      url: 'https://archive.org/download/letterswrittend00greagoog/letterswrittend00greagoog.pdf',
      page: 'https://archive.org/details/letterswrittend00greagoog',
      credit: {
        institution: 'Oxford University (Internet Archive)',
        creator: 'Hervey Harris Greathed'
      },
      license: { id: 'public-domain' },
      bytes: 4536875
    }
  ],
  furtherReading: [
    { source: 'sen-1957-eighteen-fifty-seven', perspective: 'south-asian' },
    {
      source: 'majumdar-1963-the-sepoy-mutiny-and-the-revolt-of-1857',
      perspective: 'south-asian'
    },
    { source: 'mukherjee-1984-awadh-in-revolt', perspective: 'south-asian' },
    { source: 'osipov-reisner-1957-narodnoe-vosstanie-v-indii', perspective: 'russian-soviet' }
  ]
})
