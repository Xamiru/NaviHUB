import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'siege-of-khartoum',
  names: [
    { text: 'Siege of Khartoum', lang: 'en', role: 'primary' },
    { text: 'Fall of Khartoum', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1884-03-18' },
        cites: [
          {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '8' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1885-01-26' },
        cites: [
          {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '8' }
          },
          { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '2' } },
          { source: 'lemo-chronik-1885', loc: { section: 'Chronik 1885', para: '3' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'mena', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:khartoum',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE MAHDIYAH, 1884-98', para: '9' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:mahdiyah' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' }
  ],
  related: [
    { ref: 'event:urabi-revolt', rel: 'related' }
  ],
  sides: [
    {
      key: 'ansar',
      name: 'Ansar',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE MAHDIYAH, 1884-98', para: '9' }
        }
      ]
    },
    {
      key: 'garrison',
      name: 'garrison',
      polity: 'polity:khedivate-of-egypt',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE MAHDIYAH, 1884-98', para: '9' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:muhammad-ahmad-al-mahdi',
      role: 'leader',
      side: 'ansar',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE MAHDIYAH, 1884-98', para: '9' }
        }
      ]
    },
    {
      ref: 'person:charles-gordon',
      role: 'commander',
      side: 'garrison',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE MAHDIYAH, 1884-98', para: '8' }
        }
      ]
    },
    {
      ref: 'person:william-gladstone',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE MAHDIYAH, 1884-98', para: '9' }
        }
      ]
    },
    {
      name: 'Lord Garnet Joseph Wolseley',
      role: 'commander',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE MAHDIYAH, 1884-98', para: '9' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q15',
          text: 'The history of the city is intimately bound up with that of the Sudan generally, but it may be recalled here that in 1884, at the time of the Mahdist rising, General Gordon was sent to Khartum to arrange for the evacuation by the Egyptians of the Sudan. At Khartum he was besieged by the Mahdists, whose headquarters were at Omdurman. Khartum was captured and Gordon killed on the 26th of January 1885, two days before the arrival off the town of a small British relief force, which withdrew on seeing the city in the hands of the enemy.',
          lang: 'en',
          cite: { source: 'britannica-1911-khartum', loc: { section: 'KHARTUM', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Khartum'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'To avoid being drawn into a costly military intervention, the British government ordered an Egyptian withdrawal from Sudan.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        },
        {
          id: 'q2',
          text: 'After reaching Khartoum in February 1884, Gordon realized that he could not extricate the garrisons.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        },
        {
          id: 'q3',
          text: 'But, after delays which involved the loss of much precious time, the British government refused (13th of March) to sanction the appointment, because Zobeir had been a notorious slave-hunter. With this refusal vanished all hope of a peaceful retreat of the Egyptian garrisons.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Had it not been for the presence of Gordon the city would also soon have fallen, but with an energy and skill that were almost miraculous, he so organized the defence that Khartum held out until January 1885.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        },
        {
          id: 'q5',
          text: 'Increasing British popular support for Gordon eventually forced Prime Minister William Gladstone to mobilize a relief force under the command of Lord Garnet Joseph Wolseley.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        },
        {
          id: 'q6',
          text: 'An advance unit that had gone ahead by river when the column reached Al Matammah arrived at Khartoum on January 28, 1885, to find the town had fallen two days earlier. The Ansar had waited for the Nile flood to recede before attacking the poorly defended river approach to Khartoum in boats, slaughtering the garrison, killing Gordon, and delivering his head to the Mahdi\'s tent.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'Kassala and Sannar fell soon after, and by the end of 1885 the Ansar had begun to move into the southern region. In all Sudan, only Sawakin, reinforced by Indian army troops, and Wadi Halfa on the northern frontier remained in Anglo-Egyptian hands.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        },
        {
          id: 'q9',
          text: 'Critics reversed his ‘GOM’ nickname (for ‘Grand Old Man’) to ‘MOG’ (‘Murderer of Gordon’).',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-gladstone',
            loc: { section: 'William Ewart Gladstone' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/william-ewart-gladstone'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1881-06-29' },
            cites: [
              { source: 'lemo-chronik-1881', loc: { section: 'Chronik 1881', para: '41' } },
              { source: 'lemo-chronik-1881', loc: { section: 'Chronik 1881', para: '42' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'In 1881 Mahommed Ahmed ibn Seyyid Abdullah (q.v.), a Dongolese, proclaimed himself al-mahdi and founded in the eastern Sudan the short-lived empire overthrown by an Anglo-Egyptian force at the battle of Omdurman in 1898.',
        lang: 'en',
        cite: { source: 'britannica-1911-mahdi', loc: { section: 'MAHDI', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Mahdi'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1882' },
            cites: [
              {
                source: 'loc-sudan-country-study-1991',
                loc: { section: 'THE MAHDIYAH, 1884-98', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Early in 1882, the Ansar, armed with spears and swords, overwhelmed a 7,000-man Egyptian force not far from Al Ubayyid and seized their rifles and ammunition.',
        lang: 'en',
        cite: {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE MAHDIYAH, 1884-98', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1883-12' },
            cites: [
              {
                source: 'britannica-1911-gordon-charles-george',
                loc: { section: 'GORDON, CHARLES GEORGE', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Then, in December 1883, the British government saw that something must be done, and ordered Egypt to abandon the Sudan.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-gordon-charles-george',
          loc: { section: 'GORDON, CHARLES GEORGE', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1884-02-18' },
            cites: [
              {
                source: 'britannica-1911-gordon-charles-george',
                loc: { section: 'GORDON, CHARLES GEORGE', para: '7' }
              },
              {
                source: 'britannica-1911-gordon-charles-george',
                loc: { section: 'GORDON, CHARLES GEORGE', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Travelling by Korosko and Berber, he arrived at Khartum on the 18th of February,',
        lang: 'en',
        cite: {
          source: 'britannica-1911-gordon-charles-george',
          loc: { section: 'GORDON, CHARLES GEORGE', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1885-01-28' },
            cites: [
              {
                source: 'loc-sudan-country-study-1991',
                loc: { section: 'THE MAHDIYAH, 1884-98', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On the 24th Wilson started with two of the steamers for Khartum, but on arriving there on the 28th he found that the place had been captured by the rebels and Gordon killed two days before.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-gordon-charles-george',
          loc: { section: 'GORDON, CHARLES GEORGE', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/George_William_Joy_%281844-1925%29_-_General_Gordon%27s_Last_Stand_-_LEEAG.PA.1920.0274_-_Leeds_Art_Gallery.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:George_William_Joy_(1844-1925)_-_General_Gordon%27s_Last_Stand_-_LEEAG.PA.1920.0274_-_Leeds_Art_Gallery.jpg',
    credit: { institution: 'Leeds Art Gallery', creator: 'George William Joy' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'shuqayr-1981-tarikh-al-sudan', perspective: 'arab' }
  ]
})
