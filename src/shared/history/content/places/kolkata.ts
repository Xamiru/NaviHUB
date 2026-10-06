import { definePlace } from '../../schema'

export default definePlace({
  id: 'kolkata',
  names: [
    { text: 'Kolkata', lang: 'en', role: 'primary' },
    { text: 'কলকাতা', lang: 'bn', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'IN',
  coords: {
    lat: 22.4969,
    lon: 88.3227,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kolkata (ne_id 1159151617)' }
      }
    ]
  }
})
