import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russo-georgian-war',
  names: [
    { text: 'Russo-Georgian War', lang: 'en', role: 'primary' },
    {
      text: 'Five-day war',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
          loc: { section: 'The Conflict in Georgia in August 2008', para: '17' }
        }
      ]
    },
    {
      text: 'Peace enforcement operation',
      lang: 'en',
      role: 'contested',
      cites: [
        {
          source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
          loc: { section: 'The Conflict in Georgia in August 2008', para: '18' }
        }
      ],
      usedBy: [
        { kind: 'state', name: 'Russia' }
      ]
    },
    {
      text: 'Aggression',
      lang: 'en',
      role: 'contested',
      cites: [
        {
          source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
          loc: { section: 'The Conflict in Georgia in August 2008', para: '18' }
        }
      ],
      usedBy: [
        { kind: 'state', name: 'Georgia' }
      ]
    }
  ],
  researched: '2026-10-12',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '2008-08-07' },
        cites: [
          {
            source: 'iiffmcg-2009-report-volume-i-introduction',
            loc: { section: 'The Conflict in Georgia in August 2008' }
          },
          {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '14' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '2008-08-12' },
        cites: [
          {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '18' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:tskhinvali',
      cites: [
        {
          source: 'iiffmcg-2009-report-volume-i-introduction',
          loc: { section: 'The Conflict in Georgia in August 2008' }
        }
      ]
    },
    {
      ref: 'place:tbilisi',
      cites: [
        {
          source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
          loc: { section: 'The Conflict in Georgia in August 2008', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'georgia',
      name: 'Georgia',
      cites: [
        {
          source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
          loc: { section: 'The Conflict in Georgia in August 2008', para: '14' }
        }
      ]
    },
    {
      key: 'russia',
      name: 'Russia',
      cites: [
        {
          source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
          loc: { section: 'The Conflict in Georgia in August 2008', para: '2' }
        }
      ]
    },
    {
      key: 'south-ossetia-abkhazia',
      name: 'South Ossetian and Abkhaz forces',
      cites: [
        {
          source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
          loc: { section: 'The Conflict in Georgia in August 2008', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 850, qualifier: 'about' },
            cites: [
              {
                source: 'iiffmcg-2009-report-volume-i-introduction',
                loc: { section: 'The Conflict in Georgia in August 2008' }
              }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Independent International Fact-Finding Mission on the Conflict in Georgia'
              }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'georgia',
      value: {
        alts: [
          {
            value: { min: 170 },
            cites: [
              {
                source: 'iiffmcg-2009-report-volume-i-introduction',
                loc: { section: 'The Conflict in Georgia in August 2008' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Georgia' }
            ]
          }
        ]
      }
    },
    {
      key: 'civilian-deaths',
      side: 'georgia',
      value: {
        alts: [
          {
            value: { min: 228 },
            cites: [
              {
                source: 'iiffmcg-2009-report-volume-i-introduction',
                loc: { section: 'The Conflict in Georgia in August 2008' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Georgia' }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'russia',
      value: {
        alts: [
          {
            value: { min: 67 },
            cites: [
              {
                source: 'iiffmcg-2009-report-volume-i-introduction',
                loc: { section: 'The Conflict in Georgia in August 2008' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Russia' }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'south-ossetia-abkhazia',
      value: {
        alts: [
          {
            value: { min: 365 },
            cites: [
              {
                source: 'iiffmcg-2009-report-volume-i-introduction',
                loc: { section: 'The Conflict in Georgia in August 2008' }
              }
            ],
            heldBy: [
              { kind: 'participant', name: 'South Ossetian authorities' }
            ]
          }
        ]
      }
    },
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 135000, qualifier: 'about' },
            cites: [
              {
                source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
                loc: { section: 'The Conflict in Georgia in August 2008', para: '28' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:kosovo-war',
      rel: 'related',
      cites: [
        {
          source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
          loc: { section: 'The Conflict in Georgia in August 2008', para: '35' }
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
          text: 'On the night of 7 to 8 August 2008, after an extended period of ever-mounting tensions and incidents, heavy fighting erupted in and around the town of Tskhinvali in South Ossetia.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-introduction',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        },
        {
          id: 'q2',
          text: 'In a counter-movement, Russian armed forces, covered by air strikes and by elements of its Black Sea fleet, penetrated deep into Georgia, cutting across the country’s main east-west road, reaching the port of Poti and stopping short of Georgia’s capital city, Tbilisi.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Beyond the human dimension there is, of course, a historical and political background to the armed conflict of August 2008.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        },
        {
          id: 'q4',
          text: 'At the turn of the millennium it became apparent that the unresolved political status of South Ossetia and Abkhazia had become more difficult to manage and that there was no clear-cut solution in sight.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        },
        {
          id: 'q5',
          text: 'Another legal issue related to the conflict and to relations between Georgia and Russia is the Russian so-called “passportisation” policy, meaning the mass conferral of Russian citizenship and consequently passports to persons living in South Ossetia and Abkhazia, where a vast majority of the population are now carrying such Russian passports.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        },
        {
          id: 'q6',
          text: 'The ever-mounting tensions in the conflict zone were approaching the level of open military confrontation.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'Open hostilities began with a large-scale Georgian military operation against the town of Tskhinvali and the surrounding areas, launched in the night of 7 to 8 August 2008.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        },
        {
          id: 'q8',
          text: 'On 12 August, French President Nicolas Sarkozy, in his capacity as Chairman of the European Council, went to Moscow and Tbilisi in a move to stop the military hostilities.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q9',
          text: 'The August 2008 armed conflict unfortunately saw many crimes committed in violation of International Humanitarian Law and Human Rights Law.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q10',
          text: 'A six-point ceasefire plan was agreed upon, providing, inter alia, for the immediate cessation of hostilities and withdrawal of forces to the positions occupied prior to the armed conflict.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
          }
        },
        {
          id: 'q11',
          text: 'Adding to the severity of the situation, there was a considerable flow of internally displaced persons (IDPs) and refugees.',
          lang: 'en',
          cite: {
            source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
            loc: { section: 'The Conflict in Georgia in August 2008', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
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
            value: { d: '2008-08-07' },
            cites: [
              {
                source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
                loc: { section: 'The Conflict in Georgia in August 2008', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The fighting, which soon extended to other parts of Georgia, lasted for five days.',
        lang: 'en',
        cite: {
          source: 'iiffmcg-2009-report-volume-i-introduction',
          loc: { section: 'The Conflict in Georgia in August 2008', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008-08-08' },
            cites: [
              {
                source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
                loc: { section: 'The Conflict in Georgia in August 2008', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Russia claimed that in the morning of 8 August 2008 two Russian peacekeepers were killed and five wounded by the Georgian attacks on the peacekeepers’ premises in Tskhinvali.',
        lang: 'en',
        cite: {
          source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
          loc: { section: 'The Conflict in Georgia in August 2008', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008-08-12' },
            cites: [
              {
                source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
                loc: { section: 'The Conflict in Georgia in August 2008', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Russia called its military actions in Georgia a “peace enforcement operation”, while Georgia called it an “aggression”.',
        lang: 'en',
        cite: {
          source: 'iiffmcg-2009-report-volume-i-the-conflict-in-georgia-in-august-2008',
          loc: { section: 'The Conflict in Georgia in August 2008', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://rrc.ge/law/DaskvnTaliavin_20_09_2009_E.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Tskhinvali_battles_%288_August%29_%28en%29.svg',
    page: 'https://commons.wikimedia.org/wiki/File:Tskhinvali_battles_(8_August)_(en).svg',
    credit: { creator: 'Giorgi Balakhadze' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
