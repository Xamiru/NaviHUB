import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'revolt-of-aga-khan-i',
  names: [
    { text: 'Revolt of Aga Khan I', lang: 'en', role: 'primary' },
    { text: 'شورش آقاخان محلاتی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1840-09' },
        cites: [
          {
            source: 'iranica-algar-aqa-khan-mahallati',
            loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1841' },
        cites: [
          {
            source: 'iranica-bonakdarian-india-relations-qajar-19th-century',
            loc: { section: 'INDIA viii. Relations: Qajar Period, the 19th Century', para: '19' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Mansour Bonakdarian' }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:kerman',
      cites: [
        {
          source: 'iranica-algar-aqa-khan-mahallati',
          loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '4' }
        },
        {
          source: 'iranica-gustafson-kerman-qajar',
          loc: { section: 'KERMAN ix. History in the Qajar Period', para: '4' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-mohammad-shah-qajar' }
  ],
  participants: [
    {
      ref: 'person:aga-khan-i',
      role: 'leader',
      cites: [
        {
          source: 'iranica-algar-aqa-khan-mahallati',
          loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '4' }
        }
      ]
    },
    {
      ref: 'person:mohammad-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-algar-aqa-khan-mahallati',
          loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '4' }
        }
      ]
    },
    {
      ref: 'person:haji-mirza-aqasi',
      role: 'participant',
      cites: [
        {
          source: 'iranica-algar-aqa-khan-mahallati',
          loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '3' }
        }
      ]
    },
    {
      name: 'Bahman Mīrzā',
      role: 'participant',
      cites: [
        {
          source: 'iranica-algar-aqa-khan-mahallati',
          loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '4' }
        }
      ]
    },
    {
      name: 'Fażl-ʿAlī Khan Qarabāḡī',
      role: 'commander',
      cites: [
        {
          source: 'iranica-algar-aqa-khan-mahallati',
          loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '4' }
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
          text: 'Form 1840 to 1841 the Nizari Ismaʿili Shiʿite leader, Hassan Ali Shah Aga Khan Mahallati (Aga Khan I), had engaged in military confrontations with the Qajar state, following his dismissal as the governor of Kermān in 1837.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-relations-qajar-19th-century',
            loc: { section: 'INDIA viii. Relations: Qajar Period, the 19th Century', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/india-viii-relations-qajar-period-the-19th-century'
          }
        },
        {
          id: 'q2',
          text: 'After his dismissal in 1836 and periods of rebellion and peaceful life, Āqā Khan undertook another revolt but was defeated.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '14' }
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
          id: 'q3',
          text: 'Thus ended the Iranian period of the Nezārī Ismaʿili imamate.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-aqa-khan-mahallati',
            loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqa-khan/aqa-khan-i-aqa-khan-i-ma%e1%b8%a5allati'
          }
        },
        {
          id: 'q4',
          text: 'He went to Afghanistan and moved to India under British rule, where he installed the seat of the Nezāri Ismaʿili imamate (Daftary, pp. 501 ff.; Bayat, pp. 60 ff.).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q5',
          text: 'Defeated, he fled to Afghanistan in 1841 with an army of his followers during the Anglo-Afghan War of 1839-42 (q.v.), where he established a long-lasting association with British military authorities and officials.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-relations-qajar-19th-century',
            loc: { section: 'INDIA viii. Relations: Qajar Period, the 19th Century', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/india-viii-relations-qajar-period-the-19th-century'
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
            value: { d: '1836' },
            cites: [
              {
                source: 'iranica-algar-aqa-khan-mahallati',
                loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '2' }
              },
              {
                source: 'iranica-calmard-mohammad-shah',
                loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '14' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Hamid Algar' },
              { kind: 'scholar', name: 'Jean Calmard' }
            ]
          },
          {
            value: { d: '1837' },
            cites: [
              {
                source: 'iranica-bonakdarian-india-relations-qajar-19th-century',
                loc: {
                  section: 'INDIA viii. Relations: Qajar Period, the 19th Century',
                  para: '19'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Mansour Bonakdarian' }
            ]
          },
          {
            value: { d: '1838' },
            cites: [
              {
                source: 'iranica-gustafson-kerman-qajar',
                loc: { section: 'KERMAN ix. History in the Qajar Period', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'James M. Gustafson' }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'In 1252/1836 an army advanced on Kermān in order to replace him with Fīrūz Mīrzā, a Qajar prince.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-aqa-khan-mahallati',
          loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/aqa-khan/aqa-khan-i-aqa-khan-i-ma%e1%b8%a5allati'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1840-09' },
            cites: [
              {
                source: 'iranica-algar-aqa-khan-mahallati',
                loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Permission was granted, and the Āqā Khan left Maḥallāt in Raǰab, 1256/September, 1840.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-aqa-khan-mahallati',
          loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/aqa-khan/aqa-khan-i-aqa-khan-i-ma%e1%b8%a5allati'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1840' },
            cites: [
              {
                source: 'iranica-gustafson-kerman-qajar',
                loc: { section: 'KERMAN ix. History in the Qajar Period', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'After a period of house arrest in Maḥallāt, Āqā Khan forged appointment papers and assumed the governorship of Kerman briefly in 1840 and procured support from the urban elite for his rule.',
        lang: 'en',
        cite: {
          source: 'iranica-gustafson-kerman-qajar',
          loc: { section: 'KERMAN ix. History in the Qajar Period', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/kerman-09-qajar-period'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1842' },
            cites: [
              {
                source: 'iranica-algar-aqa-khan-mahallati',
                loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'After a few months at the village of Rūmanī near Šahr-e Bābak, the Āqā Khan moved westwards in the direction of Fārs, where he stayed until the spring of 1258/1842 (ʿEbrat-afzā, ed. Kūhī Kermānī, pp. 32-35).',
        lang: 'en',
        cite: {
          source: 'iranica-algar-aqa-khan-mahallati',
          loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/aqa-khan/aqa-khan-i-aqa-khan-i-ma%e1%b8%a5allati'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Aga_Khan_I.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Aga_Khan_I.jpg',
    credit: { institution: 'H. Butler, India Insistent (Heinemann, 1931)' },
    license: { id: 'public-domain' }
  }
})
