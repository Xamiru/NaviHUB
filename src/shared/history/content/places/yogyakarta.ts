import { definePlace } from '../../schema'

export default definePlace({
  id: 'yogyakarta',
  names: [
    { text: 'Yogyakarta', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'ID',
  coords: {
    lat: -7.78,
    lon: 110.375,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Yogyakarta (ne_id 1159148273)' }
      }
    ]
  }
})
