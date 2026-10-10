import { definePerson } from '../../schema'

export default definePerson({
  id: 'mohammad-khatami',
  names: [
    { text: 'Mohammad Khatami', lang: 'en', role: 'primary' },
    { text: 'محمد خاتمی', lang: 'fa', role: 'native' },
    {
      text: 'Sayyed Mohammad Khatami',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-shahidi-journalism-iii-post-revolution-era',
          loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  born: {
    alts: [
      {
        value: { d: '1942' },
        cites: [
          {
            source: 'lc-names-khatami-muhammad-nr96038207',
            loc: { section: 'Khātamī, Muḥammad' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician', 'cleric'],
  offices: [
    {
      title: 'Minister of Culture and Islamic Guidance',
      polity: 'polity:islamic-republic-of-iran',
      end: {
        alts: [
          {
            value: { d: '1992-05' },
            cites: [
              {
                source: 'iranica-shahidi-journalism-iii-post-revolution-era',
                loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '7' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-shahidi-journalism-iii-post-revolution-era',
          loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '6' }
        },
        {
          source: 'iranica-shahidi-journalism-iii-post-revolution-era',
          loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '7' }
        }
      ]
    },
    {
      title: 'President of Iran',
      polity: 'polity:islamic-republic-of-iran',
      start: {
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
      end: {
        alts: [
          {
            value: { d: '2005' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 2005' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '2' }
        },
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 2005' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Portrait_of_Mohammad_Khatami_2010.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Mohammad_Khatami_2010.jpg',
    credit: { creator: 'Mardetanha' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
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
        },
        {
          id: 'q2',
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
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Under Khatami, licenses were given to several papers that were closed down later: the literary monthly Gardun (1996); the daily Salām (1999); and the monthly Kiān (2001), which specialized in critical, Islamic social and political thought.',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
          }
        },
        {
          id: 'q4',
          text: 'Criticized by conservatives, Khatami resigned in May 1992 and was replaced by ʿAli Lārijāni, who had been the Deputy Chief of Staff and Acting Chief of Staff of the Revolutionary Guard Corps',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
          }
        },
        {
          id: 'q5',
          text: 'The violations of human rights that continued in the months leading up to Khatami\'s inauguration on August 3 underlined the challenge facing him in this realm.',
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
        },
        {
          id: 'q6',
          text: 'Khatami’s first year in office, 1997-98, saw the establishment of the first journalists’ union after the revolution, the Association of Iranian Journalists (Anjoman-e ruz-nāma negārān-e Irān); changes in the make up of the press jury, resulting in more decisions in favor of critical journalists; press trials shown on television, with big audiences; and a rise in the number of newspapers to 850, selling more than two million copies a day',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
          }
        },
        {
          id: 'q7',
          text: 'President Khatami weathered this most serious challenge to his leadership to date, emphasizing a commitment to the rule of law.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q8',
          text: 'The General Assembly unanimously declared the year 2001 as the Year of Dialogue Among Civilizations, as proposed by President Khatami in his address to the Assembly in September 1998.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '32' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q9',
          text: 'Although President Khatami garnered 22 million votes, even more than his first victory, some 14 million eligible Iranians did not go to the polls.',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '19' }
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
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q10',
          text: 'President Khatami stated on August 12 that "police officers acting outside their authority and non-military personnel" were responsible for the dormitories raid',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    }
  ]
})
