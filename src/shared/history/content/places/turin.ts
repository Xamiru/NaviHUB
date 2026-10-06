import { definePlace } from '../../schema'

export default definePlace({
  id: 'turin',
  names: [
    { text: 'Turin', lang: 'en', role: 'primary' },
    { text: 'Torino', lang: 'it', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'IT',
  coords: {
    lat: 45.0723,
    lon: 7.668,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Turin (ne_id 1159146875)' }
      }
    ]
  }
})
