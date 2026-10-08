import { definePerson } from '../../schema'

export default definePerson({
  id: 'mohammad-mosaddegh',
  names: [
    { text: 'Mohammad Mosaddegh', lang: 'en', role: 'primary' },
    { text: 'محمد مصدق', lang: 'fa', role: 'native' },
    { text: 'Moḥammad Moṣaddeq', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1882' },
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
        value: { d: '1881' },
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
  died: {
    alts: [
      {
        value: { d: '1967' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
          },
          {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1951-04-28' },
            cites: [
              {
                source: 'iranica-mina-oil-agreements',
                loc: { section: 'OIL AGREEMENTS IN IRAN', para: '28' }
              },
              {
                source: 'iranica-rahnema-kashani',
                loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '48' }
              }
            ]
          },
          {
            value: { d: '1951-04-29' },
            cites: [
              {
                source: 'iranica-gasiorowski-coup-detat-1953',
                loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '1' }
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
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-mina-oil-agreements',
          loc: { section: 'OIL AGREEMENTS IN IRAN', para: '28' }
        },
        {
          source: 'iranica-gasiorowski-coup-detat-1953',
          loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '1' }
        },
        { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Persons' } }
      ]
    },
    {
      title: 'Minister of Defense',
      polity: 'polity:pahlavi-iran',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1952-07-22' },
            cites: [
              { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Persons' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1953-08-15' },
            cites: [
              { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Persons' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Persons' } }
      ]
    },
    {
      title: 'Governor of Fārs',
      polity: 'polity:qajar-iran',
      lang: 'en',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-6',
          loc: {
            section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Dr_Mohammad_Mosaddeq.jpg/1280px-Dr_Mohammad_Mosaddeq.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Dr_Mohammad_Mosaddeq.jpg',
    credit: { institution: 'International News Photos' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Moṣaddeq was the popular leader of the National front (Jabha-ye mellī), a coalition of political parties and prominent individuals formed in 1328 Š./1949 with the primary goals of nationalizing the oil industry and democratizing the Persian political system',
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
          id: 'q1',
          text: 'A deputy to the Majles who was not only opposed to the concession sought by the Soviet Union but also considered the Anglo-Persian Oil Agreement an offense against Persian interests and economic independence was Dr. Moḥammad Moṣaddeq.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'He came from an aristocratic family related on his mother side to the Qajars, had studied law in Switzerland, and had served as a governor of Fārs province under the last Qajar king.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Of the Iranian politicians most closely associated with the nationalistic fervor which was directed with great vigor against AIOC one man, in particular, stood out: Dr. Moḥammad Moṣaddeq. Having held various important posts in 1920s, he emerged after the abdication of Reza Shah as a central political figure in Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/oil-agreements-in-iran/'
          }
        },
        {
          id: 'q5',
          text: 'Moṣaddeq himself strongly suspected the British of having long endeavored to bring about his political frustration and discomfiture',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q6',
          text: 'The primary objective of Moṣaddeq and his colleagues was to lend substance to Persia’s independence by asserting her sovereign rights over her natural sources of wealth, particularly oil. They shared the widely held belief in the extensive and insidious influence of Britain and considered the termination or radical reduction of such influence as essential to the affirmation of Persian national sovereignty.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q8',
          text: 'The special interest you have shown on various occasions in the welfare of our country in general, and in the recent oil question in particular, and the personal message you were kind enough to send me on 3 [1] June 1951,2 prompt me to inform you that the Imperial Iranian Government has been duty-bound to put into force the law enacted by the two Houses of Parliament concerning the nationalization of the oil industry all over Iran and the modus operandi of that law in the quickest possible time.',
          lang: 'en',
          cite: {
            source: 'frus-1952-54-v10-mosadeq-to-truman-1951-06-28',
            loc: { section: 'No. 34: Prime Minister Mosadeq to President Truman', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1952-54v10/d34'
          }
        },
        {
          id: 'q9',
          text: 'Although the Iranian people have prepared themselves for every kind of privations in their resolve to achieve their aim, yet there is no doubt that the stoppage in the exploitation of oil machinery is not only damaging to us but it is also damaging to Great Britain and to all other countries which use the Iranian oil',
          lang: 'en',
          cite: {
            source: 'frus-1952-54-v10-mosadeq-to-truman-1951-06-28',
            loc: { section: 'No. 34: Prime Minister Mosadeq to President Truman', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1952-54v10/d34'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q7',
          text: 'Almost no resistance was offered by Mo-ṣaddeq’s earlier supporters. He was arrested on 20 August 1953 and later tried in a military court and banished to Aḥmadābād, a village he owned.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'mosaddegh-1986-khaterat-va-taallomat', perspective: 'iranian' },
    { source: 'movahhed-1999-khvab-e-ashofteh-ye-naft', perspective: 'iranian' },
    { source: 'makki-1983-ketab-e-siyah', perspective: 'iranian' }
  ]
})
