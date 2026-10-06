import { definePlace } from '../../schema'

export default definePlace({
  id: 'panama-city',
  names: [
    { text: 'Panama City', lang: 'en', role: 'primary' },
    { text: 'Ciudad de Panamá', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'PA',
  coords: {
    lat: 8.97,
    lon: -79.535,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Panama City (ne_id 1159150667)' }
      }
    ]
  }
})
