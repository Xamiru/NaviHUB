import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iranian-claim-to-bahrain',
  names: [
    { text: 'Iranian claim to Bahrain', lang: 'en', role: 'primary' },
    { text: 'مسئله بحرین', lang: 'fa', role: 'native' },
    { text: 'Bahrain question', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1927-11-22' },
        cites: [
          {
            source: 'iranica-kechichian-bahrain-political-relations-with-iran',
            loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1970' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1970' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:bahrain',
      cites: [
        {
          source: 'iranica-kechichian-bahrain-political-relations-with-iran',
          loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:pahlavi-dynasty' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-kechichian-bahrain-political-relations-with-iran',
          loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '3' }
        }
      ]
    },
    {
      name: 'Shaikh ʿĪsā b. Salmān al-Ḵalīfa',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-kechichian-bahrain-political-relations-with-iran',
          loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '3' }
        }
      ]
    },
    {
      name: 'Sir Austen Chamberlain',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-kechichian-bahrain-political-relations-with-iran',
          loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '2' }
        }
      ]
    },
    {
      name: 'Vittoria Winspeare Guicciardi',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-kechichian-bahrain-political-relations-with-iran',
          loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '4' }
        }
      ]
    },
    {
      ref: 'person:amir-abbas-hoveyda',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-kechichian-bahrain-political-relations-with-iran',
          loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '5' }
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
          text: 'Up to 1970, Iran claimed that “Bahrain had always and uninterruptedly formed part of Persia in past centuries, except during the Portuguese occupation from 1507 to 1622, in which year the Persian Government resumed possession of this territory”',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-bahrain-political-relations-with-iran',
            loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/bahrain-iii/'
          }
        },
        {
          id: 'q2',
          text: '1970 The Shah relinquishes Iran’s claim to Bahrain following UN-sponsored elections to determine Bahrain’s preferences.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1970' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: '(Ramazani, 1966, p. 248). Yet, even though the Portuguese were driven out of Bahrain in 1622 by the Safavid Shah ʿAbbās, Persian rule over the island did not become effective until 1753, when Shaikh Naṣīr of Būšehr sent an expeditionary force to conquer the archipelago from the Arab Howayla tribe. In 1783, Bahrain was reconquered by the Arab al-ʿOtūb tribe led by Aḥmad al-Ḵalīfa. The British government, which had entered into treaty relations with al-Ḵalīfa in 1820, formalized its ties through treaties signed in 1847, 1856, 1861, and the Executive Agreements of 1880 and 1892 establishing “exclusive” control over Bahrain’s foreign relations (Lorimer, pp. 836-999, passim), and questioned the validity of the Iranian claim.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-bahrain-political-relations-with-iran',
            loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/bahrain-iii/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'London rejected this protest in a letter dated January 18, 1928, from Sir Austen Chamberlain, the British Foreign Secretary, to Hovhannes Khan Mossaed (Mosāʿed), the Persian chargé d’affaires in London. The British denied that “any valid grounds” existed upon which Iran could claim sovereignty over Bahrain (Khadduri, p. 633), and stressed that not only was the shaikh of Bahrain an “independent” ruler but that the island and its inhabitants were under British protection.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-bahrain-political-relations-with-iran',
            loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/bahrain-iii/'
          }
        },
        {
          id: 'q5',
          text: 'Bahrain’s politico-strategic significance increased when it became a British stronghold east of Suez after the People’s Democratic Republic of Yemen achieved independence. Its strategic appeal to Iran was further heightened when Britain announced its intention to withdraw its troops from throughout the Gulf before the end of 1971 and to terminate the treaties binding it to the Gulf shaikhdoms.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-bahrain-political-relations-with-iran',
            loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/bahrain-iii/'
          }
        },
        {
          id: 'q6',
          text: 'After several months of secret negotiations the problem was resolved.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-bahrain-political-relations-with-iran',
            loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/bahrain-iii/'
          }
        },
        {
          id: 'q7',
          text: 'The Guicciardi delegation interviewed civic and religious officials and ordinary individuals and representatives in a wide variety of organizations, institutions, and professional groups, asking them to choose either union with Iran, or status as a British protectorate, or independence. The mission found that Bahrainis “virtually unanimously” wanted a “fully independent sovereign state” and the great majority insisted that it should be an Arab state',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-bahrain-political-relations-with-iran',
            loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/bahrain-iii/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Manāma declared its independence on August 14, 1971, and Tehran reportedly was the first nation to extend diplomatic recognition.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-bahrain-political-relations-with-iran',
            loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/bahrain-iii/'
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
            value: { d: '1927-11-22' },
            cites: [
              {
                source: 'iranica-kechichian-bahrain-political-relations-with-iran',
                loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Iran disclosed its claim to Bahrain on November 22, 1927, when “the Persian Acting Minister for Foreign Affairs addressed a sharp letter to Sir Robert Clive, the British Minister at Tehran, in which he reiterated that Bahrain was incontestably in Persian possession”',
        lang: 'en',
        cite: {
          source: 'iranica-kechichian-bahrain-political-relations-with-iran',
          loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/bahrain-iii/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1957-11-12' },
            cites: [
              {
                source: 'iranica-kechichian-bahrain-political-relations-with-iran',
                loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'But on November 12, 1957, Tehran decided to officially integrate Bahrain as the fourteenth Iranian province in the administrative divisions of the country, drawing strong protests from Britain and the League of Arab States. Addressing the Majles, the Iranian foreign minister responded by declaring: “Our Arab brothers should know that Bahrain is part of our body and the question of Bahrain is of vital interest to Iran”',
        lang: 'en',
        cite: {
          source: 'iranica-kechichian-bahrain-political-relations-with-iran',
          loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/bahrain-iii/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1968-07-08' },
            cites: [
              {
                source: 'iranica-kechichian-bahrain-political-relations-with-iran',
                loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Tehran announced its opposition to the project on July 8, 1968, when the foreign minister released a strongly worded communiqué stating that “the creation of a so-called confederation of Persian Gulf emirates embracing the Bahrain islands is absolutely unacceptable to Iran”',
        lang: 'en',
        cite: {
          source: 'iranica-kechichian-bahrain-political-relations-with-iran',
          loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/bahrain-iii/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1969-01-04' },
            cites: [
              {
                source: 'iranica-kechichian-bahrain-political-relations-with-iran',
                loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On this occasion, he softened his attitude toward Bahrain, and suggested that the indigenous population should voice freely its wishes through a United Nations supervised referendum.',
        lang: 'en',
        cite: {
          source: 'iranica-kechichian-bahrain-political-relations-with-iran',
          loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/bahrain-iii/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1970-03-09' },
            cites: [
              {
                source: 'iranica-kechichian-bahrain-political-relations-with-iran',
                loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The shah also clarified his intentions and took the initiative on March 9, 1970, by formally requesting the good offices of the Secretary General to send an emissary, so that the true wishes of the people of Bahrain with respect to the future status of the Islands of Bahrain could be ascertained',
        lang: 'en',
        cite: {
          source: 'iranica-kechichian-bahrain-political-relations-with-iran',
          loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/bahrain-iii/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1970' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-3',
                loc: { section: 'Chronology of Iranian History Part 3, 1970' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The report was endorsed by the Security Council on April 30 and Iran indicated its acceptance of the Bahrain settlement. Prime Minister Hoveyda introduced a resolution to the Majles and the Senate and the government’s action was approved by the Majles on May 14 by 184 votes to 4 and unanimously by the Senate on May 18',
        lang: 'en',
        cite: {
          source: 'iranica-kechichian-bahrain-political-relations-with-iran',
          loc: { section: 'BAHRAIN iii. History of Political Relations with Iran', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/bahrain-iii/'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'adamiyat-1955-bahrein-islands', perspective: 'iranian' }
  ]
})
