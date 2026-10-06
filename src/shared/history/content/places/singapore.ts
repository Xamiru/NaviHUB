import { definePlace } from '../../schema'

export default definePlace({
  id: 'singapore',
  names: [
    { text: 'Singapore', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'SG',
  coords: {
    lat: 1.295,
    lon: 103.8539,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Singapore (ne_id 1159151627)' }
      }
    ]
  }
})
