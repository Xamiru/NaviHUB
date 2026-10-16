import { definePlace } from '../../schema'

export default definePlace({
  id: 'baikonur',
  names: [
    { text: 'Baikonur', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'KZ',
  coords: {
    lat: 45.6914,
    lon: 63.2413,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Baykonur (ne_id 1159147289)' }
      }
    ]
  }
})
