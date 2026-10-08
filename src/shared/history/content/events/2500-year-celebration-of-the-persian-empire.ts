import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2500-year-celebration-of-the-persian-empire',
  names: [
    { text: '2,500-year celebration of the Persian Empire', lang: 'en', role: 'primary' },
    {
      text: 'جشن‌های ۲۵۰۰ ساله شاهنشاهی ایران',
      lang: 'fa',
      role: 'native',
      translit: 'Jašnhā-ye 2500 sāla-ye šāhanšāhi-ye Irān'
    },
    {
      text: '25th Centenary Celebrations',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: {
            section: 'Document 148. Memorandum From the President’s Assistant for National Security Affairs (Kissinger) to Vice President Agnew'
          }
        }
      ]
    },
    {
      text: 'Celebrations of the 2,500th anniversary of the Persian monarchy',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1971' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1971-10' },
        cites: [
          {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: { section: 'Summary' }
          },
          {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: {
              section: 'Document 164. Research Study RNAS–2 Prepared in the Bureau of Intelligence and Research'
            }
          },
          {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: {
              section: 'Document 150. Telegram 189359 From the Department of State to the U.S. Delegation to the 25th Centenary Celebration in Shiraz, Iran'
            }
          },
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1971' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:persepolis',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1971' }
        }
      ]
    },
    {
      ref: 'place:shiraz',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: {
            section: 'Document 150. Telegram 189359 From the Department of State to the U.S. Delegation to the 25th Centenary Celebration in Shiraz, Iran'
          }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  participants: [
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: {
            section: 'Document 148. Memorandum From the President’s Assistant for National Security Affairs (Kissinger) to Vice President Agnew'
          }
        },
        { source: 'pahlavi-1980-answer-to-history', loc: { section: 'Foreign Policy' } }
      ]
    },
    {
      name: 'Spiro T. Agnew',
      role: 'participant',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: {
            section: 'Document 148. Memorandum From the President’s Assistant for National Security Affairs (Kissinger) to Vice President Agnew'
          }
        }
      ]
    },
    {
      name: 'Yahya Khan',
      role: 'participant',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: {
            section: 'Document 148. Memorandum From the President’s Assistant for National Security Affairs (Kissinger) to Vice President Agnew'
          }
        },
        { source: 'pahlavi-1980-answer-to-history', loc: { section: 'Foreign Policy' } }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 69 },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-3',
                loc: { section: 'Chronology of Iranian History Part 3, 1971' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:bangladesh-liberation-war',
      rel: 'related',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: {
            section: 'Document 148. Memorandum From the President’s Assistant for National Security Affairs (Kissinger) to Vice President Agnew'
          }
        },
        { source: 'pahlavi-1980-answer-to-history', loc: { section: 'Foreign Policy' } }
      ]
    },
    {
      ref: 'event:iranian-claim-to-bahrain',
      rel: 'related',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: {
            section: 'Document 142. Telegram 4816 From the Embassy in Iran to the Department of State'
          }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' },
    { ref: 'polity:united-states' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Kayhan_1971-10-16.jpg/1280px-Kayhan_1971-10-16.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kayhan_1971-10-16.jpg',
    credit: { institution: 'Kayhan newspaper, Tehran, 16 October 1971 (page 13)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'As Iran splurged on a lavish 2500th anniversary celebration of the Persian monarchy in October 1971, the United States still provided Tehran grant military training in addition to the military credit, which was raised to $140 million in 1972.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: { section: 'Summary' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve04/summary'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'As anticipated in connection approach of UK withdrawal from Gulf and preparations for 25th centenary (reftels), subversive groups trained and infiltrated from without continue to be targeted on Iran.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: {
              section: 'Document 142. Telegram 4816 From the Embassy in Iran to the Department of State'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve04/d142'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The celebration last October of 2,500 years of the Iranian monarchy serves as a useful reference point in assessing the emergence of Iran as an independent political and military power in the Persian Gulf, especially as it affects Iran’s relations with the United States and has intensified the perennial Iranian feud with Iraq.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: {
              section: 'Document 164. Research Study RNAS–2 Prepared in the Bureau of Intelligence and Research'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve04/d164'
          }
        },
        {
          id: 'q8',
          text: '1976 A new Persian calendar is adopted, calculated on the basis of the founding of the Persian Empire in 6th century B.C. As of March 21, 1976, the new year is dated 2535 of the šāhanšāhi era, with the change lauded by nationalists and resented by the clergy; on the eve of the 1979 Islamic Revolution, Persia reverts back to the previous calendar.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1976' }
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
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q10',
          text: 'I wanted to take advantage of the presence in Persepolis of the then president of Pakistan, General Yahya Khan, on the occasion of the 2,500th anniversary of the Persian Empire. I hoped to arrange a meeting between him and the President of the USSR, Podgorny, and thus to help avert the impending conflict between India and Pakistan over Bangladesh.',
          lang: 'en',
          cite: { source: 'pahlavi-1980-answer-to-history', loc: { section: 'Foreign Policy' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
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
            value: { d: '1971-10' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-3',
                loc: { section: 'Chronology of Iranian History Part 3, 1971' }
              },
              {
                source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
                loc: { section: 'Summary' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q1',
        text: '1971 Celebrations mark the 2,500th anniversary of the foundation of the Persian monarchy; 69 heads of state or their representatives take part in the ceremonies at Persepolis.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1971' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1971' },
            cites: [
              {
                source: 'iranica-ardalan-architecture-pahlavi-after-wwii',
                loc: { section: 'ARCHITECTURE viii. Pahlavi, after World War II', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'The Šahyād monument, built in 1971 on the occasion of the 2500 year anniversary of the Iranian monarchy, continued the École des Beaux Arts line of monuments dedicated to renewed cultural identity. Designed by the Iranian architect H. Amānat, the structure attempts to unify three major periods of Persian history by combining the Sasanian parabolic arch of Ctesiphon with the pointed Islamic vault in a new construction of concrete and travertine.',
        lang: 'en',
        cite: {
          source: 'iranica-ardalan-architecture-pahlavi-after-wwii',
          loc: { section: 'ARCHITECTURE viii. Pahlavi, after World War II', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/architecture-viii/'
        }
      }
    }
  ]
})
