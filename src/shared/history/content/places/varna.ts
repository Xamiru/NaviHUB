import { definePlace } from '../../schema'

export default definePlace({
  id: 'varna',
  names: [
    { text: 'Varna', lang: 'en', role: 'primary' },
    { text: 'Варна', lang: 'bg', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'BG',
  coords: {
    lat: 43.2156,
    lon: 27.8953,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Varna (ne_id 1159145075)' }
      }
    ]
  }
})
