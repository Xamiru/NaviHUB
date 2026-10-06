import { definePlace } from '../../schema'

export default definePlace({
  id: 'budapest',
  names: [
    { text: 'Budapest', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'HU',
  coords: {
    lat: 47.502,
    lon: 19.0814,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Budapest (ne_id 1159151257)' }
      }
    ]
  }
})
