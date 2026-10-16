import { definePlace } from '../../schema'

export default definePlace({
  id: 'bangkok',
  names: [
    { text: 'Bangkok', lang: 'en', role: 'primary' },
    { text: 'กรุงเทพมหานคร', lang: 'th', role: 'native' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'TH',
  coords: {
    lat: 13.7519,
    lon: 100.5147,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Bangkok (ne_id 1159151509)' }
      }
    ]
  }
})
