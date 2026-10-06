import { definePlace } from '../../schema'

export default definePlace({
  id: 'moscow',
  names: [
    { text: 'Moscow', lang: 'en', role: 'primary' },
    { text: 'Москва', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'RU',
  coords: {
    lat: 55.7541,
    lon: 37.6136,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Moscow (ne_id 1159151585)' }
      }
    ]
  }
})
