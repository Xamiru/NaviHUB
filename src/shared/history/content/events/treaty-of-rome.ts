import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-rome',
  names: [
    { text: 'Treaty of Rome', lang: 'en', role: 'primary' },
    {
      text: 'Treaty establishing the European Economic Community',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'eurlex-summary-treaty-of-rome-eec',
          loc: { section: 'Treaty of Rome (EEC)' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1957-03-25' },
        cites: [
          {
            source: 'eurlex-summary-treaty-of-rome-eec',
            loc: { section: 'Treaty of Rome (EEC)' }
          },
          {
            source: 'eu-history-of-the-eu-1945-59',
            loc: { section: 'History of the EU, 1945-59', para: '12' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:rome',
      cites: [
        {
          source: 'eu-history-of-the-eu-1945-59',
          loc: { section: 'History of the EU, 1945-59', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:federal-republic-of-germany' },
    { ref: 'polity:french-fourth-republic' },
    { ref: 'polity:kingdom-of-italy' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1957, the Treaty of Rome establishes the European Economic Community (EEC) and a new era of ever-closer cooperation in Europe.',
          lang: 'en',
          cite: {
            source: 'eu-history-of-the-eu-1945-59',
            loc: { section: 'History of the EU, 1945-59', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/1945-59_en'
          }
        },
        {
          id: 'q2',
          text: 'It set up the European Economic Community (EEC) which brought together 6 countries (Belgium, Germany, France, Italy, Luxembourg and the Netherlands) to work towards integration and economic growth, through trade.',
          lang: 'en',
          cite: {
            source: 'eurlex-summary-treaty-of-rome-eec',
            loc: { section: 'Treaty of Rome (EEC)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2024/https://eur-lex.europa.eu/EN/legal-content/summary/treaty-of-rome-eec.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The treaty abolished quotas (i.e. ceilings on imports) and customs duties between its 6 signatories.',
          lang: 'en',
          cite: {
            source: 'eurlex-summary-treaty-of-rome-eec',
            loc: { section: 'Treaty of Rome (EEC)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2024/https://eur-lex.europa.eu/EN/legal-content/summary/treaty-of-rome-eec.html'
          }
        },
        {
          id: 'q3',
          text: 'It was signed in parallel with a second treaty which set up the European Atomic Energy Community (Euratom).',
          lang: 'en',
          cite: {
            source: 'eurlex-summary-treaty-of-rome-eec',
            loc: { section: 'Treaty of Rome (EEC)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2024/https://eur-lex.europa.eu/EN/legal-content/summary/treaty-of-rome-eec.html'
          }
        },
        {
          id: 'q5',
          text: 'It established a common external tariff on imports from outside the EEC, replacing the previous tariffs of the different states.',
          lang: 'en',
          cite: {
            source: 'eurlex-summary-treaty-of-rome-eec',
            loc: { section: 'Treaty of Rome (EEC)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2024/https://eur-lex.europa.eu/EN/legal-content/summary/treaty-of-rome-eec.html'
          }
        },
        {
          id: 'q6',
          text: 'The treaty established institutions and decision-making mechanisms which make it possible to express both national interests and a joint vision.',
          lang: 'en',
          cite: {
            source: 'eurlex-summary-treaty-of-rome-eec',
            loc: { section: 'Treaty of Rome (EEC)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2024/https://eur-lex.europa.eu/EN/legal-content/summary/treaty-of-rome-eec.html'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'The Treaty of Rome has been amended on a number of occasions, and today it is called the Treaty on the Functioning of the European Union.',
          lang: 'en',
          cite: {
            source: 'eurlex-summary-treaty-of-rome-eec',
            loc: { section: 'Treaty of Rome (EEC)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2024/https://eur-lex.europa.eu/EN/legal-content/summary/treaty-of-rome-eec.html'
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
            value: { d: '1957-03-25' },
            cites: [
              {
                source: 'eurlex-summary-treaty-of-rome-eec',
                loc: { section: 'Treaty of Rome (EEC)' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Signed on 25 March 1957, it applied from 1 January 1958.',
        lang: 'en',
        cite: {
          source: 'eurlex-summary-treaty-of-rome-eec',
          loc: { section: 'Treaty of Rome (EEC)' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://web.archive.org/web/2024/https://eur-lex.europa.eu/EN/legal-content/summary/treaty-of-rome-eec.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Bundesarchiv_Bild_183-45653-0001%2C_Rom%2C_Vertr%C3%A4ge_%C3%BCber_Zollpakt_und_Eurotom_unterzeichnet.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-45653-0001,_Rom,_Vertr%C3%A4ge_%C3%BCber_Zollpakt_und_Eurotom_unterzeichnet.jpg',
    credit: { institution: 'Bundesarchiv' },
    license: {
      id: 'cc-by-sa',
      version: '3.0 de',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    }
  },
  furtherReading: [
    { source: 'loth-1990-der-weg-nach-europa', perspective: 'european' }
  ]
})
