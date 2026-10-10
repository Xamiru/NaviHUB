import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'mykonos-restaurant-assassinations',
  names: [
    { text: 'Mykonos restaurant assassinations', lang: 'en', role: 'primary' },
    { text: 'ترور رستوران میکونوس', lang: 'fa', role: 'native' },
    { text: 'Mykonos-Attentat', lang: 'de', role: 'alternative' },
    { text: 'Mykonos trial', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-10',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1992-09-17' },
        cites: [
          {
            source: 'hrw-1993-world-report-iran',
            loc: { section: 'World Report 1993: Iran', para: '25' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1997-04' },
        cites: [
          {
            source: 'state-dept-1998-patterns-of-global-terrorism-1997-year-in-review',
            loc: { section: 'The Year in Review', para: '17' }
          },
          {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '34' }
          }
        ]
      },
      {
        value: { d: '1997-05' },
        cites: [
          {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '17' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Human Rights Watch' }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1992' }
        }
      ]
    },
    {
      ref: 'place:berlin-mykonos-restaurant',
      cites: [
        {
          source: 'state-dept-1998-patterns-of-global-terrorism-1997-year-in-review',
          loc: { section: 'The Year in Review', para: '17' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'state-dept-1998-patterns-of-global-terrorism-1997-year-in-review',
          loc: { section: 'The Year in Review', para: '17' }
        }
      ]
    },
    {
      ref: 'polity:federal-republic-of-germany',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '35' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'iran',
      name: 'The Iranian political leadership',
      polity: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '34' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Sadegh Sharafkandi',
      role: 'victim',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1992' }
        }
      ]
    },
    {
      name: 'Kazem Darabi',
      role: 'perpetrator',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '35' }
        }
      ]
    },
    {
      name: 'Ali Fallahian',
      role: 'participant',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1992' }
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
            value: { min: 4 },
            cites: [
              {
                source: 'state-dept-1998-patterns-of-global-terrorism-1997-year-in-review',
                loc: { section: 'The Year in Review', para: '17' }
              },
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1992' }
              }
            ]
          },
          {
            value: { min: 3 },
            cites: [
              {
                source: 'hrw-1993-world-report-iran',
                loc: { section: 'World Report 1993: Iran', para: '25' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Middle East Watch (Human Rights Watch)' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'period:presidency-of-akbar-hashemi-rafsanjani',
      rel: 'related',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1992' }
        }
      ]
    },
    {
      ref: 'period:presidency-of-mohammad-khatami',
      rel: 'related',
      cites: [
        {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '35' }
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
          text: 'Four Kurdish opposition leaders, including Dr. Ṣādeq Šarafkandi, the secretary-general of the Democratic Party of Iranian Kurdistan, are assassinated in a Berlin restaurant.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1992' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q2',
          text: 'The court found four defendants guilty in the 1992 murders of four Iranian Kurdish opposition figures in Berlin\'s Mykonos restaurant.',
          lang: 'en',
          cite: {
            source: 'state-dept-1998-patterns-of-global-terrorism-1997-year-in-review',
            loc: { section: 'The Year in Review', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.fas.org/irp/threat/terror_97/review.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Iranian government, or else factions such as the Revolutionary Guards, have long been accused of dispatching death squads to Turkey, Iraq and Europe to assassinate enemies of the regime.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-world-report-iran',
            loc: { section: 'World Report 1993: Iran', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/reports/1993/WR93/Mew-03.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'In 1996, a German court issues an arrest warrant for Fallāḥiān and the judge states that he believes the murders had been approved at the highest levels of the Iranian government and with the knowledge of the foreign minister, the president, and the Supreme Leader.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1992' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q5',
          text: 'In April a judgment by a court in Berlin found that the highest levels of Iran\'s political leadership followed a deliberate policy of murdering political opponents who lived outside the country.',
          lang: 'en',
          cite: {
            source: 'state-dept-1998-patterns-of-global-terrorism-1997-year-in-review',
            loc: { section: 'The Year in Review', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.fas.org/irp/threat/terror_97/review.html'
          }
        },
        {
          id: 'q6',
          text: 'In December 1998 the German Supreme Court confirmed the guilty verdict against Kazem Darabi, accused of having been dispatched by the Iranian government to murder Kurdish dissidents in Berlin in 1992.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '35' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The European Union (E.U.) officially suspended its policy of "critical dialogue" with the Iranian government in April, following the verdict of a German court holding "the Iranian political leadership" responsible for the murder of Sadeq Sharifkandi, the leader of the Kurdish Democratic Party of Iran, an armed opposition group, and three companions in Berlin\'s Mykonos restaurant in 1992. While E.U. member states, with the exception of Greece, withdrew their ambassadors from Tehran, European leaders showed no eagerness to recast their relations with Tehran over the Mykonos verdict or other human rights issues.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
          }
        },
        {
          id: 'q8',
          text: 'In June, 1997 authorities announced that Sarkouhi was on trial for espionage, an offense that carried the death penalty. They seemed at the time to be seeking to use Sarkouhi as a bargaining chip with Germany following the May verdict of a Berlin court implicating the Iranian government in the killing of four of its political opponents in Berlin in 1992.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
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
            value: { d: '1992-09-17' },
            cites: [
              {
                source: 'hrw-1993-world-report-iran',
                loc: { section: 'World Report 1993: Iran', para: '25' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Among recent victims were believed to be the Shah\'s last Prime Minister, Shapour Bakhtiar, killed in Paris on August 6, 1991, and Dr. Sadiq Sharifkandeh, head of the kdp-i, and two of his colleagues, murdered in Berlin on September 17, 1992.',
        lang: 'en',
        cite: {
          source: 'hrw-1993-world-report-iran',
          loc: { section: 'World Report 1993: Iran', para: '25' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/reports/1993/WR93/Mew-03.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1996' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1992' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'German newspapers publish a report that authorities have proof of the involvement of ʿAli Fallāḥiān, Iranian minister of intelligence, in the assassinations.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1992' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1997-04' },
            cites: [
              {
                source: 'state-dept-1998-patterns-of-global-terrorism-1997-year-in-review',
                loc: { section: 'The Year in Review', para: '17' }
              },
              {
                source: 'hrw-1998-world-report-iran',
                loc: { section: 'World Report 1998: Iran', para: '34' }
              }
            ]
          },
          {
            value: { d: '1997-05' },
            cites: [
              {
                source: 'hrw-1998-world-report-iran',
                loc: { section: 'World Report 1998: Iran', para: '17' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch' }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The court made clear that other participants in the murders had escaped to Iran, where one of them was given a Mercedes for his role in the operation.',
        lang: 'en',
        cite: {
          source: 'state-dept-1998-patterns-of-global-terrorism-1997-year-in-review',
          loc: { section: 'The Year in Review', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.fas.org/irp/threat/terror_97/review.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1998-12' },
            cites: [
              {
                source: 'hrw-2000-world-report-iran',
                loc: { section: 'World Report 2000: Iran', para: '35' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The Iranian government continued to hold German national Helmut Hoffer on charges of having had illicit relations with a Muslim woman.',
        lang: 'en',
        cite: {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '35' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Gedenktafel_Prager_Str_2A_%28Wilmd%29_Restaurant_Mykonos.JPG/1280px-Gedenktafel_Prager_Str_2A_%28Wilmd%29_Restaurant_Mykonos.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Gedenktafel_Prager_Str_2A_(Wilmd)_Restaurant_Mykonos.JPG',
    credit: { creator: 'OTFW, Berlin' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
