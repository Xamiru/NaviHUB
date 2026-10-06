import { definePlace } from '../../schema'

export default definePlace({
  id: 'bogota',
  names: [
    { text: 'Bogotá', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'CO',
  coords: {
    lat: 4.5984,
    lon: -74.0853,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Bogota (ne_id 1159151601)' }
      }
    ]
  }
})
