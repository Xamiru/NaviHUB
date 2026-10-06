import { definePlace } from '../../schema'

export default definePlace({
  id: 'versailles',
  names: [
    { text: 'Versailles', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'FR',
  coords: {
    lat: 48.8005,
    lon: 2.1333,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Versailles (ne_id 1159142029)' }
      }
    ]
  }
})
