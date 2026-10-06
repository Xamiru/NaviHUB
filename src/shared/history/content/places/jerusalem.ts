import { definePlace } from '../../schema'

export default definePlace({
  id: 'jerusalem',
  names: [
    { text: 'Jerusalem', lang: 'en', role: 'primary' },
    { text: 'ירושלים', lang: 'he', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'IL',
  coords: {
    lat: 31.7784,
    lon: 35.2066,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Jerusalem (ne_id 1159151203)' }
      }
    ]
  }
})
