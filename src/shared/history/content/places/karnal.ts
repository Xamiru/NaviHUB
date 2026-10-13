import { definePlace } from '../../schema'

export default definePlace({
  id: 'karnal',
  names: [
    { text: 'Karnal', lang: 'en', role: 'primary' },
    { text: 'کرنال', lang: 'fa', role: 'alternative' },
    { text: 'कर्नाल', lang: 'hi', role: 'native' }
  ],
  researched: '2026-10-13',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'IN',
  coords: {
    lat: 29.6804,
    lon: 76.97,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Karnal (ne_id 1159141729)' }
      }
    ]
  }
})
