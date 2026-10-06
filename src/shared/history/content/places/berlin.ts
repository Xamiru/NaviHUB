import { definePlace } from '../../schema'

export default definePlace({
  id: 'berlin',
  names: [
    { text: 'Berlin', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'DE',
  coords: {
    lat: 52.5238,
    lon: 13.3996,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Berlin (ne_id 1159151529)' }
      }
    ]
  }
})
