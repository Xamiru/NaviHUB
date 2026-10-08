import { definePlace } from '../../schema'

export default definePlace({
  id: 'izmir',
  names: [
    { text: 'Izmir', lang: 'en', role: 'primary' },
    { text: 'İzmir', lang: 'tr', role: 'native' },
    { text: 'Smyrna', lang: 'en', role: 'former' }
  ],
  researched: '2026-10-08',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'TR',
  coords: {
    lat: 38.4381,
    lon: 27.1498,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'İzmir (ne_id 1159149371)' }
      }
    ]
  }
})
