import { definePlace } from '../../schema'

export default definePlace({
  id: 'dhaka',
  names: [
    { text: 'Dhaka', lang: 'en', role: 'primary' },
    { text: 'ঢাকা', lang: 'bn', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'BD',
  coords: {
    lat: 23.725,
    lon: 90.4066,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Dhaka (ne_id 1159151467)' }
      }
    ]
  }
})
