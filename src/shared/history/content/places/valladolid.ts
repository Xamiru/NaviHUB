import { definePlace } from '../../schema'

export default definePlace({
  id: 'valladolid',
  names: [
    { text: 'Valladolid', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'ES',
  coords: {
    lat: 41.65,
    lon: -4.75,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Valladolid (ne_id 1159147867)' }
      }
    ]
  }
})
