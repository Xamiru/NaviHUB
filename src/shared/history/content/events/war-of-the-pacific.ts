import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'war-of-the-pacific',
  names: [
    { text: 'War of the Pacific', lang: 'en', role: 'primary' },
    { text: 'Guerra del Pacífico', lang: 'es', role: 'native' },
    {
      text: 'Salpeterkrieg',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1879', loc: { section: 'Chronik 1879', para: '17' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1879-02-14' },
        cites: [
          {
            source: 'loc-bolivia-country-study-1989',
            loc: { section: 'War of the Pacific', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      },
      {
        value: { d: '1879-04-05' },
        cites: [
          { source: 'lemo-chronik-1879', loc: { section: 'Chronik 1879', para: '16' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Deutsches Historisches Museum' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1883' },
        cites: [
          {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'War of the Pacific, 1879-83', para: '3' }
          },
          {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'WAR WITH CHILE', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      },
      {
        value: { d: '1884' },
        cites: [
          { source: 'lemo-chronik-1879', loc: { section: 'Chronik 1879', para: '17' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Deutsches Historisches Museum' }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:lima',
      cites: [
        {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'War of the Pacific, 1879-83', para: '3' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'chile',
      name: 'Chile',
      cites: [
        {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'War of the Pacific, 1879-83', para: '3' }
        }
      ]
    },
    {
      key: 'peru',
      name: 'Peru',
      cites: [
        {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'War of the Pacific, 1879-83', para: '3' }
        }
      ]
    },
    {
      key: 'bolivia',
      name: 'Bolivia',
      cites: [
        {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'War of the Pacific, 1879-83', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Daza',
      role: 'head-of-state',
      side: 'bolivia',
      cites: [
        {
          source: 'loc-bolivia-country-study-1989',
          loc: { section: 'War of the Pacific', para: '1' }
        }
      ]
    },
    {
      name: 'Narciso Campero Leyes',
      role: 'head-of-state',
      side: 'bolivia',
      cites: [
        {
          source: 'loc-bolivia-country-study-1989',
          loc: { section: 'War of the Pacific', para: '1' }
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
          text: 'War began when Chilean troops crossed the northern frontier in 1879. Although a mutual defense pact had allied Peru and Bolivia since 1873, Chile\'s more professional, less politicized military overwhelmed the two weaker countries on land and sea.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'War of the Pacific, 1879-83', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/15.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'This was especially true after Peru\'s initial defeat in the naval Battle of Iquique Bay, where it lost one of its two iron-clad warships. Five months later, it lost the other, allowing Chile to gain complete control of the sea lanes and thus to virtually dictate the pace of the war.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'WAR WITH CHILE', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/14.htm' }
        },
        {
          id: 'q4',
          text: 'Bolivia, in alliance with Peru, declared war on Chile on March 1, but Bolivia\'s troops in the coastal territory were easily defeated, in part because of Daza\'s military incompetence.',
          lang: 'en',
          cite: {
            source: 'loc-bolivia-country-study-1989',
            loc: { section: 'War of the Pacific', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The turning point of the war was the occupation of Lima on January 17, 1881, a humiliation the Peruvians never forgave. Chile sealed its victory with the 1883 Treaty of Ancón, which also ended the Chilean occupation of Lima.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'War of the Pacific, 1879-83', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/15.htm' }
        },
        {
          id: 'q6',
          text: 'The Treaty of Ancón ceded to Chile in perpetuity the nitrate-rich province of Tarapacá and provided that the provinces of Tacna and Arica would remain in Chilean possession for ten years, when a plebiscite would be held to decide their final fate.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'WAR WITH CHILE', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/14.htm' }
        },
        {
          id: 'q7',
          text: 'Having lost its entire coastal territory, Bolivia withdrew from the war.',
          lang: 'en',
          cite: {
            source: 'loc-bolivia-country-study-1989',
            loc: { section: 'War of the Pacific', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/11.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1879-02-14' },
            cites: [
              {
                source: 'loc-bolivia-country-study-1989',
                loc: { section: 'War of the Pacific', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Chile immediately objected, and when Daza refused to revoke the tax hike, Chile landed troops on February 14, 1879.',
        lang: 'en',
        cite: {
          source: 'loc-bolivia-country-study-1989',
          loc: { section: 'War of the Pacific', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/11.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Combate_Naval_de_Iquique_-_Nicol%C3%A1s_Guzm%C3%A1n.jpg/1280px-Combate_Naval_de_Iquique_-_Nicol%C3%A1s_Guzm%C3%A1n.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Combate_Naval_de_Iquique_-_Nicol%C3%A1s_Guzm%C3%A1n.jpg',
    credit: { creator: 'Nicolás Guzmán Bustamante' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'bulnes-1979-guerra-del-pacifico', perspective: 'latin-american' },
    { source: 'bonilla-1980-un-siglo-a-la-deriva', perspective: 'latin-american' },
    { source: 'basadre-1968-historia-de-la-republica-del-peru', perspective: 'latin-american' }
  ]
})
