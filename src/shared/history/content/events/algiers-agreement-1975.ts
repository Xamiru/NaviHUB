import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'algiers-agreement-1975',
  names: [
    { text: 'Algiers Agreement of 1975', lang: 'en', role: 'primary' },
    {
      text: 'Algiers Protocol',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '39' }
        }
      ]
    },
    {
      text: 'قرارداد ۱۹۷۵ الجزایر',
      lang: 'fa',
      role: 'native',
      translit: 'Qarārdād-e 1975-e Aljazāyer'
    },
    {
      text: 'اتفاقیه الجزایر',
      lang: 'fa',
      role: 'alternative',
      translit: 'Ettefāqiya-ye Aljazāyer'
    }
  ],
  researched: '2026-10-09',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1975-03-06' },
        cites: [
          {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '39' }
          },
          {
            source: 'iranica-kechichian-boundaries-iraq',
            loc: { section: 'BOUNDARIES iv. With Iraq', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1975-06-13' },
        cites: [
          {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '40' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:algiers',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '39' }
        }
      ]
    },
    {
      ref: 'place:baghdad',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '40' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'iran',
      name: 'Iran',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '39' }
        }
      ],
      polity: 'polity:pahlavi-iran'
    },
    {
      key: 'iraq',
      name: 'Iraq',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '39' }
        }
      ],
      polity: 'polity:republic-of-iraq'
    }
  ],
  participants: [
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'signatory',
      side: 'iran',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '39' }
        },
        { source: 'pahlavi-1980-answer-to-history', loc: { section: 'Foreign Policy' } }
      ]
    },
    {
      ref: 'person:saddam-hussein',
      role: 'signatory',
      side: 'iraq',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '39' }
        }
      ]
    },
    {
      name: 'Houari Boumediene',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '39' }
        }
      ]
    },
    {
      name: 'Mustafa Barzani',
      role: 'victim',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '37' }
        },
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '41' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iranian-claim-to-bahrain',
      rel: 'related',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'State and Society, 1964-74', para: '15' }
        }
      ]
    },
    {
      ref: 'event:founding-of-opec',
      rel: 'related',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '39' }
        }
      ]
    },
    {
      ref: 'event:kurdish-uprising-in-iran-1979',
      rel: 'related',
      cites: [
        {
          source: 'iranica-kechichian-boundaries-iraq',
          loc: { section: 'BOUNDARIES iv. With Iraq', para: '3' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' },
    { ref: 'polity:republic-of-iraq' }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/1975_Algiers_Agreement.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:1975_Algiers_Agreement.jpg',
    credit: {
      institution: 'new.sajed.ir (source link stated on the Commons file page; photographer unknown)'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Relations with Iraq remained strained until 1975, when Iran and Iraq signed the Algiers Agreement, under which Iraq conceded Iran\'s long-standing demand for equal navigation rights in the Shatt al Arab, and the shah agreed to end support for the Kurdish rebellion in northern Iraq.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/19.htm' }
        },
        {
          id: 'q1',
          text: '1975 The dispute between Iran and Iraq over the Shaṭṭ-al-Arab waterway is settled by the Algiers Agreement, whereby the deepest level of water in the Shaṭṭ-al-Arab is to constitute the international boundary between the two countries.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1975' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In retaliation, the shah decided in the early 1970s “to settle the score with these people [Iraqis] once and for all” by supporting the restless Iraqi Kurds',
          lang: 'en',
          cite: {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
          }
        },
        {
          id: 'q4',
          text: 'Unable to win the war against the Kurds, Iraq intensified border clashes with Iran. In one major border confrontation in 1974, 41 Iranians and at least 23 Iraqis were killed (Jaʿfari Valdāni, p. 452). After this battle, Iraq appealed to the United Nations, hoping to internationalize its conflict with Iran. U.N. Resolution 348 called upon the two countries to simultaneously withdraw their forces from the border areas and to begin negotiations for peace. Iran and Iraq complied with the resolution and conducted two rounds of unproductive negotiations in Istanbul, Turkey.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
          }
        },
        {
          id: 'q5',
          text: 'The shah was convinced that the 1937 treaty had been forced upon a weaker Iran by a more powerful Iraq, then a client of the British Empire.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-boundaries-iraq',
            loc: { section: 'BOUNDARIES iv. With Iraq', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/boundaries-iv/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q8',
          text: 'In the resulting settlement 593 new border points were designated, and it was agreed that the thalweg would serve as boundary from the point where the land frontier reaches the Šaṭṭ al-ʿArab to the Persian Gulf (Article 2 of the protocol; see Pārsādūst, p. 251). Iran pledged to abandon its support of the Kurdish rebellion in northern Iraq and Iraq to end its support for separatist Arabs in Ḵūzestān. Iran also agreed to return several disputed pockets of land between Solaymānīya and Mandalī and to share the river waters along the border more equitably.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-boundaries-iraq',
            loc: { section: 'BOUNDARIES iv. With Iraq', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/boundaries-iv/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'A year and a half later, in September 1980, Saddam Hossein ordered the invasion of Iran, blatantly violating international law and the 1975 treaty he had signed.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '44' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
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
            value: { d: '1975-03-06' },
            cites: [
              {
                source: 'iranica-milani-iraq-pahlavi',
                loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '39' }
              },
              {
                source: 'iranica-kechichian-boundaries-iraq',
                loc: { section: 'BOUNDARIES iv. With Iraq', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The two leaders met twice and issued a joint communiqué on 6 March 1975, also known as the Algiers Protocol.',
        lang: 'en',
        cite: {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '39' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1975-03-13' },
            cites: [
              {
                source: 'iranica-milani-iraq-pahlavi',
                loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '41' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Iranian support was so instrumental that Barezani accepted a cease-fire agreement with Iraq on 13 March 1975, only eight short days after the signing of the Algiers Protocols.',
        lang: 'en',
        cite: {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '41' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1975-06-13' },
            cites: [
              {
                source: 'iranica-milani-iraq-pahlavi',
                loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '40' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'On 13 June 1975, they signed the “Treaty Concerning the State Frontier and Neighborly Relations between Iran and Iraq” and the “Protocol Concerning the Delimitation of the River Frontier between Iran and Iraq.”',
        lang: 'en',
        cite: {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '40' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-06-19' },
            cites: [
              {
                source: 'iranica-kechichian-boundaries-iraq',
                loc: { section: 'BOUNDARIES iv. With Iraq', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'When the shah was forced from his throne in Bahman, 1357 Š./February, 1979, however, several border issues still remained unresolved. The regime or Ayatollah Ḵomeynī, hoping for revolution among Iraqi Shiʿites, declared on 19 June 1979 that Iran would no longer be bound by the Algiers agreement',
        lang: 'en',
        cite: {
          source: 'iranica-kechichian-boundaries-iraq',
          loc: { section: 'BOUNDARIES iv. With Iraq', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/boundaries-iv/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1980-09-17' },
            cites: [
              {
                source: 'iranica-gieling-iraq-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'But five years later, on 17 September 1980, Iraq suddenly abrogated the Algiers Protocol following the Iranian revolution.',
        lang: 'en',
        cite: {
          source: 'iranica-gieling-iraq-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war/'
        }
      }
    }
  ]
})
