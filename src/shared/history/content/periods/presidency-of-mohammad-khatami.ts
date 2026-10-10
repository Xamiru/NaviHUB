import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'presidency-of-mohammad-khatami',
  names: [
    { text: 'Presidency of Mohammad Khatami', lang: 'en', role: 'primary' },
    { text: 'ریاست‌جمهوری محمد خاتمی', lang: 'fa', role: 'native' },
    { text: 'Khatami era', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-10',
  periodType: 'regime',
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
  regions: ['iran'],
  prominence: 2,
  parent: 'polity:islamic-republic-of-iran',
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
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
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
          id: 'q4',
          text: 'Human rights progress continued to be held hostage to increasingly polarized conflict within the leadership of the Islamic Republic.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q5',
          text: 'Two dailies licensed by Khatami’s administration, Jāmeʿeh (Society) and Zan (Woman), appeared in 1998 and were soon closed down by the press court.',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
          }
        },
        {
          id: 'q6',
          text: 'The holding of the first elections for local town and village councils in February represented a substantial achievement in participation in public affairs at the local level.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '25' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q7',
          text: 'The brutal killings of veteran political activists Darioush and Parvaneh Forouhar in their Tehran home on November 22, 1998, were part of a wave of killings and "disappearances" which created fear and uncertainty in intellectual circles, but also led to the resignation of the minister of intelligence, whose agents were blamed for the killings, and to the exposure of a sinister arm of the government engaged in the use of murder as a political weapon.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '5' }
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
          text: 'Iran and the United Kingdom agree to exchange ambassadors for the first time in 20 years.',
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
        },
        {
          id: 'q10',
          text: 'March and April 2000 witnessed a series of events that led to increased tensions in the country, along with the biggest round of newspaper closures in nearly twenty years.',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '17' }
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'On the one hand, during President Khatami’s first term (1997-2001) many newspapers were closed down, mostly by the judiciary, and sometimes by the Ministry of Culture and Islamic Guidance.',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
          }
        },
        {
          id: 'q12',
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
        },
        {
          id: 'q13',
          text: 'Maḥmud Aḥmadinežād, the fundamentalist mayor of Tehran, is elected president of Iran, defeating ʿAli-Akbar Hāšemi Rafsanjāni.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 2005' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Khatami_Cropped_2000.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Khatami_Cropped_2000.jpg',
    credit: { institution: 'Presidential Press and Information Office (Kremlin.ru)' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  }
})
