import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iranian-revolution',
  names: [
    { text: 'Iranian Revolution', lang: 'en', role: 'primary' },
    {
      text: 'Islamic Revolution',
      lang: 'en',
      role: 'official',
      cites: [
        { source: 'loc-iran-country-study-1987', loc: { section: 'History', para: '1' } },
        { source: 'constitute-iran-constitution-1979-rev-1989', loc: { section: 'Preamble' } }
      ]
    },
    { text: 'انقلاب اسلامی', lang: 'fa', role: 'native', translit: 'Enqelāb-e eslāmi' },
    { text: 'انقلاب ۱۳۵۷', lang: 'fa', role: 'alternative', translit: 'Enqelāb-e 1357' },
    {
      text: 'Revolution of 1978-79',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '52' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1978-01-09' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1978' }
          },
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '52' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1979-02-11' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1979' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ehsan Yarshater' }
        ]
      },
      {
        value: { d: '1979-02-12' },
        cites: [
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '61' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '4' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Hamid Algar' },
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        }
      ]
    },
    {
      ref: 'place:qom',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        }
      ]
    },
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '53' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  sides: [
    {
      key: 'monarchy',
      name: 'Pahlavi monarchy',
      cites: [
        { source: 'loc-iran-country-study-1987', loc: { section: 'History', para: '1' } }
      ],
      polity: 'polity:pahlavi-iran'
    },
    {
      key: 'opposition',
      name: 'Revolutionary opposition',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '8' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      side: 'monarchy',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '55' }
        }
      ]
    },
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      side: 'opposition',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '57' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '3' }
        }
      ]
    },
    {
      ref: 'person:shapour-bakhtiar',
      role: 'head-of-government',
      side: 'monarchy',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '1' }
        }
      ]
    },
    {
      ref: 'person:mehdi-bazargan',
      role: 'head-of-government',
      side: 'opposition',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '3' }
        }
      ]
    },
    {
      ref: 'person:jafar-sharif-emami',
      role: 'head-of-government',
      side: 'monarchy',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        }
      ]
    },
    {
      ref: 'person:gholam-reza-azhari',
      role: 'head-of-government',
      side: 'monarchy',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        }
      ]
    },
    {
      ref: 'person:jamshid-amouzegar',
      role: 'head-of-government',
      side: 'monarchy',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1977' }
        }
      ]
    },
    {
      ref: 'person:mahmoud-taleghani',
      role: 'leader',
      side: 'opposition',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '48' }
        }
      ]
    },
    {
      ref: 'person:ali-shariati',
      role: 'ideologue',
      side: 'opposition',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '50' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Khomeini and the Renewed Opposition', para: '1' }
        }
      ]
    },
    {
      name: 'Karim Sanjabi',
      role: 'participant',
      side: 'opposition',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '6' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '1' }
        }
      ]
    },
    {
      ref: 'person:kazem-shariatmadari',
      role: 'participant',
      side: 'opposition',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '81' }
        }
      ]
    },
    {
      name: 'Morteza Motahhari',
      role: 'participant',
      side: 'opposition',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '4' }
        },
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '59' }
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
            value: { min: 60000, qualifier: 'over' },
            cites: [
              {
                source: 'constitute-iran-constitution-1979-rev-1989',
                loc: { section: 'Preamble' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Islamic Republic of Iran' }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      value: {
        alts: [
          {
            value: { min: 100000 },
            cites: [
              {
                source: 'constitute-iran-constitution-1979-rev-1989',
                loc: { section: 'Preamble' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Islamic Republic of Iran' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:white-revolution',
      rel: 'related',
      cites: [
        { source: 'constitute-iran-constitution-1979-rev-1989', loc: { section: 'Preamble' } }
      ]
    },
    {
      ref: 'event:1973-oil-crisis',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-6',
          loc: {
            section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
          }
        }
      ]
    },
    {
      ref: 'event:qom-uprising-1978',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '52' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '7' }
        }
      ]
    },
    {
      ref: 'event:cinema-rex-fire',
      rel: 'related',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '9' }
        }
      ]
    },
    {
      ref: 'event:black-friday-1978',
      rel: 'related',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '9' }
        },
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '52' }
        }
      ]
    },
    {
      ref: 'event:departure-of-the-shah-1979',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '55' }
        }
      ]
    },
    {
      ref: 'event:return-of-ruhollah-khomeini',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '57' }
        }
      ]
    },
    {
      ref: 'event:1979-islamic-republic-referendum',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '63' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The New Constitution', para: '1' }
        }
      ]
    },
    {
      ref: 'event:constitution-of-the-islamic-republic-1979',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '63' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The New Constitution', para: '3' }
        }
      ]
    },
    {
      ref: 'event:iran-hostage-crisis',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '67' }
        }
      ]
    },
    {
      ref: 'event:founding-of-the-rastakhiz-party',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '3' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '8' }
        }
      ]
    },
    {
      ref: 'event:kurdish-uprising-in-iran-1979',
      rel: 'followed-by',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE REVOLUTION', para: '11' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' },
    { ref: 'polity:islamic-republic-of-iran' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Tehran_Mosavvar_-_Issue_1607_-_Page_32_%28cropped%29_01.jpg/1280px-Tehran_Mosavvar_-_Issue_1607_-_Page_32_%28cropped%29_01.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Tehran_Mosavvar_-_Issue_1607_-_Page_32_(cropped)_01.jpg',
    credit: {
      institution: 'Tehran Mosavvar magazine, issue 1607 (8 Azar 1357 / 29 November 1978), p. 32',
      creator: 'Kaveh Golestan'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'THE ISLAMIC REVOLUTION in 1979 brought a sudden end to the rule of the Pahlavi dynasty, which for fifty years had been identified with the attempt to modernize and Westernize Iran. The Revolution replaced the monarchy with an Islamic republic and a secular state with a quasi-theocracy.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'History', para: '1' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/3.htm' }
        },
        {
          id: 'q2',
          text: 'It brought new elites to power, altered the pattern of Iran\'s foreign relations, and led to the transfer of substantial wealth from private ownership to state control.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'History', para: '1' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/3.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Revolutionary ferment continued in the early 1970’s. Khomeini’s name was invoked by students demonstrating at the University of Tehran in December 1970; in June 1973, in nationwide demonstrations on the tenth anniversary of the 15 Ḵordād uprising; and by protesters in Qom in 1975. Expressions of discontent were voiced repeatedly in mosques in all the principal cities of the country.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '51' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q5',
          text: 'Khomeini, in exile in Iraq, continued to issue antigovernment statements, to attack the shah personally, and to organize supporters. In a series of lectures delivered to his students in An Najaf in 1969 and 1970 and later published in book form under the title of Velayat-e Faqih (The Vice Regency of the Islamic Jurist), he argued that monarchy was a form of government abhorrent to Islam, that true Muslims must strive for the establishment of an Islamic state, and that the leadership of the state belonged by right to the faqih, or Islamic jurist.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Khomeini and the Renewed Opposition', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/20.htm' }
        },
        {
          id: 'q7',
          text: 'By late 1976 and early 1977, it was evident that the Iranian economy was in trouble. The shah\'s attempt to use Iran\'s vastly expanded oil revenues after 1973 for an unrealistically ambitious industrial and construction program and a massive military buildup greatly strained Iran\'s human and institutional resources and caused severe economic and social dislocation. Widespread official corruption, rapid inflation, and a growing gap in incomes between the wealthier and the poorer strata of society fed public dissatisfaction.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        },
        {
          id: 'q9',
          text: 'Leaders of the moderate opposition, professional groups, and the intelligentsia took advantage of the shah\'s accommodations and the more helpful attitude of the Carter administration to organize and speak out. Many did so in the form of open letters addressed to prominent officials in which the writers demanded adherence to the constitution and restoration of basic freedoms. Lawyers, judges, university professors, and writers formed professional associations to press these demands. The National Front, the IFM, and other political groups resumed activity.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q10',
          text: 'On 7 January 1978, the semi-official daily newspaper Eṭṭelāʿā t (q.v.) published an article accusing Khomeini of treachery and collusion with foreign enemies, and the next day, a crowd of protesters attacked and ransacked the offices of the newspaper in Tehran. Two days later, a crowd of some five thousand gathered at the shrine of Ḥażrat-e Maʿṣuma in Qom, protesting the insult to Khomeini and demanding fundamental changes in government policy. They were assaulted by the army as they left the shrine, and a large number were killed. Thus began a cycle of massacre and mourning.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q12',
          text: 'On 18 February, the fortieth day after this atrocity, mass demonstrations took place in Tabriz, leading to even more bloodshed. Then, on March 29, demonstrations took place in no fewer than fifty-five cities; casualties were heavy, especially in Yazd. Early May saw tanks on the streets of Tehran, and in August the government regained control of Isfahan only after killing hundreds of demonstrators.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q13',
          text: 'Following the Rex Cinema fire, the shah removed Amuzegar and named Jafar Sharif-Emami prime minister. Sharif-Emami, a former minister and prime minister and a trusted royalist, had for many years served as president of the Senate. The new prime minister adopted a policy of conciliation. He eased press controls and permitted more open debate in the Majlis. He released a number of imprisoned clerics, revoked the imperial calendar, closed gambling casinos, and obtained from the shah the dismissal from court and public office of members of the Bahai religion, a sect to which the clerics strongly objected. These measures, however, did not quell public protests.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        },
        {
          id: 'q14',
          text: 'On 4 September, on the occasion of ʿId-e Feṭr, marches took place in all the major cities of Iran, and five days later martial law was proclaimed. A mass demonstration took place on 8 September (“Black Friday”) at the Meydān-e Žāla (renamed Meydān-e Šohadāʾ after the revolution); it was attacked by government forces, resulting in the reported slaughter of some 2,000 people; more were probably killed in other parts of the city.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q15',
          text: 'Also in September, in a further misguided attempt to distance Khomeini from his homeland and people, the Iranian government, now on relatively good terms with its neighbor, had Iraq declare Khomeini persona non grata and expel him from its territory. Denied entry to Kuwait, Khomeini briefly considered Algeria, Lebanon, and Syria as places of refuge, but on 12 October 1978, he flew to Paris, accompanied by his son, Aḥmad, and Ebrāhim Yazdi of the Freedom Movement. He stayed first with Abu’l-Ḥasan Bani-Ṣadr, later the first president of the Islamic Republic, in Cachan, a suburb of Paris, before moving to the village of Neauphle-le-Château. There, he took up residence in a small house, and established a modest command center in another property immediately across the road',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '53' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q16',
          text: 'Scattered strikes had occurred in a few private sector and government industries between June and August 1978. Beginning in September, workers in the public sector began to go on strike on a large scale. When the demands of strikers for improved salary and working benefits were quickly met by the Sharif-Emami government, oil workers and civil servants made demands for changes in the political system. The unavailability of fuel oil and freight transport and shortages of raw materials resulting from a customs strike led to the shutting down of most private sector industries in November.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        },
        {
          id: 'q17',
          text: 'As the shah’s position became continually weaker—despite President Carter’s notorious laudation of him on New Year’s Eve, 1977 as “enjoying the respect, admiration and love of your people”—he appointed Jaʿfar Šarif-Emāmi as prime minister, a figure supposedly well-regarded by conservative elements among the ʿolamāʾ. On 6 November, a military government headed by Ḡolām-Reżā Azhāri was installed in his place. These maneuvers were unable to slow the momentum toward revolution. On 13 November, eight days before the beginning of Moḥarram 1400, Khomeini issued a declaration in which he likened the month to “a divine sword in the hands of the soldiers of Islam, our great religious leaders and respected preachers, and all the followers of Imam Ḥosayn, the lord of the martyrs.” They must, he continued, “make maximum use of it; trusting in the power of God, they must tear out the remaining roots of this tree of oppression and tyranny.”',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '54' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q18',
          text: 'As soon as Moḥarram began, on 21 November 1978, vast demonstrations unfurled across Iran, with thousands of people donning white shrouds as a token of readiness for martyrdom. On the ninth day, a million people marched in the capital demanding the abolition of the monarchy, and the very next day, ʿĀšurāʾ, more than two million approved by acclamation a seventeen-point declaration in which the most important demand was the establishment of an Islamic government headed by Khomeini. On 18 December, a nationwide strike began, and, with his regime crumbling, the shah attempted to co-opt secular, liberal-minded nationalists in order to forestall the foundation of an Islamic government. On 3 January 1979, Šāpur Baḵtiār of the National Front was appointed prime minister to replace General Azhāri, and nine days later a nine-member regency council was formed to represent the shah in his absence abroad, now seen as inevitable. It was headed by Sayyed Jalāl-al-Din Ṭehrāni, another individual proclaimed to have religious credentials. The very next day, Khomeini proclaimed from Neauphle-le-Château the formation of the Council of the Islamic Revolution (Šurā-ye enqelāb-e eslāmi), a body entrusted with establishing a transitional government to replace the Baḵtiār adminstration. And on 16 January 1979, amid scenes of feverish popular rejoicing, the shah tearfully left Iran, never to return.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '55' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q19',
          text: 'Once installed as prime minister, Bakhtiar took several measures designed to appeal to elements in the opposition movement. He lifted restrictions on the press; the newspapers, on strike since November, resumed publication. He set free remaining political prisoners and promised the dissolution of SAVAK, the lifting of martial law, and free elections. He announced Iran\'s withdrawal from CENTO, canceled US$7 billion worth of arms orders from the United States, and announced Iran would no longer sell oil to South Africa or Israel. Although Bakhtiar won the qualified support of moderate clerics like Shariatmadari, his measures did not win him the support of Khomeini and the main opposition elements, who were now committed to the overthrow of the monarchy and the establishment of a new political order. The National Front, with which Bakhtiar had been associated for nearly thirty years, expelled him from the movement. Khomeini declared Bakhtiar\'s government illegal. Bazargan, in Khomeini\'s name, persuaded the oil workers to pump enough oil to ease domestic hardship, however, and some normalcy returned to the bazaar in the wake of Bakhtiar\'s appointment. But strikes in both the public and the private sector and large-scale demonstrations against the government continued. When, on January 29, 1979, Khomeini called for a street "referendum" on the monarchy and the Bakhtiar government, there was a massive turnout.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/22.htm' }
        },
        {
          id: 'q21',
          text: 'On February 8, uniformed airmen appeared at Khomeini\'s home and publicly pledged their allegiance to him. On February 9, air force technicians at the Doshan Tappeh Air Base outside Tehran mutinied. Units of the Imperial Guard failed to put down the insurrection. The next day, the arsenal was opened, and weapons were distributed to crowds outside the air base. The government announced a curfew beginning in the afternoon, but the curfew was universally ignored. Over the next twenty-four hours, revolutionaries seized police barracks, prisons, and buildings. On February 11, twenty-two senior military commanders met and announced that the armed forces would observe neutrality in the confrontation between the government and the people. The army\'s withdrawal from the streets was tantamount to a withdrawal of support for the Bakhtiar government and acted as a trigger for a general uprising. By late afternoon on February 12, Bakhtiar was in hiding, and key points throughout the capital were in rebel hands. The Pahlavi monarchy had collapsed.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/22.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q22',
          text: 'Mehdi Bazargan became the first prime minister of the revolutionary regime in February 1979. Bazargan, however, headed a government that controlled neither the country nor even its own bureaucratic apparatus. Central authority had broken down. Hundreds of semi-independent revolutionary committees, not answerable to central authority, were performing a variety of functions in major cities and towns across the country. Factory workers, civil servants, white-collar employees, and students were often in control, demanding a say in running their organizations and choosing their chiefs. Governors, military commanders, and other officials appointed by the prime minister were frequently rejected by the lower ranks or local inhabitants. A range of political groups, from the far left to the far right, from secular to ultra-Islamic, were vying for political power, pushing rival agendas, and demanding immediate action from the prime minister.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE REVOLUTION', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/23.htm' }
        },
        {
          id: 'q23',
          text: 'Even while attempting to put in place the institutions of the new order, the revolutionaries turned their attention to bringing to trial and punishing members of the former regime whom they considered responsible for carrying out political repression, plundering the country\'s wealth, implementing damaging economic policies, and allowing foreign exploitation of Iran. A revolutionary court set to work almost immediately in the school building in Tehran where Khomeini had set up his headquarters. Revolutionary courts were established in provincial centers shortly thereafter. The Tehran court passed death sentences on four of the shah\'s generals on February 16, 1979; all four were executed by firing squad on the roof of the building housing Khomeini\'s headquarters.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE REVOLUTION', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/23.htm' }
        },
        {
          id: 'q24',
          text: 'The institutionalization of the new order continued with a referendum on 30 and 31 March, an overwhelming majority voting in favor of founding an Islamic Republic. It was a simple “yes” or “no” vote, although a space was provided on the ballot paper for suggesting an alternative, such as Islamic Democratic Republic or even monarchy (by equating the former with the latter, Khomeini was clearly declaring it reprehensible and unacceptable; text of his message in Davāni, X, pp. 300-301). He proclaimed the following day to be “the first day of God’s government” (Ṣaḥifa-ye Emām,VI, pp. 457-63). The next step was to establish a constitution for the Islamic Republic. A draft constitution had been drawn up already in Paris by a committee headed by Yad-Allāh Saḥābi. Its text was published on June 18 (Matn-e kāmel-e pišnehādi-e pišnevis-e qānun-e esāsi, supplement to Šahed, no. 11) and on August 3, an Assembly of Experts (Majles-e ḵobragān) was elected for the purpose of reviewing it; fifty-five of the seventy-three persons chosen were religious scholars, but it also included Bani-Sadr and ʿEzzat-Allāh Saḥābi (d. 2011). They began their task on 12 August and completed it on 15 November, producing a constitution that differed greatly from the original draft, above all through the formal incorporation of the principle of welāyat-e faqih.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '63' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q25',
          text: 'What became known as “the hostage crisis” was to last 444 days; it was not until 20 January 1981 that the hostages were released and sent back to America',
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
        },
        {
          id: 'q26',
          text: 'There were continuities across the watershed of the Revolution, however; bureaucratic structure and behavior, attitudes toward authority and individual rights, and the arbitrary use of power remained much the same.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'History', para: '1' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/3.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q28',
          text: 'After slightly more than a year of continuous and unrelenting struggle, the sapling of the Revolution, watered by the blood of more than 60,000 martyrs and 100,000 wounded and disabled, not to mention billions of tumans\' worth of property damage, came to bear fruit amidst the cries of "Independence! Freedom! Islamic government!"',
          lang: 'en',
          cite: {
            source: 'constitute-iran-constitution-1979-rev-1989',
            loc: { section: 'Preamble' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.constituteproject.org/constitution/Iran_1989'
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
            value: { d: '1978-01-07' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '52' }
              },
              {
                source: 'constitute-iran-constitution-1979-rev-1989',
                loc: { section: 'Preamble' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q29',
        text: 'The publication of an outrageous article meant to malign the revered \'ulama\' and in particular Imam Khumaynî on 15 Day, 1356 [January 7, 1978] by the ruling regime accelerated the revolutionary movement and caused an outburst of popular outrage across the country.',
        lang: 'en',
        cite: { source: 'constitute-iran-constitution-1979-rev-1989', loc: { section: 'Preamble' } },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.constituteproject.org/constitution/Iran_1989'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-01-09' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q30',
        text: 'January 9 : Police open fire into a crowd in Qom protesting against a humiliating article published about Ayatollah Khomeini in the daily Eṭṭelāʿāt.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-02-18' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Coming of the Revolution', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q31',
        text: 'Anti-government demonstrations in Tabriz commemorate the 40th day of mourning for those martyred in Qom and signal the beginning of cyclical riots every 40 days in other cities that continue until the fall of the regime.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-08-27' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q32',
        text: 'Following serious urban riots in Mashad, Isfahan, and Shiraz in July and August, Jaʿfar Šarif-Emāmi, former speaker of the Senate, prime minister, and head of the Pahlavi Foundation, whose father was a cleric, is appointed prime minister of a reconciliation government.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-09-08' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Coming of the Revolution', para: '9' }
              },
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '52' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q33',
        text: 'In Tehran several thousand demonstrators clash with troops. The death toll, in what comes to be known as “Black Friday,” is estimated at 164 people. The revolutionary propaganda at the time put the number at 8,000.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-10-06' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater' }
            ]
          },
          {
            value: { d: '1978-10-12' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '53' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Hamid Algar' }
            ]
          }
        ]
      },
      quote: {
        id: 'q34',
        text: 'Ayatollah Khomeini leaves Iraq and arrives in France where he receives vast media coverage; he uses the media spotlight to incite the revolution.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-11-05' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Coming of the Revolution', para: '11' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater' },
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          },
          {
            value: { d: '1978-11-06' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '54' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Hamid Algar' }
            ]
          }
        ]
      },
      quote: {
        id: 'q35',
        text: 'Following several riots throughout Tehran as demonstrators ransack and burn government buildings, banks, and stores, Šarif-Emāmi and his civilian Cabinet resign and are replaced by a military government headed by General Ḡolām-Reżā Azhāri, the armed forces Chief of Staff; martial law and censorship of the press are imposed by the new military government.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-12-10' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Coming of the Revolution', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q36',
        text: 'Massive demonstrations are mobilized in Tehran and across the country; in Isfahan, demonstrators attack the offices of the SAVAK and set fire to banks, stores, movie theaters, and police stations.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-12-18' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q37',
        text: 'Oil and other industrial workers stage a general strike in response to a call by Ayatollah Khomeini and the National Front.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-12-29' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q38',
        text: 'Šāpur Baḵtiār, a prominent member of the National Front, is appointed prime minister after Ḡolām-Ḥosayn Sadiqi, a close collaborator of Moḥammad Moṣaddeq, declines the offer due to the Shah’s refusal to agree to remain in the country.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-01-16' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1979' }
              },
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '55' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Coming of the Revolution', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q39',
        text: 'January 16: The Shah, together with Queen Farah and their children, leave Iran, ostensibly for an extended vacation in Egypt, handing power to prime minister Šāpur Baḵtiār.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-02-01' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1979' }
              },
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '57' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q40',
        text: 'February 1: Ayatollah Khomeini returns to Iran and is welcomed by a huge crowd in Tehran amidst scenes of great jubilation.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-02-05' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1979' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q41',
        text: 'February 5: Mehdi Bāzargān, a liberal devout Muslim, professor of engineering at the University of Tehran, a former member of the National Front and the leader of the Freedom Movement (Nahżat-e āzādi), is appointed prime minister of the provisional government by Ayatollah Khomeini.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-02-11' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1979' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q42',
        text: 'February 11: The Army’s Supreme Council orders the troops back to their barracks. Military installations are occupied by revolutionary militia of various groups and army commanders are arrested.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    }
  ],
  furtherReading: [
    {
      source: 'shahedi-2014-enqelab-e-eslami-mabani-nazari-va-risheha-ye-tarikhi',
      perspective: 'iranian'
    },
    { source: 'kachuyan-2011-enqelab-e-eslami-va-enfetah-e-tarikh', perspective: 'iranian' },
    {
      source: 'salavati-2017-soqut-e-shah-va-piruzi-ye-enqelab-e-eslami',
      perspective: 'iranian'
    },
    { source: 'bazargan-1984-enqelab-e-iran-dar-do-harekat', perspective: 'iranian' }
  ]
})
