import { definePlace } from '../../schema'

export default definePlace({
  id: 'sarajevo',
  names: [
    { text: 'Sarajevo', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'BA',
  coords: {
    lat: 43.85,
    lon: 18.383,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Sarajevo (ne_id 1159151177)' }
      }
    ]
  }
})
