import { definePerson } from '../../schema'

export default definePerson({
  id: 'imre-nagy',
  names: [
    { text: 'Imre Nagy', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  died: {
    alts: [
      {
        value: { d: '1958' },
        cites: [
          {
            source: 'enrs-scieranska-hungarian-revolution-1956',
            loc: { section: 'The Hungarian Revolution 1956', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['politician'],
  offices: [
    {
      title: 'Prime Minister',
      start: {
        alts: [
          {
            value: { d: '1953-07' },
            cites: [
              {
                source: 'enrs-scieranska-hungarian-revolution-1956',
                loc: { section: 'The Hungarian Revolution 1956', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'enrs-scieranska-hungarian-revolution-1956',
          loc: { section: 'The Hungarian Revolution 1956', para: '2' }
        },
        {
          source: 'enrs-scieranska-hungarian-revolution-1956',
          loc: { section: 'The Hungarian Revolution 1956', para: '4' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Nagy_Imre_k%C3%A9s%C5%91bbi_minisztereln%C3%B6k_igazolv%C3%A1nyk%C3%A9pe_1945-b%C5%91l._Fortepan_74226.jpg/1280px-Nagy_Imre_k%C3%A9s%C5%91bbi_minisztereln%C3%B6k_igazolv%C3%A1nyk%C3%A9pe_1945-b%C5%91l._Fortepan_74226.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nagy_Imre_k%C3%A9s%C5%91bbi_minisztereln%C3%B6k_igazolv%C3%A1nyk%C3%A9pe_1945-b%C5%91l._Fortepan_74226.jpg',
    credit: { institution: 'Fortepan' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In July 1953, Rákosi was replaced as Prime Minister by the reformist Imre Nagy. He gained popular consent, though the Kremlin distrusted him.',
          lang: 'en',
          cite: {
            source: 'enrs-scieranska-hungarian-revolution-1956',
            loc: { section: 'The Hungarian Revolution 1956', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://enrs.eu/article/the-hungarian-revolution-1956'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'On that day, Imre Nagy announced an unconditional general ceasefire and amnesty, as well as the end of the single-party system in Hungary. On 1 November, Nagy formally declared Hungary’s withdrawal from the Warsaw Pact.',
          lang: 'en',
          cite: {
            source: 'enrs-scieranska-hungarian-revolution-1956',
            loc: { section: 'The Hungarian Revolution 1956', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://enrs.eu/article/the-hungarian-revolution-1956'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q3',
          text: 'Imre Nagy, who had taken shelter in the Yugoslavian embassy in Budapest, was arrested, sent to Romania and executed in 1958.',
          lang: 'en',
          cite: {
            source: 'enrs-scieranska-hungarian-revolution-1956',
            loc: { section: 'The Hungarian Revolution 1956', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://enrs.eu/article/the-hungarian-revolution-1956'
          }
        }
      ]
    }
  ]
})
