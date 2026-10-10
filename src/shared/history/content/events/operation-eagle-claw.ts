import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'operation-eagle-claw',
  names: [
    { text: 'Operation Eagle Claw', lang: 'en', role: 'primary' },
    { text: 'ماجرای طبس', lang: 'fa', role: 'native' },
    { text: 'Desert One', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-10',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1980-04-24' },
        cites: [
          {
            source: 'carter-1980-04-25-statement-on-the-iran-rescue-mission',
            loc: { section: 'April 25, 1980: Statement on the Iran Rescue Mission', para: '2' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '7' }
          }
        ]
      },
      {
        value: { d: '1980-05' },
        cites: [
          {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '21' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Mohsen M. Milani' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1980-04-25' },
        cites: [
          {
            source: 'state-dept-frus-1977-80-v11p1-d269-editorial-note',
            loc: { section: '269. Editorial Note', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:tabas',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '39' }
        }
      ]
    },
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '39' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'event:iran-hostage-crisis',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '38' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '38' }
        }
      ]
    },
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '41' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'us',
      name: 'United States',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '38' }
        }
      ]
    },
    {
      key: 'iran',
      name: 'Iran',
      polity: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '41' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:jimmy-carter',
      role: 'leader',
      side: 'us',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '38' }
        }
      ]
    },
    {
      name: 'Charles A. Beckwith',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '39' }
        }
      ]
    },
    {
      name: 'Cyrus Vance',
      role: 'diplomat',
      side: 'us',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '38' }
        }
      ]
    },
    {
      name: 'Zbigniew Brzezinski',
      role: 'participant',
      side: 'us',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '38' }
        }
      ]
    },
    {
      name: 'Bruce Laingen',
      role: 'witness',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '42' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'military-deaths',
      side: 'us',
      value: {
        alts: [
          {
            value: { min: 8 },
            cites: [
              {
                source: 'iranica-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '40' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BANI SADR PRESIDENCY', para: '7' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:iran-hostage-crisis',
      rel: 'related',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '21' }
        }
      ]
    },
    {
      ref: 'event:algiers-accords-and-release-of-the-us-hostages',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '43' }
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
          text: 'In April the United States attempted to rescue the hostages by secretly landing aircraft and troops near Tabas, along the Dasht-e Kavir desert in eastern Iran.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iran/25.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'As diplomatic initiatives continued to fail, the U.S. finally resorted to military measures.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q3',
          text: 'Algeria and Switzerland agreed to represent the interests of Iran and the U.S., respectively.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Plans for a rescue had been originally initiated immediately following the takeover of the embassy',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q5',
          text: 'Based on this vital intelligence, 8 helicopters were to fly from the aircraft carrier Nimitz in the Gulf of Oman to Ṭabas, about 280 miles southeast of Tehran. They would be joined by six C-130 Hercules transport aircraft carrying ninety rescue personnel.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q6',
          text: 'In the rush to depart, one helicopter collided with a transport plane, killing eight American soldiers',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '40' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The astonishing ease with which the U.S. had penetrated Iranian air space was embarrassing to the Islamic Republic.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q8',
          text: 'After the failed rescue attempt, Vance resigned in protest',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q9',
          text: 'On April 28, Carter accepted the resignation of Secretary of State Cyrus Vance “with regret.”',
          lang: 'en',
          cite: {
            source: 'state-dept-frus-1977-80-v11p1-d269-editorial-note',
            loc: { section: '269. Editorial Note', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v11p1/d269'
          }
        },
        {
          id: 'q10',
          text: 'After the failed rescue attempt, the militant students dispersed the hostages, insisting they would not be released until all their demands were met.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
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
            value: { d: '1980-04-07' },
            cites: [
              {
                source: 'iranica-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '38' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'This second phase of the hostage ordeal began when the U.S. officially broke off diplomatic relations with Iran on 7 April 1980, a move Secretary Vance opposed',
        lang: 'en',
        cite: {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '38' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-04-11' },
            cites: [
              {
                source: 'iranica-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '38' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'This general plan was approved by the president in a special National Security Council meeting on 11 April 1980.',
        lang: 'en',
        cite: {
          source: 'iranica-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '38' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-04-25' },
            cites: [
              {
                source: 'state-dept-frus-1977-80-v11p1-d269-editorial-note',
                loc: { section: '269. Editorial Note', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On April 25, 1980, the White House issued a short statement on the failed hostage rescue attempt.',
        lang: 'en',
        cite: {
          source: 'state-dept-frus-1977-80-v11p1-d269-editorial-note',
          loc: { section: '269. Editorial Note', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://history.state.gov/historicaldocuments/frus1977-80v11p1/d269'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-05-09' },
            cites: [
              {
                source: 'state-dept-frus-1977-80-v11p1-d269-editorial-note',
                loc: { section: '269. Editorial Note', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Carter delivered the eulogy at their burials at Arlington National Cemetery on May 9.',
        lang: 'en',
        cite: {
          source: 'state-dept-frus-1977-80-v11p1-d269-editorial-note',
          loc: { section: '269. Editorial Note', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://history.state.gov/historicaldocuments/frus1977-80v11p1/d269'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Eagle_Claw_wrecks_at_Desert_One.png',
    page: 'https://commons.wikimedia.org/wiki/File:Eagle_Claw_wrecks_at_Desert_One.png',
    credit: { institution: 'United States Special Operations Command' },
    license: { id: 'public-domain' }
  }
})
