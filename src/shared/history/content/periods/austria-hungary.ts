import { definePeriod } from '../../schema'

export default definePeriod({
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
  researched: '2026-10-06',
  periodType: 'regime',
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
  regions: ['europe'],
  prominence: 2,
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
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Bertalan_Szekely_coronation_of_Franz_Josef_I_in_matthias_church_1867_IMG_0245.JPG/1280px-Bertalan_Szekely_coronation_of_Franz_Josef_I_in_matthias_church_1867_IMG_0245.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Bertalan_Szekely_coronation_of_Franz_Josef_I_in_matthias_church_1867_IMG_0245.JPG',
    credit: { creator: 'Bjoertvedt' },
    license: { id: 'cc-by-sa', version: '4.0' }
  }
})
