import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'second-chechen-war-conduct',
  about: ['event:second-chechen-war'],
  topic: 'legitimacy',
  framing: {
    id: 'q1',
    text: 'Three massacres, which followed combat operations, took the lives of at least 130 people.',
    lang: 'en',
    cite: {
      source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
      loc: {
        section: '“Glad to be Deceived”: the International Community and Chechnya',
        para: '13'
      }
    },
    provenance: {
      via: 'web',
      at: '2026-10-12',
      url: 'https://web.archive.org/web/20230930192733/https://www.hrw.org/legacy/wr2k4/7.htm'
    }
  },
  positions: [
    {
      id: 'russian-federation-counter-terrorist-operation',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Russian Federation' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The regime of Dzhokhar Dudayev and Aslan Maskhadov usurped power in that part of the Russian Federation to make Chechnya an enclave of crime and terrorism.',
          lang: 'en',
          cite: {
            source: 'president-of-russia-2000-04-13-statement-on-human-rights-in-chechnya',
            loc: { section: 'Statement Concerning Violation of Human Rights', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'http://en.kremlin.ru/events/president/transcripts/24066'
          }
        },
        {
          id: 'q3',
          text: 'All cases of abuse and violations of human rights in the course of the counter-terrorist operation in the North Caucasus are being thoroughly investigated, and if the reported facts are confirmed, the culprits will be punished, whoever they might be.',
          lang: 'en',
          cite: {
            source: 'president-of-russia-2000-04-13-statement-on-human-rights-in-chechnya',
            loc: { section: 'Statement Concerning Violation of Human Rights', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'http://en.kremlin.ru/events/president/transcripts/24066'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'Russian soldiers and police committed war crimes and other serious violations of the rules of human rights and humanitarian law in Chechnya.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-russia',
            loc: { section: 'World Report 2001: Russia', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
          }
        },
        {
          id: 'q5',
          text: 'The Russian government did not hold those guilty of violations accountable.',
          lang: 'en',
          cite: {
            source: 'hrw-2001-world-report-russia',
            loc: { section: 'World Report 2001: Russia', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230331165731/https://www.hrw.org/legacy/wr2k1/europe/russian.html'
          }
        }
      ]
    },
    {
      id: 'human-rights-watch-normalization-is-concealment',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Russia’s efforts at finding a political solution—at “normalizing” the situation—are not ending the conflict in Chechnya, but rather making the conflict less visible to the outside world.',
          lang: 'en',
          cite: {
            source: 'hrw-2004-world-report-glad-to-be-deceived-chechnya',
            loc: {
              section: '“Glad to be Deceived”: the International Community and Chechnya',
              para: '43'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20230930192733/https://www.hrw.org/legacy/wr2k4/7.htm'
          }
        },
        {
          id: 'q7',
          text: 'The Chechnya conflict entered its sixth year, with the Kremlin continuing to insist that it was successfully restoring peace in the republic.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-world-report-russia',
            loc: { section: 'World Report 2005: Russia', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240303050840/https://www.hrw.org/world-report/2005/country-chapters/russia'
          }
        }
      ]
    }
  ],
  researched: '2026-10-12'
})
