import { definePlace } from '../../schema'

export default definePlace({
  id: 'bandung',
  names: [
    { text: 'Bandung', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'ID',
  coords: {
    lat: -6.9481,
    lon: 107.5681,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Bandung (ne_id 1159151335)' }
      }
    ]
  }
})
