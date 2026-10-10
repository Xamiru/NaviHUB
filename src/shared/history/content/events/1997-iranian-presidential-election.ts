import { defineEvent } from '../../schema'

export default defineEvent({
  id: '1997-iranian-presidential-election',
  names: [
    { text: '1997 Iranian presidential election', lang: 'en', role: 'primary' },
    { text: 'انتخابات ریاست‌جمهوری ۱۳۷۶', lang: 'fa', role: 'native' },
    { text: '۲ خرداد', lang: 'fa', role: 'alternative', translit: 'dovvom-e khordad' }
  ],
  researched: '2026-10-10',
  type: 'election',
  start: {
    alts: [
      {
        value: { d: '1997-05' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1997' }
          },
          {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mohammad-khatami',
      role: 'participant',
      cites: [
        {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '1' }
        }
      ]
    },
    {
      name: 'Ali Akbar Nateq Nouri',
      role: 'participant',
      cites: [
        {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '1' }
        }
      ]
    },
    {
      ref: 'person:ali-khamenei',
      role: 'head-of-state',
      cites: [
        {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '3' }
        }
      ]
    },
    {
      ref: 'person:akbar-hashemi-rafsanjani',
      role: 'head-of-state',
      cites: [
        {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'period:presidency-of-mohammad-khatami',
      rel: 'led-to',
      cites: [
        {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '2' }
        }
      ]
    },
    {
      ref: 'period:presidency-of-akbar-hashemi-rafsanjani',
      rel: 'followed-by',
      cites: [
        {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '2' }
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
          text: 'Moḥammad Khatami, presenting a liberal platform, is elected president of Iran in May in a landslide, garnering 70% of the popular vote.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1997' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q2',
          text: 'In May elections, Iranian voters gave Khatami more than twenty million votes compared to the seven million for Majles speaker Ali Akbar Nateq Nouri.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Council of Guardians, an appointed body responsible for upholding Islamic principles in government policy, vetted candidates wishing to run in the presidential elections. In all, of the 238 candidates who sought to run, the council approved only four, all from the country\'s clerical leadership.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
          }
        },
        {
          id: 'q4',
          text: 'The constitution requires that the president be a Shi\'a Muslim, thereby excluding the approximately 20 percent of the population who are Sunni Muslims or members of other religious minorities.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Khatami\'s election campaign was itself disrupted by sometimes violent mobs of religious conservatives who created disturbances at rallies, shouting down speakers and beating those in attendance.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The challenges facing Khatami were compounded by competition among centers of political power within the government.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
          }
        },
        {
          id: 'q7',
          text: 'The E.U. decision to suspend "critical dialogue" and the election of President Khatami were conducive to narrowing the gap between U.S. and E.U. policy toward Iran.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '39' }
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
            value: { d: '1997-05' },
            cites: [
              {
                source: 'hrw-1998-world-report-iran',
                loc: { section: 'World Report 1998: Iran', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The upset victory of Mohammad Khatami, a presidential candidate disfavored by much of the clerical establishment, changed the nature of the human rights debate in and about Iran.',
        lang: 'en',
        cite: {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1997-08-03' },
            cites: [
              {
                source: 'hrw-1998-world-report-iran',
                loc: { section: 'World Report 1998: Iran', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The violations of human rights that continued in the months leading up to Khatami\'s inauguration on August 3 underlined the challenge facing him in this realm. Executions after unfair trials proliferated, protesters were arbitrary detained, and religious minorities, government critics, and independent thinkers were targeted for persecution.',
        lang: 'en',
        cite: {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Khatami_Cropped_2001_2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Khatami_Cropped_2001_2.jpg',
    credit: { institution: 'Presidential Press and Information Office (Kremlin.ru)' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  }
})
