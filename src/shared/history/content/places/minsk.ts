import { definePlace } from '../../schema'

export default definePlace({
  id: 'minsk',
  names: [
    { text: 'Minsk', lang: 'en', role: 'primary' },
    { text: 'Мінск', lang: 'be', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'BY',
  coords: {
    lat: 53.9019,
    lon: 27.5647,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Minsk (ne_id 1159151149)' }
      }
    ]
  }
})
