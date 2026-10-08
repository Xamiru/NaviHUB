import { definePlace } from '../../schema'

export default definePlace({
  id: 'basra',
  names: [
    { text: 'Basra', lang: 'en', role: 'primary' },
    { text: 'البصرة', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'IQ',
  coords: {
    lat: 30.5155,
    lon: 47.8116,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Basra (ne_id 1159150127)' }
      }
    ]
  }
})
