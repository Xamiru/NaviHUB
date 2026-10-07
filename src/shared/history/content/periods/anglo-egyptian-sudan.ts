import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'anglo-egyptian-sudan',
  names: [
    { text: 'Anglo-Egyptian Sudan', lang: 'en', role: 'primary' },
    {
      text: 'Anglo-Egyptian Condominium',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE ANGLO-EGYPTIAN CONDOMINIUM, 1899-1955' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1899-01-19' },
        cites: [
          { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '2' } },
          {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE ANGLO-EGYPTIAN CONDOMINIUM, 1899-1955', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1955' },
        cites: [
          {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE ANGLO-EGYPTIAN CONDOMINIUM, 1899-1955' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'mena'],
  prominence: 3,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In January 1899, an Anglo-Egyptian agreement restored Egyptian rule in Sudan but as part of a condominium, or joint authority, exercised by Britain and Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE ANGLO-EGYPTIAN CONDOMINIUM, 1899-1955', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/15.htm' }
        },
        {
          id: 'q2',
          text: 'Britain assumed responsibility for governing the territory on behalf of the khedive.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE ANGLO-EGYPTIAN CONDOMINIUM, 1899-1955', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/15.htm' }
        },
        {
          id: 'q3',
          text: 'Das Gebiet wird nun offiziell britisch-ägyptisches Kondominium und bleibt faktisch bis 1953 britische Kolonie.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1899.html'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Century_Mag_the_Nile_and_NE_Africa.png',
    page: 'https://commons.wikimedia.org/wiki/File:Century_Mag_the_Nile_and_NE_Africa.png',
    credit: { institution: 'The Century Magazine (February 1899)' },
    license: { id: 'public-domain' }
  }
})
