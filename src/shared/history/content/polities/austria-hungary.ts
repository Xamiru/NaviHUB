import { definePolity } from '../../schema'

export default definePolity({
  id: 'austria-hungary',
  names: [
    { text: 'Austria-Hungary', lang: 'en', role: 'primary' },
    {
      text: 'Dual Monarchy',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'DUAL MONARCHY', para: '1' }
        }
      ]
    },
    {
      text: 'Österreichisch-ungarische Doppelmonarchie',
      lang: 'de',
      role: 'native',
      cites: [
        { source: 'lemo-chronik-1867', loc: { section: 'Chronik 1867', para: '38' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1867' },
        cites: [
          {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'DUAL MONARCHY', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1918-11-11' },
        cites: [
          {
            source: 'loc-austria-country-study-1994',
            loc: {
              section: 'The End of the Habsburg Empire and the Birth of the Austrian Republic',
              para: '2'
            }
          }
        ]
      },
      {
        value: { d: '1918-11-12' },
        cites: [
          {
            source: 'state-dept-countries-austria',
            loc: { section: 'Austria (The Republic of): Summary', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:vienna',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'AUSTRIA-HUNGARY TO THE EARLY 1900s', para: '4' }
        }
      ]
    },
    {
      ref: 'place:budapest',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'AUSTRIA-HUNGARY TO THE EARLY 1900s', para: '4' }
        }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:austrian-empire',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'AUSTRIA-HUNGARY TO THE EARLY 1900s', para: '3' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'europe', code: 300, from: 1867, to: 1886 },
    { set: 'world', code: 300, to: 1918.84 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Bertalan_Szekely_coronation_of_Franz_Josef_I_in_matthias_church_1867_IMG_0245.JPG/1280px-Bertalan_Szekely_coronation_of_Franz_Josef_I_in_matthias_church_1867_IMG_0245.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Bertalan_Szekely_coronation_of_Franz_Josef_I_in_matthias_church_1867_IMG_0245.JPG',
    credit: { creator: 'Bjoertvedt' },
    license: { id: 'cc-by-sa', version: '4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Das österreichische Kaisertum wird als österreichisch-ungarische Doppelmonarchie neu organisiert: Die nach dem Fluss Leitha benannten Reichsteile Cisleithanien (Österreich) und Transleithanien (Ungarn) erhalten eigene Parlamente und Verwaltungen. Außenpolitik, Verteidigung und Finanzen werden gesamtstaatlich wahrgenommen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1867', loc: { section: 'Chronik 1867', para: '38' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1867.html'
          }
        },
        {
          id: 'q2',
          text: 'Joint Austro-Hungarian affairs were managed through "common" ministries of foreign affairs, defense, and finance. The respective ministers were responsible to delegations representing separate Austrian and Hungarian parliaments.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'DUAL MONARCHY', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/23.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q3',
          text: 'World War I led to the disintegration of Austria-Hungary, and in the aftermath of the war, a series of governments--including a communist regime--assumed power in Buda and Pest (in 1872 the cities of Buda and Pest united to become Budapest).',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'DUAL MONARCHY', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/23.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'On November 3, imperial authorities signed an armistice, bringing Austro-Hungarian participation in World War I to an official end. On November 11, Karl renounced any role in the new Austrian state, and the next day the provisional government issued a constitution for the German Austrian Republic.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: {
              section: 'The End of the Habsburg Empire and the Birth of the Austrian Republic',
              para: '2'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/austria/32.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'wandruszka-urbanitsch-1973-die-habsburgermonarchie', perspective: 'european' },
    { source: 'hanak-1984-ungarn-in-der-donaumonarchie', perspective: 'european' }
  ]
})
