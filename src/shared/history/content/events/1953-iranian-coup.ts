import { defineEvent } from '../../schema'

export default defineEvent({
  id: '1953-iranian-coup',
  names: [
    { text: '1953 Iranian coup d’état', lang: 'en', role: 'primary' },
    { text: 'کودتای ۲۸ مرداد ۱۳۳۲', lang: 'fa', role: 'native' },
    {
      text: 'Coup d’etat of 28 Mordād 1332',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-gasiorowski-coup-detat-1953',
          loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '1' }
        }
      ]
    },
    {
      text: 'Operation Ajax',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'coup',
  start: {
    alts: [
      {
        value: { d: '1953-08-15' },
        cites: [
          {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '6' }
          }
        ]
      },
      {
        value: { d: '1953-08-18' },
        cites: [
          {
            source: 'pahlavi-1961-mission-for-my-country',
            loc: { section: 'Mission for My Country' }
          }
        ],
        heldBy: [
          {
            kind: 'participant',
            name: 'Mohammad Reza Pahlavi',
            ref: 'person:mohammad-reza-pahlavi'
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1953-08-19' },
        cites: [
          {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '1' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'north-america', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-gasiorowski-coup-detat-1953',
          loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '8' }
        },
        {
          source: 'iranica-gasiorowski-coup-detat-1953',
          loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '9' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' },
    { ref: 'period:cold-war' }
  ],
  sides: [
    {
      key: 'royalists',
      name: 'pro-shah army units and street crowds',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
        }
      ]
    },
    {
      key: 'mosaddeq',
      name: 'Mossadeq’s forces',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mohammad-mosaddegh',
      role: 'head-of-government',
      side: 'mosaddeq',
      cites: [
        {
          source: 'iranica-gasiorowski-coup-detat-1953',
          loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '7' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
        }
      ]
    },
    {
      ref: 'person:hossein-fatemi',
      role: 'participant',
      side: 'mosaddeq',
      cites: [
        {
          source: 'iranica-azimi-fatemi-hosayn',
          loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '4' }
        }
      ]
    },
    {
      ref: 'person:fazlollah-zahedi',
      role: 'leader',
      side: 'royalists',
      cites: [
        {
          source: 'iranica-gasiorowski-coup-detat-1953',
          loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '4' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '6' }
        }
      ]
    },
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      side: 'royalists',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '6' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
        }
      ]
    },
    {
      name: 'Kermit Roosevelt',
      role: 'organizer',
      side: 'royalists',
      cites: [
        {
          source: 'iranica-gasiorowski-coup-detat-1953',
          loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '4' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '6' }
        }
      ]
    },
    {
      name: 'Donald Wilber',
      role: 'organizer',
      side: 'royalists',
      cites: [
        {
          source: 'iranica-gasiorowski-coup-detat-1953',
          loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '5' }
        }
      ]
    },
    {
      name: 'Neʿmat-Allāh Naṣīrī',
      role: 'participant',
      side: 'royalists',
      cites: [
        {
          source: 'iranica-gasiorowski-coup-detat-1953',
          loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '6' }
        }
      ]
    },
    {
      ref: 'person:abol-ghasem-kashani',
      role: 'participant',
      side: 'royalists',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '67' }
        },
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '68' }
        }
      ]
    },
    {
      ref: 'person:dwight-d-eisenhower',
      role: 'head-of-state',
      side: 'royalists',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '6' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:trial-of-mohammad-mosaddegh',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
        }
      ]
    },
    {
      ref: 'event:iranian-oil-consortium-agreement-1954',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-azimi-great-britain-v',
          loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '31' }
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
          text: 'COUP D’ETAT OF 1332 Š./1953. The appointment of Moḥammad Moṣaddeq (q.v.) as prime minis­ter of Persia on 9 Ordībehešt 1330 Š./29 April 1951 and the nationalization two days later of Persia’s British-owned oil industry initiated a period of tense confrontation between the Persian and British govern­ments. It lasted until the overthrow of Moṣaddeq in the coup d’etat of 28 Mordād 1332 Š./19 August 1953, which was “conceived by MI6 [the British Intelligence Service] and delivered by CIA” (Wright, p. 259).',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        },
        {
          id: 'q2',
          text: 'In June 1953, the Eisenhower administration approved a British proposal for a joint Anglo-American operation, code-named Operation Ajax, to overthrow Mossadeq.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/17.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Soon after Moṣaddeq’s appointment, the British began a pro­tracted effort to have him removed from power, impos­ing economic sanctions on Persia, conducting military maneuvers in the region, and undertaking a variety of covert political activities. The most important of the covert activities were an extensive effort in the sum­mer of 1330 Š./1951 to replace him with Sayyed Żīāʾ-­al-Dīn Ṭabāṭabāʾī; a similar effort a year later to replace him with Aḥmad Qawām (Qawām-al-Salṭana)',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        },
        {
          id: 'q4',
          text: 'From the outset, the British policy had been to deny Moṣaddeq any oil settlement which would differ in substance from a fifty-fifty share of the profits and would thus be likely to undermine oil arrangements elsewhere, a policy the Americans also broadly supported.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        },
        {
          id: 'q5',
          text: 'The administration of President Harry S Truman initially had been sympathetic to Iran\'s nationalist aspirations. Under the administration of President Dwight D. Eisenhower, however, the United States came to accept the view of the British government that no reasonable compromise with Mossadeq was possible and that, by working with the Tudeh, Mossadeq was making probable a communist-inspired takeover.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/17.htm' }
        },
        {
          id: 'q6',
          text: 'In February 1953 Zāhedī, Kāšānī, and others fomented a series of incidents that provoked serious unrest in Tehran and almost brought down Moṣaddeq’s government.',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'Following the break in diplomatic relations, Christopher Montague Woodhouse of M.I.-6 went to Washington, D.C. to solicit American support for the effort to overthrow Moṣaddeq. He was told that the Truman administra­tion would not participate in such an effort but that the administration of the newly elected Dwight D. Eisenhower probably would (Woodhouse, chaps. 8, 9).',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        },
        {
          id: 'q8',
          text: 'By then the C.I.A. team had already begun to imple­ment AJAX. It initiated a propaganda campaign against Moṣaddeq; it included planting articles in the Persian press, circulating leaflets and rumors, and possibly even financing six new anti-Moṣaddeq newspapers that suddenly appeared in Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        },
        {
          id: 'q9',
          text: 'Dissolution of the Majles by Moṣaddeq, following the referendum of Mordād, 1332 Š./August 1953, thwarted a vital component of the joint plan by the CIA and the MI6, which was to utilize the parliament to overthrow Moṣaddeq’s government.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        },
        {
          id: 'q10',
          text: 'When Naṣīrī arrived at Moṣaddeq’s home he was promptly arrested, which completely disrupted the original plan. Army and police units loyal to Moṣaddeq then set up roadblocks throughout the city, began a massive hunt for Zāhedī, and arrested many of his supporters (Najātī, pp. 382-91). The general took refuge in a C.I.A. safe house, where he remained until Moṣaddeq was finally overthrown (personal inter­views). The shah fled the country, first to Baghdad and then to Rome.',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        },
        {
          id: 'q11',
          text: 'Following the collapse of the original plan, Roosevelt and his team began to improvise a new strategy for overthrowing Moṣaddeq.',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        },
        {
          id: 'q12',
          text: 'An army unit seized Radio Tehran and broadcast reports that Moṣaddeq’s government had fallen. A tank unit commanded by General Hedāyat-Allāh Gīlānšāh retrieved Zāhedī from the C.I.A. safe house and attacked Moṣaddeq’s home, where a long battle ensued. The prime minister and several of his colleagues fled to a neighbor’s house but surrendered to Zāhedī’s forces the next day.',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q13',
          text: 'Hundreds of National Front leaders, Tudeh Party officers, and political activists were arrested; several Tudeh army officers were also sentenced to death.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/17.htm' }
        },
        {
          id: 'q14',
          text: '1953 The Shah and his queen, who had left Iran for Rome uncertain of the effects of his dismissal of Moṣaddeq, returns to Iran, assuming almost absolute power.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1953' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q15',
          text: 'To a large extent the coup helped reestablish British influence in Persia, but British prestige was not left unscathed.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        },
        {
          id: 'q16',
          text: 'On a different level, the coup had revealed the extent of the measures to which the British and the Americans were prepared to resort in order to safeguard their interests. Although widely regarded as American engineered, the coup helped to reaffirm the existing belief in inordinate British influence in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
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
            value: { d: '1953-02-03' },
            cites: [
              {
                source: 'iranica-gasiorowski-coup-detat-1953',
                loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On 3 February 1953, only two weeks after Eisenhower’s inauguration, top American and British officials met in Washington to discuss the British proposal.',
        lang: 'en',
        cite: {
          source: 'iranica-gasiorowski-coup-detat-1953',
          loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1953-06-25' },
            cites: [
              {
                source: 'iranica-gasiorowski-coup-detat-1953',
                loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'Fi­nal approval was received at a State Department meet­ing on 25 June (Roosevelt, pp. 120-24).',
        lang: 'en',
        cite: {
          source: 'iranica-gasiorowski-coup-detat-1953',
          loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1953-08-13' },
            cites: [
              {
                source: 'pahlavi-1961-mission-for-my-country',
                loc: { section: 'Mission for My Country' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'On 13 August, 1953, at Ramsar, I signed decrees dismissing Mossadegh as Prime Minister and naming General Fazlollah Zahedi in his place.',
        lang: 'en',
        cite: {
          source: 'pahlavi-1961-mission-for-my-country',
          loc: { section: 'Mission for My Country' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://archive.org/download/mission-for-my-country-mohammad-reza-pahlavi_202605/Mission%20For%20My%20Country%20-%20Mohammad%20Reza%20Pahlavi_djvu.txt'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1953-08-19' },
            cites: [
              {
                source: 'iranica-gasiorowski-coup-detat-1953',
                loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'On August 19, pro-shah army units and street crowds defeated Mossadeq\'s forces. The shah returned to the country.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/17.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1953-08-22' },
            cites: [
              {
                source: 'pahlavi-1961-mission-for-my-country',
                loc: { section: 'Mission for My Country' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'On 22 August, 1953, three days after General Zahedi had assumed control, I returned to Teheran and to a heart-warming, tumultuous welcome.',
        lang: 'en',
        cite: {
          source: 'pahlavi-1961-mission-for-my-country',
          loc: { section: 'Mission for My Country' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://archive.org/download/mission-for-my-country-mohammad-reza-pahlavi_202605/Mission%20For%20My%20Country%20-%20Mohammad%20Reza%20Pahlavi_djvu.txt'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Fazlollah_Zahedi_-_19_August_1953.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Fazlollah_Zahedi_-_19_August_1953.jpg',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies' },
    license: { id: 'public-domain' }
  }
})
