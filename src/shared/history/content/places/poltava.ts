import { definePlace } from '../../schema'

export default definePlace({
  id: 'poltava',
  names: [
    { text: 'Poltava', lang: 'en', role: 'primary' },
    { text: 'Полтава', lang: 'uk', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe', 'russia-central-asia'],
  modernCountry: 'UA',
  coords: {
    lat: 49.574,
    lon: 34.5703,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Poltava (ne_id 1159134245)' }
      }
    ]
  }
})
