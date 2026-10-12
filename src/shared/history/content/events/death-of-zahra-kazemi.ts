import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'death-of-zahra-kazemi',
  names: [
    { text: 'Death of Zahra Kazemi', lang: 'en', role: 'primary' },
    { text: 'مرگ زهرا کاظمی', lang: 'fa', role: 'native' },
    { text: 'Zahra Kazemi case', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '2003-06-23' },
        cites: [
          {
            source: 'hrw-2006-world-report-iran',
            loc: { section: 'World Report 2006: Iran', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 2003' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-2006-world-report-iran',
          loc: { section: 'World Report 2006: Iran', para: '9' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Zahra Kazemi',
      role: 'victim',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 2003' }
        }
      ]
    },
    {
      name: 'Saeed Mortazavi',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2006-world-report-iran',
          loc: { section: 'World Report 2006: Iran', para: '9' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:2009-iranian-presidential-election-protests',
      rel: 'related',
      cites: [
        {
          source: 'hrw-2009-06-23-iran-violent-crackdown-on-protesters-widens',
          loc: { section: 'Iran: Violent Crackdown on Protesters Widens', para: '12' }
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
          text: 'Zahrā Kāẓemi, an Iranian-Canadian freelance journalist, is arrested after taking photographs of Tehran’s notorious Evin prison.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 2003' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q2',
          text: 'The case of Iranian-Canadian photojournalist Zahra Kazemi, who died in the custody of judiciary and security agents led by Mortazavi in June 2003, remains unresolved.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-iran',
            loc: { section: 'World Report 2006: Iran', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/iran'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Lawyers representing Kazemi’s family revealed that in addition to signs of torture including fractures to her nose, fingers, and toes, Kazemi received heavy blows to her head, once during her initial detention by the head of the intelligence unit at Evin prison on June 23, 2003, and another blow during an interrogation led by Mortazavi three days later.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-iran',
            loc: { section: 'World Report 2006: Iran', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/iran'
          }
        },
        {
          id: 'q4',
          text: 'According to autopsy reports, Kazemi died of severe blows to her head.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-iran',
            loc: { section: 'World Report 2006: Iran', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/iran'
          }
        },
        {
          id: 'q5',
          text: 'The judiciary has taken no further steps to identify or prosecute those responsible for Kazemi’s killing.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-iran',
            loc: { section: 'World Report 2006: Iran', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/iran'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Canada recalls its ambassador to Iran and in 2005 reiterates that until Iran agrees to an international investigation into Zahrā Kāẓemi’s death, Canada will not resume diplomatic relations with Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 2004-05' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q7',
          text: 'On July 30, the judiciary detained Abdolfattah Soltani, a lawyer and member of the Center for Defense of Human Rights, after Soltani and Ebadi protested the judiciary’s inaction in Zahra Kazemi’s case.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-iran',
            loc: { section: 'World Report 2006: Iran', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/iran'
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
            value: { d: '2003-06-23' },
            cites: [
              {
                source: 'hrw-2006-world-report-iran',
                loc: { section: 'World Report 2006: Iran', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In June 2003, Iranian-Canadian photojournalist Zahra Kazemi died while in the custody of judiciary and security officers presided over by Mortazavi.',
        lang: 'en',
        cite: {
          source: 'hrw-2009-06-23-iran-violent-crackdown-on-protesters-widens',
          loc: { section: 'Iran: Violent Crackdown on Protesters Widens', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/news/2009/06/23/iran-violent-crackdown-protesters-widens'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-05' },
            cites: [
              {
                source: 'hrw-2006-world-report-iran',
                loc: { section: 'World Report 2006: Iran', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The judiciary had accused a low-ranking Intelligence Ministry official, Reza Ahmadi, of Kazemi’s unintentional homicide, and had proceeded with a hastily organized trial held in May 2004 which cleared Reza Ahmadi of the charges.',
        lang: 'en',
        cite: {
          source: 'hrw-2006-world-report-iran',
          loc: { section: 'World Report 2006: Iran', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2006/country-chapters/iran'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2005-07' },
            cites: [
              {
                source: 'hrw-2006-world-report-iran',
                loc: { section: 'World Report 2006: Iran', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Following an appeal by lawyers representing Kazemi’s family, an appeal hearing was convened in July 2005, in which the lawyers demanded that the judiciary launch an investigation into charges of intentional homicide, but the judge refused their request.',
        lang: 'en',
        cite: {
          source: 'hrw-2006-world-report-iran',
          loc: { section: 'World Report 2006: Iran', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/world-report/2006/country-chapters/iran'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/EvinHouseofDetention.jpg/1280px-EvinHouseofDetention.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:EvinHouseofDetention.jpg',
    credit: { creator: 'Ehsan Iran' },
    license: { id: 'cc-by-sa', version: '2.0', url: 'https://creativecommons.org/licenses/by-sa/2.0' }
  }
})
