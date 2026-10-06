import { definePlace } from '../../schema'

export default definePlace({
  id: 'dublin',
  names: [
    { text: 'Dublin', lang: 'en', role: 'primary' },
    { text: 'Baile Átha Cliath', lang: 'ga', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'IE',
  coords: {
    lat: 53.335,
    lon: -6.2509,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Dublin (ne_id 1159151309)' }
      }
    ]
  }
})
