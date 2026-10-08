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
          id: 'q4',
          text: 'On the 3rd of March 1848, as soon as the news of the revolution in Paris had arrived, in a speech of surpassing power he demanded parliamentary government for Hungary and constitutional government for the rest of Austria.',
          lang: 'en',
          cite: { source: 'britannica-1911-kossuth', loc: { section: 'KOSSUTH, LAJOS', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Kossuth,_Lajos'
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
          id: 'q5',
          text: 'With the capitulation of Villagos Kossuth’s career was at an end. A solitary fugitive, he crossed the Turkish frontier.',
          lang: 'en',
          cite: { source: 'britannica-1911-kossuth', loc: { section: 'KOSSUTH, LAJOS', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Kossuth,_Lajos'
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
