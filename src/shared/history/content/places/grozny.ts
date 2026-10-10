import { definePlace } from '../../schema'

export default definePlace({
  id: 'grozny',
  names: [
    { text: 'Grozny', lang: 'en', role: 'primary' },
    { text: 'Грозный', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'RU',
  coords: {
    lat: 43.3187,
    lon: 45.6987,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Grozny (ne_id 1159149587)' }
      }
    ]
  }
})
