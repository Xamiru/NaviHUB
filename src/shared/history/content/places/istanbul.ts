import { definePlace } from '../../schema'

export default definePlace({
  id: 'istanbul',
  names: [
    { text: 'Istanbul', lang: 'en', role: 'primary' },
    { text: 'İstanbul', lang: 'tr', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'TR',
  coords: {
    lat: 41.1069,
    lon: 29.0081,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Istanbul (ne_id 1159151579)' }
      }
    ]
  }
})
