import { definePlace } from '../../schema'

export default definePlace({
  id: 'bern',
  names: [
    { text: 'Bern', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'CH',
  coords: {
    lat: 46.9167,
    lon: 7.467,
    cites: [
      { source: 'natural-earth-populated-places', loc: { section: 'Bern (ne_id 1159149737)' } }
    ]
  }
})
