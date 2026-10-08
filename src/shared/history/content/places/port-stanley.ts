import { definePlace } from '../../schema'

export default definePlace({
  id: 'port-stanley',
  names: [
    { text: 'Port Stanley', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'FK',
  coords: {
    lat: -51.6938,
    lon: -57.857,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Stanley (geonameid 3426691)' } }
    ]
  }
})
