import { definePlace } from '../../schema'

export default definePlace({
  id: 'phnom-penh',
  names: [
    { text: 'Phnom Penh', lang: 'en', role: 'primary' },
    { text: 'ភ្នំពេញ', lang: 'km', role: 'native', translit: 'Phnum Pénh' }
  ],
  researched: '2026-10-09',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'KH',
  coords: {
    lat: 11.552,
    lon: 104.9147,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Phnom Penh (ne_id 1159151127)' }
      }
    ]
  }
})
