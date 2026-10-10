import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'soviet-invasion-of-afghanistan',
  names: [
    { text: 'Soviet invasion of Afghanistan', lang: 'en', role: 'primary' },
    {
      text: 'Ввод советских войск в Афганистан',
      lang: 'ru',
      role: 'native',
      translit: 'Vvod sovetskikh voysk v Afganistan'
    },
    {
      text: 'تهاجم شوروی به افغانستان',
      lang: 'fa',
      role: 'alternative',
      translit: 'Tahājom-e Šūravī be Afḡānestān'
    },
    {
      text: 'Soviet intervention in Afghanistan',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '1'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1979-12-24' },
        cites: [
          {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '6'
            }
          }
        ]
      },
      {
        value: { d: '1979-12-27' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
          },
          {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '17' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1989-02-15' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Geneva Accords, 1987-89', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:kabul',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '1'
          }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' },
    { ref: 'event:soviet-afghan-war' }
  ],
  sides: [
    {
      key: 'ussr',
      name: 'Soviet Union',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '1'
          }
        }
      ],
      polity: 'polity:soviet-union'
    },
    {
      key: 'dra',
      name: 'Democratic Republic of Afghanistan',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '6'
          }
        },
        {
          source: 'iranica-arnold-communism-in-afghanistan',
          loc: { section: 'COMMUNISM iv. In Afghanistan', para: '18' }
        }
      ],
      polity: 'polity:democratic-republic-of-afghanistan'
    },
    {
      key: 'mujahideen',
      name: 'Afghan insurgents (mujahideen)',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '5'
          }
        },
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Geneva Accords, 1987-89', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:leonid-brezhnev',
      role: 'head-of-state',
      side: 'ussr',
      cites: [
        { source: 'frus1977-80v12-doc-114', loc: { section: 'Document 114' } },
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '1'
          }
        }
      ]
    },
    {
      ref: 'person:jimmy-carter',
      role: 'head-of-state',
      cites: [
        { source: 'frus1977-80v12-doc-113', loc: { section: 'Document 113' } }
      ]
    },
    {
      ref: 'person:hafizullah-amin',
      role: 'victim',
      side: 'dra',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '6'
          }
        },
        {
          source: 'iranica-arnold-communism-in-afghanistan',
          loc: { section: 'COMMUNISM iv. In Afghanistan', para: '17' }
        }
      ]
    },
    {
      ref: 'person:babrak-karmal',
      role: 'head-of-government',
      side: 'dra',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '6'
          }
        },
        {
          source: 'iranica-arnold-communism-in-afghanistan',
          loc: { section: 'COMMUNISM iv. In Afghanistan', para: '18' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'ussr',
      value: {
        alts: [
          {
            value: { min: 50000 },
            cites: [
              {
                source: 'iranica-arnold-communism-in-afghanistan',
                loc: { section: 'COMMUNISM iv. In Afghanistan', para: '17' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Anthony Arnold' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:saur-revolution',
      rel: 'caused-by',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '4'
          }
        },
        {
          source: 'iranica-arnold-communism-in-afghanistan',
          loc: { section: 'COMMUNISM iv. In Afghanistan', para: '17' }
        }
      ]
    },
    {
      ref: 'period:cold-war',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '1'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Evstafiev-40th_army_HQ-Amin-palace-Kabul.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Evstafiev-40th_army_HQ-Amin-palace-Kabul.jpg',
    credit: { institution: 'Mikhail Evstafiev (Wikimedia Commons)', creator: 'Mikhail Evstafiev' },
    license: { id: 'cc-by-sa', version: '3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'At the end of December 1979, the Soviet Union sent thousands of troops into Afghanistan and immediately assumed complete military and political control of Kabul and large portions of the country. This event began a brutal, decade-long attempt by Moscow to subdue the Afghan civil war and maintain a friendly and socialist government on its border. It was a watershed event of the Cold War, marking the only time the Soviet Union invaded a country outside the Eastern Bloc—a strategic decision met by nearly worldwide condemnation.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'In the summer of 1973, Mohammed Daoud, the former Afghan Prime Minister, launched a successful coup against King Zahir. Although Daoud himself was more nationalist than socialist, his coup was dependent on pro-Soviet military and political factions. Since 1955 Moscow had provided military training and materiel to Afghanistan; by 1973, a third of active troops had trained on Soviet soil. Additionally, Daoud enjoyed the support of the People’s Democratic Party of Afghanistan (PDPA), founded in 1965 upon Marxist ideology and allegiance to Moscow.',
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
          id: 'q3',
          text: 'Once again, the tumult of internal Afghan politics complicated both U.S. and Soviet jockeying. In the summer of 1979, Hafizullah Amin, a longtime ally of Taraki who became Deputy Prime Minister following the April Revolution, received word that Babrak Karmal (Daoud’s early supporter) was leading a Parcham plot to overthrow the Taraki regime. Amin took the opportunity to purge and execute many Parchamists and consolidate his own power. Complicating matters further, this internal strife damaged the Kabul Government’s major national program, namely, to bring the Communist revolution to the Islamic tribal areas beyond Kabul. By the winter of 1978, this program was met by armed revolt throughout the country.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '5'
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
          text: 'The red flag was anathema to religious believers, and the abolition of the bride price challenged centuries-old custom. The annulment of debts also brought with it an end to assistance from landlords to their tenants, and expropriation of private property was seen as a violation of koranic prescriptions. The officials from Kabul were despised in the villages. Popular resentment grew into resistance, and resistance soon became rebellion.',
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
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Amīn continued, against Soviet advice, the unpopular Ḵalqī program of sovietization. On 5 Jady/24 December, with the country poised on the brink of collapse from widespread popular rebellion, a quiet but massive airlift of Soviet forces into Afghanistan began.',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        },
        {
          id: 'q7',
          text: 'Three days later there was an invasion of land forces, while various deceptive operations ensured the immobilization of Afghan army units and disrupted communications',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        },
        {
          id: 'q8',
          text: 'That same evening a team (spetsnaz) of K.G.B. special forces in Afghan uniforms overcame Amīn’s personal guards and killed him in the Dār al-Amān palace',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        },
        {
          id: 'q9',
          text: 'The six former Paṛčamī ambassadors who had escaped to the Soviet Union returned with the invaders and took control of the party and the state under the leadership of Kārmal.',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Although the Carter administration had closely watched this buildup from the outset, its reaction following the invasion revealed that, until the end, it clung to the hope that the Soviets would not invade, based on the unjustified assumption that Moscow would conclude that the costs of invasion were too high. In response, Carter wrote a sharply-worded letter to Brezhnev denouncing Soviet aggression, and during his State of the Union address he announced his own doctrine vowing to protect Middle Eastern oil supplies from encroaching Soviet power. The administration also enacted economic sanctions and trade embargoes against the Soviet Union, called for a boycott of the 1980 Moscow Olympics, and stepped up its aid to the Afghan insurgents. In sum, these actions were Washington’s collective attempt to make the Soviets’ “adventure” in Afghanistan as painful and brief as possible.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan'
          }
        },
        {
          id: 'q11',
          text: 'The invaders had hoped for a quick victory and withdrawal, leaving a firmly pro-Soviet but outwardly noncommunist regime in power.',
          lang: 'en',
          cite: {
            source: 'iranica-arnold-communism-in-afghanistan',
            loc: { section: 'COMMUNISM iv. In Afghanistan', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/communism-iv/'
          }
        },
        {
          id: 'q12',
          text: 'By the beginning of 1987, the controlling fact in the Afghan war was the Soviet Union\'s determination to withdraw.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Geneva Accords, 1987-89', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/97.htm' }
        },
        {
          id: 'q13',
          text: 'Instead, it took ten years of grinding insurgency before Moscow finally withdrew, at the cost of millions of lives and billions of dollars. In their wake, the Soviets left a shattered country in which the Taliban, an Islamic fundamentalist group, seized control, later providing Osama bin Laden with a training base from which to launch terrorist operations worldwide.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
            loc: {
              section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
              para: '7'
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
            value: { d: '1978-12-05' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
              },
              {
                source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
                loc: {
                  section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
                  para: '5'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In response, Amin and Taraki traveled to Moscow to sign a friendship treaty which included a provision that would allow direct Soviet military assistance should the Islamic insurgency threaten the regime.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '5'
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
            value: { d: '1979-03' },
            cites: [
              {
                source: 'iranica-arnold-communism-in-afghanistan',
                loc: { section: 'COMMUNISM iv. In Afghanistan', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In March 1979 the population of Herat rose up en masse, and some forty Soviet civilian advisers were slaughtered. In August the garrison in the famous Bālā Ḥeṣār fort at Kabul mutinied.',
        lang: 'en',
        cite: {
          source: 'iranica-arnold-communism-in-afghanistan',
          loc: { section: 'COMMUNISM iv. In Afghanistan', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/communism-iv/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-10' },
            cites: [
              {
                source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
                loc: {
                  section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
                  para: '6'
                }
              },
              {
                source: 'iranica-arnold-communism-in-afghanistan',
                loc: { section: 'COMMUNISM iv. In Afghanistan', para: '16' }
              }
            ]
          },
          {
            value: { d: '1979-09' },
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
        text: 'Amin sensed the Soviet mission was designed to strengthen Taraki at his expense. In response, forces loyal to Amin executed Taraki in October—a move that infuriated Moscow, which began amassing combat units along its border.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '6'
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
            value: { d: '1979-12-24' },
            cites: [
              {
                source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
                loc: {
                  section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
                  para: '6'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Finally, on Christmas Eve, the invasion began. Soviet troops killed Amin and installed Babrak Karmal as the Soviet’s puppet head of government.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '6'
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
            value: { d: '1979-12-27' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
              },
              {
                source: 'iranica-arnold-communism-in-afghanistan',
                loc: { section: 'COMMUNISM iv. In Afghanistan', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'To ensure that the changes instituted by the new regime would survive, the Soviet army intervened on 6 Jadī 1358 Š./27 December 1979 by deposing the Amīn government, which had ruled by terror, and installing members of Paṛčam, led by Babrak Kārmal (born 1308 Š./1929).',
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
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-05' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The Geneva Accords, 1987-89', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'But at its core was an agreement reached in May 1988 that authorized the withdrawal of "foreign troops" according to a timetable that would remove all Soviet forces by February 15, 1989.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Geneva Accords, 1987-89', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/97.htm' }
      }
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-afghanistan',
          loc: {
            section: 'The Soviet Invasion of Afghanistan and the U.S. Response, 1978–1980',
            para: '7'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'braithwaite-2011-afgantsy', perspective: 'european' },
    { source: 'kalinovsky-2011-a-long-goodbye', perspective: 'american' }
  ]
})
