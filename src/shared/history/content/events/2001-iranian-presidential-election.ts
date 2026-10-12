import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2001-iranian-presidential-election',
  names: [
    { text: '2001 Iranian presidential election', lang: 'en', role: 'primary' },
    { text: 'انتخابات ریاست‌جمهوری ۱۳۸۰', lang: 'fa', role: 'native' },
    { text: 'Eighth Iranian presidential election', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'election',
  start: {
    alts: [
      {
        value: { d: '2001-06-08' },
        cites: [
          {
            source: 'iran-data-portal-2001-presidential-election',
            loc: { section: '2001 Presidential Election' }
          },
          {
            source: 'hrw-2001-05-31-iran-election-marred-by-human-rights-attacks',
            loc: { section: 'Iran: Election Marred by Human Rights Attacks', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-2001-05-31-iran-election-marred-by-human-rights-attacks',
          loc: { section: 'Iran: Election Marred by Human Rights Attacks', para: '6' }
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
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 2001' }
        }
      ]
    },
    {
      ref: 'person:ali-khamenei',
      role: 'head-of-state',
      cites: [
        {
          source: 'hrw-2001-05-31-iran-election-marred-by-human-rights-attacks',
          loc: { section: 'Iran: Election Marred by Human Rights Attacks', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'period:presidency-of-mohammad-khatami',
      rel: 'related',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 2001' }
        }
      ]
    },
    {
      ref: 'event:2000-iranian-legislative-election',
      rel: 'preceded-by',
      cites: [
        {
          source: 'hrw-2001-05-31-iran-election-marred-by-human-rights-attacks',
          loc: { section: 'Iran: Election Marred by Human Rights Attacks', para: '8' }
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
          text: 'Mohammad Khatami is re-elected president for a second term, garnering over 75% of the vote, despite the profound disappointments engendered among his supporters by his first term of office.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 2001' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The factional struggle behind the current presidential elections in Iran is having a devastating impact on human rights, Human Rights Watch said in a new report "Stifling Dissent: The Human Rights Consequences of Factional Conflict in Iran."',
          lang: 'en',
          cite: {
            source: 'hrw-2001-05-31-iran-election-marred-by-human-rights-attacks',
            loc: { section: 'Iran: Election Marred by Human Rights Attacks', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2001/05/31/iran-election-marred-human-rights-attacks'
          }
        },
        {
          id: 'q3',
          text: 'Human Rights Watch noted the extraordinary role of the Council of Guardians in vetting the "fitness for office" of prospective candidates for elective offices, including that of the president, and expressed concern that this process has ensured that elections in Iran have been largely limited to competition among those supporting the clerical leadership.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-05-31-iran-election-marred-by-human-rights-attacks',
            loc: { section: 'Iran: Election Marred by Human Rights Attacks', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2001/05/31/iran-election-marred-human-rights-attacks'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The report, "Stifling Dissent: The Human Rights Consequences of Factional Conflict in Iran," traces the conservative backlash after the reformists\' landslide victory in parliamentary elections in February 2000.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-05-31-iran-election-marred-by-human-rights-attacks',
            loc: { section: 'Iran: Election Marred by Human Rights Attacks', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2001/05/31/iran-election-marred-human-rights-attacks'
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
            value: { d: '2001-06-08' },
            cites: [
              {
                source: 'iranica-shahidi-journalism-iii-post-revolution-era',
                loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '19' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Although President Khatami garnered 22 million votes, even more than his first victory, some 14 million eligible Iranians did not go to the polls.',
        lang: 'en',
        cite: {
          source: 'iranica-shahidi-journalism-iii-post-revolution-era',
          loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '19' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Vladimir_Putin_12_March_2001-2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Vladimir_Putin_12_March_2001-2.jpg',
    credit: { institution: 'Presidential Press and Information Office (Russia)' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  }
})
