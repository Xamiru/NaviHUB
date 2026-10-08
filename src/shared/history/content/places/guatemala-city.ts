import { definePlace } from '../../schema'

export default definePlace({
  id: 'guatemala-city',
  names: [
    { text: 'Guatemala City', lang: 'en', role: 'primary' },
    { text: 'Ciudad de Guatemala', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'GT',
  coords: {
    lat: 14.6231,
    lon: -90.5289,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Guatemala City (ne_id 1159150909)' }
      }
    ]
  }
})
