import { definePlace } from '../../schema'

export default definePlace({
  id: 'acre',
  names: [
    { text: 'Acre', lang: 'en', role: 'primary' },
    { text: 'עכו', lang: 'he', role: 'native' },
    { text: 'ʿAkkā', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['mena'],
  coords: {
    lat: 32.9281,
    lon: 35.0765,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Acre (geonameid 295721)' } }
    ]
  },
  modernCountry: 'IL'
})
