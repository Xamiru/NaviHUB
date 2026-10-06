import { definePlace } from '../../schema'

export default definePlace({
  id: 'tel-aviv',
  names: [
    { text: 'Tel Aviv', lang: 'en', role: 'primary' },
    { text: 'תל אביב', lang: 'he', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'IL',
  coords: {
    lat: 32.0819,
    lon: 34.7681,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Tel Aviv (ne_id 1159151417)' }
      }
    ]
  }
})
