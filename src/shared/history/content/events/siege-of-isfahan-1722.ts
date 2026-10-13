import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'siege-of-isfahan-1722',
  names: [
    { text: 'Siege of Isfahan', lang: 'en', role: 'primary' },
    {
      text: 'Fall of Isfahan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1722-03' },
        cites: [
          {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
          },
          {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '23' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1722-10-23' },
        cites: [
          {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Masashi Haneda and Rudi Matthee', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1722-10-21' },
        cites: [
          {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  places: [
    {
      ref: 'place:isfahan',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'safavid',
      name: 'Safavid government',
      polity: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
        }
      ]
    },
    {
      key: 'afghan',
      name: 'Afghans',
      polity: 'polity:hotaki-dynasty',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:shah-sultan-hosayn',
      role: 'head-of-state',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
        }
      ]
    },
    {
      ref: 'person:mahmud-hotaki',
      role: 'leader',
      side: 'afghan',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
        }
      ]
    },
    {
      ref: 'person:tahmasp-ii',
      role: 'participant',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '23' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'population',
      value: {
        alts: [
          {
            value: { min: 600000, qualifier: 'over' },
            cites: [
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1084' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:battle-of-gulnabad',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '23' }
        }
      ]
    },
    {
      ref: 'event:hotaki-revolt-at-qandahar',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '1' }
        }
      ]
    },
    {
      ref: 'event:russo-persian-war-1722-1723',
      rel: 'contributed-to',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '3' } }
      ]
    },
    {
      ref: 'event:ottoman-persian-war-1723-1727',
      rel: 'contributed-to',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '3' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Once again the eastern frontiers began to be breached, and in 1722 a small body of Afghan tribesmen won a series of easy victories before entering and taking the capital itself, ending Safavid rule.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q2',
          text: 'The Afghan siege of Isfahan that followed lasted until the fall of the city in late October.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q3',
          text: 'Even at this point, their occupation of the Safavid capital and the concomitant fall of the dynasty was anything but inevitable.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The last decade of Solṭān Ḥosayn’s rule saw a spiraling welter of urban unrest, tribal revolt, and foreign aggression.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        },
        {
          id: 'q5',
          text: 'A new crisis hit Isfahan at the beginning of the 18th century as part of a deepening malaise that affected all of Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        },
        {
          id: 'q6',
          text: 'Following various Baluchi incursions, the Afghans marched into Persia’s heartland in 1720, taking Kerman.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'After a few days of panic in which the Afghans could have taken Isfahan proper, the inhabitants quickly reinforced the defenses, and a long siege ensued.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        },
        {
          id: 'q8',
          text: 'The city soon ran out of food, and, especially toward the end of the summer, the misery grew to the point at which people first took to eating tree bark, leaves, and dried excrement and eventually resorted to cannibalism.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        },
        {
          id: 'q9',
          text: 'The Persians were unable to collect enough revenue, however, and, following final negotiations, Solṭān Ḥosayn, faced with a city filled with starving people, on 9 Moḥarram 1135/21 October 1722 was forced to surrender.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-soltan-hosayn',
            loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Isfahan suffered greatly during the assault and the ensuing occupation.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        },
        {
          id: 'q11',
          text: 'After the fall of Isfahan, Safavid pretenders emerged all over Iran.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q12',
          text: 'The Russians and Ottomans saw the Afghan conquest as their own opportunity to acquire territory in Iran, so both invaded and occupied some land in 1723.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
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
            value: { d: '1722-03-08' },
            cites: [
              {
                source: 'iranica-haneda-matthee-isfahan-safavid-period',
                loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
              }
            ],
            heldBy: [
              {
                kind: 'scholar',
                name: 'Masashi Haneda and Rudi Matthee',
                discipline: 'historian'
              }
            ]
          },
          {
            value: { d: '1722-03-09' },
            cites: [
              {
                source: 'iranica-matthee-soltan-hosayn',
                loc: { section: 'SOLṬĀN ḤOSAYN', para: '22' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The Afghans arrived in Golnābād on 8 March 1722 and defeated the Persian army, which, at about 40,000 men and an additional 30,000 infantry troops, was at least twice as large as that of the Afghans.',
        lang: 'en',
        cite: {
          source: 'iranica-haneda-matthee-isfahan-safavid-period',
          loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1722-04' },
            cites: [
              {
                source: 'iranica-matthee-soltan-hosayn',
                loc: { section: 'SOLṬĀN ḤOSAYN', para: '23' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In April popular frustration with the shah’s inertia caused an outcry of people who sought to replace Solṭān Ḥosayn with his brother, ʿAbbās Mirzā.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '23' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1722-08' },
            cites: [
              {
                source: 'iranica-matthee-soltan-hosayn',
                loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In August 1722, at the height of the siege, the Afghan warlord reached out to the shah, proposing to withdraw with his forces in return for being granted control over the eastern half of Iran, Khorasan, Sistan, Qandahar, and Kerman, as well as a payment of 400,000 tumans',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1722-10-23' },
            cites: [
              {
                source: 'iranica-haneda-matthee-isfahan-safavid-period',
                loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
              }
            ],
            heldBy: [
              {
                kind: 'scholar',
                name: 'Masashi Haneda and Rudi Matthee',
                discipline: 'historian'
              }
            ]
          },
          {
            value: { d: '1722-10-21' },
            cites: [
              {
                source: 'iranica-matthee-soltan-hosayn',
                loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'After a six-month siege, the city fell to Maḥmud on 23 October 1722',
        lang: 'en',
        cite: {
          source: 'iranica-haneda-matthee-isfahan-safavid-period',
          loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '38' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1722-10' },
            cites: [
              {
                source: 'iranica-matthee-soltan-hosayn',
                loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Four days later Maḥmud entered the city as its new ruler',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-soltan-hosayn',
          loc: { section: 'SOLṬĀN ḤOSAYN', para: '24' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/soltan-hosayn'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Isfahan_to_the_south_side_by_Eug%C3%A8ne_Flandin.jpg/1280px-Isfahan_to_the_south_side_by_Eug%C3%A8ne_Flandin.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Isfahan_to_the_south_side_by_Eug%C3%A8ne_Flandin.jpg',
    credit: { creator: 'Eugène Flandin' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'a1',
      mediaKind: 'document',
      title: 'The history of the late revolutions of Persia: taken from the memoirs of Father Krusinski, Procurator of the Jesuits at Ispahan..',
      date: { d: '1733' },
      url: 'https://archive.org/download/historyoflaterev01krusiala/historyoflaterev01krusiala.pdf',
      page: 'https://archive.org/details/historyoflaterev01krusiala',
      credit: {
        institution: 'University of California Libraries (Internet Archive)',
        creator: 'Krusinski, Father'
      },
      license: { id: 'public-domain' },
      bytes: 16142731
    },
    {
      id: 'a2',
      mediaKind: 'document',
      title: 'The history of the late revolutions of Persia: taken from the memoirs of Father Krusinski, Procurator of the Jesuits at Ispahan..',
      date: { d: '1733' },
      url: 'https://archive.org/download/historyoflaterev02krusiala/historyoflaterev02krusiala.pdf',
      page: 'https://archive.org/details/historyoflaterev02krusiala',
      credit: {
        institution: 'University of California Libraries (Internet Archive)',
        creator: 'Krusinski, Father'
      },
      license: { id: 'public-domain' },
      bytes: 20457304
    }
  ]
})
