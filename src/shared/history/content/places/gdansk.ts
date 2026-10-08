import { definePlace } from '../../schema'

export default definePlace({
  id: 'gdansk',
  names: [
    { text: 'Gdańsk', lang: 'en', role: 'primary' },
    { text: 'Gdańsk', lang: 'pl', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'PL',
  coords: {
    lat: 54.36,
    lon: 18.64,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Gdańsk (ne_id 1159149707)' }
      }
    ]
  }
})
