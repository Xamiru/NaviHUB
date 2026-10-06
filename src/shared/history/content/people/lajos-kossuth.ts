import { definePerson } from '../../schema'

export default definePerson({
  id: 'lajos-kossuth',
  names: [
    { text: 'Lajos Kossuth', lang: 'en', role: 'primary' },
    { text: 'Kossuth Lajos', lang: 'hu', role: 'native' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1802' },
        cites: [
          { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '21' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1894' },
        cites: [
          { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '21' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['politician', 'revolutionary'],
  offices: [
    {
      title: 'minister of finance',
      start: {
        alts: [
          {
            value: { d: '1848-03-22' },
            cites: [
              {
                source: 'loc-hungary-country-study-1989',
                loc: { section: 'The Revolution of March 1848', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '1' }
        }
      ]
    },
    {
      title: 'governor',
      start: {
        alts: [
          {
            value: { d: '1849-04' },
            cites: [
              {
                source: 'loc-hungary-country-study-1989',
                loc: { section: 'The Revolution of March 1848', para: '3' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1849-08-11' },
            cites: [
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '64' } },
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '63' } }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '3' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Der ungarische Revolutionsführer Lajos Kossuth (1802-1894) fordert eine unabhängige Regierung für das bislang von Österreich regierte Königreich Ungarn.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1848.html'
          }
        },
        {
          id: 'q2',
          text: 'A committee of national defense under Kossuth took control, authorized the establishment of a Hungarian army, and issued paper money to fund it.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'The Revolution of March 1848', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/21.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q3',
          text: 'Unter dem Druck einer österreichisch-russischen Interventionsarmee dankt der ungarische Reichsverweser Lajos Kossuth ab und flieht zunächst ins Osmanische Reich.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '64' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1849.html'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Kossuth_Lajos_sz%C3%ADnezett_litogr%C3%A1fia_1848_Prinzhofer.jpg/1280px-Kossuth_Lajos_sz%C3%ADnezett_litogr%C3%A1fia_1848_Prinzhofer.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kossuth_Lajos_sz%C3%ADnezett_litogr%C3%A1fia_1848_Prinzhofer.jpg',
    credit: { institution: 'Brown University Library', creator: 'August Prinzhofer' },
    license: { id: 'public-domain' }
  }
})
