import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iran-contra-affair',
  names: [
    { text: 'Iran–Contra affair', lang: 'en', role: 'primary' },
    { text: 'ماجرای ایران-کنترا', lang: 'fa', role: 'native' },
    {
      text: 'McFarlane affair',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'nara-text-message-2021-08-17-iran-contra-affair-faded-in-time',
          loc: { section: 'The Iran-Contra Affair: Faded in Time, but not Forgotten', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1985-08' },
        cites: [
          {
            source: 'iranica-byrne-iran-contra-affairs',
            loc: { section: 'IRAN-CONTRA AFFAIRS', para: '10' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1986-11-03' },
        cites: [
          {
            source: 'iranica-byrne-iran-contra-affairs',
            loc: { section: 'IRAN-CONTRA AFFAIRS', para: '23' }
          },
          {
            source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
            loc: { section: 'Chronology of Key Public Events', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'north-america', 'latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '20' }
        }
      ]
    },
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'walsh-1993-final-report-iran-contra-executive-summary',
          loc: { section: 'Executive Summary', para: '24' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'walsh-1993-final-report-iran-contra-executive-summary',
          loc: { section: 'Executive Summary', para: '24' }
        }
      ]
    },
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '3' }
        }
      ]
    },
    {
      ref: 'polity:state-of-israel',
      cites: [
        {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '5' }
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
          source: 'walsh-1993-final-report-iran-contra-executive-summary',
          loc: { section: 'Executive Summary', para: '24' }
        }
      ]
    },
    {
      key: 'iran',
      name: 'Iran',
      polity: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '3' }
        }
      ]
    },
    {
      key: 'israel',
      name: 'Israel',
      polity: 'polity:state-of-israel',
      cites: [
        {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ronald-reagan',
      role: 'leader',
      side: 'us',
      cites: [
        {
          source: 'walsh-1993-final-report-iran-contra-executive-summary',
          loc: { section: 'Executive Summary', para: '19' }
        }
      ]
    },
    {
      name: 'Robert C. McFarlane',
      role: 'negotiator',
      side: 'us',
      cites: [
        {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '20' }
        }
      ]
    },
    {
      name: 'Oliver L. North',
      role: 'organizer',
      side: 'us',
      cites: [
        {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '6' }
        }
      ]
    },
    {
      ref: 'person:akbar-hashemi-rafsanjani',
      role: 'participant',
      side: 'iran',
      cites: [
        {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '7' }
        }
      ]
    },
    {
      name: 'Manuchehr Ghorbanifar',
      role: 'negotiator',
      side: 'iran',
      cites: [
        {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '7' }
        }
      ]
    },
    {
      name: 'Shimon Peres',
      role: 'participant',
      side: 'israel',
      cites: [
        {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '8' }
        }
      ]
    },
    {
      name: 'Lawrence E. Walsh',
      role: 'participant',
      cites: [
        {
          source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
          loc: { section: 'Chronology of Key Public Events', para: '11' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iran-iraq-war',
      rel: 'related',
      cites: [
        {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '3' }
        }
      ]
    },
    {
      ref: 'event:iran-hostage-crisis',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '4' }
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
          text: 'Called many names from the Iran-Contra Scandal to the McFarlane affair (after National Security Advisor under President Ronald Reagan Robert McFarlane) to simply Iran Contra, the Iran-Contra affair involved United States officials illegally funding Central American rebels and violating an arms embargo on Iran while it was at war with Iraq.',
          lang: 'en',
          cite: {
            source: 'nara-text-message-2021-08-17-iran-contra-affair-faded-in-time',
            loc: { section: 'The Iran-Contra Affair: Faded in Time, but not Forgotten', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://text-message.blogs.archives.gov/2021/08/17/iran-contra-affair/'
          }
        },
        {
          id: 'q2',
          text: 'The Iran and contra operations were merged when funds generated from the sale of weapons to Iran were diverted to support the contra effort in Nicaragua.',
          lang: 'en',
          cite: {
            source: 'walsh-1993-final-report-iran-contra-executive-summary',
            loc: { section: 'Executive Summary', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://irp.fas.org/offdocs/walsh/execsum.htm'
          }
        },
        {
          id: 'q3',
          text: 'These operations became linked when funds generated by the sale of weapons to Iran were diverted to help finance the so-called Contra war in Nicaragua.',
          lang: 'en',
          cite: {
            source: 'iranica-byrne-iran-contra-affairs',
            loc: { section: 'IRAN-CONTRA AFFAIRS', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q5',
          text: 'For Iran’s part, Iraq’s invasion in September 1980 threatened the country’s independence and created a chronic need to acquire military supplies for its largely U.S.-equipped armed forces. Having exploited the international black market, the regime ultimately was forced to turn in secret to its avowed enemies, Israel and the United States',
          lang: 'en',
          cite: {
            source: 'iranica-byrne-iran-contra-affairs',
            loc: { section: 'IRAN-CONTRA AFFAIRS', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
          }
        },
        {
          id: 'q6',
          text: 'The Iran operation involved efforts in 1985 and 1986 to obtain the release of Americans held hostage in the Middle East through the sale of U.S. weapons to Iran, despite an embargo on such sales.',
          lang: 'en',
          cite: {
            source: 'walsh-1993-final-report-iran-contra-executive-summary',
            loc: { section: 'Executive Summary', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://irp.fas.org/offdocs/walsh/execsum.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'From August 1985 to November 1986, seven shipments of military equipment were delivered to Iran, originating from the United States or Israel. Iran received a total of 2,004 TOW and 18 HAWK missiles plus over 200 spare HAWK parts, as a result of which three American hostages gained their freedom.',
          lang: 'en',
          cite: {
            source: 'iranica-byrne-iran-contra-affairs',
            loc: { section: 'IRAN-CONTRA AFFAIRS', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
          }
        },
        {
          id: 'q8',
          text: 'Their purpose was to establish direct contact with senior Iranian officials, including Rafsanjani, but once again their expectations were dashed.',
          lang: 'en',
          cite: {
            source: 'iranica-byrne-iran-contra-affairs',
            loc: { section: 'IRAN-CONTRA AFFAIRS', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
          }
        },
        {
          id: 'q9',
          text: 'One significant benefit for the American side did result, however.',
          lang: 'en',
          cite: {
            source: 'iranica-byrne-iran-contra-affairs',
            loc: { section: 'IRAN-CONTRA AFFAIRS', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q10',
          text: 'Khomeini himself ensured that there would be no broader recriminations from the initiative, although some reports indicated the disclosure affected the political succession after his death.',
          lang: 'en',
          cite: {
            source: 'iranica-byrne-iran-contra-affairs',
            loc: { section: 'IRAN-CONTRA AFFAIRS', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
          }
        },
        {
          id: 'q11',
          text: 'The joining of these two operations was made public on November 25, 1986, when Attorney General Meese announced that Justice Department officials had discovered that some of the proceeds from the Iran arms sales had been diverted to the contras.',
          lang: 'en',
          cite: {
            source: 'walsh-1993-final-report-iran-contra-executive-summary',
            loc: { section: 'Executive Summary', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://irp.fas.org/offdocs/walsh/execsum.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q12',
          text: 'The investigations and prosecutions have shown that high-ranking Administration officials violated laws and executive orders in the Iran/contra matter.',
          lang: 'en',
          cite: {
            source: 'walsh-1993-final-report-iran-contra-executive-summary',
            loc: { section: 'Executive Summary', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://irp.fas.org/offdocs/walsh/execsum.htm'
          }
        },
        {
          id: 'q13',
          text: 'In the aftermath of the Iran-Contra affair, Oliver North and Reagan’s National Security Advisor John Poindexter’s convictions were overturned on technicalities.',
          lang: 'en',
          cite: {
            source: 'nara-text-message-2021-08-17-iran-contra-affair-faded-in-time',
            loc: { section: 'The Iran-Contra Affair: Faded in Time, but not Forgotten', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://text-message.blogs.archives.gov/2021/08/17/iran-contra-affair/'
          }
        },
        {
          id: 'q14',
          text: 'In the United States, the scandal created major political difficulties for President Reagan and led to criminal proceedings against several of his advisers. U.S. credibility overseas suffered, particularly in the Arab world. However, it remains an open question whether the arms-for-hostages deals ultimately had any effect on prospects for a future opening in U.S.-Iran relations',
          lang: 'en',
          cite: {
            source: 'iranica-byrne-iran-contra-affairs',
            loc: { section: 'IRAN-CONTRA AFFAIRS', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
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
            value: { d: '1985-07' },
            cites: [
              {
                source: 'iranica-byrne-iran-contra-affairs',
                loc: { section: 'IRAN-CONTRA AFFAIRS', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The catalyst for the arms deals emerged in July 1985, when Israel informed the U.S. that certain circles within Iran were open to re-establishing contacts with the United States',
        lang: 'en',
        cite: {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1985-08' },
            cites: [
              {
                source: 'iranica-byrne-iran-contra-affairs',
                loc: { section: 'IRAN-CONTRA AFFAIRS', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The August shipment consisted of 96 TOW (tube-launched, optically-tracked, wire-guided) anti-tank missiles, packed in pallets of 12 apiece. They arrived without incident in Tehran in an unmarked Israeli DC-8 aircraft.',
        lang: 'en',
        cite: {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-01-17' },
            cites: [
              {
                source: 'iranica-byrne-iran-contra-affairs',
                loc: { section: 'IRAN-CONTRA AFFAIRS', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On 17 January 1986, President Reagan signed a new finding authorizing continuation of the activity under American auspices and specifying, among other things, the goal of establishing contact with “moderate elements” in Iran',
        lang: 'en',
        cite: {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-05' },
            cites: [
              {
                source: 'iranica-byrne-iran-contra-affairs',
                loc: { section: 'IRAN-CONTRA AFFAIRS', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'In May 1986, a U.S. delegation including McFarlane, North, a CIA Iran expert, and Amiram Nir made a dramatic journey to Tehran. Reflecting the high risks involved, they carried Irish passports issued under false names and were sequestered on an isolated floor in the former Hilton Hotel.',
        lang: 'en',
        cite: {
          source: 'iranica-byrne-iran-contra-affairs',
          loc: { section: 'IRAN-CONTRA AFFAIRS', para: '20' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/iran-contra-affairs'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-10-05' },
            cites: [
              {
                source: 'walsh-1993-final-report-iran-contra-executive-summary',
                loc: { section: 'Executive Summary', para: '27' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'The first occurred on October 5, 1986, when Nicaraguan government soldiers shot down an American cargo plane that was carrying military supplies to contra forces; the one surviving crew member, American Eugene Hasenfus, was taken into captivity and stated that he was employed by the CIA.',
        lang: 'en',
        cite: {
          source: 'walsh-1993-final-report-iran-contra-executive-summary',
          loc: { section: 'Executive Summary', para: '27' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://irp.fas.org/offdocs/walsh/execsum.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-11-03' },
            cites: [
              {
                source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
                loc: { section: 'Chronology of Key Public Events', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'Nov. 3, 1986: Lebanese newspaper Al-Shiraa reports that the United States secretly sold arms to Iran.',
        lang: 'en',
        cite: {
          source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
          loc: { section: 'Chronology of Key Public Events', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://irp.fas.org/offdocs/walsh/chron.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-11-13' },
            cites: [
              {
                source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
                loc: { section: 'Chronology of Key Public Events', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'Nov. 13, 1986: President Reagan acknowledges weapons were sold to Iran but denies that the arms were sold to win the release of American hostages.',
        lang: 'en',
        cite: {
          source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
          loc: { section: 'Chronology of Key Public Events', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://irp.fas.org/offdocs/walsh/chron.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-11-25' },
            cites: [
              {
                source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
                loc: { section: 'Chronology of Key Public Events', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'Nov. 25, 1986: White House discloses contra diversion from the Iran arms sales.',
        lang: 'en',
        cite: {
          source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
          loc: { section: 'Chronology of Key Public Events', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://irp.fas.org/offdocs/walsh/chron.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1986-12-19' },
            cites: [
              {
                source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
                loc: { section: 'Chronology of Key Public Events', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'Dec. 19, 1986: Walsh appointed Independent Counsel.',
        lang: 'en',
        cite: {
          source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
          loc: { section: 'Chronology of Key Public Events', para: '11' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://irp.fas.org/offdocs/walsh/chron.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1987-02-26' },
            cites: [
              {
                source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
                loc: { section: 'Chronology of Key Public Events', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q24',
        text: 'Feb. 26, 1987: Tower Commission issues Iran/contra report.',
        lang: 'en',
        cite: {
          source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
          loc: { section: 'Chronology of Key Public Events', para: '16' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://irp.fas.org/offdocs/walsh/chron.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1987-03-04' },
            cites: [
              {
                source: 'reagan-library-1987-03-04-address-iran-arms-and-contra-aid-controversy',
                loc: {
                  section: 'Address to the Nation on the Iran Arms and Contra Aid Controversy March 4, 1987',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q25',
        text: 'A few months ago I told the American people I did not trade arms for hostages. My heart and my best intentions still tell me that\'s true, but the facts and the evidence tell me it is not.',
        lang: 'en',
        cite: {
          source: 'reagan-library-1987-03-04-address-iran-arms-and-contra-aid-controversy',
          loc: {
            section: 'Address to the Nation on the Iran Arms and Contra Aid Controversy March 4, 1987',
            para: '7'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.reaganlibrary.gov/archives/speech/address-nation-iran-arms-and-contra-aid-controversy-0'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1987-11-18' },
            cites: [
              {
                source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
                loc: { section: 'Chronology of Key Public Events', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q26',
        text: 'Nov. 18, 1987: Congress issues Iran/contra report.',
        lang: 'en',
        cite: {
          source: 'walsh-1993-final-report-iran-contra-chronology-of-key-public-events',
          loc: { section: 'Chronology of Key Public Events', para: '26' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://irp.fas.org/offdocs/walsh/chron.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Photograph_of_President_Reagan_receiving_the_Tower_Commission_Report_in_the_Cabinet_Room_-_NARA_-_198581.jpg/1280px-Photograph_of_President_Reagan_receiving_the_Tower_Commission_Report_in_the_Cabinet_Room_-_NARA_-_198581.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Photograph_of_President_Reagan_receiving_the_Tower_Commission_Report_in_the_Cabinet_Room_-_NARA_-_198581.jpg',
    credit: { institution: 'U.S. National Archives and Records Administration' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'segev-1988-the-iranian-triangle', perspective: 'israeli' },
    { source: 'de-bock-deniau-1988-des-armes-pour-l-iran', perspective: 'european' }
  ]
})
