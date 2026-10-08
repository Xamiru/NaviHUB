import { definePlace } from '../../schema'

export default definePlace({
  id: 'new-plymouth',
  names: [
    { text: 'New Plymouth', lang: 'en', role: 'primary' },
    { text: 'Ngāmotu', lang: 'mi', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['oceania'],
  modernCountry: 'NZ',
  coords: {
    lat: -39.0556,
    lon: 174.0748,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'New Plymouth (ne_id 1159151651)' }
      }
    ]
  }
})
