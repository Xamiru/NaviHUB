import { definePlace } from '../../schema'

export default definePlace({
  id: 'algiers',
  names: [
    { text: 'Algiers', lang: 'en', role: 'primary' },
    { text: 'الجزائر', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'DZ',
  coords: {
    lat: 36.765,
    lon: 3.0486,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Algiers (ne_id 1159151471)' }
      }
    ]
  }
})
