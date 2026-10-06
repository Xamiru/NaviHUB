import { definePlace } from '../../schema'

export default definePlace({
  id: 'rome',
  names: [
    { text: 'Rome', lang: 'en', role: 'primary' },
    { text: 'Roma', lang: 'it', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'IT',
  coords: {
    lat: 41.8979,
    lon: 12.4813,
    cites: [
      { source: 'natural-earth-populated-places', loc: { section: 'Rome (ne_id 1159151593)' } }
    ]
  }
})
