import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'tehran-agreement-1971',
  names: [
    { text: 'Tehran Agreement', lang: 'en', role: 'primary' },
    {
      text: 'Tehran oil agreement of 1971',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: {
            section: 'Document 115. Intelligence Note RECN–3 Prepared in the Bureau of Intelligence and Research'
          }
        }
      ]
    },
    { text: 'قرارداد تهران', lang: 'fa', role: 'native', translit: 'Qarārdād-e Tehrān' }
  ],
  researched: '2026-10-09',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1971-02-14' },
        cites: [
          {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: {
              section: 'Document 115. Intelligence Note RECN–3 Prepared in the Bureau of Intelligence and Research'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: {
            section: 'Document 115. Intelligence Note RECN–3 Prepared in the Bureau of Intelligence and Research'
          }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'leader',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: { section: 'Iran 1971' }
        },
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: { section: 'Summary' }
        }
      ]
    },
    {
      ref: 'person:jamshid-amouzegar',
      role: 'negotiator',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: { section: 'Iran 1971' }
        }
      ]
    },
    {
      name: 'John N. Irwin II',
      role: 'diplomat',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: { section: 'Iran 1971' }
        }
      ]
    },
    {
      name: 'Douglas MacArthur II',
      role: 'diplomat',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: { section: 'Iran 1971' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:founding-of-opec',
      rel: 'preceded-by',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: {
            section: 'Document 115. Intelligence Note RECN–3 Prepared in the Bureau of Intelligence and Research'
          }
        }
      ]
    },
    {
      ref: 'event:1973-oil-crisis',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-oil-embargo',
          loc: { section: 'Oil Embargo, 1973–1974', para: '5' }
        },
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-6',
          loc: {
            section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
          }
        }
      ]
    },
    {
      ref: 'event:iranian-oil-consortium-agreement-1954',
      rel: 'related',
      cites: [
        {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: { section: 'Summary' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' },
    { ref: 'polity:united-states' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/ShahOPECmembers.jpg/1280px-ShahOPECmembers.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:ShahOPECmembers.jpg',
    credit: {
      institution: 'National Iranian Oil Company (NIOC), Iranian Oil Industry during the Kingdom of the Pahlavi Dynasty, p. 71'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The international oil companies signed a new oil tax and price agreement with OPEC’s* six Persian Gulf members in Tehran February 14 and take on OPEC’s Mediterranean wing next week at dates not yet known.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: {
              section: 'Document 115. Intelligence Note RECN–3 Prepared in the Bureau of Intelligence and Research'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve04/d115'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The Gulf agreement climaxed six weeks of sporadic bargaining and ultimatums since publication in late December of OPEC Resolution [Page 2] XXI/120. This contained demands for a minimum OPEC oil tax rate of 55 per cent and negotiation within 30 days of higher posted prices, the price on which taxes are based regardless of actual market prices, which normally are lower than tax prices. The companies countered with a demand for a five-year, OPEC-wide agreement but OPEC successfully insisted on a regional approach beginning with the Persian Gulf. Because of its distance from the markets, the Gulf has less bargaining power than other OPEC areas but the prevailing tight oil market has enhanced Gulf leverage, too.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: {
              section: 'Document 115. Intelligence Note RECN–3 Prepared in the Bureau of Intelligence and Research'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve04/d115'
          }
        },
        {
          id: 'q3',
          text: 'To finance the type of military he envisioned, the Shah required ever-increasing oil revenues, and appealed for U.S. support in his battles with the western oil consortium that lifted Iranian oil.',
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
        },
        {
          id: 'q5',
          text: 'Under Secretary Irwin reported back to President Nixon and Secretary Rogers on his meeting with the Shah, in which the Shah lobbied for a separate Persian Gulf oil agreement rather than the OPEC-wide deal that the companies sought.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: { section: 'Iran 1971' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve04/ch3'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The Gulf agreement is for five years but some oilmen doubt that it will last that long. According to preliminary reports, it gives Gulf governments an immediate revenue increase of almost 30 per cent for crude oil exported from Gulf terminals, with further increases through 1975.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: {
              section: 'Document 115. Intelligence Note RECN–3 Prepared in the Bureau of Intelligence and Research'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve04/d115'
          }
        },
        {
          id: 'q18',
          text: 'In return for yielding nearly the entire 30-cent increase the Gulf originally demanded the companies appear to have obtained the assurances of stability they wanted, but reportedly feel insecure in these assurances and would like consumer governments to reinforce them by an expression of their expectation that the Gulf countries will respect them. By settling when they did, the companies avoided an imposed or legislated settlement which would have been difficult to alter in the event their bargaining position should later substantially improve.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: {
              section: 'Document 115. Intelligence Note RECN–3 Prepared in the Bureau of Intelligence and Research'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve04/d115'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'The agreement did not end concern over a possible oil supply interruption since negotiations affecting the 45 per cent of Western Europe’s oil obtained from Mediterranean sources have not begun in earnest.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: {
              section: 'Document 115. Intelligence Note RECN–3 Prepared in the Bureau of Intelligence and Research'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve04/d115'
          }
        },
        {
          id: 'q11',
          text: 'Ambassador MacArthur alerted the Department that the Shah hoped to bridge the gap between the recent Persian Gulf oil settlement and the more favorable terms that Libya had just secured.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: { section: 'Iran 1971' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve04/ch3'
          }
        },
        {
          id: 'q12',
          text: 'The shah played an important role in leading OPEC to a policy of “price rise, price and production control” between 1970 and 1975, posing as the champion of the oil producers and of the Third World against “domination and exploitation” of the West',
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
        },
        {
          id: 'q19',
          text: 'Some consumer sources have hinted at reducing or eliminating the oil company role in favor of government-to-government oil arrangements. Iran’s Shah touched on this in February 16 remarks stating that Iran would seek to replace the companies “in a generation or so” by exploring for, producing and marketing its own oil.',
          lang: 'en',
          cite: {
            source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
            loc: {
              section: 'Document 115. Intelligence Note RECN–3 Prepared in the Bureau of Intelligence and Research'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76ve04/d115'
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
            value: { d: '1971-01-14' },
            cites: [
              {
                source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
                loc: { section: 'Iran 1971' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'MacArthur warned that the Shah, indignant over the consortium’s delay in meeting with OPEC Persian Gulf producers, was threatening unilateral OPEC cutbacks.',
        lang: 'en',
        cite: {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: { section: 'Iran 1971' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/historicaldocuments/frus1969-76ve04/ch3'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1971-02-14' },
            cites: [
              {
                source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
                loc: {
                  section: 'Document 115. Intelligence Note RECN–3 Prepared in the Bureau of Intelligence and Research'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The report summarized the terms of the final oil agreement between OPEC’s Persian Gulf members and the international oil companies.',
        lang: 'en',
        cite: {
          source: 'frus-1969-76-ve04-documents-on-iran-and-iraq-1969-1972',
          loc: { section: 'Iran 1971' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/historicaldocuments/frus1969-76ve04/ch3'
        }
      }
    }
  ]
})
