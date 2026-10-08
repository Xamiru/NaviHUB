import { definePlace } from '../../schema'

export default definePlace({
  id: 'nafplio',
  names: [
    { text: 'Nafplio', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  coords: {
    lat: 37.5686,
    lon: 22.8069,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Náfplio (geonameid 256637)' } }
    ]
  },
  modernCountry: 'GR'
})
