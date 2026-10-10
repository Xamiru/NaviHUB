import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'chain-murders-of-iran',
  names: [
    { text: 'Chain murders of Iran', lang: 'en', role: 'primary' },
    { text: 'قتل‌های زنجیره‌ای', lang: 'fa', role: 'native', translit: 'qatl-hā-ye zanjire-ī' },
    { text: 'Killings of dissidents in Iran in 1998', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-10',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1998-11-22' },
        cites: [
          {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '5' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1998-12' },
        cites: [
          {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '5' }
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
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '5' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Darioush Forouhar',
      role: 'victim',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '5' }
        }
      ]
    },
    {
      name: 'Parvaneh Forouhar',
      role: 'victim',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '5' }
        }
      ]
    },
    {
      name: 'Mohammad Mokhtari',
      role: 'victim',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '5' }
        }
      ]
    },
    {
      name: 'Mohammad Pouyandeh',
      role: 'victim',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '5' }
        }
      ]
    },
    {
      name: 'Saʿid Eslāmi (Emāmi)',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-shahidi-journalism-iii-post-revolution-era',
          loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '16' }
        }
      ]
    },
    {
      name: 'Ghorbanali Dorri-Najafabadi',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '6' }
        }
      ]
    },
    {
      ref: 'person:mohammad-khatami',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '6' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:18-tir-student-protests',
      rel: 'led-to',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '7' }
        }
      ]
    },
    {
      ref: 'period:presidency-of-mohammad-khatami',
      rel: 'related',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '1' }
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
          text: 'The brutal killings of veteran political activists Darioush and Parvaneh Forouhar in their Tehran home on November 22, 1998, were part of a wave of killings and "disappearances" which created fear and uncertainty in intellectual circles, but also led to the resignation of the minister of intelligence, whose agents were blamed for the killings, and to the exposure of a sinister arm of the government engaged in the use of murder as a political weapon.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'A series of killings and "disappearances" of independent writers and government critics at the end of 1998 exposed the involvement of state officials in the illegal violent suppression of dissent.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q3',
          text: 'Although the killing of political dissidents at home and abroad was not new to Iran, popular reaction to these deaths was strong and immediate.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Other victims of killings in November and December 1998 included Mohammad Mokhtari, and Mohammad Pouyandeh, writers and free-expression advocates who both had been briefly detained in October 1998.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q5',
          text: 'Thousands of mourners marched in the funeral procession for slain leaders of the Iran Nation Party Darioush and Parvaneh Forouhar in Tehran on November 30.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q6',
          text: 'Different branches of the government, including the judiciary and the National Security Council (NSC), the latter headed by President Khatami, announced that inquiries would be established into the killings and the perpetrators brought to justice.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q7',
          text: 'In the memo, Emami sets out a policy to harass and stifle the independent press through a variety of legal and extralegal measures, remarkably similar to the actual experiences of the journalists and the press throughout the year.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'At the sixth Press Festival in May 1999—when the number of newspapers had reached 930 with a total circulation of 2.7 million copies—many of the awards went to strongly critical pieces, including articles on the 1998 killings of political activists and writers, including Dāryuš and Parvāneh Foruhar, Moḥammad Moḵtāri, and Moḥammad Jaʿfar Puyandeh',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
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
            value: { d: '1999-02' },
            cites: [
              {
                source: 'hrw-2000-world-report-iran',
                loc: { section: 'World Report 2000: Iran', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Minister of Intelligence Ghorbanali Dorri-Najafabadi and several of his senior deputies resigned in February as the extent of the ministry\'s involvement became known.',
        lang: 'en',
        cite: {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1999-06' },
            cites: [
              {
                source: 'hrw-2000-world-report-iran',
                loc: { section: 'World Report 2000: Iran', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In June Salam , one of the most popular pro-reform newspapers, published an internal memorandum said to have been written by Saeid Emami, a detained ministry of intelligence official.',
        lang: 'en',
        cite: {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
      }
    }
  ]
})
