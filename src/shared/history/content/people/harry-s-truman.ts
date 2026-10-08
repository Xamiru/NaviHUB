import { definePerson } from '../../schema'

export default definePerson({
  id: 'harry-s-truman',
  names: [
    { text: 'Harry S. Truman', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1884-05-08' },
        cites: [
          {
            source: 'lemo-biografie-harry-s-truman',
            loc: { section: 'Harry S. Truman 1884 - 1972', para: '3' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1972-12-26' },
        cites: [
          {
            source: 'lemo-biografie-harry-s-truman',
            loc: { section: 'Harry S. Truman 1884 - 1972', para: '46' }
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
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1945' },
            cites: [
              {
                source: 'lemo-biografie-harry-s-truman',
                loc: { section: 'Harry S. Truman 1884 - 1972', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1953' },
            cites: [
              {
                source: 'lemo-biografie-harry-s-truman',
                loc: { section: 'Harry S. Truman 1884 - 1972', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'lemo-biografie-harry-s-truman',
          loc: { section: 'Harry S. Truman 1884 - 1972', para: '1' }
        },
        {
          source: 'lemo-biografie-harry-s-truman',
          loc: { section: 'Harry S. Truman 1884 - 1972', para: '20' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'Harry S. Truman became President of the United States with the death of Franklin D. Roosevelt on April 12, 1945. During his nearly eight years in office, Truman confronted enormous challenges in both foreign and domestic affairs.',
          lang: 'en',
          cite: { source: 'millercenter-hamby-harry-s-truman', loc: { section: 'Harry S. Truman' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://millercenter.org/president/truman' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q6',
          text: 'On the morning of August 6, 1945, the United States dropped the first atomic bomb on the Japanese city of Hiroshima. A second atomic bomb was dropped on the city of Nagasaki three days later.',
          lang: 'en',
          cite: { source: 'millercenter-truman-key-events', loc: { section: 'Key Events' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://millercenter.org/president/truman/key-events'
          }
        },
        {
          id: 'q7',
          text: 'On June 24, 1948, the Soviet Union halted all transportation by road and rail into the areas of Berlin controlled by the United States, Britain, and France. The American and British forces immediately initiated an airlift of supplies to relieve the western-controlled portions of the city.',
          lang: 'en',
          cite: { source: 'millercenter-truman-key-events', loc: { section: 'Key Events' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://millercenter.org/president/truman/key-events'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Harry_S._Truman_Presidential_Portrait_%283x4_cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Harry_S._Truman_Presidential_Portrait_(3x4_cropped).jpg',
    credit: { institution: 'US National Archives and Records Administration' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'truman-first-address-to-congress-1945',
      mediaKind: 'audio',
      title: 'Address Of Harry S. Truman At His First Official Appearance Before Congress As President, 04-16-1945',
      url: 'https://archive.org/download/TrumanFirstOfficialAppearance/Address%20of%20Harry%20S%20Truman%20at%20His%20First%20Official%20Appearance%20Before%20Congress%20as%20President,%2004-16-1945.mp3',
      page: 'https://archive.org/details/TrumanFirstOfficialAppearance',
      credit: {
        institution: 'wwIIarchive-audio collection (Internet Archive)',
        creator: 'National Broadcasting Company, Inc.'
      },
      license: { id: 'public-domain' },
      bytes: 14567259,
      date: { d: '1945-04-16' },
      durationSec: 1821
    }
  ]
})
