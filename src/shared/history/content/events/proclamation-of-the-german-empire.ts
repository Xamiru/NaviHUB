import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'proclamation-of-the-german-empire',
  names: [
    { text: 'Proclamation of the German Empire', lang: 'en', role: 'primary' },
    { text: 'Kaiserproklamation', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-08',
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
  polities: [
    { ref: 'polity:german-empire' },
    { ref: 'polity:kingdom-of-prussia' }
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
      ref: 'polity:german-empire',
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
          id: 'q2',
          text: 'Months before a peace treaty was signed with France in May 1871, a united Germany was established as the German Empire, and the Prussian king, Wilhelm I, was crowned its emperor in the Hall of Mirrors at Versailles.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q10',
          text: 'On the 18th of January 1871, ten days before the capitulation of Paris, William I., king of Prussia, was proclaimed German emperor in the great hall of the palace of Versailles, on the initiative of the king of Bavaria, the most powerful of the South German sovereigns, the traditional ally of France.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-germany-history',
            loc: { section: 'GERMANY: History', para: '266' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
          }
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
        id: 'q11',
        text: 'By the treaties of Versailles the kingdoms of Bavaria and Württemberg, and the […] grand-duchy of Baden, as well as the southern provinces of the grand-duchy of Hesse, were added to the North German Confederation.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '267' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
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
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '4' } },
              {
                source: 'britannica-1911-germany-history',
                loc: { section: 'GERMANY: History', para: '266' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Henceforward all the German states that had survived the struggle of 1866, with the exception of the empire of Austria, the grand-duchy of Luxemburg, and the principality of Liechtenstein, were incorporated in a permanent federal state under the leadership of Prussia.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '267' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1871-03-21' },
            cites: [
              {
                source: 'britannica-1911-william-i-of-germany',
                loc: { section: 'WILLIAM I. OF GERMANY', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On the 3rd of March 1871 he signed the preliminaries of peace which had been accepted by the French Assembly; and on the 21st of March he opened the first imperial parliament of Germany.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-william-i-of-germany',
          loc: { section: 'WILLIAM I. OF GERMANY', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/William_I._of_Germany'
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
        id: 'q14',
        text: 'The revision in 1871 made no important alterations in the constitution of 1867.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '267' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/A_v_Werner_-_Kaiserproklamation_am_18_Januar_1871_%283._Fassung_1885%29.jpg/1280px-A_v_Werner_-_Kaiserproklamation_am_18_Januar_1871_%283._Fassung_1885%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_v_Werner_-_Kaiserproklamation_am_18_Januar_1871_(3._Fassung_1885).jpg',
    credit: { institution: 'Bismarck Museum', creator: 'Anton von Werner' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'wehler-1975-das-deutsche-kaiserreich', perspective: 'european' },
    { source: 'nipperdey-1990-deutsche-geschichte-1866-1918', perspective: 'european' }
  ]
})
