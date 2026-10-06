import { definePlace } from '../../schema'

export default definePlace({
  id: 'warsaw',
  names: [
    { text: 'Warsaw', lang: 'en', role: 'primary' },
    { text: 'Warszawa', lang: 'pl', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'PL',
  coords: {
    lat: 52.2519,
    lon: 20.9981,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Warsaw (ne_id 1159151299)' }
      }
    ]
  }
})
