import { definePerson } from '../../schema'

export default definePerson({
  id: 'franklin-d-roosevelt',
  names: [
    { text: 'Franklin D. Roosevelt', lang: 'en', role: 'primary' },
    { text: 'FDR', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1882-01-30' },
        cites: [
          {
            source: 'lemo-biografie-franklin-d-roosevelt',
            loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '1' }
          },
          {
            source: 'lemo-biografie-franklin-d-roosevelt',
            loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1945-04-12' },
        cites: [
          {
            source: 'lemo-biografie-franklin-d-roosevelt',
            loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '69' }
          },
          {
            source: 'lemo-biografie-franklin-d-roosevelt',
            loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '72' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'President of the United States',
      start: {
        alts: [
          {
            value: { d: '1933-03-04' },
            cites: [
              {
                source: 'lemo-biografie-franklin-d-roosevelt',
                loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '35' }
              },
              {
                source: 'lemo-biografie-franklin-d-roosevelt',
                loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '37' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1945-04-12' },
            cites: [
              {
                source: 'lemo-biografie-franklin-d-roosevelt',
                loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '69' }
              },
              {
                source: 'lemo-biografie-franklin-d-roosevelt',
                loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '72' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'lemo-biografie-franklin-d-roosevelt',
          loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '37' }
        },
        {
          source: 'avalon-fdr-first-inaugural-address',
          loc: { section: 'First Inaugural Address of Franklin D. Roosevelt' }
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
          text: 'Die verheerenden Folgen der Weltwirtschaftskrise auf die amerikanische Ökonomie bringen den amtierenden Präsidenten Herbert Hoover (1874-1964) in eine defensive Position im Präsidentschaftswahlkampf. Roosevelt gelingt gegen Hoover ein deutlicher Wahlsieg.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-franklin-d-roosevelt',
            loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/franklin-d-roosevelt'
          }
        },
        {
          id: 'q2',
          text: '4. März: Roosevelt wird als Präsident der USA vereidigt. Er leitet ein Hilfs- und Sanierungsprogramm für die amerikanische Wirtschaft und das Finanzwesen ein.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-franklin-d-roosevelt',
            loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '37' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/franklin-d-roosevelt'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Mit einem überwältigenden Sieg wird Roosevelt als Präsident wiedergewählt.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-franklin-d-roosevelt',
            loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/franklin-d-roosevelt'
          }
        },
        {
          id: 'q4',
          text: 'Seine Außenpolitik zielt auf eine Isolierung der totalitären Regierungen von Adolf Hitler und Benito Mussolini sowie auf eine Begrenzung der japanischen Expansionspolitik.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-franklin-d-roosevelt',
            loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '45' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/franklin-d-roosevelt'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q5',
          text: 'So, first of all, let me assert my firm belief that the only thing we have to fear is fear itself--nameless, unreasoning, unjustified terror which paralyzes needed efforts to convert retreat into advance.',
          lang: 'en',
          cite: {
            source: 'avalon-fdr-first-inaugural-address',
            loc: { section: 'First Inaugural Address of Franklin D. Roosevelt' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/froos1.asp'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: '12. April: Franklin D. Roosevelt stirbt in Warm Springs.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-franklin-d-roosevelt',
            loc: { section: 'Franklin D. Roosevelt 1882-1945', para: '72' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/franklin-d-roosevelt'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Franklin_D._Roosevelt_-_NARA_-_196713.jpg/1280px-Franklin_D._Roosevelt_-_NARA_-_196713.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Franklin_D._Roosevelt_-_NARA_-_196713.jpg',
    credit: { institution: 'U.S. National Archives and Records Administration' },
    license: { id: 'public-domain' }
  }
})
