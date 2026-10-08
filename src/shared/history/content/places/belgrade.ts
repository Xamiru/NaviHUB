import { definePlace } from '../../schema'

export default definePlace({
  id: 'belgrade',
  names: [
    { text: 'Belgrade', lang: 'en', role: 'primary' },
    { text: 'Београд', lang: 'sr', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'RS',
  coords: {
    lat: 44.8206,
    lon: 20.466,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Belgrade (ne_id 1159151079)' }
      }
    ]
  }
})
