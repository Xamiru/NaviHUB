import { definePlace } from '../../schema'

export default definePlace({
  id: 'granada',
  names: [
    { text: 'Granada', lang: 'en', role: 'primary' },
    { text: 'Granada', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'ES',
  coords: {
    lat: 37.165,
    lon: -3.585,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Granada‎ (ne_id 1159146299)' }
      }
    ]
  }
})
