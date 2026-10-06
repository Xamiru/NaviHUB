import { definePlace } from '../../schema'

export default definePlace({
  id: 'johannesburg',
  names: [
    { text: 'Johannesburg', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'ZA',
  coords: {
    lat: -26.1681,
    lon: 28.0281,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Johannesburg (ne_id 1159151515)' }
      }
    ]
  }
})
