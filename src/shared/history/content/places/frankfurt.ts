import { definePlace } from '../../schema'

export default definePlace({
  id: 'frankfurt',
  names: [
    { text: 'Frankfurt am Main', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'DE',
  coords: {
    lat: 50.1,
    lon: 8.675,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Frankfurt (ne_id 1159151351)' }
      }
    ]
  }
})
