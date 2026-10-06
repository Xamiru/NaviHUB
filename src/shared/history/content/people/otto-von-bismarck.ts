import { definePerson } from '../../schema'

export default definePerson({
  id: 'otto-von-bismarck',
  names: [
    { text: 'Otto von Bismarck', lang: 'en', role: 'primary' },
    { text: 'Otto Eduard Leopold von Bismarck', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1815-04-01' },
        cites: [
          {
            source: 'lemo-biografie-otto-von-bismarck',
            loc: { section: 'Otto von Bismarck 1815-1898', para: '1' }
          },
          {
            source: 'lemo-biografie-otto-von-bismarck',
            loc: { section: 'Otto von Bismarck 1815-1898', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1898-07-30' },
        cites: [
          {
            source: 'lemo-biografie-otto-von-bismarck',
            loc: { section: 'Otto von Bismarck 1815-1898', para: '124' }
          },
          {
            source: 'lemo-biografie-otto-von-bismarck',
            loc: { section: 'Otto von Bismarck 1815-1898', para: '125' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['politician'],
  offices: [
    {
      title: 'preußischer Ministerpräsident',
      lang: 'de',
      start: {
        alts: [
          {
            value: { d: '1862-10-08' },
            cites: [
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '56' }
              },
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '60' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1890-03-20' },
            cites: [
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '108' }
              },
              {
                source: 'lemo-biografie-otto-von-bismarck',
                loc: { section: 'Otto von Bismarck 1815-1898', para: '112' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'lemo-biografie-otto-von-bismarck',
          loc: { section: 'Otto von Bismarck 1815-1898', para: '60' }
        },
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Bismarck and Unification', para: '2' }
        }
      ]
    },
    {
      title: 'Bundeskanzler des Norddeutschen Bundes',
      lang: 'de',
      start: {
        alts: [
          {
            value: { d: '1867-07-14' },
            cites: [
              { source: 'lemo-chronik-1867', loc: { section: 'Chronik 1867', para: '45' } },
              { source: 'lemo-chronik-1867', loc: { section: 'Chronik 1867', para: '46' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'lemo-chronik-1867', loc: { section: 'Chronik 1867', para: '46' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'An indication of this wider range of support was the change of mind about German nationalism experienced by an obscure Prussian diplomat, Otto von Bismarck.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q2',
          text: 'During the 1850s, however, Bismarck had concluded that Prussia would have to harness German nationalism for its own purposes if it were to thrive.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: '1. April: Otto Eduard Leopold von Bismarck wird als viertes von sechs Kindern des Gutsbesitzers Ferdinand von Bismarck und dessen Frau Wilhelmine Luise (geb. Mencken) in Schönhausen (Altmark) geboren.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-otto-von-bismarck',
            loc: { section: 'Otto von Bismarck 1815-1898', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/otto-von-bismarck'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'In 1862 King Wilhelm I of Prussia (r. 1858-88) chose Bismarck to serve as his minister president.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q5',
          text: 'Descended from the Junker, Prussia\'s aristocratic landowning class, Bismarck hated parliamentary democracy and championed the dominance of the monarchy and aristocracy.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q6',
          text: 'Mit den Worten "Nicht durch Reden und Majoritätsbeschlüsse werden die großen Fragen der Zeit entschiedenen - das ist der große Fehler von 1848 und 1849 gewesen - sondern durch Eisen und Blut" nährt er jedoch das Misstrauen der Abgeordneten gegen ihn.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-otto-von-bismarck',
            loc: { section: 'Otto von Bismarck 1815-1898', para: '59' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/otto-von-bismarck'
          }
        },
        {
          id: 'q7',
          text: 'Although he could not secure parliament\'s consent to the government\'s budget, Bismarck was a tactician skilled and ruthless enough to govern without parlia-ment\'s consent from 1862 to 1866.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q9',
          text: 'Bismarck arranged an alliance with Austria-Hungary in 1879 and one with Italy in 1882.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck\'s Foreign Policy', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/32.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: '30. Juli: Otto von Bismarck stirbt in Friedrichsruh bei Hamburg.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-otto-von-bismarck',
            loc: { section: 'Otto von Bismarck 1815-1898', para: '125' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/otto-von-bismarck'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/BASA-600K-1-1866-9-Otto_von_Bismarck%2C_Versailles.jpeg/1280px-BASA-600K-1-1866-9-Otto_von_Bismarck%2C_Versailles.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:BASA-600K-1-1866-9-Otto_von_Bismarck,_Versailles.jpeg',
    credit: { institution: 'Bulgarian Archives State Agency', creator: 'Anton von Werner' },
    license: { id: 'public-domain' }
  }
})
