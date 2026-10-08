import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'balkan-wars',
  names: [
    { text: 'Balkan Wars', lang: 'en', role: 'primary' },
    {
      text: 'First Balkan War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-hall-balkan-wars',
          loc: { section: 'The First Balkan War', para: '1' }
        }
      ]
    },
    {
      text: 'Second Balkan War',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'eo1418-hall-balkan-wars', loc: { section: 'Balkan Wars 1912-1913' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1912-10-08' },
        cites: [
          {
            source: 'eo1418-hall-balkan-wars',
            loc: { section: 'The First Balkan War', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1913-08-10' },
        cites: [
          {
            source: 'eo1418-hall-balkan-wars',
            loc: { section: 'Second Balkan or Interallied War', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:edirne',
      cites: [
        {
          source: 'eo1418-hall-balkan-wars',
          loc: { section: 'The First Balkan War', para: '1' }
        },
        {
          source: 'eo1418-hall-balkan-wars',
          loc: { section: 'The First Balkan War', para: '4' }
        }
      ]
    },
    {
      ref: 'place:london',
      cites: [
        {
          source: 'eo1418-hall-balkan-wars',
          loc: { section: 'The First Balkan War', para: '6' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'league',
      name: 'the Balkan League',
      cites: [
        { source: 'eo1418-hall-balkan-wars', loc: { section: 'Origins', para: '2' } }
      ]
    },
    {
      key: 'ottoman',
      name: 'the Ottoman Empire',
      polity: 'polity:ottoman-empire',
      cites: [
        { source: 'eo1418-hall-balkan-wars', loc: { section: 'Balkan Wars 1912-1913' } }
      ]
    },
    {
      key: 'bulgaria',
      name: 'Bulgaria',
      cites: [
        { source: 'eo1418-hall-balkan-wars', loc: { section: 'Consequences', para: '1' } }
      ]
    },
    {
      key: 'greece',
      name: 'the Greeks',
      polity: 'polity:kingdom-of-greece',
      cites: [
        { source: 'eo1418-hall-balkan-wars', loc: { section: 'Consequences', para: '1' } }
      ]
    },
    {
      key: 'serbia',
      name: 'the Serbs',
      polity: 'polity:kingdom-of-serbia',
      cites: [
        { source: 'eo1418-hall-balkan-wars', loc: { section: 'Consequences', para: '1' } }
      ]
    },
    {
      key: 'montenegro',
      name: 'the Montenegrins',
      cites: [
        { source: 'eo1418-hall-balkan-wars', loc: { section: 'Consequences', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:enver-pasha',
      role: 'commander',
      side: 'ottoman',
      cites: [
        { source: 'eo1418-ahmad-enver', loc: { section: 'Rise to Power', para: '4' } }
      ]
    },
    {
      ref: 'person:talaat-pasha',
      role: 'organizer',
      side: 'ottoman',
      cites: [
        { source: 'eo1418-kieser-talat', loc: { section: 'Career until 1913', para: '3' } }
      ]
    }
  ],
  figures: [
    {
      key: 'military-deaths',
      side: 'bulgaria',
      value: {
        alts: [
          {
            value: { min: 65000, qualifier: 'about' },
            cites: [
              {
                source: 'eo1418-hall-balkan-wars',
                loc: { section: 'Consequences', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Richard C. Hall' }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'greece',
      value: {
        alts: [
          {
            value: { min: 9500 },
            cites: [
              {
                source: 'eo1418-hall-balkan-wars',
                loc: { section: 'Consequences', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Richard C. Hall' }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'montenegro',
      value: {
        alts: [
          {
            value: { min: 3000 },
            cites: [
              {
                source: 'eo1418-hall-balkan-wars',
                loc: { section: 'Consequences', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Richard C. Hall' }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'serbia',
      value: {
        alts: [
          {
            value: { min: 36000, qualifier: 'over' },
            cites: [
              {
                source: 'eo1418-hall-balkan-wars',
                loc: { section: 'Consequences', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Richard C. Hall' }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'ottoman',
      value: {
        alts: [
          {
            value: { min: 125000, qualifier: 'up-to' },
            cites: [
              {
                source: 'eo1418-hall-balkan-wars',
                loc: { section: 'Consequences', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Richard C. Hall' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:first-world-war',
      rel: 'led-to',
      cites: [
        { source: 'eo1418-hall-balkan-wars', loc: { section: 'Consequences', para: '3' } },
        { source: 'eo1418-hall-balkan-wars', loc: { section: 'Balkan Wars 1912-1913' } }
      ]
    },
    { ref: 'event:young-turk-revolution', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Balkan Wars were two sharp conflicts that heralded the onset of World War I. In the First Balkan War a loose alliance of Balkan States eliminated the Ottoman Empire from most of Europe. In the Second Balkan War, the erstwhile allies fought among themselves for the Ottoman spoils.',
          lang: 'en',
          cite: { source: 'eo1418-hall-balkan-wars', loc: { section: 'Balkan Wars 1912-1913' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balkan-wars-1912-1913/'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q2',
          text: 'When the Young Turks threatened to reinvigorate the Ottoman Empire after their 1908 coup, however, the leaders of the Balkan states sought ways to overcome their rivalries. Russian diplomacy facilitated their efforts.',
          lang: 'en',
          cite: { source: 'eo1418-hall-balkan-wars', loc: { section: 'Origins', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balkan-wars-1912-1913/'
          }
        },
        {
          id: 'q3',
          text: 'Disagreement about the disposition of Macedonia quickly rearranged the alliances of the First Balkan War and ignited a Second Balkan War in 1913.',
          lang: 'en',
          cite: {
            source: 'loc-bulgaria-country-study-1992',
            loc: { section: 'THE BALKAN WARS', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bulgaria/12.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q4',
          text: 'The Balkan Wars resulted in huge casualties. The Bulgarians lost around 65,000 men, the Greeks 9,500, the Montenegrins, 3,000, and the Serbs at least 36,000. The Ottomans lost as many as 125,000 dead. In addition, tens of thousands of civilians died from disease and other causes. Deliberate atrocities occurred throughout every theater of war.',
          lang: 'en',
          cite: { source: 'eo1418-hall-balkan-wars', loc: { section: 'Consequences', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balkan-wars-1912-1913/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Ottoman forces were defeated, and the empire lost all of its European holdings except part of eastern Thrace.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Young Turks', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/11.htm' }
        },
        {
          id: 'q6',
          text: 'The First World War was not the Third Balkan War; rather the Balkan Wars were the beginning of the First World War.',
          lang: 'en',
          cite: { source: 'eo1418-hall-balkan-wars', loc: { section: 'Consequences', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balkan-wars-1912-1913/'
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
            value: { d: '1912-10-08' },
            cites: [
              {
                source: 'eo1418-hall-balkan-wars',
                loc: { section: 'The First Balkan War', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Montenegro began the First Balkan War on 8 October 1912. Before the other allies could join in, the Ottomans declared war on the Balkan League on 17 October.',
        lang: 'en',
        cite: {
          source: 'eo1418-hall-balkan-wars',
          loc: { section: 'The First Balkan War', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/balkan-wars-1912-1913/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1912-11-28' },
            cites: [
              {
                source: 'eo1418-hall-balkan-wars',
                loc: { section: 'The First Balkan War', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'As a result of the Ottoman collapse, groups of Albanian notables, supported by Austria and Italy, declared Albanian independence on 28 November 1912.',
        lang: 'en',
        cite: {
          source: 'eo1418-hall-balkan-wars',
          loc: { section: 'The First Balkan War', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/balkan-wars-1912-1913/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1913-01-23' },
            cites: [
              {
                source: 'eo1418-hall-balkan-wars',
                loc: { section: 'The First Balkan War', para: '4' }
              },
              { source: 'eo1418-ahmad-enver', loc: { section: 'Rise to Power', para: '3' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'A coup on 23 January 1913 returned a Young Turk government to power in Constantinople. This government was determined to continue the war, mainly in order to retain Adrianople.',
        lang: 'en',
        cite: {
          source: 'eo1418-hall-balkan-wars',
          loc: { section: 'The First Balkan War', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/balkan-wars-1912-1913/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1913-05-30' },
            cites: [
              {
                source: 'eo1418-hall-balkan-wars',
                loc: { section: 'The First Balkan War', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Meanwhile in London, peace negotiations resulted in the preliminary Treaty of London, signed on 30 May 1913 between the Balkan allies and the Ottoman Empire.',
        lang: 'en',
        cite: {
          source: 'eo1418-hall-balkan-wars',
          loc: { section: 'The First Balkan War', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/balkan-wars-1912-1913/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1913-06-29', notAfter: '1913-06-30' },
            cites: [
              {
                source: 'eo1418-hall-balkan-wars',
                loc: { section: 'Second Balkan or Interallied War', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On the night of 29-30 June 1913, Bulgarian soldiers began local attacks against Greek and Serbian positions in Macedonia. These attacks became the signal for the outbreak of general war.',
        lang: 'en',
        cite: {
          source: 'eo1418-hall-balkan-wars',
          loc: { section: 'Second Balkan or Interallied War', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/balkan-wars-1912-1913/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1913-08-10' },
            cites: [
              {
                source: 'eo1418-hall-balkan-wars',
                loc: { section: 'Second Balkan or Interallied War', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'By the resulting Treaty of Bucharest, signed on 10 August, Bulgaria lost most of Macedonia to Greece and Serbia, and southern Dobrudzha to Romania.',
        lang: 'en',
        cite: {
          source: 'eo1418-hall-balkan-wars',
          loc: { section: 'Second Balkan or Interallied War', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/balkan-wars-1912-1913/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Politika_announces_the_beginning_of_the_First_Balkan_War%2C_26_September_1912.png/1280px-Politika_announces_the_beginning_of_the_First_Balkan_War%2C_26_September_1912.png',
    page: 'https://commons.wikimedia.org/wiki/File:Politika_announces_the_beginning_of_the_First_Balkan_War,_26_September_1912.png',
    credit: { institution: 'National Library of Serbia', creator: 'Politika' },
    license: { id: 'public-domain' }
  }
})
