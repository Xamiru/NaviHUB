import { definePlace } from '../../schema'

export default definePlace({
  id: 'leipzig',
  names: [
    { text: 'Leipzig', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'DE',
  coords: {
    lat: 51.3354,
    lon: 12.41,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Leipzig (ne_id 1159140685)' }
      }
    ]
  }
})
