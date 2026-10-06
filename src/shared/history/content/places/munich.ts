import { definePlace } from '../../schema'

export default definePlace({
  id: 'munich',
  names: [
    { text: 'Munich', lang: 'en', role: 'primary' },
    { text: 'München', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'DE',
  coords: {
    lat: 48.1319,
    lon: 11.573,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Munich (ne_id 1159151357)' }
      }
    ]
  }
})
