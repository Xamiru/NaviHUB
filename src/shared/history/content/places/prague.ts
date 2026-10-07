import { definePlace } from '../../schema'

export default definePlace({
  id: 'prague',
  names: [
    { text: 'Prague', lang: 'en', role: 'primary' },
    { text: 'Praha', lang: 'cs', role: 'native' }
  ],
  researched: '2026-10-07',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'CZ',
  coords: {
    lat: 50.0853,
    lon: 14.464,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Prague (ne_id 1159151359)' }
      }
    ]
  }
})
