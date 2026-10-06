import { definePlace } from '../../schema'

export default definePlace({
  id: 'karachi',
  names: [
    { text: 'Karachi', lang: 'en', role: 'primary' },
    { text: 'کراچی', lang: 'ur', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'PK',
  coords: {
    lat: 24.8719,
    lon: 66.9881,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Karachi (ne_id 1159151287)' }
      }
    ]
  }
})
