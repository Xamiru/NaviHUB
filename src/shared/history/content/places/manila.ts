import { definePlace } from '../../schema'

export default definePlace({
  id: 'manila',
  names: [
    { text: 'Manila', lang: 'en', role: 'primary' },
    { text: 'Maynila', lang: 'tl', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'PH',
  coords: {
    lat: 14.6061,
    lon: 120.9803,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Manila (ne_id 1159151525)' }
      }
    ]
  }
})
