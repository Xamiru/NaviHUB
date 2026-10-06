import { definePlace } from '../../schema'

export default definePlace({
  id: 'rio-de-janeiro',
  names: [
    { text: 'Rio de Janeiro', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'BR',
  coords: {
    lat: -22.9231,
    lon: -43.227,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Rio de Janeiro (ne_id 1159151619)' }
      }
    ]
  }
})
