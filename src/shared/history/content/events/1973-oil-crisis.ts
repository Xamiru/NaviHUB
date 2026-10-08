import { defineEvent } from '../../schema'

export default defineEvent({
  id: '1973-oil-crisis',
  names: [
    { text: '1973 oil crisis', lang: 'en', role: 'primary' },
    {
      text: 'Oil Embargo, 1973–1974',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '0' }
        }
      ]
    },
    {
      text: 'Arab oil embargo',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-saudi-arabia-country-study-1992',
          loc: { section: 'The Reigns of Saud and Faisal', para: '27' }
        }
      ]
    },
    { text: 'أزمة النفط عام 1973', lang: 'ar', role: 'alternative' }
  ],
  researched: '2026-10-09',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1973-10-17' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'October 1973 War', para: '5' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1974-03' },
        cites: [
          {
            source: 'state-dept-milestones-oil-embargo',
            loc: { section: 'Oil Embargo, 1973–1974', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['global'],
  prominence: 1,
  places: [
    {
      ref: 'place:riyadh',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'October 1973 War', para: '5' }
        }
      ]
    },
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-pesaran-economy-pahlavi',
          loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '25' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'arab-opec',
      name: 'Arab members of OPEC',
      cites: [
        {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:richard-nixon',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '7' }
        }
      ]
    },
    {
      ref: 'person:henry-kissinger',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '7' }
        }
      ]
    },
    {
      name: 'King Faisal of Saudi Arabia',
      role: 'head-of-state',
      side: 'arab-opec',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'October 1973 War', para: '5' }
        }
      ]
    },
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-pesaran-economy-pahlavi',
          loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '31' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:yom-kippur-war',
      rel: 'caused-by',
      cites: [
        {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '1' }
        }
      ]
    },
    {
      ref: 'event:founding-of-opec',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '4' }
        }
      ]
    },
    {
      ref: 'event:tehran-agreement-1971',
      rel: 'preceded-by',
      cites: [
        {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:saudi-arabia',
      cites: [
        {
          source: 'loc-saudi-arabia-country-study-1992',
          loc: { section: 'The Reigns of Saud and Faisal', para: '27' }
        }
      ]
    },
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:pahlavi-iran',
      cites: [
        {
          source: 'iranica-pesaran-economy-pahlavi',
          loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '31' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Gas_station_attendants_peer_over_their_%22out_of_gas%22_sign_in_Portland_-_NARA_-_555434.jpg/1280px-Gas_station_attendants_peer_over_their_%22out_of_gas%22_sign_in_Portland_-_NARA_-_555434.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Gas_station_attendants_peer_over_their_"out_of_gas"_sign_in_Portland_-_NARA_-_555434.jpg',
    credit: {
      institution: 'U.S. National Archives and Records Administration',
      creator: 'David Falconer'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q7',
          text: 'During the 1973 Arab-Israeli War, Arab members of the Organization of Petroleum Exporting Countries (OPEC) imposed an embargo against the United States in retaliation for the U.S. decision to re-supply the Israeli military and to gain leverage in the post-war peace negotiations.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oil-embargo',
            loc: { section: 'Oil Embargo, 1973–1974', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/oil-embargo'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q8',
          text: 'By 1973, OPEC had demanded that foreign oil corporations increase prices and cede greater shares of revenue to their local subsidiaries.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oil-embargo',
            loc: { section: 'Oil Embargo, 1973–1974', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/oil-embargo'
          }
        },
        {
          id: 'q9',
          text: 'Having increased Saudi economic power, in July 1973 threatened to reduce oil deliveries if the United States did not seek to equalize its treatment of Egypt and Israel.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Reigns of Saud and Faisal', para: '27' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/saudi-arabia/11.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q10',
          text: 'The threat was realized during the October 1973 War between Israel and two Arab states when the Organization of Arab Petroleum Exporting Countries imposed a general rise in oil prices and an oil embargo on major oil consumers that were either supporters of Israel or allies of its supporters.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Reigns of Saud and Faisal', para: '27' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/saudi-arabia/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'The onset of the embargo contributed to an upward spiral in oil prices with global implications. The price of oil per barrel first doubled, then quadrupled, imposing skyrocketing costs on consumers and structural challenges to the stability of whole national economies. Since the embargo coincided with a devaluation of the dollar, a global recession seemed imminent.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oil-embargo',
            loc: { section: 'Oil Embargo, 1973–1974', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/oil-embargo'
          }
        },
        {
          id: 'q12',
          text: 'The embargo laid bare one of the foremost challenges confronting U.S. policy in the Middle East, that of balancing the contradictory demands of unflinching support for Israel and the preservation of close ties to the Arab oil-producing monarchies. The strains on U.S. bilateral relations with Saudi Arabia revealed the difficulty of reconciling those demands.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oil-embargo',
            loc: { section: 'Oil Embargo, 1973–1974', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/oil-embargo'
          }
        },
        {
          id: 'q13',
          text: 'The quadrupling of oil prices in 1973-1974 presented the regime with a golden opportunity to rationalize the development program and move toward a more balanced development of the agricultural/industrial and urban/rural sectors of the economy. The shah’s response, against expert and ministerial advice, was a further hasty expansion of the industrial sector with greater reliance on Western technology and cultural practices, foreign experts, and imported workers. Inevitably, these economic policies exacerbated already entrenched social and economic inequalities and helped create fertile grounds for the flourishing of social discontent and revolutionary upheavals.',
          lang: 'en',
          cite: {
            source: 'iranica-pesaran-economy-pahlavi',
            loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/economy-ix/'
          }
        },
        {
          id: 'q14',
          text: 'However, the oil price increases during 1973-74 dramatically reversed the situation virtually overnight and converted Persia from a debtor to a creditor country.',
          lang: 'en',
          cite: {
            source: 'iranica-pesaran-economy-pahlavi',
            loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/economy-ix/'
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
            value: { d: '1973-04' },
            cites: [
              {
                source: 'state-dept-milestones-oil-embargo',
                loc: { section: 'Oil Embargo, 1973–1974', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q1',
        text: 'In April, the Nixon administration announced a new energy strategy to boost domestic production to reduce U.S. vulnerability to oil imports and ease the strain of nationwide fuel shortages.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/oil-embargo'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-10-17' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'October 1973 War', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q2',
        text: 'On October 17 the Arab oil producers announced a program of reprisals against the Western backers of Israel: a 5 percent cutback in output, followed by further such reductions every month until Israel had withdrawn from all the occupied territories and the rights of the Palestinians had been restored.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'October 1973 War', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/41.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-10-18' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'October 1973 War', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q3',
        text: 'The following day, King Faisal of Saudi Arabia decreed an immediate 10 percent cutback in Saudi oil and, five days after that, the complete suspension of all shipments to the United States.',
        lang: 'en',
        cite: {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'October 1973 War', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/egypt/41.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-11-07' },
            cites: [
              {
                source: 'state-dept-milestones-oil-embargo',
                loc: { section: 'Oil Embargo, 1973–1974', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'Partly in response to these developments, on November 7 the Nixon administration announced Project Independence to promote domestic energy independence.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/oil-embargo'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1974-01-18' },
            cites: [
              {
                source: 'state-dept-milestones-oil-embargo',
                loc: { section: 'Oil Embargo, 1973–1974', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Initial discussions between Kissinger and Arab leaders began in November 1973 and culminated with the First Egyptian-Israeli Disengagement Agreement on January 18, 1974.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/oil-embargo'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1974-03' },
            cites: [
              {
                source: 'state-dept-milestones-oil-embargo',
                loc: { section: 'Oil Embargo, 1973–1974', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'the prospect of a negotiated end to hostilities between Israel and Syria proved sufficient to convince the relevant parties to lift the embargo in March 1974.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/oil-embargo'
        }
      }
    }
  ]
})
