import { definePlace } from '../../schema'

export default definePlace({
  id: 'paris',
  names: [
    { text: 'Paris', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'FR',
  coords: {
    lat: 48.8686,
    lon: 2.3314,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Paris (ne_id 1159151613)' }
      }
    ]
  }
})
