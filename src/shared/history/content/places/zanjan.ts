import { definePlace } from '../../schema'

export default definePlace({
  id: 'zanjan',
  names: [
    { text: 'Zanjān', lang: 'en', role: 'primary' },
    { text: 'زنجان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['iran'],
  modernCountry: 'IR',
  coords: {
    lat: 36.67,
    lon: 48.5,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Zanjan (ne_id 1159130771)' }
      }
    ]
  }
})
