import { definePlace } from '../../schema'

export default definePlace({
  id: 'calicut',
  names: [
    { text: 'Calicut', lang: 'en', role: 'primary' },
    {
      text: 'Kozhikode',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'The Coming of the Europeans', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'IN',
  coords: {
    lat: 11.248,
    lon: 75.7804,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Kozhikode (geonameid 1265873)' } }
    ]
  }
})
