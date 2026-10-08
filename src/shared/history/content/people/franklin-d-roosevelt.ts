import { definePerson } from '../../schema'

export default definePerson({
  id: 'franklin-d-roosevelt',
  names: [
    { text: 'Franklin D. Roosevelt', lang: 'en', role: 'primary' },
    { text: 'FDR', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
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
      polity: 'polity:united-states',
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
          id: 'q7',
          text: 'Faced with the Great Depression and World War II, Franklin D. Roosevelt, nicknamed “FDR,” guided America through its greatest domestic crisis, with the exception of the Civil War, and its greatest foreign crisis. His presidency—which spanned twelve years—was unparalleled, not only in length but in scope.',
          lang: 'en',
          cite: {
            source: 'millercenter-leuchtenburg-franklin-d-roosevelt',
            loc: { section: 'Franklin D. Roosevelt' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://millercenter.org/president/fdroosevelt'
          }
        },
        {
          id: 'q8',
          text: 'The outcome of the 1932 presidential contest between Roosevelt and Hoover was never greatly in doubt. Dispirited Americans swept the fifty-year-old FDR into office in a landslide in both the popular and electoral college votes.',
          lang: 'en',
          cite: {
            source: 'millercenter-leuchtenburg-fdr-campaigns-and-elections',
            loc: { section: 'The Campaign and Election of 1932' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://millercenter.org/president/fdroosevelt/campaigns-and-elections'
          }
        },
        {
          id: 'q9',
          text: 'Roosevelt is inaugurated as the thirty-second President of the United States.',
          lang: 'en',
          cite: { source: 'millercenter-fdr-key-events', loc: { section: 'Key Events' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://millercenter.org/president/fdroosevelt/key-events'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q10',
          text: 'Roosevelt wins reelection to the presidency in stunning fashion, gaining 523 electoral votes (27,750,000 popular) to Landon\'s 8 (16,680,000 popular).',
          lang: 'en',
          cite: { source: 'millercenter-fdr-key-events', loc: { section: 'Key Events' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://millercenter.org/president/fdroosevelt/key-events'
          }
        },
        {
          id: 'q11',
          text: 'FDR works to cement the U.S. alliance with Britain against the looming Fascist-totalitarian threat.',
          lang: 'en',
          cite: { source: 'millercenter-fdr-key-events', loc: { section: 'Key Events' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://millercenter.org/president/fdroosevelt/key-events'
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
          id: 'q12',
          text: 'While vacationing in Warm Springs, Georgia, President Franklin D. Roosevelt dies following a massive cerebral hemorrhage.',
          lang: 'en',
          cite: { source: 'millercenter-fdr-key-events', loc: { section: 'Key Events' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://millercenter.org/president/fdroosevelt/key-events'
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
