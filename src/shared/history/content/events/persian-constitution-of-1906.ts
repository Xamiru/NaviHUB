import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'persian-constitution-of-1906',
  names: [
    { text: 'Persian Constitution of 1906', lang: 'en', role: 'primary' },
    { text: 'قانون اساسی مشروطه', lang: 'fa', role: 'native' },
    {
      text: 'qānun-e asāsi',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-5',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1906-12-30' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '2' }
          },
          {
            source: 'iranica-arjomand-constitutional-revolution-constitution',
            loc: { section: 'iii. The Constitution', para: '3' }
          }
        ]
      },
      {
        value: { d: '1907-01-01' },
        cites: [
          {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '10'
            }
          }
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
          source: 'iranica-arjomand-constitutional-revolution-constitution',
          loc: { section: 'iii. The Constitution', para: '6' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:persian-constitutional-revolution' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:mozaffar-al-din-shah',
      role: 'signatory',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Constitutional Revolution', para: '2' }
        },
        {
          source: 'iranica-arjomand-constitutional-revolution-constitution',
          loc: { section: 'iii. The Constitution', para: '3' }
        }
      ]
    },
    {
      name: 'Ṣanīʿ-al-Dawla',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-arjomand-constitutional-revolution-constitution',
          loc: { section: 'iii. The Constitution', para: '3' }
        }
      ]
    },
    {
      ref: 'person:mohammad-ali-shah-qajar',
      role: 'signatory',
      cites: [
        {
          source: 'iranica-arjomand-constitutional-revolution-constitution',
          loc: { section: 'iii. The Constitution', para: '4' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'The constitutional law of 1906 consisted of a short preamble and fifty-one articles, at least six of which (Arts. 12, 31-32, 34, 46, 48) corresponded, fully or in part, to articles in the Belgian constitution; at least five (Arts. 13, 18, 23, 25, 42) corresponded to provisions in the Bulgarian constitution of 1879, though none was a verbatim translation',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitutional-revolution-constitution',
            loc: { section: 'iii. The Constitution', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iii'
          }
        },
        {
          id: 'q7',
          text: 'The section entitled “On the formation of the Majles” (Arts. 1-14) established the Majles-e šūrā-ye mellī (National consultative assembly), consisting of 162 representatives from Tehran and the provinces, to be elected for two years and to convene in the capital.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitutional-revolution-constitution',
            loc: { section: 'iii. The Constitution', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iii'
          }
        },
        {
          id: 'q3',
          text: 'In October an elected assembly convened and drew up a constitution that provided for strict limitations on royal power, an elected parliament, or Majlis, with wide powers to represent the people, and a government with a cabinet subject to confirmation by the Majlis.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/13.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The chief issue under discussion in the autumn of 1906 was the proposed constitution. It was agreed that the Majles, representing the people, would have the right to propose legislation and have final authority over the laws, the budget, and financial policy.',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        },
        {
          id: 'q2',
          text: 'The most contentious issue, the nomination of members of the senate, was resolved by allowing the shah and the Majles each to appoint half the members.',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q8',
          text: 'The foremost goal of the constitutionalists was, of course, to limit the absolute power of the shah.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitutional-revolution-constitution',
            loc: { section: 'iii. The Constitution', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iii'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q13',
          text: 'The Constitution of Persia thus consisted of the constitutional law signed in December 1906 and the supplement signed in October 1907',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitutional-revolution-constitution',
            loc: { section: 'iii. The Constitution', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iii'
          }
        },
        {
          id: 'q5',
          text: 'The Supplementary Fundamental Laws approved in 1907 provided, within limits, for freedom of press, speech, and association, and for security of life and property.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/13.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Antoin_Sevruguin_51_14_SI.jpg/1280px-Antoin_Sevruguin_51_14_SI.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Antoin_Sevruguin_51_14_SI.jpg',
    title: 'Studio Portrait of Muzaffar Al-Din Shah after Coronation',
    credit: {
      institution: 'Freer Gallery of Art and Arthur M. Sackler Gallery Archives, Smithsonian Institution',
      creator: 'Antoin Sevruguin'
    },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1906-10-18' },
            cites: [
              {
                source: 'iranica-arjomand-constitutional-revolution-constitution',
                loc: { section: 'iii. The Constitution', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'A charter was speedily drafted and sent to the monarch; the shah acknowledged its receipt on 29 Šaʿbān 1324/18 October 1906 but procrastinated for weeks and returned it with alterations only on 9 Ḏu’l-Qaʿda/25 December.',
        lang: 'en',
        cite: {
          source: 'iranica-arjomand-constitutional-revolution-constitution',
          loc: { section: 'iii. The Constitution', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1906-12-30' },
            cites: [
              {
                source: 'iranica-arjomand-constitutional-revolution-constitution',
                loc: { section: 'iii. The Constitution', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'A new draft, incorporating some of his alterations, was submitted two days later, and the shah signed it on 14 Ḏu’l-Qaʿda/30 December, ten days before his death.',
        lang: 'en',
        cite: {
          source: 'iranica-arjomand-constitutional-revolution-constitution',
          loc: { section: 'iii. The Constitution', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1907-01-01' },
            cites: [
              {
                source: 'iranica-martin-constitutional-revolution-events',
                loc: {
                  section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
                  para: '10'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The Constitution was rushed to the shah to be signed and presented to the Majles on 16 Ḏu’l-qaʿda 1324/1 January 1907, just before his death',
        lang: 'en',
        cite: {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
            para: '10'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1907-10-08' },
            cites: [
              {
                source: 'iranica-arjomand-constitutional-revolution-constitution',
                loc: { section: 'iii. The Constitution', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'After a considerable period of debate over its provisions the supplement was eventually ratified by the Majles and signed by Moḥammad-ʿAlī Shah (1324-27/1907-09) on 29 Šaʿbān 1325/8 October 1907.',
        lang: 'en',
        cite: {
          source: 'iranica-arjomand-constitutional-revolution-constitution',
          loc: { section: 'iii. The Constitution', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iii'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'kasravi-1940-tarikh-e-mashruteh-ye-iran', perspective: 'iranian' },
    { source: 'adamiyat-1976-ideolozhi-ye-nehzat-e-mashrutiyat', perspective: 'iranian' }
  ]
})
