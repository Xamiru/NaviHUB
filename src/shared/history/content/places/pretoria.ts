import { definePlace } from '../../schema'

export default definePlace({
  id: 'pretoria',
  names: [
    { text: 'Pretoria', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'ZA',
  coords: {
    lat: -25.705,
    lon: 28.2275,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Pretoria (ne_id 1159150661)' }
      }
    ]
  }
})
