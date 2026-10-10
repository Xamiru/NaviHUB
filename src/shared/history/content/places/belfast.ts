import { definePlace } from '../../schema'

export default definePlace({
  id: 'belfast',
  names: [
    { text: 'Belfast', lang: 'en', role: 'primary' },
    { text: 'Béal Feirste', lang: 'ga', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'GB',
  coords: {
    lat: 54.6,
    lon: -5.96,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Belfast (ne_id 1159149369)' }
      }
    ]
  }
})
