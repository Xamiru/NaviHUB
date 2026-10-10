import { definePlace } from '../../schema'

export default definePlace({
  id: 'cape-town',
  names: [
    { text: 'Cape Town', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-10',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'ZA',
  coords: {
    lat: -33.9181,
    lon: 18.433,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Cape Town (ne_id 1159151583)' }
      }
    ]
  }
})
