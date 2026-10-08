import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iran-hostage-crisis',
  names: [
    { text: 'Iran hostage crisis', lang: 'en', role: 'primary' },
    {
      text: 'بحران گروگان‌گیری',
      lang: 'fa',
      role: 'native',
      translit: 'Bohrān-e gorugān-giri'
    },
    {
      text: 'تسخیر سفارت آمریکا',
      lang: 'fa',
      role: 'alternative',
      translit: 'Taskhir-e sefārat-e Āmrikā'
    },
    {
      text: 'den of spies',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '67' }
        }
      ]
    },
    {
      text: 'Embassy takeover',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'frus-1977-80-v11p1-iran-hostage-crisis-november-1979-september-1980',
          loc: {
            section: 'Document 1. Memorandum From the President’s Assistant for National Security Affairs (Brzezinski) to President Carter'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1979-11-04' },
        cites: [
          {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '15' }
          },
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '67' }
          },
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1979' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1981-01-20' },
        cites: [
          {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '50' }
          },
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1981' }
          },
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '67' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'north-america'],
  prominence: 1,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '15' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'students',
      name: 'Muslim Students Following the Line of Imam',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '15' }
        }
      ]
    },
    {
      key: 'us',
      name: 'United States',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '15' }
        }
      ],
      polity: 'polity:united-states'
    }
  ],
  participants: [
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      side: 'students',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '16' }
        },
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '67' }
        }
      ]
    },
    {
      name: 'Ebrahim Asgharzadeh',
      role: 'organizer',
      side: 'students',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '17' }
        }
      ]
    },
    {
      name: 'Mohsen Mirdamadi',
      role: 'organizer',
      side: 'students',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '17' }
        }
      ]
    },
    {
      ref: 'person:jimmy-carter',
      role: 'head-of-state',
      side: 'us',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '21' }
        },
        {
          source: 'frus-1977-80-v11p1-iran-hostage-crisis-november-1979-september-1980',
          loc: { section: 'Document 7. Letter From President Carter to Ayatollah Khomeini' }
        }
      ]
    },
    {
      ref: 'person:mehdi-bazargan',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '19' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The New Constitution', para: '5' }
        }
      ]
    },
    {
      ref: 'person:abolhassan-banisadr',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '20' }
        }
      ]
    },
    {
      ref: 'person:sadegh-ghotbzadeh',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '32' }
        }
      ]
    },
    {
      name: 'Bruce Laingen',
      role: 'victim',
      side: 'us',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '15' }
        },
        {
          source: 'frus-1977-80-v11p1-iran-hostage-crisis-november-1979-september-1980',
          loc: {
            section: 'Document 1. Memorandum From the President’s Assistant for National Security Affairs (Brzezinski) to President Carter'
          }
        }
      ]
    },
    {
      name: 'Zbigniew Brzezinski',
      role: 'diplomat',
      side: 'us',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '9' }
        }
      ]
    },
    {
      name: 'Cyrus Vance',
      role: 'diplomat',
      side: 'us',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '11' }
        }
      ]
    },
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'participant',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '66' }
        },
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '12' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      side: 'students',
      value: {
        alts: [
          {
            value: { min: 300, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-mohsen-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '15' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Mohsen M. Milani' }
            ]
          }
        ]
      }
    },
    {
      key: 'prisoners',
      value: {
        alts: [
          {
            value: { min: 66 },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1979' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:iranian-revolution',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '2' }
        },
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '68' }
        }
      ]
    },
    {
      ref: 'event:constitution-of-the-islamic-republic-1979',
      rel: 'related',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '5' }
        },
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '29' }
        }
      ]
    },
    {
      ref: 'event:1953-iranian-coup',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '1' }
        },
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '66' }
        }
      ]
    },
    { ref: 'event:algiers-agreement-1975', rel: 'related' },
    {
      ref: 'event:algiers-accords-and-release-of-the-us-hostages',
      rel: 'followed-by',
      cites: [
        {
          source: 'state-dept-short-history-end-to-hostage-crisis',
          loc: { section: 'An End to the Hostage Crisis', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:islamic-republic-of-iran' },
    { ref: 'polity:united-states' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Iran_hostage_crisis_-_November_1979.jpg/1280px-Iran_hostage_crisis_-_November_1979.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Iran_hostage_crisis_-_November_1979.jpg',
    credit: { institution: 'Islamic Revolution Document Center (irdc.ir)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'HOSTAGE CRISIS, the events following the seizure of the American embassy in Tehran by leftist Islamist students in 1979 with subsequent wide-ranging repercussions on Iran’s domestic politics as well as on U.S.-Iran relations. The crisis began on 4 November 1979, nine months after Moḥammad-Reżā Shah Pahalvi (r. 1941-79) had been overthrown and exiled and two weeks after he had been admitted to the U.S. for medical treatment, when some 300 leftist Islamist students stormed the embassy and took all personnel hostage.',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q2',
          text: 'The embassy takeover developed into a momentous crisis that lasted 444 long days; it affected Iran’s destiny for decades.',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The hostage crisis took place in a sensitive period, when Iran was in revolutionary chaos and the direction of its revolution not clearly defined. Diametrically opposed groups were engaged in a ferocious power struggle. The hostage crisis intensified this power struggle.',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q4',
          text: 'The conciliatory policy of the United States government toward the exiled shah weakened Bāzargān and precipitated the hostage crisis.',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q6',
          text: 'The Office for Consolidation of Unity, then an obscure and small Islamic organization, took this rhetoric to an extreme. After pictures appeared in Iranian newspapers of Bāzargān and his foreign minister Yazdi shaking hands with U.S. National Security Advisor Brzezinski in Algeria on 1 November 1979, half a dozen of the top leaders of the Office for Consolidation of Unity met secretly to plan the attack on the American Embassy in Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'On that day, some 300 militant students stormed and occupied the U.S. Embassy. Calling themselves the Muslim Students Following the Line of Imam [Khomeini] (Dānešjuyān-e mosalmān-e payrov-e ḵaṭṭ-e emām), they took the personnel hostage and started a major international crisis.',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q8',
          text: 'According to reports from Embassy Tehran, an estimated 3,000 Iranian student demonstrators occupied the Embassy this morning. Although they did not brandish any weapons and professed to be engaged in a peaceful sit-in demonstration, the students penetrated the security barricades within the Embassy and have apparently taken the Embassy duty personnel hostage, tying their hands behind their backs and moving them from the inner area of the Embassy.',
          lang: 'en',
          cite: {
            source: 'frus-1977-80-v11p1-iran-hostage-crisis-november-1979-september-1980',
            loc: {
              section: 'Document 1. Memorandum From the President’s Assistant for National Security Affairs (Brzezinski) to President Carter'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v11p1/d1'
          }
        },
        {
          id: 'q10',
          text: 'Bāzargān steadfastly condemned the takeover as a violation of international law and civilized diplomacy. He demanded the immediate and unconditional release of the hostages, denouncing the militants for placing Iran on a dangerous collision course with the U.S.',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q13',
          text: 'The Majles approved the four conditions set by Khomeini on November 2, but in greater detail, appointing seven deputies with Behzād Nabavi, a leading radical, as the chief negotiator to manage the secret negotiations. Secretary of State Edmund Muskie agreed in principle with the four conditions. The resulting negotiations produced the Algiers Agreement, which led to the release of the hostages',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '48' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q15',
          text: 'As a result of the hostage crisis, the Islamic Republic emerged with an institutionalized infrastructure and with the followers of Khomeini in full control. The hostage crisis, which placed Iran and the U. S. on a dangerous collision course, was certainly a major contributing factor in Saddam Hossein’s impudent decision to invade Iran in September 1980.',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '56' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q16',
          text: 'The hostage crisis served as an effective tool for the Islamist followers of Khomeini to consolidate the Islamic Republic and create a new Islamic order. Iran as a county, however, suffered from the hostage crisis; its international reputation, prestige, and national interests were gravely damaged, and it became entangled in a bloody war with Iraq.',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '61' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
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
            value: { d: '1979-10-22' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '66' }
              },
              {
                source: 'iranica-mohsen-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'On 22 October 1979, the shah arrived unannounced in New York City for medical treatment at the Cornell Medical Center.',
        lang: 'en',
        cite: {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-11-04' },
            cites: [
              {
                source: 'iranica-mohsen-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '15' }
              },
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '67' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'By way of reaction, on 4 November, a large group of students styling themselves “Students Following the Line of the Imam” (Dānešjuyān-e peyrow-e ḵaṭṭ-e Emām) scaled the walls of the embassy and took its personnel hostage, demanding that the shah be extradited to Iran.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '67' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-11-06' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '68' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'Another was the resignation of Bāzargān and his cabinet. He had been reluctant to accept the premiership in the first place, but, after a brief consultation with Khomeini on 4 February 1979, he had given his agreement. Already on 1 July, he had offered to resign, but was persuaded to stay on; four members of the Revolutionary Council (Rafsanjāni, Bāhonar, Mahdavi-Kani, and Khamenei) joined Bāzargān’s cabinet in an effort to improve coordination of the two bodies. Now, on 6 November, his resignation was unhesitatingly accepted.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '68' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-11-14' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1979' }
              },
              {
                source: 'iranica-mohsen-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '27' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'On 14 November, President Carter signed an executive order freezing all assets, properties, and bank accounts of the Iranian government in the U.S.',
        lang: 'en',
        cite: {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '27' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-11-18' },
            cites: [
              {
                source: 'iranica-mohsen-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'The first break in the conflict occurred when Ayatollah Khomeini released thirteen female and African-American hostages on 18 and 19 November 1979 (see Table 2).',
        lang: 'en',
        cite: {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '28' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-12-04' },
            cites: [
              {
                source: 'iranica-mohsen-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '33' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q24',
        text: 'On 4 December 1979, the U.N. Security Council unanimously passed Resolution 457, demanding the immediate release of the hostages and calling upon Iran and the U.S. to resolve their differences peacefully.',
        lang: 'en',
        cite: {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '33' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-04-07' },
            cites: [
              {
                source: 'iranica-mohsen-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '38' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q25',
        text: 'As diplomatic initiatives continued to fail, the U.S. finally resorted to military measures. This second phase of the hostage ordeal began when the U.S. officially broke off diplomatic relations with Iran on 7 April 1980, a move Secretary Vance opposed',
        lang: 'en',
        cite: {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '38' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-04-24' },
            cites: [
              {
                source: 'iranica-mohsen-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '40' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The rescue mission was aborted, however, during the first phase of the operation after three helicopters malfunctioned. In the rush to depart, one helicopter collided with a transport plane, killing eight American soldiers',
        lang: 'en',
        cite: {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '40' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-07-27' },
            cites: [
              {
                source: 'iranica-mohsen-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '45' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q27',
        text: 'Two important events changed the calculus of the hostage crisis. Firstly, on 27 July 1980, Moḥammad-Reżā Shah Pahlavi died in Egypt.',
        lang: 'en',
        cite: {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '45' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-09-12' },
            cites: [
              {
                source: 'iranica-mohsen-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '47' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q28',
        text: 'On September 12th, 1980, Ayatollah Khomeini declared four conditions for the resolution of the crisis: (1) the return of the shah’s wealth to Iran; (2) cancellation of all financial claims against Iran; (3) a pledge of military and political non-interference in Iran; and (4) the release of Iranian assets.',
        lang: 'en',
        cite: {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '47' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-01-20' },
            cites: [
              {
                source: 'iranica-mohsen-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '50' }
              },
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1981' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q29',
        text: 'Less than one hour after the Reagan’s inauguration, three Algerian aircraft took to the skies, taking all hostages to freedom.',
        lang: 'en',
        cite: {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '50' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'ebtekar-2001-takeover-in-tehran', perspective: 'iranian' }
  ]
})
