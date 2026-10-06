import { definePlace } from '../../schema'

export default definePlace({
  id: 'monrovia',
  names: [
    { text: 'Monrovia', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['subsaharan-africa'],
  modernCountry: 'LR',
  coords: {
    lat: 6.3146,
    lon: -10.7997,
    cites: [
      {
        source: 'natural-earth-populated-places',
        loc: { section: 'Monrovia (ne_id 1159151311)' }
      }
    ]
  }
})
