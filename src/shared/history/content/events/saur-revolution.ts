import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'saur-revolution',
  names: [
    { text: 'Saur Revolution', lang: 'en', role: 'primary' },
    { text: 'انقلاب ثور', lang: 'fa', role: 'native', translit: 'Enqelāb-e Ṯawr' },
    {
      text: 'April Revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '5'
          }
        }
      ]
    },
    {
      text: 'April 1978 coup d’état',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'coup',
  start: {
    alts: [
      {
        value: { d: '1978-04-27' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
          }
        ]
      },
      {
        value: { d: '1978-04-28' },
        cites: [
          {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '4'
            }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:kabul',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '5'
          }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  sides: [
    {
      key: 'khalq',
      name: 'Khalq faction of the People’s Democratic Party of Afghanistan',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '3' }
        }
      ]
    },
    {
      key: 'daoud',
      name: 'Government of Mohammad Daoud',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '5' }
        },
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '4'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:nur-muhammad-taraki',
      role: 'leader',
      side: 'khalq',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
        },
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
        }
      ]
    },
    {
      ref: 'person:hafizullah-amin',
      role: 'commander',
      side: 'khalq',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '5' }
        }
      ]
    },
    {
      ref: 'person:babrak-karmal',
      role: 'participant',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '4'
          }
        }
      ]
    },
    {
      name: 'Mohammad Daoud Khan',
      role: 'victim',
      side: 'daoud',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '4'
          }
        },
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
        }
      ]
    },
    {
      ref: 'person:jimmy-carter',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '4'
          }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:soviet-invasion-of-afghanistan',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '5'
          }
        },
        {
          source: 'iranica-arnold-communism-in-afghanistan',
          loc: { section: 'COMMUNISM iv. In Afghanistan', para: '17' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Nur_Muhammad_Taraki_official_portrait_%28restored%29.png',
    page: 'https://commons.wikimedia.org/wiki/File:Nur_Muhammad_Taraki_official_portrait_(restored).png',
    credit: {
      institution: 'Zhwandoon magazine, 1970 (published anonymously; restored by Roman Kubanskiy)'
    },
    license: { id: 'cc-by-sa', version: '3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'With Muhammad Daud\'s death, the government of Afghanistan was run by a divided, dilettante Marxist clique that launched a train of events eventually leading to the disintegration of the state. They named their regime the Democratic Republic of Afghanistan (DRA).',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        },
        {
          id: 'q2',
          text: 'The Democratic Republic of Afghanistan was proclaimed and a revolutionary council was put in place with Nūr Moḥammad Tarakī at its head.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In the summer of 1973, Mohammed Daoud, the former Afghan Prime Minister, launched a successful coup against King Zahir. Although Daoud himself was more nationalist than socialist, his coup was dependent on pro-Soviet military and political factions.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
          }
        },
        {
          id: 'q4',
          text: 'Additionally, Daoud enjoyed the support of the People’s Democratic Party of Afghanistan (PDPA), founded in 1965 upon Marxist ideology and allegiance to Moscow. In 1967 the PDPA split into two factions: the Parchamists, led by Babrak Karmal (who supported Daoud), and the “Khalqis” led by Noor Taraki.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
          }
        },
        {
          id: 'q5',
          text: 'The left was rapidly disillusioned by Dāʾūd.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history/'
          }
        },
        {
          id: 'q6',
          text: 'The "Saur Revolution," as the new government grandiloquently labeled its coup d\'etat (after the month in the Islamic calendar in which it occurred), was almost entirely the achievement of the Khalq faction of the PDPA. This success gave it effective control over the armed forces, a great advantage over its Parchami rival.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'The plotters carried out a bold and sophisticated plan. It employed the shock effect of a combined armored and air assault on the Arg or palace, the seat of Daud\'s highly centralized government. Seizure of the initiative demoralized the larger loyal or uncommitted forces nearby. Quick capture of telecommunications, the defense ministry and other strategic centers of authority isolated Daud\'s stubbornly resisting palace guard.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        },
        {
          id: 'q8',
          text: 'In the following days Taraki became the Prime Minister, and, in an attempt to end the PDPA’s divisions, Karmal became Deputy Prime Minister.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
          }
        },
        {
          id: 'q9',
          text: 'Political leadership of the Democratic Republic of Afghanistan was asserted within three days of the military takeover. After thirteen years of conspiratorial activity, the two factions of the PDPA emerged in public, refusing at first, to admit their Marxist credentials. Khalq\'s dominance was quickly apparent. Taraki became president, prime minister and General Secretary of the PDPA. Parcham\'s leader, Babrak Karmal, and Amin were named deputy prime ministers. Cabinet membership was split eleven to ten , with Khalq in the majority. Khalq dominated the Revolutionary Council, which was to serve as the ruling body of the government.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Within weeks purges of Parcham began, and by summer Khalq\'s somewhat bewildered Soviet patrons became aware of how difficult it would be temper its radicalism. The destruction of Afghanistan\'s former ruling elite had begun immediately after the seizure of power. Execution (Parcham leaders later claimed at least 11,000 during the Taraki/Amin period), flight into exile, and later the devastation of Kabul itself would literally remove the great majority of the some 100,000 who had come to form Afghanistan\'s elite and middle class. Their loss has almost completely broken the continuity of Afghanistan\'s leadership, political institutions and their social foundation.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        },
        {
          id: 'q11',
          text: 'When they first took power the Ḵalqīs had publicly denied their Marxist beliefs, but they soon dropped this pretense.',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        },
        {
          id: 'q12',
          text: 'These measures were generally unpopular, however. The red flag was anathema to religious believers, and the abolition of the bride price challenged centuries-old custom. The annulment of debts also brought with it an end to assistance from landlords to their tenants, and expropriation of private property was seen as a violation of koranic prescriptions. The officials from Kabul were despised in the villages. Popular resentment grew into resistance, and resistance soon became rebellion.',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        },
        {
          id: 'q13',
          text: 'In Washington, this Communist revolution was met with alarm. The Carter administration recognized that Taraki would undo Daoud’s attempt to steer Afghanistan away from Moscow, and it debated whether to cut ties with Afghanistan or recognize Taraki in the hopes that Soviet influence could be contained. Although the President’s Assistant for National Security Affairs Zbigniew Brzezinski advocated the former course, Carter supported the Department of State’s advocacy of recognition. Shortly after the revolution, Washington recognized the new government and soon named Adolph Dubs its Ambassador to Afghanistan.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
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
            value: { d: '1973-07-17' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'DAOUD\'S REPUBLIC, JULY 1973- APRIL 1978', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The welcome Daoud received on returning to power on July 17, 1973 reflected the citizenry\'s disappointment with the lackluster politics of the preceding decade.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'DAOUD\'S REPUBLIC, JULY 1973- APRIL 1978', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/28.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-04-27' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
              }
            ]
          },
          {
            value: { d: '1978-04-28' },
            cites: [
              {
                source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
                loc: {
                  section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
                  para: '4'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On April 28, 1978, soldiers aligned with Taraki’s “Khalq” faction assaulted the presidential palace, where troops executed Daoud and his family.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '4'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-12-05' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'A new treaty of friendship was signed with the USSR (14 Qaws 1357 Š./5 December 1978).',
        lang: 'en',
        cite: {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history/'
        }
      }
    }
  ],
  polities: [
    {
      ref: 'polity:democratic-republic-of-afghanistan',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '2' }
        }
      ]
    },
    {
      ref: 'polity:soviet-union',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '3'
          }
        }
      ]
    },
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '4'
          }
        }
      ]
    }
  ]
})
