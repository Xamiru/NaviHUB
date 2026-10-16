import { definePlace } from '../../schema'

export default definePlace({
  id: 'amsterdam',
  names: [
    { text: 'Amsterdam', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'NL',
  coords: {
    lat: 52.3519,
    lon: 4.9147,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Amsterdam (ne_id 1159151519)' }
      }
    ]
  }
})
