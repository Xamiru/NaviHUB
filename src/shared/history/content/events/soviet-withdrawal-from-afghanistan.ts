import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'soviet-withdrawal-from-afghanistan',
  names: [
    { text: 'Soviet withdrawal from Afghanistan', lang: 'en', role: 'primary' },
    { text: 'Вывод советских войск из Афганистана', lang: 'ru', role: 'native' },
    { text: 'خروج نیروهای شوروی از افغانستان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1988-04-14' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Geneva Accords, 1987-89', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1989-02-15' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Geneva Accords, 1987-89', para: '3' }
          },
          {
            source: 'state-dept-background-note-afghanistan-2004',
            loc: { section: 'Afghanistan (01/04)', para: '87' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:kabul',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'Stalemate: The Civil War, 1989-92', para: '1' }
        }
      ]
    },
    {
      ref: 'place:geneva',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Geneva Accords, 1987-89', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' },
    { ref: 'event:soviet-afghan-war' }
  ],
  polities: [
    { ref: 'polity:soviet-union' },
    { ref: 'polity:democratic-republic-of-afghanistan' },
    { ref: 'polity:pakistan' },
    { ref: 'polity:united-states' }
  ],
  sides: [
    {
      key: 'ussr',
      name: 'Soviet Union',
      polity: 'polity:soviet-union',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Geneva Accords, 1987-89', para: '1' }
        }
      ]
    },
    {
      key: 'dra',
      name: 'Democratic Republic of Afghanistan',
      polity: 'polity:democratic-republic-of-afghanistan',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Geneva Accords, 1987-89', para: '2' }
        }
      ]
    },
    {
      key: 'mujahidin',
      name: 'Mujahidin',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mikhail-gorbachev',
      role: 'leader',
      side: 'ussr',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '3' }
        }
      ]
    },
    {
      name: 'Najibullah',
      role: 'leader',
      side: 'dra',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '3' }
        }
      ]
    },
    {
      name: 'Diego Cordovez',
      role: 'diplomat',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Geneva Accords, 1987-89', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:perestroika-and-glasnost',
      rel: 'related',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Geneva Accords, 1987-89', para: '1' }
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
          text: 'In 1988 the Governments of Pakistan and Afghanistan, with the United States and Soviet Union serving as guarantors, signed an agreement settling the major differences between them. The agreement, known as the Geneva accords, included five major documents, which, among other things, called for U.S. and Soviet noninterference in the internal affairs of Pakistan and Afghanistan, the right of refugees to return to Afghanistan without fear of persecution or harassment, and, most importantly, a timetable that ensured full Soviet withdrawal from Afghanistan by February 15, 1989.',
          lang: 'en',
          cite: {
            source: 'state-dept-background-note-afghanistan-2004',
            loc: { section: 'Afghanistan (01/04)', para: '86' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20210420011744/https://2009-2017.state.gov/outofdate/bgn/afghanistan/32639.htm'
          }
        },
        {
          id: 'q2',
          text: 'As a result, the civil war continued after the Soviet withdrawal, which was completed in February 1989.',
          lang: 'en',
          cite: {
            source: 'state-dept-background-note-afghanistan-2004',
            loc: { section: 'Afghanistan (01/04)', para: '87' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20210420011744/https://2009-2017.state.gov/outofdate/bgn/afghanistan/32639.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'At the same time a sharp increase in military support for the mujahidin from the United States and Saudi Arabia allowed it to regain the guerilla war initiative. By late August 1986, the first Stinger ground-to-air missiles were used successfully. For nearly a year they would deny the Soviets and the Kabul government effective use of air power.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/96.htm' }
        },
        {
          id: 'q4',
          text: 'These shifts in momentum reinforced the inclination of the new Gorbachev government to view further escalation of the war as a misuse of Soviet political and military capital.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/96.htm' }
        },
        {
          id: 'q5',
          text: 'Informal negotiations for a Soviet withdrawal from Afghanistan had been underway since 1982.',
          lang: 'en',
          cite: {
            source: 'state-dept-background-note-afghanistan-2004',
            loc: { section: 'Afghanistan (01/04)', para: '86' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20210420011744/https://2009-2017.state.gov/outofdate/bgn/afghanistan/32639.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'By the beginning of 1987, the controlling fact in the Afghan war was the Soviet Union\'s determination to withdraw.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Geneva Accords, 1987-89', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/97.htm' }
        },
        {
          id: 'q7',
          text: 'In 1982 under the auspices of the office of its secretary general, the UN had initiated negotiations facilitating a Soviet withdrawal from Afghanistan. Its format had essentially been agreed upon by 1985. Ostensibly it was the product of indirect negotiations between the DRA and Pakistan (Pakistan did not recognize the DRA) with the mediation of the secretary general\'s special representative, Diego Cordovez. The United States and the Soviet Union had committed themselves to guaranteeing the implementation of an agreement leading to a withdrawal.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Geneva Accords, 1987-89', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/97.htm' }
        },
        {
          id: 'q8',
          text: 'Its clauses included affirmation of the sovereignty of Afghanistan and its right to self-determination, its right to be free from foreign intervention or interference, and the right of its refugees to a secure and honorable return.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Geneva Accords, 1987-89', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/97.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The accords did not bring peace to Afghanistan. There was little expectation among its enemies or the Soviet Union that the Kabul government would survive. Its refusal to collapse introduced a three-year period of civil war.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Failure to Bring Peace', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/98.htm' }
        },
        {
          id: 'q10',
          text: 'The Soviets left Afghanistan deep in winter with intimations of panic among Kabul officials.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Stalemate: The Civil War, 1989-92', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/100.htm' }
        },
        {
          id: 'q11',
          text: 'Soviet support reached a value of $3 billion per year in 1990.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Stalemate: The Civil War, 1989-92', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/100.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q12',
          text: 'The accords thus facilitated a withdrawal by an erstwhile superpower, in a manner which justified an invasion. They exemplify the delicacy of UN diplomacy when the interests of a great power are engaged. In essence, the accords were a political bailout for a government struggling with the consequences of a costly error.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Geneva Accords, 1987-89', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/97.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1986-02' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Gorbachev\'s "bleeding wound" speech hinted at a decision to withdraw "in the nearest future."',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Soviet Decision to Withdraw, 1986-88', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/96.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-02' },
            cites: [
              {
                source: 'nsarchive-2019-soviet-withdrawal-from-afghanistan-1989',
                loc: { section: 'The Soviet Withdrawal from Afghanistan 1989', para: '36' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The Soviet decision to withdraw from its disastrous military invasion of Afghanistan occurred as early as October 1985, according to the documents; but Gorbachev did not set a specific timetable until February 1988',
        lang: 'en',
        cite: {
          source: 'nsarchive-2019-soviet-withdrawal-from-afghanistan-1989',
          loc: { section: 'The Soviet Withdrawal from Afghanistan 1989', para: '36' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://nsarchive.gwu.edu/briefing-book/afghanistan-russia-programs/2019-02-27/soviet-withdrawal-afghanistan-1989'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-04-14' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The Geneva Accords, 1987-89', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The bilateral agreement between the Afghanistan and Pakistan on the principles of non-interference and non-intervention was signed on April 14, 1988.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Geneva Accords, 1987-89', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/97.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-05' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The Geneva Accords, 1987-89', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'But at its core was an agreement reached in May 1988 that authorized the withdrawal of "foreign troops" according to a timetable that would remove all Soviet forces by February 15, 1989.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Geneva Accords, 1987-89', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/97.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-02-15' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'COMMUNISM, REBELLION, AND SOVIET INTERVENTION', para: '22' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Nevertheless, the agreement on withdrawal held, and on February 15, 1989, the last Soviet troops departed on schedule from Afghanistan.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'COMMUNISM, REBELLION, AND SOVIET INTERVENTION', para: '22' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/afghanistan/29.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/86/RIAN_archive_644445_First_stage_of_Soviet_troops_withdrawal_from_Afghanistan..jpg',
    page: 'https://commons.wikimedia.org/wiki/File:RIAN_archive_644445_First_stage_of_Soviet_troops_withdrawal_from_Afghanistan..jpg',
    credit: { institution: 'RIA Novosti archive, image #644445', creator: 'Alexandr Graschenkov' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
