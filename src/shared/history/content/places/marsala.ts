import { definePlace } from '../../schema'

export default definePlace({
  id: 'marsala',
  names: [
    { text: 'Marsala', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'IT',
  coords: {
    lat: 37.8054,
    lon: 12.4387,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Marsala (ne_id 1159139533)' }
      }
    ]
  }
})
