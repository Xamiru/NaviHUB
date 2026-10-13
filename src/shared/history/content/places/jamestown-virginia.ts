import { definePlace } from '../../schema'

export default definePlace({
  id: 'jamestown-virginia',
  names: [
    { text: 'Jamestown', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  placeType: 'site',
  regions: ['north-america'],
  modernCountry: 'US',
  coords: {
    lat: 42.0974,
    lon: -79.2355,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Jamestown (ne_id 1159133605)' }
      }
    ]
  }
})
