import { definePlace } from '../../schema'

export default definePlace({
  id: 'maastricht',
  names: [
    { text: 'Maastricht', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'NL',
  coords: {
    lat: 50.853,
    lon: 5.677,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Maastricht (ne_id 1159115953)' }
      }
    ]
  }
})
