import { definePlace } from '../../schema'

export default definePlace({
  id: 'boma',
  names: [
    { text: 'Boma', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'CD',
  coords: {
    lat: -5.83,
    lon: 13.05,
    cites: [
      { source: 'natural-earth-populated-places', loc: { section: 'Boma (ne_id 1159148479)' } }
    ]
  }
})
