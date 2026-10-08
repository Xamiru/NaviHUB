import { defineEvent } from '../../schema'

export default defineEvent({
  id: '30-tir-uprising',
  names: [
    { text: '30 Tir uprising', lang: 'en', role: 'primary' },
    { text: 'قیام سی تیر', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1952-07-21' },
        cites: [
          {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '25' }
          },
          {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '2' }
          }
        ]
      },
      {
        value: { d: '1952-07-20' },
        cites: [
          {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '54' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ali Rahnema' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '54' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:premiership-of-mohammad-mosaddegh' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      ref: 'person:mohammad-mosaddegh',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '53' }
        },
        {
          source: 'iranica-azimi-great-britain-v',
          loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '25' }
        }
      ]
    },
    {
      ref: 'person:ahmad-qavam',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '53' }
        },
        {
          source: 'iranica-azimi-great-britain-v',
          loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '25' }
        }
      ]
    },
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '53' }
        }
      ]
    },
    {
      ref: 'person:abol-ghasem-kashani',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '54' }
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
            value: { min: 25, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-rahnema-kashani',
                loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '54' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Moṣaddeq’s resignation following disagreements with the shah resulted in Qawām’s premiership, but he did not succeed in consolidating his position and within a few days Moṣaddeq returned to power as the result of a popular uprising (30 Tir 1331 Š./21 July 1952).',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        },
        {
          id: 'q2',
          text: 'In the summer of 1952, the shah refused the prime minister\'s demand for the power to appoint the minister of war (and, by implication, to control the armed forces). Mossadeq resigned, three days of pro-Mossadeq rioting followed, and the shah was forced to reappoint Mossadeq to head the government.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '4' }
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
          text: 'After the 17th Majles was convened, Moṣaddeq was reconfirmed as prime minister on 8 July 1952. Three days later, Moṣaddeq, who had already met with the shah and demanded extra-ordinary financial, military, and executive powers, discussed his plans with the new members of parliament.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '53' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Even though by this time signs of disagreement and irritation were manifest between the two, on 18 July Kāšāni issued a powerful communiqué in which he declared that Moṣaddeq’s government was “the strongest barrier against colonial atrocities” and asserted that his removal and Qavām’s appointment was “the result of colonial policies.” He ordered Iranians to engage in a jihad (see islam in iran xi. jihad in islam) against Qavām’s government and warned that the Muslim people of Iran would not allow foreigners to threaten their independence and sovereignty (Dehnavi, II, p. 206). At five in the afternoon of the 30th of Tir (20 July), after the tanks rolled into the streets of Tehran and the military opened fire on the crowd, killing some 25 people, Tehran radio announced the resignation of Qavām (ʿĀqeli, I, p. 468).',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '54' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The popular uprising which triumphantly reinstated the power and authority of both Kāšāni and Moṣaddeq convinced both men that they could, each independent of the other, lead the nationalization movement and resolve the domestic and international problems that resulted from it.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '57' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        },
        {
          id: 'q6',
          text: 'This episode, although underlining the limitations of British influence, did not make them any less adamant in their efforts to unseat Moṣaddeq, if necessary through a coup d’état.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        },
        {
          id: 'q8',
          text: 'In the aftermath of the July 1952 uprising some of the leaders of the National front, specifically Ayatollah Sayyed Abu’l-Qāsem Kāšānī, Moẓaffar Baqāʾī, and Ḥosayn Makkī, became disenchanted with Moṣaddeq over such matters as his new cabinet appointments and his request that the Majles grant him emergency powers.',
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
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q5',
          text: 'Immediately the Tudeh party, joined by Mossadegh’s people, launched riots and demonstrations. Mob rule prevailed, and Qavam’s government seemed powerless to cope with it.',
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
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1952-07-15' },
            cites: [
              {
                source: 'iranica-rahnema-kashani',
                loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '53' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On 15 July, the shah disagreed with Moṣaddeq’s decision to serve also as defense minister, and on the next day, Moṣaddeq resigned.',
        lang: 'en',
        cite: {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '53' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1952-07-18' },
            cites: [
              {
                source: 'iranica-rahnema-kashani',
                loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '53' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On 18 July, the shah appointed Aḥmad Qavām as prime minister.',
        lang: 'en',
        cite: {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '53' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1952-07-22' },
            cites: [
              {
                source: 'pahlavi-1961-mission-for-my-country',
                loc: { section: 'Mission for My Country' }
              },
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '42' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'After the five day episode of Moṣaddeq’s fall and rebound which occurred between 17 and 22 July 1952 and his victory in obtaining the International Court’s judgment that it had no jurisdiction in the Iranian oil dispute, Dean Acheson, the US Secretary of State, came to the conclusion that there was no alternative to supporting Moṣaddeq as the only bulwark against communism in Iran.',
        lang: 'en',
        cite: {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '42' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Dr_Mohammad_Mosaddeq.jpg/1280px-Dr_Mohammad_Mosaddeq.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Dr_Mohammad_Mosaddeq.jpg',
    credit: { institution: 'International News Photos' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'makki-1983-ketab-e-siyah', perspective: 'iranian' },
    { source: 'showkat-2007-dar-tirras-e-hadeseh', perspective: 'iranian' }
  ]
})
