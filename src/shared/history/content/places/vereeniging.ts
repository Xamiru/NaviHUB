import { definePlace } from '../../schema'

export default definePlace({
  id: 'vereeniging',
  names: [
    { text: 'Vereeniging', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'ZA',
  coords: {
    lat: -26.6477,
    lon: 27.958,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Vereeniging (ne_id 1159146485)' }
      }
    ]
  }
})
