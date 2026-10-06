import { definePlace } from '../../schema'

export default definePlace({
  id: 'nagasaki',
  names: [
    { text: 'Nagasaki', lang: 'en', role: 'primary' },
    { text: '長崎', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'JP',
  coords: {
    lat: 32.765,
    lon: 129.885,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Nagasaki (ne_id 1159150893)' }
      }
    ]
  }
})
