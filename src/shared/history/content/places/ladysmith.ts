import { definePlace } from '../../schema'

export default definePlace({
  id: 'ladysmith',
  names: [
    { text: 'Ladysmith', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'ZA',
  coords: {
    lat: -28.5495,
    lon: 29.78,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Ladysmith (ne_id 1159136769)' }
      }
    ]
  }
})
