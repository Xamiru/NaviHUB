import { definePlace } from '../../schema'

export default definePlace({
  id: 'khiva',
  names: [
    { text: 'Khiva', lang: 'en', role: 'primary' },
    { text: 'Xiva', lang: 'uz', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['russia-central-asia'],
  coords: {
    lat: 41.3856,
    lon: 60.3641,
    cites: [
      { source: 'geonames-cities500', loc: { section: 'Xiva (geonameid 1513604)' } }
    ]
  },
  modernCountry: 'UZ'
})
