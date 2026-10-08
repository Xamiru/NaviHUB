import { definePlace } from '../../schema'

export default definePlace({
  id: 'portsmouth-new-hampshire',
  names: [
    { text: 'Portsmouth, New Hampshire', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 43.077,
    lon: -70.7577,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Portsmouth (geonameid 5091383)' } }
    ]
  }
})
