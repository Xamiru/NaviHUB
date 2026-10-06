import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-saudi-arabia',
  names: [
    { text: 'Founding of the Kingdom of Saudi Arabia', lang: 'en', role: 'primary' },
    { text: 'المملكة العربية السعودية', lang: 'ar', role: 'native' },
    {
      text: 'Kingdom of Hejaz and Nejd and its Dependencies',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'state-dept-countries-saudi-arabia',
          loc: { section: 'Saudi Arabia: Recognition', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1932-09-18' },
        cites: [
          {
            source: 'state-dept-countries-saudi-arabia',
            loc: { section: 'Saudi Arabia: Recognition', para: '5' }
          }
        ]
      },
      {
        value: { d: '1932-09-23' },
        cites: [
          { source: 'lemo-chronik-1932', loc: { section: 'Chronik 1932', para: '204' } }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    { ref: 'place:riyadh' }
  ],
  participants: [
    {
      ref: 'person:ibn-saud',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-saudi-arabia-country-study-1992',
          loc: { section: 'OIL INDUSTRY: Brief History', para: '4' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:saudi-wahhabi-conquest-of-the-hijaz', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The capture of the Hijaz complicated the basis of Abd al Aziz\'s authority.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Rule of Abd Al Aziz', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/10.htm' }
        },
        {
          id: 'q2',
          text: 'Once the Hijaz was under his control, he submitted to the world Muslim community, even if only rhetorically, the question of how the area should be ruled. When he received no response, he held an informal referendum in which the notables of the Hijaz chose him as their king.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Rule of Abd Al Aziz', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/10.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'The name of the state was changed to the Kingdom of Saudi Arabia by a decree of September 18, 1932.',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-saudi-arabia',
            loc: { section: 'Saudi Arabia: Recognition', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/countries/saudi-arabia'
          }
        },
        {
          id: 'q4',
          text: 'Die arabischen Königreiche Hedschas und Nadschd vereinigen sich zum Königreich Saudi-Arabien.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1932', loc: { section: 'Chronik 1932', para: '206' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1932.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'With the recession in the 1920s and 1930s, however, pilgrimage traffic dropped, and Saudi income from the pilgrimage was reduced by more than half.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Rule of Abd Al Aziz', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/10.htm' }
        },
        {
          id: 'q6',
          text: 'The event that was to change all this was the discovery of massive oil reserves in the kingdom.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Rule of Abd Al Aziz', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/10.htm' }
        },
        {
          id: 'q7',
          text: 'By the end of the decade, Socal discovered enormous deposits that were close to the surface and thus inexpensive to extract.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Rule of Abd Al Aziz', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/10.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1933-07' },
            cites: [
              {
                source: 'loc-saudi-arabia-country-study-1992',
                loc: { section: 'OIL INDUSTRY: Brief History', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Socal then sought a concession in Saudi Arabia that became effective in July 1933.',
        lang: 'en',
        cite: {
          source: 'loc-saudi-arabia-country-study-1992',
          loc: { section: 'OIL INDUSTRY: Brief History', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/40.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1938' },
            cites: [
              {
                source: 'loc-saudi-arabia-country-study-1992',
                loc: { section: 'OIL INDUSTRY: Brief History', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The first modification was made in 1939 after the discovery of oil in 1938.',
        lang: 'en',
        cite: {
          source: 'loc-saudi-arabia-country-study-1992',
          loc: { section: 'OIL INDUSTRY: Brief History', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/40.htm' }
      }
    }
  ]
})
