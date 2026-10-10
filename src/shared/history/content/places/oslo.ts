import { definePlace } from '../../schema'

export default definePlace({
  id: 'oslo',
  names: [
    { text: 'Oslo', lang: 'en', role: 'primary' },
    { text: 'Oslo', lang: 'no', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'NO',
  coords: {
    lat: 59.9186,
    lon: 10.748,
    cites: [
      { source: 'natural-earth-populated-places', loc: { section: 'Oslo (ne_id 1159151281)' } }
    ]
  }
})
