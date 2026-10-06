import { definePlace } from '../../schema'

export default definePlace({
  id: 'damascus',
  names: [
    { text: 'Damascus', lang: 'en', role: 'primary' },
    { text: 'دمشق', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'SY',
  coords: {
    lat: 33.502,
    lon: 36.2981,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Damascus (ne_id 1159151269)' }
      }
    ]
  }
})
