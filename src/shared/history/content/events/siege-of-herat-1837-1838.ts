import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'siege-of-herat-1837-1838',
  names: [
    { text: 'Siege of Herat (1837–1838)', lang: 'en', role: 'primary' },
    { text: 'محاصره هرات', lang: 'fa', role: 'native' },
    {
      text: 'Herat campaign',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '7' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1837-09' },
        cites: [
          {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '10' }
          }
        ]
      },
      {
        value: { d: '1838' },
        cites: [
          {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '12'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1838-09-09' },
        cites: [
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
          }
        ]
      },
      {
        value: { d: '1839' },
        cites: [
          {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '12'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  sides: [
    {
      key: 'persia',
      name: 'the Persian army',
      polity: 'polity:qajar-iran',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
        }
      ]
    },
    {
      key: 'herat',
      name: 'Kāmrān Khan Sadōzay',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mohammad-shah-qajar',
      role: 'commander',
      side: 'persia',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '10' }
        }
      ]
    },
    {
      ref: 'person:haji-mirza-aqasi',
      role: 'participant',
      side: 'persia',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
        }
      ]
    },
    {
      name: 'Comte Ivan Simonich',
      role: 'commander',
      side: 'persia',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
        }
      ]
    },
    {
      ref: 'person:john-mcneill',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
        }
      ]
    },
    {
      name: 'Kāmrān Khan Sadōzay',
      role: 'leader',
      side: 'herat',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
        }
      ]
    },
    {
      name: 'Yār-Moḥammad Khan',
      role: 'leader',
      side: 'herat',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
        }
      ]
    },
    {
      name: 'Eldred Pottinger',
      role: 'commander',
      side: 'herat',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:abbas-mirza-khorasan-campaign', rel: 'preceded-by' },
    {
      ref: 'event:first-anglo-afghan-war',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '13' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'From the middle of the 18th century, following Nāder Shah’s assassination in 1747, Herat became the focus of a century-long power struggle and regional rivalry that came to an end only with Persia renouncing its sovereignty over the city in 1857.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q2',
          text: 'Soon after his accession in 1834, Moḥammad Shah focused his attention again on Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q3',
          text: 'Pursuing his father’s intentions, Moḥammad Shah endeavored to establish Persian supremacy over Herat and led a campaign against the Turkmen in Gorgān (Summer 1836).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q19',
          text: '1837 The siege of Herat over British objections (it ends in failure in 1838).',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1927' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q4',
          text: 'Yār-Moḥammad Khan, on the other hand, switched sides to the British camp, and his Sunni tribal forces prepared for the defense of Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q5',
          text: 'As a result, the Persian army remained stranded before Herat’s gates for nearly ten months; the Qajar artillery proved ineffective, and the Persian siege strategy failed to penetrate the fortifications of Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q6',
          text: 'Ḥāji Mirzā Āqāsi (q.v.) had allowed a level of humanitarian relief to go through and declared some city gates safe for civilian traffic.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q7',
          text: 'He pressed upon the Shah to raise the siege, and secretly sent funds to Lieutenant Eldred Pottinger, who organized Herat’s defence for Kāmrān Khan Sadōzay (Pottinger was at odds with Kāmrān’s influential vizier Yār-Moḥammad Khan, see Yapp, p. 365).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q8',
          text: 'Simonich, overlooking his official instructions, also went to the shah’s camp and provided military leadership to conduct the siege.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Moreover, as a direct result of the Qajar campaign, Herat and its environs sustained enormous agricultural, commercial, and material damage (Kelly, pp. 290-301, 306-20; Etteḥādiya, pp. 79-116).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q10',
          text: 'The whole affair signified a clear British strategic victory over Russian advances in Central Asia.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q11',
          text: 'The failure of the Herat campaign and its aftermath discredited Moḥammad Shah and further exposed the Persian state to internal strife and diplomatic abuse. It emboldened Yār-Moḥammad in his anti-Qajar stance, contributed to Khorasan’s insecurity, demonstrated Persia’s vulnerability to a naval threat in the Persian Gulf, and encouraged deeper British involvement in Afghanistan from 1839 onwards.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q12',
          text: 'The Herat question remained and led to a short but full-scale war under Nāṣer-al-Din Shah (see ANGLO-PERSIAN WAR, 1856-57).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
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
            value: { d: '1837-07' },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Paying little heed to the advice of the British envoy in Tehran, in July 1837 the shah ordered troop assembly, and in September he marched towards Herat at the head of sizeable regular and tribal forces.',
        lang: 'en',
        cite: {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/herat-vi'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1838-03' },
            cites: [
              {
                source: 'iranica-calmard-mohammad-shah',
                loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
              }
            ]
          },
          {
            value: { d: '1838-04' },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Abbas Amanat' }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The new British envoy, John McNeill, lacking support from London (in control of the Persian mission from 1835) and Calcutta, set out for Herat and joined the shah’s camp nearby (March 1838; Watson, pp. 303-4;Yapp, pp.145 ff.; Elgood, pp. 484-85).',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/mohammad-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1838-06-07' },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Having failed to undermine the shah’s determination, in June 1838, McNeill broke off diplomatic relations and left for Tabriz, and shortly afterwards moved with his staff to Erzerum.',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/mohammad-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1838-06-23' },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Anxious to bring the campaign to an end, on 23 June, the shah ordered a new offensive but failed to break through Herat’s defenses despite high Persian casualties.',
        lang: 'en',
        cite: {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/herat-vi'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1838-07-24' },
            cites: [
              {
                source: 'iranica-calmard-mohammad-shah',
                loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The last assault, however, failed (24 July 1838).',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/mohammad-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1838-09-09' },
            cites: [
              {
                source: 'iranica-calmard-mohammad-shah',
                loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On receiving the news that British warships and troops had occupied Ḵārg Island, the shah lifted the siege on 9 September 1838 (Eʿteżād-al-Salṭana, pp. 454 ff.; Wright, 1977, pp. 58-59; see HERAT VI. THE HERAT QUESTION).',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/mohammad-shah'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Herat_from_the_Citadel.png/1280px-Herat_from_the_Citadel.png',
    page: 'https://commons.wikimedia.org/wiki/File:Herat_from_the_Citadel.png',
    credit: { creator: 'The Illustrated London News' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'ghubar-1980-afghanistan-dar-masir-e-tarikh', perspective: 'south-asian' },
    {
      source: 'mahmud-1949-tarikh-e-ravabet-e-siyasi-ye-iran-va-engelis',
      perspective: 'iranian'
    },
    { source: 'nateq-1988-iran-dar-rahyabi-ye-farhangi', perspective: 'iranian' }
  ]
})
