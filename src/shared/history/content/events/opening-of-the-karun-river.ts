import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'opening-of-the-karun-river',
  names: [
    { text: 'Opening of the Karun River', lang: 'en', role: 'primary' },
    {
      text: 'Karun proclamation',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '20' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1888-10-30' },
        cites: [
          {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '27' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:karun-river',
      cites: [
        {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '27' }
        }
      ]
    },
    {
      ref: 'place:khorramshahr',
      cites: [
        {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '3' }
        }
      ]
    },
    {
      ref: 'place:ahvaz',
      cites: [
        {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '27' }
        }
      ]
    },
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '27' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' }
  ],
  participants: [
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '30' }
        }
      ]
    },
    {
      ref: 'person:amin-al-soltan',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '25' }
        }
      ]
    },
    {
      name: 'Sir Henry Drummond Wolff',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '25' }
        }
      ]
    },
    {
      name: 'M. de Poggio',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '29' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'With the intensification of the Anglo-Russian rivalry in the late 1800s over Iran’s geopolitical position and commercial resources, Great Britain began to exert immense pressure on the shah’s government to provide it with access to the Karun trade route. This meant the opening of the only navigable river in Iran to British vessels, as well as the construction of a carriage road and/or a railway line in order to link the interior to the open seas.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
          }
        },
        {
          id: 'q2',
          text: 'Public-utilities concessions to British interests also included a series of licenses, issued between 1279/1862 and 1336/1918, to establish and operate telegraph lines in Persia; opening of the Kārūn river to international navigation in 1306/1888;',
          lang: 'en',
          cite: {
            source: 'iranica-ettehadiyeh-concessions-qajar',
            loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/concessions/concessions-ii-in-the-qajar-period'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Under these circumstances, establishing the Karun trade route acquired ever greater importance in the 1880s.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
          }
        },
        {
          id: 'q4',
          text: 'In the 1870s and 1880s, numerous proposals were made to the shah for the opening of this route, but he had successfully resisted all the pressures and blocked them.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
          }
        },
        {
          id: 'q5',
          text: 'The opening of a major waterway in the south of Persia, with road access there from Isfahan through Šuštar, was an ominous prospect for the shah with the inevitable outcome of Persia’s partition and even occupation; a fear confirmed further after the British occupation of Egypt in 1882, a few years after the British purchase of the Egyptian shares in the Suez Canal company.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '29'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q6',
          text: 'Politically, it would allow Britain to gain paramount influence in southern Persia, while the possibility of bringing troops within a few hundred miles of Iran’s important centers would naturally also contribute to the re-establishment of British influence in Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
          }
        },
        {
          id: 'q7',
          text: 'The main stumbling block was the dread of a Russian reaction and the assurances needed against it.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'The Russians were so angry with the shah and his vizier that, at first, they even boycotted Amin-al-Solṭān',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
          }
        },
        {
          id: 'q9',
          text: 'The situation of Persia, he said, had become unique “she is engulfed in the rivalry between England and Russia.”',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
          }
        },
        {
          id: 'q10',
          text: 'Meanwhile, the shah was earnestly proceeding with his plans. He had given orders for the construction of warehouses, wharves, and telegraph houses on the Karun, sending troops to secure the roads northwards.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
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
            value: { d: '1888-05-25' },
            cites: [
              {
                source: 'iranica-shahnavaz-karun-river-opening',
                loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On 25 May 1888 the proclamation was promulgated and officially communicated to foreign missions and Iranian officials.',
        lang: 'en',
        cite: {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1888-10-24' },
            cites: [
              {
                source: 'iranica-shahnavaz-karun-river-opening',
                loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '25' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The previous day Wolff had already given the following “Assurance”: “In the event of any power making an attack without a just cause or provocation on Persia . . . Her Majesty’s Government engages to make earnest representations against such proceedings and to take such steps as may in their judgment be best calculated to prevent any infringement of the integrity of Persia . . .” (Tehran, 24 October 1888 (enclosure 3, ibid.).',
        lang: 'en',
        cite: {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '25' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1888-10-28' },
            cites: [
              {
                source: 'iranica-shahnavaz-karun-river-opening',
                loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '29' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Even before the circular had reached the Russian Legation, its Charge d’Affaires had protested against the proclamation',
        lang: 'en',
        cite: {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '29' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1888-10-30' },
            cites: [
              {
                source: 'iranica-shahnavaz-karun-river-opening',
                loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '27' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On 30 October, the following proclamation, in the form of an official “circular,” was sent to all foreign representatives in the capital: “The Persian Government . . . has ordered that commercial steamers of all nations, without exception . . . undertake the transport of merchandize in the Karun River from Muhammareh to the dyke at Ahvaz . . . from the dykes upwards the river navigation is reserved to the Persian Government itself and its subjects . . .” (The Persian Minister of Foreign Affairs to Wolff, Tehran, 24 Safar 1306 [30 October 1888], trans.;',
        lang: 'en',
        cite: {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '27' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1888-10-30' },
            cites: [
              {
                source: 'iranica-shahnavaz-karun-river-opening',
                loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On 30 October a steam launch owned by Mackenzie & Co. was dispatched from Basra to the Karun as a pioneer and to establish the right of way, and it was followed by the Lynch Brothers steamer which belonged to the Euphrates and Tigris Steam Navigation Co. and had been prepared and dispatched in just three days (Saldana, p. 28).',
        lang: 'en',
        cite: {
          source: 'iranica-shahnavaz-karun-river-opening',
          loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '26' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
        }
      }
    }
  ]
})
