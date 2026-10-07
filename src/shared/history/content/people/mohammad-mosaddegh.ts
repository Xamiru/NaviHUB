import { definePerson } from '../../schema'

export default definePerson({
  id: 'mohammad-mosaddegh',
  names: [
    { text: 'Mohammad Mosaddegh', lang: 'en', role: 'primary' },
    { text: 'محمد مصدق', lang: 'fa', role: 'native' },
    { text: 'Moḥammad Moṣaddeq', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-07',
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
        },
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
          text: 'Moṣaddeq himself strongly suspected the British of having long endeavored to bring about his political frustration and discomfiture (Moṣaddeq, 1365 Š./1985, pp. 216-17).',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
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
          text: 'They shared the widely held belief in the extensive and insidious influence of Britain and considered the termination or radical reduction of such influence as essential to the affirmation of Persian national sovereignty.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q7',
          text: 'He was arrested on 20 August 1953 and later tried in a military court and banished to Aḥmadābād, a village he owned.',
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
    }
  ]
})
