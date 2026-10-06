import { definePlace } from '../../schema'

export default definePlace({
  id: 'jakarta',
  names: [
    { text: 'Jakarta', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'ID',
  coords: {
    lat: -6.1725,
    lon: 106.8275,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Jakarta (ne_id 1159151599)' }
      }
    ]
  }
})
