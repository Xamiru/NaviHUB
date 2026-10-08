import { definePlace } from '../../schema'

export default definePlace({
  id: 'khomeyn',
  names: [
    { text: 'Khomeyn', lang: 'en', role: 'primary' },
    { text: 'Khomein', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['iran'],
  coords: {
    lat: 33.6389,
    lon: 50.08,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Khomeyn (geonameid 127403)' } }
    ]
  },
  modernCountry: 'IR'
})
