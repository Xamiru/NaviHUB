import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'proclamation-of-the-german-empire',
  names: [
    { text: 'Proclamation of the German Empire', lang: 'en', role: 'primary' },
    { text: 'Kaiserproklamation', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1871-01-18' },
        cites: [
          { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '4' } },
          { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:versailles',
      cites: [
        { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '5' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:wilhelm-i',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '5' } }
      ]
    },
    {
      ref: 'person:otto-von-bismarck',
      role: 'organizer',
      cites: [
        { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '27' } }
      ]
    },
    {
      name: 'Ludwig II. von Bayern',
      role: 'participant',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '61' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:franco-prussian-war',
      rel: 'caused-by',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Bismarck and Unification', para: '5' }
        }
      ]
    },
    {
      ref: 'period:german-empire',
      rel: 'led-to',
      cites: [
        { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '5' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Im Spiegelsaal des Schlosses von Versailles wird König Wilhelm I. von Preußen zum Deutschen Kaiser ausgerufen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
          }
        },
        {
          id: 'q2',
          text: 'Months before a peace treaty was signed with France in May 1871, a united Germany was established as the German Empire, and the Prussian king, Wilhelm I, was crowned its emperor in the Hall of Mirrors at Versailles.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Dieser Kaiserproklamation hatte der 74jährige nur zögernd zugestimmt, da er den Titel des Königs von Preußen als weitaus höher erachtete; er habe, wie er seinem Sohn, dem Kronprinzen, gegenüber äußert "die glänzende preußische Krone mit dieser Schmutzkrone vertauschen müssen".',
          lang: 'de',
          cite: { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/wilhelm-i' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The German Empire--often called the Second Reich to distinguish it from the First Reich, established by Charlemagne in 800--was based on two compromises.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Imperial Germany', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/28.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1870-11-15', notAfter: '1870-11-25' },
            cites: [
              { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '55' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Der Norddeutsche Bund und die süddeutschen Staaten Baden, Hessen, Württemberg und Bayern einigen sich in den "Novemberverträgen" über die Gründung eines deutschen Bundesstaates.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '56' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1870.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1870-12-03' },
            cites: [
              { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '60' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Im "Kaiserbrief" schlägt König Ludwig II. von Bayern (1845-1886) König Wilhelm I. von Preußen als Deutschen Kaiser vor.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '61' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1870.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1871-01-18' },
            cites: [
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '4' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Damit entsteht aus dem Norddeutschen Bund und den vier süddeutschen Staaten Bayern, Württemberg, Baden und Hessen-Darmstadt unter preußischer Führung der erste deutsche Nationalstaat.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1871-03-21' },
            cites: [
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '26' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Eröffnung des 1. Deutschen Reichstags: Der preußische Ministerpräsident Otto von Bismarck wird zum Reichskanzler des Deutschen Reichs ernannt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '27' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1871-04-14' },
            cites: [
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '31' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Der Reichstag verabschiedet die Verfassung des Deutschen Reichs mit nur sieben Gegenstimmen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '32' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/A_v_Werner_-_Kaiserproklamation_am_18_Januar_1871_%283._Fassung_1885%29.jpg/1280px-A_v_Werner_-_Kaiserproklamation_am_18_Januar_1871_%283._Fassung_1885%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_v_Werner_-_Kaiserproklamation_am_18_Januar_1871_(3._Fassung_1885).jpg',
    credit: { institution: 'Bismarck Museum', creator: 'Anton von Werner' },
    license: { id: 'public-domain' }
  }
})
