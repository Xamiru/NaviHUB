import { definePlace } from '../../schema'

export default definePlace({
  id: 'kathmandu',
  names: [
    { text: 'Kathmandu', lang: 'en', role: 'primary' },
    { text: 'काठमाडौं', lang: 'ne', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'NP',
  coords: {
    lat: 27.7186,
    lon: 85.3147,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Kathmandu (ne_id 1159150655)' }
      }
    ]
  }
})
