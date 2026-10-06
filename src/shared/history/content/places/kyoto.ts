import { definePlace } from '../../schema'

export default definePlace({
  id: 'kyoto',
  names: [
    { text: 'Kyoto', lang: 'en', role: 'primary' },
    { text: '京都', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'JP',
  coords: {
    lat: 35.0319,
    lon: 135.7481,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kyoto (ne_id 1159149967)' }
      }
    ]
  }
})
