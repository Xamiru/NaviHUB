import { definePlace } from '../../schema'

export default definePlace({
  id: 'puebla',
  names: [
    { text: 'Puebla', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'MX',
  coords: {
    lat: 19.0519,
    lon: -98.202,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Puebla (ne_id 1159151295)' }
      }
    ]
  }
})
