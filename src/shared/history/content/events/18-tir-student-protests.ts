import { defineEvent } from '../../schema'

export default defineEvent({
  id: '18-tir-student-protests',
  names: [
    { text: 'Iranian student protests of July 1999', lang: 'en', role: 'primary' },
    { text: 'اعتراضات دانشجویی تیر ۱۳۷۸', lang: 'fa', role: 'native' },
    { text: '۱۸ تیر', lang: 'fa', role: 'alternative', translit: 'hejdah-e tir' },
    { text: 'Tehran University dormitory raid', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-10',
  type: 'protest',
  start: {
    alts: [
      {
        value: { d: '1999-07-08' },
        cites: [
          {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '8' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1999-07-13' },
        cites: [
          {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '11' }
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
          loc: { section: 'World Report 2000: Iran', para: '8' }
        }
      ]
    },
    {
      ref: 'place:university-of-tehran',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '8' }
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
          loc: { section: 'World Report 2000: Iran', para: '10' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Students of the University of Tehran',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '8' }
        }
      ]
    },
    {
      ref: 'person:ali-khamenei',
      role: 'head-of-state',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '10' }
        }
      ]
    },
    {
      ref: 'person:mohammad-khatami',
      role: 'head-of-government',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '10' }
        }
      ]
    },
    {
      name: 'Ansar-e Hezbollahi',
      role: 'perpetrator',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '9' }
        }
      ]
    },
    {
      name: 'Mohammad Mousavi Khoeniha',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '8' }
        }
      ]
    },
    {
      name: 'Hedayat Lotfian',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '10' }
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
                source: 'hrw-2000-world-report-iran',
                loc: { section: 'World Report 2000: Iran', para: '8' }
              }
            ],
            heldBy: [
              { kind: 'public', name: 'Eyewitnesses' }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      value: {
        alts: [
          {
            value: { min: 300 },
            cites: [
              {
                source: 'hrw-2000-world-report-iran',
                loc: { section: 'World Report 2000: Iran', para: '8' }
              }
            ],
            heldBy: [
              { kind: 'public', name: 'Eyewitnesses' }
            ]
          }
        ]
      }
    },
    {
      key: 'prisoners',
      value: {
        alts: [
          {
            value: { min: 400 },
            cites: [
              {
                source: 'hrw-2000-world-report-iran',
                loc: { section: 'World Report 2000: Iran', para: '8' }
              }
            ],
            heldBy: [
              { kind: 'public', name: 'Eyewitnesses' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:chain-murders-of-iran',
      rel: 'caused-by',
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
          loc: { section: 'World Report 2000: Iran', para: '11' }
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
          text: 'Student protests over restrictions on press freedom mushroomed into days of violent street protests in which competing political factions took their differences to the streets of Tehran and other major cities.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q2',
          text: 'Student supporters of the reformist President Khatami stage a sit-in at the Amirābād dormitories on the campus of the University of Tehran following the closure of the reformist newspaper, Salām. The peaceful sit-in is violently suppressed by fundametalist paramilitary forces.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1999' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
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
          text: 'Speculation about where the ultimate responsibility for the killings lay played a direct role in the year\'s most traumatic incidents of political violence, the student protests of July and their suppression by a combination of uniformed and irregular forces.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q4',
          text: 'In July 1999, the conservative-dominated Fifth Majles voted to amend the 1986 Press Law, in spite of strong criticism inside and outside the chamber.',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'In July, Salam was closed down and charges of spreading false information brought against its publisher, Mohammad Mousavi Khoeniha, in a Special Court for the Clergy.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q6',
          text: 'The closure triggered a peaceful protest by students at Tehran University on July 8.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q7',
          text: 'During the early hours of July 9, members of an unidentified uniformed militia force entered the university dormitories while the students slept and attacked them, throwing some out of windows and taking some away.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q8',
          text: 'The next day, students took to the streets to protest the assault on the dormitories, to demand an inquiry, and to call for the release of their colleagues from detention. The demonstration was broken up by hard-line enforcers associated with conservative leaders within the government, the Ansar-e Hezbollahi (Partisans of the Party of God), wielding clubs and chains while members of the security forces stood by or joined in the assault on the demonstrators.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q9',
          text: 'However, student protests continued in Tehran on July 10 and spread to other cities with calls for the dismissal of Tehran police chief, Hedayat Lotfian and for the prosecution of those responsible for the raid.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q10',
          text: 'The popular mood changed abruptly when the demonstrations deteriorated into looting and vandalism on July 12 and July 13.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'The leadership, with President Khatami and Ayatollah Khamene\'i acting in concert, moved swiftly to ban further protests and to arrest hundreds of purported ringleaders.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q12',
          text: 'Following the unrest, hundreds of students remained in detention or were unaccounted for.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q13',
          text: 'President Khatami weathered this most serious challenge to his leadership to date, emphasizing a commitment to the rule of law.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q14',
          text: 'According to the witnesses at least four students were killed in the assault on the dormitory, three hundred wounded, and four hundred taken into detention.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1999-07-09' },
            cites: [
              {
                source: 'hrw-2000-world-report-iran',
                loc: { section: 'World Report 2000: Iran', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The dormitory rooms were ransacked and furniture and equipment smashed.',
        lang: 'en',
        cite: {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1999-07-10' },
            cites: [
              {
                source: 'hrw-2000-world-report-iran',
                loc: { section: 'World Report 2000: Iran', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Both President Khatami and Supreme Leader Ayatollah Ali Khamene\'i condemned the raid and the minister of the interior, Abdullah Mousavi-Lari declared that it had taken place without any authorization from the ministry.',
        lang: 'en',
        cite: {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '10' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1999-09-11' },
            cites: [
              {
                source: 'hrw-2000-world-report-iran',
                loc: { section: 'World Report 2000: Iran', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The head of Tehran\'s Revolutionary Court stated on September 11 that four unnamed individuals had been sentenced to death in connection with the pro-democracy protests.',
        lang: 'en',
        cite: {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '14' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/University_of_Tehran_Main_Entrance_Gate.jpg/1280px-University_of_Tehran_Main_Entrance_Gate.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:University_of_Tehran_Main_Entrance_Gate.jpg',
    credit: { creator: 'Armin Abbasi' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
