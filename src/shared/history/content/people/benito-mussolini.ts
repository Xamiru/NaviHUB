import { definePerson } from '../../schema'

export default definePerson({
  id: 'benito-mussolini',
  names: [
    { text: 'Benito Mussolini', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1883-07-29' },
        cites: [
          {
            source: 'lemo-biografie-benito-mussolini',
            loc: { section: 'Benito Mussolini 1883-1945', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1945-04-28' },
        cites: [
          {
            source: 'lemo-biografie-benito-mussolini',
            loc: { section: 'Benito Mussolini 1883-1945', para: '78' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['politician', 'journalist'],
  offices: [
    {
      title: 'prime minister of Italy',
      start: {
        alts: [
          {
            value: { d: '1922-10-30' },
            cites: [
              { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '189' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1943-07-25' },
            cites: [
              {
                source: 'ehne-toson-quest-ce-que-le-fascisme',
                loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '8' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '189' } },
        { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '190' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: '23. März: Mussolini beteiligt sich an der Gründung der "fasci di combattimento".',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-benito-mussolini',
            loc: { section: 'Benito Mussolini 1883-1945', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/benito-mussolini'
          }
        },
        {
          id: 'q2',
          text: 'Mussolini ist mittlerweile zum führenden Politiker der Rechten geworden und wandelt die "fasci" in die Nationalfaschistische Partei (PNF) um.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-benito-mussolini',
            loc: { section: 'Benito Mussolini 1883-1945', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/benito-mussolini'
          }
        },
        {
          id: 'q3',
          text: '3. Januar: Mussolini übernimmt die Verantwortung für die Ermordung des oppositionellen Sozialisten Giacomo Matteotti (1885-1924) durch Faschisten. Es folgt der Aufbau der Diktatur, mitgetragen durch Dekrete des Königs.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-benito-mussolini',
            loc: { section: 'Benito Mussolini 1883-1945', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/benito-mussolini'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: '28. April: Benito Mussolini wird mit seiner Geliebten Clara Petacci in Giuliano di Mezzegra (Comer See) erschossen. Ihre geschändeten Leichen werden öffentlich aufgehängt.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-benito-mussolini',
            loc: { section: 'Benito Mussolini 1883-1945', para: '78' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/benito-mussolini'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Benito_Mussolini_LCCN2014715051_%28cropped%29.jpg/1280px-Benito_Mussolini_LCCN2014715051_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Benito_Mussolini_LCCN2014715051_(cropped).jpg',
    credit: { institution: 'Library of Congress', creator: 'Bain News Service' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'mussolini-political-speeches-1923',
      mediaKind: 'document',
      title: 'Mussolini as revealed in his political speeches, (November 1914 - August 1923)',
      url: 'https://archive.org/download/mussoliniasrevea00mussuoft/mussoliniasrevea00mussuoft.pdf',
      page: 'https://archive.org/details/mussoliniasrevea00mussuoft',
      credit: {
        institution: 'Robarts - University of Toronto (Internet Archive)',
        creator: 'Mussolini, Benito, 1883-1945'
      },
      license: { id: 'public-domain' },
      bytes: 29434916,
      date: { d: '1923' }
    }
  ]
})
