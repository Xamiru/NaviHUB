import { definePlace } from '../../schema'

export default definePlace({
  id: 'simbirsk',
  names: [
    { text: 'Simbirsk', lang: 'en', role: 'primary' },
    { text: 'Ulyanovsk', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'RU',
  coords: {
    lat: 54.33,
    lon: 48.41,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Ulyanovsk (ne_id 1159149577)' }
      }
    ]
  }
})
